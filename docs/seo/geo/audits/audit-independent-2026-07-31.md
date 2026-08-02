# Independent SEO/GEO audit - dali.agents.ge

**Date:** 2026-07-31 (sprint)  
**Auditor role:** Independent agent (not the build team)  
**Method:** Live HTTP fetch of critical URLs + HTML signal parse + sitemap/robots  
**Primary host:** https://dali.agents.ge  
**Scope:** Technical, content, E-E-A-T, schema, i18n, GEO citability, entity, conversion  

---

## Summary score

| Dimension | Score /10 | Notes |
| --- | --- | --- |
| Technical crawl | 8 | robots allow, sitemap large, 200s on key templates |
| Content depth | 8 | 52 EN posts × 4 locales - rare for young studio sites |
| On-page SEO (blog) | 8 | titles, BlogPosting, heroes, FAQ, related |
| On-page SEO (home) | 7 | title/meta/Organization present in live fetch |
| i18n / hreflang | 7 | 4 locales live; blog hreflang on posts |
| GEO / citability | 6 | direct answers on posts; entity still thin off-site |
| E-E-A-T / trust | 5 | founders named; few third-party profiles |
| Conversion paths | 7 | audit CTAs on blog/footer; email is personal Gmail |
| Measurement | 3 | no GSC; Vercel Analytics only in prod flag |
| **Overall** | **6.8 / 10** | Strong content base; index + entity are the gaps |

**One-line judgment:** This is a **content-rich multi-locale studio site** that already looks like a serious SEO product surface, but it will underperform until Search Console, entity profiles, and consistent off-site sameAs exist.

---

## Live evidence (this sprint)

| URL | HTTP |
| --- | --- |
| `/` | 200 |
| `/blog` | 200 |
| `/blog/ai-agent-agency-vs-in-house` | 200 |
| `/blog/what-is-vibe-coding` | 200 |
| `/blog/geo-seo-for-ai-agencies` | 200 |
| `/solutions` | 200 |
| `/project/kora` | 200 |
| `/ru`, `/ge`, `/arm`, `/ru/blog` | 200 |
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 |

**Sitemap:** ~276 `<loc>` total; **52** unique EN blog post URLs.  
**Robots:** Allow all; Host + Sitemap pointed correctly.  
**Home HTML:** title present (`Dali - AI Agent Systems & Agent-First Products`), meta description present, Organization + WebSite JSON-LD present, Blog in nav.  
**Post HTML:** title with brand, BlogPosting, Related articles, FAQ `aria-expanded`, hero image.

---

## Top 10 wins (already present)

1. Large multi-locale blog inventory (52 packages × 4 languages).
2. Working `/blog` UX: related rail, FAQ accordion, heroes.
3. BlogPosting + Organization/WebSite schema live.
4. robots.txt and sitemap.xml coherent.
5. Clear ICP-aligned topics (agents, gates, vibe-code rescue, Upwork patterns).
6. Locales en/ru/ge/arm on core routes.
7. Project proof pages (`/project/*`) for E-E-A-T support.
8. Solutions pilots map for conversion context.
9. CTA "Start audit" present in nav/footer/blog.
10. Founder LinkedIn linked from footer (personal).

---

## Top 10 issues (priority + evidence)

| # | Severity | Issue | Evidence | Fix owner |
| --- | --- | --- | --- | --- |
| 1 | P0 | No Search Console feedback loop | No GSC property (human) | David - blockers B-P0-01 |
| 2 | P0 | Index status unknown | Cannot measure without GSC | David |
| 3 | P1 | Thin off-site entity (no company LinkedIn/Clutch) | Footer only personal LinkedIn | David + later sameAs |
| 4 | P1 | Footer has no Blog link | Footer.tsx - socials only | Agent (this sprint) |
| 5 | P1 | sameAs incomplete in Organization schema | layout.tsx - no sameAs array | Agent (placeholders + known URLs) |
| 6 | P1 | Personal Gmail as public contact | Footer mailto | David B-P2-02 |
| 7 | P1 | GE/ARM posts often shorter than EN | Content inventory quality | later content goal |
| 8 | P2 | No dedicated author page | Posts author string "Dali" only | Agent author block |
| 9 | P2 | Domain still `.ge` subdomain for global brand | dali.agents.ge | David .com cutover later |
| 10 | P2 | Analytics/CTA funnel not documented in GSC/GA4 | Vercel-only | B-P2-01 |

---

## GEO / AI visibility notes

Aligned with Google's framing that generative AI features are rooted in core Search systems (see playbook citations):

- **Eligible pages:** strong (indexable blog, allow crawl).
- **Citable passages:** good on many posts (Direct answer sections).
- **Entity:** weak off-site - AI systems struggle to "know" Dali without LinkedIn Co / directories / consistent NAP.
- **Myths to ignore:** llms.txt as ranking magic, AI-only keyword rewriting, content chunking gimmicks.

---

## 30-day plan

### Week 1
- GSC verify + sitemap (David).
- LinkedIn Company + 3 posts (David).
- Ship footer blog links + schema sameAs + author block (this sprint / follow-up deploy).
- Request indexing on 5 pillars.

### Week 2
- Clutch profile draft + review asks.
- Bing Webmaster import.
- Internal link pass: solutions → relevant posts.

### Week 3
- Review GSC coverage; fix soft 404s / excluded pages if any.
- Rewrite any thin posts that get impressions but low CTR.
- GBP decision (local or skip).

### Week 4
- Domain cutover prep if `daliagents.com` bought.
- 2 new posts only if hubs are interlinked.
- Measure: impressions, clicks, branded queries.

---

## Falsifiability checks

| Claim | How we know it failed |
| --- | --- |
| Blog is indexable | After 14 days GSC: 0 blog URLs indexed despite 200s |
| Schema helps rich results | Search appearance shows 0 enhancements for 30 days (not always bad) |
| Related rail improves engagement | No secondary pageviews to related posts in analytics after 30 days |
| Multi-locale is working | Only EN gets impressions; RU/GE/ARM zero after 30 days of crawl |
| Off-site entity matters | Branded queries for "Dali Agents" stay near zero while unbranded content ranks competitors |

---

## No-code-needed items

Human blockers are listed in `blockers.md`.
Code changes in this sprint target issues 4, 5, 8 (footer, sameAs, author block).
