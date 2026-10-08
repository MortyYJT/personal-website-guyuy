import type { Metadata } from "next";
import { siteOpenGraph } from "../../lib/site";
import { SiteShell } from "../../components/site-shell";
import { ResumeContent } from "../../components/resume-content";
export const metadata: Metadata = {
  title: "Resume / 简历",
  alternates: { canonical: "/resume" },
  openGraph: { ...siteOpenGraph, url: "/resume" },
};
export default function ResumePage() {
  return (
    <SiteShell>
      <ResumeContent />
    </SiteShell>
  );
}
