import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how McQueen Cloud Advisory combines enterprise analytics, workflow automation, and practical cloud architecture to solve operational problems.",
};

const experienceAreas = [
  {
    title: "Enterprise analytics",
    description:
      "Experience designing reporting, data models, and analytical workflows for complex operational environments.",
  },
  {
    title: "Financial and controlled processes",
    description:
      "A practical understanding of reporting accuracy, reconciliation, traceability, access, and the controls surrounding critical business information.",
  },
  {
    title: "Cloud architecture and automation",
    description:
      "Hands-on work with managed cloud services, event-driven workflows, data platforms, deployment pipelines, and AI-assisted processes.",
  },
  {
    title: "Delivery and adoption",
    description:
      "Solutions are designed with documentation, ownership, maintainability, and the people who must use them after implementation in mind.",
  },
];

const principles = [
  {
    title: "Start with the operating problem",
    description:
      "A tool is not a strategy. The work begins by understanding the decision, delay, control, or manual process affecting the business.",
  },
  {
    title: "Make architecture explainable",
    description:
      "Every major component should have a clear purpose tied to a requirement, risk, or expected business outcome.",
  },
  {
    title: "Prefer useful over impressive",
    description:
      "Managed services and straightforward designs are usually better than complex platforms that the organization cannot sustain.",
  },
  {
    title: "Preserve accountability",
    description:
      "Automation should reduce unnecessary work without hiding exceptions, controls, ownership, or important human decisions.",
  },
];

const credentials = [
  "Project Management Professional (PMP)",
  "Microsoft Certified: Azure Data Engineer Associate",
  "Microsoft Certified: Azure Enterprise Data Analyst Associate",
  "Microsoft Certified: Power BI Data Analyst Associate",
  "Professional experience across analytics, financial reporting, cloud data platforms, and workflow automation",
];

export default function AboutPage() {
  return (
    <>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Technical depth without losing the business context.
            </h1>

            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-slate-300">
              <p>
                McQueen Cloud Advisory was created to help organizations solve
                operational problems that sit between business processes,
                analytics, automation, and cloud technology.
              </p>

              <p>
                Those problems are often difficult not because the technology
                is unavailable, but because requirements are unclear, data is
                fragmented, ownership is divided, and the existing process has
                grown through years of workarounds.
              </p>

              <p>
                The firm&apos;s role is to translate those conditions into a
                practical design: one that improves the work, can be explained
                to stakeholders, and can be supported after implementation.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Founder
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white">
              Scott McQueen
            </h2>

            <p className="mt-2 text-slate-400">
              Founder, McQueen Cloud Advisory
            </p>

            <p className="mt-6 leading-7 text-slate-300">
              Scott is an enterprise data and analytics professional with
              experience spanning operational analytics, financial reporting,
              data engineering, cloud platforms, process improvement, and
              technical delivery.
            </p>

            <p className="mt-5 leading-7 text-slate-300">
              His work focuses on translating business needs into systems that
              are measurable, maintainable, and useful in real operating
              environments.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-md bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
            >
              Discuss a project
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Experience
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Work shaped by enterprise operating realities.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Good technical design must account for more than whether the code
              runs. It must also account for reporting expectations, controls,
              ownership, deployment, support, and adoption.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {experienceAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-7"
              >
                <h3 className="text-xl font-semibold text-white">
                  {area.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Working principles
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                The approach matters as much as the technology.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                These principles guide how problems are evaluated and how
                solutions are designed.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
                >
                  <p className="text-sm font-semibold text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {principle.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Selected qualifications
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              Formal knowledge backed by applied work.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Certifications support the work, but they are not a substitute
              for architecture decisions, implementation experience, or
              measurable results.
            </p>
          </div>

          <ul className="space-y-4">
            {credentials.map((credential) => (
              <li
                key={credential}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5 leading-7 text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 font-semibold text-blue-400"
                >
                  ✓
                </span>

                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Where the firm adds value
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Problems that cross organizational boundaries.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              The strongest fit is work involving a mixture of business
              process, reporting, data, cloud architecture, automation, and
              stakeholder alignment.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What clients should expect
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Clear reasoning and honest tradeoffs.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Recommendations should explain what is being proposed, why it is
              appropriate, what it will require, and where its limitations
              remain.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-blue-400/10 px-8 py-14 text-center sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Have a difficult process or reporting problem?
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start by clarifying the problem before committing to a solution.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            An initial discussion can identify the affected process,
            constraints, likely options, and whether a technical engagement
            makes sense.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
            >
              Discuss your project
            </Link>

            <Link
              href="/work"
              className="rounded-md border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400"
            >
              View selected work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}