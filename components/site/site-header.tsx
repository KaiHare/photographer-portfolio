import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/60 backdrop-blur-xl">
      <div className="container-padded flex h-16 items-center justify-between">
        <Link href="/" className="flex items-end gap-3 group">
          <span className="text-2xl font-bold tracking-widest font-display text-white group-hover:text-accent-cold transition-colors">
            NOVA
          </span>
          <span className="hidden pb-1 text-[10px] uppercase tracking-[0.34em] text-accent-cold/80 md:block">
            Deep Space · Cyber Visuals
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.24em] text-muted">
          <Link className="pb-1 transition hover:text-accent-cold" href="/albums">
            星系档案
          </Link>
          <Link className="pb-1 transition hover:text-accent-warm" href="/admin">
            控制台
          </Link>
        </nav>
      </div>
    </header>
  );
}
