---
title: Agent operator (Rung 3)
description: Citations as executable instructions — /llms.txt, researchInstructions, and UniverseBuilder definitions.
order: 4
updated: 2026-11-15
tags: rung-3, agents, mcp, llms-txt
---

A citation should be **executable**: it should tell the next human *and* the next agent *how to go research*, not just what to cite.

## The machine contract

- [`/llms.txt`](/llms.txt) — every route, the build commands, the invariants. An agent can take the site and go.
- [`/rotations.json`](/rotations.json) — the rotation ledger: consensus claims, working hypotheses, and open handshakes.
- [`/data/open-arms.universe.json`](/data/open-arms.universe.json) — the universe, curl-able.

## `researchInstructions`

Each citation carries a chain of steps. A step may be conditional:

```text
open_candidate → isCrowdfundingCampaign: true
  onSuccess → verify real-axis claim; leave latent at source; open handshake
  onDefer   → record seen; admissible=false; citation renders unchanged
  onFail    → record unreachable; degrade to seen; never infer the reason
```

`onDefer` is not a failure — it does not decay the citation. The half-edge simply stays open.

## The invariant

The machine never mixes anchors within a run. `42` and `42i` are distinct; `charge 0` is `ErrDisconnected`; `rotation.count === 2` forces `relationshipType: contradicts`. When you build a `local-time` `UniverseBuilder` definition, those are the guardrails, not the garnish.
