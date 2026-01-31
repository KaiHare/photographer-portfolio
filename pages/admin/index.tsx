import Link from "next/link";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Admin() {
  return (
    <div className="grain min-h-screen">
      <SiteHeader />
      <main className="container-padded py-16">
        <div className="max-w-2xl space-y-6 rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Admin workspace (placeholder)
          </p>
          <h1 className="text-3xl font-semibold font-display">
            Upload, organize, and publish.
          </h1>
          <p className="text-sm text-ink/60">
            This area will connect to a serverless AWS backend for secure
            uploads, album metadata, and publishing workflows. Authentication
            and role management will be added after MVP.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className={cn(buttonVariants())} href="/albums">
              Preview albums
            </Link>
            <a
              className={cn(buttonVariants({ variant: "outline" }))}
              href="mailto:studio@lumiere.example"
            >
              Contact studio
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
