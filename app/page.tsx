import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            McQueen Cloud Advisory
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Practical cloud systems for organizations outgrowing manual work.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            We design analytics, workflow automation, and Google Cloud
            solutions that make operations easier to run and decisions easier
            to trust.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/work"
              className="rounded-md bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
            >
              View our work
            </Link>

            <Link
              href="/contact"
              className="rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-400"
            >
              Discuss a project
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Modernize reporting
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              Replace fragile reports and manual consolidation with governed
              data and trusted metrics.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Automate workflows
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              Connect forms, documents, systems, and approvals into repeatable
              operational processes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Build practical cloud solutions
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              Use managed Google Cloud services without introducing
              unnecessary infrastructure.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}