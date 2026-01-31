export type Photo = {
  id: string;
  albumSlug: string;
  title: string;
  location: string;
  url: string;
  aspect: "portrait" | "landscape";
};

export type Album = {
  slug: string;
  title: string;
  summary: string;
  coverUrl: string;
  year: number;
  location: string;
  photos: Photo[];
};

const photos: Photo[] = [
  {
    id: "p-01",
    albumSlug: "silent-coast",
    title: "Dawn tide",
    location: "Jeju, KR",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    aspect: "landscape",
  },
  {
    id: "p-02",
    albumSlug: "silent-coast",
    title: "Salt wind",
    location: "Jeju, KR",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    aspect: "portrait",
  },
  {
    id: "p-03",
    albumSlug: "silent-coast",
    title: "Black sand",
    location: "Jeju, KR",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",
    aspect: "landscape",
  },
  {
    id: "p-04",
    albumSlug: "city-afterglow",
    title: "Neon drift",
    location: "Tokyo, JP",
    url: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=1400&q=80",
    aspect: "portrait",
  },
  {
    id: "p-05",
    albumSlug: "city-afterglow",
    title: "Crosswalk haze",
    location: "Tokyo, JP",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
    aspect: "landscape",
  },
  {
    id: "p-06",
    albumSlug: "city-afterglow",
    title: "Midnight studio",
    location: "Tokyo, JP",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    aspect: "landscape",
  },
  {
    id: "p-07",
    albumSlug: "field-notes",
    title: "Soft light",
    location: "Hokkaido, JP",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    aspect: "landscape",
  },
  {
    id: "p-08",
    albumSlug: "field-notes",
    title: "Birch lines",
    location: "Hokkaido, JP",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    aspect: "portrait",
  },
];

const albums: Album[] = [
  {
    slug: "silent-coast",
    title: "Silent Coast",
    summary: "Muted tides, basalt textures, and wind-carved silhouettes.",
    coverUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    year: 2025,
    location: "Jeju, KR",
    photos: photos.filter((photo) => photo.albumSlug === "silent-coast"),
  },
  {
    slug: "city-afterglow",
    title: "City Afterglow",
    summary: "Night light studies across layered streets and neon haze.",
    coverUrl:
      "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?auto=format&fit=crop&w=1400&q=80",
    year: 2024,
    location: "Tokyo, JP",
    photos: photos.filter((photo) => photo.albumSlug === "city-afterglow"),
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    summary: "Quiet afternoon frames, unfiltered and tactile.",
    coverUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    year: 2023,
    location: "Hokkaido, JP",
    photos: photos.filter((photo) => photo.albumSlug === "field-notes"),
  },
];

export function getAlbums(): Album[] {
  return albums;
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find((album) => album.slug === slug);
}
