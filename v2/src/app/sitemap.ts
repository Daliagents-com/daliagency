import type { MetadataRoute } from "next";
import { locales, localizedLocales, localizePath } from "@/i18n/config";
import { blogCategoryPath } from "@/i18n/blog";
import { projectSlugs } from "@/i18n/projects";
import { solutionSlugs } from "@/Components/Solutions/solutionContent";
import { blogPath, getPublishedPosts } from "@/lib/blog/loadPosts";
import { isBlogCategoryId, listBlogCategories } from "@/lib/blog/categories";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedContentPaths = [
    "/design-sprints",
    "/solutions",
    "/starter",
    "/care",
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
      ...(post.updated ?? post.date
        ? { lastModified: post.updated ?? post.date }
        : {}),
    })),
  );
  const categoryEntries = locales.flatMap((locale) =>
    listBlogCategories()
      .filter((category) => {
        const count = getPublishedPosts(locale).filter(
          (post) => isBlogCategoryId(post.category ?? "") && post.category === category.id,
        ).length;
        return count >= 4;
      })
      .map((category) => ({
        url: absoluteUrl(blogCategoryPath(locale, category.id)),
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
    ...categoryEntries,
    ...blogPostEntries,
  ];
}
