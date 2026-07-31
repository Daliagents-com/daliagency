import type { Locale } from "@/i18n/config";
import type { BlogPost } from "@/lib/blog/types";
import { getPublishedPosts } from "@/lib/blog/loadPosts";

const STOP = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "how",
  "in",
  "into",
  "of",
  "on",
  "or",
  "the",
  "to",
  "vs",
  "with",
  "your",
  "you",
  "we",
  "our",
  "is",
  "are",
  "what",
  "when",
  "why",
  "ai",
  "и",
  "для",
  "как",
  "что",
  "это",
  "на",
  "по",
  "из",
  "или",
  "в",
  "с",
]);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .map((t) => t.trim())
      .filter((t) => t.length > 2 && !STOP.has(t)),
  );
}

function overlapCount(a: Set<string>, b: Set<string>): number {
  let n = 0;
  Array.from(a).forEach((t) => {
    if (b.has(t)) n += 1;
  });
  return n;
}

/**
 * Rank related posts by topical overlap (keywords, type, title tokens).
 * Falls back to recency when scores tie or are zero.
 */
export function scoreRelatedPost(current: BlogPost, candidate: BlogPost): number {
  const curKw = new Set(current.keywords.map((k) => k.toLowerCase()));
  const candKw = new Set(candidate.keywords.map((k) => k.toLowerCase()));

  let keywordHits = 0;
  const candJoined = Array.from(candKw).join(" ");
  Array.from(curKw).forEach((k) => {
    if (candKw.has(k)) keywordHits += 3;
    // partial: keyword phrase token match against candidate keywords joined
    if (k.length > 4 && candJoined.includes(k)) keywordHits += 2;
  });

  const typeBonus = current.type === candidate.type ? 4 : 0;
  const titleHits = overlapCount(tokens(current.title), tokens(candidate.title));
  const descHits = overlapCount(
    tokens(`${current.title} ${current.description}`),
    tokens(`${candidate.title} ${candidate.description}`),
  );

  // slight recency: newer posts get up to ~1 point
  const ageDays = Math.max(
    0,
    (Date.now() - Date.parse(candidate.date || "1970-01-01")) / 86_400_000,
  );
  const recency = Math.max(0, 1 - ageDays / 365);

  return keywordHits + typeBonus + titleHits * 2 + descHits + recency;
}

export function getRelatedPosts(
  locale: Locale,
  currentSlug: string,
  limit = 6,
): BlogPost[] {
  const posts = getPublishedPosts(locale);
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) {
    return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }

  return posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({ post: p, score: scoreRelatedPost(current, p) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.post.date < b.post.date ? 1 : a.post.date > b.post.date ? -1 : 0;
    })
    .slice(0, limit)
    .map((x) => x.post);
}
