"use client";
import Link from "next/link";
import { projects } from "../content/projects";
import { ui } from "../content/ui";
import { getPublishableProjects } from "../lib/content";
import { usePreferences } from "./preferences-provider";

export function ProjectsContent() {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <div className="gallery-page">
      <header className="gallery-heading">
        <Link className="back-link" href="/">
          ← {text.home}
        </Link>
        <h1>{text.projectsTitle}</h1>
        <p>{text.projectIntro}</p>
      </header>
      <div className="gallery-grid">
        {getPublishableProjects(projects).map((project) => (
          <article className="gallery-card" key={project.id}>
            <div className="gallery-card-head">
              <span className="project-logo" aria-hidden="true">
                {project.title.en}
              </span>
              <div>
                <h2>
                  {project.title[locale]} <span className="gallery-year">{project.year}</span>
                </h2>
                <ul className="chip-list" aria-label={text.stack}>
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p>{project.summary[locale]}</p>
            <div className="gallery-actions">
              <a className="chip-button" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                {text.repository} <span aria-hidden="true">↗</span>
              </a>
              {project.evidence.map((url, index) => (
                <a className="chip-link" href={url} target="_blank" rel="noopener noreferrer" key={url}>
                  {text.evidence} {index + 1}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="gallery-note">{text.limits}</p>
    </div>
  );
}
