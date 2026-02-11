import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hydratePhotoUrls } from "@/lib/s3";

export async function PATCH(req: NextRequest, context: any) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const body = await req.json();
  const orders = body.orders as Array<{ photoId: string; order: number }>;
  if (!Array.isArray(orders)) {
    return NextResponse.json({ error: "orders array required" }, { status: 400 });
  }

  await prisma.$transaction(
    orders.map((o) =>
      prisma.photo.update({
        where: { id: o.photoId, projectId: context.params.id },
        data: { order: o.order },
      })
    )
  );

  const items = await prisma.photo.findMany({
    where: { projectId: context.params.id },
    orderBy: { order: "asc" },
  });
  const hydrated = await Promise.all(items.map((p) => hydratePhotoUrls(p)));
  return NextResponse.json({ items: hydrated });
}
