import { watchUrl } from '../lib/open-arms'

export function Attribution({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-brick-ink/70">
        Source work <em>“Open Arms”</em> — <strong>SikMadMan</strong> (Madhouse Mixtapes), used under the artist’s
        spoken grant at <a className="underline" href={watchUrl(182)} target="_blank" rel="external noopener noreferrer">3:02</a>. See NOTICE.
      </p>
    )
  }
  return (
    <div className="rounded-xl border-2 border-brick-blue-200 bg-brick-blue-50 p-4">
      <div className="mb-2 text-xs font-black uppercase tracking-wider text-brick-blue-700">Attribution &amp; grant</div>
      <div className="grid gap-2 text-sm">
        <div>
          <strong>Work:</strong> <em>Open Arms | Haunted Polka Country Juggalo Trap Anthem</em> — SikMadMan (Madhouse Mixtapes)
        </div>
        <div>
          <strong>Canonical:</strong> <a className="underline" href="https://www.youtube.com/watch?v=ms0UbxUV9X8" target="_blank" rel="external noopener noreferrer">youtube.com/watch?v=ms0UbxUV9X8</a>{' '}
          · <strong>Inverse:</strong> <a className="underline" href="https://music.youtube.com/watch?v=ms0UbxUV9X8" target="_blank" rel="external noopener noreferrer">music.youtube.com</a>
        </div>
        <blockquote className="border-l-2 border-brick-blue-300 pl-3 text-brick-ink/80">
          “You can use the music how you want… Sample this and remix that. Cut it up and bring it back. Credit would be
          nice if you do. If it blows, throw something back.” — <a className="underline" href={watchUrl(182)} target="_blank" rel="external noopener noreferrer">3:02–3:22</a>
        </blockquote>
      </div>
    </div>
  )
}
