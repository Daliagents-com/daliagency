import type { Metadata } from "next";
import BlogIndex from "@/Components/Blog/BlogIndex";
import { blogCopy } from "@/i18n/blog";
import { absoluteUrl } from "@/lib/seo/site";

const copy = blogCopy.en;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: {
    canonical: "/blog",
    languages: {
      en: "/blog",
      ru: "/ru/blog",
      ka: "/ge/blog",
      hy: "/arm/blog",
      "x-default": "/blog",
    },
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url: absoluteUrl("/blog"),
    siteName: "Dali",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogIndex locale="en" />;
}
