import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hydratePhotoUrls } from "@/lib/s3";

export async function PATCH(req: NextRequest, context: any) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const body = await req.json();
  const { title, caption, location, takenAt, year, hidden, order } = body;

  const photo = await prisma.photo.update({
    where: { id: context.params.photoId },
    data: {
      title: title ?? undefined,
      caption: caption ?? undefined,
      location: location ?? undefined,
      takenAt: takenAt ?? undefined,
      year: year ?? undefined,
      hidden: hidden ?? undefined,
      order: order ?? undefined,
    },
  });
  const hydrated = await hydratePhotoUrls(photo);
  return NextResponse.json(hydrated);
}

export async function DELETE(req: NextRequest, context: any) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  await prisma.photo.delete({ where: { id: context.params.photoId } });
  return NextResponse.json({ ok: true });
}
