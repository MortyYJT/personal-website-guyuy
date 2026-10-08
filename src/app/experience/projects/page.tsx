import type { Metadata } from "next";
import { siteOpenGraph } from "../../../lib/site";
import { SiteShell } from "../../../components/site-shell";
import { ProjectsContent } from "../../../components/projects-content";
export const metadata: Metadata = {
  title: "Projects / 项目经历",
  alternates: { canonical: "/experience/projects" },
  openGraph: { ...siteOpenGraph, url: "/experience/projects" },
};
export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectsContent />
    </SiteShell>
  );
}
