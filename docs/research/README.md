# Dali Agents - Business Research

Consolidated research corpus for the Dali Agents business (daliagents.com).
Imported 2026-08-02 from scattered working directories; original source paths are listed below for provenance.

Naming convention: point-in-time documents carry the research date as a `YYYY-MM` or `YYYY-MM-DD` suffix; datasets and evergreen docs are indexed with their date here.

## Structure

```
research/
├── upwork-marketplace/   Upwork + FL.ru demand research and outreach program (2026-07)
│   └── data/             Raw corpus (158-listing report, card workbooks, outreach packs)
├── market/               Market demand, ICP, offers, unit economics (2026-07)
└── agency-landscape/     AI agency competitive landscape (2026-04, refreshed 2026-08)
    ├── reports/          Strategy reports built on the dataset
    └── source-reports/   Original April 2026 reports, PDFs, and methodology
```

## upwork-marketplace/ (2026-07-28 to 2026-07-30)

Built from 158 scraped Upwork + FL.ru listings.

| Date | File | What |
| --- | --- | --- |
| 07-29 | `dali-marketplace-funnel-strategy-2026-07-29.md` | Repeated pains from listings turned into productized-service funnels (Lead Response, Client Inbox, Ops & Documents, Knowledge Assistant, Voice Agents) |
| 07-29 | `dali-marketplace-sales-playbook-2026-07-29.md` | Converting a marketplace reply into the smallest honest paid milestone; per-category scripts |
| 07-29 | `dali-marketplace-funnels-status-2026-07-29.md` | Status ledger for the funnel program |
| 07-29 | `dali-marketplace-targets-2026-07-29.csv` | 33 target listings with match score, budget, competition, URL |
| 07-29 | `upwork-live-audit-2026-07-29.csv` | Live listing audit results |
| 07-30 | `dali-marketplace-live-check-2026-07-30.md` | Re-audit of 24 Wave-1 listings against live pages |
| 07-30 | `dali-marketplace-morning-brief-2026-07-30.md` | One-page "send to first" brief |
| 07 | `upwork-paid-trial-fit-test-2026-07.md` | Fit test for an Upwork paid trial |

Data:

- `data/marketplace-report-158-2026-07-28.html` - the raw 158-listing corpus; source of truth every funnel doc cites.
- `data/upwork-100-cards-2026-07-28.xlsx`, `data/marketplace-158-cards-2026-07-28.xlsx` - listing card workbooks.
- `data/outreach/` - outreach copy, send-ready queues, Wave-1 send pack (2026-07-29 to 07-30).

## market/ (2026-07)

| Date | File | What |
| --- | --- | --- |
| 07 | `us-market-2026-07.md` | US demand for a messaging-first agent |
| 07 | `ru-cis-market-2026-07.md` | RU/CIS equivalent |
| 07-28 | `marketplace-demand-2026-07-28.md` | What buyers actually pay for on Upwork + FL.ru |
| 07-29 | `cis-demand-2026-07-29.md` | Buyer-authored CIS demand verification (RU) |
| 07-28 | `fl-ru-ai-corpus-2026-07-28.csv` | FL.ru AI-job corpus |
| 07 | `agency-targets-us-2026-07.md` | 10 US marketing-agency targets with source ledger |
| 07 | `offer-prototypes-2026-07.md` | Six concierge offer prototypes |
| 07 | `unit-economics-2026-07.md` | Stress test of a $200-300/mo agent subscription |
| 07-14 | `target-audience-2026-07-14.md` | ICP synthesis (RU), willingness-to-pay and monetization |
| 07 | `cohort-slot-ledger-2026-07.csv` | Strict FL.ru ten-slot cohort ledger |
| 07 | `cis-candidate-ledger-2026-07.csv` | Machine-readable CIS candidate ledger |

## agency-landscape/ (2026-04, refreshed 2026-08)

| Date | File | What |
| --- | --- | --- |
| 2026-04 | `agencies-dataset-233-2026-04.csv` | 233 companies x 39 columns (identity, services, stack, funnel, pricing, verification) |
| 2026-04 | `README.md` | Dataset description and how to use it |
| 2026-04 | `reports/first-offer-strategy-2026-04.md` | Wedge offer recommendation (AI Lead Response & Follow-Up for SMBs) |
| 2026-04 | `reports/professional-services-market-2026-04.md` | US small law/accounting/consulting firms |
| 2026-04 | `reports/agentic-agency-leads-2026-04.md` | Net-new agentic-AI agency leads |
| 2026-07-31 | `dali-positioning-frame-2026-07-31.md` | Dali positioning vs AI-agent studios, consultancies, tool vendors |
| 2026-08 | `ai-agency-market-refresh-2026-08.md` | Verification refresh of the April dataset: 4 parallel research agents, ~130 searches |
| 2026-04 | `source-reports/` | Russian originals, analysis PDFs, methodology (`PROJECT.md`), research pipeline notes; original filenames preserved |

## Provenance (originals still on disk as of import)

| Cluster | Original location |
| --- | --- |
| upwork-marketplace | `~/Desktop/reprojects/kora-v2/docs/research/market/`, `~/Desktop/reprojects/kora-v2/docs/Сем/`, `~/Desktop/reprojects/kora-v2/outputs/` |
| market | `~/Desktop/reprojects/kora-v2/docs/Сем/{research,strategy,economics}/` |
| agency-landscape | `~/Desktop/reprojects/ai-agency-market-research/`, `~/Desktop/reprojects/agents-research/` |
| ../seo/reports, ../seo/platforms | `~/Desktop/projects/dali-seo-workspace/` |

Renames applied on import (old Сем name → new):
`03-us-market` → `us-market-2026-07`, `04-ru-cis-market` → `ru-cis-market-2026-07`, `24-marketplace-demand` → `marketplace-demand-2026-07-28`, `40-cis-demand` → `cis-demand-2026-07-29`, `12b-agency-targets-fast` → `agency-targets-us-2026-07`, `10-offer-prototypes` → `offer-prototypes-2026-07`, `07-unit-economics` → `unit-economics-2026-07`, `research.csv` → `agencies-dataset-233-2026-04.csv`, `action/30-cohort-slot-ledger.csv` → `cohort-slot-ledger-2026-07.csv`, `action/40-cis-candidate-ledger.csv` → `cis-candidate-ledger-2026-07.csv`.

Not imported (left in place, referenced only):

- `~/Desktop/reprojects/kora-v2/docs/Сем/` - the full board/decision system (~70 files) is a Kora-branded program; only the market research core that feeds Dali was taken.
- `~/Desktop/projects/dali-seo-workspace/` - live SEO tooling workspace (python data sources, orchestrator, drafts pipeline); only finished reports and platform research were taken.
- `~/Desktop/reprojects/finding-niche/` - lead-hunting pipeline (leads CSVs, outreach tracker); operational tooling, not research.
