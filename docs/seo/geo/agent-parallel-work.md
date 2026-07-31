# Agent parallel work (while David does blockers)

What coding agents can ship **without** GSC / LinkedIn / Clutch logins.

## Done in repo (2026-07-31)

| Item | Where | Notes |
| --- | --- | --- |
| FAQPage JSON-LD on blog posts | `v2/src/lib/blog/jsonLd.ts` + post pages | Real FAQs only, from MDX |
| Explicit AI crawler allow list | `v2/src/app/robots.ts` | Policy documented; still allow-all |
| AI citation baseline prompts | [ai-citation-baseline.md](./ai-citation-baseline.md) | You run 30 min; no login for agent |
| YouTube batch 1 scripts | [youtube-scripts-batch1.md](./youtube-scripts-batch1.md) | You film; agent wrote scripts |
| Next opportunities research | [opportunities-next.md](./opportunities-next.md) | Strategy |
| How SEO/GEO/AEO works | [how-seo-geo-aeo-works.md](./how-seo-geo-aeo-works.md) | Mental model + ranking levers |
| Topical Related rail | `v2/src/lib/blog/relatedPosts.ts` | Keywords/type/title score, not “6 newest” |
| BreadcrumbList + Person author | `v2/src/lib/blog/jsonLd.ts` | E-E-A-T / structure schema |

## Still agent-doable next (pick later)

1. Embed YouTube IDs on 3 pillars once videos are public.
2. Founder `/about` or Person schema pages after company LI URL exists.
3. One BOFU landing (vibe rescue) using existing i18n/copy patterns.
4. Glossary page (10 terms) with internal links to posts.
5. Original research MDX draft if David supplies anonymized audit notes.
6. IndexNow hook after Bing key (needs human key).
7. GA4 snippet after measurement ID (needs human).

## Still human-only

See [blockers.md](./blockers.md): GSC, domains, LI Company, Clutch, reviews, Bing verify, GBP decision.

## Rule

Agents do not invent client metrics, fake reviews, or empty directory profiles.
