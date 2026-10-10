import type { Metadata } from "next";
import { siteOpenGraph } from "../../lib/site";
import { SiteShell } from "../../components/site-shell";
import { FriendsContent } from "../../components/friends-content";
export const metadata: Metadata = {
  title: "Friends / 友链",
  alternates: { canonical: "/friends" },
  openGraph: { ...siteOpenGraph, url: "/friends" },
};
export default function FriendsPage() {
  return (
    <SiteShell>
      <FriendsContent />
    </SiteShell>
  );
}
