# Free-tier SEO/GEO baseline - dali.agents.ge

**Date:** 2026-07-31  
**Runtime:** Grok (no Claude Code, no paid SEO APIs)  
**Sources:** live HTTP fetch of production + local `daliagency/v2` blog inventory + workspace queue

## Summary

| Area | Status | Severity |
| --- | --- | --- |
| Site up (home/solutions) | OK (HTTP 200) | - |
| robots.txt + sitemap | Present | - |
| Home `<title>` / meta description in first HTML | **Absent in fetched document head** | **P0** |
| Home JSON-LD Organization | **0 ld+json blocks** in fetch | **P1** |
| Blog on production | **Missing** (`/blog` 404) | **P0** |
| Local blog package (4 locales) | Ready in repo | deploy unlocks |
| Multi-locale core pages | Present (en/ru/ge/arm) | - |
| GSC / GA4 SEO tooling | Not connected | P1 after deploy |
| Entity / review platforms | Research only, not claimed | P1 |
| Content depth for SEO/GEO | 1 local package; 0 live posts | P0 after deploy |

No traffic, rankings, keyword volumes, or conversion rates are reported here (would need GSC/GA4/DataForSEO). Numbers below are observed HTTP/HTML counts only.

## Live site observations

### HTTP checks (fetched 2026-07-31)

| URL | Result |
| --- | --- |
| `https://dali.agents.ge/` | 200 |
| `https://dali.agents.ge/robots.txt` | 200 |
| `https://dali.agents.ge/sitemap.xml` | 200 |
| `https://dali.agents.ge/solutions` | 200 |
| `https://dali.agents.ge/blog` | **404** |
| `https://dali.agents.ge/ru/blog` | **404** |
| `https://dali.agents.ge/blog/ai-agent-agency-vs-in-house` | **404** |

### robots.txt

```
User-Agent: *
Allow: /

Host: https://dali.agents.ge
Sitemap: https://dali.agents.ge/sitemap.xml
```

Notes:

- Site is crawlable.
- No explicit AI crawler allow/deny policy (GPTBot, ClaudeBot, etc.) - optional later, not a blocker.
- Sitemap pointer is correct.

### sitemap.xml

- `<loc>` count observed: **64**
- Locs containing `blog`: **0**
- Includes home locales, design-sprints, solutions (+ children), projects.
- After deploy of local blog work, expect + blog hubs (×4 locale surfaces) + post URLs (×4 for first package).

### Home page SEO signals (HTML parse)

Captured in setup evidence (`home-seo-parsed.txt` / live fetch of first HTML body chunk). Production home is a rich marketing page with language switcher (EN/RU/GE/ARM).

Findings:

- `hreflang` language links observed in HTML: `en`, `ru`, `ka`, `hy` (matches site locales).
- Production nav at fetch time: Projects / Solutions / Services / About - **no Blog link** (Blog exists only in local source until deploy).
- **No `application/ld+json` blocks** in the fetched HTML stream for home - Organization/WebSite schema is a **P1 gap** after deploy (blog posts ship `BlogPosting` JSON-LD in local code under `src/app/blog/[slug]/page.tsx`).
- Title/meta may stream via RSC; do not treat missing `<title>` in a partial body dump as definitive without View Source after deploy. Still verify head tags post-deploy.
- GEO citability: service/about copy on site is usable; no long-form citable blog passages live yet.

## Local blog inventory (repo - ready to deploy)

| Item | Value |
| --- | --- |
| Content root | `daliagency/v2/content/blog/{en,ru,ge,arm}/` |
| Published package | `ai-agent-agency-vs-in-house` × 4 locales |
| Routes | `/blog`, `/blog/[slug]`, `/{locale}/blog`, `/{locale}/blog/[slug]` |
| Loader | `src/lib/blog/loadPosts.ts` |
| Sitemap code | includes `/blog` + published posts |
| Nav (local) | Blog label in `home.ts` for all locales |
| Publisher | `dali-seo-workspace/scripts/publish_to_dali.py` dry-run OK |
| Loader verify | `npm run verify:blog` → ok for 4 locales |

## Workspace control plane (Grok)

| Path | Role |
| --- | --- |
| `dali-seo-workspace/AGENTS.md` | How Grok runs the loop |
| `orchestrator/queue.yaml` | Prioritized topics |
| `context/*` | Brand, grounding, SEO rules |
| `reports/` | Audits / lifehacks |
| `research/platforms/` | Clutch, GBP, LinkedIn briefs |

Next queue item (`status: ready`): **`cmp-agency-vs-freelancers`**  
Slug: `ai-agent-agency-vs-freelancers`  
Type: comparison (priority 2)

## Actionable next steps (ordered)

### P0 - unlock indexation + crawlable head

1. **Verify/fix production document head**: fetched home HTML had no `<title>` and no meta description in `<head>` (only viewport + assets). Confirm with View Source; if real, fix metadata rendering before expecting rankings.
2. **Deploy** `daliagency/v2` with blog routes + MDX content (and any head/metadata fix).
3. Confirm prod: `/blog` 200, first post 200, sitemap contains blog locs, title tags present.
4. Submit/refresh sitemap in **Google Search Console** (when property exists).

### P1 - authority / discovery

4. Claim **LinkedIn** company + founders (`research/platforms/linkedin.md`).
5. Decide **GBP** storefront vs service-area; claim if intentional (`google-business-profile.md`).
6. Start **Clutch** profile with real client reviews only (`clutch.md`).
7. Wire **GSC** (and optionally GA4 content events) for rewrite feedback later.

### P1 - content cadence (after deploy)

8. Run one Grok content cycle for `ai-agent-agency-vs-freelancers` (EN→RU/GE/ARM).
9. Publish via `python3 scripts/publish_to_dali.py drafts/<slug>/ --require-all-locales --status published`.
10. Follow queue order: comparisons → tutorials → pillars.

### P2 - GEO polish

11. Add/verify Organization + Person `sameAs` once profiles exist.
12. Strengthen citable answer blocks in posts (already in first package pattern).
13. Optional DataForSEO only when budget approved (volumes/difficulty).

## Explicit non-findings

- No keyword volume table (no DataForSEO).
- No ranking positions (no GSC).
- No Core Web Vitals field data (no CrUX/API key this run).
- No claim that production already ranks for target queries.

## Related artifacts

- `reports/baseline-2026-07-31/live-site-snapshot.md`
- `reports/weekly-2026-07-31.md` (deploy blocker decision)
- `reports/lifehacks-2026-07-31.md`
- `research/platforms/*`
