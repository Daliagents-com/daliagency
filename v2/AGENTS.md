# AGENTS.md - Dali website (`v2/`)

Rules for humans and coding agents working on this app.

## Scope

- **Production app is `v2/` only.** Parent folder assets, `demo/`, `ref-journal/`, and font dumps are not the live site.
- **Stack:** Next.js 15 App Router, React 18, Tailwind 3, CSS modules, Framer Motion, GSAP, `next/font`.
- **Code/comments:** English. Match the user language in chat.
- **`demo/`:** Vite lab for product UI experiments. Never treat it as the homepage source of truth.

## Homepage motion (hard rules)

Read `src/Components/Home/MOTION.md` before any home animation or scroll work.

1. **One system per task/PR.** Logo draw/flight **or** services mocks **or** agent panels **or** section chrome - not all at once.
2. **State a file contract before editing** home motion:

```text
<task> ... </task>
<allowed_files> ... </allowed_files>
<forbidden> ... </forbidden>
<done> screenshots + behaviors ... </done>
```

If that contract is missing and the change could touch motion, stop and ask.

3. **Live home tree only** (see MOTION.md for full map):
   - `app/page.tsx` + `app/[locale]/page.tsx`
   - `Home/Hero.tsx` → `ui/container-scroll-animation.tsx` → `Home/HeroProductMock.tsx`
   - `Home/FlyingBrandLogo.tsx` + `Home/DaliAnimation.tsx` + `Navbar` logo slot
   - `Home/Projects.tsx` + `ui/project-showcase.tsx`
   - `Home/AgentSolutions.tsx` + `Home/AgentSolutions.module.css` + `Home/AgentUxPreview/`
   - `Home/DesignSprints.tsx` + `Home/services/**` (`#services`)
   - `Home/About.tsx`
   - section CSS modules / related `globals.css` tokens

4. **Do not rename logo DOM contracts** without updating every consumer + MOTION.md:
   - `#dali-logo-hero-slot`
   - `#dali-logo-nav-slot`
   - `[data-logo-scroll-track]`
   - `[data-logo-mark]`
   - `[data-logo-flight]`

5. **Homepage is GSAP-free** (see MOTION.md engine law):
   - Hero: Framer + DOM/WAAPI
   - Agents: Framer
   - Services shell: CSS
   - Services mocks: Framer `createMockPlayer`
   Do not reintroduce `gsap` on the homepage path.

6. **No silent early-return on critical motion.** Missing logo slots/track must `console.error` in the browser.

7. **Theme model (locked):** site is **light**. Only **`#services`** is a dark section, via **section-local** CSS. Do not reintroduce `html[data-page-theme]` or global page-canvas dark for polish.

8. **`overflow: hidden`** near sticky agent sidebar or hero track requires explicit sticky re-verify.

9. **Copy** lives in `src/i18n/*` and solutions locale bundles. Keep `/` and `/[locale]` section stacks in sync.

10. **Home motion is not done without visual evidence:**
    - desktop: scroll ~0% / 25% / 50% / 75% / 100%
    - mobile: top + agent panel + services
    - check: logo draw on load, flight lands in nav, services cards visible (not stuck at opacity 0), about light, no motion-contract console errors

## Forbidden until intentionally reintroduced

- Editing `demo/` as a homepage fix
- Restoring document-level `data-page-theme` scroll darkening
- Restoring unused uncover layout (`.homeUncover*`) without mounting it in JSX
- Adding a second unused twin of a live component (`*.product.tsx` style)

## General engineering

- Prefer co-located CSS modules over growing `globals.css` for section systems.
- Design tokens: CSS variables in `globals.css` + Tailwind theme; do not invent a third color system per section without reason.
- Server Components by default; `"use client"` only for real interaction/motion.
- No drive-by refactors outside the task scope.
- Prefer delete of dead dual variants over "leave for later."

## Agent workflow for home UI

1. Read this file + `src/Components/Home/MOTION.md`
2. Lock allowed/forbidden files and done criteria
3. Implement only inside that lock
4. Verify with screenshots / browser
5. Do not claim done without the motion checklist above
