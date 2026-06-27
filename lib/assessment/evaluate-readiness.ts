import type {
  AssessmentDomainId,
  CriticalCapabilityId,
} from "../../data/assessment";
import {
  opportunityDefinitions,
  type OpportunityDefinition,
  type OpportunityId,
} from "./evaluate-gaps";
import type { DomainScore } from "./score-domains";

export type OpportunityStatus =
  | "incomplete"
  | "established"
  | "ready"
  | "conditional"
  | "premature"
  | "blocked";

export interface OpportunityEvaluation {
  id: OpportunityId;
  name: string;
  targetDomainId: AssessmentDomainId;
  targetDomainScore: number | null;
  prerequisiteDomainIds: readonly AssessmentDomainId[];
  prerequisiteAverage: number | null;
  blockingCapabilities: readonly CriticalCapabilityId[];
  status: OpportunityStatus;
  rationale: string;
}

const blockingCapabilitiesByOpportunity: Readonly<
  Record<OpportunityId, readonly CriticalCapabilityId[]>
> = {
  "analytics-modernization": [
    "data-quality-detection",
    "technical-ownership",
  ],
  "workflow-automation": [
    "exception-handling",
    "monitoring-alerting",
    "technical-ownership",
  ],
  "cloud-modernization": [
    "access-management",
    "monitoring-alerting",
    "production-change-control",
    "recovery-preparedness",
    "technical-ownership",
    "knowledge-staffing-continuity",
  ],
  "ai-enabled-workflows": [
    "data-quality-detection",
    "access-management",
    "ai-output-review",
    "ai-workflow-monitoring",
    "technical-ownership",
    "knowledge-staffing-continuity",
  ],
  "reliability-improvement": [
    "technical-ownership",
    "knowledge-staffing-continuity",
  ],
  "technical-operating-model": [],
};

const roundToTwoDecimals = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const getDomainScore = (
  domainScores: readonly DomainScore[],
  domainId: AssessmentDomainId,
): DomainScore | undefined =>
  domainScores.find((domain) => domain.id === domainId);

const getPrerequisiteAverage = (
  opportunity: OpportunityDefinition,
  domainScores: readonly DomainScore[],
): number | null => {
  const prerequisiteScores = opportunity.prerequisiteDomainIds.map(
    (domainId) => getDomainScore(domainScores, domainId)?.average ?? null,
  );

  if (
    prerequisiteScores.length === 0 ||
    prerequisiteScores.some((score) => score === null)
  ) {
    return null;
  }

  const completedScores = prerequisiteScores as number[];

  return roundToTwoDecimals(
    completedScores.reduce((total, score) => total + score, 0) /
      completedScores.length,
  );
};

const getBlockingCapabilities = (
  opportunity: OpportunityDefinition,
  domainScores: readonly DomainScore[],
): readonly CriticalCapabilityId[] => {
  const relevantCapabilities = new Set(
    blockingCapabilitiesByOpportunity[opportunity.id],
  );

  return domainScores.flatMap((domain) =>
    domain.criticalFlags.flatMap((flag) =>
      relevantCapabilities.has(flag.capability) ? [flag.capability] : [],
    ),
  );
};

const classifyOpportunity = ({
  targetDomainScore,
  prerequisiteAverage,
  blockingCapabilities,
}: {
  targetDomainScore: number | null;
  prerequisiteAverage: number | null;
  blockingCapabilities: readonly CriticalCapabilityId[];
}): OpportunityStatus => {
  if (targetDomainScore === null || prerequisiteAverage === null) {
    return "incomplete";
  }

  if (targetDomainScore >= 2.5) {
    return "established";
  }

  if (blockingCapabilities.length > 0) {
    return "blocked";
  }

  if (prerequisiteAverage >= 2.75) {
    return "ready";
  }

  if (prerequisiteAverage >= 2.5) {
    return "conditional";
  }

  return "premature";
};

const buildRationale = ({
  status,
  opportunity,
  targetDomainScore,
  prerequisiteAverage,
  blockingCapabilities,
}: {
  status: OpportunityStatus;
  opportunity: OpportunityDefinition;
  targetDomainScore: number | null;
  prerequisiteAverage: number | null;
  blockingCapabilities: readonly CriticalCapabilityId[];
}): string => {
  switch (status) {
    case "incomplete":
      return "Complete all assessment questions before evaluating this opportunity.";

    case "established":
      return `${opportunity.name} is already supported by a Managed or Scalable target-domain score. Focus on optimization rather than foundational implementation.`;

    case "ready":
      return `${opportunity.name} has meaningful room for improvement, while its supporting prerequisites are strong enough to begin a bounded initiative.`;

    case "conditional":
      return `${opportunity.name} may be viable, but supporting capabilities should be strengthened alongside a limited pilot.`;

    case "premature":
      return `${opportunity.name} is not recommended as an immediate priority because the supporting prerequisites are not yet sufficiently mature.`;

    case "blocked":
      return `${opportunity.name} should not be expanded until the identified critical capability gaps are addressed.`;

    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
};

export function evaluateReadiness(
  domainScores: readonly DomainScore[],
): readonly OpportunityEvaluation[] {
  return opportunityDefinitions.map((opportunity) => {
    const targetDomainScore =
      getDomainScore(domainScores, opportunity.targetDomainId)?.average ?? null;

    const prerequisiteAverage = getPrerequisiteAverage(
      opportunity,
      domainScores,
    );

    const blockingCapabilities = getBlockingCapabilities(
      opportunity,
      domainScores,
    );

    const status = classifyOpportunity({
      targetDomainScore,
      prerequisiteAverage,
      blockingCapabilities,
    });

    return {
      id: opportunity.id,
      name: opportunity.name,
      targetDomainId: opportunity.targetDomainId,
      targetDomainScore,
      prerequisiteDomainIds: opportunity.prerequisiteDomainIds,
      prerequisiteAverage,
      blockingCapabilities,
      status,
      rationale: buildRationale({
        status,
        opportunity,
        targetDomainScore,
        prerequisiteAverage,
        blockingCapabilities,
      }),
    };
  });
}

export function getReadyOpportunities(
  evaluations: readonly OpportunityEvaluation[],
): readonly OpportunityEvaluation[] {
  return evaluations.filter((evaluation) => evaluation.status === "ready");
}

export function getBlockedOpportunities(
  evaluations: readonly OpportunityEvaluation[],
): readonly OpportunityEvaluation[] {
  return evaluations.filter((evaluation) => evaluation.status === "blocked");
}

export function getPrematureOpportunities(
  evaluations: readonly OpportunityEvaluation[],
): readonly OpportunityEvaluation[] {
  return evaluations.filter(
    (evaluation) =>
      evaluation.status === "premature" ||
      evaluation.status === "conditional",
  );
}
