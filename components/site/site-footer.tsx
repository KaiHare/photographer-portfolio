export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bone/80">
      <div className="container-padded flex flex-col gap-3 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
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
