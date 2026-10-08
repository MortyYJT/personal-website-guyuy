import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/resume", "/experience/projects"].map((path) => ({
    url: new URL(path, siteOrigin).href,
  }));
}
