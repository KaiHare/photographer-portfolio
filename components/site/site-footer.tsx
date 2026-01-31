export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-bone/70">
      <div className="container-padded flex flex-col gap-2 py-10 text-sm text-ink/70 md:flex-row md:items-center md:justify-between">
        <div className="font-display text-base text-ink">
          Lumiere Atelier
        </div>
        <div className="flex flex-wrap gap-4">
          <a className="hover:text-ink" href="mailto:studio@lumiere.example">
            studio@lumiere.example
          </a>
          <span>Tokyo · Seoul · Vancouver</span>
        </div>
      </div>
    </footer>
  );
}
