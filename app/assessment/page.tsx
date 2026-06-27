import type { Metadata } from "next";

import Assessment from "../../components/assessment/Assessment";

export const metadata: Metadata = {
  title: "Operational Modernization Readiness Assessment",
  description:
    "Evaluate your organization’s readiness across data, automation, cloud architecture, governance, AI, and technical support, then receive a prioritized modernization roadmap.",
};

const resultHighlights = [
  "Your strongest operational and technical capabilities",
  "The primary constraint limiting modernization",
  "The best next opportunity based on prerequisite readiness",
  "A practical 90-day action plan",
  "Investments that are not yet an immediate priority",
  "A recommended internal and external support model",
];

export default function AssessmentPage() {
  return (
    <>
      <section className="px-6 pb-14 pt-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Operational Modernization Readiness Assessment
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Identify what your organization should improve next.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Evaluate six connected capability areas and receive an
            explainable modernization profile based on your organization’s
            strengths, constraints, dependencies, and support model.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Assessment />
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What you will receive
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              A decision-oriented result, not just a maturity score.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              The assessment interprets the shape of your organization rather
              than flattening every answer into one average. Strong technical
              capabilities, weak prerequisites, and critical operating gaps
              all change the recommended next step.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {resultHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-5 leading-7 text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 font-semibold text-blue-400"
                >
                  ✓
                </span>

                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Important context
          </p>

          <h2 className="mt-4 text-2xl font-semibold text-white">
            Directional guidance, not a formal audit.
          </h2>

          <p className="mt-5 leading-7 text-slate-300">
            Results are based on self-reported answers and are intended to
            support prioritization and discussion. They do not replace a
            security assessment, architecture review, compliance audit, or
            detailed implementation plan.
          </p>
        </div>
      </section>
    </>
  );
}
