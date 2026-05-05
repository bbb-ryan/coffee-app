# Team Workflow — Phase 5 SOPs

> **Status:** Active as of 2026-05-06
> **Why this exists:** Phases 1–4 were exploratory. We accumulated sprawl: stray HTML files at the repo root, branches that never landed, unmerged design experiments, parallel concept docs. This document defines how we work from Phase 5 onward.

---

## North star

**Small changes, on branches, reviewed by one teammate, merged often.** No long-running personal kingdoms. No experiments that don't get archived or absorbed. Every piece of work has a home.

---

## 1. Branching

### Branch naming

```
<your-name>/<short-kebab-description>
```

Examples:
- `emily/taste-profile-provider`
- `hassan/decode-bag-flow`
- `zara/personalized-hero`

### Branch lifecycle

A branch should live **no longer than a week** before it lands or gets archived. If a branch sits open for >7 days:

- If the work is alive: rebase it onto `main`, open a PR (even if WIP), get a teammate's eyes on it.
- If it's stalled: archive it (see "Archiving experiments" below) or delete it.

**No long-running design branches.** Hassan's `hassan-design` and Zara's `unified-app`, etc. were useful in the exploration phase but they trapped work. From Phase 5 on, design exploration lives in `prototypes/` on a short-lived branch, lands quickly, and gets reviewed.

### Main branch protection

- `main` is the source of truth.
- Never commit directly to `main`. Always go through a PR.
- `main` should always build and run.

### Rebasing vs. merging

- Rebase your branch onto `main` before opening a PR (`git pull --rebase origin main`).
- Use **merge commits** when landing PRs into `main` (preserves the PR boundary in history).

---

## 2. Pull requests

### When to open a PR

As soon as you have something runnable — even WIP. Don't wait for "done." A draft PR with a screenshot is better than a hidden branch.

### PR title

```
<area>: <what changed>
```

Examples:
- `taste-profile: add provider + localStorage persistence`
- `homepage: personalize hero copy for returning users`
- `cleanup: archive Phase 1–4 prototypes`

### PR description template

Every PR description has these four sections:

```markdown
## What

One paragraph. What does this change do?

## Why

Link to the doc, ticket, or meeting note this came from. If it's not tied to anything, explain the motivation.

## Screenshots / video

Mandatory for any UI change. Before/after if relevant.

## How to review

What should the reviewer look at? Specific files? Specific flows in the app?
```

### Review

- **At least one teammate reviews** before merge.
- Reviewer is responsible for: pulling the branch, running it locally if it's a UI change, leaving inline comments where needed, and approving or requesting changes explicitly.
- The skill `qa-reviewer` is a useful first pass — run it against the diff before requesting human review.
- Merge is the **author's** responsibility, not the reviewer's. If you approve, leave it for the author to land.

---

## 3. Commits

- Commit messages follow the same `<area>: <what>` shape as PR titles.
- Small, focused commits. Squashing on merge is fine but commit history during the branch should be readable.
- **Never** force-push to `main`. Force-pushing to your own branch is fine before review starts; avoid it after.

---

## 4. File structure rules

### Where things go

| Type | Location |
|---|---|
| Production app code | `src/` |
| Strategic docs | `docs/` |
| Design review feedback | `reviews/` |
| Design / concept exploration | `prototypes/` (new — see below) |
| Historical artifacts (presentations, old HTML, old data exports) | `archive/` |
| Reusable Claude skills | `.claude/skills/` |

### `prototypes/`

A new folder for design and concept exploration that hasn't earned a place in `src/` yet. Replaces ad-hoc `hassan-design/`-style folders.

Rules:
- Each prototype is a folder: `prototypes/<name>/` with a `README.md` explaining what it is, who made it, what it's testing.
- HTML mockups live here. Reference `.tsx` files (not part of the build) live here.
- A prototype is **either absorbed into `src/` within a sprint, or moved to `archive/`**. It does not live in `prototypes/` indefinitely.

### Archiving experiments

When a prototype, branch, or feature is not moving forward:

1. Move the files to `archive/<YYYY-MM>-<name>/`.
2. Add a one-paragraph `README.md` in that folder: what it was, why it's archived, what we learned.
3. Commit the move with `archive: <name> — <one-line reason>`.

Archive is for the future-us who asks "wait, what happened to that thing?" It's not a graveyard, it's institutional memory.

### What does NOT go in the repo root

- Loose HTML files
- Loose `.pptx`, `.pdf`, `.xlsx`
- Loose data exports
- Anything that's not configuration, lockfile, or one of: `README.md`, `CLAUDE.md`, `.gitignore`, `.gitattributes`, `next.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `next-env.d.ts`

If you're tempted to drop a file at the root, it probably belongs in `archive/`, `docs/`, or `prototypes/`.

---

## 5. Working with Claude Code

This is what makes us different from any other team. Claude is a teammate, not a tool. Same conventions apply:

- Claude follows the SOPs in this doc. If Claude does something off-process, push back.
- Use the project-level skills in `.claude/skills/` (copywriter, designer, qa-reviewer, researcher, ux-researcher) — they're tuned for this app.
- For multi-step work, ask Claude to plan first, then execute. Use `EnterPlanMode` when the change is non-trivial.
- When Claude makes a meaningful decision that future-Claude (or future-us) should know, ask it to save a memory.

### Skills, briefly

| Skill | When to use |
|---|---|
| `copywriter` | Any user-facing string — headlines, CTAs, empty states, error messages |
| `designer` | UI / layout / component decisions |
| `ux-researcher` | Before *and* after a feature: heuristic and usability evaluation |
| `qa-reviewer` | Pre-merge code review pass |
| `researcher` | Coffee domain knowledge, competitive analysis, data analysis |
| `design-review-intake` | Routing reviewer feedback into actionable workstreams |

---

## 6. Documentation discipline

- **Decisions go in `docs/`.** If we agree on something in a meeting, it's not real until it's in a doc.
- **One doc per topic, evolved over time.** Don't create `VISION_v2.md`, `VISION_FINAL.md`, etc. Update the existing doc and let git track history.
- **Date and author the top of any doc that captures a moment** (meeting notes, review summaries). Strategic docs (vision, workflow) don't need dates — they're evergreen.
- **Archive superseded docs to `docs/archive/`** rather than deleting them. They're useful for understanding why we are where we are.

---

## 7. Review cadence

- **Weekly team sync** — 30 min. Review open PRs, surface blockers, decide what's next.
- **Bi-weekly design review** — use the existing `reviews/` workflow. Concrete app surfaces only, no vague vibes.
- **Monthly direction check** — re-read the current phase vision doc together. Are we still pointed at the right thing? Update the doc or change course.

---

## 8. The "is this in scope?" test

Before starting any work, ask:

1. Does this serve the current phase vision (Phase 5: personalization)?
2. Is there a specific user surface this lands on?
3. Is there a clear "done" state?

If the answers are yes / yes / yes — go. If any answer is fuzzy, write up the idea in `docs/proposals/` (new folder) and bring it to the next sync. Don't start coding.

---

## Migration from Phases 1–4

Things being addressed in the Phase 5 cleanup PR (see `docs/PHASE_5_VISION.md`):

- Loose HTML files at the root → `archive/2026-05-prototypes/`
- Loose presentations / PDFs / xlsx → `archive/2026-05-presentations/`
- Old phase-specific docs (e.g., `Kickoff_Guide.md` was for Phase 1) → `docs/archive/`
- Hassan's `hassan-design/` exploration → discuss in meeting; either move to `prototypes/decoder/` and absorb into Phase 5, or archive.
- Long-running personal branches (`emily`, `zara/unified-app`, `hassan/hassan-design`) → land or archive after the meeting.

---

*This doc is the rules of the road. If a rule here is wrong, change the rule in a PR — don't quietly violate it.*
