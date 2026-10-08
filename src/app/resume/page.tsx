import type { Metadata } from "next";
import { SiteShell } from "../../components/site-shell";
import { ResumeContent } from "../../components/resume-content";
export const metadata: Metadata = { title: "Resume / 简历" };
export default function ResumePage() {
  return (
    <SiteShell>
      <ResumeContent />
    </SiteShell>
  );
}
