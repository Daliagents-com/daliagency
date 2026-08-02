# Dali marketplace sales playbook

<info>

Date: 2026-07-29.

Purpose: turn a positive marketplace reply into the smallest honest paid milestone before any category product is built.

Applies to:

- Lead Response.
- Client Inbox.
- Operations & Documents.
- Internal Knowledge Assistant.
- Voice Agents only as a design-partner research lane.

Primary strategy: `docs/research/market/dali-marketplace-funnel-strategy-2026-07-29.md`.

Outreach tracker: `outputs/019faee2-ebbf-7363-84a2-2b397dc2f4ec/dali-marketplace-outreach-2026-07-29.xlsx`.

</info>

## Commercial rule

<rule>

Dali does not claim that a finished category product already exists.

Dali claims that the pain, safe operating boundary, pilot shape, and acceptance test have already been packaged.

The first paid milestone is selected by uncertainty:

- Quote the fixed pilot directly when one workflow, samples, owner, approval boundary, destination, and success measure are already clear.
- Sell the paid workflow blueprint first when value is credible but scope, data, access, ownership, or success criteria remain unclear.
- Stop the pursuit when there is no stable workflow, no usable sample set, no accountable owner, or the buyer insists on uncontrolled autonomy.

Budget is part of the boundary:

- Treat the listing budget as a signal, not automatic permission to quote the whole build at that amount.
- If a fixed budget is below the internal pilot anchor, ask whether it is for discovery, the first milestone, or the total system.
- Use a paid blueprint when a credible first phase fits but the full pilot does not.
- Narrow the outcome before lowering price, and never remove approval, logging, evaluation, or exception handling to meet a budget.
- Archive when the buyer's total budget cannot fund either a valid blueprint or a safely bounded pilot.
- Convert hourly interest into a written milestone, capped scope, and acceptance test before work starts.

The blueprint is not free consulting.

It produces the workflow map, access assumptions, replay set, approval boundary, acceptance test, and fixed pilot quote.

The blueprint fee is credited toward the pilot only when the buyer approves the quoted pilot within seven calendar days.

</rule>

## Post-reply routing

<routing>

```text
BUYER REPLIES
      |
      v
CAN THE BUYER NAME ONE WORKFLOW, OWNER, AND SUCCESS EVENT?
      |
      +-- no --> DISQUALIFY OR PAID BLUEPRINT
      |
      +-- yes
            |
            v
ARE SAMPLE DATA, ACCESS MODE, APPROVAL RULES, AND DESTINATION CLEAR?
            |
            +-- no --> PAID WORKFLOW BLUEPRINT
            |
            +-- yes
                  |
                  v
CAN ONE MEASURABLE ACCEPTANCE TEST BE WRITTEN NOW?
                  |
                  +-- no --> PAID WORKFLOW BLUEPRINT
                  |
                  +-- yes --> FIXED PILOT QUOTE
                                   |
                                   v
                         FUNDED MILESTONE BEFORE BUILD
```

</routing>

## First reply after buyer interest

<reply-template id="first-positive-reply">

> Thanks, this looks like a real fit for the packaged workflow.
> Before I quote implementation, I want to lock one narrow path so neither side is buying an open-ended AI build.
> Please send:
> 1. the exact event that starts the workflow;
> 2. the system or action that should receive the final result;
> 3. the cases that must always stop for human review;
> 4. the person who will approve the workflow;
> 5. the representative samples listed below.
> With that, I can either send a fixed pilot milestone or recommend a short paid blueprint if the boundary still has material unknowns.

Use one category-specific sample request:

| Category | Minimum evidence before a pilot quote |
| --- | --- |
| Lead Response | 3-5 representative lead conversations, lead sources, qualification rules, required CRM fields, and current booking or follow-up path |
| Client Inbox | 3-5 representative customer threads including an edge case, approved source set, permitted actions, CRM or case-history destination, and escalation owner |
| Operations & Documents | 3-5 representative inputs, required output schema, duplicate rule, destination system, exception rules, and approval owner |
| Knowledge Assistant | Approved source bundle, at least 10 real questions, user roles, refusal examples, and reviewer |
| Voice design partner | At least 3 call scripts or transcripts, one call outcome, disclosure rule, transfer destination, telephony constraint, and reviewer |

</reply-template>

## Qualification scorecard

<qualification>

Score each requirement as `clear`, `recoverable through blueprint`, or `absent`.

| Requirement | Clear | Recoverable through blueprint | Absent |
| --- | --- | --- | --- |
| One repeated workflow | One start event and one outcome | Several variants need reduction | No stable pattern |
| Economic owner | Named person owns the outcome | Sponsor exists but owner is unresolved | Nobody owns the result |
| Samples | Minimum set is available | Samples can be assembled in the blueprint | No samples and no way to create them |
| Destination | One system or action is named | Two paths need a decision | Undefined platform vision |
| Human boundary | Sensitive cases are named | Approval policy needs mapping | Buyer rejects review or logs |
| Success measure | Acceptance test can be drafted | Metric exists but baseline is unclear | Only a vague wish for AI |
| Commercial fit | Buyer accepts the internal range | Budget can fit after narrowing | Budget cannot support a safe first step |

Route to the pilot only when every row is `clear`.

Route to the blueprint when at least the workflow, economic owner, and ability to create samples are present, while one or more remaining rows are `recoverable through blueprint`.

Disqualify when any of the following is true:

- There is no repeated workflow.
- There is no accountable owner.
- The buyer cannot provide or create representative samples.
- The buyer wants the whole department automated in the first milestone.
- The buyer requires hidden automation, uncontrolled sensitive actions, or fabricated certainty.
- The budget cannot cover the minimum safe scope and the workflow cannot be narrowed.

</qualification>

## Category discovery questions

<questions id="lead-response">

### Lead Response

Ask only the questions that were not already answered in the listing.

1. Which lead source should the first pilot cover?
2. What makes a lead qualified, nurture-only, rejected, or human-reviewed?
3. Which fields must be written to CRM every time?
4. Which reply classes may be sent automatically?
5. Which pricing, scope, compliance, or enterprise cases must stop for approval?
6. What counts as a successful next step: a booked call, complete CRM record, or scheduled follow-up?
7. Who approves the qualification playbook and reviews the replay set?

</questions>

<questions id="client-inbox">

### Client Inbox

1. Which channel and request types should the first pilot cover?
2. Which sources are approved for answers?
3. Which customer actions are permitted without review?
4. Which promises, refunds, account changes, files, or media must stop for approval?
5. What must be written back into CRM or case history?
6. What makes a response accepted during replay?
7. Who owns escalations when the approved source set cannot support an answer?

</questions>

<questions id="operations-docs">

### Operations & Documents

1. Which one input class should enter the first pilot?
2. Which fields are required, optional, derived, or forbidden to infer?
3. What counts as a duplicate?
4. Which destination system receives the validated record or action?
5. Which missing, conflicting, or low-confidence values must stop the flow?
6. Who approves exceptions?
7. What replay result would prove the first milestone worked?

</questions>

<questions id="knowledge-assistant">

### Internal Knowledge Assistant

1. Which source bundle and user group should come first?
2. Which roles may see which sources?
3. Which factual answers require citations?
4. Which questions should produce an explicit refusal?
5. What are 10 real questions the selected users ask today?
6. Who judges whether a grounded answer is acceptable?
7. Who owns source cleanup and access changes after launch?

</questions>

<questions id="voice-agents">

### Voice design partner

1. Which one call type repeats often enough to rehearse?
2. What final action counts as success?
3. When must the caller be transferred or offered a callback?
4. What disclosure, consent, recording, retention, and jurisdiction constraints apply?
5. Which language, telephony provider, CRM, or calendar path is required?
6. Which latency, interruption, and transcript failures are unacceptable?
7. Who listens to and approves the test calls?

</questions>

## Blueprint close

<script id="blueprint-close">

> Based on your reply, the value is clear, but the boundary is still too loose for an honest implementation quote.
> The right first milestone is a paid workflow blueprint.
> I will map the exact input-to-outcome flow, access assumptions, human approval points, representative replay set, and pass/fail acceptance test.
> You receive that scope plus a fixed pilot quote.
> The blueprint is [price] and is credited into the pilot if you approve the quoted build within seven calendar days.
> If that structure works, I will send the milestone with the deliverables written into it.

The blueprint milestone must name:

- The one workflow being mapped.
- The source materials the buyer must provide.
- The workflow map and decision table.
- The approval and escalation boundary.
- The replay set.
- The acceptance test.
- The fixed pilot quote.
- The delivery date.
- The exclusions.

Do not promise production code in a blueprint milestone.

</script>

## Direct pilot close

<script id="pilot-close">

> This is narrow enough to quote as a fixed pilot now.
> The first milestone covers one workflow, one destination path, one review boundary, one replay set, and one written acceptance test.
> Proposed lane: [start event] to [verified outcome], with [sensitive cases] held for [named reviewer].
> Pass condition: [measurable acceptance test].
> Fixed price: [price].
> Build starts only after the milestone is accepted and funded.
> Anything outside this boundary becomes a separately approved next milestone.

The pilot milestone must include:

- Exact input path.
- Exact decision or extraction policy.
- Exact destination action.
- Human review cases.
- Logging and failure behavior.
- Replay-set size.
- Pass and fail thresholds.
- Buyer-provided access and data.
- Explicit exclusions.
- Fixed price and deadline.

</script>

## Category-specific close language

<scripts id="category-close-language">

### Lead Response

> The first paid scope is not a complete AI sales employee.
> It is one intake path that produces an approved first reply, qualification record, CRM update, and booked or scheduled next step, while pricing and low-confidence cases remain human.

### Client Inbox

> The first paid scope is not an assistant that answers everything.
> It is one controlled response path grounded in the approved source set, with case history, permitted actions, and a visible stop for unsupported or sensitive requests.

### Operations & Documents

> The first paid scope is not back-office automation as a whole.
> It is one recurring input transformed into one validated record or action with deduplication, retries, approval, and an exception queue.

### Knowledge Assistant

> The first paid scope is not company-wide search.
> It is one permissioned source bundle, one user group, citations or refusal for every factual answer, and a real-question evaluation set.

### Voice design partner

> The first paid scope is a design-partner evaluation, not a production replacement for reception or sales.
> It covers one disclosed call lane, one successful outcome, latency and interruption tests, full summaries, and a context-rich transfer path.

</scripts>

## Objection responses

<objections>

### "Can you show the finished product first?"

> This category page is the packaged workflow, boundary, and acceptance test, not a claim that your exact system already exists.
> Your CRM, data, permissions, and exception rules determine the implementation.
> I can demonstrate the workflow logic on sanitized examples during a funded blueprint or pilot, but I will not present a generic demo as proof that your production path is already solved.

### "Why not build the whole system now?"

> Because the highest-risk failures happen at the boundary between the first real input, the destination system, and human approval.
> Proving one complete path gives us evidence for the wider build and prevents a large platform scope from hiding basic routing, data, or ownership problems.

### "Can you do a free proof of concept?"

> I can answer fit questions and define the next decision before a contract.
> A representative workflow map, replay set, integration test, or working proof is paid work because it creates the delivery artifact and removes implementation risk.
> The smallest paid option is the workflow blueprint.

### "Another freelancer quoted less."

> The relevant comparison is the boundary, not the feature count.
> This quote includes the replay set, explicit approvals, logging, failure handling, and a written pass condition.
> If the budget is lower, I can reduce the first lane, but I will not remove the controls that make the result safe to operate.

### "Which AI model or automation stack will you use?"

> I will choose the stack after the input, destination, data constraints, and acceptance test are locked.
> The fixed outcome and control boundary stay the same if the underlying model or connector changes.
> If your infrastructure policy requires a specific vendor, that becomes an explicit constraint in the milestone.

### "Can it be fully autonomous?"

> Not in the first pilot.
> Low-risk repeated cases may become automatic after replay evidence is strong, while pricing, irreversible actions, unsupported answers, policy exceptions, and low-confidence cases stay human-reviewed.

### "We need it urgently."

> Urgency is compatible with a narrow pilot, not with skipping the boundary.
> If you provide the required samples, access assumptions, reviewer, and one success measure now, I can lock the first milestone quickly.
> Missing inputs move the work into a paid blueprint rather than into an improvised build.

### "Our data is messy."

> Then source readiness is part of the risk.
> If a usable sample set can be assembled, the paid blueprint should define cleanup, refusal, and exception rules before implementation.
> If no representative samples can be created, I would pause instead of quoting a system we cannot evaluate.

</objections>

## Follow-up cadence

<follow-up>

This cadence is an internal operating recommendation, not a marketplace rule.

Stop immediately when the buyer declines, requests no more messages, fills the role, or reveals a hard disqualifier.

Keep all Upwork communication inside Upwork before a contract.

### Touch 1: 48 hours after the requested inputs

> Quick follow-up on the first workflow.
> If you send [missing sample or decision], I can determine whether this is ready for a fixed pilot or should begin with the workflow blueprint.
> I am intentionally keeping the first step to [one lane] rather than expanding the scope.

### Touch 2: five days after the last buyer reply

> I reviewed the boundary again.
> The smallest useful milestone remains [blueprint or pilot] for [one input-to-outcome path].
> The open decision is [single missing owner, sample, rule, or budget point].
> If that is still a priority, reply with that item and I will turn it into the written milestone.

### Touch 3: seven days after the last buyer reply

> I will close the loop here so I do not keep chasing a paused project.
> If [pain] becomes active again, send [minimum input package] and I can restart from the fixed boundary rather than re-scope the whole system.

After the third unanswered touch, archive the opportunity.

Use one archive reason:

- No owner.
- No samples.
- Scope too broad.
- Approval boundary rejected.
- Budget mismatch.
- Low urgency.
- Role filled.
- No response.
- Platform or compliance risk.

</follow-up>

## First-wave operating plan

<learning-wave>

The first wave originally planned 24 proposals across four launch categories.

The 2026-07-30 direct-page check found 10 listings open, 13 requiring a signed-in Upwork check, and 1 closed after hiring.

The closed row is not replaced merely to preserve sample size, so the maximum current wave is 23 proposals.

The original design assigned 20 category landing-page links and four no-link diagnostic counterexamples, one per category.

After the closure, the maximum current wave contains 19 linked rows and the same four diagnostic rows.

This is a presale learning wave, not a randomized experiment and not a valid estimate of landing-page lift.

Voice remains on hold.

Use small recency-first send windows so operational defects can be caught without letting active listings expire:

| Batch | Send | Release rule |
| --- | ---: | --- |
| Batch A | 6 verified open, 1 manual check, 1 skip | Send the six open rows after message, link, and policy checks; inspect the private row inside Upwork and never send the closed row |
| Batch B | 3 verified open, 5 manual checks | Release 12-24 hours after Batch A when every Upwork row is verified in-platform and no operational blocker or repeated mismatch is visible |
| Batch C | 1 verified open, 7 manual checks | Release 12-24 hours after Batch B only for rows that are still open and materially unchanged |

Exact Batch A:

- Lead Response: `Upwork:~022082094672185738150`, no-link diagnostic `Upwork:~022082076899341845245`, and `Upwork:~022082059740997677549`.
- Client Inbox: `Upwork:~022081818297985759122` and `FL.ru:5515592`.
- Operations & Documents: `Upwork:~022082121535485723389` and `Upwork:~022081965076177154541`.
- Knowledge Assistant: `Upwork:~022082116475484824757`, verified closed with one hire and marked `Skip - Closed`.

Exact Batch B:

- Lead Response: `Upwork:~022081957032774069874`, `Upwork:~022080272851686168921`, and `Upwork:~022079500683280398086`.
- Client Inbox: `FL.ru:5514909` and no-link diagnostic `FL.ru:5515230`.
- Operations & Documents: `Upwork:~022081598123554232311` and no-link diagnostic `FL.ru:5514469`.
- Knowledge Assistant: `Upwork:~022081833254755580077`.

Exact Batch C:

- Lead Response: `Upwork:~022071869598491167955` and `Upwork:~022076935615291863294`.
- Client Inbox: `FL.ru:5513206` and `Upwork:~022069443845701876220`.
- Operations & Documents: `Upwork:~022079631969043129867` and `Upwork:~022073883528374083136`.
- Knowledge Assistant: no-link diagnostic `Upwork:~022079236014340896590` and `Upwork:~022075311922210730379`.

This assignment preserves every original no-link row and spreads the four diagnostics across the three batches instead of creating a no-link-only time window.

The workbook `Send Batch` column mirrors these IDs, except the closed Knowledge Assistant row now reads `Skip - Closed`.

The `Live Check`, `Live Check Note`, and `Checked At` columns carry the direct-page evidence and manual-check gate.

For analytics reconciliation, `ref=uw-<id>` appears as `/_ref/upwork-<id>` and `ref=fl-<id>` appears as `/_ref/fl-<id>`.

The full primary-page audit is in [dali-marketplace-live-check-2026-07-30.md](dali-marketplace-live-check-2026-07-30.md).

Within each category, it moves the freshest Upwork listings into the earliest possible batch.

FL.ru rows with `posted` recorded as `not saved` must be checked live before the batch is approved.

Batch C intentionally contains the oldest Upwork listings and should be skipped row by row when a project is closed, paused, or materially changed.

Before every send:

1. Open the live listing and confirm that it still accepts proposals.
2. Compare the current title and scope with the workbook pain statement.
3. Personalize the first two lines without changing the pilot boundary.
4. Confirm that the landing route matches the category, platform, language, and listing-specific `ref` tag.
5. Confirm that a No-Link Diagnostic row contains no landing URL.
6. Recheck the budget as discovery, first milestone, or total-system intent.
7. For Upwork, confirm that the proposal and landing contain no off-platform contact instruction.
8. Set `Stage` to `Sent`, record `Sent Date`, and leave `Page View` as `Unknown` until the matching Vercel Analytics `_ref` path confirms it.
9. Confirm that the row's `Data Check` cell reads `OK` before sending.

The no-link rows were selected by judgment and differ in rank, platform, language, age, and scope.

Never interpret their outcomes as a causal control group.

Do not rewrite the offer after one silence.

Review outcome quality only after each batch has enough time to receive replies under the marketplace's normal buyer behavior.

The 72-hour learning review does not delay the next 12-24-hour send window when active listing freshness would be lost.

The manual stage sequence is:

```text
Not Sent
  -> Sent
  -> Replied
  -> Qualified
  -> Blueprint Proposed or Pilot Proposed
  -> Blueprint Funded or Pilot Funded
  -> Won
```

`Lost` and `Hold` are side exits from the applicable current stage.

Archive a closed or unsuitable listing with `Sales Path = Archive`, an `Archive Reason`, and `Stage = Lost`.

Delivery is not a stage.

Record delivery completion through `Delivery Hours`, `Direct Cost`, and `Gross Margin %` after a funded blueprint or pilot.

The dashboard preserves event history through dedicated fields rather than inferring every past event from the mutable current stage:

- Sent from `Sent Date`.
- Replied from `Reply Date`.
- Qualified from `Qualification = Qualified`.
- Blueprint offered from `Sales Path = Blueprint` plus `Quoted Amount > 0`.
- Pilot offered from `Sales Path = Direct Pilot` plus `Quoted Amount > 0`.
- Funded from `Funded Amount > 0`.
- Won from `Stage = Won`.

`Data Check` warns when the stage, dates, sales path, quoted amount, or funded amount contradict one another.

The dashboard's category `Sendable` count excludes rows whose live check is `Closed`.

Commercial event metrics count only `Wave 1` rows not originally archived as `Skip - Closed`, so hold activity cannot change the Wave 1 signal and a later listing closure cannot erase historical sent, reply, qualification, offer, funding, or won events.

Record these fields for every sent proposal:

- Listing ID.
- Category.
- Link or no-link variant.
- Sent timestamp.
- Proposal viewed when the platform exposes it.
- Buyer reply timestamp.
- Qualified yes or no.
- Blueprint or pilot path.
- Quoted amount.
- Funded amount.
- Objection text verbatim.
- Loss or archive reason.
- Delivery hours.
- Direct usage and vendor cost.
- Gross margin.

Use these fixed KPI definitions:

| KPI | Numerator | Denominator |
| --- | --- | --- |
| Reply rate | Listings with a buyer reply | Proposals sent |
| Qualified-reply rate | Qualified replies | Buyer replies |
| Blueprint-offer rate | Rows with Blueprint sales path and quoted amount | Qualified replies |
| Pilot-offer rate | Rows with Direct Pilot sales path and quoted amount | Qualified replies |
| Funded rate from sent | Rows with funded amount | Proposals sent |
| Funded rate from replies | Rows with funded amount | Buyer replies |
| Closed-presale rate | Funded milestones that satisfy the written presale definition | Proposals sent |

Reply, interview, funded-milestone, and won-pilot outcomes are authoritative funnel events.

They are not evidence of link-versus-no-link lift in this wave.

Never compare raw page visits without the number of proposals sent.

Do not pool variant outcomes across category, platform, language, or batch.

Use these release and evidence gates:

| Gate | Timing | Decision |
| --- | --- | --- |
| Operational | Before send and again within 4 hours | Stop linked sends immediately for a broken route, wrong category, policy violation, or off-platform CTA |
| Batch progression | 12-24 hours after the previous send window | Continue when routes and policy are clean and no repeated mismatch has appeared; revalidate every listing before sending |
| Message fit | After 72 hours from the last proposal in a batch | Pause one category if at least 2 independent buyer replies identify the same material mismatch or misleading claim |
| Category signal | 7 days after the last Wave 1 proposal | Mark a category `Promising - replicate`, not proven, when it produces at least 2 qualified replies or 1 funded milestone; otherwise keep it unproven |
| Validation priority | After at least 5 matching sends | Prioritize the next validation wave only when the category has a promising signal and no repeated material mismatch |
| Productization | After delivery evidence exists | Productize only after at least 2 independent funded milestones and positive gross margin on at least one delivered engagement |
| Category rejection | After at least 10 matching sent proposals | Reject only if there are 0 qualified replies plus at least 3 recorded mismatch or disqualification reasons that point to the offer itself |
| Lift research | After a baseline reply rate exists | Run a separately powered 1:1 randomized test within one category, platform, and language stratum |

If random assignment is impossible, call the later comparison observational and keep its conclusions directional.

</learning-wave>

## Platform and payment controls

<platform-controls>

For Upwork:

- Keep pre-contract messages, calls, and next-step requests inside Upwork.
- Link only the `/for/upwork/` route.
- Do not share email, phone, social profiles, calendar links, or public contact pages before the contract.
- Agree the milestone amount, deliverables, deadline, and acceptance test before starting.
- Do not begin work until the milestone is accepted and funded.

For FL.ru:

- Reply in the project thread first.
- Keep the first proposal tied to the listed problem.
- Use the matching Russian solution page only where the listing belongs to Client Inbox or Operations & Documents.
- Put the first paid scope and exclusions in writing before implementation.

Official references:

- [Upwork proposal workflow](https://support.upwork.com/hc/en-us/articles/211062998-How-to-submit-a-proposal-on-Upwork)
- [Upwork interview and scoping guidance](https://support.upwork.com/hc/en-us/articles/360048876254-Tips-for-interviewing-freelancers-and-scoping-your-project)
- [Upwork fixed-price milestones](https://support.upwork.com/hc/en-us/articles/211068218-How-to-use-milestones-in-fixed-price-jobs)
- [Upwork pre-contract interview rules](https://support.upwork.com/hc/en-us/articles/17942933929747--Interview-and-negotiate)

</platform-controls>

## Definition of a closed presale

<done>

A positive reply is not a sale.

A call is not a sale.

A verbal agreement is not a sale.

The presale is closed only when:

1. One workflow is written into the milestone.
2. Buyer inputs and access assumptions are written.
3. Human approval and exception behavior are written.
4. A measurable pass condition is written.
5. Exclusions are written.
6. The buyer accepts and funds the milestone.

Only then does Dali build the blueprint or product pilot.

</done>
