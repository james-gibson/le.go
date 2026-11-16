export function StepNumber({ n, color = 'red' }: { n: number; color?: 'red' | 'yellow' | 'blue' | 'green' }) {
  const c = {
    red: 'bg-brick-red-500 text-brick-white',
    yellow: 'bg-brick-yellow-400 text-brick-ink',
    blue: 'bg-brick-blue-500 text-brick-white',
    green: 'bg-brick-green-500 text-brick-white',
  }[color]
  return (
    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${c} text-lg font-black shadow`}>
      {n}
    </span>
  )
}
