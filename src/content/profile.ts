import type { LocalizedText, Profile } from "./types";

export const heroEyebrow: LocalizedText = {
  zh: "互联网里的一小片角落",
  en: "A LITTLE CORNER OF THE INTERNET",
};

export const profile: Profile = {
  identity: "谷鱼Y",
  introduction: {
    zh: "把想法，慢慢做成现实。",
    en: "Turning ideas into things that work.",
  },
  about: {
    zh: "我是谷鱼Y，也可以叫我 MortyYJT。这里是我的一小块互联网：记录正在做的项目，也留下学习和探索的痕迹。最近的实践围绕 AI 助手与申请规划工具展开，从一个想法开始，逐步把交互、数据和实现连接起来。",
    en: "I'm MortyYJT, also known as 谷鱼Y. This is my little corner of the internet: a place for projects, learning, and things I'm figuring out. My recent work explores AI assistants and application planning tools, connecting ideas with interfaces, data, and implementation.",
  },
  githubUrl: "https://github.com/MortyYJT",
  resumeIntro: {
    zh: "一些项目，一段持续探索的过程。",
    en: "Selected projects. An ongoing exploration.",
  },
  interests: [],
};

export const stack = [
  {
    label: { zh: "界面", en: "Interfaces" },
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    label: { zh: "服务端", en: "Backend" },
    items: ["Python", "FastAPI", "SQLAlchemy"],
  },
  {
    label: { zh: "AI 与工具", en: "AI & tools" },
    items: ["LangChain", "Git", "GitHub"],
  },
];

export const phrases = [
  { zh: "在探索 AI 的可能性。", en: "exploring what AI can do." },
  { zh: "喜欢把想法做出来。", en: "turning ideas into projects." },
  { zh: "一直在学习，也一直在做。", en: "learning by building." },
];
