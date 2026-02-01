import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { slug: string } };

export async function GET(req: NextRequest, { params }: Params) {
  const album = await prisma.project.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      photos: {
        where: { hidden: false },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!album) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(album);
}
