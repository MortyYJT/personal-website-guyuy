import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a plain HTML build in `out/` for GitHub Pages;
// Vercel keeps the default server build.
const staticExport = process.env.STATIC_EXPORT === "1";

const config: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  ...(staticExport && {
    output: "export",
    images: { unoptimized: true },
  }),
};
export default config;
