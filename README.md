# ☕ Coffee App

A community-driven app to help people discover, learn about, and enjoy coffee beans from around the world.

## What is this?

Coffee App helps people:
- **Discover** beans by origin, roast, and flavor profile
- **Learn** brewing methods matched to different beans
- **Track** what they've tried and what they loved
- **Share** recommendations with friends

## Built with Claude Code

This project is an example of **human + AI collaboration** — not siloed roles, but coworking. Designers, researchers, and Claude Code working together in the same repo, iterating in real time.

## Status: Phase 5 — Personalized Coffee (kickoff 2026-05-06)

**The new direction:** make the coffee experience personal. Same homepage, different surfaces for different people, driven by a taste profile blended from metadata, declared preferences, and behavioral signals. See **[docs/PHASE_5_VISION.md](docs/PHASE_5_VISION.md)**.

**How we work now:** short-lived branches, PR-reviewed merges, no loose files at the repo root, decisions live in `docs/`. Read **[docs/WORKFLOW.md](docs/WORKFLOW.md)** before opening a PR.

Phases 1–4 (below) were exploratory. They built the foundation we now personalize. We went with **Option B (Modern Web App)** from [Hassan's original build proposal](docs/archive/PROPOSAL.md) — Next.js + Tailwind + JSON data. Here's what's live:

### Phase 1 — Foundation ✅
- **Bean catalog** — Browse all 1,338 beans in a searchable, filterable grid
- **Search** — Find beans by country, region, variety, farm, or processing method
- **Filters** — Narrow by country, processing method, or minimum cupping score with removable filter pills
- **Sorting** — By score (high/low), country A–Z, or altitude
- **Bean detail pages** — Full info, radar chart, score breakdowns with hover tooltips, similar bean recommendations
- **Design system** — Coffee-inspired palette, responsive layout, clean typography

### Phase 2 — UX & Diary ✅
- **Redesigned homepage** — Hero section with catalog stats, "Start Exploring" CTA, and an About section
- **Editor's Picks** — Horizontally scrollable featured beans carousel from the curated dataset
- **Coffee Diary** — Personal tasting journal at `/diary` to track beans as Tried, Loved, or Want to Try
- **Diary controls on bean pages** — Mark any bean's status and add personal tasting notes
- **Diary badge** — Navbar shows a live count of diary entries
- **Active filter pills** — Removable tags showing which filters are applied, with a "Clear all" option
- **Navbar search** — Expandable search input in the nav bar (desktop + mobile)
- **Mobile navigation** — Hamburger menu with animated open/close transitions
- **Skeleton loading states** — Placeholder UI while diary data hydrates from localStorage

### Phase 3 — Personalization & Education ✅
- **Flavor profile quiz** — Multi-question quiz at `/quiz` to discover your coffee personality and get personalized bean recommendations
- **Brew guide** — Step-by-step brewing tutorials at `/brew-guide` for pour-over, French press, AeroPress, espresso, cold brew, and Moka pot
- **Marco the Barista** — AI chatbot character offering brew recipes, equipment tips, and coffee advice
- **Coffee shops explorer** — Discover specialty coffee shops at `/shops` with details and locations
- **User profile** — Personal dashboard at `/profile` with badges, stats, and coffee drinking history

### Phase 4 — Unified Platform (One More Cup) ✅
- **World map hero** — Interactive SVG coffee bean world map highlighting coffee-growing regions
- **Magazine section** — Editorial stories about coffee origins, farmers, and global coffee culture with article modals
- **News ticker** — Scrolling banner in the navbar with latest coffee stories
- **Redesigned navbar** — Unified navigation with integrated news ticker and updated branding
- **Redesigned footer** — Full editorial-style footer with links and branding
- **Social feed** — Community page at `/social` to see what other coffee lovers are brewing and sharing
- **Shopping cart** — Cart drawer with quantity controls and shipping calculation
- **Checkout flow** — Full checkout experience at `/checkout`
- **Order history** — Track past purchases and reorder at `/orders`
- **Add to cart controls** — Quantity selector and buy buttons on bean detail pages

### Why Option B?

Hassan laid out four solid options in the proposal. We picked B because:
1. **Claude Code is strongest with React/Next.js** — and that matters when none of us are developers
2. **It scales into Phase 2 and 3** without needing to rebuild
3. **The work divides cleanly** — 5–6 pieces people can own independently
4. **Massive ecosystem** — easy to Google your way out of problems

See the full breakdown in [docs/PROPOSAL.md](docs/PROPOSAL.md).

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Data | JSON files in `src/data/` — no database needed yet |
| Language | TypeScript |
| Deployment | Vercel (planned) |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ installed

### Run locally
```bash
git clone <repo-url>
cd coffee-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the bean catalog.

### Other commands
```bash
npm run build   # Production build (generates all 1,338+ pages)
npm run lint    # Run the linter
```

## Project Structure

```
coffee-app/
├── CLAUDE.md               # Guidelines for Claude Code (read this first)
├── docs/
│   ├── PHASE_5_VISION.md   # Current direction — personalized coffee
│   ├── WORKFLOW.md         # Branching, PRs, file structure, SOPs
│   ├── MEETING_2026-05-06.md # Phase 5 kickoff agenda
│   ├── VISION.md           # Original product principles (still relevant)
│   └── archive/            # Phase 1–4 docs (PROPOSAL, Kickoff_Guide, etc.)
├── prototypes/             # Active design exploration (short-lived)
├── archive/                # Old presentations, prototypes, data exports
├── reviews/                # Design review feedback + workflow
├── src/
│   ├── app/                # Next.js pages (App Router)
│   │   ├── layout.tsx      # Root layout — DiaryProvider + Navbar + Footer
│   │   ├── page.tsx        # Homepage — world map hero, magazine, catalog
│   │   ├── beans/[id]/     # Bean detail pages (1,338 routes)
│   │   ├── brew-guide/     # Brewing method tutorials
│   │   ├── checkout/       # Checkout flow
│   │   ├── diary/          # Personal coffee diary
│   │   ├── orders/         # Order history
│   │   ├── profile/        # User profile and stats
│   │   ├── quiz/           # Flavor profile quiz
│   │   ├── shops/          # Coffee shop explorer
│   │   └── social/         # Community social feed
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Nav with search, news ticker, diary badge
│   │   ├── Footer.tsx      # Editorial-style footer
│   │   ├── BeanCard.tsx
│   │   ├── BeanCatalog.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Filters.tsx
│   │   ├── ActiveFilters.tsx      # Removable filter pills
│   │   ├── FeaturedBeans.tsx      # Editor's Picks carousel
│   │   ├── CoffeeBeanWorldMap.tsx # Interactive SVG world map
│   │   ├── MagazineSection.tsx    # Editorial stories and articles
│   │   ├── ArticleModal.tsx       # Full-article popup modal
│   │   ├── BaristaChat.tsx        # Marco the Barista chatbot
│   │   ├── BrewMethodCard.tsx     # Brew method selection card
│   │   ├── BrewMethodDetail.tsx   # Step-by-step brew instructions
│   │   ├── QuizFlow.tsx           # Quiz orchestrator
│   │   ├── QuizQuestion.tsx       # Individual quiz question
│   │   ├── QuizResults.tsx        # Personalized quiz results
│   │   ├── ShopCard.tsx           # Coffee shop listing card
│   │   ├── ShopExplorer.tsx       # Shop discovery interface
│   │   ├── CartDrawer.tsx         # Slide-out shopping cart
│   │   ├── CartProvider.tsx       # Cart state context
│   │   ├── AddToCartControls.tsx  # Buy buttons on bean pages
│   │   ├── CheckoutFlow.tsx       # Multi-step checkout
│   │   ├── OrderHistory.tsx       # Past orders list
│   │   ├── SocialFeed.tsx         # Community feed
│   │   ├── ProfileView.tsx        # User profile dashboard
│   │   ├── ScoreRadar.tsx         # Flavor radar chart
│   │   ├── DiaryProvider.tsx      # React context for diary state
│   │   ├── DiaryControls.tsx      # Tried/Loved/Want to Try + notes
│   │   └── DiaryView.tsx          # Diary page with status filtering
│   ├── data/               # Bean data and models
│   │   ├── beans.json      # Full dataset (1,338 beans from CQI)
│   │   ├── beans_curated.json  # 20 hand-picked standout beans
│   │   ├── flavor_taxonomy.json # SCA Flavor Wheel vocabulary
│   │   └── schema.md       # Documents the bean data model
│   └── lib/                # Utility functions and types
│       ├── beans.ts        # Bean types, loading, filtering, scoring
│       ├── diary.ts        # Diary types (DiaryEntry, DiaryStatus, DiaryMap)
│       └── useLocalStorage.ts  # SSR-safe localStorage hook with hydration
├── public/                 # Static assets (images, icons)
└── tests/                  # Test files
```

## What's Next — Phase 5

Phase 5 is focused on personalization. Milestones:

- **M1 — Profile foundation** (2 wks): `TasteProfile` data model, provider, debug inspector
- **M2 — Personalize three surfaces** (3 wks): homepage hero, bean detail "why this for you," diary depth prompts
- **M3 — Recommend with teeth** (3 wks): content-based engine, "why this" reasoning on every rec
- **M4 — Account + persistence** (later): real auth, server-side profile, cross-device

See **[docs/PHASE_5_VISION.md](docs/PHASE_5_VISION.md)** for the full picture and **[docs/MEETING_2026-05-06.md](docs/MEETING_2026-05-06.md)** for the kickoff agenda.

## Data

All bean data comes from the [Coffee Quality Institute](https://github.com/jldbc/coffee-quality-database) (MIT License), scored using the SCA cupping protocol. The flavor taxonomy is based on the SCA Flavor Wheel and WCR Sensory Lexicon.

## Contributing

This is a collaborative project. Whether you're a designer, researcher, or just a coffee lover — open an issue, suggest a feature, or pair with Claude Code to build something.

**Before you start:**
1. Read [CLAUDE.md](CLAUDE.md) for project conventions
2. Read [docs/WORKFLOW.md](docs/WORKFLOW.md) for branching, PR, and file-structure SOPs
3. Read [docs/PHASE_5_VISION.md](docs/PHASE_5_VISION.md) so you know what we're building toward

Quick version of the rules: short-lived branches named `your-name/feature-name`, every change goes through a PR, at least one teammate reviews before merge to `main`.

## License

MIT
