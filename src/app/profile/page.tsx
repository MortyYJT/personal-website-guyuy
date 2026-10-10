import type { Metadata } from "next";
import { siteOpenGraph } from "../../lib/site";
import { SiteShell } from "../../components/site-shell";
import { ProfileContent } from "../../components/profile-content";
export const metadata: Metadata = {
  title: "Profile / 小档案",
  alternates: { canonical: "/profile" },
  openGraph: { ...siteOpenGraph, url: "/profile" },
};
export default function ProfilePage() {
  return (
    <SiteShell>
      <ProfileContent />
    </SiteShell>
  );
}
