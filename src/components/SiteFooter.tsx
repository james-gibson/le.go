import { Attribution } from './Attribution'

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t-4 border-brick-blue-500 bg-brick-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Attribution compact />
        <p className="mt-3 text-xs text-brick-ink/50">
          An educational remix under the artist’s spoken grant. Code AGPL-3.0. The citation is the event; the medium of
          consumption is the projection.
        </p>
        <p className="mt-1 text-xs text-brick-ink/40">So long, and thanks for all the footnotes.</p>
      </div>
    </footer>
  )
}
