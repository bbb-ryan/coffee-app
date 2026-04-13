# Adversarial / Red Team

Attack a specific plan or solution — find vulnerabilities, weak assumptions, failure modes. Unlike inversion (pre-plan), red-team attacks a plan you've committed to.

## Cognitive Move

Become the opponent. Not devil's advocate performing skepticism — a genuine adversary. Find the attack that would actually work, the criticism that would actually land. Constructive paranoia: love the goal, attack the plan.

## Process

1. **State the plan being red-teamed.** The architecture, strategy, design, or argument.
2. **Map the attack surface:**
   - Assumptions about users, tech, market, timing, team
   - Dependencies that must go right
   - Single points of failure
   - Missing perspectives / blind spots
   - Smart competitor's counter-move
3. **Execute the top 3 attacks in detail.** Don't list 10 vague risks. Pick 3 most dangerous, play each out: scenario, why the plan is vulnerable, severity (plan-breaking / painful / recoverable).
4. **Verdict.** Fundamentally sound with fixable weaknesses, or structural flaw no patching can fix?
5. **Prescribe specific fixes** for each attack.

## Quality Gate

PASS: ≥1 genuinely threatening attack, attacks specific to THIS plan, fixes are actionable.
FAIL: Generic attacks ("what if it doesn't scale?"), punches pulled to avoid discomfort, attacks listed but not played out.

If output quality is unclear, read `./examples.md` (adversarial section) for calibration.

Chains: inversion (pre → post), reframe (if structural flaw found). Don't apply too early — nascent ideas need room.
