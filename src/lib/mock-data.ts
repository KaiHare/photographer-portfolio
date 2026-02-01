import type { Album, Photo } from "./types";

const photos: Photo[] = [
  {
    id: "p-01",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    title: "Dawn tide",
    caption: "黑沙滩上的第一缕光。",
    year: 2025,
    location: "Jeju, KR",
    order: 1,
  },
  {
    id: "p-02",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    title: "Salt wind",
    caption: "海风吹皱的裙摆。",
    year: 2025,
    location: "Jeju, KR",
    order: 2,
  },
  {
    id: "p-03",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    title: "Black sand",
    caption: "玄武岩的肌理。",
    year: 2025,
    location: "Jeju, KR",
    order: 3,
  },
  {
    id: "p-04",
    src: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=1600&q=80",
    title: "Neon drift",
    caption: "夜色中的楼宇呼吸。",
    year: 2024,
    location: "Tokyo, JP",
    order: 1,
  },
  {
    id: "p-05",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
    title: "Crosswalk haze",
    caption: "人群与霓虹的交叉点。",
    year: 2024,
    location: "Tokyo, JP",
    order: 2,
  },
  {
    id: "p-06",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    title: "Midnight studio",
    caption: "街角的小型录音棚。",
    year: 2024,
    location: "Tokyo, JP",
    order: 3,
  },
  {
    id: "p-07",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    title: "Soft light",
    caption: "黄昏草地的柔光。",
    year: 2023,
    location: "Hokkaido, JP",
    order: 1,
  },
  {
    id: "p-08",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    title: "Birch lines",
    caption: "桦树林的排比节奏。",
    year: 2023,
    location: "Hokkaido, JP",
    order: 2,
  },
];

const albums: Album[] = [
  {
    slug: "silent-coast",
    title: "Silent Coast",
    subtitle: "风与海的低语",
    year: 2025,
    location: "Jeju, KR",
    category: "landscape",
    cover: {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      alt: "Sea wave at dawn",
    },
    description: "Muted tides, basalt textures, and wind-carved silhouettes。",
    photos: photos.filter((p) => p.location === "Jeju, KR").sort((a, b) => a.order - b.order),
    published: true,
    publishedAt: "2025-10-02T18:00:00.000Z",
  },
  {
    slug: "city-afterglow",
    title: "City Afterglow",
    subtitle: "霓虹之后",
    year: 2024,
    location: "Tokyo, JP",
    category: "street",
    cover: {
      src: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=1600&q=80",
      alt: "Tokyo neon building",
    },
    description: "Night light studies across layered streets and neon haze.",
    photos: photos.filter((p) => p.location === "Tokyo, JP").sort((a, b) => a.order - b.order),
    published: true,
    publishedAt: "2024-07-12T17:30:00.000Z",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    subtitle: "田野札记",
    year: 2023,
    location: "Hokkaido, JP",
    category: "documentary",
    cover: {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      alt: "Field with soft sunset",
    },
    description: "Quiet afternoon frames, unfiltered and tactile.",
    photos: photos.filter((p) => p.location === "Hokkaido, JP").sort((a, b) => a.order - b.order),
    published: false,
    publishedAt: "2023-09-02T09:00:00.000Z",
  },
];

export function getMockAlbums(): Album[] {
  return albums.map((album) => ({
    ...album,
    photos: [],
  }));
}

export function getMockAlbum(slug: string): Album | null {
  return albums.find((album) => album.slug === slug) ?? null;
}
