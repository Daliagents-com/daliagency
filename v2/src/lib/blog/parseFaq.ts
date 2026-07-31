export type FaqItem = {
  question: string;
  answer: string;
};

export type ParsedBlogBody = {
  /** Markdown without the FAQ section */
  body: string;
  faq: FaqItem[];
  /** Original FAQ heading text for display, e.g. "FAQ" */
  faqTitle: string | null;
};

const FAQ_HEADING =
  /^(#{2})\s*(FAQ|Frequently asked questions|Часто задаваемые вопросы)\s*$/im;

/**
 * Split markdown into main body + FAQ Q/A pairs (### question + following text).
 */
export function parseBlogBody(markdown: string): ParsedBlogBody {
  const match = markdown.match(FAQ_HEADING);
  if (!match || match.index === undefined) {
    return { body: markdown.trim(), faq: [], faqTitle: null };
  }

  const body = markdown.slice(0, match.index).trimEnd();
  const faqBlock = markdown.slice(match.index + match[0].length).trim();
  const faqTitle = match[2]?.trim() || "FAQ";

  const chunks = faqBlock.split(/^###\s+/m).filter(Boolean);
  const faq: FaqItem[] = [];

  for (const chunk of chunks) {
    const lines = chunk.trim().split("\n");
    if (!lines.length) continue;
    const question = lines[0].trim().replace(/\?+$/, "?") || lines[0].trim();
    const answer = lines.slice(1).join("\n").trim();
    if (!question || !answer) continue;
    faq.push({ question, answer });
  }

  return { body, faq, faqTitle };
}
