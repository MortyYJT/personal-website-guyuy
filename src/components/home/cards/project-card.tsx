"use client";
import Link from "next/link";
import { projects } from "../../../content/projects";
import { ui } from "../../../content/ui";
import { getPublishableProjects } from "../../../lib/content";
import { usePreferences } from "../../preferences-provider";
import { Card } from "./card";

export function ProjectCard() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const project = getPublishableProjects(projects)[0];
  if (!project) return null;
  return (
    <Card area="project" order={5}>
      <p className="card-eyebrow">{text.projects}</p>
      <h2 className="card-title">
        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
          {project.title[locale]} <span aria-hidden="true">↗</span>
        </a>
      </h2>
      <p className="project-card-summary">{project.summary[locale]}</p>
      <ul className="tag-list" aria-label={text.stack}>
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <Link className="text-link" href="/experience/projects">
        {text.explore} <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
