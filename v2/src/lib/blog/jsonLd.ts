import { parseBlogBody } from "@/lib/blog/parseFaq";
import type { BlogPost } from "@/lib/blog/types";

import { siteUrl } from "@/lib/seo/site";

function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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

  const blogIndexPath = pagePath.includes("/blog/")
    ? pagePath.slice(0, pagePath.lastIndexOf("/"))
    : "/blog";
  const blogIndexUrl = `${siteUrl}${blogIndexPath || "/blog"}`;

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
    ...(imageUrl
      ? {
          image: [`${siteUrl}${imageUrl}`],
        }
      : {}),
  };

  const breadcrumb: Record<string, unknown> = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: blogIndexUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
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
