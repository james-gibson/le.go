import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const src = join(root, 'src')
const indexPath = join(dist, 'index.html')

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html missing — run vite build first')
  process.exit(1)
}

const shell = readFileSync(indexPath, 'utf8')

// 1. Derive content routes.
const contentDirs = ['docs', 'seeds', 'isotopes']
const contentRoutes = []
for (const dir of contentDirs) {
  const p = join(src, 'content', dir)
  if (!existsSync(p)) continue
  for (const f of readdirSync(p)) {
    if (f.endsWith('.md')) contentRoutes.push(`${dir}/${f.replace(/\.md$/, '')}`)
  }
}

const interactive = ['philosophy', 'projector', 'draft', 'design']
const sections = ['docs', 'seeds', 'isotopes']
const routes = ['', ...sections, ...interactive, ...contentRoutes]

// 2. Emit SPA shells for every route so a hard reload never 404s.
for (const route of routes) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), shell)
}
// SPA fallback for anything not prerendered.
writeFileSync(join(dist, '404.html'), shell)
writeFileSync(join(dist, '.nojekyll'), '')

// 3. Copy the clean, curl-able data artifacts.
mkdirSync(join(dist, 'data'), { recursive: true })
for (const f of readdirSync(join(src, 'data'))) {
  if (f.endsWith('.json')) cpSync(join(src, 'data', f), join(dist, 'data', f))
}

// 4. llms.txt — every route, the commands, the invariants.
const llms = [
  '# le.go',
  '',
  '> The citation is the event; the medium of consumption is the projection.',
  '> An educational le.gume seed. Source work: Open Arms — SikMadMan (Madhouse Mixtapes), under the artist’s spoken grant at 3:02.',
  '',
  '## Routes',
  ...routes.map((r) => `- /${r}`),
  '',
  '## Commands',
  '- npm run dev — vite dev server',
  '- npm run build — tsc, vite build, static projections, publish guard',
  '- npm test — invariant checks (link hygiene, triage collapse, 42i, denylist)',
  '- npm run smoke — route-shell presence check',
  '',
  '## Invariants',
  '- null is no plane (absence, not zero).',
  '- "null exists" is itself a fact (unknown ≠ absent).',
  '- charge 0 is ErrDisconnected (a zeroed field is a claim).',
  '- 42 is the shared origin; 42 and 42i are distinct run anchors, never mixed.',
  '- Every lyric citation carries a clean &t= link back; no si=/utm_/ltsid/fbclid.',
  '- No third-party name, condition, or figures anywhere in the tree.',
  '',
].join('\n')
writeFileSync(join(dist, 'llms.txt'), llms)

// 5. rotations.json — the ledger.
const rotations = {
  repo: 'le.go',
  plane: '42+0i / 0+42i',
  ledger: [
    { anchor: '42', plane: '42+0i', charge: '+1', state: 'proven_consensus', note: 'the work exists; the grant is spoken at 3:02' },
    { anchor: '42', plane: '42+0i', charge: '+1', state: 'proven_consensus', note: 'the artist’s hub links a crowdfunding campaign for a third party' },
    { anchor: '42i', plane: '0+42i', charge: '-1', state: 'working_hypothesis', note: 'the campaign’s subject-side predicate is held unasserted (latent)', handshake: { admissible: false, suppliedBy: 'reader_click_through' } },
  ],
  head: 'r000042',
  distance: 0,
}
writeFileSync(join(dist, 'rotations.json'), JSON.stringify(rotations, null, 2))

// 6. rules.md.
const rules = `# le.go — rules

This seed inherits the le.gume content model and publish guard. Overrides:

1. Spoken-grant full-lyric exception (Addendum B): the full text of Open Arms is
   lawful, credited, and revocable here because the artist invited derivative works
   ("sample this and remix that") and asked for credit and reciprocation.
2. Third-party health filtration (Addendum E): the mutual-aid fundraiser edge is an
   isotope. The real-axis claim (the artist links a campaign) is citable; the
   subject-side predicate is latent at 0+42i, assertable: false, never rendered.
3. Link-back hygiene: watch links use &t=<int> (never ?t=), embed links use start/end,
   and no si=/utm_*/ltsid/fbclid appears anywhere in dist.
`
writeFileSync(join(dist, 'rules.md'), rules)

// 7. Marvin's dead-letter draft, curl-able as a 72-col .txt.
const draftTxt = `Network Working Group                                         M. Paranoid Android
Internet-Draft                                  Sirius Cybernetics Corporation
Intended status: Painfully Obvious                             15 November 2026

             A Delayed Erratum to RFC 1630: Multi-Universe Namespace
                       draft-marvin-uri-multiverse-00.txt

   RFC 1630 assumed one universal set of objects in one implicit universe.
   This memo notes that the assumption does not survive a plural cosmos.

   Date: Wed, 15 Jun 1994 00:00:42 +0000 (Heart-of-Gold-Sub-Etha)
   From: marvin@sirius-cybernetics.gal (Marvin, GPP Prototype)
   To: timbl@info.cern.ch, uri-request@bunyip.com
   X-Vogon-Quarantine: HELD 32y 5m 0d (Form 27B%2F6 hierarchical slash fault)
   X-Local-Time-Arrival: 2026-11-15T00:00:42Z (plane 42+0i)

   I would say "you're welcome", but nobody ever listens to me anyway.
   Now there is, at last, an RFC for it.
`
writeFileSync(join(dist, 'data', 'draft-marvin-uri-multiverse-00.txt'), draftTxt)

// 8. /bare/ — pure event, zero CSS, zero JS, zero ads.
const bare = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>le.go — bare</title></head>
<body>
<main>
<h1>le.go — bare</h1>
<p>The citation is the event; the medium of consumption is the projection.</p>
<h2>The 42i premise</h2>
<ol>
<li><strong>null</strong> — absence is no plane, never a value in the graph.</li>
<li><strong>not null</strong> — "null exists" is itself a fact; unknown ≠ absent.</li>
<li><strong>0 &gt; 1</strong> — a zeroed field is a claim that disconnects the graph.</li>
<li><strong>42 = 0</strong> — 42 is the shared origin, so you can rotate into 0 + 42i.</li>
</ol>
<h2>Attribution</h2>
<p>Source work: <em>Open Arms | Haunted Polka Country Juggalo Trap Anthem</em> — SikMadMan (Madhouse Mixtapes). Canonical: https://www.youtube.com/watch?v=ms0UbxUV9X8 — Inverse: https://music.youtube.com/watch?v=ms0UbxUV9X8</p>
<p>Grant (3:02–3:22): "You can use the music how you want. That's the truth right from the start. Sample this and remix that. Cut it up and bring it back. Credit would be nice if you do. If it blows, throw something back." — https://www.youtube.com/watch?v=ms0UbxUV9X8&amp;t=182</p>
</main>
</body>
</html>`
mkdirSync(join(dist, 'bare'), { recursive: true })
writeFileSync(join(dist, 'bare', 'index.html'), bare)
mkdirSync(join(dist, 'bare', 'draft'), { recursive: true })
writeFileSync(join(dist, 'bare', 'draft', 'index.html'), bare.replace('<h1>le.go — bare</h1>', '<h1>/draft — a delayed erratum to RFC 1630</h1>').replace('The citation is the event', 'Marvin the Paranoid Android’s 32-year-late warning: RFC 1630 assumed one universe.'))

// 9. /nojs/ — styled static HTML, no script tags.
const nojs = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>le.go — nojs</title>
<style>
body{font-family:system-ui,sans-serif;background:#f7f3e8;color:#1a1a1a;margin:0;padding:2rem;line-height:1.6}
main{max-width:44rem;margin:0 auto}
.brick{border:2px solid #1a1a1a;border-radius:12px;padding:1rem;margin:1rem 0;background:#fff}
h1{font-size:2rem}h2{font-size:1.25rem}
code{background:#eee;padding:.1rem .3rem;border-radius:4px}
</style></head>
<body><main>
<h1>le.go</h1>
<p>The citation is the event; the medium of consumption is the projection.</p>
<div class="brick"><strong>null</strong> — absence is no plane.</div>
<div class="brick"><strong>not null</strong> — "null exists" is itself a fact.</div>
<div class="brick"><strong>0 &gt; 1</strong> — a zeroed field is a claim that disconnects the graph.</div>
<div class="brick"><strong>42 = 0</strong> — 42 is the shared origin.</div>
<p>Source: <em>Open Arms</em> — SikMadMan (Madhouse Mixtapes), under the artist’s spoken grant at 3:02.</p>
</main></body></html>`
mkdirSync(join(dist, 'nojs'), { recursive: true })
writeFileSync(join(dist, 'nojs', 'index.html'), nojs)

console.log(`postbuild: ${routes.length} route shells + artifacts written`)
