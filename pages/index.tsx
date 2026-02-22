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
  const heroAlbum = albums[0];
  const featured = albums.slice(0, 3);
  const spotlight = albums.slice(1, 4);
  const photoCount = albums.reduce((total, album) => total + album.photos.length, 0);
  const latestYear = albums.reduce((latest, album) => Math.max(latest, album.year), 0);
  const locationCount = new Set(albums.map((album) => album.location).filter(Boolean)).size;

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
          <div className="glass-panel rounded-3xl p-10">
            <div className="flex items-center gap-3 text-sm text-ink/70">
              <Spinner />
              正在加载星空数据...
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="grain min-h-screen">
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="ambient-stage">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>

        <section className="container-padded grid gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div className="space-y-7 reveal-up">
            <p className="text-[11px] uppercase tracking-[0.34em] text-accent-cold font-bold">
              Astrophotography · Cyberpunk · Fine Art
            </p>
            <h1 className="max-w-2xl text-[42px] font-semibold leading-[1.06] text-ink md:text-[64px] font-display">
              在浩瀚星海中
              <br />
              <span className="bg-gradient-to-r from-accent-cold via-accent-warm to-accent-earth bg-clip-text text-transparent">探索数字光影的边界</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted md:text-lg">
              这不是简单的像素堆砌，而是一个充满科技感与未来主义的视觉空间。让你的视觉神经在星际跃迁的第一秒便被唤醒。
            </p>

            <div className="flex flex-wrap gap-3 text-[12px] uppercase tracking-[0.24em]">
              <Link className={cn(buttonVariants({ size: "sm" }), "h-10 bg-accent-cold text-paper hover:bg-accent-cold/80")} href="/albums">
                启动视觉引擎
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-10 border-line text-ink hover:bg-white/5")}
                href="/admin"
              >
                终端管理
              </Link>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <div className="glass-panel rounded-2xl px-5 py-4 reveal-up delay-1">
                <p className="font-display text-2xl text-ink">{albums.length}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Stellar Archives</p>
              </div>
              <div className="glass-panel rounded-2xl px-5 py-4 reveal-up delay-2">
                <p className="font-display text-2xl text-ink">{photoCount}+</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Captured Orbits</p>
              </div>
              <div className="glass-panel rounded-2xl px-5 py-4 reveal-up delay-3">
                <p className="font-display text-2xl text-ink">{locationCount || 1}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Galaxies Documented</p>
              </div>
            </div>
          </div>

          <div className="glass-panel reveal-up delay-1 rounded-[28px] p-4 md:p-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cold to-accent-warm rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-2xl bg-paper">
              <img
                src={heroAlbum?.cover.src}
                alt={heroAlbum?.cover.alt || heroAlbum?.title}
                className="h-[520px] w-full object-cover object-center md:h-[560px] opacity-90 transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/90 via-[#05050a]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-ink md:p-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent-cold">
                  Transmission · {heroAlbum?.year ?? latestYear}
                </p>
                <h2 className="mt-2 text-3xl leading-tight font-display md:text-4xl text-white">
                  {heroAlbum?.title}
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                  {heroAlbum?.subtitle ?? heroAlbum?.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-padded pb-14 md:pb-20">
          <div className="line-fade flex items-center justify-between pb-4">
            <h2 className="text-[26px] font-semibold text-white font-display md:text-[34px]">
              Cybernetic Series
            </h2>
            <Link className="text-[11px] uppercase tracking-[0.24em] text-accent-cold transition hover:text-white" href="/albums">
              Initialize All
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-[1.45fr_1fr]">
            <Link
              href={`/albums/${featured[0]?.slug}`}
              className="group glass-panel overflow-hidden rounded-[26px] p-4 md:p-5"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={featured[0]?.cover.src}
                  alt={featured[0]?.cover.alt || featured[0]?.title}
                  className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[440px] opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="pt-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-accent-cold">
                  {featured[0]?.year}
                  {featured[0]?.location ? ` · ${featured[0].location}` : ""}
                </p>
                <h3 className="pt-2 text-2xl leading-tight font-display text-white md:text-3xl">
                  {featured[0]?.title}
                </h3>
                <p className="pt-2 text-sm leading-7 text-muted">
                  {featured[0]?.description}
                </p>
              </div>
            </Link>

            <div className="grid gap-5">
              {spotlight.map((album) => (
                <Link
                  key={album.slug}
                  href={`/albums/${album.slug}`}
                  className="group glass-panel flex gap-4 overflow-hidden rounded-[22px] p-3 hover:border-accent-cold/50 transition-colors"
                >
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl md:h-32 md:w-32 bg-paper/50">
                    <img
                      src={album.cover.src}
                      alt={album.cover.alt || album.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="min-w-0 py-1 flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-accent-cold">
                      {album.year}
                      {album.location ? ` · ${album.location}` : ""}
                    </p>
                    <h4 className="truncate pt-1 text-lg font-display text-white">{album.title}</h4>
                    <p className="overflow-hidden pt-1 text-sm text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {album.subtitle ?? album.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container-padded pb-4">
          <div className="glass-panel rounded-[30px] px-6 py-8 md:px-10 md:py-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-warm/10 blur-[80px] rounded-full pointer-events-none"></div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent-cold font-bold relative z-10">
              System Architecture
            </p>
            <h2 className="pt-2 text-3xl leading-tight font-display md:text-[42px] text-white relative z-10">
              重构的不只是视觉，更是交互维度的跃迁。
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3 relative z-10">
              <article className="rounded-2xl border border-line bg-surface/30 p-5 backdrop-blur-md hover:border-accent-cold/30 transition-colors">
                <p className="font-display text-xl text-white">01 / Neural Sync</p>
                <p className="pt-2 text-sm leading-7 text-muted">
                  光影不仅仅是静态的矩阵，而是与你的视觉神经同步的沉浸式体验流。
                </p>
              </article>
              <article className="rounded-2xl border border-line bg-surface/30 p-5 backdrop-blur-md hover:border-accent-warm/30 transition-colors">
                <p className="font-display text-xl text-white">02 / Holographic Depth</p>
                <p className="pt-2 text-sm leading-7 text-muted">
                  通过精密的景深控制和深空折射，打破屏幕平面的次元壁，重建空间感。
                </p>
              </article>
              <article className="rounded-2xl border border-line bg-surface/30 p-5 backdrop-blur-md hover:border-accent-earth/30 transition-colors">
                <p className="font-display text-xl text-white">03 / Cyber Aesthetic</p>
                <p className="pt-2 text-sm leading-7 text-muted">
                  将星云的幽光与赛博朋克的霓虹交织，打造极致硬核却又不失诗意的质感。
                </p>
              </article>
            </div>
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
