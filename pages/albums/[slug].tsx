import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { cn } from "@/lib/utils";
import { getAlbum, listAlbums } from "@/lib/api";
import type { Album, Photo } from "@/lib/types";

type AlbumDetailProps = {
  album: Album | null;
  error?: string | null;
};

export default function AlbumDetail({ album, error }: AlbumDetailProps) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [index, setIndex] = useState<number>(-1);

  const lightboxLabel = useMemo(() => {
    if (!selected) {
      return "";
    }
    const year = selected.year ? ` · ${selected.year}` : "";
    return `${selected.caption || selected.title || ""}${year}`;
  }, [selected]);

  useEffect(() => {
    if (index >= 0 && album) {
      setSelected(album.photos[index]);
    }
  }, [album, index]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!album) return;
      if (event.key === "Escape") {
        setSelected(null);
        setIndex(-1);
      }
      if (selected) {
        if (event.key === "ArrowRight") {
          setIndex((prev) => (prev + 1) % album.photos.length);
        }
        if (event.key === "ArrowLeft") {
          setIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [album, selected]);

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
        <div className="flex flex-wrap items-start justify-between gap-6 pb-10 max-w-5xl">
          <div className="space-y-4">
            <Link className="text-xs uppercase tracking-[0.3em] text-muted hover:text-ink" href="/albums">
              ← 返回作品
            </Link>
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted">
              {album.year}
              {album.location ? " · " + album.location : ""}
            </p>
            <h1 className="text-4xl font-semibold font-display md:text-5xl leading-tight text-ink">
              {album.title}
            </h1>
            {album.description && (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{album.description}</p>
            )}
          </div>
        </div>

        <section className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-3">
          {album.photos
            .filter((p) => !p.hidden)
            .sort((a, b) => a.order - b.order)
            .map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => {
                setIndex(idx);
                setSelected(photo);
              }}
              className="group relative overflow-hidden text-left transition"
            >
              <img
                src={photo.src}
                alt={photo.caption || photo.title || ""}
                className="h-full w-full rounded-none object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-85 border border-line/60"
              />
            </button>
          ))}
        </section>
      </main>
      <SiteFooter />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--lightbox-bg)] p-6 text-white">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute inset-0 h-full w-full cursor-zoom-out"
            aria-label="Close lightbox"
          />
          <div className="relative z-10 flex w-full max-w-5xl flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-white/70 font-display">
              <span className="font-display">{album.title}</span>
              <span>
                第 {index + 1} / {album.photos.length} 张
              </span>
            </div>
            <div className="relative bg-black">
              <img
                src={selected.src}
                alt={selected.caption || selected.title || ""}
                className="max-h-[75vh] w-full object-contain"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
                  }}
                  className="rounded-sm border border-white/25 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white/90 hover:bg-white/10 hover:border-white/40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
                >
                  ← Prev
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex((prev) => (prev + 1) % album.photos.length);
                  }}
                  className="rounded-sm border border-white/25 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white/90 hover:bg-white/10 hover:border-white/40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
                >
                  Next →
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center text-[11px] tracking-[0.2em] text-white/70">
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
              {selected.caption || selected.title || ""}
              <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
                {selected.year ? selected.year : ""}
                {selected.location ? ` · ${selected.location}` : ""}
              </span>
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
