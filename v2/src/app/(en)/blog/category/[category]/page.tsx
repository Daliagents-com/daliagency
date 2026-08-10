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
  isBlogCategoryId,
  listBlogCategories,
} from "@/lib/blog/categories";
import { buildBlogCategoryJsonLd } from "@/lib/blog/jsonLd";
import { absoluteUrl } from "@/lib/seo/site";

type PageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listBlogCategories().map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isBlogCategoryId(category)) {
    return {};
  }

  const archive = getBlogCategoryArchive("en", category);

  if (!archive) {
    return {};
  }

  const meta = getBlogCategoryMeta("en", category);
  const canonical = blogCategoryPath("en", category);

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
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!isBlogCategoryId(category)) {
    notFound();
  }

  const archive = getBlogCategoryArchive("en", category);

  if (!archive) {
    notFound();
  }

  const jsonLd = buildBlogCategoryJsonLd({
    category,
    inLanguage: "en",
    locale: "en",
    pagePath: blogCategoryPath("en", category),
    posts: archive.posts,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogCategoryArchive locale="en" categoryId={category} />
    </>
  );
}
