import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-bone/80 backdrop-blur">
      <div className="container-padded flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-tight font-display">
            Lumiere Atelier
          </span>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-ink/50 md:inline">
            Photographer Portfolio
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link className="rounded-full px-3 py-2 text-ink/70 hover:text-ink" href="/albums">
            Albums
          </Link>
          <Link className="rounded-full px-3 py-2 text-ink/70 hover:text-ink" href="/admin">
            Admin
          </Link>
          <a
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            href="mailto:studio@lumiere.example"
          >
            Book a session
          </a>
        </nav>
      </div>
    </header>
  );
}
