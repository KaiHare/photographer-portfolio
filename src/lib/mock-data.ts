import type { Album, AlbumDetail, Photo } from "./types";

const photos: Photo[] = [
  {
    photoId: "p-01",
    thumbUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    caption: "Dawn tide",
    createdAt: "2025-10-03T09:30:00.000Z",
  },
  {
    photoId: "p-02",
    thumbUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    caption: "Salt wind",
    createdAt: "2025-10-03T10:12:00.000Z",
  },
  {
    photoId: "p-03",
    thumbUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",
    caption: "Black sand",
    createdAt: "2025-10-03T11:02:00.000Z",
  },
  {
    photoId: "p-04",
    thumbUrl:
      "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=1400&q=80",
    caption: "Neon drift",
    createdAt: "2024-07-14T18:45:00.000Z",
  },
  {
    photoId: "p-05",
    thumbUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
    caption: "Crosswalk haze",
    createdAt: "2024-07-14T19:10:00.000Z",
  },
  {
    photoId: "p-06",
    thumbUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    caption: "Midnight studio",
    createdAt: "2024-07-14T20:05:00.000Z",
  },
  {
    photoId: "p-07",
    thumbUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    caption: "Soft light",
    createdAt: "2023-09-08T08:20:00.000Z",
  },
  {
    photoId: "p-08",
    thumbUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=70",
    displayUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    caption: "Birch lines",
    createdAt: "2023-09-08T09:05:00.000Z",
  },
];

const albums: AlbumDetail[] = [
  {
    slug: "silent-coast",
    title: "Silent Coast",
    description: "Muted tides, basalt textures, and wind-carved silhouettes.",
    coverThumbUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=75",
    createdAt: "2025-10-02T18:00:00.000Z",
    status: "published",
    photos: photos.slice(0, 3),
  },
  {
    slug: "city-afterglow",
    title: "City Afterglow",
    description: "Night light studies across layered streets and neon haze.",
    coverThumbUrl:
      "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=900&q=75",
    createdAt: "2024-07-12T17:30:00.000Z",
    status: "published",
    photos: photos.slice(3, 6),
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    description: "Quiet afternoon frames, unfiltered and tactile.",
    coverThumbUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=75",
    createdAt: "2023-09-02T09:00:00.000Z",
    status: "draft",
    photos: photos.slice(6, 8),
  },
];

export function getMockAlbums(): Album[] {
  return albums.map(({ photos, ...album }) => album);
}

export function getMockAlbum(slug: string): AlbumDetail | null {
  return albums.find((album) => album.slug === slug) ?? null;
}
