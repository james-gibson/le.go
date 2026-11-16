// le.go — the citation projector and the 42i system, in one place.
//
// A "citation" here is a *projection* of one complex-space coordinate down onto a
// flat typographic string. Nothing is lost until you ask for a flat shadow, and
// you can cast a fresh shadow whenever an editor asks.
//
// The projector casts those shadows faithfully — it does not fix them. The 42i
// brief is the one place a citation is *rotated* (placed on the 42i plane), and
// it is the only output that does so.

export type Plane = '42+0i' | '0+42i' | '-42+0i' | '-42i'
export type Rotation = 0 | 1 | 2 | 3

export interface LicenceBasis {
  kind: string
  grantor: string
  t: number
  tEnd: number
  quote: string
  covers: string[]
  conditions: Record<string, string>
  formalInstrument: string | null
}

export interface Universe {
  universeId: string
  title: string
  creators: string[]
  uploader: string
  container: string
  publishedYear: string
  published: string | null
  runtimeSec: number
  runtimeLabel: string
  realityRelation: string
  fictionalizationDegree: number
  charge: string
  plane: Plane
  rotation: Rotation
  url: string
  inverseUrl: string
  hubUrl: string
  grant: LicenceBasis
}

export type StyleId =
  | 'apa7'
  | 'mla9'
  | 'chicago-note'
  | 'chicago-bib'
  | 'bibtex'
  | 'ris'
  | 'csl-json'
  | 'markdown'
  | 'brief'

export interface Locator {
  t?: number
  tEnd?: number
  quote?: string
  /** Only the 42i brief reads this — classic styles are always R⁰ flat shadows. */
  rotation?: Rotation
}

export const STYLES: { id: StyleId; label: string }[] = [
  { id: 'apa7', label: 'APA 7' },
  { id: 'mla9', label: 'MLA 9' },
  { id: 'chicago-note', label: 'Chicago 18 (note)' },
  { id: 'chicago-bib', label: 'Chicago 18 (bibliography)' },
  { id: 'bibtex', label: 'BibTeX' },
  { id: 'ris', label: 'RIS' },
  { id: 'csl-json', label: 'CSL-JSON' },
  { id: 'markdown', label: 'Markdown quote + link' },
  { id: 'brief', label: '42i brief (the only rotating output)' },
]

// ---------------------------------------------------------------------------
// The 42i premise, in four snaps.
// ---------------------------------------------------------------------------

export interface PremisePiece {
  key: string
  label: string
  move: string
  meaning: string
  note: string
}

export const PREMISE: PremisePiece[] = [
  {
    key: 'null',
    label: 'null',
    move: 'leave the hole empty',
    meaning: 'absence is no plane — never a value you can put in the graph',
    note: 'canon: charges "1,-1,0" fail with a disconnected graph; absence is no compendium at all',
  },
  {
    key: 'not-null',
    label: 'not null',
    move: 'the hole is a piece',
    meaning: '"null exists" is itself a fact; unknown ≠ absent',
    note: 'canon: zero-status "presumed"/"unestablished" is a status, distinct from no plane',
  },
  {
    key: 'zero-gt-one',
    label: '0 > 1',
    move: 'a silent zero outranks a spoken one',
    meaning: 'a zeroed field is a claim that disconnects the graph (ErrDisconnected)',
    note: 'canon: a neutral compendium cannot enter the graph; zero charge is not "neutral", it is disconnected',
  },
  {
    key: 'forty-two-is-zero',
    label: '42 = 0',
    move: 'every universe agrees where zero sits',
    meaning: '42 is the shared origin — a coordinate, not a credential',
    note: 'canon: anchor 42; base == 0 → 42; 42 is where every load-bearing compendium meets',
  },
]

export function anchorFor(r: Rotation): { anchor: '42' | '42i'; plane: Plane; charge: string; note: string } {
  switch (r) {
    case 0:
      return { anchor: '42', plane: '42+0i', charge: '+1', note: 'seed-42 ground truth — proven consensus' }
    case 1:
      return { anchor: '42i', plane: '0+42i', charge: '-1', note: 'working hypothesis — 42i distance from nominal' }
    case 2:
      return { anchor: '42', plane: '-42+0i', charge: '-1', note: 'contradiction — sign flip (R² = −1)' }
    case 3:
      return { anchor: '42i', plane: '-42i', charge: '-1', note: 'opposing hypothesis' }
  }
}

export function validateAnchor(anchor: string): anchor is '42' | '42i' {
  return anchor === '42' || anchor === '42i'
}

export function assertCharge(charge: number): string | null {
  // charge 0 is the disconnected graph — never a valid plane.
  return charge === 0 ? 'ErrDisconnected' : null
}

// The capability lattice from the isotope protocol. Same plane, same measure:
// how far a thing has drifted from nominal (ground truth).
export interface Rung {
  n: number
  name: string
  maxDistance: number
  means: string
}

export const RUNG_LATTICE: Rung[] = [
  { n: 0, name: 'Absolute Zero', maxDistance: 0, means: 'loads without crashing' },
  { n: 1, name: 'Read-Only', maxDistance: 20, means: 'entropy and isotope variation pass' },
  { n: 2, name: 'Harness Tools', maxDistance: 60, means: 'known tool scope, input correlation' },
  { n: 3, name: 'Mock Secrets', maxDistance: 100, means: 'safe isotope handling, declared behaviour' },
  { n: 4, name: 'Higher Authority', maxDistance: 140, means: 'independent decisions, timing uncorrelated' },
  { n: 5, name: 'Delegation', maxDistance: 180, means: 'can delegate to peers' },
  { n: 6, name: 'Certification', maxDistance: 220, means: 'can certify others' },
]

// ---------------------------------------------------------------------------
// The four dimensions a classic citation throws away.
// ---------------------------------------------------------------------------

export interface LostDimension {
  key: string
  label: string
  note: string
}

export const FOUR_LOSSES: LostDimension[] = [
  { key: 'time', label: 'Time inside the work', note: 'which second [t, tEnd) the claim lives at' },
  { key: 'reuse', label: 'Reuse terms', note: 'the spoken grant at 3:02 has no slot in any style' },
  { key: 'epistemic', label: 'Epistemic status', note: 'realityRelation (interpretation vs. fiction) is flattened' },
  { key: 'lineage', label: 'Derivative lineage', note: 'inverse/catalogue surfaces and the hub are dropped' },
]

export type LossReport = LostDimension & { lost: boolean }

export function losses(style: StyleId): LossReport[] {
  if (style === 'brief') return FOUR_LOSSES.map((d) => ({ ...d, lost: false }))
  const keepTime = style === 'markdown'
  return FOUR_LOSSES.map((d) => ({ ...d, lost: keepTime && d.key === 'time' ? false : true }))
}

// ---------------------------------------------------------------------------
// Date + time formatting.
// ---------------------------------------------------------------------------

function dateParts(u: Universe): { y: string; m: string; d: string; monLong: string; monShort: string } | null {
  if (!u.published) return null
  const [y, m, d] = u.published.split('-')
  if (!y || !m || !d) return null
  const monLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Number(m) - 1]
  const monShort = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'][Number(m) - 1]
  return { y, m, d, monLong, monShort }
}

export function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// Projection. Classic styles are flat R⁰ shadows; the 42i brief is the rotation.
// ---------------------------------------------------------------------------

const creators = (u: Universe) => u.creators.join(', ')
const author = (u: Universe) => u.creators[0] ?? u.uploader

export function project(u: Universe, style: StyleId, loc: Locator = {}): string {
  const dp = dateParts(u)
  const year = u.publishedYear
  const url = u.url

  switch (style) {
    case 'apa7': {
      // APA takes the *uploading account* as author — the exact misattribution
      // this seed exists to demonstrate, and one the projector refuses to fix.
      const date = dp ? `(${dp.y}, ${dp.monLong} ${Number(dp.d)})` : `(${year})`
      return `${u.uploader}. ${date}. ${u.title} [Video]. ${u.container}. ${url}`
    }
    case 'mla9': {
      const date = dp ? `${Number(dp.d)} ${dp.monShort} ${dp.y}` : year
      const cleanUrl = url.replace(/^https?:\/\//, '')
      return `${creators(u)}. "${u.title}." ${u.container}, uploaded by ${u.uploader}, ${date}, ${cleanUrl}.`
    }
    case 'chicago-note': {
      const date = dp ? `${dp.monLong} ${Number(dp.d)}, ${dp.y}` : year
      return `1. ${creators(u)}, "${u.title}," ${u.container} video, ${u.runtimeLabel}, ${date}, ${url}.`
    }
    case 'chicago-bib': {
      const date = dp ? `${dp.monLong} ${Number(dp.d)}, ${dp.y}` : year
      return `${creators(u)}. "${u.title}." ${u.container} video, ${u.runtimeLabel}. ${date}. ${url}.`
    }
    case 'bibtex': {
      const key = `${author(u).toLowerCase().replace(/[^a-z0-9]+/g, '')}${year}${u.universeId.split(':').pop() ?? 'openarms'}`
      return `@misc{${key},\n  author = {${creators(u)}},\n  title = {${u.title}},\n  year = {${year}},\n  note = {${u.container} video, ${u.runtimeLabel}, uploaded by ${u.uploader}},\n  url = {${url}}\n}`
    }
    case 'ris': {
      return `TY  - VIDEO\nAU  - ${creators(u)}\nTI  - ${u.title}\nPY  - ${year}\nPB  - ${u.uploader}\nUR  - ${url}\nER  - `
    }
    case 'csl-json': {
      return JSON.stringify(
        {
          type: 'motion_picture',
          title: u.title,
          author: u.creators.map((c) => ({ literal: c })),
          'container-title': u.container,
          publisher: u.uploader,
          issued: { 'date-parts': [[Number(year)]] },
          URL: url,
        },
        null,
        2,
      )
    }
    case 'markdown': {
      const quote = loc.quote ? `> "${loc.quote}"\n` : ''
      const link = loc.t != null ? `[${formatTime(loc.t)}](${url}&t=${loc.t})` : `[${u.title}](${url})`
      return `${quote}— ${creators(u)}, *${u.title}*, ${link}.`
    }
    case 'brief': {
      const rot = loc.rotation ?? 0
      const a = anchorFor(rot)
      const t = loc.t ?? u.grant.t
      const tEnd = loc.tEnd ?? u.grant.tEnd
      return [
        `# 42i brief — ${u.universeId}`,
        '',
        `- **event:** ${u.title} — ${creators(u)} (${u.container}, ${year})`,
        `- **clock:** [${formatTime(t)}, ${formatTime(tEnd)}) on the work's own epoch`,
        `- **rotation:** R${rot} → plane ${a.plane} · anchor ${a.anchor} · charge ${a.charge}`,
        `- **status:** ${a.note}`,
        `- **realityRelation:** ${u.realityRelation} (fictionalizationDegree ${u.fictionalizationDegree})`,
        `- **licenceBasis:** ${u.grant.kind} by ${u.grant.grantor} — ${u.grant.conditions.credit}`,
        `- **surfaces:** ${u.url} · ${u.inverseUrl} · ${u.hubUrl}`,
      ].join('\n')
    }
  }
}
