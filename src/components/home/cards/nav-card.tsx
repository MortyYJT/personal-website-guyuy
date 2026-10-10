"use client";
import Link from "next/link";
import { profile } from "../../../content/profile";
import { ui } from "../../../content/ui";
import { usePreferences } from "../../preferences-provider";
import { Avatar } from "./avatar";
import { Card } from "./card";

export function NavCard() {
  const { locale, theme, setLocale, setTheme } = usePreferences();
  const text = ui[locale];
  return (
    <Card area="nav" order={0}>
      <div className="nav-card-brand">
        <Avatar size={40} locale={locale} />
        <span>{locale === "zh" ? "谷鱼Y" : "MortyYJT"}</span>
      </div>
      <nav aria-label={text.navigation}>
        <ul className="nav-card-links">
          <li>
            <Link href="/resume">{text.resume}</Link>
          </li>
          <li>
            <Link href="/experience/projects">{text.experience}</Link>
          </li>
          <li>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="nav-card-toggles">
        <button
          aria-label={text.language}
          onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
        >
          {locale === "zh" ? "EN" : "中"}
        </button>
        <button
          aria-label={theme === "dark" ? text.light : text.dark}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </Card>
  );
}
