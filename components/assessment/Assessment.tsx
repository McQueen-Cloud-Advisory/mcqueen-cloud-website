"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  assessmentDomainById,
  assessmentDomains,
  assessmentMetadata,
  assessmentQuestions,
  type MaturityScore,
} from "../../data/assessment";
import { analyzeAssessment } from "../../lib/assessment/analyze-assessment";
import type { AssessmentResponses } from "../../lib/assessment/score-domains";
import AssessmentProgress from "./AssessmentProgress";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentResults from "./AssessmentResults";

type AssessmentView = "intro" | "questions" | "complete";

export default function Assessment() {
  const [view, setView] = useState<AssessmentView>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const questionRegionRef = useRef<HTMLDivElement>(null);
  const overviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasStartedRef = useRef(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const selectedScore = currentQuestion === undefined ? undefined : responses[currentQuestion.id];
  const currentDomainName = currentQuestion === undefined ? "" : assessmentDomainById[currentQuestion.domainId].name;
  const analysis = useMemo(() => analyzeAssessment(responses), [responses]);
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;

  useEffect(() => {
    if (view === "questions") questionRegionRef.current?.focus();
    if (view === "intro" && hasStartedRef.current) overviewHeadingRef.current?.focus();
  }, [currentQuestionIndex, view]);

  const startAssessment = () => {
    hasStartedRef.current = true;
    setView("questions");
    setCurrentQuestionIndex(0);
  };

  const selectAnswer = (score: MaturityScore) => {
    if (currentQuestion === undefined) return;
    setResponses((currentResponses) => ({ ...currentResponses, [currentQuestion.id]: score }));
  };

  const goBack = () => {
    if (isFirstQuestion) {
      setView("intro");
      return;
    }
    setCurrentQuestionIndex((index) => Math.max(0, index - 1));
  };

  const goNext = () => {
    if (currentQuestion === undefined || selectedScore === undefined) return;
    if (isLastQuestion) {
      setView("complete");
      return;
    }
    setCurrentQuestionIndex((index) => Math.min(assessmentQuestions.length - 1, index + 1));
  };

  const restartAssessment = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setView("intro");
  };

  if (view === "intro") {
    return (
      <>
        <section className="assessment-intro">
          <div className="assessment-intro-copy">
            <p className="eyebrow">Operational modernization / Readiness assessment</p>
            <h1 ref={overviewHeadingRef} tabIndex={-1} className="assessment-title">A clearer view of what comes next.</h1>
            <p className="assessment-intro-lede">
              Identify what your organization should improve next. Explore six connected capabilities and receive an explainable profile of your strengths, constraints, and best next opportunity.
            </p>
            <dl className="assessment-facts">
              <div><dt>Questions</dt><dd>{assessmentMetadata.questionCount}</dd></div>
              <div><dt>Capability domains</dt><dd>{assessmentMetadata.domainCount}</dd></div>
              <div><dt>Minutes, approximately</dt><dd>{assessmentMetadata.estimatedMinutes}</dd></div>
            </dl>
            <button type="button" onClick={startAssessment} className="button button-primary assessment-start">
              Start the assessment <span aria-hidden="true">↗</span>
            </button>
            <p className="assessment-privacy">
              Evaluated in your browser. No account, personal information, or stored responses.
            </p>
          </div>

          <aside className="assessment-domain-register" aria-labelledby="assessment-domains-title">
            <div className="assessment-register-heading">
              <span className="assessment-mono">The assessment framework</span>
              <span aria-hidden="true" className="assessment-register-mark">＋</span>
            </div>
            <h2 id="assessment-domains-title">Six capabilities.<br />One connected picture.</h2>
            <ol>
              {assessmentDomains.map((domain, index) => (
                <li key={domain.id}>
                  <span className="assessment-mono">{String(index + 1).padStart(2, "0")}</span>
                  <span>{domain.name}</span>
                  <span aria-hidden="true" className="assessment-domain-tick" />
                </li>
              ))}
            </ol>
            <p>Strong capabilities matter. So do the dependencies between them.</p>
          </aside>
        </section>

        <section className="assessment-deliverables" aria-labelledby="assessment-report-heading">
          <div className="assessment-deliverables-heading">
            <p className="eyebrow">The output</p>
            <h2 id="assessment-report-heading">A direction.<br />And the reasoning behind it.</h2>
          </div>
          <div className="assessment-deliverable-list">
            <article><span className="assessment-mono">01</span><div><h3>Your modernization profile</h3><p>Your strongest capabilities and the primary constraint limiting progress.</p></div></article>
            <article><span className="assessment-mono">02</span><div><h3>Your best next opportunity</h3><p>A recommendation based on prerequisite readiness, with investments to defer.</p></div></article>
            <article><span className="assessment-mono">03</span><div><h3>A practical 90-day roadmap</h3><p>A prioritized sequence and a recommended internal and external support model.</p></div></article>
          </div>
        </section>
        <p className="assessment-context">
          Directional guidance, not a formal audit. Results are based on self-reported answers and support prioritization and discussion. They do not replace a security assessment, architecture review, compliance audit, or detailed implementation plan.
        </p>
      </>
    );
  }

  if (view === "complete") return <AssessmentResults analysis={analysis} onRestart={restartAssessment} />;
  if (currentQuestion === undefined) return null;

  return (
    <section className="assessment-workspace">
      <div className="assessment-workspace-heading">
        <p className="eyebrow">Operational modernization</p>
        <h1>Readiness assessment</h1>
        <p>Choose the description that best reflects your organization today.</p>
      </div>
      <div className="assessment-question-sheet">
        <AssessmentProgress currentQuestionNumber={currentQuestionIndex + 1} totalQuestions={assessmentQuestions.length} domainName={currentDomainName} />
        <div key={currentQuestion.id} ref={questionRegionRef} tabIndex={-1} className="assessment-question-region">
          <AssessmentQuestion question={currentQuestion} selectedScore={selectedScore} onSelect={selectAnswer} />
        </div>
        <div className="assessment-question-actions">
          <button type="button" onClick={goBack} className="button button-secondary">
            <span aria-hidden="true">←</span> {isFirstQuestion ? "Back to overview" : "Back"}
          </button>
          <button type="button" onClick={goNext} disabled={selectedScore === undefined} className="button button-primary">
            {isLastQuestion ? "View results" : "Next question"} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <p className="assessment-workspace-note">Your answers stay on this page. You can go back to revise them; reloading clears them.</p>
    </section>
  );
}
