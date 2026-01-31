import Link from "next/link";

import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { cn } from "@/lib/utils";
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
      <main className="py-14">
        <header className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between max-w-5xl">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent-2">
                作品目录
              </p>
              <h1 className="text-3xl font-semibold font-display md:text-4xl leading-tight text-ink">
                系列影像
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted">
              静态画册 · 快速加载 · 专注观看
            </p>
          </div>
        </header>

        <div className="mt-10 w-full px-3 md:px-4">
          <div className="grid gap-6 md:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album.slug}
              href={`/albums/${album.slug}`}
              className={cn(
                "group flex flex-col gap-3 transition",
                "md:first:col-span-2"
              )}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-none border border-line/60 bg-white/80">
                <img
                  src={album.coverThumbUrl}
                  alt={album.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted">
                  {new Date(album.createdAt).getFullYear()} · {album.status}
                </p>
                <h2 className="text-base font-medium text-ink group-hover:text-ink-strong">
                  {album.title}
                </h2>
                <p className="text-sm text-muted">{album.description}</p>
              </div>
            </Link>
          ))}
          </div>
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
