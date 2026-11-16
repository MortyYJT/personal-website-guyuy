import type { NextConfig } from "next";

// Production is a static export served by Caddy on the owner's server.
// The default Next.js server build remains available for development and CI.
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
