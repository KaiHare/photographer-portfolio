import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { buildObjectKey, hydratePhotoUrls, putObject, randomId } from "@/lib/s3";

export async function GET(req: NextRequest, context: any) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const photos = await prisma.photo.findMany({
    where: { projectId: context.params.id },
    orderBy: { order: "asc" },
  });
  const hydrated = await Promise.all(photos.map((p) => hydratePhotoUrls(p)));
  return NextResponse.json({ items: hydrated });
}

export async function POST(req: NextRequest, context: any) {
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

  const id = randomId();
  const filename = (file as any).name || "upload.jpg";

  const sharpImg = sharp(buffer);
  const metadata = await sharpImg.metadata();

  const displayBuf = await sharpImg.clone().resize({ width: 1600, height: 1600, fit: "inside" }).toBuffer();
  const thumbBuf = await sharpImg.clone().resize({ width: 400, height: 400, fit: "inside" }).toBuffer();

  const contentType = file.type || "image/jpeg";

  const displayKey = buildObjectKey(context.params.id, id, "display", filename);
  const thumbKey = buildObjectKey(context.params.id, id, "thumb", filename);
  const originalKey = buildObjectKey(context.params.id, id, "original", filename);

  await Promise.all([
    putObject(displayKey, displayBuf, contentType),
    putObject(thumbKey, thumbBuf, contentType),
    putObject(originalKey, buffer, contentType),
  ]);

  const maxOrder = await prisma.photo.aggregate({
    where: { projectId: context.params.id },
    _max: { order: true },
  });
  const nextOrder = (maxOrder._max.order || 0) + 1;

  const photo = await prisma.photo.create({
    data: {
      id,
      projectId: context.params.id,
      src: displayKey,
      thumbSrc: thumbKey,
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

  const withSignedUrls = await hydratePhotoUrls(photo);

  return NextResponse.json(withSignedUrls, { status: 201 });
}
