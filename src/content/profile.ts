import type { LocalizedText, Profile } from "./types";

export const heroEyebrow: LocalizedText = {
  zh: "互联网里的一小片角落",
  en: "A LITTLE CORNER OF THE INTERNET",
};

export const profile: Profile = {
  identity: "谷鱼Y",
  introduction: {
    zh: "墨尔本大学计算机本科在读，做 AI agent 相关的项目。",
    en: "Computer science undergraduate at the University of Melbourne, working on AI agent projects.",
  },
  about: {
    zh: "我是谷鱼Y（MortyYJT），墨尔本大学计算机本科在读，之前在莫纳什大学读了一年。现在主要做 AI agent 相关的项目：OfferPilot（留学申请 agent）和墨大课业 Agent（同步 Canvas 和 Ed 的作业并排进每周计划）。之前带队做过防诈骗 App SageSense，也用 Java 写过两个小游戏。",
    en: "I'm MortyYJT (谷鱼Y), a computer science undergraduate at the University of Melbourne, after a year at Monash University. I mainly work on AI agent projects: OfferPilot (a study-abroad application agent) and the UniMelb Coursework Agent (syncing Canvas and Ed coursework into a weekly plan). Before that I led the anti-scam app SageSense and wrote two small games in Java.",
  },
  githubUrl: "https://github.com/MortyYJT",
  resumeIntro: {
    zh: "墨尔本大学 · 计算机科学",
    en: "The University of Melbourne · Computer Science",
  },
};

export const stack = [
  {
    label: { zh: "Agent 与 AI", en: "Agents & AI" },
    items: ["Tool calling", "RAG with citations", "OpenAI-compatible APIs", "DeepSeek", "Claude Code", "Codex", "OpenSpec"],
  },
  {
    label: { zh: "界面", en: "Interfaces" },
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Jetpack Compose"],
  },
  {
    label: { zh: "服务端与数据", en: "Backend & data" },
    items: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "PostgreSQL", "SQLite", "Node.js", "Zod"],
  },
  {
    label: { zh: "移动与游戏", en: "Mobile & games" },
    items: ["Kotlin", "Android", "Java", "Java2D / Swing"],
  },
  {
    label: { zh: "测试与工程", en: "Testing & tooling" },
    items: ["pytest", "Vitest", "Playwright", "GitHub Actions", "Docker Compose", "Git"],
  },
];

// Newest first.
export const education = [
  {
    period: "2026.07 – 2028.06",
    school: { zh: "墨尔本大学", en: "The University of Melbourne" },
    detail: { zh: "计算机科学 · 本科", en: "Computer Science · Bachelor's" },
  },
  {
    period: "2025.07 – 2026.06",
    school: { zh: "莫纳什大学", en: "Monash University" },
    detail: { zh: "计算机科学 · 本科", en: "Computer Science · Bachelor's" },
  },
];

export const favouriteGames: { name: LocalizedText; icon: string }[] = [
  { name: { zh: "原神", en: "Genshin Impact" }, icon: "/games/genshin-impact.jpg" },
  { name: { zh: "崩坏：星穹铁道", en: "Honkai: Star Rail" }, icon: "/games/honkai-star-rail.jpg" },
  { name: { zh: "绝区零", en: "Zenless Zone Zero" }, icon: "/games/zenless-zone-zero.jpg" },
  { name: { zh: "战争雷霆", en: "War Thunder" }, icon: "/games/war-thunder.jpg" },
  { name: { zh: "Apex 英雄", en: "Apex Legends" }, icon: "/games/apex-legends.jpg" },
  { name: { zh: "反恐精英 2", en: "Counter-Strike 2" }, icon: "/games/cs2.jpg" },
];

// Listed and linked only; the site does not host copyrighted audio. Whether a
// song plays on NetEase depends on the visitor's region and account.
export const favouriteMusic = [
  { title: "昔涟", artist: "张韶涵 / HOYO-MiX", neteaseId: "3316968660" },
  {
    title: "I Really Want to Stay at Your House",
    artist: "Rosa Walton / Hallie Coggins",
    neteaseId: "1496089152",
  },
  { title: "Undertale", artist: "Toby Fox", neteaseId: "39227624" },
  { title: "Snowship", artist: "Patricia Wilde", neteaseId: "27544862" },
  { title: "生きていたんだよな", artist: "宫野栞", neteaseId: "1389428653" },
];
