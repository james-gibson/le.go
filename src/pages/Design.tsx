import { Attribution } from '../components/Attribution'
import { Brick } from '../components/Brick'
import { PartsList } from '../components/PartsList'
import { StepNumber } from '../components/StepNumber'
import { PREMISE, anchorFor } from '../lib/citations'
import { usePageMeta } from '../lib/usePageMeta'

const COLORS = ['red', 'yellow', 'blue', 'green', 'white', 'ink'] as const

export default function Design() {
  usePageMeta('Design', 'The live Lego design system.')
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight text-lego-ink">Design system</h1>
      <p className="mt-2 text-lg text-lego-ink/65">
        The bricks this site ships with — rendered live, not a screenshot of them.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-black text-lego-ink">Bricks</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORS.map((c, i) => (
            <Brick key={c} color={c} studs={i + 1} label={c}>
              A {c} brick. Studs carry the clutch power; the body carries the fact.
            </Brick>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-lego-ink">Step numbers</h2>
        <div className="flex gap-3">
          {(['red', 'yellow', 'blue', 'green'] as const).map((c, i) => (
            <StepNumber key={c} n={i + 1} color={c} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-lego-ink">Parts list</h2>
        <PartsList
          parts={PREMISE.map((p, i) => ({ name: p.label, count: '1', color: (COLORS[i] ?? 'yellow') as 'red' | 'yellow' | 'blue' | 'green' }))}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-lego-ink">The plane dial</h2>
        <div className="grid gap-2 sm:grid-cols-4">
          {([0, 1, 2, 3] as const).map((r) => {
            const a = anchorFor(r)
            return (
              <div key={r} className="rounded-xl border-2 border-lego-ink/10 bg-lego-white p-3 text-center">
                <div className="text-2xl font-black text-lego-ink">R{r}</div>
                <div className="mono text-xs text-lego-ink/60">{a.plane}</div>
                <div className="text-xs text-lego-ink/60">{a.note}</div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-black text-lego-ink">Attribution block</h2>
        <Attribution />
      </section>
    </div>
  )
}
