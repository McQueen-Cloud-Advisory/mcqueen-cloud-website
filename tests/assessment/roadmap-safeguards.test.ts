import { describe, expect, it } from "vitest";

import {
  assessmentQuestions,
  type AssessmentDomainId,
  type MaturityScore,
} from "../../data/assessment";
import { analyzeAssessment } from "../../lib/assessment/analyze-assessment";
import type { AssessmentResponses } from "../../lib/assessment/score-domains";

type DomainScoreOverrides = Partial<
  Record<AssessmentDomainId, MaturityScore>
>;

function buildResponses(
  defaultScore: MaturityScore,
  domainOverrides: DomainScoreOverrides = {},
  questionOverrides: Partial<Record<string, MaturityScore>> = {},
): AssessmentResponses {
  return Object.fromEntries(
    assessmentQuestions.map((question) => [
      question.id,
      questionOverrides[question.id] ??
        domainOverrides[question.domainId] ??
        defaultScore,
    ]),
  );
}

describe("assessment roadmap safeguards", () => {
  it("caps critical remediation actions and deferred investments", () => {
    const analysis = analyzeAssessment(buildResponses(1));

    expect(analysis.isComplete).toBe(true);
    expect(analysis.gapEvaluation.criticalFlags).toHaveLength(10);
    expect(analysis.roadmap?.actions).toHaveLength(5);
    expect(analysis.roadmap?.deferredInvestments).toHaveLength(3);

    expect(
      analysis.roadmap?.actions.every(
        (action) => action.source === "critical-override",
      ),
    ).toBe(true);

    const actionIds =
      analysis.roadmap?.actions.map((action) => action.id) ?? [];
    const actionTitles =
      analysis.roadmap?.actions.map((action) => action.title) ?? [];

    expect(new Set(actionIds).size).toBe(actionIds.length);
    expect(new Set(actionTitles).size).toBe(actionTitles.length);
  });

  it("prioritizes a critical data-quality override and blocks analytics expansion", () => {
    const analysis = analyzeAssessment(
      buildResponses(
        4,
        {
          "data-reporting": 2,
        },
        {
          q3: 1,
        },
      ),
    );

    const analyticsOpportunity = analysis.readinessEvaluations.find(
      (opportunity) =>
        opportunity.id === "analytics-modernization",
    );

    expect(analyticsOpportunity).toMatchObject({
      targetDomainScore: 1.75,
      prerequisiteAverage: 4,
      blockingCapabilities: ["data-quality-detection"],
      status: "blocked",
    });

    expect(
      analysis.priorities?.primaryConstraint?.criticalCapabilities,
    ).toContain("data-quality-detection");

    expect(analysis.roadmap?.actions[0]).toMatchObject({
      id: "critical-data-quality-detection",
      source: "critical-override",
      sourceId: "data-quality-detection",
    });

    expect(analysis.roadmap?.deferredInvestments).toContain(
      "Broad self-service analytics or predictive modeling over ungoverned data",
    );
  });

  it("adds delivery-model guidance for weak technical capability without exceeding roadmap limits", () => {
    const analysis = analyzeAssessment(
      buildResponses(4, {
        "technical-capability-support": 2,
      }),
    );

    expect(analysis.gapEvaluation.criticalFlags).toHaveLength(0);
    expect(
      analysis.priorities?.primaryConstraint?.domain.id,
    ).toBe("technical-capability-support");

    expect(analysis.roadmap?.deliveryModel?.model.id).toBe(
      "hybrid-implementation",
    );

    expect(
      analysis.roadmap?.actions.some(
        (action) =>
          action.source === "delivery-model" &&
          action.sourceId === "hybrid-implementation",
      ),
    ).toBe(true);

    expect(analysis.roadmap?.actions.length).toBeLessThanOrEqual(5);
    expect(
      analysis.roadmap?.deferredInvestments.length,
    ).toBeLessThanOrEqual(3);
  });
});
