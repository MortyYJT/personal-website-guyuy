"use client";
import Link from "next/link";
import { navItems } from "../../../content/nav";
import { ui } from "../../../content/ui";
import { switchTheme } from "../../theme-transition";
import { usePreferences } from "../../preferences-provider";
import { NavIcon } from "../../nav-icon";
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
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <NavIcon name={item.icon} />
                {item.label[locale]}
              </Link>
            </li>
          ))}
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
          onClick={(event) =>
            switchTheme(theme === "dark" ? "light" : "dark", setTheme, {
              x: event.clientX,
              y: event.clientY,
            })
          }
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </Card>
  );
}
