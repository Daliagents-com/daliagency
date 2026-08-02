# Dali marketplace funnel strategy

<info>

Date: 2026-07-29.

Research target: turn repeated pains from 158 Upwork and FL.ru listings into a small set of honest productized-service funnels.

Stable listing key: marketplace listing ID and canonical listing URL.

Primary local source: `docs/Сем/marketplace-report.html`.

Source snapshot date: 2026-07-28.

</info>

## Decision

<decision>

Build the pages under Dali, not Kora and not separate one-off domains.

Use Kora only as relevant product and engineering evidence where its current capabilities genuinely support the claim.

The public route family is:

- `https://dali.agents.ge/solutions/lead-response`
- `https://dali.agents.ge/solutions/client-inbox`
- `https://dali.agents.ge/solutions/operations-docs`
- `https://dali.agents.ge/solutions/knowledge-assistant`
- `https://dali.agents.ge/solutions/voice-agents`

The Upwork-safe route family is:

- `https://dali.agents.ge/for/upwork/lead-response`
- `https://dali.agents.ge/for/upwork/client-inbox`
- `https://dali.agents.ge/for/upwork/operations-docs`
- `https://dali.agents.ge/for/upwork/knowledge-assistant`
- `https://dali.agents.ge/for/upwork/voice-agents`

Upwork-safe routes must contain no email address, phone number, social link, Calendly link, Typeform link, or off-platform contact CTA.

Their only conversion instruction before a contract is to reply inside Upwork.

</decision>

## Why Dali

<comparison>

| Criterion | Kora page | Dali service page | Separate landing/domain |
| --- | ---: | ---: | ---: |
| Brand matches a done-for-you service | 2/5 | 5/5 | 3/5 |
| Existing agency trust and founder context | 2/5 | 5/5 | 1/5 |
| Product credibility | 4/5 | 4/5 through linked proof | 2/5 |
| Message match for marketplace buyers | 3/5 | 5/5 | 5/5 |
| One maintainable design and content system | 4/5 | 5/5 | 1/5 |
| SEO and internal discoverability | 4/5 | 5/5 | 2/5 |
| Honest fit with a product built after the first sale | 2/5 | 5/5 | 4/5 |
| Weighted verdict | Reject as primary container | Choose | Reject |

Dali is already presented as an agency that turns ideas into working digital systems and lists Automation as a service.

The current Dali source also contains an AI-first homepage, a workflow-audit entry point, founder context, and production project pages.

Kora is a Telegram-first agent platform.

Putting every service funnel under Kora would make a service pilot look like an already finished SaaS feature and would blur Kora's product positioning.

Separate domains would improve message isolation but would throw away Dali's trust, create maintenance drift, and look like disposable lead-capture pages.

</comparison>

## Category reduction

<criteria>

A standalone landing needs all of the following:

1. At least four listings with the same primary buyer outcome rather than merely the same technology.
2. At least two economically credible listings without an obvious bait budget.
3. A reusable first pilot with one input path, one decision path, one output system, and a human escalation boundary.
4. A hero promise that remains true for most listings in the group.
5. Delivery risk that can be described honestly before a product exists.

Weak rows are demand signals only.

They are never added to a group merely to increase its size.

</criteria>

<category-map>

| Report category | Rows | Decision | Destination |
| --- | ---: | --- | --- |
| Автоматизация процессов и интеграции | 33 | Keep selected outcomes | Lead Response, Client Inbox, or Operations & Documents |
| AI-агенты и оркестрация | 27 | Keep selected outcomes | Lead Response, Client Inbox, Operations & Documents, or Knowledge |
| Вакансии и роли | 20 | Reject | Staff augmentation is not a packaged outcome |
| Контент и медиа | 18 | Reject standalone | Fragmented and highly commoditized |
| AI-продукты и full-stack | 16 | Use only a narrow wedge | Lead Response, not a broad platform promise |
| Чат-боты, поддержка и CRM | 15 | Split by buyer outcome | Client Inbox for support, Lead Response for qualification |
| Голос и мультимедиа | 6 | Keep as research hypothesis | Voice design-partner page, not first wave |
| Общие, слабые или off-core | 6 | Reject | No reusable buyer outcome |
| RAG и базы знаний | 6 | Keep | Internal Knowledge Assistant |
| Инфраструктура и Claude | 3 | Reject standalone | Bridge service only |
| Риск / исключить | 3 | Reject | Economic or delivery risk |
| Документы и данные | 2 | Merge with workflow evidence | Operations & Documents |
| Данные и computer vision | 1 | Reject | Singleton |
| Смежное | 1 | Reject | Singleton |
| Человеческие операции | 1 | Reject | Not an AI productized-service cluster |

</category-map>

Four launch funnels pass the repeatability and economics gate: Lead Response, Client Inbox, Operations & Documents, and Internal Knowledge Assistant.

Voice does not yet pass the economic gate.

Its page is retained only as a design-partner research asset, and both surviving credible rows remain on hold until the stronger funnels produce objection data.

<challenge-audit>

An independent second pass over all 158 rows found no sixth launch group that meets the four-listing, shared-outcome, fixed-boundary, and economic-credibility gate.

The strongest rejected candidate was Content & Media, but its apparent cluster splits into SEO or social automation and one-off visual production.

Representative content rows are `Upwork:~022081456862377359533`, `Upwork:~022080323727208301309`, `Upwork:~022082093802059809533`, `FL.ru:5509060`, and `FL.ru:5514642`.

They do not share one acceptance test, one operating owner, or one repeatable pilot boundary.

The broad AI-product and orchestration rows remain inputs to a narrow wedge, not standalone funnels, because they describe platforms or implementation technology rather than one buyer outcome.

</challenge-audit>

<report-wide-signals>

The source report contains 158 unique listings: 100 from Upwork and 58 from FL.ru.

Only 32 listings, or 20.3%, survive the pain-repeatability and delivery-boundary screen.

The score distribution across the full report is:

- 4 listings at 95-99%.
- 17 listings at 90-94%.
- 28 listings at 80-89%.
- 34 listings at 70-79%.
- 75 listings below 70%.

The selected set contains all 4 listings at 95-99%, 11 of the 17 listings at 90-94%, 8 listings at 80-89%, 6 listings at 70-79%, and 3 listings below 70%.

The three selected rows below 70% are not launch evidence.

They are one underspecified Client Inbox hold and the two Voice design-partner holds.

Selection is concentrated where the buyer outcome repeats:

| Source-report category | Selected / total | Selection rate | Interpretation |
| --- | ---: | ---: | --- |
| Чат-боты, поддержка и CRM | 10 / 15 | 66.7% | Strong repeated customer-response pain |
| RAG и базы знаний | 4 / 6 | 66.7% | Small but coherent cited-answer problem |
| Документы и данные | 1 / 2 | 50.0% | Useful only when merged into Operations |
| Автоматизация процессов и интеграции | 11 / 33 | 33.3% | Broad source category that must be split by outcome |
| Голос и мультимедиа | 2 / 6 | 33.3% | Demand signal without launch economics |
| AI-продукты и full-stack | 2 / 16 | 12.5% | Mostly too broad for a first fixed pilot |
| AI-агенты и оркестрация | 2 / 27 | 7.4% | Technology label is not a reusable offer |
| Вакансии и роли | 0 / 20 | 0% | Staff augmentation, not a productized pain |
| Контент и медиа | 0 / 18 | 0% | Fragmented, price-sensitive, and weakly reusable |

Competition is structurally high.

Of the 27 selected Upwork rows, 20 already show 50+ proposals and 7 show 20-50 proposals.

No selected Upwork row has low visible competition.

The landing page therefore cannot compensate for a generic proposal.

The first two lines must still mirror the exact job, while the page earns trust by making the pilot boundary, controls, and pass condition concrete.

</report-wide-signals>

## Funnel architecture

<flow>

```text
MARKETPLACE JOB
      |
      | pain-matched first 2 lines
      v
SHORT PROPOSAL
      |
      | one category-specific proof link
      v
LANDING PAGE
      |
      | outcome -> workflow -> guardrails -> pilot boundary
      v
REPLY ON MARKETPLACE
      |
      | scope, data, access, acceptance test
      v
PAID PILOT
      |
      | replay real cases and measure exceptions
      v
PRODUCTION BUILD
      |
      +-> monitoring / iteration / expansion
```

The proposal does not try to close the whole project.

Its job is to earn the click by naming the buyer's exact pain.

The landing does not pretend the final product already exists.

Its job is to show that the workflow, risk boundary, and pilot have already been packaged.

The first marketplace reply is the conversion event.

The paid pilot is the first sale.

The reusable product is built only after the buyer accepts the pilot.

The post-reply qualification, blueprint, pilot-close, objection, and follow-up scripts are in `docs/research/market/dali-marketplace-sales-playbook-2026-07-29.md`.

</flow>

## Page 1: Lead Response

<offer id="lead-response">

Priority: 1.

Primary buyer outcome: every inbound lead gets an immediate, relevant first response, qualification, CRM update, follow-up, booking path, and human handoff.

Public hero:

> Stop losing qualified leads between the first message and the CRM.

Public subhead:

> Dali packages one inbound workflow into a supervised AI system that responds, qualifies, updates the pipeline, books the next step, and routes exceptions to a person.

Honest offer label:

> Packaged lead-response pilot.

Do not write:

> We already built your complete AI sales employee.

Pilot boundary:

- One or two inbound channels.
- One CRM.
- One qualification policy.
- One booking or follow-up route.
- One human escalation queue.
- Deduplication, do-not-contact logic, logs, and approval for sensitive actions.

Success measures:

- Median first-response time.
- Share of leads with complete CRM fields.
- Qualified-to-booked conversion.
- Follow-ups completed on schedule.
- Human escalation rate and reasons.

Acceptance-test template:

> Replay 20 representative inbound conversations.
> Require 100% event logging, 0 duplicate CRM writes, at least 90% completeness on required CRM fields, and mandatory human review for every low-confidence or sensitive case.

Core listing evidence:

- `Upwork:~022079500683280398086`
- `Upwork:~022082094672185738150`
- `Upwork:~022081957032774069874`
- `Upwork:~022071869598491167955`
- `Upwork:~022076935615291863294`
- `Upwork:~022080272851686168921`
- `Upwork:~022080037748505517610`
- `Upwork:~022082076899341845245`
- `Upwork:~022082059740997677549`
- `Upwork:~022082023362208208284`

Upwork message:

> Your bottleneck is not another chatbot.
> It is the gap between an inbound message, a qualified next step, and a clean CRM record.
> I have packaged that exact flow as a supervised pilot: one or two intake channels, qualification rules, CRM updates, booking or follow-up, and human escalation with logs.
> The workflow and pilot boundary are here: https://dali.agents.ge/for/upwork/lead-response
> If this matches your intended first milestone, reply here on Upwork with the CRM and primary intake channel and I will map the acceptance test before we build.

Russian marketplace variant:

> В вашем запросе главная проблема не в самом чат-боте, а в разрыве между входящим сообщением, квалификацией клиента, следующим действием менеджера и корректной записью в CRM.
> Мы упаковали этот сценарий в узкий пилот: 1-2 канала, правила квалификации, CRM, follow-up или запись и обязательная передача сложных случаев человеку.
> Схема и границы пилота: https://dali.agents.ge/solutions/lead-response
> Если это совпадает с вашей задачей, пришлите название CRM и основной канал обращений.
> Я предложу первый проверяемый milestone без попытки сразу автоматизировать весь отдел.

Real-estate variant:

> I would scope the first release to inquiry intake, property or tenant context, qualification, booking, and a human review queue.
> Housing-sensitive decisions remain human-reviewed, and the agent only prepares or routes the next action.

</offer>

## Page 2: Client Inbox

<offer id="client-inbox">

Priority: 2.

Primary buyer outcome: answer recurring customer conversations in the approved tone, use the right context, log the result in CRM, and route sensitive requests to a person.

Public hero:

> Turn the shared inbox into one controlled customer-response workflow.

Public subhead:

> Dali packages one support path across chat or email with grounded replies, approved actions, CRM history, file handling, and human escalation.

Honest offer label:

> Packaged client-inbox pilot.

Do not write:

> Our finished support agent can replace your team.

Pilot boundary:

- One customer channel or tightly related channel pair.
- One approved answer and action policy.
- One CRM or case-history destination.
- One knowledge or file source set.
- One human escalation queue.
- Logs, permissions, and approval for sensitive actions or media.

Success measures:

- Time to first useful response.
- Answer acceptance rate on replayed threads.
- CRM or case-history write success.
- Correct escalation rate by reason.
- Unsupported-answer and unauthorized-action count.

Acceptance-test template:

> Replay 20 representative customer threads with files and edge cases.
> Require 100% logging, 0 unauthorized actions, at least 90% correct routing, and human review whenever the approved source set cannot support the reply.

Core listing evidence:

- `Upwork:~022069443845701876220`
- `FL.ru:5515592`
- `FL.ru:5514909`
- `FL.ru:5513206`
- `FL.ru:5515230`
- `Upwork:~022081818297985759122`
- `Upwork:~022075920337694781992`

Upwork message:

> The hard part here is not adding another chat interface.
> It is keeping one customer-response path grounded in approved knowledge, logging the outcome in CRM, and stopping sensitive actions for review.
> I have packaged that exact boundary as a one-channel client-inbox pilot: https://dali.agents.ge/for/upwork/client-inbox
> Reply here on Upwork with the primary channel, CRM, and one representative thread.
> I will turn those into the replay set and pass/fail criteria before implementation.

FL.ru message:

> В этой задаче важно не просто отвечать в чате, а соблюдать тон, использовать правильный контекст, сохранять историю в CRM и передавать сложные действия человеку.
> Первый пилот я бы ограничил одним каналом, одним набором правил, одной CRM и очередью подтверждения для файлов, медиа и чувствительных действий.
> Схема и границы пилота: https://dali.agents.ge/ru/solutions/client-inbox
> Пришлите один типичный диалог, название CRM и список действий, которые всегда должен подтверждать человек.
> В ответ я зафиксирую первый acceptance test.

</offer>

## Page 3: Operations & Documents

<offer id="operations-docs">

Priority: 3.

Primary buyer outcome: turn emails, PDFs, forms, screenshots, and spreadsheets into validated records, routed tasks, approvals, and system updates.

Public hero:

> Turn operational documents into checked actions, not another inbox backlog.

Public subhead:

> Dali packages one intake-to-system workflow with extraction, validation, deduplication, approval, retries, and an audit trail.

Honest offer label:

> Packaged operations workflow pilot.

Pilot boundary:

- One intake source.
- One extraction schema.
- One destination system.
- One approval rule.
- One exception queue.
- Idempotency, retries, deduplication, and an audit trail.

Success measures:

- Percentage of inputs parsed without correction.
- Exception rate by reason.
- Duplicate action rate.
- Time from intake to approved system update.
- Hours of manual checking removed.

Acceptance-test template:

> Replay 20 representative inputs against the agreed schema.
> Require 0 silent duplicates, 100% audit logging, at least 90% completeness on required fields, and an exception record for every missing, conflicting, or low-confidence value.

Core listing evidence:

- `Upwork:~022079631969043129867`
- `Upwork:~022073883528374083136`
- `Upwork:~022081965076177154541`
- `Upwork:~022081598123554232311`
- `Upwork:~022081838181027419548`
- `Upwork:~022072326457921207805`
- `Upwork:~022082121535485723389`
- `FL.ru:5514469`

Upwork message:

> I would not start by automating every operation in the brief.
> I would first prove one auditable path from an email, PDF, form, or spreadsheet to a validated record and downstream action.
> The packaged pilot includes extraction, schema validation, deduplication, approval, retries, and an exception queue: https://dali.agents.ge/for/upwork/operations-docs
> Reply here on Upwork with one representative input and the target system.
> I will turn those into a narrow acceptance test for the first milestone.

FL.ru message:

> Здесь важно не просто извлечь данные, а надежно довести документ до корректного действия в вашей системе.
> Я бы начал с одного сквозного маршрута: входящий файл или письмо, схема извлечения, проверка, подтверждение человеком, запись в CRM/ERP/таблицу и журнал ошибок.
> Границы такого пилота: https://dali.agents.ge/ru/solutions/operations-docs
> Пришлите один типичный входной документ и укажите конечную систему.
> В ответ я зафиксирую acceptance test первого этапа.

</offer>

## Page 4: Internal Knowledge Assistant

<offer id="knowledge-assistant">

Priority: 4.

Primary buyer outcome: answer from internal sources with citations, access control, refusal behavior, and observable retrieval.

Public hero:

> Give the team answers it can verify.

Public subhead:

> Dali packages one permission-aware knowledge workflow across the documents and tools the team already trusts, with citations and a clear refusal path when evidence is weak.

Honest offer label:

> Grounded knowledge-assistant pilot.

Pilot boundary:

- One team or source bundle.
- One permission model.
- One answer surface.
- Citations for every factual response.
- Refusal behavior when evidence is missing.
- Retrieval logs and a review set of real questions.

Success measures:

- Citation coverage.
- Grounded-answer acceptance rate.
- Refusal precision.
- Permission violations.
- Retrieval latency.
- Time saved on repeated internal questions.

Acceptance-test template:

> Evaluate 30 real questions against the approved source set.
> Require a citation or explicit refusal for every factual answer, 0 permission violations, and at least 90% reviewer acceptance on questions that the source set can answer.

Core listing evidence:

- `Upwork:~022075311922210730379`
- `Upwork:~022082116475484824757`
- `Upwork:~022079236014340896590`
- `Upwork:~022081833254755580077`
- `Upwork:~022081922819151747063`

Upwork message:

> The hard part of this project is not producing an answer.
> It is proving which source supports it, respecting access, and refusing cleanly when the evidence is weak.
> I package the first release around one source bundle or one team, with citations, permission checks, a real-question evaluation set, and retrieval logs: https://dali.agents.ge/for/upwork/knowledge-assistant
> If that matches your first milestone, reply here on Upwork with the initial source set and the users who should have access.

FL.ru message:

> Для такого ассистента критично не просто отвечать по документам, а показывать источник, учитывать права доступа и отказываться от ответа, если подтверждения нет.
> Первый пилот я бы ограничил одной базой материалов или одной командой и проверил на наборе реальных вопросов.
> Структура пилота: https://dali.agents.ge/solutions/knowledge-assistant
> Пришлите список первых источников и роли пользователей.
> Я предложу схему доступа и проверяемые критерии качества.

</offer>

## Page 5: Voice Agents

<offer id="voice-agents">

Priority: 5.

Primary buyer outcome: qualify one type of call, complete one next action, and transfer hard cases without losing context.

The local source report shows repeated demand, but only two Voice rows survive the credibility screen and both remain on hold, so its marketplace evidence is weaker than the four launch funnels.

The page is a design-partner research funnel, not a claim of an existing production case and not part of the first outreach wave.

Public hero:

> Turn one repeatable call flow into a supervised voice agent.

Public subhead:

> Dali packages one inbound or outbound call path with qualification, booking, CRM notes, transcripts, latency testing, and a context-rich handoff to a person.

Honest offer label:

> Voice-agent design-partner pilot.

Pilot boundary:

- One call type.
- One language.
- One telephony provider.
- One CRM.
- One calendar or next action.
- One transfer path.
- Transcripts, summaries, latency checks, and failure routing.

Success measures:

- Call completion rate.
- Booking or qualified-handoff rate.
- Transfer success.
- Median response latency.
- Interruption recovery.
- Transcript and CRM-note accuracy.

Acceptance-test template:

> Rehearse 30 scripted and unscripted calls.
> Require explicit automation disclosure, 100% summary logging, 0 unauthorized actions, at least 90% correct routing on the approved call lane, and successful transfer or callback capture for every out-of-scope request.

Core listing evidence:

- `Upwork:~022082043668763252124`
- `Upwork:~022080259272497837564`

Upwork message:

> I would begin with one call flow, not a general-purpose voice employee.
> The first pilot covers one call type, one language, telephony, CRM or calendar action, transcripts, latency testing, and a context-rich transfer to a person.
> The exact boundary is here: https://dali.agents.ge/for/upwork/voice-agents
> Reply here on Upwork with a representative call script and the required final action.
> I will turn them into the first test matrix before implementation.

FL.ru message:

> Я бы не начинал с универсального голосового сотрудника.
> Надежнее сначала закрыть один повторяемый звонок: сценарий, квалификация, запись или CRM-действие, транскрипт и передача человеку со всем контекстом.
> Границы design-partner пилота: https://dali.agents.ge/solutions/voice-agents
> Пришлите пример разговора и укажите, чем должен завершаться успешный звонок.
> Я предложу первый тестовый сценарий и точки обязательной эскалации.

</offer>

## Landing-page rules

<rules>

1. Mirror the buyer's outcome in the first screen.
2. Describe the status quo cost without invented statistics.
3. Show the workflow before listing technology.
4. Put the pilot boundary before the long feature list.
5. Show guardrails, approvals, logs, and exception handling as product features.
6. Use existing shipped products only as capability proof.
7. Never describe an unbuilt category product as a finished client case.
8. Use one primary CTA per channel.
9. Keep the Upwork CTA on Upwork.
10. Keep mobile paragraphs short and make the workflow readable without hover.
11. Avoid stock AI imagery, purple gradients, robot heads, and fake dashboards.
12. Prefer operational diagrams, concrete inputs, decisions, outputs, and ownership.

</rules>

<cta-implementation>

Public AI solution pages use a category-specific prefilled email brief as the primary action.

A local copy button is the fallback for visitors without a configured desktop email client.

The previously linked Typeform was removed from every AI route, the homepage, navigation, and footer after a live funnel audit showed that it was still branded as a design sprint, asked for design-service categories, and ended with legacy Peakshift links.

That Typeform remains only on the historical design-sprint page where its questions match the offer.

The Upwork-safe mirrors expose neither path.

Their only action is an on-page checklist that tells the prospect what to reply inside the Upwork thread.

</cta-implementation>

## Offer ladder

<offer-ladder>

```text
1. PAIN-MATCHED PAGE
      |
2. SCOPING REPLY
      |
3. PAID WORKFLOW BLUEPRINT
      |
4. ONE-FLOW PILOT
      |
5. PRODUCTION HARDENING
      |
6. MONITORING AND ITERATION
      |
7. SECOND WORKFLOW / RETAINER
```

The page should sell the one-flow pilot.

The workflow blueprint may be included in the first milestone or sold separately when source quality and access are unclear.

Production hardening includes observability, retries, approvals, evaluation data, and operational ownership.

Broader agent platforms, multi-agent orchestration, voice expansion, analytics, and additional departments are upsells after one flow works.

</offer-ladder>

## Internal quote hypothesis

<pricing-hypothesis>

Do not publish a universal price on the landing pages before the first response data exists.

The source listings vary too widely in access, data quality, number of integrations, and approval risk for one public price to remain honest.

Use these as internal anchors for the first scoping reply:

| Offer | Initial quote hypothesis | What must fit inside |
| --- | ---: | --- |
| Paid workflow blueprint | $300-$750 | One workflow map, access assumptions, replay set, acceptance test, and fixed pilot boundary |
| Lead Response pilot | $1,500-$3,500 | One intake cluster, one CRM or calendar path, one playbook, approval and logging |
| Client Inbox pilot | $1,500-$3,500 | One channel, one source set, one CRM history path, permitted actions and escalation |
| Operations & Documents pilot | $2,000-$5,000 | One input type, schema, destination, exception queue, retries, deduplication, and audit log |
| Knowledge Assistant pilot | $2,000-$5,000 | One source bundle, one audience, citations, refusal behavior, evaluation set, and logging |
| Voice design-partner pilot | Quote only after call-lane audit | One call type, disclosure, telephony, one next action, transfer, transcripts, and latency tests |

The 32 selected listings provide a noisy budget signal:

| Budget form | Rows | Observed signal |
| --- | ---: | --- |
| Explicit fixed price | 8 | Median $525, with a $200-$1,500 range |
| Numeric hourly range | 16 | Median lower bound $25/hour and median upper bound $42.50/hour |
| Hourly without a visible numeric band | 3 | Hourly intent without a defensible rate anchor |
| Negotiable or unspecified | 5 | No defensible price anchor |

The fixed-price and hourly medians use only rows with visible numeric amounts.

The category detail is uneven:

| Category | Explicit fixed-price median | Numeric hourly median band |
| --- | ---: | ---: |
| Lead Response | $525 across 4 rows | $25-$45 across 5 rows |
| Client Inbox | $1,500 across 1 row | $29.50-$60 across 2 rows |
| Operations & Documents | $300 across 1 row | $20-$40 across 4 rows |
| Knowledge Assistant | $1,000 across 2 rows | $25-$50 across 3 rows |
| Voice design partner | No fixed-price row | $22.50-$40 across 2 rows |

These listing values are buyer-posted anchors, not validated willingness to pay or reliable estimates of the implementation cost.

Several fixed-price listings describe scopes far larger than their stated amount, so Dali must not lower a safe pilot to match a placeholder budget.

When a visible fixed budget is below the pilot anchor, first determine whether it funds discovery, the first milestone, or the entire build.

Route a credible low-budget first phase to the paid blueprint, narrow the outcome without removing safeguards, or archive the opportunity.

Credit the blueprint fee toward the pilot when the buyer approves the build within the agreed quote window.

Quote broader integrations, additional channels, production hardening, and ongoing evaluation as separate milestones.

Track quote, scope, close reason, delivery hours, usage cost, and gross margin before changing these anchors.

</pricing-hypothesis>

## Platform policy

<policy>

Upwork allows outside systems for project scoping, but pre-contract communication must remain on Upwork and personal contact information must not be shared before a contract.

Upwork's portfolio guidance also says linked external sites cannot contain an email address, phone number, or other contact information.

Therefore the ordinary Dali page is not the link to place in an Upwork proposal.

Use only the dedicated `/for/upwork/` version.

The Upwork-safe version must hide the normal Dali navigation and footer because they contain external CTAs and contact information.

FL.ru's current official guidance says contact details can be exchanged in ordinary project, vacancy, and contest responses.

Its contact-sharing restriction applies to Typical Services listings and their order chats, which are not part of this selected set.

The Russian public pages can therefore remain the proof links for the selected FL.ru projects, while the outreach message still asks the buyer to reply inside the project first.

Sources:

- [How to share documents, files, and more on Upwork](https://support.upwork.com/hc/en-us/articles/360049608113-How-to-share-documents-files-and-more-on-Upwork)
- [Get to know each other before a contract](https://support.upwork.com/hc/en-us/articles/17995658941843--Get-to-know-each-other-before-a-contract)
- [How to enhance your freelancer profile](https://support.upwork.com/hc/en-us/articles/360016144974-How-to-enhance-your-freelancer-profile)
- [FL.ru marketplace and contact-sharing guidance](https://www.fl.ru/)

</policy>

## Market evidence

<sources>

Local sources:

- `docs/Сем/marketplace-report.html`, 158 marketplace listings.
- `/Users/dav/Desktop/reprojects/ai-agency-market-research/research.csv`, 233 researched agencies and products.
- `/Users/dav/Desktop/reprojects/ai-agency-market-research/reports/first-offer-strategy.md`, productized-offer comparison.
- `https://dali.agents.ge`, current Dali brand and service positioning.

Current primary product sources:

The category-specific pricing, packaging, metering, citation, handoff, and policy sources below were re-opened on 2026-07-30.

Vendor prices remain volatile and must be rechecked before they are used in a buyer quote.

- [n8n pricing](https://n8n.io/pricing/)
- [Zapier pricing](https://zapier.com/pricing)
- [Make pricing](https://www.make.com/en/pricing)
- [Intercom pricing](https://www.intercom.com/pricing)
- [Zendesk AI agents](https://www.zendesk.com/service/ai/ai-agents/)
- [Front pricing](https://front.com/pricing)
- [HubSpot AI](https://www.hubspot.com/products/artificial-intelligence)
- [Salesforce Agentforce pricing](https://www.salesforce.com/agentforce/pricing/)
- [Qualified AI SDR](https://www.qualified.com/ai-sdr)
- [Glean](https://www.glean.com/)
- [Slack enterprise search](https://slack.com/features/enterprise-search)
- [Notion pricing](https://www.notion.com/pricing)
- [Box AI Agents](https://www.box.com/agents)
- [Vapi pricing](https://vapi.ai/pricing)
- [Retell pricing](https://www.retellai.com/pricing)
- [OpenAI Realtime guide](https://developers.openai.com/api/docs/guides/realtime)

Category-specific validation:

| Offer | Official evidence | Observable packaging signal | Dali implication |
| --- | --- | --- | --- |
| Lead Response | [Intercom pricing](https://www.intercom.com/pricing), [HubSpot Sales pricing](https://www.hubspot.com/pricing/sales), [HubSpot lead-qualification actions](https://knowledge.hubspot.com/customer-agent/set-up-customer-agent-actions-to-qualify-leads) | Outcome or seat pricing around qualification, routing, and authorized actions | Sell first useful response, qualification, CRM state, and the next approved action, not an autonomous salesperson |
| Client Inbox | [Front pricing](https://front.com/pricing), [Zendesk pricing](https://www.zendesk.com/pricing/), [Gorgias pricing](https://www.gorgias.com/pricing), [Zendesk AI-agent model](https://support.zendesk.com/hc/en-us/articles/6970583409690-About-AI-agents) | Shared inboxes combine seat or resolution pricing with approved actions and escalation | Sell one controlled response path with source grounding, case history, file handling, and human takeover |
| Operations & Documents | [Power Automate](https://www.microsoft.com/en/power-platform/products/power-automate), [document processing in a flow](https://learn.microsoft.com/en-us/ai-builder/form-processing-model-in-flow), [Power Automate approvals](https://learn.microsoft.com/en-us/power-automate/modern-approvals), [UiPath document metering](https://docs.uipath.com/document-understanding/automation-cloud/latest/classic-user-guide/metering-charging-logic) | The product is the path from document intake to approved system action, while extraction is usage-metered infrastructure | Sell one input class, schema, destination, approval, retries, deduplication, and audit trail |
| Knowledge Assistant | [Microsoft 365 Copilot pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/enterprise), [Atlassian Rovo limits](https://support.atlassian.com/rovo/docs/rovo-usage-limits/), [Glean deep-linked citations](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/deep-linked-citations), [Notion AI security](https://www.notion.com/help/notion-ai-security-practices) | Enterprise knowledge products are workspace-bound, permission-aware, and citation-led | Sell verifiable answers, access control, refusal behavior, and source gaps rather than omniscient company search |
| Voice design partner | [Vapi pricing](https://vapi.ai/pricing), [Vapi handoff](https://docs.vapi.ai/squads/handoff), [Retell pricing](https://www.retellai.com/pricing), [Retell trust position](https://www.retellai.com/) | Usage is priced by minute and trust is demonstrated through transfer, handoff, disclosure, and compliance | Keep the route in research mode until one supervised call lane proves its routing, latency, summary, and transfer behavior |

One current pricing signal validates the decision to keep Lead Response and Client Inbox separate.

[Intercom's June 2026 outcome schedule](https://www.intercom.com/help/en/articles/8205718-fin-ai-agent-outcomes) lists a support resolution, procedure handoff, or disqualification at $0.99, while a successful sales qualification is $9.99.

That difference is not a Dali pricing benchmark.

It shows that the market assigns different units of value to support resolution and qualified pipeline even when both are delivered through the same AI-agent platform.

[Microsoft's current Power Automate meter](https://learn.microsoft.com/en-us/power-platform/admin/pay-as-you-go-meters) lists $0.60 for a premium cloud or attended flow run and $3.00 for an unattended or hosted RPA run.

[UiPath's Document Understanding meter](https://docs.uipath.com/document-understanding/automation-cloud/latest/user-guide/metering-and-charging-logic-unified-pricing) charges 0.2 Platform Units per page for digitization, extraction, and classification.

Those usage units support the Operations & Documents offer boundary.

Extraction and execution are metered infrastructure, while Dali's sellable value is the checked path through validation, deduplication, approval, exception handling, and the destination system.

[Retell's current voice pricing](https://www.retellai.com/pricing) publishes a $0.07-$0.31 per-minute range before optional components and enterprise terms.

That variable usage base reinforces the decision to hold Voice as a design-partner lane until call volume, routing, transfer behavior, and successful outcome economics are known.

Official risk-reduction proof:

| Offer | Official proof | What it validates for Dali |
| --- | --- | --- |
| Lead Response | [Intercom and AI21 Labs](https://www.intercom.com/customers/ai21-labs), [Intercom security and compliance documents](https://www.intercom.com/help/en/articles/7053674-accessing-security-and-compliance-documents) | The case supports fast automated first response plus escalation, while the trust center shows that security evidence is part of an enterprise buying decision; its customer metrics are evidence, not a universal Dali promise |
| Client Inbox | [Front and MongoDB](https://front.com/customer-stories/mongodb), [Front security](https://front.com/security) | Duplicate replies and unclear ownership are documented pains, and auditability plus secure handling reduce purchase risk |
| Operations & Documents | [Power Automate approvals](https://learn.microsoft.com/en-us/power-automate/get-started-approvals), [Microsoft and Zurich Insurance Group](https://www.microsoft.com/en/customers/story/1792347226516734147-zurich-insurance-group-power-apps-insurance-en-switzerland) | Human decisions, approval trails, and explicit multi-system stages are part of the product rather than implementation details |
| Knowledge Assistant | [Microsoft Copilot grounding and citations](https://support.microsoft.com/en-us/microsoft-365-copilot/what-information-does-copilot-use-to-answer-my-prompt), [Microsoft and Cancer Council NSW](https://www.microsoft.com/en/customers/story/26834-cancer-council-nsw-sharepoint) | Buyers expect trusted source scope, citations they can inspect, and answers that respect the work-data boundary |
| Voice design partner | [Vapi trust positioning](https://vapi.ai/), [Vapi handoff controls](https://docs.vapi.ai/squads/handoff) | A serious voice evaluation needs contract-specific compliance claims, controlled context transfer, spoken handoff behavior, and a human destination |

Observed market pattern:

- Incumbents sell a specific outcome, channel, or team function rather than a broad claim to build anything with AI.
- Sales offers converge on qualification, CRM sync, booking, and follow-up.
- Support offers converge on grounded answers, case history, permitted actions, and human handoff.
- Operations offers converge on executions, logs, retries, approvals, and auditability.
- Knowledge offers converge on permissions, citations, grounded answers, and enterprise trust.
- Voice offers converge on latency, call completion, booking, transfer, transcripts, and per-minute economics.

</sources>

## Unknowns and tests

<unknowns>

Marketplace listings prove repeated requests, not conversion.

Public competitor packaging proves category language, not Dali's price elasticity.

No page should claim a conversion lift before Dali has measured it.

The first validation set is a presale learning wave:

1. Send each page only to matching listings.
2. Track proposal view, page view, reply, interview, funded blueprint or pilot, and won-contract events by listing ID.
3. Keep a small no-link diagnostic sample without treating it as a causal control group.
4. Record objections verbatim.
5. Create a narrower vertical variant only after repeated qualified or funded evidence shows a distinct buyer outcome; test any page-lift claim separately.

Use a non-personal query tag on every link, for example `?ref=uw-022079500683280398086` or `?ref=fl-5515592`.

The tag must contain only an opaque marketplace code and listing ID.

Do not put a client name, email address, or other personal data into the URL.

The Vercel Analytics `beforeSend` hook validates `uw-<id>` or `fl-<id>` and records a virtual `_ref` path without changing the buyer-visible URL.

`ref=uw-<id>` records as `/_ref/upwork-<id>`, while `ref=fl-<id>` records as `/_ref/fl-<id>`.

Mark a workbook page view only when the matching virtual path appears in Vercel Analytics.

Reply, interview, paid pilot, and won contract remain the authoritative manual funnel events.

Originally recommended first presale learning wave:

- 8 Lead Response proposals.
- 6 Client Inbox proposals.
- 6 Operations & Documents proposals.
- 4 Knowledge Assistant proposals.
- 0 Voice Agent proposals until the higher-confidence pages produce objection data.

The original design used 24 of the 32 selected rows.

It assigned the landing-page link to 20 proposals.

The 2026-07-30 live-listing audit found `Upwork:~022082116475484824757` closed with one hire.

Do not replace it with a weaker hold row merely to preserve sample size.

The maximum current wave is therefore 23 proposals: 8 Lead Response, 6 Client Inbox, 6 Operations & Documents, and 3 Knowledge Assistant.

The maximum current linked set is 19 proposals.

Use one no-link diagnostic proposal in each active category to catch obvious counterexamples without claiming that the page caused any difference.

No-link diagnostic rows:

- Lead Response: `Upwork:~022082076899341845245`.
- Client Inbox: `FL.ru:5515230`.
- Operations & Documents: `FL.ru:5514469`.
- Knowledge Assistant: `Upwork:~022079236014340896590`.

Hold until the first objections are reviewed:

- Lead Response: `Upwork:~022080037748505517610`, `Upwork:~022082023362208208284`.
- Client Inbox: `Upwork:~022075920337694781992`.
- Operations & Documents: `Upwork:~022081838181027419548`, `Upwork:~022072326457921207805`.
- Knowledge Assistant: `Upwork:~022081922819151747063`.
- Voice Agents: `Upwork:~022082043668763252124`, `Upwork:~022080259272497837564`.

Do not interpret page traffic without the denominator of sent proposals.

The 20 linked and 4 no-link rows are not randomized, balanced, or large enough to estimate landing-page lift.

Their purpose is to learn whether the packaged offer earns replies, which objections repeat, whether buyers route to a blueprint or direct pilot, and whether any category reaches a funded milestone.

Do not pool link and no-link outcomes across category, platform, or language.

Treat one funded milestone as a promising category signal that still needs replication, not as proof of repeatable demand or evidence that the landing page caused the sale.

Productize only after at least two independent funded milestones and positive gross margin on at least one delivered engagement.

A later lift test must assign link and no-link variants randomly at a 1:1 ratio inside the same category, platform, and language stratum.

Set its sample size only after the learning wave provides a baseline reply rate and Dali defines the minimum lift worth detecting.

</unknowns>
