import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Error 404
        </p>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          This page could not be found.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The address may be incorrect, the page may have moved, or the content
          may no longer be available.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-md bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
          >
            Return home
          </Link>

          <Link
            href="/work"
            className="rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900"
          >
            View selected work
          </Link>

          <Link
            href="/contact"
            className="rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}