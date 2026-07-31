# SEO/GEO opportunities next (beyond current pack)

**Date:** 2026-07-31  
**Host:** https://dali.agents.ge  
**Scope:** Tactics **not** already shipped or fully covered in this pack.  
**Out of scope here:** GSC verify, LinkedIn Company, Clutch, Bing, domain park, sameAs fill, more generic blog volume.

Read first: [status.md](./status.md), [blockers.md](./blockers.md), [lifehacks-current.md](./lifehacks-current.md).

---

## Thesis

Site + content foundation is largely done (~90% in status).

The remaining classic gaps are human blockers (GSC, entity profiles).

The **undocumented** GEO lever is not “write post 53”.

It is:

1. YouTube transcripts and brand presence
2. Earned brand mentions (editorial, not directory spam)
3. Original numbers / non-commodity upgrades
4. AI-answer measurement (GSC Generative AI report + manual ChatGPT/Perplexity logs)

---

## Already covered (do not treat as new)

| Item | Where |
| --- | --- |
| 52 posts × 4 locales, Direct answer, FAQ UI, related | live site |
| Organization / WebSite / BlogPosting, robots, sitemap | live site |
| GSC, .com park, Vercel Git | [blockers.md](./blockers.md) |
| LinkedIn Company, Clutch, Bing, directories, GBP decision | blockers + [platforms-publish.md](./platforms-publish.md) |
| Classic lifehacks (internal links, author, rewrite 11–20) | [lifehacks-current.md](./lifehacks-current.md) |
| llms.txt as ranking strategy | deprioritized (correct) |

---

## Tier A - high impact, thin or missing in pack

### A1 - YouTube as GEO channel

**Mechanism:** Brand mentions in video title, description, and transcript correlate strongly with AI visibility across ChatGPT, AI Mode, and AI Overviews (Ahrefs 75k-brand study: YouTube mentions ~0.737, strongest factor studied).

YouTube is heavily cited by Google gen AI surfaces and appears among top cited domains for ChatGPT as well.

**Why Dali:** Pack covers LinkedIn/Clutch text surfaces, not video.

**Do:**

1. Create channel “Dali” / “Dali Agents” with consistent brand string and site URL.
2. Ship 8–12 short process videos (5–12 min) from existing pillars: approval gates, vibe-code rescue, when not to use agents, audit process, ops agent pattern.
3. Put full script or cleaned transcript in description; say “Dali” / “Dali Agents” naturally.
4. Embed 3–5 videos on matching blog pillars later.

**Effort:** medium.  
**Impact:** high for GEO (directional; correlation not causation).  
**Verify:** videos public + brand string in transcript; later: brand appears in AI answers for process queries.  
**Wrong when:** empty channel or one video then silence.

---

### A2 - Earned brand mentions (editorial graph)

**Mechanism:** Web brand mentions correlate much more strongly with AI Overview brand visibility than raw backlink counts (Ahrefs: mentions ~0.664 vs backlinks ~0.218).

Page volume on your own site barely correlates with AI mentions (~0.194).

**Why Dali:** Platforms list is directory-heavy (Clutch, GoodFirms). That builds entity cards, not editorial consensus.

**Do (authentic only):**

| Channel | Angle | Cadence |
| --- | --- | --- |
| Guest / byline (EN niche) | gates, vibe rescue, production agents | 1–2 / quarter |
| Podcasts (AI ops / indie SaaS) | process, not pitch | 3 guest spots / quarter |
| Newsletter / journalist quotes | real expert answers only | 2–4 / month if pipeline exists |
| Public GitHub artifacts | checklists, audit templates branded Dali | ongoing |
| Reddit value posts (careful) | patterns, no fake clients, light CTA | sparse |

Google: inauthentic “mention farming” is not a supported strategy.

**Effort:** high (outreach).  
**Impact:** high for GEO + brand search.  
**Verify:** third-party URLs that say “Dali” / “Dali Agents” with truthful context; add strong ones to `sameAs` only when stable profiles.  
**Wrong when:** paid fake mentions, spam guest posts, mass directory empty profiles.

---

### A3 - GSC Generative AI performance report (separate loop)

**Mechanism:** Official Search Console report for impressions in generative AI features on Search (AI Overviews / AI Mode style surfaces). Dimensions include pages, countries, devices, dates. Clicks are not the core story of this report.

Classic Performance (queries/positions) and Generative AI impressions are **different loops**.

**Do after B-P0-01:**

1. Open Generative AI performance when available for the property (rollout was gradual).
2. Weekly: list top AI-impression URLs.
3. Upgrade those pages first: Direct answer, unique POV, real stats, clearer structure.
4. Do not invent “AI CTR” metrics Google does not provide.

**Effort:** low after GSC.  
**Impact:** high for prioritization.  
**Verify:** report loads; weekly note of top 5 AI pages.  
**Wrong when:** optimizing for gen AI without property verification.

Sources: Google Search Central AI optimization guide; GSC Generative AI performance docs (2026).

---

### A4 - Non-commodity upgrade + original research (not post #53)

**Mechanism:** Google’s gen AI guide prioritizes unique, first-hand, non-commodity content over scaled variants.

Ahrefs: more site pages alone is a weak AI-visibility lever.

Princeton GEO work (KDD 2024, directional): statistics, quotations, and citing sources improve visibility in generative engines more than “more words”.

**Do:**

1. One original research asset per quarter from real work (anonymized), e.g.:
   - “Top production fails in vibe-coded MVPs” (frequency table from audits)
   - “Agent pilot failure modes: missing approval gates”
2. Rewrite 5 money pillars with: named external sources, 1–2 hard numbers, first-hand process.
3. Stop shipping new EN posts until GSC has query data (except time-sensitive client need).

**Effort:** medium–high.  
**Impact:** high for citability.  
**Verify:** research page/post has tables + methods note; pillars gain dates/stats without fake clients.  
**Wrong when:** AI-rewriting all 52 posts without new facts; inventing metrics.

---

### A5 - Manual AI citation monitoring

**Mechanism:** GSC covers Google. ChatGPT / Perplexity / Claude need a separate baseline.

Ahrefs note: ChatGPT shows weaker correlation with classic authority gates, so smaller brands may enter there earlier than Google AI Mode brand consensus.

**Do (30 min / week, free):**

| Prompt family | Example |
| --- | --- |
| Category | “production AI agent agency for SMBs” |
| Problem | “how to rescue a vibe coded MVP” |
| Local | “AI automation agency Georgia Tbilisi” |
| Branded | “what is Dali Agents” |

Log: date | engine | prompt | brand yes/no | cited URL | note.

Optional paid Brand Radar / similar later - only after 4 weeks of manual logs.

**Effort:** low.  
**Impact:** medium–high (measurement unlock).  
**Verify:** spreadsheet exists; 10+ prompts run once as baseline.  
**Wrong when:** buying GEO SaaS with no prompt set and no GSC.

---

## Tier B - medium, on-site / technical

### B1 - Explicit AI crawler policy

**Now:** `User-agent: *` Allow `/` (fine for crawl). No `llms.txt` (404).

**2026 nuance:** separate training crawlers (e.g. GPTBot, ClaudeBot, Google-Extended) from search/retrieval crawlers (e.g. OAI-SearchBot, Claude-SearchBot, PerplexityBot).

**Do:** Document a policy, then optionally make robots explicit:

- Allow retrieval/search bots (citation path).
- Decide training bots allow vs disallow (product/IP choice, not a Google ranking hack).

**Effort:** low.  
**Impact:** low–medium (eligibility hygiene).  
**Wrong when:** treating robots Allow as a ranking booster.

---

### B2 - Video embeds + image/video SEO on pillars

Google: gen AI features can surface relevant images and video; standard image/video SEO still applies.

**Do:** After A1, embed videos on 3–5 pillars; keep heroes useful; optional VideoObject later.

---

### B3 - FAQPage JSON-LD only where FAQs are real

FAQ UI already exists on posts.

Structured data is **not required** for Google gen AI, but can still help classic rich results.

Add FAQPage schema only for genuine Q&A already on the page.

---

### B4 - Founder Person pages + richer Person schema

Organization founders are named; off-site sameAs is still thin until company profiles exist.

**Do:** `/about` or `/team/{founder}` with Person JSON-LD (url, image, jobTitle, sameAs, worksFor, knowsAbout).

Links author blocks on posts to real profiles.

---

### B5 - Agent-friendly site UX pass

Google web.dev: browser agents use DOM, a11y tree, screenshots.

Checklist direction: semantic controls, stable layout, no ghost overlays, clear labels, visible state.

**Dali angle:** audit CTA/forms should be agent-readable; homepage motion must not hide primary actions behind unstable overlays.

**Effort:** audit + small fixes.  
**Impact:** medium long-term; good brand fit.  
**Wrong when:** full redesign only for agents.

---

## Tier C - BOFU surfaces (conversion SEO)

Prefer a few high-intent pages over programmatic sprawl:

| Page | Intent |
| --- | --- |
| Strong vibe-code rescue / hardening landing | problem → pilot |
| Agency ops agent landing | ICP agencies |
| Live comparison (in-house vs agency vs freelancers) | BOFU decision |
| Honest pilot scope / pricing philosophy | trust |
| Short glossary (production agent, approval gate, vibe code) | citability + internal links |

Ship 5–8 max. Interlink to existing posts and `/solutions`.

---

## Deprioritize / skip now

| Tactic | Why |
| --- | --- |
| llms.txt for Google ranking | Google ignores; optional only for other tools |
| “Chunking” content for models | Google mythbust |
| Rewriting only for AI keywords | Google mythbust |
| Buy links or fake mentions | spam risk |
| Mass new EN posts without GSC data | volume ≠ AI visibility |
| Empty secondary directories after Clutch | already warned in platforms doc |
| Wikipedia page | notability; premature |
| Paid GEO tools before manual baseline | no measurement yet |

---

## 30-day sequence (new work only)

Depends on human P0: GSC ([blockers.md](./blockers.md) B-P0-01).

```text
Week 1
  - GSC verify + sitemap (blocker)
  - Baseline AI citation sheet (A5): 10 prompts × ChatGPT + Perplexity
  - LinkedIn Company shell (blocker; entity)
  - YouTube channel + first 3 process videos (A1)

Week 2
  - Clutch start (blocker)
  - 1 outreach mention path live (podcast OR guest OR quote) (A2)
  - Draft original research outline (A4)

Week 3
  - Publish research asset or deep pillar rewrite with numbers (A4)
  - Check GSC classic coverage + Generative AI report if present (A3)
  - Embed first videos on 2 pillars (B2)

Week 4
  - Second mention placement (A2)
  - Agent-friendly UX skim on audit CTA path (B5)
  - Decide: 1 BOFU landing vs more YT (C vs A1)
```

---

## Source ledger

| ID | Claim | Source | Confidence |
| --- | --- | --- | --- |
| S1 | For Google Search, gen AI optimization is still SEO; ignore llms.txt / chunking / AI-only rewrite hacks | [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | high |
| S2 | Unique, non-commodity, people-first content | same | high |
| S3 | Generative AI performance report in Search Console | [GSC gen AI reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports), [help](https://support.google.com/webmasters/answer/16984139) | high |
| S4 | YouTube mentions strongest AI-visibility correlate (~0.737) | [Ahrefs brand visibility correlations](https://ahrefs.com/blog/ai-brand-visibility-correlations/) | high (correlation) |
| S5 | Brand web mentions >> backlinks for AI Overview brand visibility | [Ahrefs AI Overview brand correlation](https://ahrefs.com/blog/ai-overview-brand-correlation/) | high (correlation) |
| S6 | Site page count weak for AI mentions | Ahrefs brand visibility study | high (correlation) |
| S7 | ChatGPT less tied to classic authority gates | Ahrefs brand visibility study | medium |
| S8 | Agent-friendly site practices | [web.dev agent-friendly UX](https://web.dev/articles/ai-agent-site-ux) | medium–high (emerging) |
| S9 | Stats / quotes / citations help gen-engine visibility | Princeton et al. GEO (KDD 2024), via secondary writeups | medium (directional) |
| S10 | Dali readiness: foundation high, GSC/entity low | [status.md](./status.md) | high (internal) |

Correlation is not causation.

Prefer Google primary guidance for on-Google behavior.

Treat vendor “+40% GEO” claims with skepticism.

---

## Unknowns

- Index coverage and gen AI impressions for dali.agents.ge (no GSC yet).
- Whether third parties already mention “Dali Agents”.
- Generative AI report availability for this property/account.
- Clutch review velocity once profile exists.

---

## Operator checklist (copy)

- [ ] GSC verified + sitemap (blocker)
- [ ] Generative AI report checked or “not available yet” logged
- [ ] AI citation baseline sheet (10 prompts, 2 engines)
- [ ] YouTube channel live + 3 videos with transcripts
- [ ] One earned third-party mention (not directory)
- [ ] One original research or heavily upgraded pillar
- [ ] Optional: crawler policy decision logged
- [ ] Optional: founder Person page
- [ ] Optional: one BOFU landing

---

## Related

- [status.md](./status.md)
- [blockers.md](./blockers.md)
- [playbook-summary.md](./playbook-summary.md)
- [lifehacks-current.md](./lifehacks-current.md)
- [platforms-publish.md](./platforms-publish.md)
