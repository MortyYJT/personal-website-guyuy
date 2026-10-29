import type { MetadataRoute } from "next";
import { siteOrigin } from "../lib/site";

// Required for the static export deployed to the server.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/profile", "/projects", "/friends", "/pictures"].map((path) => ({
    url: new URL(path, siteOrigin).href,
  }));
}
