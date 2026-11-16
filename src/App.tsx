// Placeholder "coming soon" page until there's a game to show.
export default function App() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#0b0b0c] px-6 py-16 text-neutral-200">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
          In development
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-7xl">
          Coming soon<span className="text-red-600">.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-400">
          A browser game of ragdoll physics, gore and destruction. It's still being
          built, so there's nothing to play yet.
        </p>
      </div>
    </main>
  )
}
