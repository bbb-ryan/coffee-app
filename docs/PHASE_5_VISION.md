# Phase 5 — Personalized Coffee

> **Status:** Draft for team review — kickoff meeting 2026-05-06
> **Supersedes:** the open-ended exploration of Phases 1–4 (catalog → diary → quiz → unified app)
> **Author:** Emily, with input from Hassan's `CONCEPT-V2.md` on `hassan/hassan-design`

---

## What changes in Phase 5

Phases 1–4 were exploratory. We tried a lot of things — catalog, diary, quiz, brew guide, social feed, magazine, world map, checkout, cart. The goal was to learn what the app could be. We have answers now.

**Phase 5 has one job: make the app feel personal.** The same homepage shouldn't look the same to everyone who opens it. What we surface, what we recommend, what we explain — all of it should bend around who the user is and what they've shown us they care about.

We keep what we built. We don't keep building broadly. From here on, every new feature has to earn its place by making the experience more personal for someone specific.

---

## The thesis

A great coffee experience is wildly different for different people. The same Ethiopian Yirgacheffe is "fruity and weird" to one person and "exactly what I've been looking for" to another. Our job is to learn who the user is, then translate the world of coffee through that lens.

Personalization here means three layers stacked:

1. **Who they are** — pulled from metadata (signup data, location, device, time, eventually social/payment data with consent). Background context, not a quiz.
2. **What they've told us** — the quiz, taste preferences, dietary notes, brewing setup, budget.
3. **What they've done** — diary entries, beans tried, beans loved, beans skipped, recommendations accepted or ignored, cart history, time on page.

The app blends all three into a profile and uses it to make every screen feel like it was set up for that one person.

---

## How this connects to Hassan's CONCEPT-V2

Hassan has been working on `hassan/hassan-design` toward a "Coffee Decoder" framing — three moments (decode / recommend / depth), three personas (Noor / Mika / Dev). His framing is a strong fit for what personalization actually delivers:

- **Decode** is personal because translation depends on what the user has tasted before. "Tart like a ripe apricot" only works if we know they've tasted apricots.
- **Recommend** is personal by definition. Specifics — freshness, proximity, "why this" — only work if we know the user.
- **Depth** is personal because the right moment is different for everyone. A new espresso prompt fires for the home brewer who logged 12 pour-overs, not on a calendar.

**Recommendation for the meeting:** review CONCEPT-V2 together and decide whether we adopt the moments framework as our Phase 5 backbone, or merge it with the personalization frame in a way both Hassan and Emily endorse. Hassan should walk us through his concept; we should not pre-decide.

---

## Personalization, concretely

### What goes into the profile

| Source | Examples | When we get it |
|---|---|---|
| **Metadata** | location (city/region), device, timezone, time-of-day patterns, language, referrer | Implicit, on first visit |
| **Account data** | name, email, signup origin (eventually social login: Google/Apple metadata, payment metadata for taste-budget signal) | Account creation |
| **Declared preferences** | quiz answers, dietary notes (oat milk, decaf), brewing equipment owned, budget per bag, caffeine tolerance | Quiz + profile settings |
| **Behavioral signals** | beans logged, statuses (tried/loved/want), notes written, beans clicked vs skipped, time on detail pages, search queries, filters used, cart adds, completed orders, post-purchase ratings | Continuously |

We store these in a structured **Taste Profile** object (see `docs/TASTE_PROFILE.md` — to be written in the first sprint).

### What the profile changes

Concrete surfaces that should personalize in v1 of Phase 5:

- **Homepage hero** — different copy and featured beans for a returning logged-in user vs. a first-time visitor vs. a quiz-completed user vs. a frequent buyer.
- **Bean cards** — a "why this for you" chip on every recommendation card, derived from profile signals (e.g., "you loved the Kenyan AA from Counter Culture").
- **Bean detail pages** — flavor note translations grounded in the user's known taste anchors. Comparisons to beans they've actually tried, not generic ones.
- **Diary** — surface prompts that match their journey ("you've logged 10 washed Ethiopians — try a natural?").
- **Empty states** — say something useful based on what we know, not a generic "no results."
- **Quiz** — adapt subsequent questions based on prior answers (already partially true; make it explicit).

### What we don't do

Discipline matters. We will not, in Phase 5:

- Build new top-level surfaces that aren't personalized (no more "let's add a community feed").
- Personalize for personalization's sake (cosmetic name-in-headline hacks). Personalization should change *what* is shown, not just decorate.
- Ship dark-pattern personalization (manipulative urgency, fake scarcity).
- Ship anything that requires data we don't have a consent flow for.

---

## Phase 5 milestones

Rough sequencing — refine in the meeting.

### M1 — Profile foundation (2 weeks)
- Define the `TasteProfile` data model (`src/lib/tasteProfile.ts`)
- Build a `TasteProfileProvider` (mirrors `DiaryProvider` pattern, localStorage-backed for now)
- Decide on metadata capture: which signals, with what consent posture
- Stub a profile inspector page (`/profile/debug`) so the team can see the profile updating in real time

### M2 — Personalize three surfaces (3 weeks)
- Homepage hero + featured beans
- Bean detail "why this for you" chip + flavor note translation
- Diary depth prompts (Hassan's "punctuated depth" idea)

### M3 — Recommend with teeth (3 weeks)
- Recommendation engine v1 — content-based on flavor taxonomy + behavioral signals
- "Why this" reasoning shown on every recommendation
- A/B-able: instrument so we can compare personalized vs. baseline

### M4 — Account + persistence (later)
- Replace localStorage with a real backend (Supabase candidate)
- Real auth (Google/Apple) — also unlocks metadata enrichment
- Move taste profile server-side so it persists across devices

We don't commit to dates beyond M1 until M1 ships.

---

## What we keep, change, or sunset

| Surface | Status in Phase 5 | Why |
|---|---|---|
| Bean catalog | **Keep** | Foundation. Becomes more personal via filters that pre-fill from profile. |
| Bean detail pages | **Evolve** | Add "why this for you" + personalized translations. |
| Diary | **Evolve** | Becomes the highest-signal data source for personalization. |
| Quiz | **Evolve** | Becomes the seed of the taste profile, not a one-shot result page. |
| Brew guide | **Keep, deprioritize** | Useful but not on the personalization critical path. Maintenance only. |
| Marco the Barista chat | **Audit** | Decide in meeting: leave as-is, personalize, or sunset. |
| Magazine / articles | **Audit** | Same. Could become a depth-moment delivery mechanism, or a distraction. |
| Social feed | **Sunset candidate** | Exploration phase only. Doesn't fit the "decision-moment, not daily" posture. |
| Cart / checkout / orders | **Keep, hide for now** | Real commerce is a Phase 6 conversation. Code stays, surfaces hidden. |
| World map hero | **Keep** | Visual signature. May personalize regions surfaced. |

These are recommendations, not decisions. Discuss in the meeting.

---

## Open questions for the meeting

1. **Adopt Hassan's moments framework as the Phase 5 backbone?** Or merge with personalization frame, or table for later.
2. **Account model.** Keep localStorage-only for M1, or invest in real auth + backend now? Tradeoff: speed vs. cross-device profiles + better metadata.
3. **Personalization tier.** What's the smallest slice of personalization that makes the app feel meaningfully different? (Recommended answer: the homepage hero + one bean detail surface.)
4. **What gets sunset.** Social feed, magazine, brew guide, Marco — which earn a place, which we mothball.
5. **Branch strategy for Hassan's design exploration.** Bring `hassan-design/` mockups into a `prototypes/` folder on `main`? Keep on his branch? Cherry-pick specific flows?
6. **Privacy posture.** What's the minimum bar for metadata use we're comfortable shipping? Document this before any metadata feature lands.

---

## How we'll work differently

Phase 5 is not a "play around" phase. The team's frustration with sprawl (six surfaces nobody reviews together, mockups in three places, branches that never land) is the reason we're SOP'ing. See `docs/WORKFLOW.md` for the new branching, PR, and review conventions. Read it before opening anything.

---

*Phase 5 vision drafted by Emily for the 2026-05-06 kickoff. Builds on Hassan's CONCEPT-V2. Will be revised based on meeting decisions and re-versioned as `PHASE_5_VISION.md` v2.*
