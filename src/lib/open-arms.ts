import universeJson from '../data/open-arms.universe.json'
import lyricsJson from '../data/open-arms.lyrics.json'
import candidatesJson from '../data/sikmadman.candidates.json'
import type { Universe } from './citations'
import { formatTime } from './citations'

export const OPEN_ARMS = universeJson as unknown as Universe
export const LYRICS = lyricsJson as {
  work: string
  seekLead: number
  transcribedFrom: string
  audit: string
  sections: { id: string; order: number; thesis: string }[]
  lines: {
    id: string
    section: string
    text: string
    cueStart: number
    t: number
    tEnd: number
    confidence: number
    flags: string[]
  }[]
}
export const CANDIDATES = candidatesJson as {
  hub: string
  profile: { username?: string; pageTitle?: string; description?: string }
  fetchedAt: string
  states: string[]
  count: number
  folders: { id: string; title: string; position?: number }[]
  candidates: {
    id: string
    title: string
    kind: string
    type: string
    position?: number
    parent?: string | null
    state: string
    trackingParamsPresent?: boolean
    url?: string | null
    urlHash?: string
    latent?: Record<string, unknown>
    handshake?: Record<string, unknown>
    resolution?: Record<string, string>
  }[]
}

const VIDEO_ID = 'ms0UbxUV9X8'

/** A clean watch link. `&t=` (never `?t=`), plain integer seconds, no trackers. */
export function watchUrl(t?: number): string {
  return t == null ? `https://www.youtube.com/watch?v=${VIDEO_ID}` : `https://www.youtube.com/watch?v=${VIDEO_ID}&t=${Math.max(0, Math.floor(t))}`
}

/** A clean embed snippet. `start`/`end` are the embed surface's own vocabulary. */
export function embedUrl(t: number, tEnd: number): string {
  return `https://www.youtube.com/embed/${VIDEO_ID}?start=${Math.max(0, Math.floor(t))}&end=${Math.max(0, Math.floor(tEnd))}`
}

export function inverseUrl(): string {
  return OPEN_ARMS.inverseUrl
}

export function hubUrl(): string {
  return OPEN_ARMS.hubUrl
}

/** The /bare/ fragment id for a philosophy section. */
export function bareAnchor(section: string): string {
  return `#l-${section}`
}

export { formatTime }

export function lineById(id: string) {
  return LYRICS.lines.find((l) => l.id === id)
}

export function linesBySection(section: string) {
  return LYRICS.lines.filter((l) => l.section === section)
}

export function sectionById(id: string) {
  return LYRICS.sections.find((s) => s.id === id)
}

export function grantLine() {
  return LYRICS.lines.find((l) => l.flags.includes('licence_basis')) ?? lineById('l042')
}
