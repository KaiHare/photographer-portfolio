import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hydrateProjectUrls } from "@/lib/s3";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { year: "desc" },
    include: {
      photos: {
        where: { hidden: false },
        orderBy: { order: "asc" },
      },
    },
  });

  const payload = await Promise.all(
    projects.map(async (p: typeof projects[number]) => {
      const hydrated = await hydrateProjectUrls(
        { ...p, photos: [] },
        { withPhotos: false }
      );
      return hydrated;
    })
  );

  return NextResponse.json(payload);
}
