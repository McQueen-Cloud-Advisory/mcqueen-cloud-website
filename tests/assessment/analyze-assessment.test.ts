import { describe, expect, it } from "vitest";

import {
  assessmentQuestions,
  type MaturityScore,
} from "../../data/assessment";
import { analyzeAssessment } from "../../lib/assessment/analyze-assessment";
import type { AssessmentResponses } from "../../lib/assessment/score-domains";

function buildUniformResponses(
  score: MaturityScore,
): AssessmentResponses {
  return Object.fromEntries(
    assessmentQuestions.map((question) => [question.id, score]),
  );
}

describe("analyzeAssessment", () => {
  it("does not generate final recommendations for an incomplete assessment", () => {
    const analysis = analyzeAssessment({});

    expect(analysis.isComplete).toBe(false);
    expect(analysis.answeredCount).toBe(0);
    expect(analysis.questionCount).toBe(assessmentQuestions.length);
    expect(analysis.overallAverage).toBeNull();
    expect(analysis.modernizationStage).toBeNull();
    expect(analysis.priorities).toBeNull();
    expect(analysis.roadmap).toBeNull();
  });

  it("classifies an entirely reactive profile as Stabilize", () => {
    const analysis = analyzeAssessment(buildUniformResponses(1));

    expect(analysis.isComplete).toBe(true);
    expect(analysis.answeredCount).toBe(assessmentQuestions.length);
    expect(analysis.overallAverage).toBe(1);
    expect(analysis.overallMaturityLevel).toBe("Reactive");
    expect(analysis.modernizationStage).toBe("Stabilize");
    expect(analysis.gapEvaluation.criticalFlags).toHaveLength(10);
    expect(analysis.priorities?.primaryConstraint).not.toBeNull();
    expect(analysis.roadmap?.actions.length).toBeLessThanOrEqual(5);
  });

  it("classifies an entirely scalable profile as Optimize without inventing a constraint", () => {
    const analysis = analyzeAssessment(buildUniformResponses(4));

    expect(analysis.isComplete).toBe(true);
    expect(analysis.answeredCount).toBe(24);
    expect(analysis.overallAverage).toBe(4);
    expect(analysis.overallMaturityLevel).toBe("Scalable");
    expect(analysis.modernizationStage).toBe("Optimize");
    expect(analysis.gapEvaluation.criticalFlags).toHaveLength(0);
    expect(analysis.priorities?.primaryConstraint).toBeNull();
    expect(analysis.roadmap?.actions.length).toBeLessThanOrEqual(5);
    expect(analysis.roadmap?.deferredInvestments.length).toBeLessThanOrEqual(3);
  });
});
