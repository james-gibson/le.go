import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ReactNode } from 'react'

const components = {
  a(props: { href?: string; children?: ReactNode }) {
    const href = props.href ?? ''
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'external noopener noreferrer' : undefined}
        className="text-lego-red-700 underline decoration-2 underline-offset-2 hover:text-lego-red-900"
      >
        {props.children}
      </a>
    )
  },
  blockquote(props: { children?: ReactNode }) {
    return (
      <div className="my-5 rounded-lg border-2 border-lego-blue-300 bg-lego-blue-50 p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="flex gap-1">
            <i className="h-2 w-2 rounded-full bg-lego-blue-400" />
            <i className="h-2 w-2 rounded-full bg-lego-blue-400" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-lego-blue-700">brick note</span>
        </div>
        <blockquote className="m-0 text-lego-ink">{props.children}</blockquote>
      </div>
    )
  },
  h2(props: { children?: ReactNode }) {
    return <h2 className="mt-10 mb-3 border-b-2 border-lego-ink/10 pb-2 text-2xl font-black text-lego-ink">{props.children}</h2>
  },
  h3(props: { children?: ReactNode }) {
    return <h3 className="mt-7 mb-2 text-lg font-bold text-lego-ink">{props.children}</h3>
  },
  table(props: { children?: ReactNode }) {
    return (
      <div className="my-5 overflow-x-auto rounded-lg border-2 border-lego-yellow-300">
        <table className="w-full border-collapse text-sm">{props.children}</table>
      </div>
    )
  },
  th(props: { children?: ReactNode }) {
    return <th className="border-b-2 border-lego-yellow-300 bg-lego-yellow-100 px-3 py-2 text-left font-bold">{props.children}</th>
  },
  td(props: { children?: ReactNode }) {
    return <td className="border-b border-lego-ink/10 px-3 py-2 align-top">{props.children}</td>
  },
  code(props: { children?: ReactNode; className?: string }) {
    return <code className="rounded bg-lego-ink/8 px-1.5 py-0.5 font-mono text-[0.9em] text-lego-red-800">{props.children}</code>
  },
  pre(props: { children?: ReactNode }) {
    return <pre className="my-5 overflow-x-auto rounded-lg bg-lego-ink p-4 text-sm text-lego-white">{props.children}</pre>
  },
}

export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>
}
