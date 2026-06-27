"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
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

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const selectedScore =
    currentQuestion === undefined
      ? undefined
      : responses[currentQuestion.id];

  const analysis = useMemo(
    () => analyzeAssessment(responses),
    [responses],
  );

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion =
    currentQuestionIndex === assessmentQuestions.length - 1;

  useEffect(() => {
    if (view !== "questions") {
      return;
    }

    questionRegionRef.current?.focus();
  }, [currentQuestionIndex, view]);

  const startAssessment = () => {
    setView("questions");
    setCurrentQuestionIndex(0);
  };

  const selectAnswer = (score: MaturityScore) => {
    if (currentQuestion === undefined) {
      return;
    }

    setResponses((currentResponses) => ({
      ...currentResponses,
      [currentQuestion.id]: score,
    }));
  };

  const goBack = () => {
    if (isFirstQuestion) {
      setView("intro");
      return;
    }

    setCurrentQuestionIndex((index) => Math.max(0, index - 1));
  };

  const goNext = () => {
    if (currentQuestion === undefined || selectedScore === undefined) {
      return;
    }

    if (isLastQuestion) {
      setView("complete");
      return;
    }

    setCurrentQuestionIndex((index) =>
      Math.min(assessmentQuestions.length - 1, index + 1),
    );
  };

  const restartAssessment = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setView("intro");
  };

  if (view === "intro") {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          About the assessment
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
          Identify what your organization should improve next.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          This assessment evaluates six operational and technical capability
          areas. Your results will identify strengths, critical gaps,
          modernization readiness, a recommended support model, and a
          prioritized 90-day roadmap.
        </p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <dt className="text-sm text-slate-400">Questions</dt>
            <dd className="mt-2 text-2xl font-semibold text-white">
              {assessmentMetadata.questionCount}
            </dd>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <dt className="text-sm text-slate-400">Capability domains</dt>
            <dd className="mt-2 text-2xl font-semibold text-white">
              {assessmentMetadata.domainCount}
            </dd>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <dt className="text-sm text-slate-400">Estimated time</dt>
            <dd className="mt-2 text-2xl font-semibold text-white">
              {assessmentMetadata.estimatedMinutes} minutes
            </dd>
          </div>
        </dl>

        <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-5">
          <p className="leading-7 text-slate-300">
            Your answers are evaluated in your browser. This version does not
            require an account, collect personal information, or store your
            responses.
          </p>
        </div>

        <button
          type="button"
          onClick={startAssessment}
          className="mt-8 inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Start the assessment
        </button>
      </section>
    );
  }

  if (view === "complete") {
    return (
      <AssessmentResults
        analysis={analysis}
        onRestart={restartAssessment}
      />
    );
  }

  if (currentQuestion === undefined) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10">
      <AssessmentProgress
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={assessmentQuestions.length}
        domainName={
          currentQuestion.domainId === "data-reporting"
            ? "Data and Reporting"
            : currentQuestion.domainId === "workflow-automation"
              ? "Workflow Automation"
              : currentQuestion.domainId === "cloud-architecture"
                ? "Cloud Architecture"
                : currentQuestion.domainId === "governance-reliability"
                  ? "Governance and Reliability"
                  : currentQuestion.domainId === "ai-knowledge-workflows"
                    ? "AI and Knowledge Workflows"
                    : "Technical Capability and Support Model"
        }
      />

      <div
        ref={questionRegionRef}
        tabIndex={-1}
        className="mt-10 outline-none"
      >
        <AssessmentQuestion
          question={currentQuestion}
          selectedScore={selectedScore}
          onSelect={selectAnswer}
        />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center justify-center rounded-md border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {isFirstQuestion ? "Back to overview" : "Back"}
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={selectedScore === undefined}
          className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {isLastQuestion ? "View results" : "Next question"}
        </button>
      </div>
    </section>
  );
}
