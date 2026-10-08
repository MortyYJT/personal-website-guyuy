import type { Metadata } from "next";
import { SiteShell } from "../../../components/site-shell";
import { ProjectsContent } from "../../../components/projects-content";
export const metadata: Metadata = { title: "Projects / 项目经历" };
export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectsContent />
    </SiteShell>
  );
}
