import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-bone/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-6 border-b border-line">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight font-display text-ink">Lumiere</span>
          <span className="text-[11px] uppercase tracking-[0.35em] text-muted">
            Atelier · Photography Journal
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-[12px] uppercase tracking-[0.28em] text-muted">
          <Link className="pb-1 border-b border-transparent hover:text-ink hover:border-ink" href="/albums">
            作品
          </Link>
          <Link className="pb-1 border-b border-transparent hover:text-ink hover:border-ink" href="/admin">
            管理
          </Link>
          <a
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "h-8 px-4 text-[11px] font-medium tracking-[0.2em] bg-transparent text-muted hover:text-ink hover:border-ink",
              "border border-line hover:border-ink"
            )}
            href="mailto:studio@lumiere.example"
          >
            预约拍摄
          </a>
        </nav>
      </div>
      <div className="h-px w-full bg-line" />
    </header>
  );
}
