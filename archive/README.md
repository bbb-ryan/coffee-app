# Archive

This folder holds artifacts from prior phases of the coffee app that we're no longer actively building on, but want to preserve for context.

## Why archive instead of delete?

Future-us will ask "wait, what happened to that thing?" Archive answers that. It's institutional memory, not a graveyard.

## Convention

Each archived batch lives in a dated, named subfolder:

```
archive/<YYYY-MM>-<short-name>/
├── README.md          # what this is, why it's archived, what we learned
└── <files>
```

If you're archiving a single experiment, the `README.md` should be one paragraph. If it's a snapshot of multiple files, the README explains the batch.

See `docs/WORKFLOW.md` § 4 for the full archiving SOP.

## Current contents

- **`2026-05-presentations/`** — pptx and pdf decks accumulated during Phases 1–4. Kickoff, skills deck, UX researcher overview, review workflow deck.
- **`2026-05-prototypes/`** — loose HTML files that lived at the repo root (`one-more-cup.html`, `coffee_passport_world.html`, `design-review.html`). Snapshots of in-app surfaces from earlier exploration.
- **`2026-05-data/`** — UX research data exports (xlsx).
