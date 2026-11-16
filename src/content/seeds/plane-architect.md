---
title: Plane architect (Rung 4)
description: The complex-space origin, the quarter-turn, and the handshake that keeps a sensitive edge admissible.
order: 5
updated: 2026-11-15
tags: rung-4, plane, 42i, handshake
---

This is the door for the person who has to *design* the plane, not just read from it.

## The ladder

```text
null → null exists → 0 is not null → -1 < 0 < 1
```

- **`null`** is *no plane*. Absence is not a value you can put in the graph.
- **`null exists`** is itself a fact. Unknown ≠ absent.
- **`0 is not null`** — a zeroed field is a *claim*, not absence. `charge 0` fails with `ErrDisconnected`.
- **`-1 < 0 < 1`** — magnitudes live in the weights; phases must cancel.

## The quarter-turn

`42i` is **a register change** between proven consensus and working hypothesis, on a plane where every universe agrees where zero is:

| Rotation | Register |
| --- | --- |
| R⁰ `42 + 0i` | proven consensus — asserted |
| R¹ `0 + 42i` | working hypothesis — not asserted |
| R² `−42 + 0i` | contradiction (sign flip) |
| R³ `−42i` | hypothesis, opposing sector |

Anchors are never mixed within a run. Rotation count is metadata, never a plane label.

## The handshake

An edge is admissible only when `q_a + q_b = 0`. A lone `+1` is a half-edge that cannot enter the mesh. The sensitive predicate sits at `0 + 42i`, `assertable: false`, addressable only through the reader's click-through — so the corpus never asserts a stranger's medical situation as a side effect of a citation.

The whole design is the [`/rotations.json`](/rotations.json) ledger, made literal.
