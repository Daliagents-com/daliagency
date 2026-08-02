# Video takeaways: AI search / GEO (HTML + robots)

**Source:** [YouTube - Matt Canyon + Surfer, AI search / GEO](https://www.youtube.com/watch?v=bhTo8fDmr5I)  
**ID:** `bhTo8fDmr5I`  
**Used:** English auto/captions transcript (2026-07-31 extract)

**Full continuous transcript (captions-derived):**  
→ [video-bhTo8fDmr5I-transcript.md](./video-bhTo8fDmr5I-transcript.md)

This file is the actionable summary only - not the full dump.

---

## Core thesis of the video

1. GEO/AEO is mostly **good SEO + a few nuances** for LLM consumption.  
2. Generative tools often pull from **top organic + trusted sources**.  
3. Strong classic SEO remains the foundation.  
4. Track **brand mentions in AI**, not only clicks from LLMs.

Google still dominates query volume vs ChatGPT in the cited figures; AI search is rising, especially younger cohorts.

---

## 1. Content AI “likes”

| Practice | Why | Dali status |
| --- | --- | --- |
| Natural language, question-focused | Models trained on conversation | Blog Direct answer + FAQ |
| E-E-A-T: first-hand process, stats, sources, credentials, limitations | Authority for reuse | Partial; need real process depth, no fake cases |
| Semantic richness (related terms, not keyword spam) | Context graph around the topic | Keywords in body + meta on home |
| Clear H2/H3 hierarchy | AI can target a section for a sub-question | Blog yes |
| Bullets / numbered lists | Easy to quote | Use more tables where useful |
| FAQ with short Q + direct A | Parseable answers | On posts |
| Tables for comparisons | Cell-level citation | Add on BOFU where natural |

Cited in video: well-organized content with FAQ increased inclusion in AI answers up to ~37% on Perplexity-style surfaces (study claim - treat as directional).

---

## 2. Technical (this is the robots + HTML part)

### robots.txt
- Confirm you are **not** blocking OpenAI **GPTBot**, Google crawlers, **Bingbot**.  
- ChatGPT search historically leans on **Bing index** → Bing Webmaster + sitemap matter.  
- Dali: `v2/src/app/robots.ts` allows `*`, GPTBot, OAI-SearchBot, Claude*, Perplexity*, Google-Extended, **Bingbot**, Googlebot.  
- Live check after deploy: `https://dali.agents.ge/robots.txt`

### Important content in **HTML text**
- AI systems primarily read **raw HTML**.  
- Do not hide primary claims only behind JS interactions, images, or video without text.  
- Always: image **alt**, video **transcripts** when you publish video.  
- Dali: homepage now has SSR block `HomeSeoSummary` with service phrases + internal links in plain HTML.

### Structure and speed
- Logical hierarchy, valuable pages near home, descriptive internal links.  
- Same as classic SEO.

---

## 3. Schema

Video highlights:

- **Organization** - brand, logo, social (knowledge-style surfaces)  
- **Article / BlogPosting** - date, author, headline  

Dali already ships Organization, WebSite, BlogPosting, FAQPage (posts), Breadcrumb, Person author.

Schema does not guarantee AI citation; it helps machines classify the page.

---

## 4. Authority / trust

- Quality backlinks, industry mentions, reviews, “best of” lists  
- Unlinked brand mentions still useful for LLMs  
- Topical authority: cover the niche from many angles (multiple pages can feed one AI answer)

---

## 5. What “keywords in HTML” means (and what it does not)

**Means (correct):**
- Primary and related phrases appear in **title, description, H1/H2, body lists, FAQs**  
- Semantic variants around the topic  
- Server-rendered text crawlers can read without clicking

**Does not mean:**
- Stuffing invisible text  
- Relying only on `<meta name="keywords">` (weak/ignored by Google as a ranking lever; we still set it for completeness)  
- Keywords only inside canvas/WebGL/images

---

## Dali implementation map (from this video)

| Video item | Action |
| --- | --- |
| robots allow GPTBot/Bing/Google | `robots.ts` named allows + sitemap |
| HTML text for key claims | `HomeSeoSummary` + existing SSR sections |
| Keywords visible in document | home `metadata.keywords` + body phrases |
| Schema | already present; keep sameAs when LI Company exists |
| Bing index | human: Bing Webmaster (blockers) |
| Mentions tracking | `ai-citation-baseline.md` |
| YouTube transcripts | film scripts already drafted |

---

## Related

- [how-seo-geo-aeo-works.md](../playbook/how-seo-geo-aeo-works.md)  
- [opportunities-next.md](../ops/opportunities-next.md)  
- [blockers.md](../ops/blockers.md) B-P1-08 Bing  
