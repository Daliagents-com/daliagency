import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/Components/Blog/BlogIndex";
import { blogCopy } from "@/i18n/blog";
import { isLocale, type Locale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam === "en") {
    return {};
  }
  const locale = localeParam as Exclude<Locale, "en">;
  const copy = blogCopy[locale];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${locale}/blog`,
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
      url: `https://dali.agents.ge/${locale}/blog`,
      siteName: "Dali",
      type: "website",
    },
  };
}

export default async function LocalizedBlogPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam === "en") {
    notFound();
  }
  return <BlogIndex locale={localeParam} />;
}
