# Coffee Field Guide

A curated coffee discovery web app built by a team of designers learning to code with Claude Code.

## Project overview
- **Repo:** `commitmeco/coffee-app` on GitHub
- **Stack:** Next.js (App Router) + Tailwind CSS, JSON data files, Vercel deploy
- **Phase:** Phase 1 — The Field Guide (20 curated beans, static pages)
- **Team:** Designers/researchers, no traditional dev backgrounds

## Key directories
- `src/app/` — Next.js App Router pages
- `src/components/` — Shared UI components
- `src/data/` — JSON data files (beans, taxonomy)
- `docs/` — Project docs (proposal, vision, guides)
- `hassan-design/` — Hassan's design explorations (DESIGN.md + HTML mockups)

## Data files
- `src/data/beans_curated.json` — 20 hand-picked beans (Phase 1 foundation)
- `src/data/beans.json` — Full dataset, 1,338 beans (Phase 2)
- `src/data/flavor_taxonomy.json` — SCA flavor wheel categories and descriptors

## Design principles
1. Teach, don't assume — plain-language companions for every score
2. Independent pages, shared data — no page depends on another being finished
3. Content before code — flavor tags and descriptions are the foundation
4. Ship small, ship often
5. The data is the product — 20 well-curated beans > 1,338 rows of raw data

## Branch conventions
- `main` — production, auto-deploys to Vercel
- `hassan/hassan-design` — Hassan's design work
- Feature branches: `[name]/[feature-description]`

## Working with the team
- Team members are new to Git — keep PRs focused and clearly described
- Each person owns an independent page/route — minimize cross-dependencies
- CSS-based score bars (no chart libraries in Phase 1)
