import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    id: "commerce-support",
    title: { zh: "Commerce Support Agent", en: "Commerce Support Agent" },
    summary: {
      zh: "围绕电商客服场景的 AI 对话工具。公开实现包含流式回复、对话上下文处理，以及请求取消和错误反馈。",
      en: "An AI chat tool exploring e-commerce support. The public implementation includes streaming responses, conversation context handling, request cancellation, and error feedback.",
    },
    technologies: ["Python", "FastAPI", "LangChain", "SSE"],
    repositoryUrl: "https://github.com/MortyYJT/commerce-support-agent",
    status: "in-progress",
    evidence: [
      "https://github.com/MortyYJT/commerce-support-agent/blob/main/src/commerce_support/routes.py",
      "https://github.com/MortyYJT/commerce-support-agent/blob/main/src/commerce_support/services.py",
    ],
  },
  {
    id: "offerpilot",
    title: { zh: "OfferPilot", en: "OfferPilot" },
    summary: {
      zh: "留学申请规划工具的探索。当前公开实现围绕用户资料、申请路线图与任务管理展开，使用 Next.js 界面与 FastAPI 服务。",
      en: "An exploration of application planning tools. The current public implementation covers profiles, application roadmaps, and task management with a Next.js interface and FastAPI service.",
    },
    technologies: ["Next.js", "TypeScript", "FastAPI", "SQLAlchemy"],
    repositoryUrl: "https://github.com/MortyYJT/offerpilot",
    status: "in-progress",
    evidence: [
      "https://github.com/MortyYJT/offerpilot/blob/main/api/app/routers/roadmap.py",
      "https://github.com/MortyYJT/offerpilot/blob/main/web/package.json",
    ],
  },
];
