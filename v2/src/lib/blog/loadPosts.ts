import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { locales, type Locale, isLocale } from "@/i18n/config";
import type { BlogPost, BlogPostMeta, BlogPostStatus, BlogPostType } from "./types";

const contentRoot = path.join(process.cwd(), "content", "blog");

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

function normalizeMeta(data: Record<string, unknown>, fallbackLocale: Locale): BlogPostMeta {
  const slug = String(data.slug ?? "").trim();
  const localeRaw = String(data.locale ?? fallbackLocale).trim();
  const locale = isLocale(localeRaw) ? localeRaw : fallbackLocale;
  const status = (String(data.status ?? "draft") as BlogPostStatus) || "draft";
  const type = (String(data.type ?? "article") as BlogPostType) || "article";

  return {
    slug,
    title: String(data.title ?? "").trim(),
    description: String(data.description ?? "").trim(),
    date: String(data.date ?? "").trim(),
    locale,
    hreflangGroup: String(data.hreflangGroup ?? slug).trim() || slug,
    keywords: asStringArray(data.keywords),
    status: status === "published" ? "published" : "draft",
    author: String(data.author ?? "Dali").trim() || "Dali",
    type,
    heroImage: data.heroImage ? String(data.heroImage) : undefined,
    heroAlt: data.heroAlt ? String(data.heroAlt) : undefined,
    ogImage: data.ogImage
      ? String(data.ogImage)
      : data.heroImage
        ? String(data.heroImage)
        : undefined,
  };
}

function readPostFile(filePath: string, locale: Locale): BlogPost | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = normalizeMeta(data as Record<string, unknown>, locale);
  if (!meta.slug || !meta.title) return null;
  return {
    ...meta,
    locale,
    content: content.trim(),
    readingMinutes: readingMinutes(content),
  };
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
  const base = path.join(contentRoot, locale, slug);
  const mdx = `${base}.mdx`;
  const md = `${base}.md`;
  return readPostFile(fs.existsSync(mdx) ? mdx : md, locale);
}

export function getPublishedPosts(locale: Locale): BlogPost[] {
  const posts = getPostSlugs(locale)
    .map((slug) => getPost(locale, slug))
    .filter((p): p is BlogPost => Boolean(p && p.status === "published"));

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getAllPublishedPosts(): BlogPost[] {
  return locales.flatMap((locale) => getPublishedPosts(locale));
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
