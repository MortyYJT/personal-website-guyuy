import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    id: "offerpilot",
    title: { zh: "OfferPilot", en: "OfferPilot" },
    summary: {
      zh: "澳洲硕士申请的长期规划工具。已实现用户资料、带官方出处的申请路线图与任务管理，以及申请材料库（上传、版本、归档）和逐条对应官方要求的材料审核记录。尚未接入模型，录取数据仍标为待核验。",
      en: "A long-horizon planner for Australian master's applications. Implemented so far: applicant profiles, a sourced application roadmap with task management, a material library (upload, versions, archiving), and review records tied to official requirements. No model is connected yet, and admission data is still marked as pending verification.",
    },
    technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    repositoryUrl: "https://github.com/MortyYJT/offerpilot",
    status: "in-progress",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/offerpilot/blob/main/api/app/routers/roadmap.py",
      "https://github.com/MortyYJT/offerpilot/blob/main/api/app/routers/documents.py",
      "https://github.com/MortyYJT/offerpilot/blob/main/api/app/routers/review_criteria.py",
    ],
  },
  {
    id: "unimelb-coursework-agent",
    title: { zh: "墨大课业 Agent", en: "UniMelb Coursework Agent" },
    summary: {
      zh: "给墨尔本大学学生用的课业命令行工具：从 Canvas 和 Ed 同步作业、权重和截止时间，把作业拆成附原文出处的任务，再排进每周计划。定位是让通用 agent 能可靠读写课业数据的工具层，数据只留在本机。目前已完成数据模型、统一返回格式、SQLite 存储和登录后的页面抓取，同步和排程正在做。",
      en: "A command-line coursework tool for University of Melbourne students: it syncs assignments, weights, and due dates from Canvas and Ed, breaks assignments into tasks cited to the original text, and fits them into a weekly plan. It is meant as a tool layer that general-purpose agents can rely on, with data kept on the local machine. Done so far: the data model, a uniform response envelope, SQLite storage, and logged-in page capture; syncing and scheduling are in progress.",
    },
    technologies: ["TypeScript", "Node.js", "Playwright", "SQLite", "Zod"],
    repositoryUrl: "https://github.com/MortyYJT/unimelb-coursework-agent",
    status: "in-progress",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/unimelb-coursework-agent/blob/main/src/capture/command.ts",
      "https://github.com/MortyYJT/unimelb-coursework-agent/blob/main/src/protocol/envelope.ts",
      "https://github.com/MortyYJT/unimelb-coursework-agent/blob/main/src/store/migrations/001-initial.ts",
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
