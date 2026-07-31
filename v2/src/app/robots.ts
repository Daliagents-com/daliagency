import type { MetadataRoute } from "next";

/**
 * Crawl policy for classic search + AI retrieval.
 *
 * From GEO practice (and Surfer/Matt Canyon-style guidance):
 * - Do not block GPTBot / OpenAI search bots
 * - Do not block Google crawlers
 * - Allow Bingbot (ChatGPT search historically uses Bing index)
 * - Keep sitemap + host for discovery
 *
 * `*` already allows all; named agents document intent for operators and logs.
 * Training vs retrieval: both allowed (agency content wants citation + discovery).
 */
const allowAll = { allow: "/" as const };

const namedBots = [
  // Google
  "Googlebot",
  "Google-Extended",
  // Microsoft / ChatGPT search path
  "Bingbot",
  // OpenAI
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic
  "Claude-SearchBot",
  "ClaudeBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowAll },
      ...namedBots.map((userAgent) => ({ userAgent, ...allowAll })),
    ],
    sitemap: "https://dali.agents.ge/sitemap.xml",
    host: "https://dali.agents.ge",
  };
}
