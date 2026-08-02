<document>
<meta>
Title: Сем unit economics.
Scope: Stress test the $200 to $300 agent subscription idea without selecting a market wedge.
Method: Treat every unstated number as an assumption.
Constraint: Do not replace the market reports, and do not widen scope into wedge selection.
</meta>

<summary>
This note separates value created from value captured.
It does not choose the market wedge.
It only tests whether a concierge AI service can plausibly turn David's access and Kora's current capabilities into ten paying customers at profitable unit economics.
The main correction is that the $200 to $300 example is not a linear scaling law.
It is a margin sketch that only works if shared seat cost, compute, human review, service delivery, support, acquisition, refunds, and payment friction stay below the surplus.
</summary>

<section name="Source ledger">
| Stable key | Source | Type and grade | Published or observed | Accessed | Exact evidence | Supports or refutes | Confidence | Red flags | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| local-thesis-ledger | `/Users/dav/Desktop/reprojects/kora-v2/docs/Сем/01-thesis-ledger.md` | Local derived control source, A | Current run | 2026-07-27 | The ledger records BUSINESS-01 through ECONOMICS-02, including the $200 to $300 premise, the 5x heuristic, the 10 customer target, and the autonomy constraint. | Supports the operating question and the explicit non-selection of a wedge. | High | It is a transcript-derived ledger, not market validation. | David / Сем |
| local-research-contract | `/Users/dav/Desktop/reprojects/kora-v2/docs/Сем/02-research-contract.md` | Local derived control source, A | Current run | 2026-07-27 | The contract requires a buyer and outcome before interface, forbids generic CRM replacement, and demands a first wedge that can be tested in a concierge pilot. | Supports the "do not pick the wedge yet" constraint. | High | It explicitly rejects fabricated buyer selection. | David / Сем |
| local-kora-reality | `/Users/dav/Desktop/reprojects/kora-v2/docs/Сем/evidence/01-kora-reality.md` | Local capability audit, A | Current run | 2026-07-27 | Kora already has task tracking, recurring schedules, marketplace search, onboarding, browser worker, local runtime, and connector surfaces in code and tests. | Supports the claim that service delivery can be built on real capability, not fantasy. | High | Capability is not the same as customer demand. | David / Сем |
| local-david-context | `/Users/dav/Desktop/reprojects/kora-v2/docs/Сем/evidence/02-david-context.md` | Local context audit, A | Current run | 2026-07-27 | David's documented network includes founders, VCs, builders, marketers, and older entrepreneurs, and the Telegram outreach rules are compliance constrained. | Supports warm access but also limits outreach design. | High | Reachability is not yet equivalent to willingness to pay. | David / Сем |
| openai-pro-tiers | https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers | Official product help, A | 2026-07-27 | OpenAI states that Pro $100 unlocks 5x usage versus Plus, Pro $200 unlocks 20x usage versus Plus, and the $200 plan remains the highest usage tier. | Supports the current seat-cost anchor and the non-linear usage buckets. | High | Usage allowance is not a fixed message count. | OpenAI |
| anthropic-pricing | https://www.anthropic.com/pricing | Official product pricing, A | 2026-07-27 | Anthropic shows Pro at $20/month, Max 5x at $100/month, and Max 20x at $200/month, with usage pooled across web, desktop, mobile, and Claude Code in rolling 5-hour windows. | Supports the current seat-cost anchor and the capacity ceiling. | High | The plan is usage bucketed, not truly unlimited. | Anthropic |
| openai-api-pricing | https://developers.openai.com/api/docs/pricing | Official API pricing, A | 2026-07-27 | OpenAI API pricing lists GPT-5.6 Sol and GPT-5.6 Terra with token-based input and output prices, and GPT-5.4-mini remains available at very low token cost. | Supports the claim that raw token cost is usually not the main margin problem. | High | Model choice and long-context usage can change the math sharply. | OpenAI |
| anthropic-api-pricing | https://platform.claude.com/docs/en/about-claude/pricing | Official API pricing, A | 2026-07-27 | Anthropic pricing lists Claude Sonnet 5 at $2 per million input tokens and $10 per million output tokens through August 31, 2026, then $3 and $15 from September 1, 2026. | Supports the claim that API compute can stay cheap if the workload is disciplined. | High | Pricing changes after August 31, 2026 are already scheduled. | Anthropic |
| stripe-pricing | https://stripe.com/pricing | Official payments pricing, A | 2026-07-27 | Stripe's standard card pricing starts at 2.9% plus 30 cents in the US-facing pricing view. | Supports the payment-friction line item. | High | Geography and payment method can change the effective rate. | Stripe |
| sba-break-even | https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point/calculate | Official government guidance, A | 2026-07-27 | SBA gives the break-even formula as fixed costs divided by price minus variable costs. | Supports the algebra used below. | High | The calculator is generic and does not know this product's cost shape. | SBA |
| bofa-pricing | https://business.bankofamerica.com/en/resources/how-to-price-a-product-or-service | Business education, B | 2026-07-27 | Bank of America notes that pricing depends on cost, demand, and willingness to pay, and that value-based pricing keys off customer outcome. | Supports the claim that no universal 5x rule exists. | Medium | It is an educational article, not a regulator. | Bank of America |
</section>

<section name="Pricing anchors">
OpenAI ChatGPT Pro currently has $100 and $200 tiers, and the $200 tier remains the highest usage tier.  
Anthropic Claude Pro is $20 per month, Claude Max 5x is $100 per month, and Claude Max 20x is $200 per month.  
Anthropic also says Max usage is pooled across web, desktop, mobile, and Claude Code in rolling 5-hour windows, so seat scaling is not a simple linear multiplier.  
OpenAI API pricing and Anthropic API pricing both show that token compute is currently cheap relative to human labor when usage is disciplined.  
Stripe's standard card fee is small in absolute terms, but it still matters at low ticket sizes because fixed cents per payment are regressive.  
SBA's break-even formula is the right base model for this note.  
</section>

<section name="Equations">
Customer value created = measured customer-side economic gain.  
Price/value captured = fee actually collected.  
Gross revenue = collected fee before refunds and payment friction.  
Subscription/tool cost = shared seat or workspace cost needed to operate the service.  
Model/compute cost = token, tool-call, and rerun cost.  
Human review = manual checking, correction, and approval time.  
Service delivery = the execution labor required to finish the outcome.  
Support = customer questions, exceptions, and follow-up.  
Acquisition = time or cash spent to win the customer.  
Refunds/failures = reserve for non-delivery, churn, disputes, and chargebacks.  
Tax/payment friction = remittance or processor drag that reduces collected cash.  
Contribution profit = gross revenue minus all of the above costs.  

Let `S` be shared subscription/tool cost per month.  
Let `n` be active customers served by that seat.  
Let `m`, `h`, `d`, `u`, `a`, `r`, `f`, and `t` be per-customer model, human review, delivery, support, acquisition, refund, failure, and tax/payment terms.  
Then contribution profit per customer is `p - (S / n) - m - h - d - u - a - r - f - t`.  
Then cohort contribution profit is `n * p - S - n * (m + h + d + u + a + r + f + t)`.  
Break-even revenue per customer is `(S / n) + m + h + d + u + a + r + f + t`.  
If price is outcome-based, then `price = take_rate * realized_value`, and break-even realized value is break-even revenue divided by take rate.  
</section>

<section name="Corrected read">
The correct read of the USD 200 to USD 300 example is that one unit has only USD 100 of gross surplus before other costs.  
It is not a law that 10 subscriptions become USD 1,000 of profit.  
It is only true if the shared seat can be amortized, the model cost stays low, the review load stays bounded, the support burden stays small, the acquisition cost is near warm-network levels, and failures are not correlated.  
The right question is therefore not "can one customer pay more than the subscription".  
The right question is "can the tenth customer still be served without the seat, review, and failure costs rising faster than revenue".  
</section>

<section name="Why scaling is not linear">
<diagram>
Shared seat
  |
  +-- model calls
  +-- human review
  +-- service delivery
  +-- support
  +-- acquisition
  +-- refunds and failures
</diagram>

The subscription seat behaves like a shared fixed cost until utilization saturates.  
The model bill behaves like a mostly variable cost until the workflow uses long context, retries, or expensive tool calls.  
Human review is the main nonlinearity because one bad batch can force rework across many customers.  
Customer concentration is another nonlinearity because one large account can dominate revenue, support time, and risk exposure.  
Correlated failure matters because the same bad prompt, connector outage, or policy issue can hit multiple customers at once.  
Quality review does not fall to zero with scale because batch inspection and exception handling remain mandatory.  
This is why "10 seats" can be cheaper than "1 seat times 10" only when the service is genuinely shareable.  
</section>

<section name="Current cost anchors">
At current OpenAI API pricing, GPT-5.6 Terra is priced at USD 1.25 per million input tokens and USD 7.50 per million output tokens in the short-context schedule, with higher long-context pricing also published.  
At current Anthropic API pricing, Claude Sonnet 5 is USD 2 per million input tokens and USD 10 per million output tokens through August 31, 2026.  
That means a lean month of 100k input tokens and 20k output tokens is only about USD 0.275 on GPT-5.6 Terra short-context pricing, or about USD 0.40 on Claude Sonnet 5 introductory pricing.  
So compute is usually not the first-order margin risk.  
Seat cost, review cost, acquisition cost, and failure rate are usually the first-order risks.  
</section>

<section name="Assumptions">
All numbers below are assumptions.  
They are deliberately conservative enough to expose where the model breaks.  
They are not claims about measured customer behavior.  

Assumed monthly cost stack for the one-customer case.  
Subscription/tool cost = USD 200.0.  
Model/compute cost = USD 4.0.  
Human review = USD 25.0.  
Service delivery = USD 20.0.  
Support = USD 10.0.  
Acquisition = USD 25.0.  
Refunds/failures = 5% of gross revenue.  
Tax = USD 0.0 in the base case because the tax treatment is unresolved.  
Payment friction = Stripe card fee at 2.9% plus USD 0.30 per payment.  

Assumed monthly cost stack for the ten-customer case.  
Subscription/tool cost per customer = USD 20.0, which is one USD 200 seat amortized across ten customers.  
Model/compute cost = USD 2.0.  
Human review = USD 10.0.  
Service delivery = USD 15.0.  
Support = USD 6.0.  
Acquisition = USD 10.0.  
Refunds/failures = 5% of gross revenue.  
Tax = USD 0.0 in the base case because the tax treatment is unresolved.  
Payment friction = Stripe card fee at 2.9% plus USD 0.30 per payment.  
</section>

<section name="Scenarios">
### One customer
| Pricing mode | Customer value created | Price/value captured | Gross revenue | Subscription/tool cost | Model/compute cost | Human review | Service delivery | Support | Acquisition | Refunds/failures | Tax | Payment friction | Contribution profit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Fixed price USD 100 | 300.0 | 100.0 | 100.0 | 200.0 | 4.0 | 25.0 | 20.0 | 10.0 | 25.0 | 5.0 | 0.0 | 3.2 | -192.2 |
| Fixed price USD 200 | 300.0 | 200.0 | 200.0 | 200.0 | 4.0 | 25.0 | 20.0 | 10.0 | 25.0 | 10.0 | 0.0 | 6.1 | -100.1 |
| Outcome-based at 30% of realized value | 300.0 | 90.0 | 90.0 | 200.0 | 4.0 | 25.0 | 20.0 | 10.0 | 25.0 | 4.5 | 0.0 | 2.9 | -201.4 |

### Ten customers
| Pricing mode | Customer value created | Price/value captured | Gross revenue | Subscription/tool cost | Model/compute cost | Human review | Service delivery | Support | Acquisition | Refunds/failures | Tax | Payment friction | Contribution profit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Fixed price USD 100 | 300.0 | 100.0 | 100.0 | 20.0 | 2.0 | 10.0 | 15.0 | 6.0 | 10.0 | 5.0 | 0.0 | 3.2 | 28.8 |
| Fixed price USD 200 | 300.0 | 200.0 | 200.0 | 20.0 | 2.0 | 10.0 | 15.0 | 6.0 | 10.0 | 10.0 | 0.0 | 6.1 | 120.9 |
| Outcome-based at 30% of realized value | 300.0 | 90.0 | 90.0 | 20.0 | 2.0 | 10.0 | 15.0 | 6.0 | 10.0 | 4.5 | 0.0 | 2.9 | 19.6 |

The tables show the core asymmetry.  
One customer does not support the shared seat in this conservative base case.  
Ten customers can support the seat if review and acquisition stay lean.  
The difference comes from fixed cost dilution, not magic.  
</section>

<section name="Break-even">
With the one-customer assumption set, break-even revenue is about USD 309.4 per month before tax.  
With the ten-customer assumption set, break-even revenue is about USD 68.6 per customer per month before tax.  
For outcome-based pricing at a 30% take rate, the break-even realized value is about USD 1,031 per customer per month for the one-customer case.  
For outcome-based pricing at a 30% take rate, the break-even realized value is about USD 229 per customer per month for the ten-customer case.  
That means the USD 300 value example is viable only after the model is shared across a cohort, not while it is serving one customer on its own.  
</section>

<section name="Minimum measurement ledger">
| Metric | Artifact | Cadence | Continue threshold | Kill threshold |
| --- | --- | --- | --- | --- |
| Customer value created | Before and after artifact from the buyer's workflow | Per pilot | The buyer can point to a concrete gain or avoided loss. | The buyer cannot identify a measurable gain. |
| Price/value captured | Invoice and payment record | Per payment | Collected cash is at least 2x the payment friction. | The buyer will only pay symbolic money. |
| Subscription/tool cost | Subscription invoice or seat count | Monthly | One seat can support multiple customers without hard throttling. | The seat cost must scale one-to-one with each customer. |
| Model/compute cost | API usage log | Weekly | Token cost stays sub-dollar or low-single-digit per customer. | Reruns and tool calls explode the bill. |
| Human review | Review log and correction count | Weekly | Manual review stays below 25% of gross revenue. | Review keeps rising as usage rises. |
| Service delivery | Time log | Weekly | Delivery work is reproducible and bounded. | Delivery requires bespoke heroics every time. |
| Support | Inbox or ticket log | Weekly | Support stays small and mostly exception-based. | Support becomes the main work. |
| Acquisition | Outreach log and close rate | Per cohort | Warm access produces a credible path to ten buyers. | Each sale requires cold, expensive, or slow acquisition. |
| Refunds/failures | Refund and incident log | Monthly | Refunds and major failures stay near zero. | One failure cascades into several accounts. |
| Tax/payment friction | Processor statement and tax treatment memo | Monthly | Payment friction is understood and stable. | Payment and tax treatment remain undefined. |
</section>

<section name="Kill criteria">
Kill the model if one paid pilot does not produce a measurable customer gain.  
Kill the model if three serious conversations do not produce a believable willingness to pay.  
Kill the model if the shared seat cannot serve ten customers without either queueing or manual rescue.  
Kill the model if human review plus acquisition exceed gross revenue for more than one pilot cycle.  
Kill the model if correlated failures create multi-account damage or support chaos.  
Kill the model if the buyer must replace the CRM before value appears.  
</section>

<section name="What makes it attractive">
The model becomes attractive when a customer already has a recurring or event-triggered workflow, already spends money on the workaround, and can show a measurable outcome in under seven days.  
It also needs a shared seat to stay busy enough that the fixed cost is diluted across multiple customers.  
It becomes better if the first 10 customers are reachable through David's existing network instead of paid acquisition.  
It becomes better if the work is mostly reversible or human-reviewed, because that reduces the failure reserve.  
It becomes better if the same workflow creates reusable data, templates, or eval loops that lower future review cost.  
</section>

<section name="Facts, inferences, unknowns">
<facts>
OpenAI and Anthropic both currently publish pro-grade subscription tiers at USD 100 and USD 200.  
OpenAI and Anthropic both currently publish token-based API pricing that is low enough that compute is usually not the dominant cost in a lean pilot.  
Stripe card fees are real even at small ticket sizes.  
SBA's break-even algebra is the correct base accounting frame.  
Kora already has real execution surfaces in the repo, and David already has documented network access in the relevant founder and builder circles.  
</facts>

<inferences>
The first-order margin risk is not raw tokens.  
The first-order margin risk is the mix of shared seat utilization, human review, acquisition, and correlated failure.  
A single customer is usually too thin for a USD 200 seat unless the outcome is much larger than USD 300 or the seat is already being amortized elsewhere.  
Ten customers can work if the service is shareable, the review loop is tight, and the customers are reachable without large CAC.  
</inferences>

<unknowns>
Actual willingness to pay for the eventual wedge is unknown.  
Actual hours of human review per customer are unknown.  
Actual acquisition cost from David's network is unknown.  
Actual failure correlation across accounts is unknown.  
Actual tax treatment is unknown until the buyer and legal structure are known.  
Actual token usage per customer is unknown.  
</unknowns>
</section>

<section name="Sensitivity">
The three most sensitive variables are shared seat utilization, human review load, and acquisition cost.  
Shared seat utilization matters because it determines whether a USD 200 plan is a fixed cost shared by ten customers or a deadweight line item for one customer.  
Human review load matters because every extra manual correction hits margin directly and also slows throughput.  
Acquisition cost matters because warm access can make the first ten customers cheap or expensive depending on how much founder time is really required.  
Model/compute cost is not in the top three under current official pricing unless the workflow becomes long-context heavy or retry heavy.  
</section>

<section name="Bottom line">
The transcript's USD 200 to USD 300 idea is directionally plausible only as a shared-service model, not as a single-customer business.  
The corrected unit economics are closer to "one seat can support a cohort if review stays low" than to "one subscription automatically creates five times its cost in cash".  
Before any wedge selection, the next proof is a concierge pilot that measures value created, manual review time, and close rate on the actual warm network.  
</section>
</document>
