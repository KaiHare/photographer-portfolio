import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

  const payload = projects.map((p) => ({
    ...p,
    photos: [],
  }));

  return NextResponse.json(payload);
}
