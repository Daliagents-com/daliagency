# Dali Agents - Business Research

Consolidated research corpus for the Dali Agents business (daliagents.com).
Imported 2026-08-02 from scattered working directories; original source paths are listed below for provenance.

## Structure

```
research/
├── upwork-marketplace/   Upwork + FL.ru demand research and outreach program
│   └── data/             Raw corpus (158-listing report, card workbooks, outreach packs)
├── market/               Market demand, ICP, offers, unit economics
└── agency-landscape/     233-company AI agency competitive database and reports
    ├── reports/          Strategy reports built on the database
    └── source-reports/   Original reports, PDFs, and methodology
```

## upwork-marketplace/

Built from 158 scraped Upwork + FL.ru listings (2026-07-28 to 2026-07-30).

- `dali-marketplace-funnel-strategy-2026-07-29.md` - repeated pains from listings turned into productized-service funnels (Lead Response, Client Inbox, Ops & Documents, Knowledge Assistant, Voice Agents).
- `dali-marketplace-sales-playbook-2026-07-29.md` - converting a marketplace reply into the smallest honest paid milestone; per-category scripts.
- `dali-marketplace-funnels-status-2026-07-29.md` - status ledger for the funnel program.
- `dali-marketplace-live-check-2026-07-30.md` - re-audit of 24 Wave-1 listings against live pages.
- `dali-marketplace-morning-brief-2026-07-30.md` - one-page "send to first" brief.
- `dali-marketplace-targets-2026-07-29.csv` - 33 target listings with match score, budget, competition, URL.
- `upwork-paid-trial-fit-test.md` - fit test for an Upwork paid trial.
- `upwork-live-audit-2026-07-29.csv` - live listing audit results.
- `data/marketplace-report-158-2026-07-28.html` - the raw 158-listing corpus; source of truth every funnel doc cites.
- `data/upwork-100-cards-2026-07-28.xlsx`, `data/marketplace-158-cards-2026-07-28.xlsx` - listing card workbooks.
- `data/outreach/` - outreach copy, send-ready queues, Wave-1 send pack.

## market/

- `03-us-market.md` - US demand for a messaging-first agent.
- `04-ru-cis-market.md` - RU/CIS equivalent.
- `40-cis-demand-2026-07-29.md` - buyer-authored CIS demand verification (RU).
- `24-marketplace-demand-2026-07-28.md` - what buyers actually pay for on Upwork + FL.ru.
- `12b-agency-targets-fast.md` - 10 US marketing-agency targets with source ledger.
- `fl-ru-ai-corpus-2026-07-28.csv` - FL.ru AI-job corpus.
- `10-offer-prototypes.md` - six concierge offer prototypes.
- `07-unit-economics.md` - stress test of a $200-300/mo agent subscription.
- `target-audience.md` - ICP synthesis (RU), willingness-to-pay and monetization.

## agency-landscape/

April 2026 foundational research: 233 AI agent/automation companies.

- `research.csv` - 233 companies x 39 columns (identity, services, stack, funnel, pricing, verification).
- `README.md` - dataset description and purpose.
- `dali-positioning-frame.md` - Dali positioning vs AI-agent studios, consultancies, tool vendors.
- `reports/first-offer-strategy.md` - wedge offer recommendation (AI Lead Response & Follow-Up for SMBs).
- `reports/professional-services-market.md` - US small law/accounting/consulting firms.
- `reports/agentic-agency-leads.md` - net-new agentic-AI agency leads.
- `source-reports/` - Russian originals, analysis PDFs, methodology (`PROJECT.md`), research pipeline notes.

## Provenance (originals still on disk as of import)

| Cluster | Original location |
| --- | --- |
| upwork-marketplace | `~/Desktop/reprojects/kora-v2/docs/research/market/`, `~/Desktop/reprojects/kora-v2/docs/Сем/`, `~/Desktop/reprojects/kora-v2/outputs/` |
| market | `~/Desktop/reprojects/kora-v2/docs/Сем/{research,strategy,economics}/` |
| agency-landscape | `~/Desktop/reprojects/ai-agency-market-research/`, `~/Desktop/reprojects/agents-research/` |
| ../seo/reports, ../seo/platforms | `~/Desktop/projects/dali-seo-workspace/` |

Not imported (left in place, referenced only):

- `~/Desktop/reprojects/kora-v2/docs/Сем/` - the full board/decision system (~70 files) is a Kora-branded program; only the market research core that feeds Dali was taken.
- `~/Desktop/projects/dali-seo-workspace/` - live SEO tooling workspace (python data sources, orchestrator, drafts pipeline); only finished reports and platform research were taken.
- `~/Desktop/reprojects/finding-niche/` - lead-hunting pipeline (leads CSVs, outreach tracker); operational tooling, not research.
