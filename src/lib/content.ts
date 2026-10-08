import type { Profile, Project, LocalizedText } from "../content/types.ts";

export function getPublishableProjects(
  projects: readonly Project[],
): readonly Project[] {
  return projects.filter(
    (project) =>
      project.evidence.length > 0 &&
      project.evidence.every((url) => url.startsWith("https://")) &&
      project.repositoryUrl.startsWith("https://github.com/") &&
      project.summary.zh.trim() &&
      project.summary.en.trim(),
  );
}
export function getHomeSections(
  profile: Profile,
  projects: readonly Project[],
): readonly { id: string; label: LocalizedText }[] {
  const sections = [
    { id: "hero", label: { zh: "首页", en: "Home" } },
    { id: "about", label: { zh: "关于", en: "About" } },
    { id: "resume", label: { zh: "简历", en: "Resume" } },
  ];
  if (getPublishableProjects(projects).length)
    sections.push({ id: "projects", label: { zh: "项目", en: "Projects" } });
  sections.push({ id: "stack", label: { zh: "技术栈", en: "Stack" } });
  if (
    profile.interests.some((interest) =>
      interest.entries.some((entry) => entry.zh.trim() && entry.en.trim()),
    )
  ) {
    sections.push({
      id: "interests",
      label: { zh: "灵感", en: "Inspiration" },
    });
  }
  sections.push({ id: "contact", label: { zh: "联系", en: "Contact" } });
  return sections;
}
