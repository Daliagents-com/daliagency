import type { Locale } from "@/i18n/config";
import type { BlogCategoryId } from "./categories";

export type BlogPostStatus = "draft" | "published";

export type BlogPostType = "comparison" | "tutorial" | "pillar" | "article";

type BlogPostMetaBase = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  locale: Locale;
  hreflangGroup: string;
  keywords: string[];
  author: string;
  type: BlogPostType;
  category?: BlogCategoryId;
  heroImage?: string;
  heroAlt?: string;
  ogImage?: string;
};

export type DraftBlogPostMeta = BlogPostMetaBase & {
  status: "draft";
};

export type PublishedBlogPostMeta = BlogPostMetaBase & {
  status: "published";
  category: BlogCategoryId;
};

export type BlogPostMeta = DraftBlogPostMeta | PublishedBlogPostMeta;

type BlogPostBase = {
  content: string;
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & BlogPostBase;

export type PublishedBlogPost = PublishedBlogPostMeta & BlogPostBase;
