# Domain cutover: daliagents.com

**Date:** 2026-08-01  
**Canonical host:** `https://daliagents.com` (apex)  
**Legacy host:** `https://dali.agents.ge` → **308** to apex  

## Production wiring (Vercel project `dali`)

| Host | Role |
| --- | --- |
| `daliagents.com` | Primary, no redirect |
| `www.daliagents.com` | 308 → `daliagents.com` |
| `dali.agents.ge` | 308 → `daliagents.com` (equity + bookmarks) |

Git: `Daliagents-com/daliagency` · root `v2` · branch `main`.

## Code source of truth

- `v2/src/lib/seo/organizationIdentity.ts` → `DALI_ORG.url`
- `v2/src/lib/seo/site.ts` → `siteUrl` / `absoluteUrl()`
- Consumed by: layout metadataBase + JSON-LD, robots, sitemap, blog JSON-LD, solutions OG URLs

Public business email stays `hello@dali.agents.ge` until `@daliagents.com` mailbox is set up.

## Operator checklist after deploy

1. [x] Live: `https://daliagents.com/robots.txt` host + sitemap on .com
2. [x] Live: `https://daliagents.com/sitemap.xml` all absolute URLs on .com
3. [x] Live: Organization JSON-LD `url` = `https://daliagents.com`
4. [x] `curl -sI https://dali.agents.ge` → 308 Location includes daliagents.com
5. [x] `curl -sI https://www.daliagents.com` → 308 → apex
6. [ ] GSC: add domain property `daliagents.com` (or URL-prefix), submit sitemap
7. [ ] GSC legacy `sc-domain:dali.agents.ge`: Change of Address / monitor 308s
8. [ ] Bing Webmaster: add `https://daliagents.com/`, submit sitemap
9. [ ] Clutch / LinkedIn / directories: website field → daliagents.com
10. [ ] Optional: ImprovMX + SPF/MX on `daliagents.com` for `hello@`

Items 1-5 verified live 2026-08-02: robots host + sitemap на .com, sitemap absolute .com URLs, Organization JSON-LD url .com, 308 path-preserving с dali.agents.ge и www.
Items 6-9 tracked as blocker [B-P0-04](./blockers.md).

## Do not

- Do not leave dual canonicals (`.ge` and `.com`) in metadata after cutover
- Do not remove legacy 308 until GSC shows equity moved and backlinks updated
