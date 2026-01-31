import Head from "next/head";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <Layout>
      <Head>
        <title>Admin — Lumen Atelier</title>
      </Head>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
            Portfolio control room
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/70">
            The admin area will eventually handle uploads, metadata, and album
            publishing workflows. For now it serves as a placeholder for the
            serverless backend integration.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Upload pipeline",
              description:
                "Connect to S3-backed uploads, automatic resizing, and metadata tagging."
            },
            {
              title: "Album management",
              description:
                "Draft, schedule, and publish new photo collections with CDN-friendly slugs."
            },
            {
              title: "Client delivery",
              description:
                "Share private proofing links and export press-ready bundles."
            },
            {
              title: "Monitoring",
              description:
                "Track CloudFront performance and serverless API health in real time."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-white/60">{item.description}</p>
              <Button variant="secondary" className="mt-5">
                Coming soon
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
