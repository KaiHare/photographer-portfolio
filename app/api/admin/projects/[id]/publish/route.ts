import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hydrateProjectUrls } from "@/lib/s3";

export async function POST(req: NextRequest, context: any) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const body = await req.json();
  const published = !!body.published;
  const project = await prisma.project.update({
    where: { id: context.params.id },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  });
  const hydrated = await hydrateProjectUrls(project);
  return NextResponse.json(hydrated);
}
