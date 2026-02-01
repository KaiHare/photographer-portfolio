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
      <main className="py-20">
        <header className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              作品目录
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold font-display leading-tight text-ink">
              安静而缓慢的系列影像
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted">
              温暖的底色、恰到好处的留白与恒定节奏，让观者可以慢下来阅读每一组作品。
            </p>
          </div>
        </header>

        <div className="mt-16 w-full px-4 md:px-6">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <Link
                key={album.slug}
                href={`/albums/${album.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={album.cover.src}
                    alt={album.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-medium text-ink group-hover:text-ink-strong">
                    {album.title}
                  </h2>
                  <p className="text-sm leading-7 text-muted">
                    {album.year} {album.subtitle ? " · " + album.subtitle : ""}
                  </p>
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
