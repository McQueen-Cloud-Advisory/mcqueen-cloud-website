import type { CriticalCapabilityId } from "../../data/assessment";
import type {
  FoundationalConstraint,
  GapEvaluation,
  OpportunityId,
} from "./evaluate-gaps";
import type {
  OpportunityEvaluation,
  OpportunityStatus,
} from "./evaluate-readiness";
import type { DomainScore } from "./score-domains";

export type ConstraintSelectionReason =
  | "critical-capability"
  | "foundational-constraint"
  | "prerequisite-bottleneck"
  | "lowest-domain";

export interface PrimaryConstraintSelection {
  domain: DomainScore;
  reason: ConstraintSelectionReason;
  criticalCapabilities: readonly CriticalCapabilityId[];
  blockedOpportunityIds: readonly OpportunityId[];
  explanation: string;
}

export interface BestOpportunitySelection {
  opportunity: OpportunityEvaluation;
  priorityScore: number;
  explanation: string;
}

export interface PrioritySelection {
  primaryConstraint: PrimaryConstraintSelection | null;
  bestOpportunity: BestOpportunitySelection | null;
}

interface DomainImpact {
  domain: DomainScore;
  criticalCapabilities: readonly CriticalCapabilityId[];
  blockedOpportunityIds: readonly OpportunityId[];
  impactCount: number;
}

const roundToTwoDecimals = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const getCompletedDomains = (
  domainScores: readonly DomainScore[],
): readonly (DomainScore & { average: number })[] =>
  domainScores.filter(
    (domain): domain is DomainScore & { average: number } =>
      domain.average !== null,
  );

const unique = <T>(values: readonly T[]): readonly T[] =>
  [...new Set(values)];

const prerequisiteBottleneckStatuses =
  new Set<OpportunityStatus>([
    "blocked",
    "premature",
    "conditional",
  ]);

const getCriticalDomainImpacts = (
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
  readinessEvaluations: readonly OpportunityEvaluation[],
): readonly DomainImpact[] => {
  const completedDomains = getCompletedDomains(domainScores);

  return completedDomains
    .map((domain) => {
      const criticalCapabilities = unique(
        gapEvaluation.criticalFlags
          .filter((flag) => flag.domainId === domain.id)
          .map((flag) => flag.capability),
      );

      const blockedOpportunityIds = readinessEvaluations
        .filter(
          (evaluation) =>
            evaluation.status === "blocked" &&
            evaluation.blockingCapabilities.some((capability) =>
              criticalCapabilities.includes(capability),
            ),
        )
        .map((evaluation) => evaluation.id);

      return {
        domain,
        criticalCapabilities,
        blockedOpportunityIds,
        impactCount:
          criticalCapabilities.length + blockedOpportunityIds.length,
      };
    })
    .filter((impact) => impact.criticalCapabilities.length > 0)
    .sort((left, right) => {
      if (right.impactCount !== left.impactCount) {
        return right.impactCount - left.impactCount;
      }

      if (
        right.blockedOpportunityIds.length !==
        left.blockedOpportunityIds.length
      ) {
        return (
          right.blockedOpportunityIds.length -
          left.blockedOpportunityIds.length
        );
      }

      return left.domain.average - right.domain.average;
    });
};

const selectFoundationalConstraint = (
  constraints: readonly FoundationalConstraint[],
): FoundationalConstraint | null => constraints[0] ?? null;

const getPrerequisiteBottlenecks = (
  domainScores: readonly DomainScore[],
  readinessEvaluations: readonly OpportunityEvaluation[],
): readonly {
  domain: DomainScore & { average: number };
  blockedOpportunityIds: readonly OpportunityId[];
}[] => {
  const completedDomains = getCompletedDomains(domainScores);

  return completedDomains
    .map((domain) => {
      const blockedOpportunityIds = readinessEvaluations
        .filter(
          (evaluation) =>
            prerequisiteBottleneckStatuses.has(evaluation.status) &&
            evaluation.prerequisiteDomainIds.includes(domain.id) &&
            domain.average < 2.5,
        )
        .map((evaluation) => evaluation.id);

      return {
        domain,
        blockedOpportunityIds,
      };
    })
    .filter((item) => item.blockedOpportunityIds.length > 0)
    .sort((left, right) => {
      if (
        right.blockedOpportunityIds.length !==
        left.blockedOpportunityIds.length
      ) {
        return (
          right.blockedOpportunityIds.length -
          left.blockedOpportunityIds.length
        );
      }

      return left.domain.average - right.domain.average;
    });
};

export function selectPrimaryConstraint(
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
  readinessEvaluations: readonly OpportunityEvaluation[],
): PrimaryConstraintSelection | null {
  const completedDomains = getCompletedDomains(domainScores);

  if (completedDomains.length === 0) {
    return null;
  }

  const criticalImpact = getCriticalDomainImpacts(
    domainScores,
    gapEvaluation,
    readinessEvaluations,
  )[0];

  if (criticalImpact !== undefined) {
    return {
      domain: criticalImpact.domain,
      reason: "critical-capability",
      criticalCapabilities: criticalImpact.criticalCapabilities,
      blockedOpportunityIds: criticalImpact.blockedOpportunityIds,
      explanation:
        criticalImpact.blockedOpportunityIds.length > 0
          ? `${criticalImpact.domain.name} contains critical gaps that currently block ${criticalImpact.blockedOpportunityIds.length} modernization opportunity or opportunities.`
          : `${criticalImpact.domain.name} contains one or more critical control gaps that should be addressed before higher-risk expansion.`,
    };
  }

  const foundationalConstraint = selectFoundationalConstraint(
    gapEvaluation.foundationalConstraints,
  );

  if (foundationalConstraint !== null) {
    return {
      domain: foundationalConstraint.domain,
      reason: "foundational-constraint",
      criticalCapabilities: [],
      blockedOpportunityIds:
        foundationalConstraint.blockedOpportunityIds,
      explanation: `${foundationalConstraint.domain.name} is a weak foundational capability affecting ${foundationalConstraint.blockedOpportunityCount} dependent modernization opportunities.`,
    };
  }

  const prerequisiteBottleneck = getPrerequisiteBottlenecks(
    domainScores,
    readinessEvaluations,
  )[0];

  if (prerequisiteBottleneck !== undefined) {
    return {
      domain: prerequisiteBottleneck.domain,
      reason: "prerequisite-bottleneck",
      criticalCapabilities: [],
      blockedOpportunityIds:
        prerequisiteBottleneck.blockedOpportunityIds,
      explanation: `${prerequisiteBottleneck.domain.name} is the most common weak prerequisite across the organization’s potential next steps.`,
    };
  }

  const lowestDomain = [...completedDomains].sort(
    (left, right) => left.average - right.average,
  )[0];

  if (
    lowestDomain === undefined ||
    lowestDomain.average >= 3.25
  ) {
    return null;
  }

  return {
    domain: lowestDomain,
    reason: "lowest-domain",
    criticalCapabilities: [],
    blockedOpportunityIds: [],
    explanation: `${lowestDomain.name} is the organization’s least mature remaining capability and represents the clearest general improvement area.`,
  };
}

const opportunityStatusWeight: Readonly<Record<OpportunityStatus, number>> = {
  incomplete: 0,
  blocked: 0,
  premature: 0,
  conditional: 1,
  ready: 2,
  established: 0.5,
};

const calculateOpportunityPriority = (
  evaluation: OpportunityEvaluation,
  gapEvaluation: GapEvaluation,
): number => {
  if (
    evaluation.targetDomainScore === null ||
    evaluation.prerequisiteAverage === null
  ) {
    return 0;
  }

  const capabilityGap = 4 - evaluation.targetDomainScore;
  const prerequisiteReadiness = evaluation.prerequisiteAverage / 4;
  const strengthCount = gapEvaluation.strengths.filter((strength) =>
    evaluation.prerequisiteDomainIds.includes(strength.id),
  ).length;
  const strengthLeverage =
    evaluation.prerequisiteDomainIds.length === 0
      ? 0
      : strengthCount / evaluation.prerequisiteDomainIds.length;

  return roundToTwoDecimals(
    capabilityGap *
      prerequisiteReadiness *
      (1 + strengthLeverage * 0.25) *
      opportunityStatusWeight[evaluation.status],
  );
};

const getOpportunityExplanation = (
  evaluation: OpportunityEvaluation,
): string => {
  switch (evaluation.status) {
    case "ready":
      return `${evaluation.name} has substantial room for improvement and sufficiently mature supporting capabilities for a bounded initiative.`;

    case "conditional":
      return `${evaluation.name} is a plausible next step, provided its supporting capability gaps are strengthened during a limited pilot.`;

    case "established":
      return `${evaluation.name} is already supported by a solid foundation and is the strongest candidate for focused optimization.`;

    default:
      return evaluation.rationale;
  }
};

export function selectBestOpportunity(
  readinessEvaluations: readonly OpportunityEvaluation[],
  gapEvaluation: GapEvaluation,
): BestOpportunitySelection | null {
  const preferredStatuses: readonly OpportunityStatus[] = [
    "ready",
    "conditional",
  ];

  let candidates = readinessEvaluations.filter((evaluation) =>
    preferredStatuses.includes(evaluation.status),
  );

  if (candidates.length === 0) {
    candidates = readinessEvaluations.filter(
      (evaluation) => evaluation.status === "established",
    );
  }

  const ranked = candidates
    .map((opportunity) => ({
      opportunity,
      priorityScore: calculateOpportunityPriority(
        opportunity,
        gapEvaluation,
      ),
    }))
    .sort((left, right) => {
      if (right.priorityScore !== left.priorityScore) {
        return right.priorityScore - left.priorityScore;
      }

      return (
        (left.opportunity.targetDomainScore ??
          Number.POSITIVE_INFINITY) -
        (right.opportunity.targetDomainScore ??
          Number.POSITIVE_INFINITY)
      );
    });

  const selected = ranked[0];

  if (selected === undefined) {
    return null;
  }

  return {
    ...selected,
    explanation: getOpportunityExplanation(selected.opportunity),
  };
}

export function selectPriorities(
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
  readinessEvaluations: readonly OpportunityEvaluation[],
): PrioritySelection {
  return {
    primaryConstraint: selectPrimaryConstraint(
      domainScores,
      gapEvaluation,
      readinessEvaluations,
    ),
    bestOpportunity: selectBestOpportunity(
      readinessEvaluations,
      gapEvaluation,
    ),
  };
}
