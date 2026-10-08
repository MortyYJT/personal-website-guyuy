"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "../../content/profile";
import { projects } from "../../content/projects";
import { getHomeSections } from "../../lib/content";
import { usePreferences } from "../preferences-provider";
const sections = getHomeSections(profile, projects);
export function SectionDock() {
  const { locale } = usePreferences();
  const [active, setActive] = useState("hero");
  const dock = useRef<HTMLElement>(null);
  useEffect(() => {
    function update() {
      const line = window.innerHeight * 0.36;
      let id = sections[0].id;
      for (const section of sections)
        if (
          (document.getElementById(section.id)?.getBoundingClientRect().top ??
            Infinity) <= line
        )
          id = section.id;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      )
        id = sections.at(-1)!.id;
      setActive(id);
    }
    const observer = new IntersectionObserver(update, {
      rootMargin: "-15% 0px -50% 0px",
      threshold: 0,
    });
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);
  useEffect(() => {
    const link = dock.current?.querySelector<HTMLElement>(
      `[href="#${active}"]`,
    );
    if (link && dock.current)
      dock.current.scrollTo({
        left:
          link.offsetLeft - dock.current.clientWidth / 2 + link.clientWidth / 2,
        behavior: "instant",
      });
  }, [active]);
  return (
    <nav
      ref={dock}
      className="section-dock"
      aria-label={locale === "zh" ? "页面章节" : "Page sections"}
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "location" : undefined}
        >
          {section.label[locale]}
        </a>
      ))}
    </nav>
  );
}
