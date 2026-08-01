#!/usr/bin/env node
/**
 * Structural verification for GEO operator surfaces shipped in code:
 * - public business email constant
 * - Footer mailto uses shared constant
 * - homepage SSR interlinks to money pillars
 *
 * Run: node scripts/verify-geo-surfaces.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function mustInclude(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`[FAIL] ${label} missing: ${needle}`);
  }
}

function mustNotInclude(haystack, needle, label) {
  if (haystack.includes(needle)) {
    throw new Error(`[FAIL] ${label} still contains: ${needle}`);
  }
}

const contact = readFileSync(join(root, "src/lib/contact.ts"), "utf8");
const footer = readFileSync(
  join(root, "src/Components/Footer/Footer.tsx"),
  "utf8",
);
const homeSeo = readFileSync(
  join(root, "src/Components/Home/About.tsx"),
  "utf8",
);
const identity = readFileSync(
  join(root, "src/lib/seo/organizationIdentity.ts"),
  "utf8",
);

mustInclude(contact, 'daliContactEmail = "hello@dali.agents.ge"', "contact.ts");
mustNotInclude(contact, "dav.hakobyan100@gmail.com", "contact.ts");

mustInclude(footer, "daliContactEmail", "Footer import/use");
mustNotInclude(footer, "dav.hakobyan100@gmail.com", "Footer");

// Interlink money pillars on home SSR summary
const pillars = [
  "/solutions/vibe-code-rescue",
  "/solutions/conversation-control",
  "/blog/geo-seo-for-ai-agencies",
];
for (const href of pillars) {
  mustInclude(homeSeo, href, "About GEO interlink");
}

mustInclude(identity, 'url: "https://daliagents.com"', "canonical site url");
mustInclude(identity, "https://www.linkedin.com/company/dali-agents", "sameAs LI");
mustInclude(identity, "https://clutch.co/profile/dali", "sameAs Clutch");
mustInclude(identity, "+995568863212", "NAP phone");
mustInclude(identity, "Tbilisi", "NAP city");
mustNotInclude(identity, 'url: "https://dali.agents.ge"', "legacy host as canonical");

console.log(
  JSON.stringify(
    {
      ok: true,
      site: "https://daliagents.com",
      contact: "hello@dali.agents.ge",
      interlinks: pillars,
      sameAsRequired: [
        "https://www.linkedin.com/company/dali-agents",
        "https://clutch.co/profile/dali",
      ],
    },
    null,
    2,
  ),
);
console.log("verify-geo-surfaces: PASS");
