import { Link, NavLink } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'Manual', end: true },
  { to: '/docs', label: 'Docs' },
  { to: '/seeds', label: 'Seeds' },
  { to: '/isotopes', label: 'Isotopes' },
  { to: '/philosophy', label: 'Philosophy' },
  { to: '/projector', label: 'Projector' },
  { to: '/draft', label: 'Draft' },
  { to: '/design', label: 'Design' },
]

export function SiteHeader() {
  return (
    <header className="border-b-4 border-brick-red-500 bg-brick-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="brick-shadow flex h-9 w-9 items-center justify-center rounded-lg bg-brick-yellow-400 text-sm font-black text-brick-ink">
            L
          </span>
          <span className="text-lg font-black tracking-tight text-brick-ink">
            le.go
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `rounded-md px-2 py-1 font-semibold transition-colors ${
                  isActive ? 'bg-brick-red-500 text-brick-white' : 'text-brick-ink/70 hover:bg-brick-cream hover:text-brick-ink'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
