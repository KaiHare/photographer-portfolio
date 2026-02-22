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
      <main className="py-24 md:py-32">
        <header className="mx-auto max-w-5xl px-6 text-center">
          <div className="flex flex-col gap-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">
              作品目录
            </p>
            <h1 className="text-5xl md:text-6xl font-medium font-display leading-tight text-ink">
              安静而缓慢的系列影像
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-muted">
              温暖的底色、恰到好处的留白与恒定节奏，让观者可以慢下来阅读每一组作品。
            </p>
          </div>
        </header>

        <div className="mt-20 w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:gap-16 grid-cols-1 sm:grid-cols-2">
            {albums.map((album) => (
              <Link
                key={album.slug}
                href={`/albums/${album.slug}`}
                className="group relative flex flex-col gap-4 text-white"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={album.cover.src}
                    alt={album.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 transition-transform duration-500 ease-in-out transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <h2 className="text-2xl font-medium font-display">
                    {album.title}
                  </h2>
                  <p className="mt-1 text-sm tracking-widest uppercase text-white/70">
                    {album.year} {album.subtitle ? `· ${album.subtitle}` : ""}
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
