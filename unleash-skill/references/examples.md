# Unleash Mode Examples — Good vs. Bad

Reference file. Read ONLY when you need to calibrate quality — not on every invocation.

## first-principles

**Problem**: "Reduce API response time from 200ms to 50ms"
- BAD: "Optimize caching, reduce payload, faster database." → Normal advice with "first principles" stamped on it.
- GOOD: "The framing assumes the client calls an API at all. Real constraint: user sees useful data within 50ms. What if data was already on the client? Eliminate the round trip, not optimize it."

## inversion

**Problem**: "Structure our team for product launch"
- BAD: "What would make team fail? Poor communication, unclear roles. So: clear communication, defined roles." → Common sense in reverse.
- GOOD: "Guarantee failure: put best engineer on greenfield, not the legacy integration nobody understands. PM owns timeline but not the dependency graph. Design finalizes before engineering spikes hard interactions." → Specific failure scenarios producing non-obvious team structure.

## scale-break

**Problem**: "Onboard customers faster (currently 3 days)"
- BAD: "10x: what if 7 hours? Automate email, pre-fill forms." → Same steps, smaller numbers.
- GOOD: "Ceiling: customer must configure product. Paradigm shift: product configures itself from imported data. 3 days → 3 minutes by eliminating decisions, not accelerating them."

## subtraction

**Problem**: "8-step onboarding, 40% drop-off"
- BAD: "Combine steps 3-4, remove tutorial. 5 steps." → Optimization, not subtraction.
- GOOD: Remove-test each step. Email verify? Delay. Choose plan? Start free. Setup workspace? Pre-populate. Result: create account → pre-configured workspace. One step.

## adversarial

**Problem**: "Launch freemium tier for growth"
- BAD: "Risks: low conversion, brand devaluation, support costs." → Generic risks.
- GOOD: "Attack 1 — negative selection: free users are most demanding, flood support, shift priorities away from paying users. Attack 2 — competitor imports your free users' data with one click, your free tier becomes their funnel."

## reframe

**Problem**: "Compete with Notion for team docs"
- BAD: "Compete on simplicity. Be the 'simple Notion.'" → Positioning within the same game.
- GOOD: "Eliminate: the editor, the assumption humans write docs. Create: docs that write themselves from source of truth. New game: 'living documentation nobody maintains.' Competitor isn't Notion — it's entropy."

## leverage

**Problem**: "Engineering velocity slowed, hire more engineers?"
- BAD: "Real leverage is better CI/CD and fewer meetings." → Still parameter-level.
- GOOD: Mapped reinforcing loop: slow reviews → context switching → lower quality → slower reviews. Hiring adds to both sides (net zero). Highest leverage: make review wait time visible + shift to pairing for complex work.

## temporal

**Problem**: "Build or buy auth?"
- BAD: "Long-term, own auth gives control. Short-term, Auth0 saves time." → Restating the trade-off.
- GOOD: "From 2036: auth is a commodity. Every custom system got migrated. The real lock-in wasn't auth — it was the user/permissions data model. Present action: design the data model first, pick auth that fits."

## empathy

**Problem**: "Design error state for API downtime"
- BAD: "Users want clear error messages. Show friendly page with retry." → Standard UX.
- GOOD: Inhabited the customer's customer: "I'm buying concert tickets, your payment API dies, I don't know you exist. I blame the ticket site." → Real design question: what structured error response helps YOUR customer protect THEIR user experience?

## taste

**Problem**: "Review CLI output formatting"
- BAD: "Add colors, alignment, header, table format." → Styling, not taste.
- GOOD: "Output answers 5 questions when user asked 1. Happy path: show just the URL. One line. Done. Details exist behind `--verbose`."

## constraint

**Problem**: "One engineer, 4 weeks to MVP"
- BAD: "Focus! Keep architecture simple, cut scope." → Scoping advice.
- GOOD: "One engineer = no coordination overhead, entire system in one head = coherence superpower. 4 weeks = forced into Clerk/Supabase/Vercel — better than you'd build. The constraint IS the architecture."

## pattern-bridge

**Problem**: "Platform cold-start problem"
- BAD: "Like a restaurant opening night — seed with content." → Surface metaphor.
- GOOD: Structural match to 1920s radio: bootstrapping problem solved by content valuable BEFORE audience existed (live sports). Transfer: features valuable to single user with zero data — personal tool that happens to get better with network.

## reframe (blue ocean)

Already covered above.

## oblique

**Problem**: "Differentiate note-taking app"
- BAD: "Do the opposite — minimalist!" → Most common positioning in the category.
- GOOD: Provocation "emphasize the flaws." Notes are messy, incomplete, decay. What if we celebrated that? Notes that visually age, show contradictions between old/new entries. Fragment worth keeping: decay visualization.
