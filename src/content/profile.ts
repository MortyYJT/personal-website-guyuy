import type { LocalizedText, Profile } from "./types";

export const heroEyebrow: LocalizedText = {
  zh: "互联网里的一小片角落",
  en: "A LITTLE CORNER OF THE INTERNET",
};

export const profile: Profile = {
  identity: "谷鱼Y",
  introduction: {
    zh: "在墨尔本读计算机，平时折腾 agent。",
    en: "Studying CS in Melbourne, tinkering with agents.",
  },
  about: {
    zh: "我是谷鱼Y，也叫 MortyYJT，在墨尔本大学读计算机（之前在莫纳什）。平时主要折腾 AI agent：让模型能稳定地调用工具、查资料、给出出处。最近在做课业管理和留学申请相关的小工具。不写代码的时候，多半在打游戏。",
    en: "I'm MortyYJT, also known as 谷鱼Y, studying computer science at the University of Melbourne (after a year at Monash). Most of my time goes into AI agents: getting models to call tools reliably, look things up, and cite their sources. Lately I'm building small tools for coursework and study-abroad applications. When I'm not coding, I'm probably gaming.",
  },
  githubUrl: "https://github.com/MortyYJT",
  resumeIntro: {
    zh: "写 agent，打游戏，偶尔认真。",
    en: "Building agents, playing games, occasionally serious.",
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
