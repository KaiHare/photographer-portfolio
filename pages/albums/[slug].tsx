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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!album) return;
    if (event.key === "Escape") {
      closeLightbox();
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

  const openLightbox = (photo: Photo, idx: number) => {
    setIndex(idx);
    setSelected(photo);
    // Add class to body to prevent scrolling
    document.body.classList.add("overflow-hidden");
  };

  const closeLightbox = () => {
    setSelected(null);
    setIndex(-1);
    // Remove class from body to allow scrolling
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    if (index >= 0 && album) {
      setSelected(album.photos[index]);
    }
  }, [album, index]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden"); // Cleanup on unmount
    };
  }, [album, selected]); // Re-add listener if selected changes

  // ... (error and loading states remain the same)
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
      <main className="py-24 md:py-32">
        <header className="mx-auto max-w-4xl px-6 text-center">
          <Link
            className="text-sm uppercase tracking-[0.3em] text-muted hover:text-ink transition-colors"
            href="/albums"
          >
            ← 返回作品
          </Link>
          <p className="mt-8 text-sm uppercase tracking-[0.35em] text-muted">
            {album.year}
            {album.location ? " · " + album.location : ""}
          </p>
          <h1 className="mt-4 text-5xl font-medium font-display md:text-6xl leading-tight text-ink">
            {album.title}
          </h1>
          {album.description && (
            <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-muted">
              {album.description}
            </p>
          )}
        </header>

        <section className="mt-20 max-w-7xl mx-auto px-4 md:px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {album.photos
              .filter((p) => !p.hidden)
              .sort((a, b) => a.order - b.order)
              .map((photo, idx) => (
                <div key={photo.id} className="break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => openLightbox(photo, idx)}
                    className="group relative w-full overflow-hidden text-left transition"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption || photo.title || ""}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Lightbox */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300",
          selected ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {selected && (
          <>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute inset-0 h-full w-full cursor-zoom-out"
              aria-label="Close lightbox"
            />
            <div className="relative z-10 flex w-full max-w-6xl flex-col gap-4">
              <div className="relative">
                <img
                  src={selected.src}
                  alt={selected.caption || selected.title || ""}
                  className="max-h-[85vh] w-auto h-auto mx-auto object-contain"
                />
              </div>

               <div className="w-full max-w-4xl mx-auto text-center text-white/80">
                 <h3 className="font-display text-2xl">{selected.title}</h3>
                 {selected.caption && <p className="mt-2 text-base text-white/60">{selected.caption}</p>}
                 <p className="mt-4 text-xs uppercase tracking-widest text-white/50">
                    {album.title} · 第 {index + 1} / {album.photos.length} 张
                 </p>
              </div>
            </div>

             {/* Prev / Next Buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
             <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((prev) => (prev + 1) % album.photos.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
             <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </>
        )}
      </div>
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
