import Link from "next/link";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-lg font-semibold tracking-wide">
            Lumen Atelier
          </Link>
          <nav className="flex items-center gap-6 text-sm text-white/80">
            <Link href="/albums">Albums</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© 2024 Lumen Atelier. All rights reserved.</span>
          <span>Hosted on S3 + CloudFront • Serverless metadata API</span>
        </div>
      </footer>
    </div>
  );
}
