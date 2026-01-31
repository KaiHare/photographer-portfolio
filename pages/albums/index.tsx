import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { listAlbums } from "@/lib/api";
import type { Album } from "@/lib/types";

type AlbumsProps = {
  albums: Album[];
  error?: string | null;
};

export default function Albums({ albums, error }: AlbumsProps) {
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

  if (!albums.length) {
    return (
      <div className="grain min-h-screen">
        <SiteHeader />
        <main className="container-padded py-16">
          <div className="flex items-center gap-3 text-sm text-ink/60">
            <Spinner />
            正在加载相册数据...
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
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">
              Album archive
            </p>
            <h1 className="text-3xl font-semibold font-display md:text-5xl">
              Curated collections for immersive viewing.
            </h1>
          </div>
          <p className="max-w-sm text-sm text-ink/60">
            Each album is delivered as static-first pages with fast loading
            image grids and a focused lightbox.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {albums.map((album) => (
            <Link
              key={album.slug}
              href={`/albums/${album.slug}`}
              className="group rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur transition hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={album.coverThumbUrl}
                  alt={album.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 space-y-2">
                <h2 className="text-2xl font-semibold font-display">
                  {album.title}
                </h2>
                <p className="text-sm text-ink/60">{album.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const albums = await listAlbums();
    return {
      props: {
        albums,
      },
    };
  } catch (error) {
    return {
      props: {
        albums: [],
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
