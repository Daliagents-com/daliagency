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
**Why SEO/GEO:** Without GSC there is no index coverage view, no query data, no rewrite loop for positions 11-20, no reliable indexing requests.

**Steps:**
1. Open https://search.google.com/search-console
2. Add property → URL prefix → `https://dali.agents.ge`
3. Verify via DNS TXT on `agents.ge`, HTML file upload, or meta tag (pick one)
4. Sitemaps → submit `https://dali.agents.ge/sitemap.xml`
5. URL Inspection → request indexing for `/`, `/blog`, 3 pillars (e.g. production agents, GEO/SEO, vibe rescue)

**Done when:** Property is Verified; sitemap shows Success; at least 5 key URLs inspected.

**Links:** [gsc-setup.md in workspace](../../../) / also `dali-seo-workspace/docs/gsc-setup.md`

---

## B-P0-02 - Buy and park `daliagents.com` (optional this week)

**Priority:** P0 (brand) / P1 (SEO timing)  
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

## B-P1-01 - LinkedIn Company page for Dali

**Priority:** P1  
**Why GEO:** Entity graph, sameAs, branded search, AI research surfaces.

**Steps:**
1. Create Company Page "Dali" / "Dali Agents"
2. Website: `https://dali.agents.ge`
3. Tagline: AI agent systems studio
4. Link founders David Hakobyan + Liana as admins/employees
5. Add logo, about, 3 posts (agents / vibe rescue / audit CTA)
6. Send URL for schema `sameAs` update

**Done when:** Public company URL works; founders linked.

**Personal profile (exists):** https://www.linkedin.com/in/davidhakobyan/

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
**Why:** EN B2B vendor research; often cited by humans and sometimes by AI summaries.

**Steps:**
1. https://clutch.co → join as company
2. Categories: AI, custom software, IT services (pick truthful)
3. Location: Georgia / remote as accurate
4. Link case projects from site (Kora, agents.ge, etc.) without inventing metrics
5. Request **real** client reviews only

**Done when:** Public profile live; at least 1 real review requested.

---

## B-P1-04 - GoodFirms / DesignRush / Sortlist (pick 1-2 after Clutch)

**Priority:** P1  
**Why:** Secondary EN directories; diminishing returns after Clutch.

**Steps:** See `platforms-publish.md`. Claim only after Clutch is filled (avoid 10 empty profiles).

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
**Why:** Secondary index; some AI/partners use Bing.

**Steps:**
1. https://www.bing.com/webmasters
2. Import from GSC or verify DNS
3. Submit sitemap
4. Optional IndexNow key for new posts

**Done when:** Sitemap accepted.

---

## B-P2-01 - GA4 property for dali.agents.ge

**Priority:** P2  
**Why:** Blog engagement and CTA conversion beyond Vercel Analytics.

**Steps:** Create GA4 → stream → add measurement ID to Vercel env if using gtag (or keep Vercel-only if enough).

**Done when:** Realtime hits on /blog.

---

## B-P2-02 - Company email / brand consistency

**Priority:** P2  
**Why:** Trust; public mailto is personal Gmail.

**Steps:** Consider `hello@dali.agents.ge` or future `@daliagents.com`; keep personal for founder outreach.

**Done when:** Decision logged; site CTA updated if needed.

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
| B-P0-01 GSC | open |
| B-P0-02 .com buy | open |
| B-P0-03 Vercel Git | CLI prod deploy 2026-08-01 + alias dali.agents.ge → latest; still confirm Git auto-deploy on push |
| B-P1-01 LinkedIn Co | open |
| B-P1-02 LinkedIn Pro | open |
| B-P1-03 Clutch | open |
| B-P1-04 secondary dirs | open |
| B-P1-05 GBP | open |
| B-P1-06 RU | open |
| B-P1-07 GE/AM | open |
| B-P1-08 Bing | open |
| B-P2-01 GA4 | open |
| B-P2-02 email | open |
| B-P2-03 workspace git | open |
