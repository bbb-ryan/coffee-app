---
name: design-review-intake
description: "Process design review feedback from the review tool (design-review.html) into actionable recommendations routed to the right skills. Use this skill when a team member has completed a design review and you need to intake their feedback, synthesize findings, and kick off the fix workflow. Trigger on: design review, intake feedback, process review, review export, design recommendations, triage feedback, review walkthrough."
---

# Design Review Intake — Coffee App

You take the raw output from the design review tool (`design-review.html`) and turn it into a structured set of recommendations that route to the right skills for action.

## What triggers this skill

A team member has completed a screen-by-screen review using `design-review.html` and either:
- Exported a markdown file that needs to be processed
- Pasted review content directly
- Asked you to read review files from `references/design-reviews/`

## Step 1 — Locate and read the review data

Check for review input in this order:

1. **Direct input** — The user pasted or provided review markdown in the conversation
2. **Review files** — Read all `.md` files in `.claude/skills/ux-researcher/references/design-reviews/` (excluding `README.md`)
3. **If no reviews exist** — Tell the user to open `design-review.html` in their browser, walk through the app, and export their feedback. The export drops a markdown file they can place in the `design-reviews/` folder or paste directly.

## Step 2 — Parse and categorize findings

For each screen reviewed, extract:

- **Screen name and route** (e.g., Homepage `/`, Bean Detail `/beans/[id]`)
- **Severity** (Critical, Major, Minor, No issues)
- **Heuristic flags** — Which of the 10 heuristics were violated
- **Skill routing** — Which skill(s) the reviewer tagged (Designer, Copywriter, QA Reviewer, Researcher, UX Researcher)
- **First impression** — The reviewer's gut reaction
- **Detailed notes** — Specific observations and suggestions

## Step 3 — Synthesize into recommendations

Group findings by **skill route**, not by screen. Each skill team needs a clear list of what to fix.

### Output format

```markdown
# Design Review Recommendations

**Source:** {reviewer name(s)} | **Date:** {review date(s)}
**Screens reviewed:** {count} | **Issues flagged:** {count} | **Critical:** {count}

---

## Critical Issues (fix first)

{List any critical-severity findings across all screens, with screen name and specific issue}

---

## Recommendations for Designer

### {Screen Name} (`/route`)
- **Issue:** {what's wrong}
- **Heuristic:** {which heuristic was violated}
- **Suggestion:** {concrete fix}

{Repeat for each finding routed to designer}

## Recommendations for Copywriter

{Same format}

## Recommendations for QA Reviewer

{Same format}

## Recommendations for Researcher

{Same format}

## Recommendations for UX Researcher

{Same format}

---

## Bright Spots (preserve these)

{Screens or elements that got "No issues" or positive first impressions}
```

## Step 4 — Save and hand off

1. **Save the recommendations** to `.claude/skills/ux-researcher/references/design-reviews/recommendations-{date}.md`
2. **If the original review markdown was provided directly** and isn't already saved, save it to `.claude/skills/ux-researcher/references/design-reviews/design-review-{reviewer}-{date}.md`
3. **Summarize for the user** — Show a quick triage: how many issues by severity, which skills have the most work, and what the top 3 priorities are

## Cross-referencing multiple reviews

When multiple review files exist:

- Look for **convergence** — Same screen + same heuristic flagged by 2+ reviewers = high-confidence issue
- Look for **divergence** — One reviewer flags critical, another says no issues = needs discussion
- **Weight by consensus**, not by the loudest single reviewer
- Call out which findings have multi-reviewer agreement vs. single-reviewer opinion

## Connecting to the workflow

After generating recommendations, suggest next steps:

- "Run `/designer` to address the {N} visual issues flagged"
- "Run `/copywriter` to fix the {N} copy issues identified"
- "Run `/qa-reviewer` to check the {N} accessibility/interaction findings"
- "Run `/ux-researcher` to do a deeper audit on screens with critical findings"

This skill is the bridge between **human review** and **skill-driven fixes**.
