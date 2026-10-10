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
];
