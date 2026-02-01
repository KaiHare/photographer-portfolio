import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";

type Params = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  const body = await req.json();
  const {
    title,
    subtitle,
    year,
    location,
    category,
    description,
    dateRange,
    cover,
    slug,
  } = body;

  const data: any = {};
  if (title) data.title = title;
  if (subtitle !== undefined) data.subtitle = subtitle;
  if (year) data.year = year;
  if (location !== undefined) data.location = location;
  if (category) data.category = category;
  if (description !== undefined) data.description = description;
  if (dateRange) {
    data.dateRangeStart = dateRange.start;
    data.dateRangeEnd = dateRange.end;
  }
  if (cover) {
    data.coverSrc = cover.src;
    data.coverAlt = cover.alt;
  }
  if (slug) data.slug = slugify(slug);

  try {
    const project = await prisma.project.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(project);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = requireAdmin(req);
  if (auth) return auth;
  await prisma.photo.deleteMany({ where: { projectId: params.id } });
  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
