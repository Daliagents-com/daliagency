import { blogCategoryPath, blogCopy, getBlogCategoryCopy } from "@/i18n/blog";
import { parseBlogBody } from "@/lib/blog/parseFaq";
import type { BlogCategoryId } from "@/lib/blog/categories";
import type { BlogPost, PublishedBlogPost } from "@/lib/blog/types";
import { siteUrl } from "@/lib/seo/site";

function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCategoryBreadcrumb(
  locale: PublishedBlogPost["locale"],
  category: BlogCategoryId,
) {
  return {
    "@type": "ListItem",
    position: 3,
    name: getBlogCategoryCopy(locale, category).label,
    item: `${siteUrl}${blogCategoryPath(locale, category)}`,
  };
}

export function buildBlogPostJsonLd(input: {
  post: BlogPost;
  pagePath: string;
  inLanguage: string;
}): Record<string, unknown> {
  const { post, pagePath, inLanguage } = input;
  const imageUrl = post.ogImage || post.heroImage;
  const pageUrl = `${siteUrl}${pagePath}`;
  const { faq } = parseBlogBody(post.content);
  const blogIndexUrl = `${siteUrl}${post.locale === "en" ? "/blog" : `/${post.locale}/blog`}`;

  const personAuthor = {
    "@type": "Person",
    "@id": `${siteUrl}/about#david-hakobyan`,
    name: "David Hakobyan",
    jobTitle: "Founder",
    url: `${siteUrl}/about#david-hakobyan`,
    sameAs: ["https://www.linkedin.com/in/davidhakobyan/"],
    worksFor: {
      "@type": "Organization",
      name: "Dali",
      url: siteUrl,
    },
  };

  const categoryLabel = post.status === "published" && post.category
    ? getBlogCategoryCopy(post.locale, post.category).label
    : undefined;

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: personAuthor,
    publisher: {
      "@type": "Organization",
      name: "Dali",
      url: siteUrl,
      logo: `${siteUrl}/dali-logo.svg`,
    },
    mainEntityOfPage: pageUrl,
    inLanguage,
    keywords: post.keywords.join(", "),
    ...(categoryLabel
      ? {
          articleSection: categoryLabel,
        }
      : {}),
    ...(imageUrl
      ? {
          image: [`${siteUrl}${imageUrl}`],
        }
      : {}),
  };

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: blogCopy[post.locale].homeLabel,
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: blogCopy[post.locale].kicker,
      item: blogIndexUrl,
    },
    ...(post.status === "published" && post.category
      ? [buildCategoryBreadcrumb(post.locale, post.category)]
      : []),
    {
      "@type": "ListItem",
      position: post.status === "published" && post.category ? 4 : 3,
      name: post.title,
      item: pageUrl,
    },
  ];

  const breadcrumb: Record<string, unknown> = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement,
  };

  const graph: Record<string, unknown>[] = [blogPosting, breadcrumb];

  if (faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: plainText(item.answer),
        },
      })),
      isPartOf: { "@id": `${pageUrl}#article` },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildBlogCategoryJsonLd(input: {
  category: BlogCategoryId;
  inLanguage: string;
  locale: PublishedBlogPost["locale"];
  pagePath: string;
  posts: PublishedBlogPost[];
}): Record<string, unknown> {
  const { category, inLanguage, locale, pagePath, posts } = input;
  const pageUrl = `${siteUrl}${pagePath}`;
  const categoryCopy = getBlogCategoryCopy(locale, category);
  const blogIndexUrl = `${siteUrl}${locale === "en" ? "/blog" : `/${locale}/blog`}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        name: categoryCopy.title,
        description: categoryCopy.description,
        url: pageUrl,
        inLanguage,
        isPartOf: blogIndexUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: blogCopy[locale].homeLabel,
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: blogCopy[locale].kicker,
            item: blogIndexUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: categoryCopy.label,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#items`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}${post.locale === "en" ? "/blog" : `/${post.locale}/blog`}/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };
}
