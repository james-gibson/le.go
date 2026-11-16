import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const src = join(root, 'src')

const errors = []
const fail = (m) => errors.push(m)

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (st.isFile()) out.push(p)
  }
  return out
}

function read(p) {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

// 1. Build output present.
if (!existsSync(join(dist, 'index.html'))) fail('dist/index.html missing')

// 2. Base path + homepage agree.
const vite = read(join(root, 'vite.config.ts'))
const pkg = JSON.parse(read(join(root, 'package.json')))
if (!vite.includes("'/le.go/'")) fail('vite.config.ts base path is not /le.go/')
if (pkg.homepage !== 'https://james-gibson.github.io/le.go/') fail('package.json homepage mismatch')

// 3. Key artifacts present.
for (const p of [
  'index.html',
  '404.html',
  'llms.txt',
  'rotations.json',
  'rules.md',
  'philosophy/index.html',
  'projector/index.html',
  'draft/index.html',
  'design/index.html',
  'bare/index.html',
  'nojs/index.html',
  'deck.html',
  'data/open-arms.universe.json',
  'data/open-arms.lyrics.json',
  'data/sikmadman.candidates.json',
  'data/draft-marvin-uri-multiverse-00.txt',
]) {
  if (!existsSync(join(dist, p))) fail(`missing dist/${p}`)
}

// 4. Placeholders and local paths.
const files = [...walk(src), ...walk(dist)]
for (const f of files) {
  const text = read(f)
  if (/TODO|TBD|lorem ipsum/i.test(text)) fail(`placeholder found in ${f.replace(root + '/', '')}`)
  if (/\/Users\/|\/home\//.test(text)) fail(`local path found in ${f.replace(root + '/', '')}`)
}

// 5. No tracking parameters in emitted links. Scan the static artifacts (HTML,
//    JSON, text) where links actually ship — not the JS bundle, whose string
//    literals legitimately *demonstrate* the si=/utm_ tokens for teaching.
for (const f of walk(dist)) {
  if (!/\.(html|json|txt|md)$/.test(f)) continue
  const text = read(f)
  if (/[?&](si|utm_\w+|ltsid|fbclid)=/.test(text)) fail(`tracking param in ${f.replace(root + '/', '')}`)
}

// 6. Denylist (structural — no raw campaign slug, no third-party health fields).
for (const f of files) {
  const text = read(f)
  if (/gofundme\.com\/f\//i.test(text) || /gofund\.me\/f\//i.test(text)) {
    fail(`campaign slug leaked in ${f.replace(root + '/', '')}`)
  }
}

const candidatesPath = join(dist, 'data', 'sikmadman.candidates.json')
if (existsSync(candidatesPath)) {
  const data = JSON.parse(read(candidatesPath))
  for (const c of data.candidates ?? []) {
    if (c.kind === 'fundraiser' && c.url) fail('fundraiser candidate must store url: null (pointer withheld)')
  }
  const forbidden = ['subjectName', 'condition', 'diagnosis', 'prognosis', 'amount', 'patientName', 'campaignFigure']
  const dump = JSON.stringify(data)
  for (const k of forbidden) {
    if (new RegExp(`"${k}"`).test(dump)) fail(`forbidden field "${k}" present in candidates data`)
  }
}

if (errors.length > 0) {
  console.error('publish guard FAILED:')
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}

console.log('publish guard: pass')
