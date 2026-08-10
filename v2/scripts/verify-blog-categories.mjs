import { BLOG_CATEGORIES } from "../src/lib/blog/categories.ts";
import { getPost, getPublishedCategoryCounts, getPublishedPosts } from "../src/lib/blog/loadPosts.ts";

const locales = ["en", "ru", "ge", "arm"];
const expectedAssignments = {
  "admin-tokens-in-browser-storage": "vibe-coding-engineering",
  "after-vibe-code-audit-handoff": "vibe-coding-engineering",
  "agent-chatbot-copilot-rpa-differences": "agent-foundations",
  "agent-first-product-design": "agent-foundations",
  "agent-incident-response-and-liability": "security-governance",
  "agent-observability-logs-traces": "implementation-operations",
  "agent-orchestration-for-agencies": "implementation-operations",
  "ai-agent-agency-armenia-yerevan": "buying-partners",
  "ai-agent-agency-for-marketing-agencies": "buying-partners",
  "ai-agent-agency-for-small-business": "buying-partners",
  "ai-agent-agency-georgia-tbilisi": "buying-partners",
  "ai-agent-agency-pricing-what-to-expect": "buying-partners",
  "ai-agent-agency-vs-freelancers": "buying-partners",
  "ai-agent-agency-vs-in-house": "buying-partners",
  "ai-agent-demo-vs-production-difference": "agent-foundations",
  "ai-agent-discovery-audit-process": "implementation-operations",
  "ai-agent-pilot-scope-template": "implementation-operations",
  "ai-agent-rfp-questions": "buying-partners",
  "ai-agent-roi-how-to-measure": "implementation-operations",
  "ai-agent-security-checklist-for-buyers": "security-governance",
  "ai-agent-use-cases-for-customer-support": "use-cases-workflows",
  "ai-agent-use-cases-for-operations": "use-cases-workflows",
  "ai-agent-use-cases-for-sales-leads": "use-cases-workflows",
  "ai-agents-in-existing-business-tools": "implementation-operations",
  "ai-automation-agency-vs-software-vendor": "buying-partners",
  "ai-consulting-vs-implementation": "buying-partners",
  "ai-visibility-system-for-agencies": "seo-visibility",
  "best-ai-agent-agencies-how-to-evaluate": "buying-partners",
  "best-ai-automation-agency-criteria-2026": "buying-partners",
  "browser-agents-computer-use-risks": "security-governance",
  "build-vs-buy-ai-automation": "buying-partners",
  "change-management-for-ai-agents-at-work": "implementation-operations",
  "channel-agents-whatsapp-slack-email": "use-cases-workflows",
  "claude-code-agents-for-business-ops": "use-cases-workflows",
  "client-inbox-agent-operations": "use-cases-workflows",
  "client-side-secrets-and-price-config": "vibe-coding-engineering",
  "component-registry-agent-workflow": "use-cases-workflows",
  "cors-and-analytics-data-exposure": "vibe-coding-engineering",
  "cost-of-bad-ai-agent-implementation": "implementation-operations",
  "customer-service-claude-agent-jobs": "use-cases-workflows",
  "document-and-invoice-agents-limits": "use-cases-workflows",
  "enterprise-ai-agents-vs-smb-pilots": "buying-partners",
  "from-vibe-prototype-to-production-checklist": "vibe-coding-engineering",
  "geo-seo-for-ai-agencies": "seo-visibility",
  "how-long-does-ai-agent-implementation-take": "buying-partners",
  "how-to-brief-an-ai-agent-studio": "buying-partners",
  "how-to-choose-production-ai-agent-partner": "buying-partners",
  "how-to-compare-ai-agent-agencies": "buying-partners",
  "how-to-evaluate-ai-agents-before-go-live": "implementation-operations",
  "how-to-hire-an-ai-agent-agency": "buying-partners",
  "how-to-scope-upwork-ai-pilot": "buying-partners",
  "how-to-write-ai-agent-rfp": "buying-partners",
  "how-we-rescue-vibe-coded-mvps": "vibe-coding-engineering",
  "human-handoff-telegram-from-site-chat": "use-cases-workflows",
  "human-in-the-loop-ai-agents-explained": "security-governance",
  "idempotency-retries-queues-for-agents": "implementation-operations",
  "knowledge-agent-for-teams": "use-cases-workflows",
  "knowledge-base-for-site-ai-assistant": "use-cases-workflows",
  "lead-response-agent-design": "use-cases-workflows",
  "lead-response-crm-agent-jobs": "use-cases-workflows",
  "llm-cost-and-model-choice-for-agents": "implementation-operations",
  "map-workflows-for-ai-agents": "implementation-operations",
  "marketing-agency-ops-agent-pattern": "use-cases-workflows",
  "measuring-ai-agent-ops": "implementation-operations",
  "multi-agent-vs-single-agent-when-to-use": "implementation-operations",
  "multi-language-seo-georgia-armenia": "seo-visibility",
  "multi-tenant-isolation-for-agency-agents": "security-governance",
  "n8n-claude-ops-agent-jobs": "use-cases-workflows",
  "open-frameworks-and-assistants-when-to-use": "implementation-operations",
  "openai-assistants-api-shutdown-migration": "implementation-operations",
  "ops-agent-multi-store-pattern": "use-cases-workflows",
  "payments-and-secrets-on-vibe-apps": "vibe-coding-engineering",
  "pii-gdpr-logging-for-ai-agents": "security-governance",
  "production-agent-failure-modes": "implementation-operations",
  "production-ai-agents-for-business": "agent-foundations",
  "prompt-injection-defenses-for-tool-agents": "security-governance",
  "prompt-stepping-shell-then-brains": "vibe-coding-engineering",
  "protecting-api-tokens-in-vibe-coded-apps": "vibe-coding-engineering",
  "public-webhooks-and-payment-risks": "vibe-coding-engineering",
  "questions-founders-ask-before-ai-agents": "agent-foundations",
  "rag-memory-and-grounding-for-agents": "implementation-operations",
  "rate-limits-admin-and-promo": "vibe-coding-engineering",
  "red-flags-when-hiring-ai-agent-company": "buying-partners",
  "rewrite-vs-patch-vibe-code": "vibe-coding-engineering",
  "safe-tool-calling-for-business-agents": "security-governance",
  "security-audit-for-vibe-coded-websites": "vibe-coding-engineering",
  "seo-geo-for-vibe-coded-and-saas-sites": "seo-visibility",
  "session-context-in-ai-chat-widgets": "use-cases-workflows",
  "shadow-mode-and-canary-for-ai-agents": "implementation-operations",
  "should-i-buy-ai-agent-platform-or-custom": "buying-partners",
  "standard-vs-nonstandard-order-routing": "use-cases-workflows",
  "telegram-outreach-agent-patterns": "use-cases-workflows",
  "testing-ci-cd-for-vibe-coded-apps": "vibe-coding-engineering",
  "top-questions-to-ask-ai-agent-vendors": "buying-partners",
  "typical-upwork-ai-agent-jobs": "buying-partners",
  "upwork-proposal-angle-production-agents": "buying-partners",
  "versioning-prompts-and-agent-rollouts": "implementation-operations",
  "vertical-ai-agents-risk-notes": "use-cases-workflows",
  "vibe-coded-site-hardening-checklist": "vibe-coding-engineering",
  "vibe-coding-auth-db-migrations": "vibe-coding-engineering",
  "vibe-coding-limits-when-you-need-engineering": "vibe-coding-engineering",
  "vibe-coding-with-lovable-style-builders": "vibe-coding-engineering",
  "what-does-an-ai-agent-agency-do": "buying-partners",
  "what-is-a-production-ai-agent": "agent-foundations",
  "what-is-vibe-coding": "vibe-coding-engineering",
  "when-not-to-use-ai-agents": "agent-foundations",
  "zapier-make-n8n-vs-production-agents": "agent-foundations",
};

const expectedSlugs = Object.keys(expectedAssignments).sort();
const errors = [];
const publishedByLocale = Object.fromEntries(
  locales.map((locale) => [locale, getPublishedPosts(locale)]),
);

if (expectedSlugs.length !== 107) {
  errors.push(`expected manifest size 107, got ${expectedSlugs.length}`);
}

for (const locale of locales) {
  const posts = publishedByLocale[locale];
  if (posts.length !== expectedSlugs.length) {
    errors.push(`${locale}: published count ${posts.length}, expected ${expectedSlugs.length}`);
  }

  const actualSlugs = posts.map((post) => post.slug).sort();
  const missing = expectedSlugs.filter((slug) => !actualSlugs.includes(slug));
  const unexpected = actualSlugs.filter((slug) => !expectedSlugs.includes(slug));

  if (missing.length > 0) {
    errors.push(`${locale}: missing slugs ${missing.join(", ")}`);
  }
  if (unexpected.length > 0) {
    errors.push(`${locale}: unexpected slugs ${unexpected.join(", ")}`);
  }

  const counts = getPublishedCategoryCounts(locale);
  for (const category of BLOG_CATEGORIES) {
    if (counts[category.id] !== category.expectedPublishedCount) {
      errors.push(
        `${locale}: ${category.id} count ${counts[category.id]}, expected ${category.expectedPublishedCount}`,
      );
    }
  }
}

for (const slug of expectedSlugs) {
  const expectedCategory = expectedAssignments[slug];
  const seenCategories = new Set();

  for (const locale of locales) {
    const post = getPost(locale, slug);
    if (!post) {
      errors.push(`${locale}: missing post ${slug}`);
      continue;
    }
    if (post.status !== "published") {
      errors.push(`${locale}: ${slug} status ${post.status}`);
      continue;
    }
    if (post.hreflangGroup !== slug) {
      errors.push(`${locale}: ${slug} hreflangGroup ${post.hreflangGroup}`);
    }
    if (post.category !== expectedCategory) {
      errors.push(`${locale}: ${slug} category ${post.category ?? "missing"}, expected ${expectedCategory}`);
    }
    seenCategories.add(post.category);
  }

  if (seenCategories.size > 1) {
    errors.push(`${slug}: locale category mismatch ${Array.from(seenCategories).join(", ")}`);
  }
}

const result = {
  ok: errors.length === 0,
  errors,
  manifestCoverage: `${expectedSlugs.length}/${expectedSlugs.length}`,
  publishedCounts: Object.fromEntries(
    locales.map((locale) => [locale, publishedByLocale[locale].length]),
  ),
  categoryCounts: Object.fromEntries(
    locales.map((locale) => [locale, getPublishedCategoryCounts(locale)]),
  ),
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) {
  process.exit(1);
}
