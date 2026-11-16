---
title: Stage 1 — From 025.431 to Ritual Magic Strings
description: How a Dewey number worked because the library building answered "in what universe?" for free.
order: 2
updated: 2026-11-15
tags: dewey, magic strings, apa, mla, chicago
---

For seven and a half million years (give or take a Melvil Dewey), Deep Thought's academic cousins ran on **magic strings**.

## Why `025.431` worked

A Dewey Decimal number is a magic string. `025.431` means *classification systems* — but only because a physical library was a **single implicit universe**: one building, one card catalogue, one bound octavo edition on the third shelf from the floor, and zero mid-roll ads injected between pages 41 and 42.

> Asking *"in what universe?"* inside a brick library sounded like asking a fish about water.

The building answered the question for free. The string only had to encode *which shelf*.

## Why the magic string broke

On the open web, academia kept the magic-string habit and replaced shelf coordinates with **ritual punctuation**:

| Style | The incantation | The part that does no work |
| --- | --- | --- |
| APA 7 | italicised title, `[Video]`, uploader-as-author, full date | decides where the period goes *outside* the quotes |
| MLA 9 | title in quotes, `YouTube` as container, uploader as contributor | drops `https://` from the Location as a ward against evil spirits |
| Chicago 18 | note vs. bibliography form, medium "video", running time | tells you the citation is *a stub for research you have not done* |

Meanwhile, the most important academic fact about *Open Arms* — **that the creator explicitly granted remix and full-text commentary permission inside the audio at `3:02`** — has **no slot in any magic string**.

## The Three-Citation Test

Take this one URL and this one set of lyric fragments, and render them in APA 7, MLA 9, and Chicago 18. Count what each style *made you do* — and what none of them let you *keep*.

Every style starts from the identical five facts:

| Fact | All three require it |
| --- | --- |
| Creator / uploader | yes |
| Title of the video | yes |
| Publication date | yes |
| Container / site | yes — "YouTube" |
| URL | yes |

Each style then adds research steps that produce **no new knowledge about the work** — they produce a differently punctuated string.

## The Four Losses

Every classic style throws away the same four dimensions:

| # | Loss | What vanishes |
| --- | --- | --- |
| 1 | **Time inside the work** | which second `[t, tEnd)` the claim lives at |
| 2 | **Reuse terms** | the spoken grant at `3:02` |
| 3 | **Epistemic status** | `realityRelation` (interpretation vs. fiction) |
| 4 | **Derivative lineage** | inverse/catalogue surfaces and the hub |

The styles are describing the same tuple `le.go` stores — they just store it as typography.

## What replaces the magic string

`local-time` makes *"in what universe?"* a **structured question**:

```text
(universeId, epoch, [t, tEnd), realityRelation, licenceBasis, plane)
```

Because that tuple lives in a higher-dimensional complex space (`42 + 0i` proven consensus, `0 + 42i` working hypothesis), projecting back down to Chicago, MLA, APA, BibTeX, or `/bare/` is just **matrix multiplication with punctuation templates**. Nothing is lost until you ask for a flat shadow.
