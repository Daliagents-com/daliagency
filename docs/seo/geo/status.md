# SEO/GEO status

## Сейчас актуально (live + git)

| Слой | Статус |
| --- | --- |
| Код + 52 статьи (en/ru/ge/arm) | **Да** - `main` `84d0779`, GitHub |
| Prod `dali.agents.ge` | **Да** - blog, FAQ, related, heroes, sitemap |
| Schema Organization/WebSite + BlogPosting | **Да** |
| Nav Blog, hreflang на постах | **Да** |
| SEO workspace (локально) | **Да**, но **не в git** |

То есть **продукт-контент и site foundation - актуальны**.
Не “всё SEO сделано” - **машина индексации и entity снаружи** ещё нет.

---

## Что осталось для SEO/GEO (по приоритету)

### P0 - без этого почти не будет органики

1. **Google Search Console**
   - property `https://dali.agents.ge`
   - verify
   - sitemap `https://dali.agents.ge/sitemap.xml`
   - URL Inspection: `/`, `/blog`, 2–3 поста

2. **Индексация**
   - через 1–2 недели: Coverage / Pages
   - руками “Request indexing” на pillar-страницы

3. **Не плодить второй live-сайт**
   - `.com` купишь - **park**, cutover одним окном + 301 (док: `dali-seo-workspace/docs/domain-plan.md`)

### P1 - GEO / entity (AI-выдача и доверие)

4. **Один brand string везде:** Dali / Dali Agents + URL
5. **LinkedIn** company + founders (David, Liana) → `sameAs` в schema когда будут URL
6. **Clutch / directories** - профили + реальные отзывы (не спам)
7. **GBP** - только если local/service-area осознанно

### P1 - измерение и loop

8. **GA4** (или добить Vercel Analytics events: blog → audit CTA)
9. После GSC: weekly - queries, CTR, pages **11–20** → rewrite
10. **DataForSEO** - опционально, для volumes/SERP, не блокер

### P2 - контент/качество

11. **GE/ARM** - у части постов короче EN; при желании углубить pillars
12. **Internal links** home/solutions → top blog hubs
13. **Новые статьи** - cadence, не взрыв
14. **`dali-seo-workspace` в git** - если хочешь backup/sync

### Не нужно / не блокер

- Claude Code `/seo` plugin
- Отдельные `daliagents.ru/.ge/.am` как полноценные сайты
- Scheduler на неделю

---

## Честный % готовности

| Зона | ~ |
| --- | --- |
| Site + content foundation | **85–90%** |
| Index / Search Console | **~10%** (ты) |
| Entity / off-site GEO | **~15%** |
| Analytics + rewrite loop | **~5%** |
| Domain strategy | **решено**, cutover later |

**Итог:** код и блог **актуальны**.
Для SEO/GEO “чтобы работало в поиске” главный gap - **GSC + индексация + entity (LinkedIn/Clutch) + потом .com 301**.

Ближайший 30-мин ход только твой: **GSC verify + sitemap**.
После этого можно крутить loop по реальным запросам.
