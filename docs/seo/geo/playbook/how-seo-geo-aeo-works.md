# How SEO / GEO / AEO work (and what moves Dali up)

**Date:** 2026-07-31  
**Audience:** operators (David) + coding agents  
**Site:** https://dali.agents.ge

One-sentence truth: **there is no separate magic layer that ranks you in AI answers while classic SEO is broken.**  
Google’s gen AI features are grounded in the same index and quality systems as Search.  
Other AI products (ChatGPT, Perplexity) add brand-mention and retrieval surfaces on top of that.

Primary Google source: [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)  
Helpful content: [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

---

## Three labels, one stack

| Term | What people mean | What actually decides visibility |
| --- | --- | --- |
| **SEO** | Rank and get clicks in classic search results | Crawl → index → relevance → quality/trust → page experience → links/mentions |
| **AEO** (Answer Engine Optimization) | Win featured answers / answer boxes / direct answers | Same eligibility + clear question/answer structure + authority |
| **GEO** (Generative Engine Optimization) | Get cited or mentioned in AI Overviews, ChatGPT, Perplexity, etc. | Indexable citable pages + entity/brand consensus + (often) YouTube/web mentions |

Google’s position: AEO/GEO for **Google Search** is still SEO.  
Do not buy “GEO hacks” that contradict Search Central (llms.txt ranking, content chunking gimmicks, AI-only keyword rewrites).

```text
User query
    │
    ├─► Classic SERP ranking ──────────────► blue links, snippets
    │         ▲
    │         │ same index + quality systems
    │         │
    └─► Generative features (RAG / fan-out) ► AI Overview / AI Mode
              │
              └─ retrieves eligible pages, synthesizes, cites some

Parallel (non-Google products):
  ChatGPT / Perplexity / Claude search
    └─ retrieval + training priors + brand mention graph
```

---

## SEO pipeline (classic) - what “higher” means

### 1. Discovery and eligibility
- Robots allow crawl
- HTTP 200, stable URL
- In sitemap
- Canonical and hreflang coherent
- Not blocked as soft-404 / duplicate / thin spam

**If this fails, nothing else matters.**

### 2. Relevance
- Page answers the query intent (informational / commercial / transactional)
- Title, H1, body, internal links match that intent
- Depth beats keyword stuffing

### 3. Quality and trust (E-E-A-T)
Experience, Expertise, Authoritativeness, Trustworthiness.  
Signals: who wrote it, proof, contact, real projects, consistent entity off-site.

### 4. Page experience
Speed, mobile, stable layout, usable main content.  
Not a magic rank boost alone; a failure can suppress.

### 5. Off-site authority
Links still matter for classic SEO.  
For AI brand visibility, **unlinked brand mentions** and **YouTube mentions** correlate strongly in third-party studies (Ahrefs 75k brands) - treat as correlation, not a paid-mention license.

### 6. Measurement loop
Search Console: queries, pages, coverage.  
Generative AI performance report: which URLs appear in Google gen AI features (impressions).  
Without GSC you are flying blind on “higher.”

---

## AEO - answer-shaped pages

AEO is SEO with **extractable answers**:

1. Question-shaped heading or obvious query intent  
2. Direct answer in the first screenful (your posts already use `## Direct answer`)  
3. Supporting detail, examples, failure modes  
4. FAQ for real follow-ups  
5. Optional FAQ schema (helps classic rich results; **not required** for Google gen AI)

Models and answer UIs prefer text they can quote without inventing.

---

## GEO - generative surfaces

### On Google
- Page must be indexable and eligible for snippets  
- Unique non-commodity content beats scaled AI filler  
- Site should be verified in GSC; use Generative AI performance when available  

### On ChatGPT / Perplexity / similar
- Retrieval crawlers must reach the page (robots / WAF)  
- Brand and topic appear in many third-party contexts (mentions, YT, directories, reviews)  
- Clear definitions and process pages get reused as citations  
- Small brands: ChatGPT is often a softer entry than Google AI Mode brand consensus (Ahrefs correlations)

### What does **not** reliably “rank” GEO
- `llms.txt` for Google ranking  
- Chunking HTML into artificial micro-pages for models  
- Buying fake mentions  
- Another 50 thin posts without indexation or entity  

---

## Dali current position (facts)

| Layer | State |
| --- | --- |
| Content inventory | Strong: 52 posts × 4 locales, Direct answer, FAQ UI |
| Technical surface | Strong: robots allow, ~276 sitemap URLs, canonicals, hreflang on posts |
| Schema | Organization/WebSite, BlogPosting; FAQPage + Breadcrumb shipped in code |
| Measurement | Weak until GSC verified |
| Entity off-site | Weak: personal LI, no company LI/Clutch yet |
| Related internal links | Was “6 newest posts” - weak topical graph (fixed in code: keyword/type scoring) |
| Deploy lag risk | If Vercel Git not tracking `main`, code SEO wins never hit prod (see blockers B-P0-03) |

**Honest ranking bottleneck:** not “missing meta tags.”  
It is **index + entity + distribution**, while on-site foundation is already ahead of most young studios.

---

## What improves “being higher” - ranked

### High (do these)
1. **GSC + sitemap + inspect money URLs** (human) - unlocks indexing and rewrites  
2. **Entity:** LinkedIn Company, Clutch + real reviews, consistent brand string (human)  
3. **Topical internal links** (agent) - crawl paths and topical authority  
4. **Non-commodity upgrades** on pillars that get impressions (after GSC data)  
5. **YouTube process videos** + transcripts (human film / agent scripts)  
6. **Earned mentions** (human outreach)  

### Medium
7. Author/Person and Breadcrumb schema (agent)  
8. BOFU landings that match buyer queries (agent + copy)  
9. Bing + IndexNow (human key + light code)  
10. AI citation baseline log (human 30 min/week)  

### Low / skip
- llms.txt as ranking lever  
- Mass new posts without GSC  
- Directory spam  
- Buying links  

---

## What a coding agent can do **right now** (no GSC login)

| Action | Ranking mechanism | Status |
| --- | --- | --- |
| Topical Related rail (keywords/type/title) | Internal PageRank + topical clustering | **Done this pass** |
| FAQPage JSON-LD from real FAQs | Eligibility for FAQ rich results; clearer Q/A machine parse | Done prior + kept |
| BreadcrumbList on posts | SERP/structure clarity | **Done this pass** |
| Person author (David) on BlogPosting | E-E-A-T machine signal | **Done this pass** |
| Explicit AI crawler allow in robots | Retrieval eligibility | Done prior |
| Operator docs: opportunities, YT scripts, citation baseline | Process | Done prior |
| Hub/glossary BOFU pages | New ranking targets for money intents | Available next |
| Interlink pass home/solutions → pillars | Discovery | Available next |
| Confirm prod = `main` deploy | Otherwise all of the above is theater | **Needs David check B-P0-03** |

### What agent **cannot** do alone
- Verify GSC / request indexing at scale with your account  
- Create LinkedIn Company / Clutch reviews  
- Earn real third-party mentions  
- Film YouTube  
- Invent client metrics  

---

## 7-day split

**David**
1. GSC verify + submit sitemap  
2. Confirm Vercel auto-deploy from `main`  
3. LinkedIn Company shell  
4. Optional: film 1 YT script from `youtube-scripts-batch1.md`  
5. Optional: run 6 prompts from `ai-citation-baseline.md`  

**Agent (parallel)**
1. Topical related + schema (this pass)  
2. Next pick: solutions/home → pillar link blocks **or** glossary **or** vibe-rescue landing  

---

## Falsifiable checks (after GSC)

| Claim | Fail signal |
| --- | --- |
| Blog is indexed | 0 blog URLs in coverage after 14 days |
| Related topical links help | Related clicks / secondary pageviews stay flat vs baseline |
| Entity work helps brand | “Dali Agents” impressions stay ~0 for 60 days after LI+Clutch |
| Content is competitive | Impressions on target queries, always position 40+ with no movement after rewrites |

---

## Related docs

- [status.md](../ops/status.md)  
- [blockers.md](../ops/blockers.md)  
- [opportunities-next.md](../ops/opportunities-next.md)  
- [lifehacks-current.md](./lifehacks-current.md)  
- [agent-parallel-work.md](../ops/agent-parallel-work.md)  
- [ai-citation-baseline.md](../audits/ai-citation-baseline-2026-07-31.md)  
