"use client";
import { site } from "../content/site";
import { ui } from "../content/ui";
import { SiteHeader } from "./site-header";
import { usePreferences } from "./preferences-provider";
export function SiteShell({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const { locale } = usePreferences();
  return (
    <div className={home ? "shell shell-home" : "shell"}>
      {site.backgroundImage && (
        <div
          className="site-backdrop"
          style={{ backgroundImage: `url(${site.backgroundImage.src})` }}
          aria-hidden="true"
        />
      )}
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
          {ui[locale].credit}{" "}
          <a href="https://github.com/YYsuni/2025-blog-public" target="_blank" rel="noopener noreferrer">
            YYsuni
          </a>{" "}
          ·{" "}
          <a href="https://lvyovo-wiki.tech/" target="_blank" rel="noopener noreferrer">
            lvy-neko
          </a>
          {site.backgroundImage && <> · {site.backgroundImage.credit}</>}
        </span>
      </footer>
    </div>
  );
}
