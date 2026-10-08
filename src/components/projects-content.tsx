"use client";
import Link from "next/link";
import { projects } from "../content/projects";
import { ui } from "../content/ui";
import { getPublishableProjects } from "../lib/content";
import { usePreferences } from "./preferences-provider";
import { ProjectEntry } from "./project-entry";
export function ProjectsContent() {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <div className="document-page">
      <Link className="back-link" href="/">
        ← {text.home}
      </Link>
      <header className="document-heading">
        <p className="eyebrow">
          {locale === "zh"
            ? "想法 · 实践 · 迭代"
            : "IDEAS · PRACTICE · ITERATION"}
        </p>
        <h1>
          {text.experience}
          <span className="greeting-dot">.</span>
        </h1>
        <p>{text.projectIntro}</p>
      </header>
      <div className="detailed-projects">
        {getPublishableProjects(projects).map((project) => (
          <ProjectEntry key={project.id} project={project} detailed />
        ))}
      </div>
      <p className="evidence-note">{text.limits}</p>
    </div>
  );
}
