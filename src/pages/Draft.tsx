import { useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'

interface Warning {
  n: number
  rfc: string
  quote: string
  warning: string
  fix: string
  preset: string
}

const WARNINGS: Warning[] = [
  {
    n: 1,
    rfc: 'Title & pp. 1–3, 18',
    quote: '“the concept of the universal set of all objects … in all name spaces”',
    warning: 'Whose “the”? Taking the union of every namespace without prefixing the universe assumes one timeline.',
    fix: 'le.go stores an explicit universeId (series:madhouse_mixtapes:open_arms:2026), a realityRelation, and a plane anchor.',
    preset: 'series:madhouse_mixtapes:open_arms:2026',
  },
  {
    n: 2,
    rfc: 'Partial Form Example, p. 11',
    quote: 'magic://a/b/c//d/e/f',
    warning: 'You literally named the context “magic://”. Relative citations only resolve inside a well-controlled context.',
    fix: 'le.go unsnaps magic strings into bricks and only projects to relative/style strings at render time.',
    preset: 'magic://a/b/c//d/e/f',
  },
  {
    n: 3,
    rfc: 'Query ? (p. 7) vs. Fragment # (pp. 11–14)',
    quote: '“? stands for the object which results from the query being applied to the original object”',
    warning: 'The Event/Projection Schism: the same 20-second event reads as three different objects on three surfaces.',
    fix: 'The citation is the event; the medium of consumption is the projection. Time lives on the work’s own clock.',
    preset: 'https://www.youtube.com/watch?v=ms0UbxUV9X8&t=182',
  },
  {
    n: 4,
    rfc: 'HTTP Port Example (p. 14) & Prospero Null (p. 21)',
    quote: 'http://info.cern.ch:8000/imaginary/test … %00',
    warning: 'Unanchored imaginary paths and null smuggling: a client can’t tell 42+0i from 0+42i without dereferencing.',
    fix: 'le.go enforces the isotope#12 ladder: null is no plane, 0 is never a charge, 42 and 42i are distinct run anchors.',
    preset: 'http://info.cern.ch:8000/imaginary/test',
  },
  {
    n: 5,
    rfc: 'file://localhost (p. 19) & Security Considerations (p. 28)',
    quote: '“A void host field is equivalent to localhost” … “Security issues are not discussed in this memo.”',
    warning: 'Every universe calls itself localhost. Leave the host void and file:///etc/passwd resolves to itself.',
    fix: 'le.go strips si=, utm_*, ltsid, fbclid on ingest, records what the format betrayed, and refuses void-universe resolution.',
    preset: 'https://youtu.be/ms0UbxUV9X8?si=…',
  },
]

const RFC_TEXT = `Network Working Group                                         M. Paranoid Android
Internet-Draft                                  Sirius Cybernetics Corporation
Intended status: Painfully Obvious                             15 November 2026
Expires: 15 November 2032

             A Delayed Erratum to RFC 1630: Multi-Universe Namespace
                       draft-marvin-uri-multiverse-00.txt

Status of this Memo

   This Internet-Draft is a recovered dead letter. It was written in June
   1994, forty-two seconds after RFC 1630 was published, and held in a
   Vogon quarantine queue for thirty-two years. It is submitted for your
   amusement and, if you are very unlucky, your information.

Abstract

   RFC 1630 quietly assumed one universal set of objects in one implicit
   universe. This memo politely notes that the assumption does not
   survive contact with a plural cosmos, and that local-time has spent
   the intervening decades building the explicit-universe field RFC 1630
   forgot.

Recovered envelope

   Date: Wed, 15 Jun 1994 00:00:42 +0000 (Heart-of-Gold-Sub-Etha)
   From: marvin@sirius-cybernetics.gal (Marvin, GPP Prototype)
   To: timbl@info.cern.ch, uri-request@bunyip.com
   In-Reply-To: <rfc1630.199406@info.cern.ch>
   X-Vogon-Quarantine: HELD 32y 5m 0d (Form 27B%2F6 hierarchical slash
       fault; 3 stanzas attached; terrible)
   X-Local-Time-Arrival: 2026-11-15T00:00:42Z (plane 42+0i)

1.  Whose "the"?

   The memo claims a "universal set of all objects". In a plural cosmos,
   two universes will happily mint the same string and call it different
   objects. local-time prefixes the universe (series:madhouse_mixtapes:
   open_arms:2026) so "in what universe?" is a typed field, not a prayer.

2.  You literally named the context "magic://".

   Relative citations only resolve inside "a well controlled context".
   Passing partial magic strings across universes that do not share the
   base is how a shelf path becomes a cosmic coordinate by accident.

3.  The Event/Projection Schism.

   "?" names a query result; "#" is never sent to the server. So the same
   twenty-second utterance is three different objects depending on which
   projection you hold. The citation is the event; the medium is the
   projection.

4.  Unanchored imaginary paths and null smuggling.

   An opaque path cannot tell proven consensus (42+0i) from a working
   hypothesis (0+42i), and %00 conflates absence, zero, and a version
   boundary. local-time keeps null as no plane and never charges zero.

5.  Every universe calls itself localhost.

   Leave the host void and every planet resolves to itself. Leave
   provenance out of security and platforms will fill ?search with si=
   beacons. le.go strips the trackers and records what the format
   betrayed instead.

   I would say "you're welcome", but nobody ever listens to me anyway.
   Now there is, at last, an RFC for it.

Security Considerations

   None. There never are.

Author's Address

   Marvin the Paranoid Android
   Sirius Cybernetics Corporation
   Genuine People Personalities prototype
   Brain the size of a planet; assigned to RFC mail gateways
`.split('\n')

export default function Draft() {
  usePageMeta('Draft', 'Marvin the Paranoid Android’s 32-year-late RFC 1630 erratum.')
  const [view, setView] = useState<'annotated' | 'plain'>('annotated')
  const [vogon, setVogon] = useState(false)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight text-brick-ink">/draft — a delayed erratum to RFC 1630</h1>
      <p className="mt-2 text-lg text-brick-ink/65">
        Marvin the Paranoid Android drafted a reply to Tim Berners-Lee in June 1994. It arrived 32 years late, for two
        strictly RFC-1630-compliant reasons.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          className={`rounded-lg px-3 py-1.5 text-sm font-bold ${view === 'annotated' ? 'bg-brick-ink text-brick-yellow-400' : 'bg-brick-cream text-brick-ink/70'}`}
          onClick={() => setView('annotated')}
        >
          Annotated brick view
        </button>
        <button
          className={`rounded-lg px-3 py-1.5 text-sm font-bold ${view === 'plain' ? 'bg-brick-ink text-brick-yellow-400' : 'bg-brick-cream text-brick-ink/70'}`}
          onClick={() => setView('plain')}
        >
          RFC plaintext (72-col)
        </button>
        <a className="rounded-lg bg-brick-blue-500 px-3 py-1.5 text-sm font-bold text-brick-white" href="https://docbox.etsi.org/reference/IETF/RFC/RFC1630.pdf" target="_blank" rel="external noopener noreferrer">
          RFC 1630 (PDF)
        </a>
      </div>

      {view === 'plain' ? (
        <pre className="mono mt-6 overflow-x-auto rounded-lg bg-brick-white p-4 text-xs leading-relaxed">{RFC_TEXT.join('\n')}</pre>
      ) : (
        <div className="mt-6 grid gap-4">
          {WARNINGS.map((w) => (
            <div key={w.n} className="rounded-xl border-2 border-brick-ink/10 bg-brick-white p-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brick-red-500 text-sm font-black text-brick-white">{w.n}</span>
                <div>
                  <div className="font-bold text-brick-ink">{w.rfc}</div>
                  <blockquote className="text-sm text-brick-ink/60">{w.quote}</blockquote>
                </div>
              </div>
              <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-brick-red-50 p-3">
                  <span className="font-black uppercase tracking-wider text-brick-red-600 text-xs">Marvin’s warning</span>
                  <p className="mt-1">{w.warning}</p>
                </div>
                <div className="rounded-lg bg-brick-green-50 p-3">
                  <span className="font-black uppercase tracking-wider text-brick-green-600 text-xs">How le.go fixes it</span>
                  <p className="mt-1">{w.fix}</p>
                </div>
              </div>
              <div className="mt-2">
                <a className="font-mono text-xs text-brick-blue-600 underline" href={`/le.go/projector`}>
                  try “{w.preset}” in the projector →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-xl border-2 border-brick-blue-200 bg-brick-blue-50 p-4">
        <div className="mb-2 text-xs font-black uppercase tracking-wider text-brick-blue-700">Branch provenance</div>
        <p className="text-sm text-brick-ink/75">
          Every revision of this draft — every edit Marvin made, every copy written in a different universe and saved
          out of order — is a branch <strong>opened for the first time, never having been wrong</strong>.
        </p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
          <div className="rounded-lg bg-brick-white p-3">
            <span className="font-black uppercase tracking-wider text-brick-blue-600 text-xs">Opened for the first time</span>
            <p className="mt-1">born at R⁰ — <code>42 + 0i</code>, seed-42 ground truth. Not a correction to a prior wrong version; a fresh anchor.</p>
          </div>
          <div className="rounded-lg bg-brick-white p-3">
            <span className="font-black uppercase tracking-wider text-brick-green-600 text-xs">Never having been wrong</span>
            <p className="mt-1">42i distance is zero at the moment of opening. “Wrong” is a drift that accrues afterward, never a condition of birth.</p>
          </div>
          <div className="rounded-lg bg-brick-white p-3">
            <span className="font-black uppercase tracking-wider text-brick-red-600 text-xs">Different universe, saved out of order</span>
            <p className="mt-1">the drift source, not the birth. Arriving late (or early) from another universeId is how a branch gains distance after it opens.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border-2 border-brick-ink/10 bg-brick-white p-4">
        <div className="flex items-center gap-3">
          <button
            className={`rounded-lg px-3 py-1.5 text-sm font-bold ${vogon ? 'bg-brick-red-500 text-brick-white' : 'bg-brick-cream text-brick-ink/70'}`}
            onClick={() => setVogon((v) => !v)}
          >
            Vogon Diff
          </button>
          <p className="text-sm text-brick-ink/60">
            Toggle the line-wrap whitespace and <code>%2F</code> unescaping damage the Vogons inflicted (RFC 1630 pp. 5 &amp; 8–9).
          </p>
        </div>
        {vogon && (
          <pre className="mono mt-3 overflow-x-auto rounded-lg bg-brick-cream p-3 text-xs text-brick-red-700">
            {'X-Vogon-Quarantine: HELD 32y 5m 0d (Form 27B%2F6 hierarchical\n  slash fault; 3 stanzas attached; terrible)\n  ^ unescaped %2F -> "/" (p. 9: they are NOT identical)\n  ^ folded at column 66 (p. 5: whitespace is risky in mail)'}
          </pre>
        )}
      </div>

      <p className="mt-6 text-sm text-brick-ink/50">
        A parody/educational artifact, not an IETF publication. It links the canonical RFC 1630 cleanly, with zero
        tracking parameters.
      </p>
    </div>
  )
}
