# Design Review — Coffee App

**Date:** 2026-04-24
**Session type:** Whole-app walkthrough (homepage, catalog, bean detail, quiz, diary, brew guide, shops, profile, social, checkout)
**Facilitator:** Emily Neuhoff
**Build reviewed:** main @ 2026-04-23

---

## Reviewers

| Name | Role | Discipline tag |
|---|---|---|
| Maya L. | Senior Product Designer | `@design` |
| Jordan P. | UX Researcher | `@research` |
| Sam K. | Product Manager | `@pm` |
| Riya V. | Content / Copy | `@copy` |
| Devi N. | Frontend Engineer | `@eng` |

**How to read this doc:** Each comment is tagged with a discipline (`@design`, `@research`, `@copy`, `@pm`, `@eng`). The workflow in `WORKFLOW.md` reads these tags and routes follow-ups to the matching skill. Severity tags: `[blocker]`, `[major]`, `[minor]`, `[nit]`.

---

## 1. Homepage (`src/app/page.tsx`)

### Maya L. `@design` `[major]`
The hero + featured beans + catalog stack feels long before a first-time user sees anything interactive. The featured carousel and the catalog compete for attention because they use the same card treatment. Consider visually differentiating the carousel (larger card, editorial framing) from the catalog grid (utilitarian, dense).

### Jordan P. `@research` `[major]`
In the 5 moderated sessions last week, 4/5 users scrolled past the featured carousel without engaging. Two of them said they "didn't realize it was different from the grid below." This supports Maya's call-out. Recommend we instrument scroll depth + featured-card click-through before shipping more to the homepage.

### Riya V. `@copy` `[minor]`
Hero headline "Find your next favorite bean" is generic. Doesn't reflect the diary/quiz differentiation. Consider something that signals "we learn what you like."

### Sam K. `@pm` `[minor]`
No clear CTA above the fold for new users. The quiz is our highest-converting onboarding surface per Devi's analytics — why isn't it surfaced here?

---

## 2. Bean catalog + filters (`BeanCatalog.tsx`, `Filters.tsx`, `ActiveFilters.tsx`)

### Maya L. `@design` `[minor]`
`ActiveFilters` chips use `caramel-light` but the close (×) button inherits `espresso`, which is low contrast on the chip. Should be `espresso-light` on chip hover or just bump to `espresso` with an underline on hover.

### Devi N. `@eng` `[major]`
Filter state lives in the client and re-renders the whole catalog on every change. On a 1,338-bean list this is fine today but we'll hit jank if we add images. Flag for a virtualization pass later.

### Jordan P. `@research` `[blocker]`
Users do not understand the `Score` filter. 3/5 asked "out of what?" and one assumed it was price. We need either a tooltip (cheap) or a rethink of how the score is explained (better). I'd vote for a one-time info popover on first filter interaction.

---

## 3. Bean detail (`src/app/beans/[id]/page.tsx`, `ScoreRadar.tsx`)

### Maya L. `@design` `[major]`
The radar chart is beautiful but it's the only data viz in the app. It feels like it's from a different product. Either lean in (use radar treatment on other surfaces too — quiz results, diary stats) or replace it with a simpler bar row. Current state is inconsistent.

### Riya V. `@copy` `[major]`
The flavor descriptions we pull from `flavor_taxonomy.json` are taxonomic, not evocative. "Citric" is accurate but doesn't make anyone want to drink the coffee. These should be rewritten with sensory language. Priority for me.

### Sam K. `@pm` `[minor]`
We're missing a clear "add to diary" CTA on the detail page. Today you have to use `DiaryControls` which reads as metadata, not an action. This is probably a major driver of low diary adoption.

---

## 4. Quiz flow (`src/app/quiz/page.tsx`, `QuizFlow.tsx`, `QuizResults.tsx`)

### Jordan P. `@research` `[major]`
Drop-off between Q3 and Q4 is 38% in last week's session data. Q4 ("How do you usually brew?") asks brew method, but 3/5 users said they don't know their brew method by name. Need to either add illustrations for each method or rephrase in terms of equipment.

### Maya L. `@design` `[minor]`
`QuizInterstitial` is a great moment but the progress dots in `QuizProgress` are small enough that users don't notice them. Consider a single thicker progress bar at the top.

### Riya V. `@copy` `[minor]`
Quiz question microcopy is inconsistent in voice — some questions use "you" and some use "I." Pick one (recommend "you") and enforce.

---

## 5. Diary (`src/app/diary/page.tsx`, `DiaryProvider.tsx`, `DiaryView.tsx`)

### Sam K. `@pm` `[blocker]`
Diary empty state is a dead-end. It says "No entries yet" with no next action. This is our retention feature and the empty state is where new users live for their first session. Needs: (a) an illustration, (b) a clear "try the quiz" or "browse beans" CTA, (c) copy that explains *why* you'd want a diary.

### Riya V. `@copy` `[major]`
"Status: Wishlist / Drinking / Finished" is functional but cold. For a product about personal taste, this should feel warmer. Brainstorm: "Want to try / Currently brewing / Finished the bag."

### Jordan P. `@research` `[minor]`
We haven't validated that people distinguish "Wishlist" from "Drinking" mentally. Could be collapsed into two states ("saved" / "finished") if research shows it. Worth a quick test.

---

## 6. Brew guide (`src/app/brew-guide/`, `BrewMethodCard.tsx`)

### Maya L. `@design` `[minor]`
Consistent with the app overall — good. The `BrewMethodDetail` sections could use better typographic hierarchy; H2s and body text are too close in size.

### Devi N. `@eng` `[nit]`
`ArticleModal` traps focus correctly but doesn't return focus to the invoking element on close. Accessibility bug.

---

## 7. Shops (`src/app/shops/`, `ShopExplorer.tsx`, `CoffeeBeanWorldMap.tsx`)

### Jordan P. `@research` `[major]`
We still don't have evidence that the shops feature is being used. Engagement metrics from the last 30 days: 4% of sessions visit `/shops` at least once. Before investing more design time here, I recommend we either run 3 concept tests or deprioritize the surface.

### Sam K. `@pm` `[major]`
Agree with Jordan. Flagging for roadmap reconsideration.

---

## 8. Profile + Social (`ProfileView.tsx`, `SocialFeed.tsx`)

### Maya L. `@design` `[minor]`
`StarRating` uses a filled star for active and an outlined star for inactive, but the sizes don't match (filled is 1px larger). Visual nit.

### Riya V. `@copy` `[minor]`
Social feed empty state says "It's quiet in here." Fine but the follow-on ("Follow friends to see what they're brewing") doesn't match how the feed actually populates (algorithmic, not social-graph-driven). Misleading.

---

## 9. Checkout + Cart (`CartDrawer.tsx`, `CheckoutFlow.tsx`, `AddToCartControls.tsx`)

### Devi N. `@eng` `[major]`
Cart state is in `CartProvider` and persisted to localStorage. Good. But we're not showing a loading state during hydration — on slow connections the cart icon counter flashes from 0 to N. Use the `hydrated` flag from `useLocalStorage`.

### Sam K. `@pm` `[minor]`
Missing any indication of inventory on `AddToCartControls`. For a discovery-oriented product, a "low stock" or "shipping next batch" affordance would add urgency without being pushy.

---

## 10. Cross-cutting observations

### Maya L. `@design` `[major]`
**Design system drift.** We have 5 button styles across the app. Need to consolidate to 3 (primary / secondary / ghost) and document in a `Button` component. Right now every page re-implements.

### Riya V. `@copy` `[major]`
**Voice is inconsistent.** The hero is marketing-y, the diary is clinical, the quiz is playful, the checkout is terse. Need a brand voice doc and a pass across all user-facing strings. Recommend using the `copywriter` skill.

### Jordan P. `@research` `[blocker]`
**No analytics on core flows.** We have session-level data but no event instrumentation on quiz completion, diary-add, or catalog filter use. We are designing in the dark. Please prioritize a basic event schema before the next review.

### Sam K. `@pm` `[major]`
**Feature surface is sprawling.** We now have: homepage, catalog, bean detail, diary, quiz, brew guide, shops, profile, social, cart, checkout, orders, barista chat. Several are unvalidated. Propose we freeze new features and run a usage audit in the next 2 weeks before the roadmap update.

---

## Decisions captured in the room

1. Blocker items (Jordan's analytics call-out, diary empty state, score filter confusion) get fixed before we consider this review "closed."
2. Feature freeze on new surfaces until the usage audit lands.
3. Brand voice pass kicks off this week — Riya to lead, uses `copywriter` skill.
4. Shops surface goes on the "validate or cut" list.

---

## Append your own notes below (before running the workflow)

<!--
Add any additional feedback here. Use the same format:

### Your name `@tag` `[severity]`
Your comment.

Valid tags: @design, @research, @copy, @pm, @eng
Valid severities: [blocker], [major], [minor], [nit]
-->
