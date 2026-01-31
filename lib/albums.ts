export type Photo = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Album = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
};

const albums: Album[] = [
  {
    slug: "northern-lights",
    title: "Northern Lights Expedition",
    description:
      "A winter journey across Norway and Iceland with long exposures and midnight skies.",
    coverImage: "/images/northern-lights/cover.svg",
    photos: [
      {
        id: "nl-1",
        src: "/images/northern-lights/aurora-01.svg",
        alt: "Green aurora over snowy mountains",
        width: 1600,
        height: 1000
      },
      {
        id: "nl-2",
        src: "/images/northern-lights/aurora-02.svg",
        alt: "Aurora ribbon above fjord",
        width: 1600,
        height: 1000
      },
      {
        id: "nl-3",
        src: "/images/northern-lights/aurora-03.svg",
        alt: "Purple aurora lights over cabin",
        width: 1600,
        height: 1000
      }
    ]
  },
  {
    slug: "coastal-drift",
    title: "Coastal Drift",
    description:
      "Slow shutter seascapes from Portugal to the Pacific Northwest.",
    coverImage: "/images/coastal-drift/cover.svg",
    photos: [
      {
        id: "cd-1",
        src: "/images/coastal-drift/shore-01.svg",
        alt: "Mist rolling over rocky shoreline",
        width: 1600,
        height: 1000
      },
      {
        id: "cd-2",
        src: "/images/coastal-drift/shore-02.svg",
        alt: "Golden light on tidal pools",
        width: 1600,
        height: 1000
      },
      {
        id: "cd-3",
        src: "/images/coastal-drift/shore-03.svg",
        alt: "Stormy waves breaking at dusk",
        width: 1600,
        height: 1000
      }
    ]
  },
  {
    slug: "urban-noir",
    title: "Urban Noir",
    description:
      "Neon, rain, and late-night compositions from cities that never sleep.",
    coverImage: "/images/urban-noir/cover.svg",
    photos: [
      {
        id: "un-1",
        src: "/images/urban-noir/city-01.svg",
        alt: "Rainy alley with neon signage",
        width: 1600,
        height: 1000
      },
      {
        id: "un-2",
        src: "/images/urban-noir/city-02.svg",
        alt: "Blurred headlights in city rain",
        width: 1600,
        height: 1000
      },
      {
        id: "un-3",
        src: "/images/urban-noir/city-03.svg",
        alt: "Silhouette walking under neon bridge",
        width: 1600,
        height: 1000
      }
    ]
  }
];

export function getAlbums(): Album[] {
  return albums;
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find((album) => album.slug === slug);
}
