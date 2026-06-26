import {
  assessmentDomains,
  type AssessmentDomainId,
  type CriticalCapabilityId,
  type MaturityLevel,
  type MaturityScore,
} from "../../data/assessment";

export type AssessmentResponses = Partial<Record<string, MaturityScore>>;

export interface CriticalCapabilityFlag {
  questionId: string;
  questionNumber: number;
  domainId: AssessmentDomainId;
  capability: CriticalCapabilityId;
}

export interface DomainScore {
  id: AssessmentDomainId;
  name: string;
  shortName: string;
  purpose: string;
  average: number | null;
  maturityLevel: MaturityLevel | null;
  lowestScore: MaturityScore | null;
  highestScore: MaturityScore | null;
  scoreSpread: number | null;
  scoreOneCount: number;
  scoreTwoOrBelowCount: number;
  answeredCount: number;
  questionCount: number;
  isComplete: boolean;
  criticalFlags: readonly CriticalCapabilityFlag[];
}

const roundToTwoDecimals = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export function getMaturityLevel(score: number): MaturityLevel {
  if (score < 1 || score > 4) {
    throw new RangeError(
      `Maturity score must be between 1 and 4. Received: ${score}`,
    );
  }

  if (score < 1.75) {
    return "Reactive";
  }

  if (score < 2.5) {
    return "Emerging";
  }

  if (score < 3.25) {
    return "Managed";
  }

  return "Scalable";
}

export function scoreDomains(
  responses: AssessmentResponses,
): readonly DomainScore[] {
  return assessmentDomains.map((domain) => {
    const answeredQuestions = domain.questions.flatMap((question) => {
      const score = responses[question.id];

      return score === undefined ? [] : [{ question, score }];
    });

    const scores = answeredQuestions.map(({ score }) => score);
    const answeredCount = scores.length;
    const questionCount = domain.questions.length;
    const isComplete = answeredCount === questionCount;

    const average =
      answeredCount === 0
        ? null
        : roundToTwoDecimals(
            scores.reduce((total, score) => total + score, 0) / answeredCount,
          );

    const lowestScore =
      answeredCount === 0 ? null : (Math.min(...scores) as MaturityScore);

    const highestScore =
      answeredCount === 0 ? null : (Math.max(...scores) as MaturityScore);

    const scoreSpread =
      lowestScore === null || highestScore === null
        ? null
        : highestScore - lowestScore;

    const criticalFlags = answeredQuestions.flatMap(({ question, score }) => {
      if (score !== 1 || question.criticalCapability === undefined) {
        return [];
      }

      return [
        {
          questionId: question.id,
          questionNumber: question.number,
          domainId: domain.id,
          capability: question.criticalCapability,
        },
      ];
    });

    return {
      id: domain.id,
      name: domain.name,
      shortName: domain.shortName,
      purpose: domain.purpose,
      average,
      maturityLevel: average === null ? null : getMaturityLevel(average),
      lowestScore,
      highestScore,
      scoreSpread,
      scoreOneCount: scores.filter((score) => score === 1).length,
      scoreTwoOrBelowCount: scores.filter((score) => score <= 2).length,
      answeredCount,
      questionCount,
      isComplete,
      criticalFlags,
    };
  });
}

export function isAssessmentComplete(
  domainScores: readonly DomainScore[],
): boolean {
  return domainScores.every((domain) => domain.isComplete);
}

export function getOverallAverage(
  domainScores: readonly DomainScore[],
): number | null {
  const completedScores = domainScores.flatMap((domain) =>
    domain.average === null ? [] : [domain.average],
  );

  if (completedScores.length === 0) {
    return null;
  }

  return roundToTwoDecimals(
    completedScores.reduce((total, score) => total + score, 0) /
      completedScores.length,
  );
}
