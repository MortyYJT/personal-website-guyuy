"use client";
import Link from "next/link";
import {
  education,
  favouriteGames,
  favouriteMusic,
  profile,
  stack,
} from "../content/profile";
import { projects } from "../content/projects";
import { ui } from "../content/ui";
import { getPublishableProjects } from "../lib/content";
import { usePreferences } from "./preferences-provider";
import { SproutMark } from "./sprout-mark";
import { ProjectEntry } from "./project-entry";
export function ProfileContent() {
  const { locale } = usePreferences();
  const text = ui[locale];
  return (
    <div className="document-page">
      <Link className="back-link" href="/">
        ← {text.home}
      </Link>
      <header className="document-heading">
        <SproutMark />
        <p className="eyebrow">{text.profilePage}</p>
        <h1>{locale === "zh" ? "谷鱼Y" : "MortyYJT"}</h1>
        <p>{profile.resumeIntro[locale]}</p>
        <a
          className="text-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/MortyYJT ↗
        </a>
      </header>
      <section className="document-section">
        <h2>{text.profile}</h2>
        <p>{profile.about[locale]}</p>
      </section>
      <section className="document-section">
        <h2>{text.education}</h2>
        <ol className="timeline">
          {education.map((entry) => (
            <li className="stack-row" key={entry.period}>
              <h3>{entry.period}</h3>
              <div>
                <strong>{entry.school[locale]}</strong>
                <p>{entry.detail[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="document-section">
        <h2>{text.selected}</h2>
        {getPublishableProjects(projects).map((project) => (
          <ProjectEntry project={project} key={project.id} />
        ))}
        <Link className="text-link" href="/projects">
          {text.explore} ↗
        </Link>
      </section>
      <section className="document-section">
        <h2>{text.stack}</h2>
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
      </section>
      <section className="document-section">
        <h2>{text.games}</h2>
        <ul className="stack-tags">
          {favouriteGames.map((game) => (
            <li key={game.en}>{game[locale]}</li>
          ))}
        </ul>
      </section>
      <section className="document-section">
        <h2>{text.music}</h2>
        <ul className="music-list">
          {favouriteMusic.map((song) => (
            <li key={song.title}>
              <span>{song.title}</span>
              <span>{song.artist}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="document-section">
        <h2>{text.contact}</h2>
        <a
          className="text-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.github} ↗
        </a>
      </section>
    </div>
  );
}
