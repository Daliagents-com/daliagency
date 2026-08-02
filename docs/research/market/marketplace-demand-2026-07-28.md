# Marketplace demand update

<research-contract>

Question: what paid work do buyers currently describe on Upwork and FL.ru, which pains repeat, and which rows are commercially actionable for David and Kora.

Capture date: 2026-07-28.

Unit of analysis: one public buyer-authored job card.

Upwork scope: 30 cards from the logged-in `Best Matches` feed plus 70 deduplicated cards from the focused `AI agent automation` search.

FL.ru scope: 58 cards visible across the two pages of the AI category.

The two feeds are convenience samples.

They prove that particular buyers published particular requests.

They do not prove market size, product-market fit, selection, payment, repeatability, or retention.

</research-contract>

## Durable artifacts

- [Combined marketplace workbook](../upwork-marketplace/data/marketplace-158-cards-2026-07-28.xlsx) contains all 158 cards, a unified category taxonomy, descending overall match for David, match bands, short briefs, why-fit notes, risks and source URLs.
- [Upwork workbook](../upwork-marketplace/data/upwork-100-cards-2026-07-28.xlsx) contains all 100 cards, Russian briefs, categories, technical match, risks, source URLs, evidence text, and summary tables.
- [FL.ru corpus](./fl-ru-ai-corpus-2026-07-28.csv) contains all 58 visible cards, short Russian briefs, category, availability status, response count, technical match, and source URL.

No card received 100 percent in the combined overall-match catalog.

The combined maximum is 95 percent because every card retains at least one material technical, commercial, scope, proof or competition gap.

The combined workbook's `Метч для Давида` is an editorial overall-fit score that combines technical overlap, transferability to Kora, scope, proof, economics and competition gaps.

It is not a calibrated probability, and its ranges are more meaningful than one-point or two-point differences.

## Source ledger

| Source | Captured fact | Authority | Limitation |
| --- | --- | --- | --- |
| [Upwork Best Matches](https://www.upwork.com/nx/find-work/best-matches) | 30 cards captured from David's personalized feed | Primary for the visible buyer-authored text and card metadata | Personalized ranking is not portable market sampling |
| [Upwork job search](https://www.upwork.com/nx/search/jobs/) | 70 deduplicated cards captured from the focused `AI agent automation` search | Primary for the visible buyer-authored text and card metadata | Search ranking is not neutral market sampling |
| [Upwork proposal guide](https://support.upwork.com/hc/en-us/articles/211062998-How-to-submit-a-proposal-on-Upwork) | Proposals are submitted through the platform | Primary for route mechanics | A permitted route does not imply selection |
| [Upwork Connects guide](https://support.upwork.com/hc/en-us/articles/211062898-Understanding-and-using-Connects) | Connects cost USD 0.15 each and should be spent selectively | Primary for current platform rules | Connect requirements vary by job |
| [Upwork circumvention policy](https://support.upwork.com/hc/en-us/articles/360052511133-Circumvention-and-why-it-s-against-the-rules) | Relationships started on Upwork must remain on-platform unless the stated conversion process is followed | Primary for platform policy | The exact contract state must be checked at release time |
| [Upwork scam and red-flag guide](https://support.upwork.com/hc/en-us/articles/35088484250003-Recognize-red-flags-and-avoid-scams) | Requests for free work are a red flag and prohibited pattern | Primary for platform safety guidance | It does not establish whether a specific buyer is legitimate |
| [Upwork recurring weekly payment](https://support.upwork.com/hc/en-us/articles/45819532067219-How-to-set-up-a-recurring-weekly-payment-for-your-freelancer) | An hourly contract can include a recurring weekly payment | Primary for an on-platform retainer mechanism | It is not evidence that a buyer will accept a retainer |
| [FL.ru AI category](https://www.fl.ru/projects/category/ai-iskusstvenniy-intellekt/) | 58 visible cards across two category pages at capture time | Primary for the visible card text and status | Category placement includes vacancies, false positives, old rows, and media work |
| [FL.ru Safe Deal](https://www.fl.ru/promo/bezopasnaya-sdelka/) | FL.ru offers a platform-native protected payment route | Primary for route mechanics | It does not establish buyer quality or willingness to fund |
| [FL.ru safety guidance](https://www.fl.ru/takecare/) | FL.ru recommends keeping communication and payment on the platform | Primary for platform safety | The exact project state must be rechecked before response |

## Upwork facts

The corpus contains 100 unique job IDs.

Payment status is verified for 72 cards, unverified for 27 cards, and missing on one card.

The combined workbook's corrected overall-match distribution contains three Upwork cards at 95 percent, 16 at 90 percent or higher, and 38 at 80 percent or higher.

All three 95-percent Upwork rows already show `50+` proposals.

Overall match therefore ranks fit for David and Kora, but it is not a probability of winning.

| Category | Cards | Cards at 90 percent or higher | Interpretation |
| --- | ---: | ---: | --- |
| Workflow automation and integrations | 30 | 9 | Strongest repeated cluster and strongest Kora transfer |
| AI agents and orchestration | 25 | 4 | Strong mechanism fit, but many broad or senior scopes |
| AI product and full-stack | 12 | 1 | Often too broad for a first fixed pilot |
| Chatbots, support and CRM | 11 | 3 | Concrete business pain, but privacy and channel experience matter |
| RAG and knowledge systems | 6 | 0 | Useful adjacent wedge, with accuracy and domain-liability gates |
| Voice agents | 6 | 0 | Demand exists, but David's voice-stack proof is weak |
| Content and marketing automation | 6 | 0 | Usually service production, not Kora product demand |
| Generic, low-signal or off-core | 4 | 0 | Do not use for product inference |

## FL.ru facts

The current corpus contains 37 projects and 21 vacancies.

Six project rows are marked `Исполнитель определён`.

They are recorded as `assigned` or `non-live`, not as completed or successful.

The corpus contains 52 open cards, but many are vacancies, content production, false positives, or unsafe.

There are five rows at 90 percent technical match or higher.

Only four of those five rows remain open.

| Category | Cards | Interpretation |
| --- | ---: | --- |
| Vacancy or role | 20 | Useful for cash or employment, but not buyer demand for Kora |
| Content and media | 12 | Mostly images, video, songs, and production services |
| Business automation and CRM | 4 | Strongest RU buyer-pain cluster |
| AI product and full-stack | 4 | Usually broad scope |
| Automation and development | 3 | Adjacent implementation work |
| Claude and infrastructure | 4 | Useful cash bridge and founder-fit signal |
| AI agents and platforms | 2 | Strong technical overlap, one row already assigned |
| Other data, human-ops, adjacent, false-positive and risk categories | 9 | Downweight or exclude |

## Repeated buyer pains

<facts>

1. Buyers want AI added to systems they already use, especially CRM, email, Slack, Sheets, n8n, Make, Bitrix24 and Kommo.

2. Buyers ask for deterministic workflow actions, not only chat answers.

3. Production requests repeatedly include human approval, audit logs, retries, deduplication, escalation and scoped permissions.

4. A smaller but commercially useful cluster has an existing bot or workflow that is wrong, brittle or difficult to maintain.

5. FL.ru contains abundant AI-media work, but that demand is weak evidence for Kora because AI is mainly a production tool rather than the purchased business outcome.

</facts>

<inference>

The narrowest cross-market product thesis is a human-governed business-workflow agent.

Its input is an email, form, chat, document or CRM event.

It extracts and classifies the event, prepares or performs one allowed system update, creates the next action, requests approval when required, and leaves an audit trail.

The differentiator is controlled execution and reliability inside an existing stack.

The differentiator is not generic access to a model.

</inference>

## Overall match versus live win priority

The combined workbook stores a 0 to 100 editorial overall-fit score for David.

It combines overlap with David's demonstrated stack and Kora's reusable mechanisms with scope, proof, economics and competition gaps.

It still does not answer whether a listing is worth pursuing now because freshness, current platform state and release-specific gates remain separate.

The separate `win-priority` screen uses:

- 30 points for overall match.
- 25 points for proposal competition.
- 20 points for verified payment, client spend and rating.
- 15 points for visible economics.
- 10 points for freshness.

The score is a prioritization heuristic, not a calibrated probability.

Every high-scoring row must still pass hard gates for geography, truthful portfolio proof, scope-budget consistency, privacy, regulation, platform policy and current availability.

Examples from the 100-card corpus:

| Upwork row | Win priority | Match | Gate outcome | Reason |
| ---: | ---: | ---: | --- | --- |
| 30 | 80.0 | 80 | Hold | Fresh, verified and only 5 to 10 proposals, but USD 100 is inconsistent with the requested full production platform and public portfolio proof is required |
| 44 | 76.0 | 70 | Kill | Explicit Bulgaria location requirement plus healthcare data and 30+ hours per week |
| 45 | 71.0 | 80 | Kill | Clear specification, but USD 750 for as much as 120 hours is not viable |
| 59 | 67.0 | 90 | Candidate | Strong retail automation fit and credible client, but 50+ proposals and broad scope |
| 61 | 65.5 | 95 | Candidate | Best direct Kora mechanism overlap, credible client, but older and 50+ proposals |
| 10 | 64.5 | 95 | Candidate | Very fresh CRM follow-up workflow and strong client history, but already 50+ proposals |
| 26 | 64.0 | 80 | Candidate | Urgent bounded repair, verified client and 20 to 50 proposals, but Make and WhatsApp proof is missing |

## Current cross-market shortlist

| Route | Source | Overall match | Why it matters | Main blocker |
| --- | --- | ---: | --- | --- |
| Upwork | [Wrong-answer WhatsApp bot, row 26](https://www.upwork.com/jobs/WhatsApp-bot-giving-wrong-answers-need-small-fix_~022081981698283788279/) | 80 | Small urgent repair can validate the reliability wedge | No proven Make or WhatsApp case and no visible rate |
| Upwork | [AI Agent / CRM System Setup, row 10](https://www.upwork.com/jobs/Agent-CRM-System-Setup_~022082094672185738150/) | 95 | Exact follow-up, CRM, draft, dedupe and human-action workflow | 50+ proposals |
| Upwork | [Agentic AI Automation Engineer, row 61](https://www.upwork.com/jobs/Agentic-Automation-Engineer_~022079500683280398086/) | 95 | Direct intake, CRM, follow-up, RAG, logs, retries and guardrails | 50+ proposals and lower freshness |
| FL.ru | [Customer correspondence agent, 5515592](https://www.fl.ru/projects/5515592/vnedrenie-ii-agenta-dlya-avtomatizatsii-perepisok-s-klientami.html) | 95 | Fresh RU request around Bitrix24 and customer communication | 26 responses, unknown budget and privacy scope |
| FL.ru | [GPT and Bitrix for logistics, 5514909](https://www.fl.ru/projects/5514909/integratsiya-gpt-i-bitriks-dlya-mejdunarodnoy-logistiki-.html) | 93 | Direct Bitrix24, n8n and business-ops fit | 45 responses and broad scope |
| FL.ru | [Kommo messaging assistant, 5515230](https://www.fl.ru/projects/5515230/podklyuchit-ii-asisstenta-dlya-prepiski-i-otpravki-fotografiy-v-chate.html) | 90 | Narrow chat and CRM pain | Consent, media access and 24 responses |
| FL.ru | [Commercial proposals from templates, 5514469](https://www.fl.ru/projects/5514469/pomosch-v-nastroyke-claude.html) | 88 | Bounded document and calculation workflow with a visible business outcome | Unknown budget and correctness requirements |

## Platform constraint on David's proposed offer

The proposed sequence `two weeks free, then discounted off-platform subscription` is not suitable for Upwork.

Free work requests are a platform red flag.

An ongoing relationship started on Upwork must remain on-platform unless the platform's conversion process is followed.

The compliant version is a funded, bounded paid milestone followed by an on-platform recurring weekly payment or another supported contract structure.

The FL.ru version should remain in platform chat and use Safe Deal.

## What this research proves

- There is repeated buyer-authored demand for controlled AI automation inside existing business systems.
- David has strong technical overlap with a meaningful subset.
- Upwork currently has more detailed buyer problems and stronger payment-history signals than FL.ru.
- FL.ru has several direct RU business-automation requests, but the surface contains more vacancies, content production and weak budgets.

## What this research does not prove

- No row proves product-market fit for Kora.
- No match score proves David will win.
- No listing, proposal or freelance payment counts as a Kora customer by itself.
- No marketplace sample proves a recurring subscription.
- No current row proves a path to ten customers without live proposal, reply, funded-work and renewal data.

## Research decision

Stop broad scanning for now.

Use the saved corpora to run a small, ledgered acquisition experiment.

The first experiment must test one urgent existing-workflow repair and one fresh CRM or operations build while keeping Upwork and FL.ru cohorts separate.

Recheck every selected row immediately before any external action.
