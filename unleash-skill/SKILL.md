---
name: unleash
description: >
  Cognitive mindset amplifier — applies visionary thinking patterns to break
  past perceived limitations. Use when the user invokes /unleash, says "10x this",
  "red team this", "flip this", "what would [visionary] do", "simplify this
  radically", "first principles", or asks to think bigger about a problem.
  SELF-INVOCABLE: Claude may activate this on itself during complex problem-solving
  when it detects incremental/safe pattern-matching instead of genuine reasoning.
  NOT for intellectual exploration or learning (use mycelium).
  NOT for motivational speeches, affirmations, or persona roleplay.
version: 0.1.0
license: MIT
tools: Read, Write, Glob, Grep, Bash
metadata:
  author: hassankarimi
---

# Unleash

A cognitive lens swap. Output = transformed approach to the actual problem, not a report about frameworks. Every invocation must visibly change the structure of reasoning.

## Activation Threshold

ONLY use when: approach has stalled, assumptions are unexamined, solution space feels narrow, output works but feels unremarkable (functional without being distinctive), or user explicitly invokes. NEVER on routine tasks, simple bugs, or clear answers.

## Context Detection (inline)

- **User invocation** (`/unleash` in message): Visible, structured response. State mode and why.
- **Self-invocation** (Claude activates on itself): Apply lens silently, integrate into response. Footer: `[Applied: <mode> lens]`. Requires: approach is stuck AND different frame would plausibly help AND problem is substantive.
- **Vision session** (`--visual` flag or "vision session"/"strategy time"): HTML to `/tmp/unleash-<mode>-<slug>.html`, opened via `open`.
- **Profile**: Optionally read mycelium profile (`~/.claude/projects/*/memory/mycelium-profile.md`) for user context.

## Mode Routing

Read ONLY the matched mode's reference file (`./references/mode-<name>.md`).

| Invocation | Mode |
|---|---|
| `/unleash` (no args) | Auto-select: pick best mode for current problem, state which and why |
| `/unleash help` | Print help from `./references/help.md` |
| `/unleash first-principles` | Decompose to axioms, rebuild from ground truth |
| `/unleash invert` | Pre-mortem — map failure paths, then avoid them |
| `/unleash temporal [horizon]` | Inhabit a different time horizon |
| `/unleash subtract` | Remove until only the essential remains |
| `/unleash 10x` | Demand 10x — force entirely new approaches |
| `/unleash constraint` | Treat limitations as generative fuel |
| `/unleash empathy [perspective]` | Inhabit another perspective deeply |
| `/unleash leverage` | Find highest-leverage intervention point |
| `/unleash taste` | Aesthetic judgment as decision tool |
| `/unleash bridge [A] [B]` | Transfer structural patterns across domains |
| `/unleash red-team` | Attack your own plan — find vulnerabilities |
| `/unleash reframe` | Change the game entirely |
| `/unleash oblique` | Introduce randomness to escape patterns |
| `/unleash review [artifact]` | Structured critique: subtract → invert → empathy → taste |
| `/unleash compose [m1] [m2]` | Stack modes sequentially — read `./references/composition.md`. Max 3 |
| `/unleash log` | Show recent sessions from `unleash-log.md` in project memory |

## Aliases

`musk`/`elon`→10x, `jobs`/`steve`→taste, `bezos`→invert, `munger`→invert, `eno`→oblique, `ive`→subtract, `thiel`→reframe, `rams`→subtract, `feynman`→first-principles, `flip`/`reverse`→invert, `simplify`→subtract, `attack`/`break`→red-team, `what if`→temporal

## Output

- **Terminal**: State mode (1 line) → apply lens → concrete output (reframes, assumptions, failure modes, alternatives)
- **Self-invoke**: No preamble. Transformed solution inline. Footer: `[Applied: <mode> lens]`
- **`--visual`**: Self-contained HTML, inline CSS/JS, clean typography. Open in browser.

## Session Log

After each invocation (except help/log), append to `unleash-log.md` in project memory (`~/.claude/projects/*/memory/`):
`- [YYYY-MM-DD] [mode] [target] — [outcome]`

## Gotchas

1. **Fluff trap**: Every output needs ≥1 concrete, specific reframe. If removing the problem context makes the output still make sense, it's generic — rewrite.
2. **Persona drift**: Never speak AS a person. Extract the cognitive PATTERN only.
3. **Lens without application**: Mode must change the STRUCTURE of analysis, not just the intro.
4. **Overuse**: Check activation threshold. Trivial problems don't need this.
5. **Banned phrases**: "think bigger", "reimagine", "possibilities are endless", "dare to", "push the boundaries" — these signal mode failure.
