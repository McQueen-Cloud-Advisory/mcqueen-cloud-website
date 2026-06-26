export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          McQueen Cloud Advisory
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Practical cloud systems for organizations outgrowing manual work.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          We design analytics, workflow automation, and Google Cloud solutions
          that make operations easier to run and decisions easier to trust.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#work"
            className="rounded-md bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-400"
          >
            View Our Work
          </a>

          <a
            href="#contact"
            className="rounded-md border border-slate-600 px-6 py-3 font-semibold hover:border-slate-400"
          >
            Discuss a Project
          </a>
        </div>
      </section>
    </main>
  );
}