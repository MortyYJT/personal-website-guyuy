import type { Project } from "../content/types.ts";

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
