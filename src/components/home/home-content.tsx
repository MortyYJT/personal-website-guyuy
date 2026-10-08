"use client";
import Link from "next/link";
import { profile, stack } from "../../content/profile";
import { projects } from "../../content/projects";
import { ui } from "../../content/ui";
import { getPublishableProjects } from "../../lib/content";
import { usePreferences } from "../preferences-provider";
import { ProjectEntry } from "../project-entry";
import { Hero } from "./hero";
import { Section } from "./section";
import { SectionDock } from "./section-dock";
export function HomeContent() {
  const { locale } = usePreferences();
  const text = ui[locale];
  const visibleProjects = getPublishableProjects(projects);
  return (
    <>
      <Hero />
      <Section id="about" title={text.about}>
        <p className="about-copy">{profile.about[locale]}</p>
      </Section>
      <Section id="resume" title={text.resume}>
        <p>{text.resumeNote}</p>
        <Link className="text-link" href="/resume">
          {text.viewResume} <span aria-hidden="true">↗</span>
        </Link>
      </Section>
      {visibleProjects.length > 0 && (
        <Section id="projects" title={text.projects}>
          <div className="project-list">
            {visibleProjects.map((project) => (
              <ProjectEntry key={project.id} project={project} />
            ))}
          </div>
          <Link className="text-link" href="/experience/projects">
            {text.explore} <span aria-hidden="true">↗</span>
          </Link>
        </Section>
      )}
      <Section id="stack" title={text.stack}>
        <p>{text.stackNote}</p>
        <div className="stack-list">
          {stack.map((group) => (
            <div className="stack-row" key={group.label.en}>
              <h3>{group.label[locale]}</h3>
              <ul className="stack-tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      {profile.interests.some((interest) =>
        interest.entries.some((entry) => entry.zh.trim() && entry.en.trim()),
      ) && (
        <Section
          id="interests"
          title={locale === "zh" ? "灵感" : "Inspiration"}
        >
          {profile.interests.map((interest) => (
            <div key={interest.id}>
              <h3>{interest.label[locale]}</h3>
              <ul>
                {interest.entries
                  .filter((entry) => entry.zh.trim() && entry.en.trim())
                  .map((entry) => (
                    <li key={entry.en}>{entry[locale]}</li>
                  ))}
              </ul>
            </div>
          ))}
        </Section>
      )}
      <Section id="contact" title={text.contact}>
        <p>{text.contactNote}</p>
        <a
          className="contact-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <p className="contact-signoff">{text.availability}</p>
      </Section>
      <SectionDock />
    </>
  );
}
