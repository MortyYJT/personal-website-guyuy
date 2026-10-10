export type Locale = "zh" | "en";
export type Theme = "dark" | "light";
export type LocalizedText = Record<Locale, string>;
export type Preferences = { locale: Locale; theme: Theme };
export type Project = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  technologies: readonly string[];
  repositoryUrl: string;
  status: "in-progress" | "implemented";
  evidence: readonly string[];
};
export type Profile = {
  identity: "MortyYJT" | "谷鱼Y";
  introduction: LocalizedText;
  about: LocalizedText;
  githubUrl: string;
  resumeIntro: LocalizedText;
};
