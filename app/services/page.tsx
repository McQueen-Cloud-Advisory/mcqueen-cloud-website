import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Analytics modernization, workflow automation, Google Cloud architecture, and AI-enabled knowledge workflows designed around real operational needs.",
};

const engagementSteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Clarify the operating problem, affected users, constraints, risks, and decisions the solution must support.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Define the smallest credible architecture and document why each major component is needed.",
  },
  {
    number: "03",
    title: "Demonstrate",
    description:
      "Build a prototype, pilot, or working implementation that proves the design against real requirements.",
  },
  {
    number: "04",
    title: "Operationalize",
    description:
      "Add documentation, deployment practices, controls, and ownership needed to sustain the solution.",
  },
];

const boundaries = [
  "Technology selected before the business problem is understood",
  "Large custom platforms when a managed service can meet the need",
  "AI output presented as reliable without source grounding or review",
  "Dashboards built without agreed metric definitions",
  "Automation that removes visibility into controls or exceptions",
];

export default function ServicesPage() {
  return (
    <>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Services
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Practical technology services built around operational outcomes.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Engagements begin with the process, decision, or reporting problem.
            Technology is selected only after the actual requirements and
            constraints are understood.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/work"
              className="rounded-md bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
            >
              View selected work
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

      <nav
        aria-label="Service navigation"
        className="border-y border-slate-800 bg-slate-900/40 px-6 py-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400 hover:text-white"
            >
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10"
            >
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-lg leading-8 text-slate-300">
                    {service.summary}
                  </p>

                  <div className="mt-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Intended result
                    </p>

                    <p className="mt-3 leading-7 text-slate-200">
                      {service.result}
                    </p>
                  </div>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {service.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Problems this addresses
                    </h3>

                    <ul className="mt-5 space-y-4">
                      {service.problems.map((problem) => (
                        <li
                          key={problem}
                          className="flex gap-3 leading-7 text-slate-400"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                          />
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Possible deliverables
                    </h3>

                    <ul className="mt-5 space-y-4">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex gap-3 leading-7 text-slate-400"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                          />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Engagement approach
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Move from uncertainty to a working, supportable solution.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              The exact scope depends on the problem. Not every engagement
              requires a full implementation.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((step) => (
              <article key={step.number}>
                <p className="text-sm font-semibold text-blue-400">
                  {step.number}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Deliberate boundaries
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              What the work should avoid.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Credible consulting includes knowing when complexity, automation,
              or a particular technology is not justified.
            </p>
          </div>

          <ul className="space-y-4">
            {boundaries.map((boundary) => (
              <li
                key={boundary}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 leading-7 text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="font-semibold text-blue-400"
                >
                  —
                </span>
                <span>{boundary}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-blue-400/10 px-8 py-14 text-center sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Start with the operating problem
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Determine what should be fixed before deciding what should be
            built.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A focused initial discussion can clarify the problem, likely scope,
            and whether a technical engagement is justified.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            Discuss your project
          </Link>
        </div>
      </section>
    </>
  );
}