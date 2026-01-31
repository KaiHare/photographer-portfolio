import { useMemo, useState } from "react";
import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAlbum, listAlbums } from "@/lib/api";
import type { AlbumDetail, Photo } from "@/lib/types";

type AlbumDetailProps = {
  album: AlbumDetail | null;
  error?: string | null;
};

export default function AlbumDetail({ album, error }: AlbumDetailProps) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const lightboxLabel = useMemo(() => {
    if (!selected) {
      return "";
    }
    return `${selected.caption} · ${new Date(selected.createdAt).getFullYear()}`;
  }, [selected]);

  if (error) {
    return (
      <div className="grain min-h-screen">
        <SiteHeader />
        <main className="container-padded py-16">
          <Alert title="加载失败" description={error} />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="grain min-h-screen">
        <SiteHeader />
        <main className="container-padded py-16">
          <div className="flex items-center gap-3 text-sm text-ink/60">
            <Spinner />
            正在加载相册...
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="grain min-h-screen">
      <SiteHeader />
      <main className="container-padded py-16">
        <div className="flex flex-wrap items-center gap-4">
          <Link className={cn(buttonVariants({ variant: "outline" }))} href="/albums">
            Back to albums
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              {album.status} · {new Date(album.createdAt).getFullYear()}
            </p>
            <h1 className="text-3xl font-semibold font-display md:text-5xl">
              {album.title}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-ink/60">{album.description}</p>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {album.photos.map((photo) => (
            <button
              key={photo.photoId}
              type="button"
              onClick={() => setSelected(photo)}
              className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white/80 text-left shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur transition hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={photo.displayUrl}
                  alt={photo.caption}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.3em] text-ink/40">
                <span>{photo.caption}</span>
                <span>{new Date(photo.createdAt).getFullYear()}</span>
              </div>
            </button>
          ))}
        </section>
      </main>
      <SiteFooter />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute inset-0 h-full w-full cursor-zoom-out"
            aria-label="Close lightbox"
          />
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 text-sm uppercase tracking-[0.3em] text-ink/50">
              <span>Lightbox</span>
              <span>{lightboxLabel}</span>
            </div>
            <div className="bg-black">
              <img
                src={selected.displayUrl}
                alt={selected.caption}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const albums = await listAlbums();

  return {
    paths: albums.map((album) => ({ params: { slug: album.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const album = await getAlbum(params.slug);

    if (!album) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        album,
      },
    };
  } catch (error) {
    return {
      props: {
        album: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
