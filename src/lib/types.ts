export type AlbumStatus = "draft" | "published" | "archived";

export type Photo = {
  photoId: string;
  thumbUrl: string;
  displayUrl: string;
  caption: string;
  createdAt: string;
};

export type Album = {
  slug: string;
  title: string;
  description: string;
  coverThumbUrl: string;
  createdAt: string;
  status: AlbumStatus;
};

export type AlbumDetail = Album & {
  photos: Photo[];
};
