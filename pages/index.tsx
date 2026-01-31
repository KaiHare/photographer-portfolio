import Head from "next/head";
import Link from "next/link";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Lumen Atelier — Photographer Portfolio</title>
      </Head>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            Fine art • editorial • travel
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Curated photo stories built for speed, clarity, and emotion.
          </h1>
          <p className="text-base text-white/70 md:text-lg">
            Lumen Atelier is a static-first portfolio designed to spotlight albums
            with immersive visuals. Every gallery is optimized for fast global
            delivery through S3 and CloudFront while a serverless backend handles
            uploads and metadata.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/albums">Explore albums</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin">Admin dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-white/50">Latest release</p>
              <h2 className="text-2xl font-semibold">Northern Lights Expedition</h2>
              <p className="mt-2 text-sm text-white/70">
                24 photos • Norway &amp; Iceland • Winter 2024
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Delivery
                </p>
                <p className="mt-2 text-lg font-medium">Static + CDN</p>
                <p className="mt-1 text-sm text-white/60">
                  Pre-rendered pages for SEO and near-instant load times.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Backend
                </p>
                <p className="mt-2 text-lg font-medium">Serverless APIs</p>
                <p className="mt-1 text-sm text-white/60">
                  Upload, tagging, and metadata live in AWS Lambda + DynamoDB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
