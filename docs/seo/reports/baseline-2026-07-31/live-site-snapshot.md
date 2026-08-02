# Live site snapshot (pre-blog deploy) - 2026-07-31

Fetched from production while blog work is still local (not yet deployed).

## HTTP

- `https://dali.agents.ge` → **200**
- Hosting: Vercel (FRA/IAD)
- Cache: private no-store on HTML (typical for dynamic/RSC)

## robots.txt

```
User-Agent: *
Allow: /

Host: https://dali.agents.ge
Sitemap: https://dali.agents.ge/sitemap.xml
```

## sitemap.xml (prod at check time)

- Home + locales, design-sprints, solutions, projects present.
- **No `/blog` URLs yet** - expected until this branch deploys.
- After deploy, verify blog index + 4 locale post URLs appear.

## Gaps vs post-deploy target

| Item | Prod now | After deploy of this work |
| --- | --- | --- |
| Blog routes | absent | `/blog`, `/{locale}/blog`, post pages |
| Blog in sitemap | no | yes |
| BlogPosting JSON-LD | no | yes on posts |
| Nav Blog link | no | yes |

## claude-seo full audit

Still requires plugin install in Claude Code (see README in this folder).
