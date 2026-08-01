import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/Components/Blog/BlogPostView";
import {
  blogPath,
  getHreflangMap,
  getPost,
  getPostSlugs,
} from "@/lib/blog/loadPosts";
import { buildBlogPostJsonLd } from "@/lib/blog/jsonLd";
import {
  htmlLanguages,
  isLocale,
  localizedLocales,
  type Locale,
} from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) =>
    getPostSlugs(locale)
      .map((slug) => {
        const post = getPost(locale, slug);
        return post?.status === "published" ? { locale, slug } : null;
      })
      .filter(Boolean) as { locale: string; slug: string }[],
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam) || localeParam === "en") {
    return {};
  }
  const locale = localeParam as Locale;
  const post = getPost(locale, slug);
  if (!post || post.status !== "published") {
    return {};
  }

  const hreflang = getHreflangMap(post.hreflangGroup);
  const languages: Record<string, string> = {
    "x-default": blogPath("en", hreflang.en ?? post.slug),
  };
  for (const [loc, locSlug] of Object.entries(hreflang)) {
    if (!locSlug) continue;
    const hrefLang = htmlLanguages[loc as Locale] ?? loc;
    languages[hrefLang] = blogPath(loc as Locale, locSlug);
  }

  return {
    title: `${post.title} | Dali`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: blogPath(locale, slug),
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://daliagents.com${blogPath(locale, slug)}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.ogImage || post.heroImage
        ? [post.ogImage || post.heroImage!]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.ogImage || post.heroImage
        ? [post.ogImage || post.heroImage!]
        : undefined,
    },
  };
}

export default async function LocalizedBlogPostPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam) || localeParam === "en") {
    notFound();
  }
  const locale = localeParam as Locale;
  const post = getPost(locale, slug);
  if (!post || post.status !== "published") {
    notFound();
  }

  const jsonLd = buildBlogPostJsonLd({
    post,
    pagePath: blogPath(locale, slug),
    inLanguage: htmlLanguages[locale],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView locale={locale} post={post} />
    </>
  );
}
