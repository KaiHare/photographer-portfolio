import Head from "next/head";
import Link from "next/link";

import { Layout } from "@/components/layout";
import { getAlbums } from "@/lib/albums";

export default function AlbumsPage() {
  const albums = getAlbums();

  return (
    <Layout>
      <Head>
        <title>Albums — Lumen Atelier</title>
      </Head>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            Albums
          </p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
            Photo stories and curated collections.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/70">
            Each album is a self-contained visual story with optimized delivery
            for quick loading and immersive browsing.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {albums.map((album) => (
            <Link
              key={album.slug}
              href={`/albums/${album.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/10">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2 px-6 py-5">
                <h2 className="text-xl font-semibold">{album.title}</h2>
                <p className="text-sm text-white/60">{album.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
