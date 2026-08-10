import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { locales, type Locale, isLocale } from "@/i18n/config";
import { assertBlogCategoryId, createEmptyBlogCategoryCounts, type BlogCategoryId } from "./categories";
import type {
  BlogPost,
  BlogPostMeta,
  BlogPostStatus,
  BlogPostType,
  PublishedBlogPost,
} from "./types";

const contentRoot = path.join(process.cwd(), "content", "blog");
let postsCache: Record<Locale, BlogPost[]> | null = null;

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((s) => s.trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeMeta(
  data: Record<string, unknown>,
  fallbackLocale: Locale,
  context: string,
): BlogPostMeta {
  const slug = String(data.slug ?? "").trim();
  const localeRaw = String(data.locale ?? fallbackLocale).trim();
  const locale = isLocale(localeRaw) ? localeRaw : fallbackLocale;
  const status = (String(data.status ?? "draft") as BlogPostStatus) || "draft";
  const type = (String(data.type ?? "article") as BlogPostType) || "article";
  const category =
    typeof data.category === "string" && data.category.trim()
      ? assertBlogCategoryId(data.category, context)
      : undefined;

  const baseMeta = {
    slug,
    title: String(data.title ?? "").trim(),
    description: String(data.description ?? "").trim(),
    date: String(data.date ?? "").trim(),
    updated: data.updated ? String(data.updated).trim() : undefined,
    locale,
    hreflangGroup: String(data.hreflangGroup ?? slug).trim() || slug,
    keywords: asStringArray(data.keywords),
    author: String(data.author ?? "Dali").trim() || "Dali",
    type,
    category,
    heroImage: data.heroImage ? String(data.heroImage) : undefined,
    heroAlt: data.heroAlt ? String(data.heroAlt) : undefined,
    ogImage: data.ogImage
      ? String(data.ogImage)
      : data.heroImage
        ? String(data.heroImage)
        : undefined,
  };

  if (status === "published") {
    return {
      ...baseMeta,
      status,
      category: assertBlogCategoryId(data.category, context),
    };
  }

  return {
    ...baseMeta,
    status: "draft",
  };
}

function readPostFile(filePath: string, locale: Locale): BlogPost | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = normalizeMeta(
    data as Record<string, unknown>,
    locale,
    path.relative(process.cwd(), filePath),
  );
  if (!meta.slug || !meta.title) return null;
  return {
    ...meta,
    locale,
    content: content.trim(),
    readingMinutes: readingMinutes(content),
  };
}

function readPostsForLocale(locale: Locale): BlogPost[] {
  return getPostSlugs(locale)
    .map((slug) => {
      const base = path.join(contentRoot, locale, slug);
      const mdx = `${base}.mdx`;
      const md = `${base}.md`;
      return readPostFile(fs.existsSync(mdx) ? mdx : md, locale);
    })
    .filter((post): post is BlogPost => Boolean(post));
}

function isPublishedPost(post: BlogPost): post is PublishedBlogPost {
  return post.status === "published";
}

function loadPostsByLocale(): Record<Locale, BlogPost[]> {
  const shouldCache = process.env.NODE_ENV === "production";

  if (shouldCache && postsCache) {
    return postsCache;
  }

  const loaded = Object.fromEntries(
    locales.map((locale) => [locale, readPostsForLocale(locale)]),
  ) as Record<Locale, BlogPost[]>;

  validatePublishedCategoryParity(loaded);
  if (shouldCache) {
    postsCache = loaded;
  }
  return loaded;
}

function validatePublishedCategoryParity(postsByLocale: Record<Locale, BlogPost[]>) {
  const categoryByGroup = new Map<string, Partial<Record<Locale, BlogCategoryId>>>();

  for (const locale of locales) {
    for (const post of postsByLocale[locale]) {
      if (!isPublishedPost(post)) {
        continue;
      }

      const group = post.hreflangGroup || post.slug;
      const existing = categoryByGroup.get(group) ?? {};
      const firstAssignedCategory = Object.values(existing).find(Boolean);

      if (firstAssignedCategory && firstAssignedCategory !== post.category) {
        const mismatch = Object.entries({
          ...existing,
          [locale]: post.category,
        })
          .map(([entryLocale, category]) => `${entryLocale}=${category}`)
          .join(", ");
        throw new Error(`[blog] Category mismatch for hreflang group "${group}": ${mismatch}`);
      }

      existing[locale] = post.category;
      categoryByGroup.set(group, existing);
    }
  }
}

export function getPostSlugs(locale: Locale): string[] {
  const dir = path.join(contentRoot, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => name.replace(/\.mdx?$/, ""));
}

export function getPost(locale: Locale, slug: string): BlogPost | null {
  return loadPostsByLocale()[locale].find((post) => post.slug === slug) ?? null;
}

export function getPublishedPosts(locale: Locale): PublishedBlogPost[] {
  const posts = loadPostsByLocale()[locale].filter(isPublishedPost);

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getAllPublishedPosts(): PublishedBlogPost[] {
  return locales.flatMap((locale) => getPublishedPosts(locale));
}

export function getPublishedPostsByCategory(
  locale: Locale,
  category: BlogCategoryId,
): PublishedBlogPost[] {
  return getPublishedPosts(locale).filter((post) => post.category === category);
}

export function getPublishedCategoryCounts(locale: Locale): Record<BlogCategoryId, number> {
  return getPublishedPosts(locale).reduce((counts, post) => {
    counts[post.category] += 1;
    return counts;
  }, createEmptyBlogCategoryCounts());
}

export function getHreflangMap(hreflangGroup: string): Partial<Record<Locale, string>> {
  const map: Partial<Record<Locale, string>> = {};
  for (const locale of locales) {
    const match = getPublishedPosts(locale).find(
      (p) => p.hreflangGroup === hreflangGroup || p.slug === hreflangGroup,
    );
    if (match) {
      map[locale] = match.slug;
    }
  }
  return map;
}

export function blogPath(locale: Locale, slug?: string): string {
  const base = locale === "en" ? "/blog" : `/${locale}/blog`;
  return slug ? `${base}/${slug}` : base;
}
