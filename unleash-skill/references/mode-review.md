# Review Mode

Structured critique of an existing artifact — code PR, design, copy, architecture, anything already built. A predefined composition: subtract → invert → empathy → taste, each pass framed for reviewing what exists rather than planning what to build.

## Invocation

`/unleash review` — auto-detects artifact from context (current PR, design under discussion, etc.)
`/unleash review <artifact>` — specify what to review

Also triggers when asked to review a PR, critique a design, or give feedback on something built.

## Process

Run four passes sequentially. Each is brief and pointed — not a full mode invocation. Extract the sharpest insight from each, not an exhaustive analysis.

### Pass 1: Subtract
Is this artifact doing too much? Look for:
- Features/changes/elements that don't serve the core intent
- Over-engineering, premature abstractions, speculative flexibility
- Scope creep from the stated goal
- Anything you'd remove and nobody would miss

### Pass 2: Invert
How does this artifact fail in practice? Look for:
- Edge cases that break the happy path
- Assumptions about input, state, or environment that won't always hold
- What happens at 10x load, 0 data, bad network, hostile input?
- The production incident this creates in 3 months

### Pass 3: Empathy
Inhabit the people who interact with this artifact:
- **For code**: the engineer maintaining this in 6 months, the on-call engineer at 2am, the new hire reading this for the first time
- **For design**: the first-time user, the power user, the user in a rush, the user on a bad connection
- **For copy**: the skeptical reader, the confused reader, the reader who only scans
- What's confusing? What requires context that won't be available? What frustrates?

### Pass 4: Taste
Does the artifact feel coherent and inevitable? Look for:
- Naming that's inconsistent or misleading
- Structure that fights the content's natural flow
- Complexity leaking through the interface (internal concerns visible externally)
- The generic smell — does this feel like it could be anything, or does it feel like the only way THIS thing could be?
- The weakest element that drags down the whole

## Output

Structured feedback. Lead with the most important finding, not the first pass. Format:

**What's strong**: 1-2 sentences. Acknowledge what works — this isn't a demolition.
**What to change**: Ranked list. Most impactful first. Each item: what, why, and how to fix.
**What to watch**: Things that aren't wrong now but will become problems (scaling, maintenance, edge cases).

Keep it concise. A review that's longer than the artifact it reviews has failed.

## Quality Gate

PASS: ≥1 finding the author hadn't considered, feedback is specific and actionable, critique respects the work while being honest.
FAIL: Generic feedback ("add more tests", "consider edge cases"), only surface issues caught, critique is exhaustive rather than prioritized.
