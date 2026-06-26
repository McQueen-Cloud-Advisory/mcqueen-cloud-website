import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Cloud Analytics and Workflow Automation",
  description:
    "McQueen Cloud Advisory designs analytics, workflow automation, and Google Cloud solutions for organizations outgrowing spreadsheets, disconnected tools, and manual processes.",
};

const capabilities = [
  {
    title: "Analytics and BI modernization",
    description:
      "Replace fragile reporting processes with governed data, repeatable metrics, and decision-ready reporting.",
  },
  {
    title: "Workflow automation",
    description:
      "Connect forms, documents, systems, approvals, and research into reliable operational workflows.",
  },
  {
    title: "Google Cloud architecture",
    description:
      "Design practical solutions using managed cloud services without adding infrastructure that the business does not need.",
  },
];

const approach = [
  {
    number: "01",
    title: "Understand the operating problem",
    description:
      "Start with the decisions, delays, controls, and manual work affecting the business—not with a predetermined technology.",
  },
  {
    number: "02",
    title: "Design the smallest credible solution",
    description:
      "Select architecture that meets the real requirement while remaining secure, maintainable, and proportionate.",
  },
  {
    number: "03",
    title: "Build for adoption and accountability",
    description:
      "Deliver documentation, automation, and measurable outcomes so the solution can be trusted after implementation.",
  },
];

export default function Home() {
  const featuredProject = projects.find((project) => project.featured);

  return (
    <>
      <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-blue-500/10 to-transparent"
        />

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              McQueen Cloud Advisory
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Turn fragmented data and manual work into systems your business
              can trust.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              We design analytics, workflow automation, and Google Cloud
              solutions for organizations that have outgrown spreadsheets,
              disconnected tools, and undocumented processes.
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
                className="rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900"
              >
                Discuss a project
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-blue-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What the work should deliver
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="font-semibold text-white">
                  Clear architecture
                </h2>
                <p className="mt-2 leading-7 text-slate-400">
                  Technology choices tied directly to operational requirements,
                  constraints, and business value.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-8">
                <h2 className="font-semibold text-white">
                  Reliable automation
                </h2>
                <p className="mt-2 leading-7 text-slate-400">
                  Repeatable processes that reduce manual effort without hiding
                  critical decisions or controls.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-8">
                <h2 className="font-semibold text-white">
                  Maintainable delivery
                </h2>
                <p className="mt-2 leading-7 text-slate-400">
                  Version-controlled, documented solutions designed to remain
                  understandable after implementation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Capabilities
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technology applied to operational problems.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              The objective is not to add more tools. It is to make information
              more dependable, work more repeatable, and decisions easier to
              support.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-7"
              >
                <h3 className="text-xl font-semibold text-white">
                  {capability.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/services"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Explore services →
            </Link>
          </div>
        </div>
      </section>

      {featuredProject && (
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Featured case study
                </p>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {featuredProject.title}
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  {featuredProject.summary}
                </p>

                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Business outcome
                  </p>

                  <p className="mt-3 leading-7 text-slate-200">
                    {featuredProject.outcome}
                  </p>
                </div>

                <Link
                  href={`/work/${featuredProject.slug}`}
                  className="mt-10 inline-flex rounded-md bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
                >
                  Read the case study
                </Link>
              </div>

              <div className="border-t border-slate-800 bg-slate-950 p-8 sm:p-12 lg:border-l lg:border-t-0">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Architecture
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Structured client intake",
                    "Event-driven orchestration",
                    "Managed Cloud Run processing",
                    "Vertex AI-assisted research",
                    "Google Workspace document generation",
                    "GitHub Actions deployment",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-xl border border-slate-800 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-semibold text-blue-300">
                        {index + 1}
                      </span>

                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {featuredProject.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-300"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Approach
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start with the business. Add technology deliberately.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {approach.map((step) => (
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
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-blue-400/10 px-8 py-14 text-center sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Have a process that no longer scales?
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s identify what should be simplified, automated, or
            rebuilt.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Start with the operational problem. The right architecture follows
            from the requirements—not the other way around.
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