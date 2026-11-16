---
title: Stage 3 — Reading the Wrapper & Splitting the Pod
description: How URL shapes betray provenance before a single fetch, and how the Linktree pod grows citation strength.
order: 4
updated: 2026-11-15
tags: triage, linktree, provenance, research-instructions
---

The final agent in this project was handed a pile of links. The instruction: show that **the format itself is a metadata payload**, and that most of it can be read without opening anything.

## What the wrapper betrays

The six URL shapes below are **one work**:

| Shape | What it is | What the syntax betrays |
| --- | --- | --- |
| `youtube.com/watch?v=ms0UbxUV9X8` | canonical / authorial | watch surface; accepts `&t=` |
| `music.youtube.com/watch?v=ms0UbxUV9X8` | inverse / catalogue | work-level only; ignores time |
| `youtu.be/ms0UbxUV9X8?si=…` | short share | `si=` share token present |
| `youtube.com/watch?v=…&list=RD…` | arrived with radio context | `RD…` recommendation chain |
| `youtube.com/watch?v=…&t=182` | timestamped | points inside the work |
| a house MLA string | citation | style, not provenance |

The **11-character video id is the only part that identifies the video**. Everything else is domain, page type, or optional extra. That is the whole licence for calling these six strings one universe.

> Six strings → one work. Five fetches saved before you open a single page.

## The pod

A legume is a dry seed pod that splits cleanly along two seams and holds countable, shelf-stable peas. Legumes also **fix atmospheric nitrogen**: they take inert noise in the air and turn it into nutrients the rest of the garden can grow on.

The artist's hub (`linktr.ee/sikmadman`) is that pod — a web of ~85 outbound edges, indexed here as `seen → resolved → verified → promoted`:

| State | Meaning |
| --- | --- |
| `seen` | observed on the hub, not yet fetched |
| `resolved` | identity extracted, tracking params stripped |
| `verified` | canonical work id confirmed |
| `promoted` | entered the citation as a universe id |

As we connect and look up more information, the citation **grows in strength** — density rises immediately, strength rises monotonically — without link-spamming the bibliography.

## Citations that teach research

`local-time` stores `researchInstructions` on a citation: the next agent (or person) is told *how to go research*, not just *what to cite*. A conditional step that nobody executes is not a failure — it does not decay the citation; the half-edge simply stays open.
