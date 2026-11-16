export function StepNumber({ n, color = 'red' }: { n: number; color?: 'red' | 'yellow' | 'blue' | 'green' }) {
  const c = {
    red: 'bg-lego-red-500 text-lego-white',
    yellow: 'bg-lego-yellow-400 text-lego-ink',
    blue: 'bg-lego-blue-500 text-lego-white',
    green: 'bg-lego-green-500 text-lego-white',
  }[color]
  return (
    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${c} text-lg font-black shadow`}>
      {n}
    </span>
  )
}
