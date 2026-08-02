# SEO/GEO status

**Updated:** 2026-08-02 (post-cutover live audit)

## Сейчас актуально (live + git)

| Слой | Статус |
| --- | --- |
| Код + 107 статей x 4 локали (en/ru/ge/arm) | **Да** - GitHub `Daliagents-com/daliagency`; live sitemap 492 URL, из них 428 blog; батчи +30 buyer FAQ и +25 GPT gaps отгружены |
| Prod **`daliagents.com`** | **Canonical** - apex primary; www + `dali.agents.ge` → 308 apex |
| Legacy `dali.agents.ge` | **Redirect only** - not a content host |
| Schema Organization/WebSite + BlogPosting | **Да** (LI company + Clutch + phone + Tbilisi) |
| Nav Blog, hreflang на постах | **Да** |
| Footer → Blog / Solutions / hello@ | **Да** |
| Author E-E-A-T block on posts | **Да** |
| Docs pack `docs/seo/geo/*` | **Да** |
| `llms.txt` + `/about` | **In progress (wave 1)** - создаются другими агентами, не задеплоено; `llms.txt` на проде 404 |
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
| Index / Search Console | **~0% для канонического хоста daliagents.com** (property не создана; вся GSC-работа спринта была на `sc-domain:dali.agents.ge`) |
| Entity / off-site GEO | **~55%** (company LI + Clutch + GoodFirms + Crunchbase; not personal-LI-only) |
| Analytics + rewrite loop | **~15%** (no weekly query rewrite yet) |
| Domain strategy | **решено**, cutover later |

---

## Что осталось (коротко)

### P0 - open
1. GSC: создать property для `daliagents.com`, отправить sitemap, сделать Change of Address с `sc-domain:dali.agents.ge` (B-P0-04); .ge-inspects имеют смысл только до Change of Address
2. ~~Optional park `daliagents.com` (B-P0-02)~~ **DONE** - куплен 2026-08-01, сразу стал prod-хостом
3. Confirm every `main` push auto-aliases production `daliagents.com` (B-P0-03) - CLI alias still used when lag

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

- [audit-independent.md](../audits/audit-independent-2026-07-31.md)
- [playbook-seo-geo.html](../playbook/playbook-seo-geo.html)
- [ai-citation-baseline.md](../audits/ai-citation-baseline-2026-07-31.md) - 6 Perplexity rows 2026-08-01 + 3 google-websearch rows 2026-08-02
- [sprint-closeout-2026-08-01.md](./sprint-closeout-2026-08-01.md)
- [setup-2026-08-01.md](./setup-2026-08-01.md)
- [goal-8h-2026-08-01.md](./goal-8h-2026-08-01.md)

---

## Next 7 days (David)

1. GSC: property для `daliagents.com` + sitemap + Change of Address с `sc-domain:dali.agents.ge` (B-P0-04)
2. Directories: website URL на daliagents.com в LinkedIn / Clutch / GoodFirms / Crunchbase
3. X company OTP when SMS arrives
4. Clutch real review request
5. AI Agents Directory after free login

---

## Итог

Foundation + off-site entity shells + brand email **shipped**; `daliagents.com` куплен 2026-08-01 (RDAP Verisign 2026-08-01T10:20Z) и в тот же день стал prod-хостом - домену 1 день.
Главный remaining gap: **GSC для daliagents.com отсутствует** (property не создана, Change of Address не сделан) и **нулевая видимость в Google** - брендовый запрос "Dali Agents" сайт не возвращает, категорийные выигрывают листинги и конкуренты (см. ai-citation-baseline 2026-08-02).
Контент тонкий: медиана EN-поста 227 слов (min 176, max 676), все посты датированы 2026-07-31/08-01.
Email на сайте всё ещё `hello@dali.agents.ge`.
