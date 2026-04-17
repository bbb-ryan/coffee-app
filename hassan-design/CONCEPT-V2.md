# Coffee Decoder — Concept V2

> **Status:** Strategy pivot from the Field Guide direction
> **Supersedes:** `DESIGN.md` (kept for history and team context)
> **Branch:** `hassan/hassan-design`
> **Date:** April 2026

---

## The thesis

Coffee is uniquely knowledge-dependent, and the knowledge is scattered, gate-kept, or wrong. Roast date matters more than roast level. Light roast has more caffeine than dark. Most grocery-store bags are stale. "Specialty" is an SCA score, not a marketing word. These aren't trivia — they're **decision-unlocking facts** most people never learn.

The app is a **smart, opinionated layer between people and the coffee they buy**. It decodes what they're looking at, recommends what to try next, and deepens their knowledge at the moments they're ready for it — with a buy button always in reach.

Not a reference book. Not a brew timer. Not a café map. An advisor that travels with a person through every stage of their coffee life.

---

## The user — moments first, personas second

The primary design lens is **moments**, not audiences. The same person moves through all three, in different proportions, as they mature with coffee. The app recognizes which moment and serves accordingly. Same home screen, different emphasis.

### The three moments

**The discovery moment.** They just drank something great (or terrible) and want to know what it was. Triggered by a café drink, a gift bag, a new roaster's shelf. They need **decoding**.

**The purchase moment.** They're out of beans, or browsing a grocery aisle, or staring at 30 bags on a roaster's site. They know roughly what they like. They need **recommendations with teeth** — freshness, proximity, and a reason attached.

**The depth moment.** Once or twice a year: "I'm thinking about a Chemex." / "Should I try espresso?" / "What's the deal with Ethiopian naturals?" They're ready for the next level. They need **punctuated depth** — not daily content, strategic prompts.

### The personas — who lives in which moment

The personas from the original research (in `DESIGN.md`) stay alive as faces for the moments. They describe *how often* each person visits each moment, and they keep us honest when we design.

**Noor — Curious Home Brewer.** V60 on the counter, one bag a month from a local roaster, liked a Kenyan but can't say why. **Noor lives across all three moments.** She decodes ("what am I tasting?"), purchases monthly, and has 1–2 depth moments per year (a new method, a new origin). **Noor is the main character.** Every flow is designed for her first.

**Mika — Thoughtful Outsider.** Doesn't drink coffee but has to buy a bag for a partner's birthday. **Mika lives almost entirely in the purchase moment**, with a decode side-step when she's staring at a label she can't parse. She's a narrow-use persona — if the purchase flow works for her, it works.

**Dev — Roaster's Apprentice.** Learning to cup, building tasting vocabulary. **Dev lives constantly in the depth moment** — his version of "depth" is ongoing, not punctuated. He's a power user, not the primary target. The app serves him but we don't optimize for him; if we did, we'd alienate Noor and Mika.

**Why keep both lenses?** Moments describe *when* the product is used. Personas describe *who* uses each moment and *how often*. Together: "what does this specific person do when they open the app today?" Either lens alone loses resolution.

We'll revisit whether the personas stay once flows are tested — for now, they stay.

---

## Core behaviors

### 1. Decode
- **Scan a bag** (camera or manual) → reveal the roast date reality, roast-level context, caffeine truth, flavor-note translation, fair comparisons.
- **Decode a café** — "in-house roast on a Diedrich, brews Kalita and La Marzocco, serves single-origin espresso."
- **Decode a description** — "what does 'wet-hulled' actually mean and should I care?"

The killer move is **translation**. "Notes of stone fruit and bergamot" means nothing to most people. The app translates to anchors anyone has tasted: "tart like a ripe apricot, perfumed like Earl Grey tea."

### 2. Recommend with teeth
Recommendations beat competitors when they're specific:
- **Freshness** — "roasted 4 days ago by Mad Cap, shipping tomorrow"
- **Proximity** — "available at Trouble Coffee, 2 blocks from you"
- **Reason** — "you liked Ritual's Yirgacheffe; this shares its jasmine / lemon character"
- **One-tap buy** — affiliate link or direct roaster checkout

No generic "you might like." Every rec carries its reasoning and its action.

### 3. Punctuated depth
Most apps assume daily engagement. This one assumes the opposite: users open it at **decision moments**, maybe 2–5 times a month. Depth content fires at the right moment, not on a schedule:

- **Milestones** — "you've logged 12 beans; here's what your palate looks like"
- **Seasonal / behavioral prompts** — "been a year on pour-over; ready for espresso?"
- **Tool onboarding** — "got a new Chemex? here's a first brew calibrated to the bean you bought last week"

A depth prompt should fire **4–8 times per year per user, max**. If it becomes a daily newsletter, it kills the trust.

---

## The wedge: myth-busting

The fastest acquisition loop is short-form content that challenges what people think they know:

- "Light roast has more caffeine than dark"
- "That grocery-store bag was probably roasted 3 months ago"
- "Your drip isn't bad — your beans are stale"
- "'Specialty' is a specific thing, not just marketing"

TikTok, Reels, Shorts, X threads. Each one leads with a myth, demonstrates the reality, funnels to the app with **"we check this for you."** The content is the funnel. The app is the action layer.

---

## The commerce loop

Revenue = affiliate on the buy button.

- **Roaster partnerships** — flat % per sale, or monthly featured slot
- **Marketplace partners** — Trade, Atlas, regional roaster directories
- **Subscription introductions** — "try 3 beans we picked for you, $30"

No ads. No premium tier gating core features. Commerce is the flywheel — every decoded bag ends with a buy action, every café visit ends with a logged drink, every log feeds the next rec.

One feature worth gating (softly): **personalized recommendations** could require a free account (email capture). That email list is the highest-value marketing asset the product generates.

---

## Visual language

Bryan's brew-method illustrations in `BrewingCarousel.reference.tsx` establish the house style for every graphic in the app — brew icons, flow diagrams, myth-busting explainers, café profiles, empty states.

- **Warm, earthy palette.** Caramel (`#C4813D`), honey (`#E8B960`), cream (`#FFF8F0`), roast (`#6B3A2A`), espresso (`#2C1810`). No neons, no grays.
- **Cool accent for water and steam only.** Soft blue (`#93C5FD`), used sparingly, always in motion (streams, bubbles, steam).
- **Flat, diagrammatic, hand-feeling.** 120×120 viewBoxes, geometric shapes, warm outline strokes (1.5–2.5px), rounded corners. Not photorealistic. Not sterile.
- **Dashed lines for flow or implied motion.** Water streams, filter channels, anything happening rather than static.
- **Opacity-layered liquids.** Fills at 0.3–0.4 opacity suggest coffee in glass, fullness, transparency.

Every illustration in the product should feel like it came from this family. This reinforces the "teach, don't intimidate" ethos — warm, illustrated, plainspoken. When we diagram flows, when we explain myths, when we draw a café interior: same pens, same ink.

---

## What we are NOT building

Discipline is the strategy. Explicit no's:

- Brew timer (market saturated, wrong moment)
- Ratio calculator (same)
- Water chemistry tools (1% of users)
- Equipment-specific guides (irrelevant to the purchase moment)
- Generic cupping-score databases (we're the translation layer, not another SCA DB)
- Social feed (engagement trap; we're decision-moment, not daily)
- Gamification, streaks, badges (wrong product posture)

Every feature must earn a place by serving decode / recommend / depth for a purchase moment. The earlier plan we red-teamed is a museum of what not to build.

---

## Key flows

### Flow 1 — First run (trust → first purchase)

**Trigger:** download after a myth-busting post.

1. Welcome screen, one promise: **"We decode coffee so you buy better."**
2. Three-tap taste setup (skippable): "Black or with milk?" / "Light, medium, dark?" / "Bags per month?"
3. Home shows three decoded items to build trust before asking for anything:
   - A myth explainer ("light roast ≠ less caffeine")
   - An example decoded bag (stale-bag spotting)
   - "Three roasters near you shipped this week"
4. CTA: **"Decode a bag you own"** → camera or manual entry.
5. After first decode → **"based on what you scanned, here are 3 beans you'd probably love."** Buy button on one.
6. First purchase is the real activation.

**Success metric:** first purchase within 7 days of install.

---

### Flow 2 — Decode a bag

**Trigger:** user in front of a bag (grocery, café, gift, their own).

1. Tap camera, point at bag. (OCR: roaster, bean, origin, roast date, roast level, notes, claims.)
2. Results screen — the decoded reality, in order of importance:
   - **Roast date:** "Roasted 8 weeks ago — past prime. Drinkable, but the brightness will be muted."
   - **Roast level:** "Labeled medium-dark. This shop roasts darker than average; if you like Counter Culture's medium, this will taste roastier."
   - **Flavor notes translation:** "stone fruit, cocoa, brown sugar" → "ripe plum and dark chocolate dusted with raw sugar."
   - **Fair comparisons:** "Most similar to [bean] you logged in March."
3. Three actions: **Skip** (pass, logged) / **Try** (add to diary) / **Buy something similar** (3 fresh alternatives with reasoning).

**Edge case:** manual entry path when OCR fails. Autocomplete from known roasters + beans.

---

### Flow 3 — Recommendation loop

**Trigger:** app open at a purchase moment (out of beans, browsing, after a scan).

1. Home: **"Beans we think you'd love, roasted this week."**
2. Grid of 3–6 cards, each with:
   - Photo + roaster logo
   - **Roast date (always, every card)**
   - A "why this" chip — "Similar to the Ethiopia you logged in March"
   - Where to get it (roaster direct or marketplace partner)
   - What it'll taste like, in plain language
3. Tap → detail with full decoded info + action.
4. Tap buy → affiliate redirect, logged as "ordered, awaiting review."
5. 2–3 days after delivery → one-tap check-in: "how was it? loved / liked / meh."
6. Rating feeds the next recommendation.

**Mechanic:** hide what they don't drink. A latte drinker doesn't see single-origin espresso recs. Filter by actual consumption, learned over time.

---

### Flow 4 — The depth moment

**Trigger:** behavioral (10 logs in one method, 12-month anniversary, repeated search for a term) — not a cron.

1. Home surfaces a prompt: **"Ready to try espresso? Here's your first pull, calibrated for bean you bought last week."**
2. User accepts → 3–5 illustrated screens:
   - "Espresso vs pour-over in 30 seconds"
   - "Gear ranked by where to start"
   - "Three beans friendly for a first shot"
3. Action at the end: buy beans, save gear guide.
4. Module ends. **No follow-up drip.** The right thing at the right moment, then silence.

**Trust principle:** this cannot become a daily newsletter. Fires **4–8 times per year, per user, maximum.**

---

### Flow 5 — Café mode

**Trigger:** user in a new city, or opens café tab.

1. Home shifts to **"Coffee in [Portland]"** — a curated list of 20 shops.
2. Each card carries decoded specifics:
   - "Roasts in-house on a Diedrich"
   - "Brews Kalita Wave; espresso on La Marzocco Linea"
   - "Currently serving: Ethiopia Yirgacheffe, Colombia Supremo, house blend"
3. Filter by brew method, vibe (work / date / quick), open now.
4. Tap shop → detail with directions, **"what to order here if you like..."** (tied to their taste profile).
5. Post-visit quick log: "what did you have? rate it." Feeds recommendations.

**Curation principle:** 20 per city, not 200. Same principle as the bean field guide. Quality > coverage.

---

## Open questions (honest list)

Things we haven't figured out:

1. **Buy flow mechanics.** Affiliate = partner approvals + infra. Direct checkout = bigger build. v0 = roaster-site redirect (worst UX, fastest to ship). Which do we prototype first?
2. **Native or web?** Camera scan and push notifications argue for native. Team is web. A PWA might bridge — needs a prototype.
3. **Content capacity.** Someone has to write the decoded flavor translations, café profiles, myth explainers. This is editorial work, not code. Who? How does it scale?
4. **OCR accuracy on bags.** Prototype this early. If it's bad, the scan flow is a house of cards.
5. **Market size.** Is "people in a decide-to-buy-better-coffee moment" a 100k audience or a 10M one? Affects monetization assumptions.
6. **Phase 1 surface.** What's the smallest web product that proves the thesis? Probably NOT scan. Probably: decoded bean pages + recommendation layer with 1–2 roaster partners and a diary.

---

## If this lands

Next steps in priority order:

1. **Validate the wedge.** Test 3–5 myth-busting posts against the current audience. Does "stale grocery coffee" land harder than "notes of stone fruit"?
2. **Pick a scope for Phase 1 (web).** Candidate: decoded bean pages for the 20 curated beans + a recommendation page + a café profile for one city. No scan yet.
3. **Reuse what's already built.** The existing catalog, diary, and bean detail pages absorb into the new frame. Field Guide becomes *a layer inside* the decoder, not the whole app.
4. **Figure out the first commerce partner.** One roaster who'll take a direct link deal, so we can test the loop end-to-end.
5. **Mockups.** Once the concept is agreed, move to HTML mockups in `hassan-design/` for the 5 flows above.

---

*Concept V2 by Hassan with Claude Code — April 2026. Supersedes the Field Guide direction. The Field Guide lives on as a feature inside the decoder, not as the top-level product.*
