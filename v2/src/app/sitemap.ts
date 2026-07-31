import type { MetadataRoute } from "next";
import { localizedLocales, localizePath } from "@/i18n/config";
import { projectSlugs } from "@/i18n/projects";
import { solutionSlugs } from "@/Components/Solutions/solutionContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedContentPaths = [
    "/design-sprints",
    "/solutions",
    ...solutionSlugs.map((slug) => `/solutions/${slug}`),
  ];
  const contentRoutes = localizedContentPaths.flatMap((path) => [
    path,
    ...localizedLocales.map((locale) => localizePath(path, locale)),
  ]);
  const localizedHomeRoutes = localizedLocales.map((locale) => `/${locale}`);
  const projectRoutes = projectSlugs.flatMap((slug) => [
    `/project/${slug}`,
    ...localizedLocales.map((locale) =>
      localizePath(`/project/${slug}`, locale),
    ),
  ]);
  const routes = [
    "",
    ...localizedHomeRoutes,
    ...contentRoutes,
    ...projectRoutes,
  ];

  return routes.map((route) => ({
    url: `https://dali.agents.ge${route || "/"}`,
  }));
}
