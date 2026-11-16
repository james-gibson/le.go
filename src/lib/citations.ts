// le.go — the citation projector.
//
// A "citation" here is a *projection* of one complex-space coordinate down onto a
// flat typographic string. Nothing is lost until you ask for a flat shadow, and
// you can cast a fresh shadow whenever a journal editor asks.

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
  { id: 'brief', label: 'Executable research brief' },
]

// ---------------------------------------------------------------------------
// The 42i premise, in four snaps.
// ---------------------------------------------------------------------------

export interface PremisePiece {
  key: string
  label: string
  move: string
  meaning: string
  lego: string
}

export const PREMISE: PremisePiece[] = [
  {
    key: 'null',
    label: 'null',
    move: 'leave the hole empty',
    meaning: 'absence is no plane — never a value you can put in the graph',
    lego: 'a missing brick is not a brick you can click into place',
  },
  {
    key: 'not-null',
    label: 'not null',
    move: 'the hole is a piece',
    meaning: '"null exists" is itself a fact; unknown ≠ absent',
    lego: 'the empty spot on the baseplate is information',
  },
  {
    key: 'zero-gt-one',
    label: '0 > 1',
    move: 'a silent zero outranks a spoken one',
    meaning: 'a zeroed field is a claim that disconnects the graph (ErrDisconnected)',
    lego: 'a brick with no studs looks neutral but joins nothing',
  },
  {
    key: 'forty-two-is-zero',
    label: '42 = 0',
    move: 'every universe agrees where zero sits',
    meaning: '42 is the shared origin, so you can rotate into 0 + 42i without drifting off the plane',
    lego: 'the baseplate is the origin; every rotation is measured from the same corner',
  },
]

export function anchorFor(r: Rotation): { anchor: '42' | '42i'; plane: Plane; charge: string; note: string } {
  switch (r) {
    case 0:
      return { anchor: '42', plane: '42+0i', charge: '+1', note: 'proven consensus — asserted' }
    case 1:
      return { anchor: '42i', plane: '0+42i', charge: '-1', note: 'working hypothesis — not asserted' }
    case 2:
      return { anchor: '42', plane: '-42+0i', charge: '-1', note: 'contradiction — sign flip (R² = −1)' }
    case 3:
      return { anchor: '42i', plane: '-42i', charge: '-1', note: 'hypothesis, opposing sector' }
  }
}

export function validateAnchor(anchor: string): anchor is '42' | '42i' {
  return anchor === '42' || anchor === '42i'
}

export function assertCharge(charge: number): string | null {
  // charge 0 is the disconnected graph — never a valid plane.
  return charge === 0 ? 'ErrDisconnected' : null
}

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
// Projection.
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
      // this seed exists to demonstrate.
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
      const t = loc.t != null ? loc.t : u.grant.t
      const tEnd = loc.tEnd != null ? loc.tEnd : u.grant.tEnd
      return [
        `# Research brief — ${u.universeId}`,
        '',
        `- **event:** ${u.title} — ${creators(u)} (${u.container}, ${year})`,
        `- **clock:** [${formatTime(t)}, ${formatTime(tEnd)}) on the work's own epoch`,
        `- **realityRelation:** ${u.realityRelation} (fictionalizationDegree ${u.fictionalizationDegree})`,
        `- **plane:** ${u.plane} (anchor ${anchorFor(u.rotation).anchor}, charge ${u.charge})`,
        `- **licenceBasis:** ${u.grant.kind} by ${u.grant.grantor} — ${u.grant.conditions.credit}`,
        `- **authorial surface:** ${u.url}`,
        `- **inverse surface:** ${u.inverseUrl}`,
        `- **hub:** ${u.hubUrl}`,
        `- **researchInstructions:** resolve → verify → promote; keep the event on its clock, record your projection honestly.`,
      ].join('\n')
    }
  }
}
