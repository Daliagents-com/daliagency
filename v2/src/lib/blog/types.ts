import type { Locale } from "@/i18n/config";

export type BlogPostStatus = "draft" | "published";

export type BlogPostType = "comparison" | "tutorial" | "pillar" | "article";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: Locale;
  hreflangGroup: string;
  keywords: string[];
  status: BlogPostStatus;
  author: string;
  type: BlogPostType;
  heroImage?: string;
  heroAlt?: string;
  ogImage?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  readingMinutes: number;
};
