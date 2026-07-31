# Vibe-code Rescue Pilot - ship status

**Date:** 2026-07-31  
**Slug:** `vibe-code-rescue`  
**Live path (after deploy):** https://dali.agents.ge/solutions/vibe-code-rescue  
**Agent:** `dav-implementer` “Add vibe-rescue solution page” (completed)  
**Follow-up commit:** full GE/ARM details (`0dccb9b` and prior `b9eee32`)

This file records what was shipped and what was left out - operator handoff, not marketing copy.

---

## Goal

Add a real commercial BOFU service page for **vibe-code rescue / production hardening** - the biggest blog content cluster that was missing as a `/solutions` pilot.

---

## What shipped

### Positioning (honest)

| Field | Value |
| --- | --- |
| Name | Vibe-code Rescue Pilot |
| Accent | Steel teal `#0B3A4A` |
| Scope | Fixed-scope pilot: triage secrets / payments / admin → patch vs rewrite per critical path → gates + stop-switch → handoff package |
| Not in scope | Full rewrite of every screen; shame for using AI builders; multi-product portfolio in one pilot |
| CTA | Start audit / fixed boundary (existing contact patterns) |

### Blog cluster referenced (text)

- `how-we-rescue-vibe-coded-mvps`
- `vibe-coded-site-hardening-checklist`
- `security-audit-for-vibe-coded-websites`
- `rewrite-vs-patch-vibe-code`

### Locales

| Locale | Overview card | Full solution details |
| --- | --- | --- |
| EN | Yes | Yes (`solutionContent` / `solutionsBySlug`) |
| RU | Yes | Yes (full translated details) |
| GE | Yes | Yes (full KA details; was EN fallback, then localized) |
| ARM | Yes | Yes (full HY details; was EN fallback, then localized) |

### Routes / surfaces

| Surface | Status |
| --- | --- |
| `/solutions/vibe-code-rescue` | Yes (via `solutionSlugs`) |
| `/ru|ge|arm/solutions/vibe-code-rescue` | Yes |
| `/solutions` overview grid card | Yes |
| Sitemap | Yes (driven by `solutionSlugs`) |
| Home `#services` 5th card | Yes - “Vibe-code rescue” in `home.ts` × 4 locales |
| Hero / pilot preview wire | Yes - reuses operations-docs shell (no new AgentUx kind) |
| Motion map | Yes - `pilotWorkflowMotion` entry |

### Files (main)

| Area | Path |
| --- | --- |
| Core content + slug | `v2/src/Components/Solutions/solutionContent.ts` |
| Overview + details locales | `v2/src/Components/Solutions/locales/{en,ru,ge,arm}.ts` |
| Page switches | `v2/src/Components/Solutions/SolutionPages.tsx` |
| Hero preview | `v2/src/Components/Solutions/visuals/PilotProductPreview.tsx` |
| Motion | `v2/src/Components/Solutions/visuals/pilotWorkflowMotion.ts` |
| Home services copy | `v2/src/i18n/home.ts` |
| Services slot wiring | `v2/src/Components/Home/DesignSprints.tsx` (slot `e` / i18n card) |

---

## How to verify

```bash
cd v2 && npm run dev
# open:
# /solutions/vibe-code-rescue
# /ru/solutions/vibe-code-rescue
# /ge/solutions/vibe-code-rescue
# /arm/solutions/vibe-code-rescue
# /solutions
# /#services
```

After production deploy from `main`:

- https://dali.agents.ge/solutions/vibe-code-rescue  
- https://dali.agents.ge/ge/solutions/vibe-code-rescue  
- https://dali.agents.ge/arm/solutions/vibe-code-rescue  

`npx tsc --noEmit -p tsconfig.json` was clean at ship time.

---

## Remaining risks / not done

1. **FAQ / integrations** mention blog slugs as plain text - not clickable internal links.  
2. **Homepage AgentSolutions** sticky panels still show the original agent lanes only (no vibe-rescue panel) - intentional motion-scope lock.  
3. **Attio / table showcase** for this slug uses generic fallback, not a custom rescue table model.  
4. **No dedicated case metrics** - correct; do not invent clients.  
5. Deploy lag: if Vercel is not tracking `main`, page will not be live until production catches up (see blockers B-P0-03).

---

## Optional next (agent-doable)

| Item | Why |
| --- | --- |
| Clickable links to the 4 blog posts in FAQ/integrations | Internal SEO + UX |
| Related rail or “Read next” block on the pilot page | Topical cluster |
| Optional custom mock for rescue triage UI | Visual polish only |
| Schema Service / Offer on solution pages | Structured data parity with blog |

---

## Git anchors (this session)

| Commit theme | Notes |
| --- | --- |
| `b9eee32` | Included vibe-code-rescue pilot surface among SEO/HTML/robots work |
| `0dccb9b` | Full GE + ARM details (replace EN fallback) |

Exact SHAs may sit on `main`; re-check with `git log --oneline --grep=vibe`.

---

## Related

- Solution content: `v2/src/Components/Solutions/solutionContent.ts` (`vibe-code-rescue` block)  
- Blog process: https://dali.agents.ge/blog/how-we-rescue-vibe-coded-mvps  
- SEO pack index: [README.md](./README.md)  
