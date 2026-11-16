import { Link } from 'react-router-dom'
import { PREMISE } from '../lib/citations'
import { Attribution } from '../components/Attribution'
import { Brick } from '../components/Brick'
import { StepNumber } from '../components/StepNumber'
import { PartsList } from '../components/PartsList'
import { usePageMeta } from '../lib/usePageMeta'
import { watchUrl } from '../lib/open-arms'

const STEP_COLOR = ['yellow', 'blue', 'green', 'red'] as const

export default function Home() {
  usePageMeta('Manual', 'The citation is the event; the medium of consumption is the projection.')

  return (
    <div className="lego-dotgrid">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-lego-ink px-4 py-1 text-xs font-black uppercase tracking-widest text-lego-yellow-400">
            <span className="text-base">☕</span> Don’t Panic
          </div>
          <h1 className="text-4xl font-black tracking-tight text-lego-ink sm:text-5xl">le.go</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-lego-ink/70">
            The citation is the event; the medium of consumption is the projection. An instruction manual for snapping
            citations apart and putting them back together.
          </p>
        </div>

        <div className="mb-10">
          <PartsList
            title="Box contents — the 42i premise"
            parts={[
              { name: 'null', count: '1', color: 'red' },
              { name: 'not null', count: '1', color: 'blue' },
              { name: '0 > 1', count: '1', color: 'green' },
              { name: '42 = 0', count: '1', color: 'yellow' },
              { name: 'the event', count: '1', color: 'white' },
              { name: 'projections', count: 'many', color: 'ink' },
            ]}
          />
        </div>

        <div className="mb-12 grid gap-6">
          {PREMISE.map((piece, i) => (
            <section key={piece.key} className="flex gap-4">
              <div className="pt-1">
                <StepNumber n={i + 1} color={STEP_COLOR[i]} />
              </div>
              <div className="flex-1">
                <Brick color={STEP_COLOR[i]} studs={i + 1} label={piece.label} className="max-w-none">
                  <p className="text-base font-semibold">{piece.move}</p>
                  <p className="mt-1 text-sm opacity-90">{piece.meaning}</p>
                  <p className="mt-1 font-mono text-xs opacity-70">{piece.lego}</p>
                </Brick>
              </div>
            </section>
          ))}
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <Brick color="blue" studs={3} label="The five stages">
            How a Dewey shelf number became a magic string — and how local-time turns it back into a coordinate.{' '}
            <Link className="font-bold underline" to="/docs">Read the docs →</Link>
          </Brick>
          <Brick color="green" studs={3} label="Pick your door">
            One entrance per background: curious listener, group project, historian, agent operator, plane architect.{' '}
            <Link className="font-bold underline" to="/seeds">Read the seeds →</Link>
          </Brick>
          <Brick color="yellow" studs={3} label="The philosophy page">
            Full-text <em>Open Arms</em>, line-addressed, with a per-line copy-citation menu and working link-backs.{' '}
            <Link className="font-bold underline" to="/philosophy">Open philosophy →</Link>
          </Brick>
          <Brick color="red" studs={3} label="The projector">
            Snap bricks, rotate R⁰–R³ across 42+0i / 0+42i, and cast shadows back to APA, MLA, Chicago, and friends.{' '}
            <Link className="font-bold underline" to="/projector">Open projector →</Link>
          </Brick>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Brick color="ink" studs={4} label="Marvin’s 32-year-late RFC 1630 erratum">
            A paranoid android, a Vogon dead-letter queue, and the multi-universe namespace bug we’re still untangling.{' '}
            <Link className="font-bold underline" to="/draft">Read /draft →</Link>
          </Brick>
          <Brick color="white" studs={4} label="For the historian">
            The ad-free projection is the door: <Link className="font-bold underline" to="/bare">/bare/</Link> (zero CSS,
            zero JS, zero ads) and a self-contained <a className="font-bold underline" href={import.meta.env.BASE_URL + 'deck.html'}>slide deck</a>.
          </Brick>
        </div>

        <Attribution />
      </div>
    </div>
  )
}
