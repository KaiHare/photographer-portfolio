import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = { params: { photoId: string } };

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const body = await req.json();
  const { title, caption, location, takenAt, year, hidden, order } = body;

  const photo = await prisma.photo.update({
    where: { id: params.photoId },
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
  return NextResponse.json(photo);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  await prisma.photo.delete({ where: { id: params.photoId } });
  return NextResponse.json({ ok: true });
}
