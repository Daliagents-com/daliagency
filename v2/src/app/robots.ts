import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dali.agents.ge/sitemap.xml",
    host: "https://dali.agents.ge",
  };
}
