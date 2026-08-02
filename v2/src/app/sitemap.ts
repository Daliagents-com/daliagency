import type { MetadataRoute } from "next";
import { locales, localizedLocales, localizePath } from "@/i18n/config";
import { projectSlugs } from "@/i18n/projects";
import { solutionSlugs } from "@/Components/Solutions/solutionContent";
import { blogPath, getPublishedPosts } from "@/lib/blog/loadPosts";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedContentPaths = [
    "/design-sprints",
    "/solutions",
    "/blog",
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
  const blogPostEntries = locales.flatMap((locale) =>
    getPublishedPosts(locale).map((post) => ({
      url: absoluteUrl(blogPath(locale, post.slug)),
      ...(post.date ? { lastModified: post.date } : {}),
    })),
  );
  const routes = [
    "",
    "/about",
    "/hire",
    "/in-house-vs-agency-vs-freelancers",
    ...localizedHomeRoutes,
    ...contentRoutes,
    ...projectRoutes,
  ];

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route || "/"),
    })),
    ...blogPostEntries,
  ];
}
