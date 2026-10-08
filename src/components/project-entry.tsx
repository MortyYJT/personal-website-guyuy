"use client";
import type { Project } from "../content/types";
import { ui } from "../content/ui";
import { usePreferences } from "./preferences-provider";
export function ProjectEntry({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <article className="project-entry">
      <div className="project-topline">
        <h3>
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.title[locale]} <span aria-hidden="true">↗</span>
          </a>
        </h3>
        <span className="project-status">
          <i aria-hidden="true" />
          {project.status === "in-progress"
            ? text.inProgress
            : text.implemented}
        </span>
      </div>
      <p>{project.summary[locale]}</p>
      <ul className="tag-list" aria-label={text.stack}>
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {detailed && (
        <div className="evidence-links">
          {project.evidence.map((url, index) => (
            <a href={url} target="_blank" rel="noopener noreferrer" key={url}>
              {text.evidence} {index + 1} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
