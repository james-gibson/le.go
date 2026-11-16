import type { ReactNode } from 'react'

type BrickColor = 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'ink'

const BODY: Record<BrickColor, string> = {
  red: 'bg-brick-red-500 text-brick-white',
  yellow: 'bg-brick-yellow-400 text-brick-ink',
  blue: 'bg-brick-blue-500 text-brick-white',
  green: 'bg-brick-green-500 text-brick-white',
  white: 'bg-brick-white text-brick-ink border-2 border-brick-ink/15',
  ink: 'bg-brick-ink text-brick-white',
}

const STUD: Record<BrickColor, string> = {
  red: 'bg-brick-red-400 border-brick-red-700',
  yellow: 'bg-brick-yellow-300 border-brick-yellow-600',
  blue: 'bg-brick-blue-400 border-brick-blue-700',
  green: 'bg-brick-green-400 border-brick-green-700',
  white: 'bg-brick-white border-brick-ink/25',
  ink: 'bg-brick-ink border-brick-white/30',
}

export function Brick({
  color = 'yellow',
  studs = 2,
  label,
  children,
  className = '',
}: {
  color?: BrickColor
  studs?: number
  label?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className={`brick-shadow rounded-xl px-4 pb-4 pt-5 ${BODY[color]}`}>
        {label && (
          <div className="mb-1 text-xs font-black uppercase tracking-wider opacity-80">{label}</div>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
      <div className="absolute left-4 top-1 flex gap-2">
        {Array.from({ length: studs }).map((_, i) => (
          <span key={i} className={`h-3.5 w-3.5 rounded-full border ${STUD[color]}`} />
        ))}
      </div>
    </div>
  )
}
