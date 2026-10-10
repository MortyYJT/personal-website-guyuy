import type { Metadata } from "next";
import { siteOpenGraph } from "../../lib/site";
import { SiteShell } from "../../components/site-shell";
import { ProjectsContent } from "../../components/projects-content";
export const metadata: Metadata = {
  title: "Projects / 项目",
  alternates: { canonical: "/projects" },
  openGraph: { ...siteOpenGraph, url: "/projects" },
};
export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectsContent />
    </SiteShell>
  );
}
