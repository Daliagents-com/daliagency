# SEO tool audit - dali.agents.ge

**Date:** 2026-07-31  
**Tools used:**

| Tool | Role | Status |
| --- | --- | --- |
| **Lighthouse 13.4** (npx, headless Chrome) | SEO + Perf + A11y + Best Practices scores | Ran on 5 URLs |
| **Custom on-page crawler** (Python HTML parse) | title/desc/h1/canonical/hreflang/json-ld/images/links | Ran on key URLs + robots + sitemap |
| **PageSpeed Insights API** | Mobile lab | **Blocked** - daily quota exceeded |
| **DataForSEO** (`dali-seo-workspace` / `seomachine`) | SERP, keywords, rankings | **Not run** - no `DATAFORSEO_LOGIN` / `PASSWORD` in env (workspace `.env` missing) |

Raw artifacts: `docs/seo/geo/lighthouse/*.json`, `summary.json`, `onpage-crawl.json`.

---

## Scoreboard (Lighthouse lab)

| URL | SEO | Perf | A11y | Best practices | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | **92** | 87 | 97 | 96 | Heaviest page (motion/home) |
| `/blog` | **92** | 96 | 100 | 100 | |
| `/blog/human-approval-gates-for-ai-agents` | **92** | 97 | 100 | 100 | |
| `/solutions` | **92** | 92 | 96 | 100 | |
| `/solutions/vibe-code-rescue` | **0** | 0 | 0 | 0 | **NO_FCP** - page failed paint in LH; live **HTTP 404** in crawl |

**Takeaway:** On indexable templates SEO is already **high (92)**. Remaining Lighthouse SEO gap is almost entirely one audit (see below). Performance is good on blog; home is weaker on LCP/TBT.

---

## Lighthouse SEO issue (all scored pages)

| Audit | Result | Interpretation |
| --- | --- | --- |
| `meta-description` | **fail (0)** in LH | LH did not credit a description |
| Other SEO audits | pass | Crawlable, title, viewport, etc. |

**Cross-check with crawler:** meta `description` **is present** in live HTML for home, blog hub, post, solutions (lengths 103–168 chars).

So this is likely:

1. LH timing / client hydration quirk on Next.js streaming, **or**  
2. Description present but not in the form LH expects in the document it audited.

**Action:** Do not panic-rewrite descriptions. Verify in View Source + Rich Results. If needed, ensure `generateMetadata` / root metadata always emits `<meta name="description">` in the initial shell (already intended). Re-run LH after next deploy.

---

## On-page crawl findings (live)

### Technical

| Check | Result | Action |
| --- | --- | --- |
| HTTP 200 on core URLs | Yes (except vibe-rescue) | Deploy `main` - vibe-rescue **404 on prod** |
| Sitemap | **276** `<loc>` | OK |
| robots.txt live | Allow `*` only; **no** named GPTBot/Bingbot | **Prod lag** - code on `main` has expanded robots; not live yet |
| Canonical | Present on sampled pages | OK |
| hreflang | 4–5 alternates on sampled pages | OK |
| OG / Twitter card | Present | OK |

### Content / HTML signals

| Page | H1 | Words ~ | Int links | Images missing alt | Keywords meta | JSON-LD types seen |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 1 (hero) | ~1187 | 31 | **16 / 27** | false on live | Organization, Person, WebSite |
| `/blog` | 1 | ~5828 | 172 | 0 | false | Org/WebSite (hub) |
| approval-gates post | 1 | ~1389 | 25 | 0 | **true** | BlogPosting + Org |
| geo-seo post | 1 | ~1515 | 25 | 0 | true | BlogPosting + Org |
| `/solutions` | 1 | ~5093 | 21 | 0 | false | Org/WebSite |
| vibe-code-rescue | **404** | - | - | - | - | - |

### Critical production gaps

1. **`/solutions/vibe-code-rescue` = 404** on live host → Vercel not on latest `main` or build failed.  
2. **robots.txt still minimal** on live → same deploy gap (code has Bingbot/GPTBot list).  
3. **Home: 16 images without alt** → real a11y/SEO fix (Lighthouse A11y 97, not 100).  
4. Blog posts: schema in code includes FAQPage/Breadcrumb/Person author; crawler sample showed BlogPosting - re-verify after deploy.

---

## Performance highlights (LH)

| Page | FCP | LCP | TBT | CLS | SI |
| --- | --- | --- | --- | --- | --- |
| Home | 1.3s | **3.3s** | 210ms | 0 | 3.7s |
| Blog hub | 1.2s | 2.7s | 80ms | 0 | 1.9s |
| Post | 1.1s | 2.5s | 40ms | 0 | 2.0s |
| Solutions | 1.1s | **3.2s** | 70ms | 0 | 2.6s |

**Fix order for perf:** home LCP (hero media/fonts/motion), then solutions LCP. Blog is already strong.

---

## What we could not run (need keys / setup)

### DataForSEO (preferred for rankings + keywords)

Workspace code exists:

- `~/Desktop/projects/dali-seo-workspace/`  
- modules: SERP live, keyword analyzer, competitor gaps, etc.

**Blocked:** no `.env` with:

```bash
DATAFORSEO_LOGIN=...
DATAFORSEO_PASSWORD=...
```

After credentials:

```bash
cd ~/Desktop/projects/dali-seo-workspace
# create .env from .env.example
python3 test_dataforseo.py
python3 seo_baseline_analysis.py   # if configured for dali.agents.ge
python3 research_serp_analysis.py
```

Then we can score **query → position** for money terms (AI agent agency, vibe code rescue, GEO for agencies, etc.).

### PageSpeed Insights API

Quota exceeded for anonymous/shared key. Local Lighthouse already covers lab metrics.

### Ahrefs / Semrush

No API keys in environment.

---

## Prioritized fix list from tools (not opinions)

| P | Issue | Evidence | Owner |
| --- | --- | --- | --- |
| P0 | Prod missing latest SEO code + vibe-rescue | robots old; `/solutions/vibe-code-rescue` 404 | David - Vercel Git / deploy |
| P0 | GSC still unknown | No tool substitutes index data | David - GSC |
| P1 | Home images missing alt (16) | On-page crawl | Agent |
| P1 | Home LCP ~3.3s | Lighthouse | Agent (media/motion budget) |
| P2 | Re-run LH after deploy; confirm meta-description passes | LH vs crawl mismatch | Agent |
| P2 | DataForSEO SERP baseline for 20 money keywords | Tool ready, needs keys | David keys → Agent run |
| P2 | Entity off-site | Not measured by LH | Human (Clutch/LI) |

---

## How to re-run Lighthouse

```bash
cd docs/seo/geo/lighthouse
npx lighthouse "https://dali.agents.ge/" \
  --only-categories=seo,performance,accessibility,best-practices \
  --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --output=json --output-path=./home.json --quiet
```

Parse:

```bash
python3 -c "import json;d=json.load(open('home.json'));print({k:round(v['score']*100) for k,v in d['categories'].items()})"
```

---

## Bottom line

- **Tooling verdict:** Lighthouse says technical SEO is already strong (**92**) on live templates.  
- **Biggest tool-detected failures are deploy/entity/index**, not “write more meta tags.”  
- **Next highest leverage tool:** DataForSEO (or GSC) for **keyword/SERP** reality - lab SEO scores will not tell you if you rank.  
- **Agent can fix now without keys:** image alts on home; re-audit after you confirm prod = `main`.

---

## Related

- [status.md](../ops/status.md)  
- [blockers.md](../ops/blockers.md)  
- [audit-independent.md](./audit-independent-2026-07-31.md)  
- [how-seo-geo-aeo-works.md](../playbook/how-seo-geo-aeo-works.md)  
