import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    id: "leapashore",
    title: { zh: "鱼跃彼岸", en: "LeapAshore" },
    summary: {
      zh: "硕士留学申请规划 agent，覆盖 QS 2027 前 300 的大学。把申请拆成一张六阶段路线图，按背景逐条对照官方要求，把项目分成冲刺 / 匹配 / 保底；LangGraph 顾问回答前先过证据门槛，找不到官方出处就直说，改动选校组合前会等你点确认。已部署上线；大部分院校的录取要求还在采集，已有的也标为待核验。",
      en: "A master's application-planning agent covering the QS 2027 top 300 universities. It breaks an application into a six-phase roadmap and tiers programs as reach / match / safe by checking a background against each published requirement, one rule at a time. The LangGraph advisor passes an evidence gate before answering, says so when it cannot find an official source, and waits for a confirm click before changing the school list. Deployed; most admission requirements are still being collected, and the ones present are marked as pending verification.",
    },
    technologies: ["Next.js", "TypeScript", "FastAPI", "LangGraph", "PostgreSQL", "Docker Compose"],
    repositoryUrl: "https://github.com/MortyYJT/LeapAshore",
    status: "in-progress",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/LeapAshore/blob/main/api/app/agent/graph.py",
      "https://github.com/MortyYJT/LeapAshore/blob/main/api/app/agent/evidence.py",
      "https://github.com/MortyYJT/LeapAshore/blob/main/api/app/routers/roadmap.py",
    ],
  },
  {
    id: "studyorbit",
    title: { zh: "StudyOrbit", en: "StudyOrbit" },
    summary: {
      zh: "本地优先的墨大课业助手：从你已登录的 Canvas、Ed 和 Handbook 读取课程信息，交给你选的模型整理成课程 JSON，经代码校验后在网页里显示成绩和权重、排每周学习计划，还能就课程回答问题（只讲解和规划，不代写作业）。数据留在本机。仍是原型，采集目前以 macOS + Edge 为主。",
      en: "A local-first coursework assistant for the University of Melbourne. It reads Canvas, Ed, and the Handbook from your signed-in session, has a model you choose turn them into course JSON that code then validates, and shows grades and weights, plans your week, and answers questions about your courses (explaining and planning only, never doing the work). Data stays on your machine. Still a prototype; collection currently targets macOS and Edge.",
    },
    technologies: ["TypeScript", "React", "Vite", "Zod", "Vitest"],
    repositoryUrl: "https://github.com/MortyYJT/studyorbit",
    status: "in-progress",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/studyorbit/blob/main/scripts/lib/course-analysis.mjs",
      "https://github.com/MortyYJT/studyorbit/blob/main/shared/course-calculations.ts",
      "https://github.com/MortyYJT/studyorbit/blob/main/web/src/Agent.tsx",
    ],
  },
  {
    id: "personal-website",
    title: { zh: "这个网站", en: "This website" },
    summary: {
      zh: "你正在看的个人网站：Next.js 静态导出后部署到 GitHub Pages，毛玻璃卡片首页、跨页面不中断的音乐播放器、视图过渡的主题切换。",
      en: "The site you are reading: a Next.js static export on GitHub Pages with a glass-card home, a music player that keeps playing across pages, and View Transition theme switching.",
    },
    technologies: ["Next.js", "TypeScript", "React", "GitHub Actions"],
    repositoryUrl: "https://github.com/MortyYJT/personal-website-guyuy",
    status: "in-progress",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/personal-website-guyuy/blob/main/src/components/persistent-player.tsx",
      "https://github.com/MortyYJT/personal-website-guyuy/blob/main/.github/workflows/pages.yml",
    ],
  },
  {
    id: "sagesense",
    title: { zh: "SageSense", en: "SageSense" },
    summary: {
      zh: "面向老年人的 Android 防诈骗助手，黑客松原型。在用户授权下检查通知和来电号码，在本地给出可解释的风险提示，并由 FastAPI 后端提供带官方出处的中英双语问答。团队项目，我担任总负责人，编写了几乎全部代码。",
      en: "An Android anti-scam companion for older adults, built as a hackathon prototype. With permission it checks notifications and caller numbers, raises explainable risk warnings on-device, and offers a bilingual, citation-backed advisor through a FastAPI backend. A team project that I led and wrote almost all of the code for.",
    },
    technologies: ["Kotlin", "Jetpack Compose", "Python", "FastAPI"],
    repositoryUrl: "https://github.com/MortyYJT/sagesense",
    status: "implemented",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/sagesense/blob/main/android/app/src/main/java/com/mortyyjt/sagesense/risk/RiskAnalyzer.kt",
      "https://github.com/MortyYJT/sagesense/blob/main/backend/app/agent.py",
    ],
  },
  {
    id: "garbage-collection-inc",
    title: { zh: "Garbage Collection Inc", en: "Garbage Collection Inc" },
    summary: {
      zh: "以废弃月球设施为背景的 Java 控制台生存游戏：回收废料、完成公司配额，应对生物、感染和天气异常。控制台引擎由课程提供，玩法系统在 src/game 下，天气系统有回归测试。",
      en: "A Java console survival game set in derelict lunar facilities: recover scrap, meet company quotas, and survive creatures, infection, and weather anomalies. The console engine was provided by the course; the gameplay systems live under src/game, with regression tests for weather.",
    },
    technologies: ["Java", "Maven"],
    repositoryUrl: "https://github.com/MortyYJT/Garbage-Collection-Inc",
    status: "implemented",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/Garbage-Collection-Inc/tree/main/src/game/weather",
      "https://github.com/MortyYJT/Garbage-Collection-Inc/tree/main/src/game/spawning",
    ],
  },
  {
    id: "bullet-bloom",
    title: { zh: "Bullet Bloom", en: "Bullet Bloom" },
    summary: {
      zh: "2D 像素风俯视角射击游戏。把课程里的 C++/SplashKit 射击游戏作业改写成纯 JDK 的 Java2D/Swing 版本：120 FPS 固定步长循环、冲刺和格挡、四种武器、多类敌人与波次。",
      en: "A 2D pixel-art top-down shooter: a JDK-only Java2D/Swing rewrite of a C++/SplashKit course assignment, with a fixed-step 120 FPS loop, dash and block, four weapons, and several enemy types in waves.",
    },
    technologies: ["Java", "Java2D", "Swing"],
    repositoryUrl: "https://github.com/MortyYJT/Bullet-Bloom",
    status: "implemented",
    year: "2025",
    evidence: [
      "https://github.com/MortyYJT/Bullet-Bloom/blob/main/src/main/java/bulletbloom/app/GameLoop.java",
      "https://github.com/MortyYJT/Bullet-Bloom/blob/main/src/main/java/bulletbloom/enemy/WaveController.java",
    ],
  },
];
