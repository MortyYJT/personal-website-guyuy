"use client";
import Link from "next/link";
import { SiteShell } from "../components/site-shell";
import { FishMark } from "../components/fish-mark";
import { usePreferences } from "../components/preferences-provider";
import { ui } from "../content/ui";
export default function NotFound() {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <SiteShell>
      <div className="not-found">
        <FishMark />
        <p className="eyebrow">404</p>
        <h1>{text.notFound}</h1>
        <p>{text.notFoundNote}</p>
        <Link className="text-link" href="/">
          ← {text.home}
        </Link>
      </div>
    </SiteShell>
  );
}
