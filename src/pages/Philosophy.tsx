import { useMemo, useState } from 'react'
import { Attribution } from '../components/Attribution'
import { LYRICS, OPEN_ARMS, embedUrl, formatTime, grantLine, sectionById, watchUrl } from '../lib/open-arms'
import { project, STYLES, type StyleId } from '../lib/citations'
import { usePageMeta } from '../lib/usePageMeta'

type Line = (typeof LYRICS.lines)[number]

interface LedgerEntry {
  lineId: string
  style: StyleId
  at: number
}

const LEDGER_KEY = 'le.go.ledger'

function loadLedger(): LedgerEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LEDGER_KEY) ?? '[]')
  } catch {
    return []
  }
}

export default function Philosophy() {
  usePageMeta('Philosophy', 'Full-text Open Arms, line-addressed, with per-line copy-citation.')
  const [revoked, setRevoked] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [ledger, setLedger] = useState<LedgerEntry[]>(() => loadLedger())

  const sections = useMemo(() => LYRICS.sections, [])

  function copyCitation(line: Line, style: StyleId) {
    const text = project(OPEN_ARMS, style, { t: line.t, tEnd: line.tEnd, quote: line.text })
    navigator.clipboard?.writeText(text).catch(() => {})
    const next = [...ledger, { lineId: line.id, style, at: Date.now() }]
    setLedger(next)
    try {
      localStorage.setItem(LEDGER_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    setCopied(`${line.id} → ${STYLES.find((s) => s.id === style)?.label}`)
    window.setTimeout(() => setCopied(null), 1600)
  }

  function exportLedger(format: 'bibtex' | 'csl' | 'chapters') {
    const unique = Array.from(new Set(ledger.map((e) => e.lineId)))
    if (format === 'chapters') {
      const clips = unique
        .map((id) => LYRICS.lines.find((l) => l.id === id))
        .filter(Boolean)
        .map((l) => `${formatTime(l!.t)} ${l!.id} ${l!.text}`)
        .join('\n')
      navigator.clipboard?.writeText(clips).catch(() => {})
      return
    }
    const body = project(OPEN_ARMS, format === 'bibtex' ? 'bibtex' : 'csl-json')
    navigator.clipboard?.writeText(body).catch(() => {})
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight text-lego-ink">Philosophy — Open Arms</h1>
      <p className="mt-2 text-lg text-lego-ink/65">
        The song as a philosophy statement. Each line is a citable unit with a working link back to that second of the
        recording.
      </p>

      <div className="mt-6">
        <Attribution />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border-2 border-lego-ink/10 bg-lego-white p-4">
        <div className="text-sm font-semibold text-lego-ink/70">Listen first — the page drives playback, it does not replace it.</div>
        <a
          className="rounded-lg bg-lego-red-500 px-3 py-1.5 text-sm font-bold text-lego-white"
          href={watchUrl(grantLine()?.t)}
          target="_blank"
          rel="external noopener noreferrer"
        >
          ▶ Play the grant at {formatTime(grantLine()?.t ?? 182)}
        </a>
        <button
          className="rounded-lg border-2 border-lego-ink/15 px-3 py-1.5 text-sm font-bold text-lego-ink/70"
          onClick={() => setRevoked((v) => !v)}
        >
          {revoked ? 'Undo takedown rehearsal' : 'Rehearse artist takedown'}
        </button>
      </div>

      {revoked && (
        <div className="mt-4 rounded-lg border-2 border-lego-red-300 bg-lego-red-50 p-3 text-sm text-lego-red-700">
          Takedown rehearsal active: lyric text is tombstoned, but every previously copied citation and deep link still
          resolves. Flipping this back restores the text.
        </div>
      )}

      {copied && (
        <div className="mt-4 rounded-lg bg-lego-green-500 p-2 text-center text-sm font-bold text-lego-white">
          Copied {copied}
        </div>
      )}

      {sections.map((sec) => {
        const lines = LYRICS.lines.filter((l) => l.section === sec.id)
        if (lines.length === 0) return null
        return (
          <section key={sec.id} id={`l-${sec.id}`} className="mt-8">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-black text-lego-ink">{sec.thesis}</h2>
            </div>
            <div className="text-xs font-black uppercase tracking-wider text-lego-red-500">{sectionById(sec.id)?.id}</div>
            <ul className="mt-3 grid gap-1.5">
              {lines.map((line) => (
                <li key={line.id} className="group flex items-start gap-2 rounded-lg border border-lego-ink/8 bg-lego-white px-3 py-2">
                  <span className="mono mt-0.5 shrink-0 text-xs text-lego-ink/45">{formatTime(line.t)}</span>
                  <span className="flex-1">
                    <span className={revoked ? 'italic text-lego-ink/40' : ''}>
                      {revoked ? '[withdrawn per artist request]' : line.text}
                    </span>
                    {line.flags.includes('uncertain_word') && !revoked && (
                      <span className="ml-2 border-b border-dotted border-lego-yellow-500 text-xs text-lego-yellow-700" title="transcription uncertain — listen">
                        uncertain
                      </span>
                    )}
                  </span>
                  {!revoked && (
                    <details className="relative">
                      <summary className="cursor-pointer rounded px-1.5 text-lego-ink/50 hover:bg-lego-cream hover:text-lego-ink" title="Copy citation">
                        ⧉
                      </summary>
                      <div className="absolute right-0 z-20 mt-1 w-56 rounded-lg border-2 border-lego-ink/10 bg-lego-white p-1 shadow-lg">
                        {STYLES.map((s) => (
                          <button
                            key={s.id}
                            className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-lego-cream"
                            onClick={() => copyCitation(line, s.id)}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </details>
                  )}
                  <a
                    className="mono mt-0.5 shrink-0 text-xs text-lego-blue-600 underline"
                    href={watchUrl(line.t)}
                    target="_blank"
                    rel="external noopener noreferrer"
                  >
                    {formatTime(line.t)}↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <div className="mt-10 rounded-xl border-2 border-lego-blue-200 bg-lego-blue-50 p-4">
        <div className="mb-2 text-xs font-black uppercase tracking-wider text-lego-blue-700">Group citation ledger</div>
        <p className="text-sm text-lego-ink/70">
          {ledger.length === 0 ? 'No copies yet.' : `${ledger.length} copy${ledger.length === 1 ? '' : 's'} recorded (${new Set(ledger.map((e) => e.lineId)).size} unique lines).`}{' '}
          Multiple line copies of <em>Open Arms</em> deduplicate into one work entry.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-lg bg-lego-blue-500 px-3 py-1.5 text-sm font-bold text-lego-white" onClick={() => exportLedger('bibtex')}>
            Export BibTeX
          </button>
          <button className="rounded-lg bg-lego-blue-500 px-3 py-1.5 text-sm font-bold text-lego-white" onClick={() => exportLedger('csl')}>
            Export CSL-JSON
          </button>
          <button className="rounded-lg bg-lego-blue-500 px-3 py-1.5 text-sm font-bold text-lego-white" onClick={() => exportLedger('chapters')}>
            Export clip-sheet
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border-2 border-lego-ink/10 bg-lego-white p-4">
        <div className="mb-2 text-xs font-black uppercase tracking-wider text-lego-ink/60">Embed (loads only on demand)</div>
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold text-lego-blue-600">Load the player (start/end set per stanza)</summary>
          <iframe
            className="mt-3 aspect-video w-full rounded-lg"
            src={embedUrl(grantLine()?.t ?? 182, grantLine()?.tEnd ?? 202)}
            title="Open Arms — grant excerpt"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </details>
      </div>
    </div>
  )
}
