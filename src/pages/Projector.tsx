import { useMemo, useState } from 'react'
import { OPEN_ARMS } from '../lib/open-arms'
import { anchorFor, losses, project, STYLES, type Rotation, type StyleId } from '../lib/citations'
import { usePageMeta } from '../lib/usePageMeta'

const ROTATIONS: Rotation[] = [0, 1, 2, 3]

interface Parsed {
  kind: 'url' | 'citation' | 'dewey' | 'unknown'
  workKey: string | null
  shareTokenPresent: boolean
  arrivedWithRadioContext: boolean
  hasTimestamp: boolean
  styleFingerprint: string
  note: string
}

function parseInput(raw: string): Parsed {
  const s = raw.trim()
  if (!s) return { kind: 'unknown', workKey: null, shareTokenPresent: false, arrivedWithRadioContext: false, hasTimestamp: false, styleFingerprint: '—', note: 'Paste a URL or a citation.' }

  // URL shapes
  if (/^https?:\/\//.test(s)) {
    const work = /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/.exec(s)?.[1] ?? null
    const share = /[?&]si=/.test(s)
    const radio = /[?&]list=RD/.test(s)
    const ts = /[?&]t=\d+/.test(s)
    let kind: Parsed['kind'] = 'url'
    let fp = 'url'
    if (/music\.youtube\.com/.test(s)) fp = 'music.youtube.com (inverse surface — no timestamp)'
    else if (/youtu\.be/.test(s)) fp = 'youtu.be share (short share)'
    else if (/\/embed\//.test(s)) fp = 'youtube embed (start/end vocabulary)'
    else if (/youtube\.com\/watch/.test(s)) fp = 'youtube watch (authorial surface, &t=)'
    return {
      kind, workKey: work, shareTokenPresent: share, arrivedWithRadioContext: radio, hasTimestamp: ts,
      styleFingerprint: fp,
      note: work ? `one work → ${work}` : 'no 11-char video id found',
    }
  }

  // Dewey call number
  if (/^\d{3}(\.\d+)?$/.test(s)) {
    return { kind: 'dewey', workKey: null, shareTokenPresent: false, arrivedWithRadioContext: false, hasTimestamp: false, styleFingerprint: 'Dewey Decimal', note: 'a shelf address in a single implicit universe — no timestamp, no reuse terms, no epistemic status.' }
  }

  // Citation heuristics
  const apa = /\(\d{4}\)/.test(s) && /\[Video\]/.test(s)
  const mla = /"[\s\S]+?"\./.test(s) && /uploaded by/i.test(s)
  const chicago = /YouTube video/.test(s) || /video, \d+:\d+/.test(s)
  let kind: Parsed['kind'] = 'citation'
  let fp = 'unrecognized citation'
  if (apa) fp = 'APA 7 (parenthetical year + [Video] descriptor)'
  else if (mla) fp = 'MLA 9 (quoted title + "uploaded by")'
  else if (chicago) fp = 'Chicago 18 (note: "YouTube video, runtime")'
  else { kind = 'unknown'; fp = 'unrecognized' }

  return {
    kind, workKey: null, shareTokenPresent: false, arrivedWithRadioContext: false, hasTimestamp: /t=\d+|:\d{2}/.test(s),
    styleFingerprint: fp,
    note: kind === 'unknown' ? 'no format signature recognized — the punctuation betrays nothing it wasn’t given.' : 'the format betrays its style, but not its universe.',
  }
}

export default function Projector() {
  usePageMeta('Projector', 'Cast citations between complex space and flat style strings.')
  const [rotation, setRotation] = useState<Rotation>(0)
  const [reverse, setReverse] = useState('')
  const anchor = useMemo(() => anchorFor(rotation), [rotation])
  const parsed = useMemo(() => parseInput(reverse), [reverse])

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight text-lego-ink">Projector</h1>
      <p className="mt-2 text-lg text-lego-ink/65">
        Snap the coordinate together, rotate it, then cast shadows back to every style. Nothing is lost until you ask for
        a flat shadow.
      </p>

      <div className="mt-8 rounded-xl border-2 border-lego-ink/10 bg-lego-white p-4">
        <div className="mb-3 text-xs font-black uppercase tracking-wider text-lego-ink/60">Rotation (the quarter-turn)</div>
        <div className="flex flex-wrap gap-2">
          {ROTATIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRotation(r)}
              className={`rounded-lg px-3 py-1.5 text-sm font-bold ${
                rotation === r ? 'bg-lego-ink text-lego-yellow-400' : 'bg-lego-cream text-lego-ink/70'
              }`}
            >
              R{r}
            </button>
          ))}
        </div>
        <div className="mt-3 font-mono text-sm text-lego-ink/70">
          plane <strong>{anchor.plane}</strong> · anchor <strong>{anchor.anchor}</strong> · charge{' '}
          <strong>{anchor.charge}</strong> · {anchor.note}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {STYLES.map((s) => {
          const text = project(OPEN_ARMS, s.id, { t: 182, tEnd: 202, quote: OPEN_ARMS.grant.quote })
          const lost = losses(s.id).filter((d) => d.lost)
          const kept = losses(s.id).filter((d) => !d.lost)
          return (
            <div key={s.id} className="rounded-xl border-2 border-lego-ink/10 bg-lego-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-bold text-lego-ink">{s.label}</span>
                <span className="text-xs font-semibold text-lego-red-500">
                  {lost.length > 0 ? `drops ${lost.map((d) => d.label.split(' ')[0]).join(', ')}` : 'keeps all four'}
                </span>
              </div>
              <pre className="mono overflow-x-auto rounded-lg bg-lego-cream p-3 text-xs whitespace-pre-wrap">{text}</pre>
              <div className="mt-2 flex flex-wrap gap-1">
                {kept.map((d) => (
                  <span key={d.key} className="rounded-full bg-lego-green-100 px-2 py-0.5 text-xs font-semibold text-lego-green-700">
                    ✓ {d.label}
                  </span>
                ))}
                {lost.map((d) => (
                  <span key={d.key} className="rounded-full bg-lego-red-100 px-2 py-0.5 text-xs font-semibold text-lego-red-700" title={d.note}>
                    ✗ {d.label}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 rounded-xl border-2 border-lego-blue-200 bg-lego-blue-50 p-4">
        <div className="mb-2 text-xs font-black uppercase tracking-wider text-lego-blue-700">Reverse — paste any citation or link</div>
        <textarea
          value={reverse}
          onChange={(e) => setReverse(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=ms0UbxUV9X8&si=…  or  025.431  or  an APA/MLA/Chicago entry"
          className="w-full rounded-lg border-2 border-lego-blue-200 bg-lego-white p-3 font-mono text-sm"
          rows={3}
        />
        <div className="mt-3 grid gap-2 text-sm">
          <div className="flex justify-between"><span className="text-lego-ink/60">work key</span><span className="font-mono">{parsed.workKey ?? '—'}</span></div>
          <div className="flex justify-between"><span className="text-lego-ink/60">share token (si=)</span><span className="font-mono">{parsed.shareTokenPresent ? 'present — scrubbed' : 'absent'}</span></div>
          <div className="flex justify-between"><span className="text-lego-ink/60">radio context (RD…)</span><span className="font-mono">{parsed.arrivedWithRadioContext ? 'true' : 'false'}</span></div>
          <div className="flex justify-between"><span className="text-lego-ink/60">timestamp</span><span className="font-mono">{parsed.hasTimestamp ? 'present' : 'absent'}</span></div>
          <div className="flex justify-between"><span className="text-lego-ink/60">format fingerprint</span><span className="font-mono">{parsed.styleFingerprint}</span></div>
          <div className="rounded-lg bg-lego-white p-2 text-sm text-lego-ink/70">{parsed.note}</div>
        </div>
      </div>
    </div>
  )
}
