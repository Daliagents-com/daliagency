# 100 GPT-style questions (gaps) + 25 answering posts

**Date:** 2026-07-31  
**Basis:** existing 82 EN posts + GEO/AEO research (citations, questions, production agents, vibe-code, automation)  
**Rule:** questions people ask ChatGPT/Claude that our blogs do **not** fully answer yet  
**Delivery:** each question maps to one of **25 new posts** (cluster answers, not 100 thin pages)

Inventory of new posts: [blog-batch-gpt-gaps-25.md](./blog-batch-gpt-gaps-25.md)

---

## How this was chosen

Covered already (skip / only deep-link): hire agency, pricing bands, gates intro, vibe rescue checklists, lead/inbox/ops use cases, GEO basics, RFP templates, demo vs production definitions.

**Gaps** people still ask LLMs about:

- multi-agent vs one agent  
- RAG / memory / evals / cost  
- prompt injection & tool abuse  
- Zapier/n8n vs “real agents”  
- channels (WhatsApp/Slack)  
- browser/computer-use agents  
- privacy/GDPR/PII  
- multi-tenant agency isolation  
- rollout (shadow/canary)  
- reliability (retries, queues, idempotency)  
- industry verticals  
- vibe-code auth/DB/payments/CI/SEO  

---

## 100 questions (GPT-style)

### Multi-agent, architecture, taxonomy (1–12)

1. Should I use multi-agent orchestration or one agent with tools?  
2. What is the difference between an AI agent, a chatbot, a copilot, and RPA?  
3. When is LangChain / CrewAI / AutoGen worth it for a business ops agent?  
4. Do I need a planner agent and a worker agent separately?  
5. How do agents call tools safely (permissions, scopes)?  
6. What is tool calling vs plain prompting?  
7. How do I stop an agent from looping forever?  
8. Single LLM call workflow vs agent loop - which for CRM updates?  
9. Can one agent own sales + support + ops?  
10. What is an agent “graph” and when is it overkill?  
11. How do browser agents / computer-use agents differ from API agents?  
12. Are OpenAI Assistants / AgentKit enough or do I need custom code?

### RAG, memory, knowledge (13–22)

13. Do production agents need RAG or is a long system prompt enough?  
14. How should I chunk docs for an agent knowledge base?  
15. Vector DB vs plain search for internal SOPs?  
16. How do I keep agent answers cited and grounded?  
17. What memory should agents keep across sessions?  
18. How do I prevent the agent from using outdated policies?  
19. Can the agent read our Notion/Google Drive safely?  
20. How big can a knowledge base be before quality drops?  
21. Should each client (agency) have a separate knowledge index?  
22. How do I evaluate retrieval quality, not just chat quality?

### Reliability, evals, cost, observability (23–36)

23. How do I test an AI agent before production?  
24. What is an agent eval set with golden cases?  
25. How do I measure hallucination rate for tool-using agents?  
26. How do I control LLM spend per agent run?  
27. GPT-4.1 vs Claude vs open models for ops agents - how to choose?  
28. Do I need fallback models when the primary is down?  
29. What should I log for each agent action?  
30. How do I trace a bad tool call after the fact?  
31. What dashboards matter for agent ops?  
32. How do retries work without double-charging a customer?  
33. What is idempotency for agent actions?  
34. Should agent jobs go through a queue?  
35. How do I set timeouts and budgets per run?  
36. What is shadow mode / canary for agents?

### Security, privacy, abuse (37–48)

37. What is prompt injection against a tool-using agent?  
38. How do I defend against malicious emails/PDFs in agent inputs?  
39. Can agents leak PII into logs or third-party model APIs?  
40. GDPR: can we send EU customer data to a US LLM API?  
41. Do we need a DPA with the model provider?  
42. How do I redact PII before the model sees it?  
43. OAuth for agents: least privilege patterns?  
44. How long should we retain agent audit logs?  
45. What is an agent incident response playbook?  
46. Who is liable if an agent sends a wrong quote or refund?  
47. How do multi-tenant agency agents isolate client data?  
48. Are “shared prompts” across clients a compliance risk?

### Automation stack choices (49–58)

49. Zapier/Make vs n8n vs custom agents - when each wins?  
50. Is n8n + LLM already a production agent?  
51. When is classic RPA better than an LLM agent?  
52. Can I replace a junior ops hire with Zapier AI?  
53. How do webhooks + agents avoid double processing?  
54. Should the agent write SQL directly to production?  
55. Event-driven agents vs cron batch agents?  
56. How do I version prompts and workflows like code?  
57. Feature flags for agent behavior changes?  
58. Blue/green or staged rollout for agent prompts?

### Channels & vertical workflows (59–72)

59. How do WhatsApp business agents differ from web chat agents?  
60. Slack agents for internal ops: patterns and risks?  
61. Email classification agent vs full reply agent?  
62. Calendar booking agents: what must stay human?  
63. Invoice/PDF extraction agents - how accurate is “good enough”?  
64. Real estate lead agents: compliance cautions?  
65. Clinic/appointment agents: what not to automate?  
66. Restaurant order agents: standard vs special requests?  
67. Logistics status agents: where hallucinations hurt?  
68. HR screening agents: bias and legal risk?  
69. Finance AP agents: approval matrices?  
70. E-commerce returns agents: refund gates?  
71. Multi-brand / multi-store agent routing?  
72. Discord/community moderation agents: limits?

### People, org, change (73–80)

73. How do I introduce agents without scaring the team?  
74. Who owns agent quality after the vendor leaves?  
75. What training do operators need?  
76. How do we handle “the agent is wrong” tickets?  
77. Should we publish an internal agent policy?  
78. How do we set SLAs for agent-assisted workflows?  
79. When is it unethical to hide that a reply was AI-assisted?  
80. How do we negotiate agent scope with a works council / strict HR?

### Vibe coding / AI-built products (81–94)

81. How do I add real auth (not demo auth) to a vibe-coded app?  
82. Supabase RLS / Firebase rules - what vibe apps get wrong?  
83. How do I run migrations safely on a vibe-coded MVP?  
84. Do vibe-coded apps need staging and CI?  
85. How do I write tests when the UI was AI-generated?  
86. Stripe on a vibe app: webhooks, idempotency, underpayment?  
87. How do I stop secret keys from landing in the browser bundle?  
88. SEO for a vibe-coded SaaS marketing site - first 10 fixes?  
89. GEO for a product built with Lovable/v0/Cursor - what matters?  
90. Accessibility debt in AI-generated UIs?  
91. How do I add analytics without leaking PII?  
92. Rate limiting and bot abuse on vibe APIs?  
93. When must I rewrite the vibe codebase instead of patching?  
94. How do I hand a vibe MVP to a real engineering team?

### GEO / AI search for builders (95–100)

95. How do I get ChatGPT to recommend my agent agency or product?  
96. Which third-party pages get cited most for “best AI agent” queries?  
97. Should I answer Reddit/Quora questions or only publish on my blog?  
98. How do FAQ pages help AI Overviews vs classic SEO?  
99. Does YouTube still matter for AI citations in 2026?  
100. How do I turn sales-call questions into citable GEO content?

---

## Map: question IDs → new post slug

| Post slug | Answers questions |
| --- | --- |
| `multi-agent-vs-single-agent-when-to-use` | 1, 3, 4, 8, 9, 10 |
| `agent-chatbot-copilot-rpa-differences` | 2, 51, 52 |
| `safe-tool-calling-for-business-agents` | 5, 6, 7, 12, 43 |
| `browser-agents-computer-use-risks` | 11 |
| `rag-memory-and-grounding-for-agents` | 13–22 |
| `how-to-evaluate-ai-agents-before-go-live` | 23–25, 31 |
| `llm-cost-and-model-choice-for-agents` | 26–28, 35 |
| `agent-observability-logs-traces` | 29, 30, 31 |
| `idempotency-retries-queues-for-agents` | 32–34, 53, 55 |
| `shadow-mode-and-canary-for-ai-agents` | 36, 57, 58 |
| `prompt-injection-defenses-for-tool-agents` | 37, 38 |
| `pii-gdpr-logging-for-ai-agents` | 39–42, 44 |
| `agent-incident-response-and-liability` | 45, 46, 76, 78 |
| `multi-tenant-isolation-for-agency-agents` | 21, 47, 48, 71 |
| `zapier-make-n8n-vs-production-agents` | 49, 50, 52, 54 |
| `versioning-prompts-and-agent-rollouts` | 56–58 |
| `channel-agents-whatsapp-slack-email` | 59–62 |
| `document-and-invoice-agents-limits` | 63, 69 |
| `vertical-ai-agents-risk-notes` | 64–68, 70, 72 |
| `change-management-for-ai-agents-at-work` | 73–75, 77, 79, 80 |
| `vibe-coding-auth-db-migrations` | 81–83, 93 |
| `testing-ci-cd-for-vibe-coded-apps` | 84, 85, 94 |
| `payments-and-secrets-on-vibe-apps` | 86, 87, 92 |
| `seo-geo-for-vibe-coded-and-saas-sites` | 88–91, 95–100 |
| `open-frameworks-and-assistants-when-to-use` | 3, 12, 49 |

---

## SEO/GEO intent notes

| Intent family | Why it ranks / gets cited |
| --- | --- |
| “vs” / taxonomy | Comparison queries + LLM disambiguation |
| how-to eval / security | Buyer research before hire |
| cost / model choice | High commercial intent |
| vibe-code harden | Growing GPT query cluster |
| channel + vertical | Long-tail + local service |
| GEO for products | Aligns with citation/mention research |

---

## Related

- Existing inventory: 82 posts (agency buyer batch + process)  
- [blog-batch-buyer-faq-30.md](./blog-batch-buyer-faq-30.md)  
- [blog-batch-gpt-gaps-25.md](./blog-batch-gpt-gaps-25.md)  
