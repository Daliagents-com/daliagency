import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/Components/Blog/BlogPostView";
import {
  blogPath,
  getHreflangMap,
  getPost,
  getPostSlugs,
} from "@/lib/blog/loadPosts";
import { htmlLanguages } from "@/i18n/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs("en")
    .map((slug) => {
      const post = getPost("en", slug);
      return post?.status === "published" ? { slug } : null;
    })
    .filter(Boolean) as { slug: string }[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post || post.status !== "published") {
    return {};
  }

  const hreflang = getHreflangMap(post.hreflangGroup);
  const languages: Record<string, string> = { "x-default": blogPath("en", slug) };
  for (const [locale, locSlug] of Object.entries(hreflang)) {
    if (!locSlug) continue;
    const hrefLang = htmlLanguages[locale as keyof typeof htmlLanguages] ?? locale;
    languages[hrefLang] = blogPath(locale as "en" | "ru" | "ge" | "arm", locSlug);
  }

  return {
    title: `${post.title} | Dali`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: blogPath("en", slug),
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://dali.agents.ge${blogPath("en", slug)}`,
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post || post.status !== "published") {
    notFound();
  }

  const imageUrl = post.ogImage || post.heroImage;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://dali.agents.ge",
    },
    publisher: {
      "@type": "Organization",
      name: "Dali",
      url: "https://dali.agents.ge",
    },
    mainEntityOfPage: `https://dali.agents.ge${blogPath("en", slug)}`,
    inLanguage: "en",
    keywords: post.keywords.join(", "),
    ...(imageUrl
      ? {
          image: [`https://dali.agents.ge${imageUrl}`],
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView locale="en" post={post} />
    </>
  );
}
