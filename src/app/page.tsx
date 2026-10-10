import { OpeningAnimation } from "../components/opening-animation";
import type { Metadata } from "next";
import { siteOpenGraph } from "../lib/site";
import { SiteShell } from "../components/site-shell";
import { HomeContent } from "../components/home/home-content";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...siteOpenGraph, url: "/" },
};
export default function HomePage() {
  return (
    <SiteShell home>
      <OpeningAnimation />
      <HomeContent />
    </SiteShell>
  );
}
