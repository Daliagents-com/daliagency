# SEO/GEO status

**Updated:** 2026-08-01 (domain cutover to daliagents.com)

## Сейчас актуально (live + git)

| Слой | Статус |
| --- | --- |
| Код + 52 статьи (en/ru/ge/arm) | **Да** - GitHub `Daliagents-com/daliagency` |
| Prod **`daliagents.com`** | **Canonical** - apex primary; www + `dali.agents.ge` → 308 apex |
| Legacy `dali.agents.ge` | **Redirect only** - not a content host |
| Schema Organization/WebSite + BlogPosting | **Да** (LI company + Clutch + phone + Tbilisi) |
| Nav Blog, hreflang на постах | **Да** |
| Footer → Blog / Solutions / hello@ | **Да** |
| Author E-E-A-T block on posts | **Да** |
| Docs pack `docs/seo/geo/*` | **Да** |
| SEO workspace (локально) | **Да**, не git |

---

## 8h sprint progress (2026-08-01 operator)

| Item | Status |
| --- | --- |
| hello@ mailto prod | shipped `1d690f7` + Vercel prod alias |
| GoodFirms free listing | registered, under review, slug `dali` |
| Crunchbase | submitted uuid `1cb11ce4-e610-469f-91e0-17d70350e748` |
| Clutch hello@ | sales email updated; profile unpublished/free |
| LI gen posts x3 | live on company page (global copy) |
| Home interlinks | vibe-code-rescue + lead-response + GEO post (`d3ffa9f`) |
| DNS dali.agents.ge | A `76.76.21.21` on agents.ge (NXDOMAIN fix) |
| GSC | domain property + sitemap exist; home URL on Google; inspect batch ongoing |
| Bing | property + sitemap UI; see search-hygiene bing note |
| X company | still SMS OTP human |
| AI Agents Dir | Auth0 login-block on free submit |

---

## % готовности (после 8h sprint)

| Зона | ~ |
| --- | --- |
| Site + content foundation | **92%** |
| Operator SEO/GEO docs | **95%** |
| Index / Search Console | **~55%** (property + sitemap live; coverage still “processing”; need ongoing URL inspect + query data) |
| Entity / off-site GEO | **~55%** (company LI + Clutch + GoodFirms + Crunchbase; not personal-LI-only) |
| Analytics + rewrite loop | **~15%** (no weekly query rewrite yet) |
| Domain strategy | **решено**, cutover later |

---

## Что осталось (коротко)

### P0 - open
1. GSC: finish Request indexing for remaining pillar URLs (property already verified)
2. Optional park `daliagents.com` (B-P0-02)
3. Confirm every `main` push auto-aliases `dali.agents.ge` (B-P0-03) - CLI alias still used when lag

### P1 - open
4. Clutch **real client review** (profile shell exists)
5. X company SMS OTP
6. AI Agents Directory free submit after Auth0
7. GBP decision if street appears (B-P1-05)

### Done this sprint (do not re-open as setup)
- GSC property + sitemap existence
- LinkedIn Company shell + Premium + gen posts
- Brand email hello@
- GoodFirms + Crunchbase submissions
- Bing property import existence

### P1 - after more GSC data
8. Weekly queries / 11-20 rewrite
9. More indexing requests on new posts

### P2
10. GA4, deeper GE/ARM, workspace git

Полный список: [blockers.md](./blockers.md) · Closeout: [sprint-closeout-2026-08-01.md](./sprint-closeout-2026-08-01.md)

---

## Sprint artifacts

- [audit-independent.md](./audit-independent.md)
- [playbook-seo-geo.html](./playbook-seo-geo.html)
- [ai-citation-baseline.md](./ai-citation-baseline.md) - 6 Perplexity rows 2026-08-01
- [sprint-closeout-2026-08-01.md](./sprint-closeout-2026-08-01.md)
- [setup-2026-08-01.md](./setup-2026-08-01.md)
- [goal-8h-2026-08-01.md](./goal-8h-2026-08-01.md)

---

## Next 7 days (David)

1. GSC remaining URL inspect + Request indexing (15-30 min)
2. X company OTP when SMS arrives
3. Clutch real review request
4. AI Agents Directory after free login
5. Optional: buy `daliagents.com` park only

---

## Итог

Foundation + off-site entity shells + brand email **shipped**.
Главный remaining gap: **index coverage maturity** (GSC data lag + ongoing inspect) and **human OTP/reviews**, not “no company entity at all”.
