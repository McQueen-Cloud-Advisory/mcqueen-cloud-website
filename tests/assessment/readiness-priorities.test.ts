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

describe("assessment readiness and prioritization", () => {
  it("treats AI as ready when the target capability is weak but prerequisites are strong", () => {
    const analysis = analyzeAssessment(
      buildResponses(4, {
        "ai-knowledge-workflows": 2,
      }),
    );

    const aiOpportunity = analysis.readinessEvaluations.find(
      (opportunity) => opportunity.id === "ai-enabled-workflows",
    );

    expect(aiOpportunity).toMatchObject({
      targetDomainScore: 2,
      prerequisiteAverage: 4,
      blockingCapabilities: [],
      status: "ready",
    });

    expect(
      analysis.priorities?.bestOpportunity?.opportunity.id,
    ).toBe("ai-enabled-workflows");

    expect(analysis.stageModifier).toBe(
      "prioritizes AI-enabled workflows",
    );
  });

  it("treats AI as conditional when prerequisite maturity is between 2.5 and 2.74", () => {
    const analysis = analyzeAssessment(
      buildResponses(3, {
        "ai-knowledge-workflows": 2,
        "governance-reliability": 2,
      }),
    );

    const aiOpportunity = analysis.readinessEvaluations.find(
      (opportunity) => opportunity.id === "ai-enabled-workflows",
    );

    expect(aiOpportunity).toMatchObject({
      targetDomainScore: 2,
      prerequisiteAverage: 2.67,
      blockingCapabilities: [],
      status: "conditional",
    });
  });

  it("treats AI as premature when supporting prerequisites are too weak", () => {
    const analysis = analyzeAssessment(buildResponses(2));

    const aiOpportunity = analysis.readinessEvaluations.find(
      (opportunity) => opportunity.id === "ai-enabled-workflows",
    );

    expect(aiOpportunity).toMatchObject({
      targetDomainScore: 2,
      prerequisiteAverage: 2,
      blockingCapabilities: [],
      status: "premature",
    });
  });


  it("does not treat a ready opportunity as evidence of a prerequisite bottleneck", () => {
    const analysis = analyzeAssessment(
      buildResponses(
        4,
        {
          "data-reporting": 2,
          "governance-reliability": 2,
          "cloud-architecture": 3,
          "technical-capability-support": 3,
        },
        {
          q16: 3,
        },
      ),
    );

    const analyticsOpportunity = analysis.readinessEvaluations.find(
      (opportunity) =>
        opportunity.id === "analytics-modernization",
    );

    expect(analyticsOpportunity).toMatchObject({
      prerequisiteAverage: 2.75,
      status: "ready",
    });

    expect(
      analysis.priorities?.primaryConstraint?.domain.id,
    ).toBe("data-reporting");

    expect(
      analysis.priorities?.primaryConstraint?.reason,
    ).toBe("lowest-domain");

    expect(
      analysis.priorities?.primaryConstraint?.blockedOpportunityIds,
    ).toEqual([]);
  });

  it("preserves AI capitalization in critical-remediation modifiers", () => {
    const analysis = analyzeAssessment(
      buildResponses(
        4,
        {
          "ai-knowledge-workflows": 2,
        },
        {
          q19: 1,
        },
      ),
    );

    expect(
      analysis.priorities?.primaryConstraint?.domain.id,
    ).toBe("ai-knowledge-workflows");

    expect(analysis.stageModifier).toBe(
      "requires AI remediation",
    );
  });

  it("prioritizes foundational technical capability when governance and ownership gaps block modernization", () => {
    const analysis = analyzeAssessment(
      buildResponses(2, {
        "governance-reliability": 1,
        "technical-capability-support": 1,
      }),
    );

    const aiOpportunity = analysis.readinessEvaluations.find(
      (opportunity) => opportunity.id === "ai-enabled-workflows",
    );

    const workflowOpportunity = analysis.readinessEvaluations.find(
      (opportunity) => opportunity.id === "workflow-automation",
    );

    expect(analysis.modernizationStage).toBe("Stabilize");
    expect(aiOpportunity?.status).toBe("blocked");
    expect(workflowOpportunity?.status).toBe("blocked");
    expect(
      analysis.priorities?.primaryConstraint?.domain.id,
    ).toBe("technical-capability-support");
    expect(
      analysis.priorities?.primaryConstraint?.reason,
    ).toBe("critical-capability");
  });
});
