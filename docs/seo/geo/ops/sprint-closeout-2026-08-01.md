# Sprint closeout - 8h SEO/GEO operator (2026-08-01)

## Shipped

| Area | Evidence |
| --- | --- |
| Business email | `hello@dali.agents.ge` (ImprovMX); site mailto + Footer |
| Prod schema | Organization sameAs LI company + Clutch; phone; Tbilisi HQ |
| GoodFirms | Free listing registered, slug `dali`, under review |
| Crunchbase | Org submitted uuid `1cb11ce4-e610-469f-91e0-17d70350e748` |
| Clutch | Sales email hello@; free unpublished |
| LinkedIn | ≥3 gen-image global company posts |
| On-site interlinks | HomeSeoSummary → vibe-code-rescue + lead-response + GEO post |
| Verify scripts | `verify:org-schema` LIVE w/ DNS resolve fallback; `verify:geo-surfaces` |
| DNS recovery | A record `dali` → `76.76.21.21` on agents.ge |
| Smoke | 10/10 critical URLs HTTP 200 via resolve |
| GSC URL Inspection | **11 URLs** inspected in UI (home on Google; others not indexed yet; Request indexing fired) |
| Bing | sitemap Submitted / Processing; 0 URLs discovered |
| Citation baseline | ≥6 Perplexity rows logged |

## Blocked / partial

| Item | Status |
| --- | --- |
| X company account | SMS OTP human |
| AI Agents Directory free submit | Auth0 login required |
| Wikidata item | No existing item; create needs account + notability sources |
| Sortlist full free profile | Landing only this pass |
| GSC indexation maturity | 11 inspects done; most money URLs still “not on Google” / unknown - wait for crawl queue |
| LI Premium bulk invites | Features available; not bulk-sent |
| Perplexity B1/B3 entity | Wrong/partial - brand entity not fully established in AI answers |

## Next 7 days

1. Confirm public DNS resolves for all resolvers; re-run Perplexity B1/B3 after crawl
2. GSC: re-check the 10 money URLs in a few days (inspect already done; do not re-spam Request indexing)
3. Complete AI Agents Directory after free Auth0 signup
4. X company OTP when SMS arrives
5. Real Clutch client review (human)
6. Optional Wikidata when secondary sources exist

## Commits (this sprint wave)

- `1d690f7` hello@ mailto
- `008979e` docs progress
- `d3ffa9f` home interlinks + GEO verify scripts
- `ec07b39` closeout + citation
- `a9616ed` status/blockers truth alignment
- skeptic sync (HEAD after a9616ed): Tracking, B-P1-08/B-P2-02 bodies, GSC 11, email-setup
