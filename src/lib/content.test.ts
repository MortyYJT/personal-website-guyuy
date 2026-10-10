import test from "node:test";
import assert from "node:assert/strict";
import { getPublishableProjects } from "./content.ts";
import type { Project } from "../content/types.ts";

const project: Project = {
  id: "example",
  title: { zh: "示例", en: "Example" },
  summary: { zh: "可验证项目", en: "A verifiable project" },
  technologies: [],
  repositoryUrl: "https://github.com/MortyYJT/example",
  status: "in-progress",
  year: "2026",
  evidence: ["https://github.com/MortyYJT/example/blob/main/package.json"],
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
