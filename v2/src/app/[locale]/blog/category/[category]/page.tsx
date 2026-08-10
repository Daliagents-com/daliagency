import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogCategoryArchive,
  getBlogCategoryArchive,
} from "@/Components/Blog/BlogIndex";
import {
  blogCategoryPath,
  getBlogCategoryMeta,
} from "@/i18n/blog";
import {
  htmlLanguages,
  isLocale,
  localizedLocales,
  openGraphLocales,
  type Locale,
} from "@/i18n/config";
import {
  isBlogCategoryId,
  listBlogCategories,
} from "@/lib/blog/categories";
import { buildBlogCategoryJsonLd } from "@/lib/blog/jsonLd";
import { absoluteUrl } from "@/lib/seo/site";

type PageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) =>
    listBlogCategories().map((category) => ({
      locale,
      category: category.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam, category } = await params;

  if (!isLocale(localeParam) || localeParam === "en" || !isBlogCategoryId(category)) {
    return {};
  }

  const locale = localeParam as Locale;
  const archive = getBlogCategoryArchive(locale, category);

  if (!archive) {
    return {};
  }

  const meta = getBlogCategoryMeta(locale, category);
  const canonical = blogCategoryPath(locale, category);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        en: blogCategoryPath("en", category),
        ru: blogCategoryPath("ru", category),
        ka: blogCategoryPath("ge", category),
        hy: blogCategoryPath("arm", category),
        "x-default": blogCategoryPath("en", category),
      },
    },
    robots: archive.indexable ? undefined : { index: false, follow: true },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(canonical),
      siteName: "Dali",
      type: "website",
      locale: openGraphLocales[locale],
    },
  };
}

export default async function LocalizedBlogCategoryPage({ params }: PageProps) {
  const { locale: localeParam, category } = await params;

  if (!isLocale(localeParam) || localeParam === "en" || !isBlogCategoryId(category)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const archive = getBlogCategoryArchive(locale, category);

  if (!archive) {
    notFound();
  }

  const jsonLd = buildBlogCategoryJsonLd({
    category,
    inLanguage: htmlLanguages[locale],
    locale,
    pagePath: blogCategoryPath(locale, category),
    posts: archive.posts,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogCategoryArchive locale={locale} categoryId={category} />
    </>
  );
}
