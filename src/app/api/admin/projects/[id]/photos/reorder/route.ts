import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Params) {
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
        where: { id: o.photoId, projectId: params.id },
        data: { order: o.order },
      })
    )
  );

  const items = await prisma.photo.findMany({
    where: { projectId: params.id },
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ items });
}
