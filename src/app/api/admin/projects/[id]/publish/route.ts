import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = { params: { id: string } };

export async function POST(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const body = await req.json();
  const published = !!body.published;
  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      published,
      publishedAt: published ? new Date() : null,
    },
  });
  return NextResponse.json(project);
}
