export interface ContentMeta {
  title: string
  description?: string
  order: number
  updated?: string
  tags?: string[]
}

export interface ContentDoc {
  slug: string
  section: string
  meta: ContentMeta
  body: string
}

export interface Section {
  id: string
  label: string
  description: string
  docs: ContentDoc[]
}

const SECTION_LABELS: Record<string, { label: string; description: string }> = {
  docs: { label: 'Docs — the five stages', description: 'The progression of citation precision, stage by stage.' },
  seeds: { label: 'Seeds — reader doors', description: 'One entrance per background. Pick your door.' },
  isotopes: { label: 'Isotopes', description: 'The 42i isotope model and the quarter-turn.' },
}

const files = import.meta.glob<string>('../content/**/*.md', { query: '?raw', import: 'default', eager: true })

function parse(src: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src)
  if (!match) return { meta: {}, body: src }
  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([\w-]+):\s*(.*)$/.exec(line)
    if (m) meta[m[1]] = m[2].trim()
  }
  return { meta, body: match[2].trim() }
}

function buildDocs(): ContentDoc[] {
  const out: ContentDoc[] = []
  for (const [path, src] of Object.entries(files)) {
    const m = /\/content\/([\w-]+)\/([\w-]+)\.md$/.exec(path)
    if (!m) continue
    const [, section, slug] = m
    const { meta, body } = parse(src)
    const tags = (meta.tags ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    out.push({
      slug,
      section,
      body,
      meta: {
        title: meta.title ?? slug,
        description: meta.description,
        order: Number(meta.order ?? 0),
        updated: meta.updated,
        tags,
      },
    })
  }
  return out.sort((a, b) => a.meta.order - b.meta.order)
}

const allDocs = buildDocs()

export function sections(): Section[] {
  const bySection = new Map<string, ContentDoc[]>()
  for (const d of allDocs) {
    const list = bySection.get(d.section) ?? []
    list.push(d)
    bySection.set(d.section, list)
  }
  return Object.entries(SECTION_LABELS)
    .map(([id, info]) => ({ id, ...info, docs: bySection.get(id) ?? [] }))
    .filter((s) => s.docs.length > 0)
}

export function docBySlug(section: string, slug: string): ContentDoc | undefined {
  return allDocs.find((d) => d.section === section && d.slug === slug)
}

export function neighbours(section: string, slug: string): { prev?: ContentDoc; next?: ContentDoc } {
  const list = (sections().find((s) => s.id === section)?.docs ?? []).filter((d) => d.meta)
  const i = list.findIndex((d) => d.slug === slug)
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined }
}

export function allRoutes(): { path: string; title: string }[] {
  const routes: { path: string; title: string }[] = []
  for (const s of sections()) {
    for (const d of s.docs) {
      routes.push({ path: `/${s.id}/${d.slug}`, title: d.meta.title })
    }
  }
  return routes
}
