#!/usr/bin/env node
/**
 * Verifies shipped Organization identity: local source + optional live HTML.
 * Run: node scripts/verify-org-schema.mjs
 * Live: LIVE=1 node scripts/verify-org-schema.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const identityPath = join(root, "src/lib/seo/organizationIdentity.ts");
const layoutPath = join(root, "src/app/layout.tsx");
const homePath = join(root, "src/Components/AIHome/AIHome.tsx");

const REQUIRED = [
  "https://www.linkedin.com/company/dali-agents",
  "https://clutch.co/profile/dali",
];
const NAP = {
  phone: "+995568863212",
  city: "Tbilisi",
};

function mustInclude(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`[FAIL] ${label} missing: ${needle}`);
  }
}

const identity = readFileSync(identityPath, "utf8");
const layout = readFileSync(layoutPath, "utf8");
const home = readFileSync(homePath, "utf8");

for (const url of REQUIRED) {
  mustInclude(identity, url, "organizationIdentity.ts");
  // Consumers must import shared identity (no hard-coded drift)
}
mustInclude(identity, NAP.phone, "organizationIdentity.ts phone");
mustInclude(identity, NAP.city, "organizationIdentity.ts city");

mustInclude(layout, "organizationIdentity", "layout.tsx import");
mustInclude(layout, "DALI_ORG", "layout.tsx DALI_ORG");
mustInclude(home, "organizationIdentity", "AIHome.tsx import");
mustInclude(home, "DALI_ORG", "AIHome.tsx DALI_ORG");

const results = {
  local: "ok",
  requiredSameAs: REQUIRED,
  nap: NAP,
  live: null,
};

if (process.env.LIVE === "1") {
  // Prefer normal DNS; on ENOTFOUND (local resolver lag), force Vercel anycast A.
  async function fetchProdHome() {
    const headers = { "user-agent": "dali-org-schema-verify/1.0" };
    try {
      return await fetch("https://daliagents.com/", { headers });
    } catch (err) {
      const code = err?.cause?.code || err?.code;
      if (code !== "ENOTFOUND" && code !== "EAI_AGAIN") throw err;
      // Node fetch cannot set Host+SNI easily without undici Agent; use curl --resolve.
      const { execFileSync } = await import("node:child_process");
      const out = execFileSync(
        "curl",
        [
          "-sL",
          "-A",
          "dali-org-schema-verify/1.0",
          "--resolve",
          "daliagents.com:443:76.76.21.21",
          "-w",
          "\n__HTTP_STATUS__:%{http_code}",
          "https://daliagents.com/",
        ],
        { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 },
      );
      const marker = "\n__HTTP_STATUS__:";
      const i = out.lastIndexOf(marker);
      const body = i >= 0 ? out.slice(0, i) : out;
      const status = i >= 0 ? Number(out.slice(i + marker.length)) : 0;
      return {
        status,
        text: async () => body,
        ok: status >= 200 && status < 400,
        _via: "curl-resolve",
      };
    }
  }

  const res = await fetchProdHome();
  const html = await res.text();
  // JSON-LD script blocks (@graph Organization + WebSite)
  const ldBlocks = [...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )].map((m) => m[1]);
  const blob = ldBlocks.join("\n");
  for (const url of REQUIRED) {
    mustInclude(blob, url, "live JSON-LD");
  }
  mustInclude(blob, NAP.phone, "live JSON-LD phone");
  mustInclude(blob, NAP.city, "live JSON-LD city");
  mustInclude(html, "hello@dali.agents.ge", "live public contact email");
  results.live = {
    status: res.status,
    ldBlockCount: ldBlocks.length,
    ok: true,
    via: res._via || "fetch",
  };
  const outDir = process.env.SCRATCH || join(root, ".verify-out");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "prod-sameAs.txt"), blob.slice(0, 8000));
  writeFileSync(join(outDir, "verify-org-schema.json"), JSON.stringify(results, null, 2));
}

console.log(JSON.stringify(results, null, 2));
console.log("verify-org-schema: PASS");
