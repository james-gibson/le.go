import type { ReactNode } from 'react'

type BrickColor = 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'ink'

const BODY: Record<BrickColor, string> = {
  red: 'bg-lego-red-500 text-lego-white',
  yellow: 'bg-lego-yellow-400 text-lego-ink',
  blue: 'bg-lego-blue-500 text-lego-white',
  green: 'bg-lego-green-500 text-lego-white',
  white: 'bg-lego-white text-lego-ink border-2 border-lego-ink/15',
  ink: 'bg-lego-ink text-lego-white',
}

const STUD: Record<BrickColor, string> = {
  red: 'bg-lego-red-400 border-lego-red-700',
  yellow: 'bg-lego-yellow-300 border-lego-yellow-600',
  blue: 'bg-lego-blue-400 border-lego-blue-700',
  green: 'bg-lego-green-400 border-lego-green-700',
  white: 'bg-lego-white border-lego-ink/25',
  ink: 'bg-lego-ink border-lego-white/30',
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
      <div className={`lego-shadow rounded-xl px-4 pb-4 pt-5 ${BODY[color]}`}>
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
