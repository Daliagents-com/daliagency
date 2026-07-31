import { getPublishedPosts, getPost } from "../src/lib/blog/loadPosts.ts";
import { writeFileSync } from "node:fs";

const outDir = process.argv[2] || ".";
const en = getPublishedPosts("en");
const summary = {
  count: en.length,
  slugs: en.map((p) => p.slug),
  allPublished: en.every((p) => p.status === "published"),
  fieldsOk: en.every(
    (p) =>
      p.slug &&
      p.title &&
      p.description &&
      p.content &&
      p.content.length > 100,
  ),
};
writeFileSync(`${outDir}/en-published-count.json`, JSON.stringify(summary, null, 2));

const sample = [
  en[0]?.slug,
  en[Math.floor(en.length / 2)]?.slug,
  en[en.length - 1]?.slug,
  "ai-agent-agency-vs-in-house",
  "geo-seo-for-ai-agencies",
].filter(Boolean);
const locales = ["en", "ru", "ge", "arm"];
const parity = {};
for (const slug of sample) {
  parity[slug] = {};
  for (const loc of locales) {
    const p = getPost(loc, slug);
    parity[slug][loc] = p
      ? {
          status: p.status,
          hreflangGroup: p.hreflangGroup,
          contentLen: p.content.length,
        }
      : null;
  }
}
const parityOk = sample.every((s) =>
  locales.every(
    (l) =>
      parity[s][l]?.status === "published" && parity[s][l].contentLen > 50,
  ),
);
writeFileSync(
  `${outDir}/locale-parity-sample.json`,
  JSON.stringify({ parityOk, sample, parity }, null, 2),
);

const ok = summary.count >= 20 && summary.allPublished && summary.fieldsOk && parityOk;
console.log(JSON.stringify({ ok, count: summary.count, parityOk }, null, 2));
if (!ok) process.exit(1);
