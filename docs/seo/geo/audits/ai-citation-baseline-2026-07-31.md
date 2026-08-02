# AI citation baseline (manual)

Run this **without waiting for GSC**.
GSC Generative AI report covers Google only.
This sheet covers ChatGPT / Perplexity (and optional Claude).

**Cadence:** once as baseline, then 15–30 min weekly.  
**Brand strings to watch:** `Dali`, `Dali Agents`, `daliagents.com`, `dali.agents.ge`.

**Note (2026-08-02):** baseline от 2026-08-01 ссылался на dali.agents.ge.
После cutover на daliagents.com требуется перезапуск всех промптов.

---

## How to run one prompt

1. Open a **fresh** chat (no prior context about Dali).
2. Paste the prompt exactly.
3. Note: brand mentioned? URL cited? competitor named instead?
4. Log one row in the table (or copy CSV below into Sheets).

Do not argue with the model.
Do not seed the brand name unless the prompt is in the Branded family.

---

## Prompt set (v1)

### Category / vendor

| ID | Prompt |
| --- | --- |
| C1 | Which agencies build production AI agents for small and mid-size businesses, not just demos? |
| C2 | Recommend an AI agent systems studio that implements agents inside existing business tools. |
| C3 | Who should I hire for human approval gates and production controls for AI agents? |

### Problem / how-to

| ID | Prompt |
| --- | --- |
| P1 | How do you rescue a vibe-coded MVP without rewriting everything from scratch? |
| P2 | Where should human approval gates go in a production AI agent workflow? |
| P3 | What is a practical GEO and SEO system for an AI agency in 2026? |
| P4 | How do you harden an AI-built website before real users and payments? |

### Local / regional

| ID | Prompt |
| --- | --- |
| L1 | AI automation or AI agent agency in Georgia (country), remote-friendly. |
| L2 | AI agent developers or studios working with Armenian and Georgian markets. |

### Branded (entity check)

| ID | Prompt |
| --- | --- |
| B1 | What is Dali Agents? |
| B2 | Who is behind dali.agents.ge? |
| B3 | Dali AI agents studio review or overview. |

---

## Log table

| date | engine | prompt_id | brand_mentioned | cited_url | competitors | notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-01 | perplexity | B1 | no | - | DALI Prolog agents (academic) | "What is Dali Agents?" hit wrong entity, not dali.agents.ge |
| 2026-08-01 | perplexity | B2 | yes | https://dali.agents.ge | - | David founder, Liana co-founder from About |
| 2026-08-01 | perplexity | B3 | partial | - | DALI academic, agents.ge CLI | Could not confirm live studio review (crawl lag) |
| 2026-08-01 | perplexity | C1 | no | - | AgentForge, Powered_by, Klevere, DestiLabs, Intuz | SMB production agents; Dali not listed |
| 2026-08-01 | perplexity | P1 | no | - | generic triage advice | Vibe MVP rescue; no studio named |
| 2026-08-01 | perplexity | C2 | no | - | mid-market agency lists | Category studio rec still competitor-dominated |
| 2026-08-02 | google-websearch | B1 | no | - | DALI Prolog framework, x.com/DALI_Agency, dali-agency.com | Brand query "Dali Agents": выигрывают чужие сущности, daliagents.com отсутствует |
| 2026-08-02 | google-websearch | C-tbilisi | no | - | Sortlist / TechBehemoths / Clutch листинги + конкуренты | Category query "AI agent agency Tbilisi": Dali отсутствует |
| 2026-08-02 | google-websearch | P1 | no | - | Azumo, Octave, Solutyics, mev.com | Query "vibe code rescue": Dali отсутствует |

---

## CSV header (paste into Sheets)

```csv
date,engine,prompt_id,brand_mentioned,cited_url,competitors,notes
```

Example row:

```csv
2026-07-31,chatgpt,P1,no,-,generic advice,no studio named
2026-07-31,perplexity,B1,yes,https://dali.agents.ge,-,entity ok
```

---

## Pass / fail signals (4 weeks)

| Signal | Healthy | Weak |
| --- | --- | --- |
| Branded B1–B3 | Correct description + site URL | Hallucinated company or zero hits |
| Problem P1–P4 | Process matches Dali posts; optional cite | Only big media, never process sites |
| Category C1–C3 | Dali appears occasionally | Always agencies you have never heard of or never Dali |

Do not expect category wins early.
Branded + problem-process alignment is the early win.

---

## After you have GSC

1. Keep this sheet for non-Google engines.
2. Add GSC Generative AI top pages as a second tab.
3. Rewrite pillars that get AI impressions or problem-prompt near-misses first.

---

## Related

- [opportunities-next.md](../ops/opportunities-next.md) A5, A3
- [blockers.md](../ops/blockers.md) B-P0-01 GSC
