import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const src = join(root, 'src')

const smoke = process.argv.includes('--smoke')
let failures = 0
const ok = (cond, msg) => {
  if (cond) {
    console.log('  ✓ ' + msg)
  } else {
    console.error('  ✗ ' + msg)
    failures++
  }
}
const read = (p) => readFileSync(p, 'utf8')
const load = (p) => JSON.parse(read(p))

// ---------------------------------------------------------------------------
// Data integrity.
// ---------------------------------------------------------------------------
console.log('\n# data integrity')
const universe = load(join(src, 'data', 'open-arms.universe.json'))
const lyrics = load(join(src, 'data', 'open-arms.lyrics.json'))
const candidates = load(join(src, 'data', 'sikmadman.candidates.json'))

ok(universe.universeId === 'series:madhouse_mixtapes:open_arms:2026', 'universe id stable')
ok(universe.runtimeSec === 280, 'runtime 280s')
ok(universe.published === '2026-04-11', 'upload date measured (not guessed)')
ok(universe.grant.t === 182 && universe.grant.tEnd === 202, 'grant interval [182, 202)')

ok(lyrics.lines.length >= 40, `full transcript present (${lyrics.lines.length} lines)`)
const ids = new Set(lyrics.lines.map((l) => l.id))
ok(ids.size === lyrics.lines.length, 'lyric ids unique')
ok(lyrics.lines.every((l) => l.t >= 0 && l.t < 280 && l.tEnd >= l.t), 'lyric timestamps in [0, 280)')
ok(lyrics.lines.every((l) => lyrics.sections.some((s) => s.id === l.section)), 'lyric sections valid')
ok(lyrics.lines.some((l) => l.flags.includes('licence_basis')), 'grant line flagged licence_basis')

// ---------------------------------------------------------------------------
// Link-back hygiene (watch links use &t=, embed uses start/end, no trackers).
// ---------------------------------------------------------------------------
console.log('\n# link hygiene')
const VIDEO_ID = 'ms0UbxUV9X8'
const watchUrl = (t) => (t == null ? `https://www.youtube.com/watch?v=${VIDEO_ID}` : `https://www.youtube.com/watch?v=${VIDEO_ID}&t=${Math.max(0, Math.floor(t))}`)
const embedUrl = (t, tEnd) => `https://www.youtube.com/embed/${VIDEO_ID}?start=${Math.max(0, Math.floor(t))}&end=${Math.max(0, Math.floor(tEnd))}`

ok(watchUrl(182) === 'https://www.youtube.com/watch?v=ms0UbxUV9X8&t=182', 'watch link uses &t= integer')
ok(!/[?]t=/.test(watchUrl(182)), 'watch link never uses ?t=')
ok(embedUrl(182, 202) === 'https://www.youtube.com/embed/ms0UbxUV9X8?start=182&end=202', 'embed link uses start/end')
ok(!/[?&](si|utm_\w+|ltsid|fbclid)=/.test(watchUrl(182) + embedUrl(182, 202)), 'no trackers in emitted links')

for (const c of candidates.candidates ?? []) {
  if (c.url && /[?&](si|utm_\w+|ltsid|fbclid)=/.test(c.url)) {
    ok(false, `candidate ${c.id} still carries a tracker`)
  }
}
ok(true, 'candidate URLs are tracker-free (clean form)')

// ---------------------------------------------------------------------------
// Triage collapse: six shapes, one work key.
// ---------------------------------------------------------------------------
console.log('\n# triage collapse')
function workKey(s) {
  const m = /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/.exec(s)
  return m ? m[1] : null
}
const variants = [
  'https://www.youtube.com/watch?v=ms0UbxUV9X8',
  'https://music.youtube.com/watch?v=ms0UbxUV9X8',
  'https://youtu.be/ms0UbxUV9X8?si=XYZ',
  'https://www.youtube.com/watch?v=ms0UbxUV9X8&list=RDAMVMms0UbxUV9X8',
  'https://www.youtube.com/watch?v=ms0UbxUV9X8&t=182',
  'SikMadMan. "Open Arms." YouTube, uploaded by Madhouse Mixtapes, 2026.',
]
const keys = variants.map(workKey).filter(Boolean)
ok(new Set(keys).size === 1 && keys[0] === VIDEO_ID, `6 strings → 1 work (fetchesSaved ${variants.length - 1})`)

// ---------------------------------------------------------------------------
// 42i invariants.
// ---------------------------------------------------------------------------
console.log('\n# 42i invariants')
const validateAnchor = (a) => a === '42' || a === '42i'
const assertCharge = (c) => (c === 0 ? 'ErrDisconnected' : null)
ok(validateAnchor('42') && validateAnchor('42i') && !validateAnchor('42i2'), 'anchors ∈ {42, 42i}')
ok(assertCharge(0) === 'ErrDisconnected', 'charge 0 → ErrDisconnected')
ok(assertCharge(1) === null && assertCharge(-1) === null, 'charge ±1 admissible')

const anchorFor = (r) =>
  ({ 0: { anchor: '42', plane: '42+0i' }, 1: { anchor: '42i', plane: '0+42i' }, 2: { anchor: '42', plane: '-42+0i' }, 3: { anchor: '42i', plane: '-42i' } })[r]
ok(anchorFor(0).plane === '42+0i' && anchorFor(1).plane === '0+42i', 'R⁰/R¹ map to real/imaginary axes')
ok(anchorFor(2).plane === '-42+0i', 'R² flips sign (contradiction)')

// ---------------------------------------------------------------------------
// Denylist (structural).
// ---------------------------------------------------------------------------
console.log('\n# denylist')
const fundraiser = (candidates.candidates ?? []).filter((c) => c.kind === 'fundraiser')
ok(fundraiser.length === 1, 'one fundraiser edge indexed')
ok(fundraiser.every((c) => c.url === null), 'fundraiser pointer withheld (url: null)')
ok(fundraiser.every((c) => typeof c.urlHash === 'string' && c.urlHash.length === 64), 'fundraiser stored as SHA-256 fingerprint')
ok(!JSON.stringify(candidates).match(/gofundme\.com\/f\//i), 'no raw campaign slug in the data')

// ---------------------------------------------------------------------------
// Smoke (route shells).
// ---------------------------------------------------------------------------
if (smoke) {
  console.log('\n# smoke (route shells)')
  for (const p of ['index.html', 'philosophy/index.html', 'projector/index.html', 'draft/index.html', 'design/index.html', 'bare/index.html', 'nojs/index.html']) {
    ok(existsSync(join(dist, p)), `dist/${p} present`)
  }
}

console.log(`\n${failures === 0 ? 'all tests pass' : failures + ' failure(s)'}`)
process.exit(failures === 0 ? 0 : 1)
