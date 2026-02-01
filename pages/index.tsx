import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { listAlbums } from "@/lib/api";
import type { Album } from "@/lib/types";

type HomeProps = {
  albums: Album[];
  error?: string | null;
};

export default function Home({ albums, error }: HomeProps) {
  const featured = albums.slice(0, 2);

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
      <main>
        <section className="container-padded grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted">
              纪录 · 人像 · 叙事
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl font-display">
              慢速影像的静态画册。
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted">
              Lumiere Atelier 以画册逻辑编排影像，减去多余互动，保留纸张质感与沉浸观看体验。
            </p>
            <div className="flex flex-wrap gap-3 text-[12px] uppercase tracking-[0.3em]">
              <Link className={cn(buttonVariants({ size: "sm" }), "h-10 px-6")} href="/albums">
                查看作品
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-10 px-6")}
                href="/admin"
              >
                管理
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              本期精选
            </p>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={albums[0]?.cover.src}
                  alt={albums[0]?.cover.alt || albums[0]?.title}
                  className="h-full w-full object-cover"
                />
              </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold font-display">{albums[0]?.title}</h2>
              <p className="text-sm text-ink/60">
                {albums[0]?.year ?? ""}
                {albums[0]?.location ? " · " + albums[0]?.location : ""}
              </p>
            </div>
          </div>
        </section>

        <section className="container-padded pb-20">
          <div className="flex items-center justify-between border-b border-line pb-3 max-w-5xl">
            <h2 className="text-xl font-semibold font-display">精选系列</h2>
            <Link className="text-[12px] uppercase tracking-[0.3em] text-muted hover:text-ink" href="/albums">
              全部作品
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {featured.map((album) => (
              <Link
                key={album.slug}
                href={`/albums/${album.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="aspect-[5/3] overflow-hidden rounded-lg">
                  <img
                    src={album.cover.src}
                    alt={album.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
                    {album.year} {album.location ? " · " + album.location : ""}
                  </p>
                  <h3 className="text-lg font-semibold font-display text-ink group-hover:text-ink/80">
                    {album.title}
                  </h3>
                  <p className="text-sm text-muted">{album.subtitle ?? album.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
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
