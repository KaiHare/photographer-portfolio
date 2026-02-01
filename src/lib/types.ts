export type Photo = {
  id: string;
  src: string;
  width?: number;
  height?: number;
  title?: string;
  caption?: string;
  year?: number;
  location?: string;
  order: number;
  hidden?: boolean;
};

export type Album = {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  location?: string;
  category?: "landscape" | "street" | "documentary" | "portrait" | "commercial";
  cover: { src: string; alt?: string };
  description?: string;
  photos: Photo[];
  published: boolean;
  publishedAt?: string;
};
