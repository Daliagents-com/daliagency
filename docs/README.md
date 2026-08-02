# Docs

- `TODO.md` - central business + site task list (P0/P1/P2).
- `research/` - business research corpus: Upwork/FL.ru marketplace demand (2026-07), market/ICP/economics (2026-07), AI agency competitive landscape (2026-04, refreshed 2026-08).
  See `research/README.md` for the full index and provenance.
- `seo/` - SEO/GEO program: `geo/` pack (playbook, audits, content, distribution, ops), dated `reports/`, `platforms/` research.
  See `seo/README.md`.

Convention: docs are grouped by topic; point-in-time documents carry a `YYYY-MM[-DD]` date suffix in the filename; living docs (status, playbooks, runbooks) carry no date.

None of this ships to production; `.vercelignore` excludes `docs/` from deploys.
