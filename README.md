# le.go

**The citation is the event; the medium of consumption is the projection.**

An educational `le.gume` seed about how citation stopped being a shelf address
and became a pile of *magic strings* — and how to snap those strings back into
bricks you can take apart and rebuild.

<p align="center">
  <a href="https://github.com/james-gibson/le.go/actions/workflows/deploy.yml"><img src="https://shieldcn.dev/github/ci/james-gibson/le.go.svg?workflow=deploy.yml&branch=main&variant=secondary" alt="deploy" /></a>
  <a href="https://github.com/james-gibson/le.go/blob/main/LICENSE"><img src="https://shieldcn.dev/github/license/james-gibson/le.go.svg?variant=secondary" alt="license" /></a>
  <a href="https://github.com/james-gibson/le.go/commits/main"><img src="https://shieldcn.dev/github/last-commit/james-gibson/le.go.svg?variant=secondary" alt="last commit" /></a>
</p>

**Live:** <https://james-gibson.github.io/le.go/>

---

## What this is

A **Lego instruction manual** for one hard idea, built around a real case: a
haunted-polka-country-juggalo-trap anthem whose creator spoke his own remix
grant into the recording at `3:02`.

The manual drives home the **42i premise** in four snaps:

| Piece | The move | What it means |
|---|---|---|
| `null` | leave the hole empty | absence is *no plane* — never a value you can put in the graph |
| `not null` | the hole is a piece | *"null exists"* is itself a fact; unknown ≠ absent |
| `0 > 1` | a silent zero outranks a spoken one | a zeroed field is a *claim* that disconnects the graph (`ErrDisconnected`) |
| `42 = 0` | every universe agrees where zero sits | `42` is the shared origin, so you can rotate into `0 + 42i` without drifting off the plane |

The thesis, in one sentence:

> The citation is the event; the medium of consumption is the projection.

When SikMadMan speaks the grant between `182s` and `202s`, *that utterance on
its own clock is the event*. Watching it on `youtube.com`, streaming it on
`music.youtube.com`, reading it in the ad-free `/bare/` projection, or pasting
it as a Chicago footnote are **four projections of one coordinate**.

## Why "le.gume" / "le.go"

- **`le.gume` (the pod):** a legume splits cleanly along two seams — local time
  and UTC, real axis and imaginary axis — and fixes inert noise into nutrients.
- **`le.go` (the bricks):** Chicago/MLA/APA citations are *glued models*
  (someone squirted punctuation glue — *the Kragle* — over five real facts). In
  `le.go`, every fact is a studded brick: snap them into a complex-space
  universe, then unsnap and re-project into any style at will.
- **`le.go` ("let go" / *leggo*):** at `3:02` the artist let go of the gold
  throne so his art could be sampled and brought back. Academia has to let go of
  the superstition that the punctuation string *is* the scholarship.

## Routes

| Route | What it is |
| --- | --- |
| `/` | the manual — parts list + the four snaps |
| `/docs/` | the five stages of citation precision |
| `/seeds/` | one entrance per reader background |
| `/isotopes/` | the 42i isotope model |
| `/philosophy/` | *Open Arms* philosophy page with per-line copy-citation |
| `/projector/` | snap bricks, rotate `R⁰..R³`, project to APA/MLA/Chicago/… |
| `/draft/` | Marvin the Paranoid Android's 32-years-late RFC 1630 erratum |
| `/design/` | the live Lego design system |
| `/bare/` | zero-CSS, zero-JS, zero-ad projection (for the historian) |
| `/deck.html` | a self-contained slide deck for the group video discussion |

## Quickstart

```bash
git clone https://github.com/james-gibson/le.go my-site
cd my-site
npm install
npm run dev
```

Node 22+. Nothing else is required.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc --noEmit`, Vite build, static projections, then the publish guard |
| `npm test` | invariant tests (citation projection, 42i, link hygiene) |
| `npm run smoke` | server-render check across routes |
| `npm run guard` | the publish guard alone, against an existing `dist/` |

## Attribution

Source work *"Open Arms"* — **SikMadMan** (Madhouse Mixtapes), used under the
artist's spoken grant at `3:02`. See [`NOTICE.md`](NOTICE.md).

*So long, and thanks for all the footnotes.*
