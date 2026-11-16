import { Link } from 'react-router-dom'
import { sections } from '../lib/content'
import { usePageMeta } from '../lib/usePageMeta'

const LABEL: Record<string, string> = { docs: 'Docs', seeds: 'Seeds', isotopes: 'Isotopes' }

export default function SectionIndex({ section }: { section: string }) {
  const s = sections().find((x) => x.id === section)
  usePageMeta(LABEL[section] ?? section, s?.description)

  if (!s) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black tracking-tight text-brick-ink">{s.label}</h1>
      <p className="mt-2 text-lg text-brick-ink/65">{s.description}</p>

      <ol className="mt-8 grid gap-3">
        {s.docs.map((d, i) => (
          <li key={d.slug}>
            <Link
              to={`/${section}/${d.slug}`}
              className="flex items-center gap-4 rounded-xl border-2 border-brick-ink/10 bg-brick-white p-4 transition-shadow hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brick-yellow-400 text-base font-black text-brick-ink">
                {i + 1}
              </span>
              <span>
                <span className="block font-bold text-brick-ink">{d.meta.title}</span>
                {d.meta.description && <span className="block text-sm text-brick-ink/60">{d.meta.description}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
