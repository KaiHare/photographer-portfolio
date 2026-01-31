import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import type { Album, Photo } from "@/lib/albums";
import { getAlbumBySlug, getAlbums } from "@/lib/albums";

type AlbumPageProps = {
  album: Album;
};

export default function AlbumDetailPage({ album }: AlbumPageProps) {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  return (
    <Layout>
      <Head>
        <title>{album.title} — Lumen Atelier</title>
      </Head>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/albums" className="text-sm text-white/60">
              ← Back to albums
            </Link>
            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
              {album.title}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-white/70">
              {album.description}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Download press kit</Button>
            <Button>Request licensing</Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {album.photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActivePhoto(photo)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 text-left text-sm text-white/60">
                {photo.alt}
              </div>
            </button>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 py-10"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-canvas p-6">
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute right-5 top-5 text-sm text-white/60 hover:text-white"
            >
              Close
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="h-auto w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-sm text-white/70">{activePhoto.alt}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAlbums().map((album) => ({ params: { slug: album.slug } }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<AlbumPageProps> = async (
  context
) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    return {
      notFound: true
    };
  }

  const album = getAlbumBySlug(slug);

  if (!album) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      album
    }
  };
};
