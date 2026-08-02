# Migration Outreach: First 10 Email Drafts (Task B9)

Status: DRAFTS ONLY. Nothing here has been sent.

> **NOTE: the writeup URL https://daliagents.com/blog/openai-assistants-api-shutdown-migration goes live only after deploy. Do not send any of these before the blog post is deployed and the URL returns 200.**

## Send protocol reminder

1. Max 25-30 outreach messages per day, total across all channels.
2. One follow-up per target, after 4 days of silence, then stop.
3. Log every reply in the Reply log table in `research/migration-targets.md`.
4. Do not send until the blog post is deployed and the link is verified live.
5. Do not send until David has reviewed and OK'd each draft.

Target selection: 10 best STD-tier targets with a direct written contact path (contact form, email, or forum DM as listed in `migration-targets.md`).
TOP tier (rows 1-6) skipped: they get Loom videos from David.
Etabli (row 9) skipped as a public-sector procurement long shot per the targets file.
GitHub-issues-only and social-only targets (rows 10, 11, 15, 16, 17) and the no-revenue community project (row 12) skipped.

---

## Draft 1: Signalco (doprocess) - row 7

**Contact path:** signalco.io contact form (fallback: GitHub org signalco-io)

**Subject:** Your doprocess suggestions route.ts and the Aug 26 shutdown

Hi,

Saw github.com/signalco-io/signalco - the doprocess suggestions route (`task-definitions/suggestions/route.ts`) calls `beta.threads.createAndRun`.
OpenAI removes /v1/threads and /v1/runs on Aug 26; that endpoint will not degrade, it will stop.
I can send a written diagnosis: every breaking call in the repo, what each takes down, and a 2-week migration plan to the Responses API. No call needed.
Even without us: freeze changes to that flow and export your thread data before Aug 26 - threads are not retrievable after the shutdown.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 2: Andor2.cz - row 8

**Contact path:** Site admin contact on andor2.cz (fallback: GitHub org AndorCz)

**Subject:** andor2's src/lib/openai.js stops working on Aug 26

Hi,

Saw github.com/AndorCz/andor2 - `src/lib/openai.js` uses `beta.assistants.create` and `beta.threads.runs.create` for the AI storyteller.
Those endpoints are removed on Aug 26; the storyteller and character chat on andor2.cz will not slow down, they stop mid-game.
I can send a written diagnosis: which calls break, what each takes down, and a 2-week migration plan. No call needed.
Even if you handle it yourselves: freeze that code and export thread data before Aug 26 - threads cannot be retrieved after the shutdown.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 3: Allan Bunch / Inductiv (node-red-openai-api) - row 13

**Contact path:** npm package page @inductiv/node-red-openai-api (Inductiv contact), fallback GitHub profile allanbunch

**Subject:** src/runs/methods.js in node-red-openai-api and Aug 26

Hi Allan,

Saw github.com/allanbunch/node-red-openai-api - `src/runs/methods.js` wraps `beta.threads.createAndRun`, so every Node-RED flow on your assistants and runs nodes hits the Aug 26 removal.
Those endpoints will not degrade that day; they error for every package user at once.
I can send a written diagnosis: which nodes break, what a Responses-backed version looks like, and a 2-week migration plan. No call needed.
Worth telling users regardless: freeze flow changes and export thread data before Aug 26 - threads are not retrievable after.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 4: Promptbook / webgptorg - row 14

**Contact path:** ptbk.io contact form (fallback: GitHub org webgptorg)

**Subject:** OpenAiAssistantExecutionTools and the Aug 26 endpoint removal

Hi,

Saw github.com/webgptorg/promptbook - `src/llm-providers/openai/OpenAiAssistantExecutionToolsToolRunner.ts` runs on the Assistants API.
OpenAI removes /v1/assistants, /v1/threads and /v1/runs on Aug 26; that provider will not degrade, it stops executing for everyone using it through ptbk.io.
I can send a written diagnosis: the exact breaking surface, what it takes down for your users, and a 2-week migration plan to Responses. No call needed.
Even if you migrate in-house: freeze that provider and export thread data before Aug 26 - threads are not retrievable after the shutdown.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you option: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 5: WildfireGPT / Argonne National Lab - row 18

**Contact path:** Corresponding author emails on the Nature paper (fallback: GitHub issues on project-araia/WildfireGPT)

**Subject:** WildfireGPT's src/utils.py and the Aug 26 Assistants API removal

Hi,

Saw github.com/project-araia/WildfireGPT - `src/utils.py` calls `client.beta.assistants.create`, so the published tool depends on the Assistants API.
OpenAI removes that API on Aug 26; the tool will not degrade, it will stop.
I can send a written diagnosis: each breaking call, what it takes down, and a 2-week migration plan to the Responses API. No call needed.
Even if your team migrates it internally: freeze changes and export thread data before Aug 26 - threads are not retrievable after the shutdown.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 6: KathSeaCat (agency, multi-client) - row 20

**Contact path:** Forum DM: community.openai.com/u/kathseacat

**Subject:** Your multi-client assistants setup after Aug 26

Hi,

Saw your post in the deprecation thread - your clients use dashboard assistants and reach them through your app via the Assistants API.
On Aug 26 that API is removed; every client assistant stops at once, and they will all call you.
I can send a written diagnosis: what breaks, its Responses equivalent, and a 2-week migration plan sized for multiple clients. No call needed.
Even if you migrate solo: freeze changes and export every client's thread data before Aug 26 - threads are not retrievable after.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 7: markcockburn (.docx summarization) - row 22

**Contact path:** Forum DM: community.openai.com/u/markcockburn

**Subject:** Your .docx summarization flow and the Aug 26 cutoff

Hi Mark,

Saw your deprecation-thread post - production users upload .docx for summarization, and the new prompts stack lacks .docx support.
The Assistants API behind those uploads is removed on Aug 26; the flow will not degrade, it stops.
The .docx gap is solvable with a conversion step in front of the Responses API. I can send a written diagnosis mapping that path plus a 2-week migration plan. No call needed.
Meanwhile: freeze changes and export thread data before Aug 26 - threads are not retrievable after.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 8: BuddyBot - row 23

**Contact path:** buddybot.ai contact form (fallback: wordpress.org support forum for the plugin)

**Subject:** BuddyBot's Assistants API integration and Aug 26

Hi,

Saw the BuddyBot listing on wordpress.org - the plugin "integrates directly with OpenAI Assistants API" with vector store sync.
OpenAI removes the Assistants API on Aug 26; chat on every customer site running BuddyBot stops the same day.
I can send a written diagnosis: which plugin components break, the Responses architecture that replaces them, and a 2-week migration plan. No call needed.
Even if you rebuild in-house: freeze assistant-side changes and have customers export thread data before Aug 26 - threads are not retrievable after.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 9: S2B AI Assistant - row 24

**Contact path:** Plugin author via wordpress.org profile / plugin site

**Subject:** S2B AI Assistant's Assistant API mode stops Aug 26

Hi,

Saw the S2B AI Assistant page on wordpress.org - the plugin's content-aware functionality is built on the "OpenAI Assistant API and RAG".
OpenAI removes that API on Aug 26; the chatbot mode on your customers' sites will not degrade, it stops responding.
I can send a written diagnosis: which features break, their Responses equivalents, and a 2-week migration plan. No call needed.
Even if you port it yourself: freeze the assistant mode and export thread data before Aug 26 - threads are not retrievable after.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)

---

## Draft 10: merkulove (Helper plugin) - row 25

**Contact path:** merkulove.com contact form (fallback: CodeCanyon item comments)

**Subject:** Helper's Assistant API mode and the Aug 26 shutdown

Hi,

Saw the Helper chatbot listing on CodeCanyon - "Assistant API support" is sold as a named feature.
OpenAI removes that API on Aug 26; the assistant mode stops on every buyer site, and the reviews land on your item page.
I can send a written diagnosis: which parts of the assistant mode break, the Responses-based replacement, and a 2-week migration plan. No call needed.
Whatever you decide: freeze that feature and tell buyers to export thread data before Aug 26 - threads are not retrievable after.
Details: https://daliagents.com/blog/openai-assistants-api-shutdown-migration
Done-for-you: fixed price from $1,900, 1-2 weeks, eval runs before and after, zero-downtime cutover. If the acceptance test does not pass, you do not pay.

David, Dali Agents (daliagents.com)
