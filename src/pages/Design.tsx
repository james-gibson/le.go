import { Attribution } from '../components/Attribution'
import { Brick } from '../components/Brick'
import { PartsList } from '../components/PartsList'
import { StepNumber } from '../components/StepNumber'
import { PREMISE, RUNG_LATTICE, anchorFor, project } from '../lib/citations'
import { OPEN_ARMS } from '../lib/open-arms'
import { usePageMeta } from '../lib/usePageMeta'

const COLORS = ['red', 'yellow', 'blue', 'green', 'white', 'ink'] as const
const STEPS = ['yellow', 'blue', 'green', 'red'] as const

export default function Design() {
  usePageMeta('Design', 'The live 42i-set design system — why the classic styles are lossy, shown as bricks.')

  const glued = project(OPEN_ARMS, 'apa7')

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight text-brick-ink">Design system</h1>
      <p className="mt-2 text-lg text-brick-ink/65">
        The 42i set, rendered live. An experienced eye can read this page and see <em>why</em> the other systems are
        lossy — no explanation required. If it isn't obvious yet, the seeds and isotopes spell it out.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-black text-brick-ink">Glued model vs. snap bricks</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-brick-red-200 bg-brick-red-50 p-4">
            <div className="mb-2 text-xs font-black uppercase tracking-wider text-brick-red-700">The glued model</div>
            <p className="mono text-sm break-words">{glued}</p>
            <p className="mt-3 text-sm text-brick-ink/70">
              Five real facts were squirted with punctuation glue and handed to you as one rigid lump. The reuse terms,
              the timestamp, the epistemic status, and the provenance fell on the floor and set.
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {['time', 'reuse', 'epistemic', 'lineage'].map((k) => (
                <span key={k} className="rounded-full bg-brick-red-100 px-2 py-0.5 text-xs font-semibold text-brick-red-700 line-through">{k}</span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-2 border-brick-green-200 bg-brick-green-50 p-4">
            <div className="mb-2 text-xs font-black uppercase tracking-wider text-brick-green-700">The snap bricks</div>
            <div className="grid gap-2">
              {[
                { c: 'red', l: 'event', v: OPEN_ARMS.title },
                { c: 'blue', l: 'clock', v: `[3:02, 3:22)` },
                { c: 'green', l: 'realityRelation', v: OPEN_ARMS.realityRelation },
                { c: 'yellow', l: 'licenceBasis', v: 'spoken_grant_in_work' },
                { c: 'ink', l: 'surfaces', v: 'youtube · music.youtube · hub' },
              ].map((b) => (
                <Brick key={b.l} color={b.c as (typeof COLORS)[number]} studs={2} label={b.l}>
                  {b.v}
                </Brick>
              ))}
            </div>
            <p className="mt-3 text-sm text-brick-ink/70">
              Every fact is a studded block with standard snap-fit. Snap them into a complex-space universe, then unsnap
              and re-project into any style at will — nothing is lost until you ask for a flat shadow.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-brick-ink">The four snaps</h2>
        <div className="grid gap-4">
          {PREMISE.map((p, i) => (
            <div key={p.key} className="flex gap-4">
              <div className="pt-1">
                <StepNumber n={i + 1} color={STEPS[i]} />
              </div>
              <div className="flex-1">
                <Brick color={STEPS[i]} studs={i + 1} label={p.label}>
                  <p className="text-base font-semibold">{p.move}</p>
                  <p className="mt-1 text-sm opacity-90">{p.meaning}</p>
                  <p className="mt-1 font-mono text-xs opacity-70">{p.note}</p>
                </Brick>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-brick-ink">The plane dial (R⁰–R³)</h2>
        <div className="grid gap-2 sm:grid-cols-4">
          {([0, 1, 2, 3] as const).map((r) => {
            const a = anchorFor(r)
            return (
              <div key={r} className="rounded-xl border-2 border-brick-ink/10 bg-brick-white p-3 text-center">
                <div className="text-2xl font-black text-brick-ink">R{r}</div>
                <div className="mono text-xs text-brick-ink/60">{a.plane}</div>
                <div className="text-xs text-brick-ink/60">{a.note}</div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-brick-ink">The 42i capability lattice</h2>
        <p className="mb-3 text-sm text-brick-ink/60">
          One plane, one measure: how far a thing has drifted from nominal. le.go uses citations as the domain; the lab
          uses the same lattice for agent trust (isotope / lezz.go / lab-safety).
        </p>
        <div className="overflow-x-auto rounded-xl border-2 border-brick-yellow-300">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b-2 border-brick-yellow-300 bg-brick-yellow-100 px-3 py-2 text-left font-bold">Rung</th>
                <th className="border-b-2 border-brick-yellow-300 bg-brick-yellow-100 px-3 py-2 text-left font-bold">Name</th>
                <th className="border-b-2 border-brick-yellow-300 bg-brick-yellow-100 px-3 py-2 text-left font-bold">Max distance</th>
                <th className="border-b-2 border-brick-yellow-300 bg-brick-yellow-100 px-3 py-2 text-left font-bold">Means</th>
              </tr>
            </thead>
            <tbody>
              {RUNG_LATTICE.map((r) => (
                <tr key={r.n}>
                  <td className="border-b border-brick-ink/10 px-3 py-2 font-bold">{r.n}</td>
                  <td className="border-b border-brick-ink/10 px-3 py-2">{r.name}</td>
                  <td className="border-b border-brick-ink/10 px-3 py-2 font-mono">{r.maxDistance}</td>
                  <td className="border-b border-brick-ink/10 px-3 py-2">{r.means}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-brick-ink">Bricks</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((c, i) => (
            <Brick key={c} color={c} studs={i + 1} label={c}>
              A {c} block. Studs carry the snap-fit; the body carries the fact.
            </Brick>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-brick-ink">Parts list</h2>
        <PartsList
          parts={PREMISE.map((p, i) => ({ name: p.label, count: '1', color: (COLORS[i] ?? 'yellow') as 'red' | 'yellow' | 'blue' | 'green' }))}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-brick-ink">Attribution block</h2>
        <Attribution />
      </section>
    </div>
  )
}
