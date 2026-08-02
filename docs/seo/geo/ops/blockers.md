# Blockers (human-only)

Items only David can finish.
Agent work continues without waiting.

## Tracking update 2026-08-01 (8h sprint)

- Email domain `hello@` live (ImprovMX) - public CTAs no longer depend on personal Gmail.
- GoodFirms free path submitted (under review).
- Crunchbase org submitted (pending).
- Clutch sales email set to hello@; still needs real reviews for ranking.
- X company SMS OTP still human-only.
- DNS A for `dali.agents.ge` restored (`76.76.21.21`) after NXDOMAIN.
- AI Agents Directory submit still Auth0-gated.

---

## B-P0-01 - Google Search Console verify + sitemap

**Priority:** P0  
**Status 2026-08-01:** **MOSTLY DONE** - domain property `sc-domain:dali.agents.ge` verified; sitemap submitted; home URL on Google; **11 URL inspects** + Request indexing fired this sprint. Remaining: crawl/index maturity for money URLs (ops, not setup).

**Why SEO/GEO:** Index coverage view, query data, rewrite loop for positions 11-20, indexing requests.

**Remaining steps (not full re-setup):**
1. Open https://search.google.com/search-console?resource_id=sc-domain%3Adali.agents.ge
2. In a few days: re-check the 10 money URLs already inspected (do not re-spam Request indexing)
3. Wait for coverage/performance data (may take days)

**Done when (setup):** Property Verified; sitemap Success - **met**.  
**Done when (ops this sprint):** ≥10 URLs inspected/requested - **met** (11 inspects; evidence in SCRATCH search-hygiene).

**Links:** setup log `setup-2026-08-01.md`

---

## B-P0-02 - Buy and park `daliagents.com` (optional this week)

**Priority:** P0 (brand) / P1 (SEO timing)  
**Status 2026-08-02:** **DONE** - куплен 2026-08-01 (RDAP Verisign: 2026-08-01T10:20Z) и в тот же день стал production-хостом, а не park.  
**Why:** Primary global host for later cutover; prevents squatting.

**Steps:**
1. Buy at Cloudflare / Namecheap / Google Domains equivalent
2. Do **not** point production yet if not ready for cutover
3. Optionally buy `dali-agents.com` → later 301

**Done when:** Domain is in your registrar account; DNS can be changed.

**Cutover later:** follow `dali-seo-workspace/docs/domain-plan.md` (301 1:1, then GSC).

---

## B-P0-03 - Confirm Vercel production tracks Git `main`

**Priority:** P0  
**Why:** Git is source of truth after push; avoid silent drift between CLI deploys and Git.

**Steps:**
1. Vercel → project `dali` (team `larsen66s-projects`)
2. Settings → Git → connected to `lyanchouss/daliagency`, production branch `main`
3. Confirm latest deployment after `f3debf8` / newer commits

**Done when:** A push to `main` auto-deploys production aliased to `dali.agents.ge`.

---

## B-P0-04 - GSC property + sitemap + Change of Address для daliagents.com

**Priority:** P0  
**Status 2026-08-02:** **open** - property существует только для `sc-domain:dali.agents.ge`; для `daliagents.com` property не создана; Change of Address не сделан.

**Why SEO/GEO:** Канонический хост без GSC = нет coverage/query данных и нет переноса equity с .ge.
Вся GSC-работа спринта была на legacy-хосте.

**Steps (из [domain-cutover-daliagents-com.md](./domain-cutover-daliagents-com.md), пункты 6-9):**
1. GSC: добавить domain property `daliagents.com`, отправить sitemap
2. GSC legacy `sc-domain:dali.agents.ge`: Change of Address / мониторить 308
3. Bing Webmaster: добавить `https://daliagents.com/`, отправить sitemap
4. Директории: обновить website URL на daliagents.com в LinkedIn / Clutch / GoodFirms / Crunchbase

**Note (от координатора, 2026-08-02):** ценовой якорь для пилота David отметил как ВАЖНЫЙ, но отложенный пункт.
Решение о диапазоне цен остаётся за David (human-only); диапазон не выдумывать и не публиковать до его решения.

**Done when:** .com property verified + sitemap submitted + Change of Address запущен + website URL в директориях обновлён.

---

## B-P1-01 - LinkedIn Company page for Dali

**Priority:** P1  
**Status 2026-08-01:** **DONE (shell + Premium + posts)**  
Public: https://www.linkedin.com/company/dali-agents  
sameAs on prod. Gen-image global posts published.  
Remaining ops: follower growth, bulk invites optional, avoid Tbilisi-lead copy.

**Personal profile:** https://www.linkedin.com/in/davidhakobyan/

---

## B-P1-02 - LinkedIn Premium or Sales Navigator (1 month experiment)

**Priority:** P1  
**Why:** Sales outbound + InMail; weak direct GEO, strong pipeline.

**Recommendation in social plan:** Sales Navigator only if you will do 20+ targeted outreach/week for 30 days; else Premium Career is enough for profile views/InMail light.

**Steps:** See `social-linkedin-plan.md` 30-day plan; activate only with calendar blocked for outreach.

**Done when:** Subscription active OR explicit skip logged here.

---

## B-P1-03 - Clutch company profile

**Priority:** P1  
**Status 2026-08-01:** **SHELL DONE / REVIEW OPEN**  
Public: https://clutch.co/profile/dali (unpublished free / under review)  
Sales email: `hello@dali.agents.ge`  
Remaining: **real client review** (human-only); publish when Clutch activates.

**Done when:** Public profile live + at least 1 real review requested.

---

## B-P1-04 - GoodFirms / DesignRush / Sortlist (pick 1-2 after Clutch)

**Priority:** P1  
**Status 2026-08-01:** **GoodFirms DONE (under review, slug dali)**  
Crunchbase submitted same sprint.  
Remaining optional: DesignRush / Sortlist free path one-at-a-time; AI Agents Directory Auth0.

**Done when:** One complete secondary EN directory OR skip with reason.

---

## B-P1-05 - Google Business Profile (only if local intent)

**Priority:** P1 if service-area Tbilisi/GE; else P2 skip  
**Why:** Maps pack + local entity.

**Steps:**
1. Decide storefront vs service-area
2. business.google.com → claim
3. NAP consistent with site
4. Website `https://dali.agents.ge`
5. Category truthful (Software company / Marketing agency - pick one primary)

**Done when:** Verified GBP OR documented "no GBP - remote-only strategy".

---

## B-P1-06 - RU directories (optional)

**Priority:** P1 for RU market  
**Examples:** Habr Career company (if fits), VC.ru brand presence, Yandex Business if local RU, 2GIS if physical - only if real.

**Steps:** Pick 1 primary RU surface; fill once; add sameAs.

**Done when:** One RU entity page live OR skip.

---

## B-P1-07 - GE / AM local directories

**Priority:** P1 for local clients  
**GE:** ss.ge business (if relevant), gold.ge / local catalogs, Facebook Business (weak SEO but local), LinkedIn  
**AM:** list.am (if B2C-ish - often weak for B2B), LinkedIn, local chamber-style lists if any

**Done when:** At least one GE and one AM presence OR explicit remote-global-only strategy.

---

## B-P1-08 - Bing Webmaster + IndexNow

**Priority:** P1  
**Status 2026-08-01:** **MOSTLY DONE** - property verified; sitemap Submitted / Processing; **0 URLs discovered** yet.  
Optional later: IndexNow key for new posts.

**Why:** Secondary index; some AI/partners use Bing.

**Remaining steps:**
1. https://www.bing.com/webmasters - wait for discovery after Processing clears
2. Optional IndexNow key for new posts

**Done when (setup):** Sitemap accepted/Submitted - **met**.  
**Done when (ops):** URLs discovered / indexed - still open.

---

## B-P2-01 - GA4 property for dali.agents.ge

**Priority:** P2  
**Why:** Blog engagement and CTA conversion beyond Vercel Analytics.

**Steps:** Create GA4 → stream → add measurement ID to Vercel env if using gtag (or keep Vercel-only if enough).

**Done when:** Realtime hits on /blog.

---

## B-P2-02 - Company email / brand consistency

**Priority:** P2  
**Status 2026-08-01:** **DONE for public brand**  
Public business inbox: `hello@dali.agents.ge` (ImprovMX → founder Gmail).  
Site Footer + `daliContactEmail` use hello@ (not personal Gmail).  
GoodFirms + Clutch sales email use hello@.  
Optional later: Google Workspace / `@daliagents.com` after .com buy; keep personal Gmail for founder outreach only.

**Done when:** Decision logged; site CTA updated - **met**.

---

## B-P2-03 - Push / deploy after local-only workspace changes

**Priority:** P2  
**Why:** `dali-seo-workspace` is not a git repo yet.

**Steps:** Optional: `git init` + remote for workspace OR copy critical docs only under `daliagency/docs/seo/geo/` (preferred - already doing).

**Done when:** Workspace either git-backed or accepted as local-only.

---

## Tracking

| ID | Status |
| --- | --- |
| B-P0-01 GSC | **MOSTLY DONE** 2026-08-01 - property + sitemap + 11 URL inspects; coverage still processing; ongoing Request indexing ops |
| B-P0-02 .com buy | **DONE** 2026-08-01 - куплен (RDAP 2026-08-01T10:20Z) и стал prod-хостом daliagents.com |
| B-P0-03 Vercel Git | **PARTIAL** 2026-08-01 - CLI prod deploy + alias `dali.agents.ge`; still confirm Git auto-deploy on every push |
| B-P0-04 GSC .com + Change of Address | **open P0** 2026-08-02 - property для daliagents.com не создана; CoA не сделан; директории всё ещё на .ge |
| B-P1-01 LinkedIn Co | **DONE** 2026-08-01 - public company + Premium + gen posts + sameAs |
| B-P1-02 LinkedIn Pro | **PARTIAL** - Company Premium purchased; bulk invites not done |
| B-P1-03 Clutch | **SHELL DONE** 2026-08-01 - hello@ + profile under review; real client review still open |
| B-P1-04 secondary dirs | **PARTIAL** 2026-08-01 - GoodFirms submitted; Crunchbase submitted; Sortlist/DesignRush optional |
| B-P1-05 GBP | open (no street) |
| B-P1-06 RU | open |
| B-P1-07 GE/AM | open |
| B-P1-08 Bing | **MOSTLY DONE** 2026-08-01 - property + sitemap Submitted/Processing; 0 URLs discovered yet |
| B-P2-01 GA4 | open |
| B-P2-02 email | **DONE** 2026-08-01 - hello@ public CTAs + dirs |
| B-P2-03 workspace git | open (docs under daliagency/docs preferred) |
