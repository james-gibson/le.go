---
title: Silverskin
description: The le.gume seed-deploy membrane — the isotope le.go lifts and replants in the citations domain.
order: 2
updated: 2026-11-15
tags: silverskin, seed, legume
---

**Silverskin** is the membrane around a legume seed — the thin skin you peel to reveal the seed proper. In the le.gume family it names the **seed-deploy shape**: the content model, the derived navigation, the publish guard, and the deploy.

## What it proves

A body of knowledge can be deployed as a static site with a stated audience, a stated assumption, and one entrance — and the deploy itself can be an isotope you lift. `le.go` proves it by using **citations** as its domain and shipping the whole 42i system as an introduction in one place.

## The parts

| Part | What it is | le.go's instance |
| --- | --- | --- |
| **content model** | `src/content/<section>/<slug>.md` is the only place a page is declared | `docs/`, `seeds/`, `isotopes/` |
| **derived navigation** | nav, indexes, prev/next, page counts all derive from the tree | `src/lib/content.ts` |
| **guard** | fails the build on placeholders, leaks, base-path drift | `scripts/verify-publish.mjs` |
| **machine contract** | `/llms.txt`, `/rotations.json`, `/rules.md` | generated at build |
| **static projections** | `/bare/`, `/nojs/`, `/deck.html` | the historian's doors |

## What it costs

- **One build gate.** `tsc --noEmit` + Vite + the guard. Nothing else.
- **Node 22+.** No runtime backend.
- **The source is the UI.** You edit Markdown, not a nav array.

## Take this, not that

Take the **seed deploy** (clone, read, replace the words), not a generator you have to trust. The repository *is* the template.

## What would break it

- A content file that the derived nav can't reach — the guard fails it.
- A leaked local path, placeholder, or tracking param — the guard fails closed.
- A third-party health predicate entering the record — the denylist and the `42i` rotation exist precisely so this cannot ship.

**`slots:`** audience (one per rung) · assumption · entrance route
**`presumes:`** Node 22+, Vite + React 19 + Tailwind v4, GitHub Pages workflow deploy, AGPL-3.0
