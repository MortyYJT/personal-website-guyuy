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
    id: "personal-website",
    title: { zh: "这个网站", en: "This website" },
    summary: {
      zh: "你正在看的个人网站：Next.js 静态导出后部署到 GitHub Pages，毛玻璃卡片首页、跨页面不中断的音乐播放器、视图过渡的主题切换，以及 Cloudflare Worker 点赞计数。",
      en: "The site you are reading: a Next.js static export on GitHub Pages with a glass-card home, a music player that keeps playing across pages, View Transition theme switching, and a Cloudflare Worker like counter.",
    },
    technologies: ["Next.js", "TypeScript", "React", "Cloudflare Workers"],
    repositoryUrl: "https://github.com/MortyYJT/personal-website-guyuy",
    status: "in-progress",
    year: "2026",
    evidence: [
      "https://github.com/MortyYJT/personal-website-guyuy/blob/main/src/components/persistent-player.tsx",
      "https://github.com/MortyYJT/personal-website-guyuy/blob/main/.github/workflows/pages.yml",
    ],
  },
  {
    id: "garbage-collection-inc",
    title: { zh: "Garbage Collection Inc", en: "Garbage Collection Inc" },
    summary: {
      zh: "以废弃月球设施为背景的 Java 控制台生存游戏：回收废料、完成公司配额，应对生物、感染和天气异常。仓库包含一个控制台游戏引擎和 src/game 下的玩法系统，天气系统有回归测试。",
      en: "A Java console survival game set in derelict lunar facilities: recover scrap, meet company quotas, and survive creatures, infection, and weather anomalies. The repository holds a console game engine and the gameplay systems under src/game, with regression tests for weather.",
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
