/**
 * Exercises parseBlogBody against real post content (FAQ accordion data path).
 * Run: npx tsx scripts/verify-faq-parser.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseBlogBody } from "../src/lib/blog/parseFaq.ts";

const path = join(
  process.cwd(),
  "content/blog/en/ai-agent-agency-vs-in-house.mdx",
);
const raw = readFileSync(path, "utf8");
const body = raw.replace(/^---[\s\S]*?---\s*/, "");
const parsed = parseBlogBody(body);

const errors = [];
if (!parsed.faqTitle) errors.push("missing faq title");
if (parsed.faq.length < 3) errors.push(`expected >=3 faq items, got ${parsed.faq.length}`);
if (!parsed.body.includes("Direct answer")) errors.push("body lost main content");
if (parsed.body.includes("## FAQ")) errors.push("FAQ heading still in body");
for (const item of parsed.faq) {
  if (!item.question || !item.answer) errors.push("empty q/a");
}

const out = {
  ok: errors.length === 0,
  errors,
  faqTitle: parsed.faqTitle,
  count: parsed.faq.length,
  firstQ: parsed.faq[0]?.question ?? null,
};
console.log(JSON.stringify(out, null, 2));
if (!out.ok) process.exit(1);
