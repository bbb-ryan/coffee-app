# Design Review → Revision Workflow

This file is Claude's playbook for turning a completed design review MD into a multi-discipline revision plan. When the user says "run the design review workflow on [file]" or "kick off the workflow" with a review MD open, follow this document step by step.

---

## 0. Preconditions

- A design review MD exists in `/reviews/` (e.g., `2026-04-24-design-review.md`).
- Reviewers have tagged each comment with a discipline (`@design`, `@research`, `@copy`, `@pm`, `@eng`) and a severity (`[blocker]`, `[major]`, `[minor]`, `[nit]`).
- The user wants a plan that routes each piece of feedback to the right agent/skill, not a monolithic response.

---

## 1. Parse

Read the review file and build a structured list. For each comment, capture:

- `id` — stable identifier (e.g., `R1-maya-1` = Section 1, Maya's first comment)
- `reviewer`
- `discipline` — one of `design | research | copy | pm | eng`
- `severity` — one of `blocker | major | minor | nit`
- `section` — which part of the app
- `summary` — one sentence, Claude's own words
- `raw` — the original text (for traceability)

Write the parsed list to `/reviews/_parsed/[review-filename].json` so downstream steps have a canonical source. Create the `_parsed` folder if it doesn't exist.

**Validation.** Every comment must have exactly one `@discipline` tag and one `[severity]` tag. If a comment is missing either, append it to a `needs_triage` list and stop — ask the user to clarify before routing.

---

## 2. Triage & route

Group parsed items by discipline. For each group, pick the right agent/skill:

| Discipline | Primary skill | When to use |
|---|---|---|
| `@research` | `product-management:user-research-synthesis` | Synthesize findings, flag research gaps, propose studies. Also: `product-management:metrics-review` when the item is about instrumentation or analytics. |
| `@design` | `canvas-design` + internal design-system pass | Visual/interaction issues. For component/design-system items, route to a design-system sub-task rather than a one-off visual. |
| `@copy` | `copywriter` | Any user-facing string. Always run `marketing:brand-voice` (or the brand-voice doc if present) as a prerequisite for consistency. |
| `@pm` | `product-management:write-spec` (for new/changed features) or `product-management:roadmap-update` (for prioritization/cut decisions) | PM comments typically resolve into either a spec or a roadmap entry. |
| `@eng` | No skill — generate a concise engineering ticket (title, repro, acceptance criteria) in `/reviews/_tickets/eng-[date].md`. | Engineering items should not go through a content skill. |

**Severity → urgency mapping:**

- `[blocker]` → must be addressed before the review is closed. Surface at the top of the plan.
- `[major]` → include in the current cycle.
- `[minor]` → batch into the next design-system / copy pass.
- `[nit]` → log to backlog, don't block.

---

## 3. Sequence

Default ordering (start here, adjust if the review content dictates otherwise):

1. **Research first.** Any `@research` `[blocker]` or `[major]` item is a gate — if we're designing in the dark, fix that before spending design cycles. Run `product-management:user-research-synthesis` on the research group and produce a "research gaps + proposed studies" doc.
2. **PM framing second.** Run `product-management:write-spec` or `roadmap-update` on `@pm` items so design has a sharp problem statement before iterating.
3. **Design third.** Address `@design` items, prioritizing design-system consolidation (which unblocks many downstream items) before one-off visual fixes.
4. **Copy fourth.** Run `marketing:brand-voice` (or create a brand voice doc if none exists) once, then `copywriter` for the per-surface revisions. Copy depends on the PM framing and the visual direction.
5. **Engineering last** (in terms of content work) but **in parallel** where the eng item is independent (accessibility, hydration bugs, etc.).

Document the sequence as a Mermaid diagram in the output plan.

---

## 4. Produce the revision plan

Write `/reviews/_plans/revision-plan-[review-date].md` containing:

1. **Executive summary** — 3-5 bullets, blockers first.
2. **Routing table** — one row per comment: id, discipline, severity, assigned skill/agent, owner (from reviewer name or "unassigned"), status (always `pending` initially).
3. **Sequenced workstreams** — one section per discipline with the ordered list of tasks, each as: problem → proposed action → skill to run → acceptance criteria.
4. **Open questions** — anything you couldn't route confidently. Ask the user here rather than guessing.
5. **Next-step prompts** — for each workstream, the exact prompt to type to kick it off. Example: `"Run product-management:user-research-synthesis on the @research items in revision-plan-2026-04-24.md"`.

---

## 5. Hand off

After writing the plan:

1. Present `revision-plan-[date].md` with a `computer://` link.
2. Show a one-screen summary: counts by discipline, count of blockers, and the single most urgent next prompt the user should run.
3. Do **not** auto-run downstream skills — hand control back so the user picks up in whichever direction they want.

---

## Agent invocation notes

- When a step is a research synthesis or a spec write, prefer a subagent via the `Agent` tool (subagent_type: `general-purpose`) with the specific skill invocation in the prompt. This keeps each discipline's work isolated and avoids context pollution.
- For copy revisions, load `copywriter` in the main thread — it's tightly scoped and benefits from the review context already loaded.
- If any `@eng` item is a blocker, surface it in the summary even though eng is last in the sequence. Blockers override sequence.

---

## Failure modes to avoid

- **Do not write a single monolithic response.** The point of the workflow is routing, not synthesis.
- **Do not silently drop comments.** Every comment ends up in the routing table, even `[nit]`s (marked "backlog").
- **Do not re-interpret reviewer intent.** If a comment is ambiguous, list it under Open Questions.
- **Do not pick a skill that doesn't match the tag.** If you think the tag is wrong, flag it; don't override.
