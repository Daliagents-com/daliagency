# Homepage motion map

Source of truth for scroll, logo, and section animation on `/` and `/[locale]`.

## Live render tree

```text
RootLayout
├── Navbar                    sticky z-30, #dali-logo-nav-slot
├── main
│   ├── Hero #top             z-10
│   │   └── ContainerScroll   data-logo-scroll-track, h 160/170vh
│   │       ├── FlyingBrandLogo (portal body, z-90)
│   │       ├── PaperDesignBackground
│   │       ├── HeroBrandLogoEntrance + DaliAnimation (rAF hand-draw replay)
│   │       ├── Header (Framer blur/fade)
│   │       └── Card (Framer scale/y + entrance)
│   │           └── HeroProductMock  light multi-page tour (Agents→Home→Pipeline→Inbox)
│   ├── Projects #projects
│   │   └── ProjectShowcase
│   ├── AgentSolutions #agent-solutions
│   │   ├── sticky sidebar + panel IO
│   │   └── AgentUxPreview × N (Framer; dali kind = node canvas)
│   ├── DesignSprints #services   DARK via scroll curtain (local only)
│   │   ├── Framer clip-path curtain (enter/exit)
│   │   ├── CSS enter (data-entered)
│   │   └── Framer mock loops (createMockPlayer)
│   └── About #about          light
└── Footer
```

Same order on `app/page.tsx` and `app/[locale]/page.tsx`.

## Engine law (homepage is GSAP-free)

| Surface | Engine | Forbidden |
|---------|--------|-----------|
| **Hero** (track, title, product mock tour, logo flight, logo hand-draw) | Framer + DOM rAF | **No GSAP** |
| **Projects** | rAF / CSS (showcase) | **No GSAP** |
| **Agent solutions** | Framer + IO | **No GSAP** |
| **Services shell** (enter, card hover) | CSS + IO | **No GSAP** |
| **Services dark curtain** (theme reveal) | Framer `useScroll` + clip-path | **No GSAP**, no `html[data-page-theme]` |
| **Services mocks** | Framer `animate` via `createMockPlayer` | **No GSAP** |

Do not reintroduce `gsap` under `src/Components/Home` or on the homepage render path.

## Motion ownership (do not dual-drive)

| Surface | Owner | Files |
|---------|--------|--------|
| Hero scroll track / mock / title | Framer `useScroll` | `ui/container-scroll-animation.tsx` |
| Hero product mock page tour | Framer + IO (`useLiveStage`-style beats) | `HeroProductMock.tsx` + `.module.css` |
| Logo hand-draw | rAF frame replay (`daliReplay.json`) | `DaliAnimation.tsx` |
| Logo flight hero → nav | rAF + DOM styles; progress from Framer | `FlyingBrandLogo.tsx` |
| Shared timing constants | constants only | `heroEntrance.ts` |
| Agent panels enter / sticky | Framer + IO | `AgentSolutions.tsx` + `AgentSolutions.module.css` |
| Agent product stage loops | Framer | `AgentUxPreview/` kinds |
| Services mocks | Framer `createMockPlayer` | `services/mocks/*` + `motionShared.ts` |
| Services section enter | CSS `data-entered` | `useSectionMotion.ts` + `DesignSprints.module.css` |
| Services dark curtain | Framer clip-path on `.curtain` | `DesignSprints.tsx` + `DesignSprints.module.css` |
| Theme | **section-local** dark curtain on `#services` only | `DesignSprints.*` |

Site canvas stays light. Navbar stays light. Do not flip `html[data-page-theme]`.
Dark services is a scroll-linked clip reveal (enter top→bottom, exit close top→bottom), not a document theme switch.

## DOM contracts (logo)

| Selector | Where |
|----------|--------|
| `#dali-logo-hero-slot` | `HeroBrandLogoEntrance` |
| `#dali-logo-nav-slot` | `Navbar` |
| `[data-logo-scroll-track]` | `ContainerScroll` root |
| `[data-logo-mark]` | hero + nav marks |
| `[data-logo-flight]` | portal flight link |

Missing any of these after mount must log a console error (not silent return).

## Timing (single source: `heroEntrance.ts`)

| Constant | Role |
|----------|------|
| `HERO_ENTRANCE_DELAY_*` | Mock entrance delay + draw start delay |
| `HERO_ENTRANCE_DURATION_*` | Mock entrance duration; draw window aligned |
| `HERO_ENTRANCE_EASE` | Framer ease |
| `DALI_HAND_DRAW_MS` | Hand-draw wall time after entrance delay (~1s) |
| `LOGO_FLIGHT_LOCK_MS` | Hold hero phase until hand-draw can finish |
| `LOGO_FLIGHT_START` / `LOGO_FLIGHT_END` | Progress window for flight (wider = calmer travel) |
| `LOGO_FLIGHT_SMOOTH` | Temporal follow rate (1/s) for silkier scroll-linked path |

## Magic thresholds (keep in sync with MOTION.md when changing)

| Value | Meaning |
|-------|---------|
| Track height `160vh` / `170vh` | Hero scroll length |
| Title pointer-events cut `> 0.47` | Title no longer clickable |
| Agent panel IO rootMargin `-38% / -48%` | Active sidebar panel |
| Agent section z-index ~11 | Above services stack |

## Z-index stack

| Layer | z |
|-------|---|
| About | 3 |
| Hero / services | ~10 |
| Agent solutions | ~11 |
| Navbar | 30 |
| Logo flight portal | 90 |

## Do not reintroduce (deleted ghosts)

These were removed because they misrouted agents. Do not restore without a design reason + MOTION.md update:

- old `Hero.module.css` sticky hero
- `AgentSolutions.product.tsx`
- `SectionThemeController` / `html[data-page-theme]`
- `homeUncoverStack` uncover peel layout
- `daliDrawFrames.json` (superseded by `daliReplay.json` + rAF replay)
- `FloatingLines.tsx` / `DottedLines.tsx` on home
- `demo/` as homepage source
- WAAPI stroke-dash on filled outline paths as hero hand-draw (looks wrong; use replay)

## Verification checklist

- [x] Logo stroke draws on first paint at top
- [x] Scroll: logo flies into nav and stays (`hero` → `flight` → `nav`)
- [ ] Agent sticky sidebar tracks active panel (manual)
- [ ] Dali panel mock: canvas nodes (5 agents + integrations) inside product chrome
- [x] Services cards always readable (enter is transform-only, never opacity 0)
- [x] Only services section is dark; rest of page/nav light (`data-page-theme` absent)
- [x] About / page canvas light
- [x] No motion-contract `console.error` (0 errors on baseline pass)
- [x] Screenshots: `v2/output/playwright/baseline-home/` (desktop 1440×900)

### Baseline samples (2026-07-30)

| File | What |
|------|------|
| `00-top.png` | Hero + logo draw |
| `25-scroll.png` … `100-bottom.png` | Scroll grid |
| `services.png` | Dark services, cards visible |
| `logo-flight-mid.png` / `logo-in-nav.png` | Logo flight / nav land |

## Task routing

| Intent | Allowed focus |
|--------|----------------|
| Dali hand-draw | `DaliAnimation.tsx`, `daliReplay.json`, `heroEntrance.ts` |
| Logo flight | `FlyingBrandLogo.tsx`, `container-scroll-animation.tsx`, Navbar slot, `heroEntrance.ts` |
| Hero mock scroll | `container-scroll-animation.tsx`, `Hero.tsx` |
| Services card mock | `services/mocks/Mock*.tsx` + `DesignSprints.module.css` |
| Agent panel mock | `AgentUxPreview/kinds/*` + `AgentUxPreview.module.css` |
