import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/data/insights";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Architecture decisions, cloud implementation notes, analytics guidance, and workflow automation lessons from McQueen Cloud Advisory.",
};

const topics = [
  "Cloud architecture",
  "Analytics modernization",
  "Workflow automation",
  "AI-enabled knowledge work",
  "Technical delivery",
];

export default function InsightsPage() {
  const featuredInsight = insights.find((insight) => insight.featured);

  return (
    <>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Insights
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Architecture decisions and implementation lessons explained
            clearly.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Practical notes on designing cloud systems, modernizing analytics,
            automating workflows, and evaluating where emerging technology
            creates real operational value.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {featuredInsight && (
        <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <article className="grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-8 sm:p-12">
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                    Featured insight
                  </span>

                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                    {featuredInsight.category}
                  </span>
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {featuredInsight.title}
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                  {featuredInsight.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span>{featuredInsight.published}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featuredInsight.readTime}</span>
                </div>

                <Link
                  href={`/insights/${featuredInsight.slug}`}
                  className="mt-10 inline-flex rounded-md bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
                >
                  Read the article
                </Link>
              </div>

              <div className="border-t border-slate-800 bg-slate-900/50 p-8 sm:p-12 lg:border-l lg:border-t-0">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Decision framework
                </p>

                <div className="mt-8 space-y-5">
                  {[
                    "Define the operating requirements",
                    "Compare viable platform options",
                    "Select the smallest credible architecture",
                    "Document tradeoffs and limitations",
                    "Define when the decision should be revisited",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-xl border border-slate-800 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-semibold text-blue-300">
                        {index + 1}
                      </span>

                      <span className="pt-1 text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Latest
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Technical notes and practical guidance.
              </h2>
            </div>

            <p className="max-w-xl leading-7 text-slate-400">
              Additional architecture walkthroughs, project lessons, and
              demonstration videos will be added as they are completed.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {insights.map((insight) => (
              <article
                key={insight.slug}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
              >
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                    {insight.category}
                  </span>

                  <span className="px-1 py-1 text-xs text-slate-500">
                    {insight.published}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {insight.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  {insight.summary}
                </p>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    {insight.readTime}
                  </span>

                  <Link
                    href={`/insights/${insight.slug}`}
                    className="font-semibold text-blue-400 transition hover:text-blue-300"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-blue-400/10 px-8 py-14 text-center sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Need more than general guidance?
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Apply the same reasoning to your organization&apos;s problem.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Architecture choices should reflect your requirements, constraints,
            operating model, and ability to support the resulting system.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            Discuss a project
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Extended technical resource
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Go deeper into cloud engineering concepts and implementation
                patterns.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                The cloud engineering knowledge base provides structured
                explanations of cloud platforms, architecture patterns,
                security, networking, containers, serverless services, and
                hands-on implementation work.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
              <p className="leading-7 text-slate-400">
                Use it as a deeper technical companion to the shorter
                architecture decisions and implementation lessons published
                here.
              </p>

              <EngineeringKnowledgeBaseLink className="mt-7" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}