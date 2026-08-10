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
import { buildBlogPostJsonLd } from "../src/lib/blog/jsonLd.ts";
import sitemapModule from "../src/app/sitemap.ts";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const nextConfig = require("../next.config.js");
const sitemap = sitemapModule.default ?? sitemapModule;

const locales = ["en", "ru", "ge", "arm"];
const slug = "ai-agent-agency-vs-in-house";
const hitlSlug = "human-in-the-loop-ai-agents-explained";
const oldHitlSlug = "human-approval-gates-for-ai-agents";
const productionClusterUpdatedDate = "2026-08-10";
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

const productionPillar = getPost("en", "what-is-a-production-ai-agent");
if (
  productionPillar?.title !==
  "Production AI Agents: Definition, Architecture, and Controls"
) {
  errors.push(`production-pillar title is ${productionPillar?.title ?? "missing"}`);
}
if (
  productionPillar?.updated !== productionClusterUpdatedDate ||
  !productionPillar.content.includes("/blog/production-ai-agents-for-business")
) {
  errors.push("production pillar is missing updated date or commercial cross-link");
}

const productionBusiness = getPost("en", "production-ai-agents-for-business");
if (
  productionBusiness?.updated !== productionClusterUpdatedDate ||
  !productionBusiness.content.includes("/blog/what-is-a-production-ai-agent")
) {
  errors.push("production business article is missing its pillar cross-link");
}

for (const sourceSlug of [
  "ai-agent-demo-vs-production-difference",
  "agent-observability-logs-traces",
  hitlSlug,
]) {
  if (
    !getPost("en", sourceSlug)?.content.includes(
      "/blog/what-is-a-production-ai-agent",
    )
  ) {
    errors.push(`${sourceSlug}: missing production-pillar link`);
  }
}

const expectedHitlPaths = {
  en: `/blog/${hitlSlug}`,
  ru: `/ru/blog/${hitlSlug}`,
  ge: `/ge/blog/${hitlSlug}`,
  arm: `/arm/blog/${hitlSlug}`,
};

for (const locale of locales) {
  const canonical = getPost(locale, hitlSlug);
  if (!canonical || canonical.status !== "published") {
    errors.push(`missing published HITL canonical ${locale}/${hitlSlug}`);
  } else {
    if (canonical.hreflangGroup !== hitlSlug) {
      errors.push(`${locale}: HITL hreflangGroup is ${canonical.hreflangGroup}`);
    }
    if (canonical.updated !== productionClusterUpdatedDate) {
      errors.push(`${locale}: HITL updated is ${canonical.updated ?? "missing"}`);
    }
    if (canonical.heroImage !== `/blog/${hitlSlug}/hero.jpg`) {
      errors.push(`${locale}: HITL hero path is ${canonical.heroImage ?? "missing"}`);
    }
  }

  if (getPost(locale, oldHitlSlug)) {
    errors.push(`${locale}: duplicate HITL post still loads`);
  }
  if (getPostSlugs(locale).includes(oldHitlSlug)) {
    errors.push(`${locale}: duplicate HITL slug still exists`);
  }
}

const hitlMap = getHreflangMap(hitlSlug);
for (const locale of locales) {
  if (hitlMap[locale] !== hitlSlug) {
    errors.push(`HITL hreflang missing ${locale}: ${JSON.stringify(hitlMap)}`);
  }
}

for (const asset of ["hero.jpg", "og.jpg"]) {
  if (!existsSync(path.join(process.cwd(), "public", "blog", hitlSlug, asset))) {
    errors.push(`missing canonical HITL asset ${asset}`);
  }
}

const hitlEn = getPost("en", hitlSlug);
if (hitlEn) {
  const jsonLd = buildBlogPostJsonLd({
    post: hitlEn,
    pagePath: expectedHitlPaths.en,
    inLanguage: "en",
  });
  const posting = jsonLd["@graph"]?.find?.(
    (item) => item["@type"] === "BlogPosting",
  );
  if (posting?.dateModified !== productionClusterUpdatedDate) {
    errors.push(`HITL dateModified is ${posting?.dateModified ?? "missing"}`);
  }
  if (posting?.author?.url !== "https://daliagents.com/about#david-hakobyan") {
    errors.push(`HITL author entity URL is ${posting?.author?.url ?? "missing"}`);
  }
}

const sitemapEntries = sitemap();
const hitlSitemap = sitemapEntries.find(
  (entry) => entry.url === `https://daliagents.com${expectedHitlPaths.en}`,
);
if (hitlSitemap?.lastModified !== productionClusterUpdatedDate) {
  errors.push(`HITL sitemap lastModified is ${hitlSitemap?.lastModified ?? "missing"}`);
}
if (sitemapEntries.some((entry) => entry.url.includes(oldHitlSlug))) {
  errors.push("sitemap still includes duplicate HITL slug");
}

const redirects = await nextConfig.redirects();
for (const locale of locales) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const source = `${prefix}/blog/${oldHitlSlug}`;
  const expectedDestination = expectedHitlPaths[locale];
  const redirect = redirects.find((item) => item.source === source);
  if (!redirect) {
    errors.push(`missing HITL redirect ${source}`);
  } else if (
    redirect.destination !== expectedDestination ||
    redirect.permanent !== true
  ) {
    errors.push(`invalid HITL redirect ${source}: ${JSON.stringify(redirect)}`);
  }
}

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
  hitlHreflang: hitlMap,
  hitlUpdated: Object.fromEntries(
    locales.map((locale) => [locale, getPost(locale, hitlSlug)?.updated ?? null]),
  ),
  publishedCounts: Object.fromEntries(
    locales.map((l) => [l, getPublishedPosts(l).length]),
  ),
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
