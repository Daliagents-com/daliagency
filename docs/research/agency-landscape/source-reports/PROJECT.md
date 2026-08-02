# AI Agents & Automation Companies — Competitive Research Project

## What This Project Is

We are building a competitive research database of AI agent / automation companies. The goal is to deeply research each company and understand:
- What they actually do (not what they claim)
- How big they really are
- Who they sell to and how
- What their sales funnel looks like — the hook, the upsell, the close
- What tech stack they use
- Whether their claims are verifiable

This is NOT a surface-level directory. We verify claims against external sources and flag anything unverifiable.

## Current State (as of 2026-04-12)

### Completed Research
| # | Company | Status |
|---|---------|--------|
| 1 | varickagents.com | Done |
| 2 | automaly.io | Done |
| 3 | intuz.com | Done |
| 4 | aismbsolutions.com | Done |
| 5 | exei.ai | Done |
| 6 | acuityai.co | Done |
| 7 | palantir.com | Done |
| 8 | theaiautomationagency.ai | Done |
| 9 | innofied.com | Done |
| 10 | en.automation.house | Done |
| 11 | goodish.agency | Done |
| 12 | leewayhertz.com | Done |
| 13 | markovate.com | Not started |
| 14+ | 75 more agencies added from market map | Not started |

### Key Findings So Far

**varickagents.com** — NYC-based AI agency (founded 2025). Targets Fortune 5000 enterprises. No named clients, only demo deployments. Sells via free AI opportunity audit → scoped project. Fear-based sales language ("Only AI Native Orgs Will Survive"). Very early stage (~$220K rev estimate).

**automaly.io** — London-based AI & automation consultancy (founded 2020). Premier Pipedrive Partner. Stack: Make, Airtable, n8n, Pipedrive. Sells to UK/Ireland SMBs. Entry point is a paid AI Readiness Assessment with money-back guarantee. No named clients after 6 years — red flag. CEO: Thomas Birch.

**intuz.com** — India-based dev shop with US-facing office (founded 2008). 55 employees, 1,500+ projects. Offshore rates $25-49/hr. Claims JLL, Bosch, Holiday Inn as clients — not independently verified. 52 Clutch reviews (4.7/5). Real value prop is cost arbitrage, not AI expertise specifically.

## File Structure

```
agents-research/
├── PROJECT.md              ← This file. Start here.
├── search-pipeline.md      ← Documents the research pipeline methodology
├── research.csv            ← Raw data file (source of truth)
├── push_to_sheets.py       ← Pushes CSV to Google Sheets + formatting
├── sheets_auth.py          ← OAuth setup for Google Sheets API
├── token.json              ← Google OAuth token (auto-generated, do not edit)
```

## How the Workflow Works

```
1. PULL: python3 push_to_sheets.py pull     ← Sync Sheets → CSV (MANDATORY FIRST STEP)
2. Research company (web searches + website scraping)
3. Update research.csv via Python — match by URL, never by row index
4. PUSH: python3 push_to_sheets.py          ← Pulls again internally, merges, then pushes
5. Google Sheet updates instantly
6. User sees changes in browser in real-time
```

## CRITICAL: Data Safety Rules (MANDATORY FOR ALL AGENTS)

These rules exist because we lost data (header row, 3 companies wiped) when agents overwrote each other. NEVER violate these.

1. **ALWAYS PULL BEFORE PUSH.** Run `python3 push_to_sheets.py pull` before ANY write to CSV. The user and other agents add rows directly in Google Sheets — if you don't pull first, you'll overwrite their additions.
2. **MATCH BY URL, NOT ROW INDEX.** NEVER use hardcoded row numbers like `rows[34]`. Rows shift constantly. Always find companies by matching their URL in column 0 using `normalize_url()`. Use `update_row_by_url()` from push_to_sheets.py.
3. **NEVER CLEAR+REWRITE SHEETS DIRECTLY.** Never call `ws.clear()` or `ws.update()` yourself. Always use `push_to_sheets.py` which handles pull-merge-push safely.
4. **ONE WRITER AT A TIME.** Research agents can run in parallel (they only fetch web data). But CSV writes and Sheet pushes must be sequential — never run two push scripts at once.
5. **VERIFY AFTER PUSH.** After every push, spot-check: does the header row exist? Do key rows (varickagents, palantir) still have their data?

### Why Python for CSV edits (not direct file editing)
The CSV contains non-breaking spaces (U+00A0 / \xc2\xa0) and special characters that break text-based edit tools. Python's csv module handles encoding correctly every time.

### Why Google Sheets (not local files)
LibreOffice and Apple Numbers don't auto-reload CSV files when they change on disk. Google Sheets via API gives instant visibility — edit CSV, push, see it immediately.

## Google Sheets Setup

- **Main Sheet URL**: https://docs.google.com/spreadsheets/d/1JHPi7ZuiXa5m7LJM8fBUB6moQj6JmSKPDzfE0Y821PM/edit
- **Niche-Specific Sheet URL**: https://docs.google.com/spreadsheets/d/10LFdJi2Nh-j4res2u7mtlq5zlavLtaF9kw7AMYCi1iU/edit?gid=0#gid=0
- **API**: Google Sheets API via `gspread` library
- **Auth**: OAuth 2.0 (InstalledAppFlow) — token stored in `token.json`
- **Google Cloud Project**: `focus-electron-493023-g3`
- **Credentials file**: `~/Downloads/client_secret_870843406292-28ej8q27qfoem0ujhb4g3314sqr9rmk8.apps.googleusercontent.com.json`
- **Push script**: clears sheet, writes all rows, applies formatting (dark header, alternating rows, frozen header, column widths, text wrap)

## Research Pipeline (Summary)

Full details in `search-pipeline.md`. Quick version:

1. **4 parallel Google searches** — services, LinkedIn, reviews, founder/funding
2. **4 parallel website fetches** — /services, /about, /pricing, /case-studies
3. **4 gap-filling searches** — pricing rates, X/Twitter, client verification, Crunchbase
4. **Homepage funnel analysis** — extract every CTA, form, booking system, lead magnet
5. **Cross-reference** — verify claims against external sources, flag red flags

### Hard Rules
- **NEVER use /blog/ pages** — blogs are SEO marketing, not operational truth
- **CLAIMED vs. VERIFIED** — always tag the source
- **"Not found" over guessing** — never infer missing data
- **Flag red flags** — inflated team sizes, no named clients, unverifiable claims

## Public-Only Research Rules

This project should prefer information that is findable without extra payment. If a source requires a paid seat, subscription, or trial gate to access the useful data, do not rely on it for core research.

### Allowed free/public source categories

- **Company website** — homepage, services, about, pricing, case studies, contact, legal pages
- **LinkedIn public company/person pages** — headcount ranges, roles, locations, hiring signals
- **Clutch / G2 / Capterra public pages** — reviews, ratings, pricing hints, positioning
- **Public job boards** — LinkedIn Jobs, Indeed, Wellfound, company careers pages
- **Crunchbase public profile** — founding year, funding stage, basic company profile
- **Public tech lookup tools** — BuiltWith, Wappalyzer, public snippets from Similarweb
- **Social media** — X/Twitter, LinkedIn posts, YouTube, public podcasts
- **Product / launch sites** — Product Hunt and similar public launch pages
- **GitHub public repos / org pages** — engineering activity, open-source clues
- **Glassdoor public pages** — hiring and operations signals when visible without login/payment
- **Partner / certification directories** — AWS, Microsoft, HubSpot, Shopify, Salesforce, OpenAI ecosystem, etc.
- **Government / company registries** — incorporation or legal entity data where publicly searchable
- **Public communities** — Reddit, public Slack/Discord landing pages, community forums, Hacker News

### Disallowed paid-only sources for baseline research

- Apollo
- ZoomInfo
- Clearbit enrichment products
- Semrush paid reports
- Ahrefs paid reports
- Similarweb paid-only detail views
- Any marketplace or directory data hidden behind a paid account

### Source handling rules

1. **Prefer free/public evidence first.** If the same fact exists on the website, LinkedIn, or Clutch, use that instead of a paid database.
2. **Record the exact source used.** Every non-trivial field should point to a usable public source category and, where practical, a URL.
3. **Separate fact from inference.** If something is estimated from public signals, mark it as inferred or estimated rather than verified.
4. **Do not depend on login-gated workflows.** If a researcher cannot reproduce the result from public web access, treat it as non-portable evidence.
5. **Keep paid-enrichment fields optional.** The core dataset must remain maintainable with free/public sources only.

## Spreadsheet Columns

| Column | Description |
|--------|-------------|
| wha (Link) | Company website URL |
| Type | AI Agency, Consultancy, Dev Shop, SaaS, etc. |
| Title & Headline | Their main value prop (verbatim from homepage) |
| Services | Semicolon-separated list of actual offerings |
| Stack | Verified tools, platforms, frameworks, AI models |
| Size | Company size category + revenue if findable |
| Target Market | Who they sell to — industry, size, geography |
| Pricing Model | Project-based / retainer / subscription / hourly |
| Pricing Range | Actual numbers or "Not public" |
| Geography | HQ + dev centers + service area |
| Team Size | Headcount + source + key people names |
| Founding Year | Cross-verified where possible |
| Case Studies | Named clients + metrics OR "No named clients" |
| How they sell | Full funnel: HOOK → SALES LANGUAGE → UPSELL → CTAs → CHANNELS → CLOSE |
| Primary Pain Point | Main likely buyer problem inferred from public evidence |
| AI Use Case | Best-fit AI/agent opportunity based on public evidence |
| AI Readiness | Low / Medium / High with short justification from stack, hiring, and tech signals |
| Urgency Trigger | Hiring, launch, funding, expansion, layoffs, or other visible timing signal |
| Decision Maker | Most likely buyer role(s) based on service type and org profile |
| Budget Estimate | Public or inferred spend capacity, clearly labeled |
| Objection Risk | Likely blocker: security, compliance, legacy stack, in-house team, etc. |
| Priority Score | Internal targeting score for your agency |
| Next Best Action | Best outreach or research step to take next |
| Pain Evidence | Concrete evidence of the customer pain they are solving |
| Pain Evidence Type | Type of evidence: case study, testimonial, founder post, review, etc. |
| Pain Evidence Summary | Short explanation of the pain revealed by the evidence |
| Social Posts | Important founder/company posts summarized in compact form |
| Social Post Summary | Short description of what each captured social post is saying |
| Engagement Style | Short description of how each post tries to attract attention or response |
| Social Themes | Repeated themes in their public posting |
| Marketing Words | Exact words or short phrases they repeatedly use in marketing |
| Marketing Angle | Short summary of the persuasion angle behind those words |
| Verification Status | `Claimed`, `Verified`, `Inferred`, or `Estimated` |
| Confidence | `Low`, `Medium`, or `High` confidence in the row's quality |
| Last Checked | Date the row was last materially verified |

## Rules For Pain And Social Fields

### `Pain Evidence`

- Capture concrete proof of the business pain they help fix.
- Good inputs:
  - case study before/after problems
  - testimonial language describing frustrations or bottlenecks
  - repeated service-page pain framing
  - founder/company posts about customer struggles
  - reviews mentioning workflow issues
  - job posts revealing internal process gaps
- Prefer evidence that describes the customer's problem before the solution.
- If multiple strong pieces exist, separate them with ` | `.
- Summarize; do not paste long quotes.

### `Pain Evidence Type`

- Use one or more short labels separated by `;`.
- Allowed labels:
  - `Case Study`
  - `Testimonial`
  - `Service Page`
  - `Sales Copy`
  - `Founder Post`
  - `Company Post`
  - `Customer Review`
  - `Job Post`
  - `Interview / Podcast`
  - `Community Discussion`

### `Pain Evidence Summary`

- Write 1-2 sentences explaining the pain in plain language.
- Focus on the buyer's operational or commercial problem, not the agency's feature set.
- Good examples:
  - `Manual lead qualification slows speed-to-lead and causes missed revenue.`
  - `Support teams are overloaded by repetitive tickets, so the offer is framed around response speed and cost reduction.`
- Avoid vague wording like `They help with automation`.

### `Social Posts`

- Capture founder or company posts that reveal:
  - target customer pain
  - offer positioning
  - objections
  - proof/results
  - strategic priorities
- Keep to 2-5 strong entries when available.
- Format as compact summaries separated by ` | `:
  - `2026-03-11 - Founder on LinkedIn: companies lose time on manual quoting`
  - `2026-02-22 - Company on X: launched AI support agent for ecommerce returns`
- Summaries are preferred over raw copy-paste.

### `Social Post Summary`

- Write a short description of what each captured post is actually about.
- Keep it one compact sentence per post.
- Match the order of entries in `Social Posts`.
- Separate multiple summaries with ` | `.
- Good examples:
  - `Argues that AI pilots fail because they do not create measurable business impact.`
  - `Shows a case where invoicing automation cut weekly admin time dramatically.`

### `Engagement Style`

- Describe how the post is trying to drive attention, trust, or response.
- Match the order of entries in `Social Posts`.
- Separate multiple entries with ` | `.
- Use short phrases, not long explanations.
- Good labels and phrases:
  - `Problem-first thought leadership`
  - `Fear / urgency`
  - `Proof / case study`
  - `Educational`
  - `Product launch`
  - `Founder authority`
  - `Soft CTA`
  - `Direct CTA`
- Example:
  - `Problem-first thought leadership; creates urgency around wasted AI spend`

### `Social Themes`

- Distill repeated posting patterns into short tags separated by `;`.
- Examples:
  - `Lead gen automation; outbound scaling; CRM cleanup`
  - `Support deflection; response speed; cost reduction`
  - `AI agents; enterprise workflows; compliance concerns`

### `Marketing Words`

- Capture the exact words, slogans, hooks, and repeated phrases they use to market themselves.
- Prefer homepage headlines, hero copy, CTA text, offer language, and repeated phrases from key pages or social posts.
- Keep quotes short and selective.
- Separate multiple items with ` | `.
- Good examples:
  - `Your business is leaking margin`
  - `Done running your business on workarounds`
  - `Bring AI to your team without hiring FTE engineers`

### `Marketing Angle`

- Write 1 short sentence explaining what persuasion angle the language is using.
- Focus on the sales psychology behind the words.
- Examples:
  - `Uses pain-first operational language to make inefficiency feel expensive and urgent.`
  - `Uses authority and de-risking language to make enterprise buyers feel safe.`
  - `Uses anti-headcount language to appeal to leaders who want leverage without hiring.`

### Quality Bar

1. `Pain Evidence` must be anchored in something publicly visible.
2. `Pain Evidence Summary` should make the customer pain understandable in one read.
3. `Social Posts` should prioritize signal, not volume.
4. `Social Post Summary` should explain the content plainly and briefly.
5. `Engagement Style` should explain the post's persuasion mechanism, not repeat the topic.
6. `Social Themes` should compress patterns rather than repeat full post summaries.
7. `Marketing Words` should preserve the company's real language, not your paraphrase.
8. `Marketing Angle` should interpret the selling strategy briefly and concretely.
9. If useful evidence is not publicly visible, write `Not found`.

## Skill for Agents

The research pipeline is available as a Claude Code skill:
- **Location**: `~/.claude/commands/research-company.md`
- **Invoke**: `/research-company [company-url]`
- **What it does**: Runs the full 5-round pipeline, updates the CSV, pushes to Google Sheets

## Dependencies

```
pip install gspread google-auth-oauthlib google-auth
```

Python 3.9+ (currently using system Python 3.9 on macOS — works but shows deprecation warnings).
