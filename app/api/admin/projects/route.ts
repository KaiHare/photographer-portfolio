import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { hydrateProjectUrls } from "@/lib/s3";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const includePhotos = req.nextUrl.searchParams.get("includePhotos") === "1";
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: includePhotos ? { photos: { orderBy: { order: "asc" } } } : undefined,
  });
  const hydrated = await Promise.all(
    projects.map((p) => hydrateProjectUrls(p, { withPhotos: includePhotos }))
  );
  return NextResponse.json({ items: hydrated });
}

export async function POST(req: NextRequest) {
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
    published = false,
  } = body;

  if (!title || !year || !cover?.src) {
    return NextResponse.json({ error: "title, year, cover.src required" }, { status: 400 });
  }

  const slug = body.slug || `${slugify(title)}-${Date.now().toString(36)}`;

  try {
    const project = await prisma.project.create({
      data: {
        slug,
        title,
        subtitle,
        year,
        location,
        category,
        description,
        dateRangeStart: dateRange?.start,
        dateRangeEnd: dateRange?.end,
        coverSrc: cover.src,
        coverAlt: cover.alt,
        published,
        publishedAt: published ? new Date() : null,
      },
    });
    const hydrated = await hydrateProjectUrls(project);
    return NextResponse.json(hydrated, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
