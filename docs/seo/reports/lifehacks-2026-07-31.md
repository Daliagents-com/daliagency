# Visibility lifehacks - Dali (2026-07-31)

Scope: free-tier, pre-GSC. Ranked by impact × speed for https://dali.agents.ge.

## P0 - do this week

| # | Action | Why | Fail check | Owner | ETA |
| --- | --- | --- | --- | --- | --- |
| 1 | Deploy blog + first 4-locale post | Indexable content + hreflang surface | `/blog` 404 or missing in sitemap | eng | 1d |
| 2 | Submit sitemap in Google Search Console | Indexation path for new URLs | Property not verified / sitemap errors | founder | 2h |
| 3 | Organization + WebSite JSON-LD on root layout (if missing on home) | Entity clarity for search/AI | Rich Results Test shows no Organization | eng | 2h |
| 4 | Claim/complete LinkedIn Company + founder profiles with sameAs links | Entity graph for AI research | Profiles incomplete or no site link | founder | 3h |
| 5 | Internal links: solutions/home CTA strip → `/blog` hub | Crawl + user path to content | Zero internal links to blog from main pages | eng/content | 2h |

## P1 - next 7-14 days

| # | Action | Why | Fail check | Owner | ETA |
| --- | --- | --- | --- | --- | --- |
| 6 | Google Business Profile if service-area is intentional | Local/Maps pack + Maps AI context | No GBP or NAP mismatch | founder | 1d |
| 7 | Clutch (or regional agency) profile draft + 3 human reviews | Vendor research platforms AI often cites | Profile empty / ToS-breaking reviews | founder | 3d |
| 8 | Author/E-E-A-T block on blog posts (David/Liana) | Trust signals on YMYL-adjacent advice | Anonymous articles only | content | 4h |
| 9 | Bing Webmaster + IndexNow for new posts | Secondary index + AI partners | Not registered | eng | 2h |
| 10 | Second comparison + one tutorial (4 locales) | Cluster density | Single orphan post | content loop | 1w |

## P2 - systemize

| # | Action | Why | Fail check | Owner | ETA |
| --- | --- | --- | --- | --- | --- |
| 11 | GA4 content group / blog events | Feedback loop for rewrites | No blog engagement data | eng | 4h |
| 12 | DataForSEO when budget OK | Cluster volumes, SERP overlap | Still guessing keywords | founder | ongoing |
| 13 | Weekly `/dali-weekly` + drift snapshot | Catch deploy regressions | No baseline file | content | weekly |
| 14 | `llms.txt` only after core pages are solid | Optional agent readability; not a ranking hack | Treat as magic → wasted effort | eng | later |

## Explicit non-lifehacks

- Buying fake reviews or PBNs.
- Mass AI thin pages for every keyword.
- Expecting ChatGPT citations without indexed, citable, entity-backed pages.

## First measurement plan (after deploy)

1. GSC: coverage of `/blog/*` within 14 days.
2. Manual AI queries (EN/RU): "AI agent agency vs in-house" - note if Dali appears (baseline likely no).
3. Re-run lifehacks after GSC data exists.
