import { Link, useParams } from 'react-router-dom'
import { docBySlug, neighbours } from '../lib/content'
import { Markdown } from '../lib/markdown'
import { usePageMeta } from '../lib/usePageMeta'
import { NotFound } from './NotFound'

export default function DocPage({ section }: { section: string }) {
  const { slug } = useParams()
  const doc = docBySlug(section, slug ?? '')
  usePageMeta(doc?.meta.title ?? 'Doc', doc?.meta.description)

  if (!doc) return <NotFound />

  const { prev, next } = neighbours(section, doc.slug)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-2 text-xs font-black uppercase tracking-widest text-brick-red-500">{section}</div>
      <h1 className="text-3xl font-black tracking-tight text-brick-ink">{doc.meta.title}</h1>
      {doc.meta.description && <p className="mt-2 text-lg text-brick-ink/65">{doc.meta.description}</p>}
      {doc.meta.tags && doc.meta.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {doc.meta.tags.map((t) => (
            <span key={t} className="rounded-full bg-brick-cream px-2 py-0.5 text-xs font-semibold text-brick-ink/60">
              {t}
            </span>
          ))}
        </div>
      )}

      <article className="mt-8">
        <Markdown>{doc.body}</Markdown>
      </article>

      <nav className="mt-12 flex justify-between gap-4 border-t-2 border-brick-ink/10 pt-4 text-sm">
        {prev ? (
          <Link className="font-semibold text-brick-blue-600 hover:underline" to={`/${section}/${prev.slug}`}>
            ← {prev.meta.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="font-semibold text-brick-blue-600 hover:underline" to={`/${section}/${next.slug}`}>
            {next.meta.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}
