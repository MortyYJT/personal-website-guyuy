import type { Metadata } from "next";
import { siteOpenGraph } from "../../lib/site";
import { SiteShell } from "../../components/site-shell";
import { PicturesContent } from "../../components/pictures-content";
export const metadata: Metadata = {
  title: "Gallery / 画廊",
  alternates: { canonical: "/pictures" },
  openGraph: { ...siteOpenGraph, url: "/pictures" },
};
export default function PicturesPage() {
  return (
    <SiteShell>
      <PicturesContent />
    </SiteShell>
  );
}
