# Design Reviews

This folder is how we close the loop between a design review and the revisions that follow it.

## The loop

1. **Run the review.** Walk through the app. Capture feedback from every reviewer in a dated MD (see `2026-04-24-design-review.md` for the template). Tag each comment with a **discipline** (`@design`, `@research`, `@copy`, `@pm`, `@eng`) and a **severity** (`[blocker]`, `[major]`, `[minor]`, `[nit]`).
2. **Add your notes.** Open the MD, scroll to the bottom ("Append your own notes below"), paste in anything else the reviewers sent you async. Keep the tagging format — the workflow depends on it.
3. **Kick off the workflow.** Paste this into Claude:

   > Run the design review workflow on `reviews/2026-04-24-design-review.md` using the playbook in `reviews/WORKFLOW.md`.

4. **Review the plan.** Claude writes a routing table and a sequenced plan to `reviews/_plans/revision-plan-[date].md`. You pick which workstream to run first.
5. **Run each workstream.** The plan ends with the exact prompts to paste. Each one kicks off the right skill (`product-management:user-research-synthesis`, `copywriter`, `canvas-design`, etc.).

## Files in this folder

- `2026-04-24-design-review.md` — the current demo review, populated with realistic feedback from 5 reviewers across design, research, copy, PM, and eng. Edit this to add your own.
- `WORKFLOW.md` — Claude's playbook. Don't edit unless you're changing how routing works.
- `README.md` — this file.
- `_parsed/` — auto-generated structured JSON of each parsed review (created on first run).
- `_plans/` — auto-generated revision plans, one per review.
- `_tickets/` — auto-generated engineering tickets for `@eng` items.

## Tagging cheatsheet

```
### Reviewer Name `@tag` `[severity]`
Comment text.
```

| Tag | Means |
|---|---|
| `@design` | Visual, interaction, design-system issue. Routes to `canvas-design` or a design-system pass. |
| `@research` | Research finding, gap, or study request. Routes to `product-management:user-research-synthesis`. |
| `@copy` | User-facing string. Routes to `copywriter` (after `marketing:brand-voice` baseline). |
| `@pm` | Feature, roadmap, or scope call. Routes to `product-management:write-spec` or `roadmap-update`. |
| `@eng` | Technical/accessibility/perf. Becomes a ticket, not a skill run. |

| Severity | Means |
|---|---|
| `[blocker]` | Must be fixed before the review is "closed." |
| `[major]` | This cycle. |
| `[minor]` | Next cycle / batched pass. |
| `[nit]` | Backlog. |
