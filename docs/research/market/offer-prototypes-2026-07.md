# Offer Prototypes

<info>
This file keeps six concierge prototypes inside the Сем gates of one buyer, one trigger, one input artifact, one seven-day deliverable, one acceptance test, human review before risky actions, and no CRM replacement claim.  
Sources: docs/Сем/02-research-contract.md:5-7,13-17,23-27,81-89 and docs/Сем/reviews/05-antagonist.md:82-102.
Paid outcome is separated from interface in every prototype because the contract says to choose the outcome and buyer before interface or platform story.  
Sources: docs/Сем/02-research-contract.md:5-7 and docs/Сем/reviews/05-antagonist.md:98-102.
This file compares bounded paid tests and does not select a winner.  
Sources: docs/Сем/02-research-contract.md:117-121 and docs/research/real-explore/conversation-log-2026-07-27.md:1415-1425.
</info>

## Comparison Table

| Prototype | Buyer | Trigger | Interface | Paid outcome | CRM stance | Assumed pilot price | Paid-test speed | Core evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Agency client-ops follow-up | Agency owner or delivery lead | Waiting client approval, status update, or blocker | Telegram or shared inbox plus weekly packet | Fewer missed follow-ups and clearer owner handoff | Complement to CRM and PM tool | USD 100 for one 7-day workflow pilot | 1 to 2 days | docs/Сем/evidence/02-david-context.md:40-43,189-199; docs/Сем/research/03-us-market.md:108-109,121-123,142-145 |
| Service-SMB lead rescue | Owner or office manager | Missed call, form, or chat after hours or during overload | Forwarded lead queue plus callback packet | Recovered leads and booked calls | Complement to CRM, phone, and booking tool | USD 150 for one 7-day lead window | 2 to 3 days | docs/Сем/research/03-us-market.md:97-99,108,117-119,143-145 |
| RU/CIS Telegram lead intake | Owner, agency director, or sales lead | New ad burst, public chat inquiry, or new Telegram dialog | Telegram Business or connected bot queue plus daily packet | Faster first reply and fewer lost inbound leads | Complement to amoCRM, Bitrix24, or RetailCRM | USD 100 equivalent for one 7-day intake window | 2 to 3 days | docs/Сем/research/04-ru-cis-market.md:72,81-90,94-100,117-121,125-129 |
| AI deployment implementation and reliability operator | Head of Implementation, Professional Services lead, or founder at an AI vendor or agency | Signed client deployment or blocked go-live | Project room, blocker log, checklist, and evidence packet | Faster time-to-value and fewer go-live failures | Complement to CRM, PSA, and ticket tools | USD 150 for one active deployment week | 4 to 5 days | docs/research/real-explore/conversation-log-2026-07-27.md:925-950,1384-1413; docs/Сем/reviews/05-antagonist.md:98-102 |
| AI release and acceptance gate | AI-native agency owner, delivery lead, or small studio owner | Release candidate ready for client acceptance | Staging URL plus receipt packet | Accepted release with fewer unpaid revisions | Complement to PM and QA tools | USD 100 per release packet | 1 to 2 days | docs/research/real-explore/conversation-log-2026-07-27.md:540-591,1003-1028; docs/Сем/reviews/05-antagonist.md:82-102 |
| Enterprise deal desk packet | CRO, Sales Engineering lead, InfoSec lead, or founder | Incoming RFP, DDQ, or security questionnaire deadline | Document upload plus cited answer packet | Faster packet turnaround with fewer contradictions | Complement to CRM, docs, and legal workflow | USD 100 for one first packet | 2 to 3 days | docs/research/real-explore/conversation-log-2026-07-27.md:897-922; docs/Сем/reviews/05-antagonist.md:98-102 |

## Shortest-Time-to-Paid-Test View

| Rank by speed | Prototype | Why the first paid test is relatively short | Main friction | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Agency client-ops follow-up | The buyer, trigger, and weekly packet are already close to David's documented Kora agency context and reuse task-driven operations without new platform claims. | Multi-client inbox variation. | docs/Сем/evidence/02-david-context.md:40-43,189-199; docs/Сем/research/03-us-market.md:109,121-123 |
| 2 | AI release and acceptance gate | The deliverable is a bounded receipt around one staging URL and one promise set, so the pilot can start without CRM replacement or live production write access. | Browser evidence quality must be strong. | docs/research/real-explore/conversation-log-2026-07-27.md:540-591,1003-1028; docs/Сем/evidence/01-kora-reality.md:202-219 |
| 3 | RU/CIS Telegram lead intake | Telegram is already the work surface in this market, and the seven-day pilot can start from existing dialogs instead of cold outreach. | Data localization and model procurement constraints. | docs/Сем/research/04-ru-cis-market.md:81-90,125-129; docs/Сем/evidence/02-david-context.md:62-66 |
| 4 | Enterprise deal desk packet | The input artifact is already a packet, and the output is another packet, so the paid test is structurally bounded. | Source gathering and approver review latency. | docs/research/real-explore/conversation-log-2026-07-27.md:897-922 |
| 5 | Service-SMB lead rescue | The business value is immediate, but Kora has no proven telephony or SMS delivery layer in the current repo evidence. | Manual handoff into phone or CRM tools. | docs/Сем/research/03-us-market.md:108,117-119,142-145; docs/Сем/evidence/01-kora-reality.md:182-199,216-219 |
| 6 | AI deployment implementation and reliability operator | The value is large, but the setup spans requirements, data, integrations, and go-live evidence across a whole deployment. | Scope control and access collection. | docs/research/real-explore/conversation-log-2026-07-27.md:925-950,1384-1413 |

## Kora-Reuse View

| Prototype | Reused Kora capability | Reuse level | Missing capability | Manual workaround | Evidence |
| --- | --- | --- | --- | --- | --- |
| Agency client-ops follow-up | Durable projects, tasks, schedules, connectors, and channel runtime | High | Universal outbound sync across every client stack | Human sends approved drafts inside the customer's current tool | docs/Сем/evidence/01-kora-reality.md:49-54,70-74,153-190,221-225 |
| Service-SMB lead rescue | Durable projects, tasks, and schedules | Medium | Proven telephony, SMS, and booking integrations | Human works from forwarded lead artifacts and updates the customer's system | docs/Сем/evidence/01-kora-reality.md:49-54,153-180,216-219 |
| RU/CIS Telegram lead intake | Telegram-first runtime, projects, tasks, schedules, and channel runtime | High | Russia-safe model procurement and localization proof | Human keeps PII in the customer's CRM and sends from existing dialogs | docs/Сем/evidence/01-kora-reality.md:37-39,49-54,70-74,153-190,221-225; docs/Сем/research/04-ru-cis-market.md:89-90,107-121 |
| AI deployment implementation and reliability operator | Projects, tasks, schedules, connectors, research, and browser infrastructure | High | Productized deployment control room and broad integration coverage | Human handles unsupported portals and write actions | docs/Сем/evidence/01-kora-reality.md:70-80,176-185,202-214,221-225 |
| AI release and acceptance gate | Browser worker, projects, tasks, and schedules | High | Finished user-facing browser-control product layer | Human runs unsupported edge checks manually and attaches evidence | docs/Сем/evidence/01-kora-reality.md:202-219,221-225 |
| Enterprise deal desk packet | Research fetch, projects, and task tracking | Medium | Structured questionnaire import and portal submission flow | Human copies the approved answer map into the final sheet or portal | docs/Сем/evidence/01-kora-reality.md:76-80,153-180,221-225 |

## 1. Agency Client-Ops Follow-Up

- Buyer: The buyer is an agency owner or delivery lead who already manages client context, deadlines, blockers, and drafts in an agency setting.  
Sources: docs/Сем/evidence/02-david-context.md:40-43 and docs/Сем/research/03-us-market.md:109,121-123.
- Trigger: The trigger is any client lead, approval, or status update that is waiting and is now creating delay or a handoff gap.  
Sources: docs/Сем/research/03-us-market.md:109 and docs/Сем/02-research-contract.md:13-17.
- Input artifact: The input artifact is the active client thread, the current scope or SOW, the latest deliverable, and the current owner list.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/research/real-explore/conversation-log-2026-07-27.md:549-566.
- Interface: The interface is a Telegram or shared-inbox queue plus a Friday packet of drafts, blockers, and next actions.  
Sources: docs/Сем/evidence/01-kora-reality.md:37-39,49-54,70-74,221-225 and docs/Сем/evidence/02-david-context.md:40-43.
- Paid outcome: The paid outcome is fewer missed follow-ups, faster approvals, and fewer dropped client handoffs.  
Sources: docs/Сем/research/03-us-market.md:109,121-123 and docs/Сем/reviews/05-antagonist.md:98-102.
- CRM stance: This prototype complements the agency's CRM or PM system by preparing the next action and pushing updates back into the system of record instead of replacing it.  
Sources: docs/Сем/02-research-contract.md:85,109-111 and docs/Сем/reviews/05-antagonist.md:99-101.
- Seven-day deliverable: The seven-day deliverable is one live queue with owner assignment, reply drafts, blocker escalation notes, and one client-ready weekly status packet.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/evidence/01-kora-reality.md:153-180,221-225.
- Acceptance test: The buyer can accept the pilot if every in-scope thread has an owner, a next step, and no unanswered item older than the agreed SLA inside the packet.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/reviews/05-antagonist.md:82-89.

```text
Client thread or approval wait
        ->
Kora project and task queue
        ->
Draft follow-up and blocker note
        ->
Human approve sensitive changes
        ->
Send update and log receipt
        ->
Weekly client packet
```

- Human-review boundary: A human must approve any outbound message that changes scope, price, deadline, or delivery promise.  
Sources: docs/Сем/reviews/05-antagonist.md:75-80,98-102 and docs/Сем/evidence/02-david-context.md:78-79.
- Reversible actions: Reversible actions are drafting replies, assigning owners, setting reminders, and writing status summaries.  
Sources: docs/Сем/evidence/01-kora-reality.md:49-54,153-180,221-225.
- Exclusions: Exclusions are CRM replacement, net-new lead generation, cold outreach, invoice chasing, and autonomous scope negotiation.  
Sources: docs/Сем/02-research-contract.md:23-27,83-89 and docs/Сем/evidence/02-david-context.md:62-66.
- Current Kora reuse: Current Kora reuse is strongest in projects, tasks, schedules, connectors, and channel runtime.  
Sources: docs/Сем/evidence/01-kora-reality.md:49-54,70-74,153-190,221-225.
- Missing-capability manual workaround: The missing capability is universal outbound sync across every agency stack, so the operator should send approved drafts from the customer's existing tool and paste the final state back into Kora.  
Sources: docs/Сем/evidence/01-kora-reality.md:97-99,182-199 and docs/Сем/reviews/05-antagonist.md:99-101.
- Setup: Setup is one inbox export or Telegram thread feed, one owner map, one escalation rule set, and one weekly packet template.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/evidence/02-david-context.md:89-99.
- Assumed price: The assumed pilot price is USD 100 for one seven-day workflow because the first commercial target is roughly USD 100 per customer and the U.S. agency wedge supports a service-backed pilot in that range.  
Sources: docs/Сем/02-research-contract.md:5-7 and docs/Сем/research/03-us-market.md:142-145.
- Variable cost drivers: Variable cost drivers are client count, message volume, SLA strictness, and the number of approval-sensitive replies.  
Sources: docs/Сем/reviews/05-antagonist.md:52-64 and docs/Сем/research/03-us-market.md:109,144-145.
- Safe demo: A safe demo is one redacted client thread or one archived week of agency follow-up replayed into a synthetic queue.  
Sources: docs/Сем/reviews/05-antagonist.md:82-89 and docs/Сем/evidence/02-david-context.md:97-103.
- Kill criteria: Kill this prototype if three buyer conversations do not produce one paid pilot, if the buyer demands CRM replacement before value appears, or if the queue still needs more than two hours of human review per week.  
Sources: docs/Сем/reviews/05-antagonist.md:82-96.
- Proof-gated expansion: Expand only after three paid pilots show lower missed-follow-up count and the same workflow repeats across multiple agencies, and only then consider a broader client-delivery layer.  
Sources: docs/Сем/02-research-contract.md:117-121 and docs/research/real-explore/conversation-log-2026-07-27.md:596-605.

## 2. Service-SMB Lead Rescue

- Buyer: The buyer is the owner or office manager of a service SMB that loses revenue when inbound calls, forms, or chats wait too long.  
Sources: docs/Сем/research/03-us-market.md:97-99,108,117-119.
- Trigger: The trigger is a missed call, web form, or after-hours chat during a busy window.  
Sources: docs/Сем/research/03-us-market.md:108 and https://help.gohighlevel.com/support/solutions/articles/48001239140-where-and-how-to-configure-the-missed-call-text-back-feature.
- Input artifact: The input artifact is the missed-call email, CRM lead row, form submission, or chat transcript plus the booking script.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/research/03-us-market.md:108,143-145.
- Interface: The interface is a forwarded lead queue with callback drafts and a daily booked-call report.  
Sources: docs/Сем/evidence/01-kora-reality.md:153-180,221-225 and docs/Сем/research/03-us-market.md:94-99.
- Paid outcome: The paid outcome is recovered leads, faster first response, and more booked calls.  
Sources: docs/Сем/research/03-us-market.md:108,117-119.
- CRM stance: This prototype complements HighLevel, Housecall Pro, or a phone tool by adding triage and follow-up discipline around the existing record.  
Sources: docs/Сем/research/03-us-market.md:108,142-145 and docs/Сем/reviews/05-antagonist.md:99-101.
- Seven-day deliverable: The seven-day deliverable is a lead queue with disposition for every inbound contact, approved callback drafts, reminder tasks, and one recovery report.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/evidence/01-kora-reality.md:49-54,153-180.
- Acceptance test: The buyer can accept the pilot if every in-scope lead has a timestamped first-response attempt, a disposition, and a next action in the packet.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/reviews/05-antagonist.md:82-89.

```text
Missed call or new form
        ->
Lead artifact enters queue
        ->
Triage and callback draft
        ->
Human approve send or booking
        ->
Lead disposition logged
        ->
Daily rescue report
```

- Human-review boundary: A human must approve any message that books a slot, quotes a price, or commits a technician or salesperson.  
Sources: docs/Сем/reviews/05-antagonist.md:75-80,98-102.
- Reversible actions: Reversible actions are classifying leads, drafting replies, scheduling reminders, and preparing the callback packet.  
Sources: docs/Сем/evidence/01-kora-reality.md:49-54,153-180.
- Exclusions: Exclusions are telephony replacement, cold outbound prospecting, payment collection, dispatch authority, and unsupported SMS automation claims.  
Sources: docs/Сем/02-research-contract.md:23-27,83-89 and docs/Сем/evidence/01-kora-reality.md:216-219.
- Current Kora reuse: Current Kora reuse is strongest in project tracking, task queues, and reminder scheduling rather than in channel delivery.  
Sources: docs/Сем/evidence/01-kora-reality.md:49-54,153-180,221-225.
- Missing-capability manual workaround: The missing capability is proven telephony and SMS infrastructure, so the operator should work from forwarded artifacts and send the final message inside the customer's current CRM or phone tool.  
Sources: docs/Сем/evidence/01-kora-reality.md:182-199,216-219 and docs/Сем/research/03-us-market.md:130-138.
- Setup: Setup is one lead-forwarding rule, one callback script, one booking rule sheet, and one daily report template.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/research/03-us-market.md:142-145.
- Assumed price: The assumed pilot price is USD 150 for one seven-day lead window because the U.S. research says lead-rescue pilots can credibly sit at USD 100 to USD 300 plus light setup.  
Sources: docs/Сем/research/03-us-market.md:142-145.
- Variable cost drivers: Variable cost drivers are lead volume, after-hours coverage, booking complexity, and the amount of customer-specific script logic.  
Sources: docs/Сем/reviews/05-antagonist.md:52-64 and docs/Сем/research/03-us-market.md:108,143-145.
- Safe demo: A safe demo is one historical day of missed calls or one exported set of old form leads replayed into the queue without live sending.  
Sources: docs/Сем/reviews/05-antagonist.md:82-89 and docs/Сем/research/03-us-market.md:153-160.
- Kill criteria: Kill this prototype if the buyer only wants a full telephony stack, if the workflow needs unsupported autonomous sending from day one, or if the pilot cannot show a bounded lead recovery packet within seven days.  
Sources: docs/Сем/02-research-contract.md:23-27,81-89 and docs/Сем/reviews/05-antagonist.md:82-96.
- Proof-gated expansion: Expand only after three paid pilots show booked-call lift or lower lead-loss count and only then consider SMS, WhatsApp, or booking integrations.  
Sources: docs/Сем/research/03-us-market.md:153-160,163-175 and docs/Сем/reviews/05-antagonist.md:91-96.

## 3. RU/CIS Telegram Lead Intake

- Buyer: The buyer is a service-business owner, agency director, or sales lead already handling inbound leads in Telegram and CRM.  
Sources: docs/Сем/research/04-ru-cis-market.md:72,81-85,94-100.
- Trigger: The trigger is a new ad burst, a new public inquiry, or an existing dialog that needs a fast first reply.  
Sources: docs/Сем/research/04-ru-cis-market.md:72,81-85,125-129 and docs/Сем/evidence/02-david-context.md:62-66.
- Input artifact: The input artifact is the Telegram Business or connected-bot dialog, the FAQ and routing rules, and the CRM field map.  
Sources: docs/Сем/research/04-ru-cis-market.md:81-90 and docs/Сем/02-research-contract.md:81-89.
- Interface: The interface is a Telegram-first queue with a daily disposition packet and a handoff note back into the CRM.  
Sources: docs/Сем/research/04-ru-cis-market.md:81-90,125-129 and docs/Сем/evidence/01-kora-reality.md:37-39,70-74,153-180,187-190.
- Paid outcome: The paid outcome is faster first reply and fewer lost inbound Telegram leads.  
Sources: docs/Сем/research/04-ru-cis-market.md:72,84,94-96.
- CRM stance: This prototype complements amoCRM, Bitrix24, or RetailCRM by cleaning and routing inbound lead state into the existing record instead of replacing it.  
Sources: docs/Сем/research/04-ru-cis-market.md:84,117-121 and docs/Сем/reviews/05-antagonist.md:99-101.
- Seven-day deliverable: The seven-day deliverable is one in-scope intake queue with lead classification, approved reply drafts, reminder tasks, and a daily loss report.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/research/04-ru-cis-market.md:125-129.
- Acceptance test: The buyer can accept the pilot if every in-scope dialog has a classification, a proposed next step, and a mirrored note in the packet or CRM.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/reviews/05-antagonist.md:82-89.

```text
Existing Telegram dialog or lead
        ->
Lead triage and FAQ match
        ->
Draft first reply and route owner
        ->
Human approve pricing or promise
        ->
CRM note and reminder
        ->
Daily intake report
```

- Human-review boundary: A human must approve the first send in a new sensitive dialog, any pricing promise, and any escalation that changes commercial terms.  
Sources: docs/Сем/reviews/05-antagonist.md:75-80,98-102 and docs/Сем/evidence/02-david-context.md:62-66,78-79.
- Reversible actions: Reversible actions are classifying inbound chats, drafting replies, adding reminders, and writing disposition summaries.  
Sources: docs/Сем/evidence/01-kora-reality.md:49-54,153-180 and docs/Сем/research/04-ru-cis-market.md:72.
- Exclusions: Exclusions are cold MTProto outreach, mass DM, CRM replacement, payment handling, and storage of Russian PII outside the customer's compliant system.  
Sources: docs/Сем/evidence/02-david-context.md:62-66,101-103 and docs/Сем/research/04-ru-cis-market.md:89-90,107-113.
- Current Kora reuse: Current Kora reuse is strongest in Telegram-first runtime, channel handling, projects, tasks, and schedules.  
Sources: docs/Сем/evidence/01-kora-reality.md:37-39,49-54,70-74,153-190,221-225.
- Missing-capability manual workaround: The missing capability is Russia-safe model procurement and localization proof, so the operator should keep PII in the customer's system, work from redacted summaries when needed, and send from already legal dialogs.  
Sources: docs/Сем/research/04-ru-cis-market.md:89-90,107-113,117-121 and docs/Сем/evidence/02-david-context.md:62-66.
- Setup: Setup is one existing dialog source, one FAQ sheet, one CRM field map, and one approved escalation rule set.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/research/04-ru-cis-market.md:124-129.
- Assumed price: The assumed pilot price is the local equivalent of USD 100 for one seven-day intake window because the RU/CIS research places service-backed pilots in the USD 100 to USD 300 range and the overall target stays near USD 100 first.  
Sources: docs/Сем/research/04-ru-cis-market.md:116-121 and docs/Сем/02-research-contract.md:5-7.
- Variable cost drivers: Variable cost drivers are dialog volume, FAQ maturity, CRM mapping effort, and review time for pricing-sensitive replies.  
Sources: docs/Сем/reviews/05-antagonist.md:52-64 and docs/Сем/research/04-ru-cis-market.md:72,84-90.
- Safe demo: A safe demo is one existing customer dialog, one redacted export, or one synthetic Telegram lead generated from a public-channel ad scenario.  
Sources: docs/Сем/research/04-ru-cis-market.md:81-90 and docs/Сем/reviews/05-antagonist.md:82-89.
- Kill criteria: Kill this prototype if the buyer insists on illegal cold outreach, if local data rules block even the redacted workflow, or if the pilot still needs more than two hours of human review per week.  
Sources: docs/Сем/evidence/02-david-context.md:62-66,163-167 and docs/Сем/reviews/05-antagonist.md:82-96.
- Proof-gated expansion: Expand only after three paid pilots show lower lead-loss and acceptable compliance handling, and only then consider connected-bot or Mini App productization.  
Sources: docs/Сем/research/04-ru-cis-market.md:125-129,139-145 and docs/Сем/reviews/05-antagonist.md:91-96.

## 4. AI Deployment Implementation And Reliability Operator

- Buyer: The buyer is a Head of Implementation, Professional Services lead, or founder at an AI vendor, automation agency, or small integrator.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:931-949,1390-1413.
- Trigger: The trigger is a signed client deployment, a blocked implementation, or a go-live that now needs evidence and blocker control.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:929-950,1388-1413.
- Input artifact: The input artifact is the signed scope, requirements, access checklist, sample data, staging URL, and incident or blocker log.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:929-950,1396-1410 and docs/Сем/02-research-contract.md:81-89.
- Interface: The interface is one project room with a blocker board, acceptance checklist, and go-live evidence packet.  
Sources: docs/Сем/evidence/01-kora-reality.md:221-225,153-180,202-214 and docs/research/real-explore/conversation-log-2026-07-27.md:1396-1410.
- Paid outcome: The paid outcome is shorter time-to-value, more successful deployments per operator, and fewer production failures after go-live.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:933-950,1412-1413.
- CRM stance: This prototype complements CRM, PSA, and ticket tools by running the delivery control loop around them rather than replacing them.  
Sources: docs/Сем/02-research-contract.md:85,109-111 and docs/research/real-explore/conversation-log-2026-07-27.md:1361-1372.
- Seven-day deliverable: The seven-day deliverable is one active deployment packet with blocker list, owner map, access checklist, acceptance scenarios, and one go-live evidence report.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/research/real-explore/conversation-log-2026-07-27.md:1396-1410.
- Acceptance test: The buyer can accept the pilot if every blocker has an owner and date, every promised acceptance scenario is mapped, and the go or no-go packet is readable in one sitting.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/reviews/05-antagonist.md:82-89.

```text
Signed scope and access list
        ->
Project room and blocker board
        ->
Integration and data checklist
        ->
Acceptance scenarios and evidence
        ->
Human approve live changes
        ->
Go-live packet and regression list
```

- Human-review boundary: A human must approve every live configuration change, every production cutover, and the final go-live decision.  
Sources: docs/Сем/reviews/05-antagonist.md:75-80,98-102.
- Reversible actions: Reversible actions are planning, blocker chasing, evidence collection, read-only checks, and regression-list creation.  
Sources: docs/Сем/evidence/01-kora-reality.md:202-214,221-225 and docs/research/real-explore/conversation-log-2026-07-27.md:956-973.
- Exclusions: Exclusions are full PSA replacement, unsupported autonomous production changes, and generic implementation for every B2B SaaS category.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:946-950,1361-1372 and docs/Сем/02-research-contract.md:23-27.
- Current Kora reuse: Current Kora reuse is strongest in projects, tasks, schedules, connectors, research, and browser infrastructure.  
Sources: docs/Сем/evidence/01-kora-reality.md:49-54,70-80,176-185,202-214,221-225.
- Missing-capability manual workaround: The missing capability is a finished deployment control room with broad write integrations, so the operator should handle unsupported portals and final write actions manually while Kora holds the state and evidence.  
Sources: docs/Сем/evidence/01-kora-reality.md:97-99,197-219 and docs/research/real-explore/conversation-log-2026-07-27.md:1384-1413.
- Setup: Setup is one deployment class, one scope template, one access checklist, one blocker taxonomy, and one acceptance-packet template.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:946-950,1396-1410.
- Assumed price: The assumed pilot price is USD 150 for one active deployment week because the workflow is wider than a release gate but still needs to fit the first ten-customer constraint.  
Sources: docs/Сем/02-research-contract.md:5-7 and docs/research/real-explore/conversation-log-2026-07-27.md:948-950.
- Variable cost drivers: Variable cost drivers are number of systems, data cleanup load, access latency, blocker volume, and the count of human approvals.  
Sources: docs/Сем/reviews/05-antagonist.md:52-64 and docs/research/real-explore/conversation-log-2026-07-27.md:941-949.
- Safe demo: A safe demo is one historical or sandbox deployment with synthetic credentials and a redacted blocker set.  
Sources: docs/Сем/reviews/05-antagonist.md:82-89 and docs/research/real-explore/conversation-log-2026-07-27.md:1396-1410.
- Kill criteria: Kill this prototype if a single pilot cannot ship in seven days, if the same deployment class does not repeat, or if the workflow needs more than two hours of human review per week even after scope narrowing.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/Сем/reviews/05-antagonist.md:82-96.
- Proof-gated expansion: Expand only after three paid pilots in one deployment class show faster go-live and a usable regression loop from production failures back into acceptance checks.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:1384-1413 and docs/Сем/reviews/05-antagonist.md:91-96.

## 5. AI Release And Acceptance Gate

- Buyer: The buyer is an AI-native agency owner, delivery lead, or small software studio owner shipping client work.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:542-545,1009-1027.
- Trigger: The trigger is a release candidate or revision round that is about to be sent for client acceptance.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:546-571,1005-1027.
- Input artifact: The input artifact is the brief, the client thread, the promise list, the staging URL, and optionally the repository.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:586-591,1005-1008 and docs/Сем/02-research-contract.md:81-89.
- Interface: The interface is a staging URL plus a red or green receipt with screenshots, video, console facts, and network facts.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:549-566,586-591,1007-1008.
- Paid outcome: The paid outcome is accepted release quality, fewer unpaid revision cycles, and less scope argument.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:568-571,1011-1027 and docs/Сем/reviews/05-antagonist.md:98-102.
- CRM stance: This prototype complements PM and QA tools because the paid artifact is a client-ready receipt, not a new system of record.  
Sources: docs/Сем/02-research-contract.md:85 and docs/research/real-explore/conversation-log-2026-07-27.md:1021-1028.
- Seven-day deliverable: The seven-day deliverable is one acceptance packet that maps promises to executable checks and returns a client-ready receipt after one rerun if needed.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/research/real-explore/conversation-log-2026-07-27.md:586-591,1007-1008.
- Acceptance test: The buyer can accept the pilot if a delivery lead or client can approve or reject the release using the packet alone.  
Sources: docs/Сем/reviews/05-antagonist.md:82-89 and docs/research/real-explore/conversation-log-2026-07-27.md:565-571.

```text
Brief and client promise
        ->
Acceptance criteria map
        ->
E2E, visual, console, network checks
        ->
Evidence pack and defects
        ->
Human approve verdict send
        ->
Client-ready receipt
```

- Human-review boundary: A human must approve destructive tests, deployment decisions, and the final client-facing verdict.  
Sources: docs/Сем/reviews/05-antagonist.md:75-80,98-102.
- Reversible actions: Reversible actions are read-only browser checks, screenshot capture, video capture, defect logging, and rerun after fixes.  
Sources: docs/Сем/evidence/01-kora-reality.md:202-219 and docs/research/real-explore/conversation-log-2026-07-27.md:586-591,1007-1008.
- Exclusions: Exclusions are generic AI QA subscriptions, code review as the paid outcome, autonomous deploy, and unsupported claims of full browser-control product maturity.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:568-571,1021-1028 and docs/Сем/evidence/01-kora-reality.md:216-219.
- Current Kora reuse: Current Kora reuse is strongest in browser infrastructure, projects, task state, and artifact packaging.  
Sources: docs/Сем/evidence/01-kora-reality.md:202-214,221-225,153-180.
- Missing-capability manual workaround: The missing capability is a finished productized browser-control layer, so unsupported edge checks should be run manually and attached to the same evidence packet.  
Sources: docs/Сем/evidence/01-kora-reality.md:216-219 and docs/Сем/reviews/05-antagonist.md:98-102.
- Setup: Setup is one staging URL, one promise list, one priority flow list, and one receipt template.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:586-591,1005-1008.
- Assumed price: The assumed pilot price is USD 100 per release packet because the deliverable is one bounded receipt and the overall first-customer target remains near USD 100.  
Sources: docs/Сем/02-research-contract.md:5-7 and docs/research/real-explore/conversation-log-2026-07-27.md:1025-1027.
- Variable cost drivers: Variable cost drivers are number of critical flows, browser variance, auth complexity, and rerun count after fixes.  
Sources: docs/Сем/reviews/05-antagonist.md:52-64 and docs/research/real-explore/conversation-log-2026-07-27.md:588-591.
- Safe demo: A safe demo is one staging site or Mini App with synthetic data and a limited user-flow list.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:586-591 and docs/Сем/reviews/05-antagonist.md:82-89.
- Kill criteria: Kill this prototype if agencies only want generic automated tests, if the receipt does not change acceptance behavior, or if the packet cannot be produced inside seven days with bounded review.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:570-571,1021-1028 and docs/Сем/reviews/05-antagonist.md:82-96.
- Proof-gated expansion: Expand only after three paid release packets are accepted by real buyers and only then consider the broader Client Delivery OS framing.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:540-571,596-605 and docs/Сем/reviews/05-antagonist.md:91-96.

## 6. Enterprise Deal Desk Packet

- Buyer: The buyer is a CRO, Head of Sales Engineering, InfoSec lead, or founder at a B2B company selling into enterprise deals.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:897-915.
- Trigger: The trigger is an incoming RFP, DDQ, or security questionnaire with a deal deadline.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:899-920.
- Input artifact: The input artifact is the questionnaire file, the current policy and product docs, prior answers, and the approver list.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:901-920 and docs/Сем/02-research-contract.md:81-89.
- Interface: The interface is one upload flow into a project room and one source-cited answer packet out.  
Sources: docs/Сем/evidence/01-kora-reality.md:76-80,221-225 and docs/research/real-explore/conversation-log-2026-07-27.md:901-920.
- Paid outcome: The paid outcome is earlier packet return, fewer contradictory answers, and less senior engineering and security interruption.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:905-920 and docs/Сем/reviews/05-antagonist.md:98-102.
- CRM stance: This prototype complements CRM and document systems because the core output is a cited packet and approval log, not a new account system.  
Sources: docs/Сем/02-research-contract.md:85 and docs/research/real-explore/conversation-log-2026-07-27.md:920-923.
- Seven-day deliverable: The seven-day deliverable is one questionnaire answer packet with citations, unknowns, and an approver checklist.  
Sources: docs/Сем/02-research-contract.md:81-89 and docs/research/real-explore/conversation-log-2026-07-27.md:901-920.
- Acceptance test: The buyer can accept the pilot if the packet is sendable after human review and every unresolved answer is clearly marked as a gap instead of a fabricated claim.  
Sources: docs/Сем/02-research-contract.md:98-100 and docs/Сем/reviews/05-antagonist.md:82-89.

```text
RFP or DDQ arrives
        ->
Questions parsed into packet
        ->
Source search and answer draft
        ->
Gap list and approver review
        ->
Human approve policy statements
        ->
Final packet returned
```

- Human-review boundary: A human must approve every legal, security, compliance, and customer-facing commitment before submission.  
Sources: docs/Сем/reviews/05-antagonist.md:75-80,98-102.
- Reversible actions: Reversible actions are question extraction, source search, answer drafting, citation mapping, and gap marking.  
Sources: docs/Сем/evidence/01-kora-reality.md:76-80,221-225 and docs/research/real-explore/conversation-log-2026-07-27.md:901-920.
- Exclusions: Exclusions are legal advice, autonomous submission into external portals, CRM replacement, and invented answers for unsupported claims.  
Sources: docs/Сем/02-research-contract.md:98-100 and docs/research/real-explore/conversation-log-2026-07-27.md:917-923.
- Current Kora reuse: Current Kora reuse is strongest in research fetch, project artifact storage, and task-based approval routing.  
Sources: docs/Сем/evidence/01-kora-reality.md:76-80,153-180,221-225.
- Missing-capability manual workaround: The missing capability is a structured questionnaire import and portal-submission flow, so the operator should paste the approved answer map into the final spreadsheet or portal by hand.  
Sources: docs/Сем/evidence/01-kora-reality.md:97-99,221-225 and docs/Сем/reviews/05-antagonist.md:99-101.
- Setup: Setup is one document corpus, one approver map, one answer style guide, and one packet template.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:901-920 and docs/Сем/02-research-contract.md:81-89.
- Assumed price: The assumed pilot price is USD 100 for one first packet because the deliverable is one bounded artifact even though the long-term model may move toward setup plus per-packet or annual pricing.  
Sources: docs/Сем/02-research-contract.md:5-7 and docs/research/real-explore/conversation-log-2026-07-27.md:920-922.
- Variable cost drivers: Variable cost drivers are questionnaire length, source freshness, number of approvers, and the share of answers that need policy review.  
Sources: docs/Сем/reviews/05-antagonist.md:52-64 and docs/research/real-explore/conversation-log-2026-07-27.md:907-920.
- Safe demo: A safe demo is one public sample questionnaire or one redacted historical packet with no live customer data.  
Sources: docs/Сем/reviews/05-antagonist.md:82-89 and docs/research/real-explore/conversation-log-2026-07-27.md:914-918.
- Kill criteria: Kill this prototype if one packet cannot be completed in seven days, if buyers only want a full annual platform sale, or if unsupported answers still require too much manual source hunting.  
Sources: docs/Сем/reviews/05-antagonist.md:82-96 and docs/Сем/02-research-contract.md:81-89.
- Proof-gated expansion: Expand only after three paid packets show faster turnaround with no contradiction incidents and only then consider approval routing or reusable answer memory.  
Sources: docs/research/real-explore/conversation-log-2026-07-27.md:914-922 and docs/Сем/reviews/05-antagonist.md:91-96.
