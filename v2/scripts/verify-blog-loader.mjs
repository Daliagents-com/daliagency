/**
 * Exercises the shipped blog loader against real content/blog MDX.
 * Run from v2/: node --import tsx scripts/verify-blog-loader.mjs
 * or: npx tsx scripts/verify-blog-loader.mjs
 */
import {
  getPost,
  getPublishedPosts,
  getHreflangMap,
  blogPath,
  getPostSlugs,
} from "../src/lib/blog/loadPosts.ts";

const locales = ["en", "ru", "ge", "arm"];
const slug = "ai-agent-agency-vs-in-house";
const required = [
  "slug",
  "title",
  "description",
  "date",
  "locale",
  "hreflangGroup",
  "status",
  "author",
];
const errors = [];

for (const locale of locales) {
  const post = getPost(locale, slug);
  if (!post) {
    errors.push(`missing post ${locale}/${slug}`);
    continue;
  }
  for (const key of required) {
    if (!post[key]) errors.push(`${locale}: empty ${key}`);
  }
  if (post.status !== "published") errors.push(`${locale}: not published`);
  if (post.slug !== slug) errors.push(`${locale}: slug mismatch ${post.slug}`);
  if (!post.content || post.content.length < 200) {
    errors.push(`${locale}: thin content (${post.content?.length ?? 0})`);
  }
  if (post.locale !== locale) {
    errors.push(`${locale}: locale field is ${post.locale}`);
  }
}

const publishedEn = getPublishedPosts("en");
if (!publishedEn.some((p) => p.slug === slug)) {
  errors.push("en published list missing slug");
}

const map = getHreflangMap(slug);
for (const locale of locales) {
  if (map[locale] !== slug) {
    errors.push(`hreflang missing ${locale}: ${JSON.stringify(map)}`);
  }
}

if (blogPath("en", slug) !== `/blog/${slug}`) {
  errors.push(`blogPath en got ${blogPath("en", slug)}`);
}
if (blogPath("ru", slug) !== `/ru/blog/${slug}`) {
  errors.push(`blogPath ru got ${blogPath("ru", slug)}`);
}

const result = {
  ok: errors.length === 0,
  errors,
  enTitle: getPost("en", slug)?.title ?? null,
  readingMinutes: getPost("en", slug)?.readingMinutes ?? null,
  slugsEn: getPostSlugs("en"),
  hreflang: map,
  publishedCounts: Object.fromEntries(
    locales.map((l) => [l, getPublishedPosts(l).length]),
  ),
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
