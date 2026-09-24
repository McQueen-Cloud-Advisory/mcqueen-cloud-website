"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import type { AssessmentAnalysis } from "../../lib/assessment/analyze-assessment";
import type { RoadmapPhase } from "../../data/recommendations";

interface AssessmentResultsProps {
  analysis: AssessmentAnalysis;
  onRestart: () => void;
}

const roadmapPhaseLabels: Record<RoadmapPhase, { title: string; subtitle: string }> = {
  "days-1-30": { title: "Days 1–30", subtitle: "Establish the foundation" },
  "days-31-60": { title: "Days 31–60", subtitle: "Deliver a bounded improvement" },
  "days-61-90": { title: "Days 61–90", subtitle: "Validate and decide" },
};
const roadmapPhases: readonly RoadmapPhase[] = ["days-1-30", "days-31-60", "days-61-90"];

export default function AssessmentResults({ analysis, onRestart }: AssessmentResultsProps) {
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    resultHeadingRef.current?.focus();
  }, []);

  if (!analysis.isComplete || analysis.priorities === null || analysis.roadmap === null || analysis.modernizationStage === null) {
    return (
      <section className="assessment-incomplete">
        <p className="eyebrow">Assessment incomplete</p>
        <h1 ref={resultHeadingRef} tabIndex={-1}>Complete every question to generate recommendations.</h1>
        <button type="button" onClick={onRestart} className="button button-secondary">Restart assessment</button>
      </section>
    );
  }

  const { primaryConstraint, bestOpportunity } = analysis.priorities;
  const { roadmap } = analysis;

  return (
    <div className="assessment-report">
      <div className="assessment-report-topline">
        <p className="eyebrow">Readiness assessment / Your report</p>
        <p className="assessment-mono">{analysis.answeredCount} answers · {analysis.domainScores.length} capabilities</p>
      </div>

      <section className="assessment-summary" aria-labelledby="assessment-result-title">
        <div className="assessment-summary-copy">
          <p className="assessment-summary-label">Your modernization profile</p>
          <h1 ref={resultHeadingRef} id="assessment-result-title" tabIndex={-1}>
            {analysis.modernizationStage}
            {analysis.stageModifier ? <span className="assessment-stage-modifier">{analysis.stageModifier}</span> : null}
          </h1>
          {analysis.organizationalProfile ? <p className="assessment-profile-text">{analysis.organizationalProfile}</p> : null}
        </div>
        <dl className="assessment-summary-stats">
          <div><dt>Overall maturity</dt><dd>{analysis.overallMaturityLevel ?? "Not available"}</dd></div>
          <div><dt>Average score</dt><dd>{analysis.overallAverage?.toFixed(2) ?? "—"}<span> / 4.00</span></dd></div>
          <div><dt>Critical gaps</dt><dd>{analysis.gapEvaluation.criticalFlags.length}<span> identified</span></dd></div>
        </dl>
      </section>

      <div className="assessment-priorities">
        <article className="assessment-priority">
          <p className="eyebrow">01 / Primary constraint</p>
          <h2>{primaryConstraint?.domain.name ?? "No dominant constraint"}</h2>
          <p>{primaryConstraint?.explanation ?? "The assessment did not identify one capability as a dominant constraint."}</p>
          {primaryConstraint && primaryConstraint.criticalCapabilities.length > 0 ? (
            <div className="assessment-warning">
              <h3>Critical capabilities requiring attention</h3>
              <ul>
                {primaryConstraint.criticalCapabilities.map((capability) => (
                  <li key={capability}>{capability.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
        <article className="assessment-priority">
          <p className="eyebrow">02 / Best next opportunity</p>
          <h2>{bestOpportunity?.opportunity.name ?? "Strengthen the foundation first"}</h2>
          <p>{bestOpportunity?.explanation ?? "No opportunity is currently strong enough to recommend ahead of foundational improvement."}</p>
          {bestOpportunity ? (
            <dl className="assessment-opportunity-facts">
              <div><dt>Opportunity status</dt><dd className="capitalize">{bestOpportunity.opportunity.status}</dd></div>
              <div><dt>Supporting readiness</dt><dd>{bestOpportunity.opportunity.prerequisiteAverage?.toFixed(2) ?? "—"} / 4.00</dd></div>
            </dl>
          ) : null}
        </article>
      </div>

      <section className="assessment-report-section assessment-score-section" aria-labelledby="assessment-score-heading">
        <div className="assessment-section-heading">
          <p className="eyebrow">The capability picture</p>
          <h2 id="assessment-score-heading">Six-domain breakdown</h2>
          <p>Each score reflects your answers in one capability area. The priorities above also account for critical gaps and dependencies.</p>
          <div className="assessment-score-legend"><span>1 / Reactive</span><span>4 / Scalable</span></div>
        </div>
        <div className="assessment-score-rows">
          {analysis.domainScores.map((domain) => (
            <article key={domain.id} className="assessment-score-row">
              <div className="assessment-score-label">
                <div><h3>{domain.name}</h3><p>{domain.maturityLevel ?? "Incomplete"}</p></div>
                <p className="assessment-score-number">{domain.average?.toFixed(2) ?? "—"}<span> / 4</span></p>
              </div>
              <div className="assessment-score-track" aria-hidden="true">
                <div className="assessment-score-fill" style={{ width: `${((domain.average ?? 0) / 4) * 100}%` }} />
              </div>
              {domain.criticalFlags.length > 0 ? <p className="assessment-score-warning">{domain.criticalFlags.length} critical capability gap{domain.criticalFlags.length === 1 ? "" : "s"} identified.</p> : null}
            </article>
          ))}
        </div>
      </section>

      {analysis.gapEvaluation.strengths.length > 0 ? (
        <section className="assessment-strengths" aria-labelledby="assessment-strengths-heading">
          <p className="eyebrow">Established capabilities</p>
          <h2 id="assessment-strengths-heading">Strengths to build on</h2>
          <div className="assessment-strength-grid">
            {analysis.gapEvaluation.strengths.map((strength) => (
              <article key={strength.id}>
                <h3>{strength.name}</h3>
                <p className="assessment-strength-score assessment-mono">{strength.average?.toFixed(2)} / 4.00 · {strength.maturityLevel}</p>
                <p>{strength.purpose}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="assessment-roadmap" aria-labelledby="assessment-roadmap-heading">
        <div className="assessment-roadmap-heading">
          <p className="eyebrow">Recommended 90-day roadmap</p>
          <h2 id="assessment-roadmap-heading">Begin with a bounded,<br />measurable sequence.</h2>
        </div>
        <div className="assessment-roadmap-phases">
          {roadmapPhases.map((phase, phaseIndex) => {
            const phaseActions = roadmap.actions.filter((action) => action.phase === phase);
            if (phaseActions.length === 0) return null;
            return (
              <section key={phase} className="assessment-roadmap-phase" aria-labelledby={`phase-${phase}`}>
                <div className="assessment-phase-label">
                  <span className="assessment-phase-number assessment-mono" aria-hidden="true">0{phaseIndex + 1}</span>
                  <div><p className="assessment-mono">{roadmapPhaseLabels[phase].title}</p><h3 id={`phase-${phase}`}>{roadmapPhaseLabels[phase].subtitle}</h3></div>
                </div>
                <div className="assessment-phase-actions">
                  {phaseActions.map((action) => (
                    <article key={action.id}><h4>{action.title}</h4><p>{action.description}</p></article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <div className="assessment-report-guidance">
        <section aria-labelledby="assessment-defer-heading">
          <p className="eyebrow">Not an immediate priority</p>
          <h2 id="assessment-defer-heading">Investments to defer for now</h2>
          {roadmap.deferredInvestments.length > 0 ? (
            <ul className="assessment-guidance-list">{roadmap.deferredInvestments.map((investment) => <li key={investment}>{investment}</li>)}</ul>
          ) : <p>No major investment category was flagged for deferral.</p>}
        </section>
        <section aria-labelledby="assessment-support-heading">
          <p className="eyebrow">Recommended support model</p>
          <h2 id="assessment-support-heading">{roadmap.deliveryModel?.model.name ?? "Support model unavailable"}</h2>
          <p>{roadmap.deliveryModel?.model.summary ?? "Complete the technical capability domain to generate a support-model recommendation."}</p>
          {roadmap.deliveryModel ? (
            <ul className="assessment-guidance-list">{[...roadmap.deliveryModel.model.recommendations, ...roadmap.deliveryModel.additionalGuidance].map((recommendation) => <li key={recommendation}>{recommendation}</li>)}</ul>
          ) : null}
        </section>
      </div>

      <section className="assessment-report-closing" aria-labelledby="assessment-closing-heading">
        <div>
          <p className="eyebrow">Validate the roadmap</p>
          <h2 id="assessment-closing-heading">Turn the assessment into a realistic first initiative.</h2>
          <p>Review the priorities, dependencies, and support model with McQueen Cloud Advisory before committing to a platform, vendor, or large transformation program.</p>
        </div>
        <div className="assessment-closing-actions">
          <Link href="/contact" className="button button-primary">Review your roadmap <span aria-hidden="true">↗</span></Link>
          <button type="button" onClick={onRestart} className="button button-secondary">Restart assessment</button>
        </div>
      </section>
      <p className="assessment-context">These results are directional and based on self-reported answers. They are not a formal audit, security assessment, or implementation plan.</p>
    </div>
  );
}
