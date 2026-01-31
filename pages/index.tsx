import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAlbums, type Album } from "@/lib/data";

type HomeProps = {
  albums: Album[];
};

export default function Home({ albums }: HomeProps) {
  const featured = albums.slice(0, 2);

  return (
    <div className="grain min-h-screen">
      <SiteHeader />
      <main>
        <section className="container-padded grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-ink/60">
              Documentary · Portrait · Editorial
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-6xl font-display">
              A studio devoted to light, quiet stories, and slow photography.
            </h1>
            <p className="max-w-xl text-lg text-ink/70">
              Lumiere Atelier curates photo albums with a tactile, cinematic
              language. Each collection is arranged for immersive viewing and
              ready to publish to a static-first web experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className={cn(buttonVariants())} href="/albums">
                Browse albums
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href="/admin"
              >
                Admin workspace
              </Link>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-ink/50">
                Current feature
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <img
                  src={albums[0]?.coverUrl}
                  alt={albums[0]?.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold font-display">
                  {albums[0]?.title}
                </h2>
                <p className="text-sm text-ink/60">
                  {albums[0]?.year} · {albums[0]?.location}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="container-padded pb-20">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold font-display">
              Featured albums
            </h2>
            <Link className="text-sm text-ink/60 hover:text-ink" href="/albums">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featured.map((album) => (
              <Link
                key={album.slug}
                href={`/albums/${album.slug}`}
                className="group rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur transition hover:-translate-y-1"
              >
                <div className="aspect-[5/3] overflow-hidden rounded-2xl">
                  <img
                    src={album.coverUrl}
                    alt={album.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 space-y-1">
                  <h3 className="text-xl font-semibold font-display">
                    {album.title}
                  </h3>
                  <p className="text-sm text-ink/60">{album.summary}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/40">
                    {album.year} · {album.location}
                  </p>
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
  return {
    props: {
      albums: getAlbums(),
    },
  };
}
