import type { MetadataRoute } from "next";

/**
 * Crawl policy for classic search + AI retrieval bots.
 * `*` already allows all; named agents document intent for operators/logs.
 * Training vs retrieval: both allowed for now (agency content wants citation + discovery).
 * Revisit if a training-only opt-out is needed later.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: "/" as const };

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      // OpenAI search / user fetch (citations in ChatGPT search)
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      // Anthropic
      { userAgent: "Claude-SearchBot", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      // Perplexity
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Perplexity-User", ...allowAll },
      // Google Gemini training opt token (does not block Google Search crawl)
      { userAgent: "Google-Extended", ...allowAll },
    ],
    sitemap: "https://dali.agents.ge/sitemap.xml",
    host: "https://dali.agents.ge",
  };
}
