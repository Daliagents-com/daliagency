# Company Research Pipeline

Skill location: `~/.claude/commands/research-company.md`
Invoke with: `/research-company [company-url]`

## CRITICAL: Data Safety Rules (MANDATORY)

These rules exist because multiple agents and the user edit the same Google Sheet simultaneously. Violating them WILL cause data loss.

1. **ALWAYS PULL BEFORE PUSH.** Run `python3 push_to_sheets.py pull` before ANY write. This syncs Google Sheets → CSV so you don't overwrite rows added by other agents or the user.
2. **MATCH BY URL, NOT ROW INDEX.** Never use hardcoded row numbers. Rows shift constantly as data is added from multiple sources. Always find companies by matching their URL in column 0. Use `update_row_by_url()` from push_to_sheets.py.
3. **NEVER CLEAR+REWRITE SHEETS DIRECTLY.** Never call `ws.clear()` or `ws.update()` yourself. Always use `push_to_sheets.py` which handles the pull-merge-push cycle safely.
4. **ONE WRITER AT A TIME.** Never launch multiple agents that write to the CSV simultaneously. Research agents can run in parallel (they only read web data), but CSV writes must be sequential.
5. **VERIFY AFTER PUSH.** After every push, spot-check that the header row exists and key rows (varickagents, palantir) still have their data.

## Overview

Automated deep-research pipeline for competitive analysis of AI/automation companies. Fills a structured Google Sheet with verified data per company in ~2-3 minutes.

## Pipeline Stages

### Round 1 — Parallel Google Searches (4 queries)

| # | Query | Purpose |
|---|-------|---------|
| 1 | `[domain] AI services` | What they claim to do |
| 2 | `[domain] LinkedIn company` | Real employee count, founding year, key people |
| 3 | `[domain] reviews Clutch G2 clients` | Verified reviews, named clients, ratings |
| 4 | `[domain] founder CEO team size funding Crunchbase` | Leadership, funding, revenue |

### Round 2 — Website Deep Dive (4 page fetches, parallel)

| # | Page | Purpose |
|---|------|---------|
| 5 | `/services` or `/solutions` | Actual service list, tech stack |
| 6 | `/about` or `/company` | Team, locations, certifications |
| 7 | `/pricing` | Engagement models, rates |
| 8 | `/use-cases` or `/case-studies` | Named clients, real results |

### Round 3 — Fill Gaps (4 queries, parallel)

| # | Query | Purpose |
|---|-------|---------|
| 9 | `[company] pricing rates hourly cost` | Clutch rates, project ranges |
| 10 | `site:x.com OR site:twitter.com [company]` | Social presence |
| 11 | `[client name] + [company name]` | Verify claimed client relationships |
| 12 | `[company] Crunchbase revenue employees` | Financial data |

### Round 4 — Sales Funnel Analysis (homepage fetch)

Extract every conversion mechanism:
- CTAs — buttons, links, how many times each appears
- Forms — what fields they ask for
- Booking systems — Calendly, Cal.com, HubSpot, etc.
- Chatbots / live chat
- Lead magnets — free audits, assessments, demos
- Email capture — newsletter, contact emails
- Phone numbers

Map the full funnel:
```
HOOK (what gets them in)
  → ENTRY POINT (first engagement, paid or free)
    → UPSELL (how cheap becomes expensive)
      → CLOSE (what makes people pay)
```

### Round 5 — Cross-Reference & Red Flags

- Website claims vs. LinkedIn headcount (flag mismatches)
- Claimed clients vs. external verification
- Clutch reviews vs. claimed project types
- Red flags: no named clients despite years in business, inflated team sizes, vague metrics

## Hard Rules

1. **NEVER trust /blog/ pages.** Blogs are SEO content marketing — they reflect what the company wants to rank for, not what they actually do. Skip all blog URLs.
2. **CLAIMED vs. VERIFIED.** Always distinguish data from their own website (claimed) vs. external sources like Clutch, Crunchbase, LinkedIn (verified).
3. **"Not found" over guessing.** If data isn't findable, write "Not found" — never infer or assume.
4. **Flag unverifiable claims.** Anything that can't be confirmed externally gets tagged "not independently verified".
5. **Use free/public sources only for baseline research.** Do not rely on paid-only tools or subscription-gated data to complete a row.

## Allowed Public Sources

Use these source types when filling or verifying rows:

- Company website pages
- LinkedIn public company and founder pages
- Clutch, G2, and Capterra public listings
- Public job boards and company careers pages
- Crunchbase public company pages
- BuiltWith / Wappalyzer public results
- Similarweb public snippets only
- GitHub public orgs and repos
- X/Twitter public pages
- YouTube and public podcast pages
- Product Hunt public pages
- Glassdoor public pages if visible without paywall reliance
- Partner and certification directories
- Government or company registry pages
- Reddit, Hacker News, and public forum discussions

Do not use paid-only enrichment providers as required evidence for a row.

## Quality Tracking Standard

For every researched company, explicitly record:

- `Verification Status` — `Claimed`, `Verified`, `Inferred`, or `Estimated`
- `Confidence` — `Low`, `Medium`, or `High`
- `Last Checked` — ISO date of last verification

## New Strategy Columns

Add these fields so the dataset is usable for agency building, not just competitor archiving:

- `Primary Pain Point`
- `AI Use Case`
- `AI Readiness`
- `Urgency Trigger`
- `Decision Maker`
- `Budget Estimate`
- `Objection Risk`
- `Priority Score`
- `Next Best Action`
- `Pain Evidence`
- `Pain Evidence Type`
- `Pain Evidence Summary`
- `Social Posts`
- `Social Post Summary`
- `Engagement Style`
- `Social Themes`
- `Marketing Words`
- `Marketing Angle`

## Output Columns

| Column | What goes in it |
|--------|----------------|
| Type | AI Agency, Consultancy, Dev Shop, SaaS, etc. |
| Title & Headline | Main value prop from homepage (verbatim) |
| Services | Semicolon-separated list |
| Stack | Specific tools, platforms, AI models (verified where possible) |
| Size | Startup/SMB/mid-size/enterprise + revenue if findable |
| Target Market | Industry, company size, geography |
| Pricing Model | Project-based / retainer / subscription / hourly |
| Pricing Range | Actual numbers or "Not public" |
| Geography | HQ + dev center + service area |
| Team Size | Number + source + key people |
| Founding Year | Verified from multiple sources |
| Case Studies | Named clients + results OR "No named clients" |
| How they sell | Full funnel: HOOK → SALES LANGUAGE → UPSELL → CTAs → CHANNELS → CLOSE |
| Primary Pain Point | Main buyer problem visible from reviews, job posts, positioning, and service mix |
| AI Use Case | Best candidate automation / agent use case based on public evidence |
| AI Readiness | Low / Medium / High using stack, hiring, and product evidence |
| Urgency Trigger | Timing signal such as hiring, launch, expansion, or funding |
| Decision Maker | Most likely buyer title(s) |
| Budget Estimate | Public or estimated spend capacity, explicitly labeled |
| Objection Risk | Likely blocker to buying AI services |
| Priority Score | Internal target score |
| Next Best Action | Best follow-up step for research or outreach |
| Pain Evidence | Concrete evidence of the customer pain they are solving |
| Pain Evidence Type | Case Study / Testimonial / Founder Post / Review / etc. |
| Pain Evidence Summary | 1-2 sentence summary of the pain shown by the evidence |
| Social Posts | Compact summaries of important founder/company posts |
| Social Post Summary | Short description of what each captured post is saying |
| Engagement Style | Short description of how each post tries to drive engagement |
| Social Themes | Repeated themes across public posts |
| Marketing Words | Exact words or repeated phrases they use in marketing |
| Marketing Angle | Short summary of the persuasion angle behind that language |
| Verification Status | Claimed / Verified / Inferred / Estimated |
| Confidence | Low / Medium / High |
| Last Checked | Date verified |

## Rules For Pain And Social Analysis

### `Pain Evidence`

- Use this field for concrete proof of the pain they sell against.
- Prefer:
  - case study problem statements
  - testimonial pain language
  - repeated service-page pain framing
  - founder/company posts about customer struggles
  - reviews mentioning bottlenecks or failures
  - job posts exposing manual work or process gaps
- Separate multiple strong items with ` | `.
- Summarize the evidence rather than pasting long quotes.

### `Pain Evidence Type`

- Use one or more labels separated by `;`.
- Allowed values:
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

- Explain the buyer pain in 1-2 sentences.
- Focus on the operational or revenue problem, not the implementation detail.
- Avoid generic statements like `They solve inefficiency`.

### `Social Posts`

- Capture only posts with research value.
- Prioritize posts that reveal:
  - pain
  - positioning
  - proof
  - objections
  - strategic focus
- Keep format compact:
  - `YYYY-MM-DD - speaker/platform: short summary`
- Separate entries with ` | `.
- 2-5 strong posts is enough.

### `Social Post Summary`

- Write one short sentence per captured post explaining what the post is about.
- Keep the order aligned with `Social Posts`.
- Separate multiple summaries with ` | `.
- Focus on the message content, not the persuasion method.

### `Engagement Style`

- Write one short phrase per captured post explaining how it tries to get attention or response.
- Keep the order aligned with `Social Posts`.
- Separate multiple entries with ` | `.
- Typical patterns:
  - `Problem-first thought leadership`
  - `Fear / urgency`
  - `Proof / case study`
  - `Educational`
  - `Product launch`
  - `Founder authority`
  - `Soft CTA`
  - `Direct CTA`

### `Social Themes`

- Convert post patterns into short tags separated by `;`.
- Example values:
  - `Lead gen automation; outbound scale; CRM hygiene`
  - `Support load; response speed; cost reduction`
  - `Agentic workflows; enterprise rollout; governance`

### `Marketing Words`

- Capture exact phrases from headlines, CTAs, offer copy, repeated hooks, and notable social language.
- Prefer short exact snippets rather than long passages.
- Separate entries with ` | `.
- Good sources:
  - homepage hero
  - service page subheads
  - CTA buttons
  - lead magnet language
  - repeated founder/company phrasing

### `Marketing Angle`

- Write one short sentence summarizing how the wording is selling.
- Focus on the persuasion model:
  - urgency
  - authority
  - ROI
  - de-risking
  - anti-headcount leverage
  - transformation / aspiration
  - proof-based trust
- Keep it interpretive but compact.

### Fallback Rule

- If no credible public evidence exists for pain or social activity, write `Not found`.

## Infrastructure

- CSV file: `~/Desktop/reprojects/agents-research/research.csv`
- Push script: `~/Desktop/reprojects/agents-research/push_to_sheets.py`
- Google Sheet: `https://docs.google.com/spreadsheets/d/1JHPi7ZuiXa5m7LJM8fBUB6moQj6JmSKPDzfE0Y821PM/edit`
- Auth: OAuth token at `~/Desktop/reprojects/agents-research/token.json`
- After updating CSV, run `python3 push_to_sheets.py` to sync + format
