import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { putObject } from "@/lib/s3";

type Params = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const photos = await prisma.photo.findMany({
    where: { projectId: params.id },
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ items: photos });
}

export async function POST(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const title = form.get("title")?.toString();
  const caption = form.get("caption")?.toString();
  const location = form.get("location")?.toString();
  const takenAt = form.get("takenAt")?.toString();
  const year = form.get("year") ? Number(form.get("year")) : undefined;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const id = crypto.randomUUID();
  const baseKey = `uploads/${params.id}/${id}`;

  const sharpImg = sharp(buffer);
  const metadata = await sharpImg.metadata();

  const displayBuf = await sharpImg.clone().resize({ width: 1600, height: 1600, fit: "inside" }).toBuffer();
  const thumbBuf = await sharpImg.clone().resize({ width: 400, height: 400, fit: "inside" }).toBuffer();

  const contentType = file.type || "image/jpeg";

  const displayKey = `${baseKey}/display`;
  const thumbKey = `${baseKey}/thumb`;
  const originalKey = `${baseKey}/original`;

  const [displayUrl, thumbUrl, originalUrl] = await Promise.all([
    putObject(displayKey, displayBuf, contentType),
    putObject(thumbKey, thumbBuf, contentType),
    putObject(originalKey, buffer, contentType),
  ]);

  const maxOrder = await prisma.photo.aggregate({
    where: { projectId: params.id },
    _max: { order: true },
  });
  const nextOrder = (maxOrder._max.order || 0) + 1;

  const photo = await prisma.photo.create({
    data: {
      id,
      projectId: params.id,
      src: displayUrl,
      thumbSrc: thumbUrl,
      width: metadata.width ?? undefined,
      height: metadata.height ?? undefined,
      title,
      caption,
      location,
      takenAt,
      year,
      order: nextOrder,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}
