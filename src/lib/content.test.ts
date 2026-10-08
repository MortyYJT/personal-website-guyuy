import test from "node:test";
import assert from "node:assert/strict";
import { getHomeSections, getPublishableProjects } from "./content.ts";
import type { Profile, Project } from "../content/types.ts";

const project: Project = {
  id: "example",
  title: { zh: "示例", en: "Example" },
  summary: { zh: "可验证项目", en: "A verifiable project" },
  technologies: [],
  repositoryUrl: "https://github.com/MortyYJT/example",
  status: "in-progress",
  evidence: ["https://github.com/MortyYJT/example/blob/main/package.json"],
};
const profile: Profile = {
  identity: "MortyYJT",
  introduction: { zh: "介绍", en: "Introduction" },
  about: { zh: "关于", en: "About" },
  githubUrl: "https://github.com/MortyYJT",
  resumeIntro: { zh: "简历", en: "Resume" },
  interests: [],
};

test("publishing excludes a project with no evidence", () => {
  assert.deepEqual(
    getPublishableProjects([{ ...project, evidence: [] }, project]).map(
      (x) => x.id,
    ),
    ["example"],
  );
});
test("publishing excludes a project missing either translation", () => {
  assert.equal(
    getPublishableProjects([{ ...project, summary: { zh: "描述", en: "  " } }])
      .length,
    0,
  );
});
test("publishing excludes an unsafe repository link", () => {
  assert.equal(
    getPublishableProjects([
      { ...project, repositoryUrl: "javascript:alert(1)" },
    ]).length,
    0,
  );
});
test("empty optional sections have no dock destinations", () => {
  assert.deepEqual(
    getHomeSections(profile, []).map((x) => x.id),
    ["hero", "about", "resume", "stack", "contact"],
  );
});
test("dock includes only populated project and interest sections", () => {
  const populated = {
    ...profile,
    interests: [
      {
        id: "books",
        label: { zh: "书籍", en: "Books" },
        entries: [{ zh: "内容", en: "Entry" }],
      },
    ],
  };
  assert.deepEqual(
    getHomeSections(populated, [project]).map((x) => x.id),
    ["hero", "about", "resume", "projects", "stack", "interests", "contact"],
  );
});
test("section IDs remain stable regardless of localized labels", () => {
  const sections = getHomeSections(profile, [project]);
  assert.deepEqual(
    sections.map((x) => x.id),
    ["hero", "about", "resume", "projects", "stack", "contact"],
  );
  assert.equal(sections.find((x) => x.id === "projects")?.label.en, "Projects");
});
