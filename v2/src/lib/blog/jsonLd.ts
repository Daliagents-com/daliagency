import { parseBlogBody } from "@/lib/blog/parseFaq";
import type { BlogPost } from "@/lib/blog/types";

const siteUrl = "https://dali.agents.ge";

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

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Dali",
      url: siteUrl,
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

  const graph: Record<string, unknown>[] = [blogPosting];

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
