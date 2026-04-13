# Composition Mode

Stack multiple cognitive modes sequentially. Each mode's output becomes the next mode's input.

## Rules

1. **Maximum 3 modes per composition.** More than 3 produces unfocused mush. If you need more, run two separate compositions.
2. **Sequential, not parallel.** Each mode completes before the next begins. The output of mode 1 is the input to mode 2.
3. **Narrate the handoff.** Between modes, state: "Applying [mode] produced [key insight]. Now feeding that into [next mode]..." This keeps the reasoning chain traceable.
4. **Read each mode's reference file before executing it.** Don't rely on memory of the mode's process — load the full instructions for each mode in sequence.

## Invocation

`/unleash compose [mode1] [mode2] [mode3]`

Use mode names from the routing table: `first-principles`, `invert`, `temporal`, `subtract`, `10x`, `constraint`, `empathy`, `leverage`, `taste`, `bridge`, `red-team`, `reframe`, `oblique`.

Aliases also work in composition: `/unleash compose musk munger` → scale-break then inversion.

## Natural Pairs

These combinations produce particularly strong results:

| Composition | Why It Works |
|---|---|
| `first-principles` → `10x` | Decompose to axioms, then demand 10x on the rebuilt version |
| `invert` → `red-team` | Map the failure landscape, then attack the specific plan |
| `subtract` → `taste` | Strip to the bones, then make the bones beautiful |
| `empathy` → `reframe` | Inhabit the customer's reality, then design a game that serves it |
| `first-principles` → `reframe` | Decompose the problem, then ask if it's the right problem |
| `leverage` → `subtract` | Find the high-leverage point, then strip away everything except the intervention |
| `10x` → `constraint` | Identify the paradigm shift, then find how constraints make it feasible |

## Productive Tensions

Some combinations push in opposite directions. This is often valuable — the tension surfaces insights that neither mode alone would find. Flag the tension, don't avoid it:

| Composition | Tension |
|---|---|
| `subtract` → `10x` | Subtraction removes; scale-break adds ambition. The question becomes: "what's the most stripped-down version of the 10x paradigm?" |
| `first-principles` → `constraint` | First-principles discards constraints; constraint embrace celebrates them. The question becomes: "which constraints are actually generative?" |
| `taste` → `oblique` | Taste applies judgment; oblique introduces randomness. The question becomes: "can randomness produce something that satisfies aesthetic standards?" |

## Anti-Patterns

- **Don't compose modes that do the same thing.** `first-principles` → `invert` is fine (decompose, then flip). `invert` → `red-team` is fine (pre-plan failure mapping, then post-plan attack). But `subtract` → `subtract` is pointless.
- **Don't use composition to avoid choosing.** If you can't decide between two modes, pick the one that matches the stuck pattern. Composition is for synergy, not indecision.
- **Don't compose on trivial problems.** If a single mode would handle it, use a single mode.
