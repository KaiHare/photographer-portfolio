import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hydrateProjectUrls } from "@/lib/s3";

export async function GET(_req: Request, context: any) {
  const album = await prisma.project.findUnique({
    where: { slug: context.params.slug, published: true },
    include: {
      photos: {
        where: { hidden: false },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!album) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const hydrated = await hydrateProjectUrls(album, { withPhotos: true });
  return NextResponse.json(hydrated);
}
