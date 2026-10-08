"use client";
import { SiteHeader } from "./site-header";
import { usePreferences } from "./preferences-provider";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const { locale } = usePreferences();
  return (
    <>
      <a className="skip-link" href="#main">
        {locale === "zh" ? "跳到内容" : "Skip to content"}
      </a>
      <SiteHeader />
      <main id="main" className="content-column" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer content-column">
        <span>© {new Date().getFullYear()} MortyYJT</span>
        <span>
          {locale === "zh"
            ? "保持好奇，慢慢生长。"
            : "Stay curious. Keep growing."}
        </span>
      </footer>
    </>
  );
}
