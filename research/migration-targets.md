# Assistants API Migration Outreach Targets

Task B1 output.
Context: OpenAI removes /v1/assistants, /v1/threads, /v1/runs on Aug 26, 2026 (24 days from 2026-08-02).
Azure OpenAI Assistants retires in the same window.
Offer: fixed-price migration to Responses + Conversations API, $1,900-4,500.

Method notes.
GitHub code search was run authenticated via gh (queries: `client.beta.assistants.create`, `openai.beta.threads.runs`, `beta.threads.createAndRun`, `AssistantEventHandler`; 396 raw hits, 338 unique repos).
Every repo listed below was verified to contain real `openai.beta.assistants` / `beta.threads` calls at the quoted file path, and to have commits in 2025-2026.
Forum targets come from the official deprecation megathread.
Reddit lane returned nothing usable (reddit.com blocks the crawler; no indexed posts surfaced).
grep.app API was rate-limited (429) and replaced by authenticated GitHub search.

Tiers: TOP = clear company with revenue, gets Loom video. STD = personalized email. LOW = weak fit, contact only if pipeline is dry.

## Targets

| # | Company / person | Evidence (artifact URL) | What breaks on Aug 26 | Contact path | Tier |
|---|---|---|---|---|---|
| 1 | SJ Innovation (CollabAI) | github.com/sjinnovation/CollabAI - `server/lib/openai.js` (`openai.beta.assistants.create`), active to 2025-08 | Their self-hosted AI platform for SMBs (collabai.software): every customer-created assistant and chat thread stops responding | sjinnovation.com contact form; LinkedIn /company/sj-innovation | TOP |
| 2 | MBtek (HVAC e-commerce) | github.com/Luciano-MBtek/mbtek-sales-manager - `src/actions/openAi/createAIresponse.ts` (`openai.beta.threads.createAndRun`) | Internal AI sales manager app (mbtek-sales.vercel.app) used by the sales team goes dead | GitHub profile Luciano-MBtek (dev); mbtek.com contact | TOP |
| 3 | Chat Data LLC | github.com/chat-data-llc/ai-assistant-chat-data-integration (product repo: "Integrate the OpenAI assistant API to Website, Slack, Discord, Whatsapp without code") | Core product feature: customers plug their OpenAI assistant ID into chat-data.com; all those channels break at once | chat-data.com support email / contact form | TOP |
| 4 | Converso | converso.ai/blog/how-to-add-oaiassistants-to-your-website-or-whatsapp: "This enables us to use the Assistants API to connect your Assistant to our platform" | Their bring-your-own-assistant integration for website and WhatsApp inboxes stops working for every connected customer | converso.ai/contact; LinkedIn /company/conversoworld | TOP |
| 5 | DigiPress Apps | github.com/DigiPressApps/dpa-ai-assistant - `src/util/open-ai/assistants.js` (`openai.beta.assistants.create/list/retrieve`), pushed 2025-12 | Paid WordPress plugin "AI Assistant" (dpapps.net/plugins/ai-assistant): the assistants-backed chatbot mode fails on every customer site | dpapps.net contact form | TOP |
| 6 | AgentVoiceResponse | github.com/agentvoiceresponse/avr-llm-openai-assistant - `index.js` (`openai.beta.threads.create`, `runs.list`) | Their OpenAI Assistant LLM connector for voice agents (agentvoiceresponse.com): live phone conversations powered by threads/runs die | agentvoiceresponse.com contact; GitHub org issues; their Discord | TOP |
| 7 | Signalco (doprocess) | github.com/signalco-io/signalco - `web/apps/doprocess/app/api/processes/[id]/task-definitions/suggestions/route.ts` (`beta.threads.createAndRun`), active 2026-07 | AI task-suggestion endpoint in their doprocess product returns 404s | signalco.io contact; GitHub org | STD |
| 8 | Andor2.cz (Czech RPG portal) | github.com/AndorCz/andor2 - `src/lib/openai.js` (`beta.assistants.create`, `beta.threads.runs.create`), active 2026-07 | AI storyteller / character chat on the live andor2.cz community site | GitHub org AndorCz; site admin contact on andor2.cz | STD |
| 9 | Etabli (beta.gouv.fr) | github.com/betagouv/etabli - `src/features/llm-openai.ts` (`beta.assistants.create/list`), active 2026-06 | Conversational search over French public digital initiatives (etabli.incubateur.net) | GitHub issues; beta.gouv.fr contact. Public sector, procurement is slow - treat as long shot | STD |
| 10 | jailbreakme.xyz | github.com/jailbreakme-xyz/jailbreak - `backend/services/llm/openai.js` (`beta.threads.create`, `messages.list`) | The dApp's core jailbreak-the-LLM chat challenges stop running | GitHub org; X/Twitter linked from jailbreakme.xyz | STD |
| 11 | SlabStak (MurphbeckTech) | github.com/MurphbeckTech/slabstak - `scan.py` (`beta.threads.runs.create`), pushed 2026-01 | AI scan/grading pipeline behind slabstak.vercel.app breaks | GitHub org MurphbeckTech | STD |
| 12 | Reactiflux (reactibot) | github.com/reactiflux/reactibot - `src/features/resume.ts` (`beta.assistants.update`, `beta.threads.create`), active 2026-05 | Resume-review bot feature in the 200k-member Reactiflux Discord | GitHub issues; Reactiflux Discord mods. Community project, no revenue | STD |
| 13 | Allan Bunch (node-red-openai-api) | github.com/allanbunch/node-red-openai-api - `src/runs/methods.js` (`beta.threads.createAndRun`), npm @inductiv/node-red-openai-api, active 2026-06 | Every Node-RED flow using his assistants/threads/runs nodes breaks for all package users | GitHub profile allanbunch; npm package page (Inductiv) | STD |
| 14 | Promptbook (webgptorg) | github.com/webgptorg/promptbook - `src/llm-providers/openai/OpenAiAssistantExecutionToolsToolRunner.ts`, active daily | The OpenAI Assistant provider in their ptbk.io product stops executing | ptbk.io contact; GitHub org webgptorg | STD |
| 15 | WebTwin (Sirio Berati) | github.com/sirioberati/WebTwin - README documents its own `client.beta.assistants.create` / `beta.threads` pipeline, 401 stars, pushed 2026-06 | The digital-twin persona chat backend breaks | GitHub profile sirioberati; Instagram @heysirio (large audience) | STD |
| 16 | Amaru AI (cmarin) | github.com/cmarin/amaruai - `fastapi/app/config/openai_assistant_utils.py` (`beta.threads.create`), pushed 2026-03 | Document processing / transcription workflows on amaruai.vercel.app | GitHub profile cmarin | STD |
| 17 | Effective Gain (WhatsApp CRM, BR) | github.com/Effective-Gain-2/crm - `services/OpenAi.js` (`beta.threads.createAndRun`), pushed 2026-06 | AI replies inside their WhatsApp-integrated CRM | GitHub org Effective-Gain-2 | STD |
| 18 | WildfireGPT (Argonne National Lab) | github.com/project-araia/WildfireGPT - `src/utils.py` (`client.beta.assistants.create`), Nature-published tool | The published climate-risk chat tool stops working | GitHub issues; corresponding authors on the Nature paper | STD |
| 19 | Peter_Harrison (forum) | community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666 - "I've been building a product around it. And now I'm being told there is a new API." | His whole product built on Assistants | Forum DM: community.openai.com/u/peter_harrison | STD |
| 20 | KathSeaCat (forum, agency) | Same thread, page 2 - "My clients use assistants available from the dashboard and I give them the opportunity to use my app via Assistants API." | Multi-client app; every client assistant dies at once. Multiplied deal value | Forum DM: community.openai.com/u/kathseacat | STD |
| 21 | wolfcatalyst (forum, law office) | Same thread - uses assistants dashboard for a law office, values single-pane tracking | Law-office assistant workflows and stakeholder demos | Forum DM: community.openai.com/u/wolfcatalyst | STD |
| 22 | markcockburn (forum) | Same thread, page 2 - production users upload .docx for summarization; blocked because new prompts lack .docx support | Document summarization app; he has a named migration blocker we can solve (docx conversion) | Forum DM: community.openai.com/u/markcockburn | STD |
| 23 | BuddyBot | wordpress.org/plugins/buddybot-ai-custom-ai-assistant-and-chat-agent/ - "integrates directly with OpenAI Assistants API", vector store sync, updated 2025-09 | Plugin's entire architecture (assistants + vector stores) breaks on ~90+ customer sites | buddybot.ai contact; wordpress.org support forum | STD |
| 24 | S2B AI Assistant | wordpress.org/plugins/s2b-ai-assistant/ - "content-aware functionality OpenAI Assistant API and RAG" | Assistant-API chatbot mode across customer WordPress sites | Plugin author via wordpress.org profile / plugin site | STD |
| 25 | merkulove (Helper plugin) | codecanyon.net/item/openai-chatbot-for-wordpress-helper/46699667 - sells "Assistant API support" as a feature | Assistant mode of a paid CodeCanyon chatbot with an existing buyer base | merkulove.com contact; CodeCanyon comments | STD |
| 26 | Checkly (srebot) | github.com/checkly/srebot - `src/ai/Assistant.ts` (`beta.threads.runs.stream`, `createAndPoll`) | Internal SRE bot; repo dormant since 2025-03, may already be shelved | GitHub issues; checklyhq.com. Real company but weak signal | LOW |
| 27 | ryo-ma (gpt-assistants-api-ui) | github.com/ryo-ma/gpt-assistants-api-ui - `app.py`, 248 stars, active 2025-06 | Popular OSS assistants chat UI; its deployers all break | GitHub profile ryo-ma. No company behind it | LOW |
| 28 | Lambdua (openai4j) | github.com/Lambdua/openai4j - Java SDK with full Assistants-v2 support, 375 stars | Assistants module of the SDK; downstream Java apps break | GitHub profile Lambdua. Library maintainer, not an end product | LOW |
| 29 | Qualty (api-doctor) | github.com/qualtyco/api-doctor - `src/providers/openai/manifest.ts` lists `beta.assistants.*` surface, active 2026-08 | Their OpenAI provider manifest goes stale; product itself does not run assistants in production | apidoctor.co; GitHub org qualtyco | LOW |
| 30 | Zapier (ChatGPT integration) | help.zapier.com article "Important update: ChatGPT users - OpenAI Assistants API deprecation" | Existing Zaps using ChatGPT assistant actions | Already publicly migrating on their own. Do not pitch; reference only | LOW |

## Notes on skipped / disqualified finds

supercorp-ai/supercompat and datastax/astra-assistants-api sell Assistants-compatibility layers.
They are competitors or partners, not migration prospects.
JocysCom/VsAiCompanion only bundles the OpenAI openapi.yaml spec; no verified runtime assistants calls, so it was dropped.
molecule-dev/molecule defines its own `AssistantEventHandler` type unrelated to OpenAI threads; dropped.
Tutorial, course, hackathon, and sample repos (cxbxmxcx/GPT-Agents, esponges/openai-beta-assistant, supershaneski samples, IntelligenzaArtificiale, etc.) were excluded per rules.

## Suggested attack order

1. TOP six first (rows 1-6), each with a Loom showing their exact file or integration page and the failing endpoint.
2. Forum four next (rows 19-22): they are already scared, and KathSeaCat is a multi-assistant agency deal.
3. WordPress/plugin vendors (rows 23-25): one migration engagement can be productized across their customer base.

## Reply log

| Date | Target | Channel | Outcome |
|---|---|---|---|
