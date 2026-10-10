import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/site";

// Required for the static export used by GitHub Pages.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/resume", "/experience/projects"].map((path) => ({
    url: new URL(path, siteOrigin).href,
  }));
}
