import {
  assessmentMetadata,
  type AssessmentDomainId,
  type MaturityLevel,
} from "../../data/assessment";
import { buildRoadmap, type AssessmentRoadmap } from "./build-roadmap";
import { evaluateGaps, type GapEvaluation } from "./evaluate-gaps";
import {
  evaluateReadiness,
  type OpportunityEvaluation,
} from "./evaluate-readiness";
import {
  selectPriorities,
  type PrioritySelection,
} from "./select-priorities";
import {
  getMaturityLevel,
  getOverallAverage,
  isAssessmentComplete,
  scoreDomains,
  type AssessmentResponses,
  type DomainScore,
} from "./score-domains";

export type ModernizationStage =
  | "Stabilize"
  | "Standardize"
  | "Automate"
  | "Scale"
  | "Optimize";

export interface AssessmentAnalysis {
  isComplete: boolean;
  answeredCount: number;
  questionCount: number;
  overallAverage: number | null;
  overallMaturityLevel: MaturityLevel | null;
  domainScores: readonly DomainScore[];
  gapEvaluation: GapEvaluation;
  readinessEvaluations: readonly OpportunityEvaluation[];
  priorities: PrioritySelection | null;
  roadmap: AssessmentRoadmap | null;
  modernizationStage: ModernizationStage | null;
  stageModifier: string | null;
  organizationalProfile: string | null;
}

const getDomainScore = (
  domainScores: readonly DomainScore[],
  domainId: AssessmentDomainId,
): DomainScore | undefined =>
  domainScores.find((domain) => domain.id === domainId);

const getCompletedAverage = (
  domainScores: readonly DomainScore[],
  domainId: AssessmentDomainId,
): number | null =>
  getDomainScore(domainScores, domainId)?.average ?? null;

const countDomainsAtOrAbove = (
  domainScores: readonly DomainScore[],
  threshold: number,
): number =>
  domainScores.filter(
    (domain) =>
      domain.average !== null &&
      domain.average >= threshold,
  ).length;

const hasCriticalCapability = (
  gapEvaluation: GapEvaluation,
  capability:
    | "technical-ownership"
    | "recovery-preparedness"
    | "access-management",
): boolean =>
  gapEvaluation.criticalFlags.some(
    (flag) => flag.capability === capability,
  );

const classifyModernizationStage = (
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
  readinessEvaluations: readonly OpportunityEvaluation[],
): ModernizationStage => {
  const governance = getCompletedAverage(
    domainScores,
    "governance-reliability",
  );

  const technical = getCompletedAverage(
    domainScores,
    "technical-capability-support",
  );

  const workflow = getCompletedAverage(
    domainScores,
    "workflow-automation",
  );

  const data = getCompletedAverage(domainScores, "data-reporting");

  const cloud = getCompletedAverage(
    domainScores,
    "cloud-architecture",
  );

  const scalableDomainCount = countDomainsAtOrAbove(
    domainScores,
    3.25,
  );

  const managedDomainCount = countDomainsAtOrAbove(
    domainScores,
    2.5,
  );

  const allDomainsAtLeastSupporting = domainScores.every(
    (domain) =>
      domain.average !== null &&
      domain.average >= 2.75,
  );

  if (
    scalableDomainCount >= 4 &&
    allDomainsAtLeastSupporting &&
    gapEvaluation.criticalFlags.length === 0
  ) {
    return "Optimize";
  }

  if (
    governance !== null &&
    technical !== null &&
    (
      governance < 1.75 ||
      technical < 1.75 ||
      gapEvaluation.criticalFlags.length >= 3 ||
      hasCriticalCapability(
        gapEvaluation,
        "technical-ownership",
      ) ||
      hasCriticalCapability(
        gapEvaluation,
        "recovery-preparedness",
      ) ||
      hasCriticalCapability(
        gapEvaluation,
        "access-management",
      )
    )
  ) {
    return "Stabilize";
  }

  const workflowOpportunity = readinessEvaluations.find(
    (evaluation) => evaluation.id === "workflow-automation",
  );

  if (
    workflow !== null &&
    governance !== null &&
    technical !== null &&
    cloud !== null &&
    workflow < 2.5 &&
    governance >= 2.5 &&
    technical >= 2.5 &&
    cloud >= 2.5 &&
    (
      workflowOpportunity?.status === "ready" ||
      workflowOpportunity?.status === "conditional"
    )
  ) {
    return "Automate";
  }

  if (
    (data !== null && data < 2.5) ||
    (workflow !== null && workflow < 2.5) ||
    domainScores.some(
      (domain) =>
        domain.average !== null &&
        domain.average < 2.25,
    )
  ) {
    return "Standardize";
  }

  if (managedDomainCount >= 4) {
    return "Scale";
  }

  return "Standardize";
};

const buildStageModifier = (
  stage: ModernizationStage,
  gapEvaluation: GapEvaluation,
  priorities: PrioritySelection,
): string | null => {
  const primaryConstraint = priorities.primaryConstraint;
  const bestOpportunity = priorities.bestOpportunity;

  if (
    primaryConstraint !== null &&
    primaryConstraint.criticalCapabilities.length > 0
  ) {
    return `requires ${primaryConstraint.domain.shortName} remediation`;
  }

  if (
    bestOpportunity !== null &&
    (
      bestOpportunity.opportunity.status === "ready" ||
      bestOpportunity.opportunity.status === "conditional"
    )
  ) {
    return `prioritizes ${bestOpportunity.opportunity.name}`;
  }

  const technicalStrength = gapEvaluation.strengths.find(
    (domain) => domain.id === "technical-capability-support",
  );

  if (
    technicalStrength !== undefined &&
    stage !== "Optimize"
  ) {
    return "supported by strong internal technical capability";
  }

  return null;
};

const buildOrganizationalProfile = (
  gapEvaluation: GapEvaluation,
  priorities: PrioritySelection,
): string => {
  if (gapEvaluation.imbalance !== null) {
    return `${gapEvaluation.imbalance.strongestDomain.name} is a clear strength, while ${gapEvaluation.imbalance.weakestDomain.name} is the largest capability gap.`;
  }

  if (
    gapEvaluation.strengths.length >= 2 &&
    priorities.primaryConstraint !== null
  ) {
    const strengthNames = gapEvaluation.strengths
      .slice(0, 2)
      .map((domain) => domain.name)
      .join(" and ");

    return `${strengthNames} provide a strong foundation, while ${priorities.primaryConstraint.domain.name} is the most important capability to improve next.`;
  }

  if (priorities.primaryConstraint !== null) {
    return `${priorities.primaryConstraint.domain.name} is the organization’s primary modernization constraint.`;
  }

  if (priorities.bestOpportunity !== null) {
    return `${priorities.bestOpportunity.opportunity.name} is the strongest available next-step opportunity.`;
  }

  return "The organization has a relatively balanced capability profile without one dominant constraint or opportunity.";
};

export function analyzeAssessment(
  responses: AssessmentResponses,
): AssessmentAnalysis {
  const domainScores = scoreDomains(responses);
  const answeredCount = domainScores.reduce(
    (total, domain) => total + domain.answeredCount,
    0,
  );

  const complete = isAssessmentComplete(domainScores);
  const overallAverage = getOverallAverage(domainScores);
  const gapEvaluation = evaluateGaps(domainScores);
  const readinessEvaluations = evaluateReadiness(domainScores);

  if (!complete) {
    return {
      isComplete: false,
      answeredCount,
      questionCount: assessmentMetadata.questionCount,
      overallAverage,
      overallMaturityLevel:
        overallAverage === null
          ? null
          : getMaturityLevel(overallAverage),
      domainScores,
      gapEvaluation,
      readinessEvaluations,
      priorities: null,
      roadmap: null,
      modernizationStage: null,
      stageModifier: null,
      organizationalProfile: null,
    };
  }

  const priorities = selectPriorities(
    domainScores,
    gapEvaluation,
    readinessEvaluations,
  );

  const roadmap = buildRoadmap(
    domainScores,
    gapEvaluation,
    readinessEvaluations,
    priorities,
  );

  const modernizationStage = classifyModernizationStage(
    domainScores,
    gapEvaluation,
    readinessEvaluations,
  );

  return {
    isComplete: true,
    answeredCount,
    questionCount: assessmentMetadata.questionCount,
    overallAverage,
    overallMaturityLevel:
      overallAverage === null
        ? null
        : getMaturityLevel(overallAverage),
    domainScores,
    gapEvaluation,
    readinessEvaluations,
    priorities,
    roadmap,
    modernizationStage,
    stageModifier: buildStageModifier(
      modernizationStage,
      gapEvaluation,
      priorities,
    ),
    organizationalProfile: buildOrganizationalProfile(
      gapEvaluation,
      priorities,
    ),
  };
}
