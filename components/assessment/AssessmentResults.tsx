import Link from "next/link";

import type { AssessmentAnalysis } from "../../lib/assessment/analyze-assessment";
import type { RoadmapPhase } from "../../data/recommendations";

interface AssessmentResultsProps {
  analysis: AssessmentAnalysis;
  onRestart: () => void;
}

const roadmapPhaseLabels: Record<
  RoadmapPhase,
  { title: string; subtitle: string }
> = {
  "days-1-30": {
    title: "Days 1–30",
    subtitle: "Establish the foundation",
  },
  "days-31-60": {
    title: "Days 31–60",
    subtitle: "Deliver a bounded improvement",
  },
  "days-61-90": {
    title: "Days 61–90",
    subtitle: "Validate and decide",
  },
};

const roadmapPhases: readonly RoadmapPhase[] = [
  "days-1-30",
  "days-31-60",
  "days-61-90",
];

export default function AssessmentResults({
  analysis,
  onRestart,
}: AssessmentResultsProps) {
  if (
    !analysis.isComplete ||
    analysis.priorities === null ||
    analysis.roadmap === null ||
    analysis.modernizationStage === null
  ) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Assessment incomplete
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
          Complete every question to generate recommendations.
        </h2>

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 inline-flex items-center justify-center rounded-md border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Restart assessment
        </button>
      </section>
    );
  }

  const { primaryConstraint, bestOpportunity } = analysis.priorities;
  const { roadmap } = analysis;

  return (
    <section aria-live="polite" className="space-y-8">
      <div className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
          Your modernization profile
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
          {analysis.modernizationStage}
          {analysis.stageModifier ? ` — ${analysis.stageModifier}` : ""}
        </h2>

        {analysis.organizationalProfile ? (
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {analysis.organizationalProfile}
          </p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-blue-300/20 bg-slate-950/50 p-5">
            <p className="text-sm text-slate-400">Overall maturity</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {analysis.overallMaturityLevel ?? "Not available"}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-300/20 bg-slate-950/50 p-5">
            <p className="text-sm text-slate-400">Average score</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {analysis.overallAverage?.toFixed(2) ?? "—"} / 4.00
            </p>
          </div>

          <div className="rounded-2xl border border-blue-300/20 bg-slate-950/50 p-5">
            <p className="text-sm text-slate-400">Critical gaps</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {analysis.gapEvaluation.criticalFlags.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Primary constraint
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">
            {primaryConstraint?.domain.name ?? "No dominant constraint"}
          </h3>

          <p className="mt-5 leading-7 text-slate-300">
            {primaryConstraint?.explanation ??
              "The assessment did not identify one capability as a dominant constraint."}
          </p>

          {primaryConstraint &&
          primaryConstraint.criticalCapabilities.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <p className="font-semibold text-amber-200">
                Critical capabilities requiring attention
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {primaryConstraint.criticalCapabilities.map((capability) => (
                  <li key={capability}>
                    {capability
                      .split("-")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Best next opportunity
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">
            {bestOpportunity?.opportunity.name ??
              "Strengthen the foundation first"}
          </h3>

          <p className="mt-5 leading-7 text-slate-300">
            {bestOpportunity?.explanation ??
              "No opportunity is currently strong enough to recommend ahead of foundational improvement."}
          </p>

          {bestOpportunity ? (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <dt className="text-sm text-slate-400">Opportunity status</dt>
                <dd className="mt-2 font-semibold capitalize text-white">
                  {bestOpportunity.opportunity.status}
                </dd>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <dt className="text-sm text-slate-400">
                  Supporting readiness
                </dt>
                <dd className="mt-2 font-semibold text-white">
                  {bestOpportunity.opportunity.prerequisiteAverage?.toFixed(
                    2,
                  ) ?? "—"}{" "}
                  / 4.00
                </dd>
              </div>
            </dl>
          ) : null}
        </article>
      </div>

      {analysis.gapEvaluation.strengths.length > 0 ? (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Strengths to leverage
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {analysis.gapEvaluation.strengths.map((strength) => (
              <article
                key={strength.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <h3 className="font-semibold text-white">{strength.name}</h3>

                <p className="mt-2 text-sm text-slate-400">
                  {strength.average?.toFixed(2)} / 4.00 ·{" "}
                  {strength.maturityLevel}
                </p>

                <p className="mt-4 leading-7 text-slate-300">
                  {strength.purpose}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Recommended 90-day roadmap
        </p>

        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
          Begin with a bounded, measurable sequence.
        </h3>

        <div className="mt-8 space-y-8">
          {roadmapPhases.map((phase) => {
            const phaseActions = roadmap.actions.filter(
              (action) => action.phase === phase,
            );

            if (phaseActions.length === 0) {
              return null;
            }

            return (
              <div key={phase}>
                <div>
                  <p className="font-semibold text-blue-400">
                    {roadmapPhaseLabels[phase].title}
                  </p>
                  <h4 className="mt-1 text-xl font-semibold text-white">
                    {roadmapPhaseLabels[phase].subtitle}
                  </h4>
                </div>

                <div className="mt-4 grid gap-4">
                  {phaseActions.map((action) => (
                    <article
                      key={action.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
                    >
                      <h5 className="font-semibold text-white">
                        {action.title}
                      </h5>

                      <p className="mt-3 leading-7 text-slate-300">
                        {action.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Not an immediate priority
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">
            Investments to defer for now
          </h3>

          {roadmap.deferredInvestments.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {roadmap.deferredInvestments.map((investment) => (
                <li
                  key={investment}
                  className="flex gap-3 leading-7 text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500"
                  />
                  <span>{investment}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 leading-7 text-slate-300">
              No major investment category was flagged for deferral.
            </p>
          )}
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Recommended support model
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">
            {roadmap.deliveryModel?.model.name ??
              "Support model unavailable"}
          </h3>

          <p className="mt-5 leading-7 text-slate-300">
            {roadmap.deliveryModel?.model.summary ??
              "Complete the technical capability domain to generate a support-model recommendation."}
          </p>

          {roadmap.deliveryModel ? (
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
              {[
                ...roadmap.deliveryModel.model.recommendations,
                ...roadmap.deliveryModel.additionalGuidance,
              ].map((recommendation) => (
                <li key={recommendation} className="flex gap-3">
                  <span aria-hidden="true" className="text-blue-400">
                    ✓
                  </span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Six-domain breakdown
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {analysis.domainScores.map((domain) => (
            <article
              key={domain.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white">{domain.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {domain.maturityLevel ?? "Incomplete"}
                  </p>
                </div>

                <p className="text-xl font-semibold text-white">
                  {domain.average?.toFixed(2) ?? "—"}
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${((domain.average ?? 0) / 4) * 100}%`,
                  }}
                />
              </div>

              {domain.criticalFlags.length > 0 ? (
                <p className="mt-4 text-sm leading-6 text-amber-200">
                  {domain.criticalFlags.length} critical capability gap
                  {domain.criticalFlags.length === 1 ? "" : "s"} identified.
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
          Validate the roadmap
        </p>

        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
          Turn the assessment into a realistic first initiative.
        </h3>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
          Review the priorities, dependencies, and support model with McQueen
          Cloud Advisory before committing to a platform, vendor, or large
          transformation program.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Review your roadmap
          </Link>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center rounded-md border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Restart assessment
          </button>
        </div>
      </section>

      <p className="text-center text-sm leading-6 text-slate-500">
        These results are directional and based on self-reported answers. They
        are not a formal audit, security assessment, or implementation plan.
      </p>
    </section>
  );
}
