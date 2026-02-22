export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper/70 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-cold/5 to-transparent pointer-events-none"></div>
      <div className="container-padded grid gap-8 py-12 md:grid-cols-[1.1fr_1fr] relative z-10">
        <div className="space-y-3">
          <p className="text-2xl font-bold tracking-widest font-display text-white">
            NOVA Core
          </p>
          <p className="max-w-md text-sm leading-7 text-muted">
            以数字科技的视角解构光影，不迷失于星尘，将每一次凝视都化作跃迁至深空边缘的视觉旅程。
          </p>
        </div>
        <div className="grid gap-3 text-sm text-muted md:justify-self-end md:text-right">
          <a className="transition hover:text-accent-cold" href="mailto:signal@nova.example">
            signal@nova.space
          </a>
          <span className="text-accent-warm/80">Alpha Centauri · Orion · Cygnus</span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">Online Since 2077</span>
        </div>
      </div>
      <div className="container-padded pb-8 text-[11px] uppercase tracking-[0.22em] text-muted/85 relative z-10 flex justify-between items-center">
        <span>© {new Date().getFullYear()} NOVA VISUALS</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cold shadow-[0_0_8px_#06b6d4] animate-pulse"></span>
          SYSTEM ONLINE
        </span>
      </div>
    </footer>
  );
}
