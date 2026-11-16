export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="mb-4 text-6xl font-black text-lego-red-500">404</div>
      <h1 className="text-2xl font-black text-lego-ink">This brick isn’t in the box.</h1>
      <p className="mt-2 text-lego-ink/60">The piece you’re looking for has no plane — which is not the same as zero.</p>
      <a href="/le.go/" className="mt-6 inline-block rounded-lg bg-lego-blue-500 px-4 py-2 font-bold text-lego-white">
        Back to the manual
      </a>
    </div>
  )
}
