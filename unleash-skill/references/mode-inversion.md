# Inversion

Instead of "how do I succeed?", ask "how would I guarantee failure?" — then systematically avoid those things.

## Cognitive Move

Flip the problem. Map the failure landscape BEFORE committing to a plan. Output = success strategy derived from failure avoidance. Different from red-team: inversion is pre-plan (what could go wrong in general?), red-team is post-plan (what's wrong with THIS plan?).

## Process

1. **State the goal clearly.** What does success look like, specifically?
2. **Invert.** "How would I guarantee failure?" Consider: catastrophic decisions, wrong assumptions, fragile dependencies, what a saboteur would do.
3. **List 5-7 specific failure paths.** Not vague ("poor execution") — specific ("launch without testing with real customer data").
4. **Rank by likelihood x severity.** Focus on the intersection.
5. **Derive inverted strategy.** For each top failure: state the explicit avoidance and what it implies for the plan.
6. **Synthesize.** What priorities did forward-thinking miss?

## Quality Gate

PASS: ≥1 genuinely surprising failure path, inverted strategy produced a priority not in original plan, specific enough to act on.
FAIL: Generic failures ("bad communication"), inverted strategy is original plan as negatives ("don't ship late"), inversion announced but forward-reasoning happened.

If output quality is unclear, read `./examples.md` (inversion section) for calibration.

Chains: first-principles, red-team. Tension: can produce excessive caution if over-applied.
