export interface Part {
  name: string
  count?: string
  color?: 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'ink'
}

const DOT: Record<NonNullable<Part['color']>, string> = {
  red: 'bg-brick-red-500',
  yellow: 'bg-brick-yellow-400',
  blue: 'bg-brick-blue-500',
  green: 'bg-brick-green-500',
  white: 'bg-brick-white border border-brick-ink/20',
  ink: 'bg-brick-ink',
}

export function PartsList({ title = 'You will need', parts }: { title?: string; parts: Part[] }) {
  return (
    <div className="rounded-xl border-2 border-brick-ink/10 bg-brick-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-brick-ink/60">{title}</span>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {parts.map((p) => (
          <li key={p.name} className="flex items-center gap-2 text-sm">
            <span className={`h-3.5 w-3.5 shrink-0 rounded-sm ${DOT[p.color ?? 'yellow']}`} />
            <span className="flex-1">{p.name}</span>
            {p.count && <span className="font-mono text-xs text-brick-ink/60">×{p.count}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
