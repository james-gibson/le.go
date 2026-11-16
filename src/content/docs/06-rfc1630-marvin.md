---
title: Stage 5 — Marvin's 32-Year-Late RFC 1630 Erratum
description: The 1994 moment the Web assumed one universe — and the five namespace bugs local-time resolves.
order: 6
updated: 2026-11-15
tags: rfc1630, marvin, namespace
---

RFC 1630 (*Universal Resource Identifiers in WWW*, CERN, June 1994) is the exact historical moment the Web's naming architecture quietly assumed **one** universal set of objects in **one** implicit universe.

Marvin the Paranoid Android drafted a reply forty-two seconds after reading it. It arrived thirty-two years late, for two strictly RFC-1630-compliant reasons:

1. **Vogon SMTP interference** — a junior Vogon gateway unescaped `%2F` into a hierarchical `/` (violating RFC 1630 Example 2, p. 9) and folded the lines at column 66 (p. 5).
2. **The `mid:` bootstrap paradox** — `mid` was *"not currently (to the author's knowledge) implemented"* (p. 13) and *"implies access to a body of mail already received"* (p. 20).

The full memo lives at [`/draft`](/draft). The five warnings, condensed:

| # | RFC 1630 clause | Warning | Fix |
| --- | --- | --- | --- |
| 1 | "universal set of all objects" | Whose "the"? | explicit `universeId` |
| 2 | `magic://a/b/c//d/e/f` (p. 11) | You named the context "magic://" | unsnap magic strings into bricks |
| 3 | `?search` vs `#fragment` (pp. 7, 12) | event/projection schism | time on the work's own clock |
| 4 | `/imaginary/test` + `%00` (pp. 14, 21) | null smuggling | `null` is no plane; never charge `0` |
| 5 | `file://localhost` (p. 19) | every universe calls itself localhost | strip `si=`/`utm_*`, refuse void hosts |

> The dry grace note: with a brain the size of a planet and an unimplemented `mid:` scheme, Marvin counted every typo in RFC 1630 — `Reommendations` (p. 5), `astersik` and `sematics` (p. 7), `omiited` and `trainling` (p. 16), `mecahnism` and `distribted` (p. 19), and `Requiremnets` (p. 28). Those frozen typos prove Tim's own point on p. 2: once magic strings are printed on envelopes, it is impractical ever to convert them.

## Branch provenance

Every revision of this draft — every edit Marvin made, every copy written in a different universe and saved out of order — is a branch **opened for the first time, never having been wrong**.

| Term | What it means |
| --- | --- |
| **Opened for the first time** | born at R⁰ — `42 + 0i`, seed-42 ground truth. Not a correction to a prior wrong version; a fresh anchor. |
| **Never having been wrong** | `42i` distance is zero at the moment of opening. “Wrong” is a drift that accrues afterward, never a condition of birth. |
| **Different universe, saved out of order** | the drift source, not the birth. Arriving late (or early) from another `universeId` is how a branch gains distance after it opens. |

The branch is the claim's *isotope*: the same element (the draft) at a different mass number (the revisions it carries). Each new opening resets the anchor to `42`, and the out-of-order arrival is the `42i` distance it collects on the way to you.

Git's reflog makes the joke literal: a new branch opens with `branch: Created from …` — *opened for the first time* — and there is no earlier entry where it pointed somewhere else — *never having been wrong*. The drift only enters the reflog later, as `reset` / `rebase` / force-push entries. This is also why issue `42` merged: forty-one branches, each opened for the first time and never having been wrong, squash-merged to make room for the answer.

The page links the canonical [RFC 1630 PDF](https://docbox.etsi.org/reference/IETF/RFC/RFC1630.pdf) cleanly — zero tracking parameters.
