"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "../content/ui";
import { switchTheme } from "./theme-transition";
import { usePreferences } from "./preferences-provider";
import { SproutMark } from "./sprout-mark";
export function SiteHeader() {
  const { locale, theme, setLocale, setTheme } = usePreferences();
  const text = ui[locale];
  const pathname = usePathname();
  return (
    <header className="header-wrap">
      <nav
        className="header-pill"
        aria-label={locale === "zh" ? "主导航" : "Main navigation"}
      >
        <Link
          href="/"
          className="brand"
          aria-label={locale === "zh" ? "谷鱼Y 首页" : "MortyYJT home"}
        >
          <SproutMark /> <span>{locale === "zh" ? "谷鱼Y" : "MortyYJT"}</span>
        </Link>
        <span className="nav-divider" aria-hidden="true" />
        <Link
          href="/resume"
          aria-current={pathname === "/resume" ? "page" : undefined}
        >
          {text.resume}
        </Link>
        <Link
          href="/experience/projects"
          aria-current={
            pathname === "/experience/projects" ? "page" : undefined
          }
        >
          {text.experience}
        </Link>
        <span className="nav-divider" aria-hidden="true" />
        <button
          className="locale-button"
          aria-label={text.language}
          onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
        >
          {locale === "zh" ? "EN" : "中"}
        </button>
        <button
          className="theme-button"
          aria-label={theme === "dark" ? text.light : text.dark}
          onClick={(event) =>
            switchTheme(theme === "dark" ? "light" : "dark", setTheme, {
              x: event.clientX,
              y: event.clientY,
            })
          }
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
