import type { AssessmentDomainId } from "../../data/assessment";
import type {
  CriticalCapabilityFlag,
  DomainScore,
} from "./score-domains";

export type OpportunityId =
  | "analytics-modernization"
  | "workflow-automation"
  | "cloud-modernization"
  | "ai-enabled-workflows"
  | "reliability-improvement"
  | "technical-operating-model";

export interface OpportunityDefinition {
  id: OpportunityId;
  name: string;
  targetDomainId: AssessmentDomainId;
  prerequisiteDomainIds: readonly AssessmentDomainId[];
}

export interface CapabilityImbalance {
  spread: number;
  strongestDomain: DomainScore;
  weakestDomain: DomainScore;
}

export interface FoundationalConstraint {
  domain: DomainScore;
  blockedOpportunityIds: readonly OpportunityId[];
  blockedOpportunityCount: number;
}

export interface GapEvaluation {
  strengths: readonly DomainScore[];
  supportingCapabilities: readonly DomainScore[];
  criticalFlags: readonly CriticalCapabilityFlag[];
  imbalance: CapabilityImbalance | null;
  foundationalConstraints: readonly FoundationalConstraint[];
}

export const opportunityDefinitions: readonly OpportunityDefinition[] = [
  {
    id: "analytics-modernization",
    name: "Analytics modernization",
    targetDomainId: "data-reporting",
    prerequisiteDomainIds: [
      "governance-reliability",
      "technical-capability-support",
      "cloud-architecture",
    ],
  },
  {
    id: "workflow-automation",
    name: "Workflow automation",
    targetDomainId: "workflow-automation",
    prerequisiteDomainIds: [
      "governance-reliability",
      "technical-capability-support",
      "cloud-architecture",
    ],
  },
  {
    id: "cloud-modernization",
    name: "Cloud modernization",
    targetDomainId: "cloud-architecture",
    prerequisiteDomainIds: [
      "governance-reliability",
      "technical-capability-support",
    ],
  },
  {
    id: "ai-enabled-workflows",
    name: "AI-enabled workflows",
    targetDomainId: "ai-knowledge-workflows",
    prerequisiteDomainIds: [
      "data-reporting",
      "governance-reliability",
      "technical-capability-support",
    ],
  },
  {
    id: "reliability-improvement",
    name: "Reliability improvement",
    targetDomainId: "governance-reliability",
    prerequisiteDomainIds: [
      "technical-capability-support",
      "cloud-architecture",
    ],
  },
  {
    id: "technical-operating-model",
    name: "Technical operating-model improvement",
    targetDomainId: "technical-capability-support",
    prerequisiteDomainIds: ["governance-reliability"],
  },
];

const foundationalDomainIds = new Set<AssessmentDomainId>([
  "data-reporting",
  "governance-reliability",
  "technical-capability-support",
]);

const getCompletedDomainScores = (
  domainScores: readonly DomainScore[],
): readonly (DomainScore & { average: number })[] =>
  domainScores.filter(
    (domain): domain is DomainScore & { average: number } =>
      domain.average !== null,
  );

const getDomainScore = (
  domainScores: readonly DomainScore[],
  domainId: AssessmentDomainId,
): DomainScore | undefined =>
  domainScores.find((domain) => domain.id === domainId);

const getBlockedOpportunityIds = (
  foundation: DomainScore,
  domainScores: readonly DomainScore[],
): readonly OpportunityId[] =>
  opportunityDefinitions.flatMap((opportunity) => {
    const targetDomain = getDomainScore(
      domainScores,
      opportunity.targetDomainId,
    );

    if (targetDomain?.average === null || targetDomain?.average === undefined) {
      return [];
    }

    const dependsOnFoundation =
      opportunity.targetDomainId === foundation.id ||
      opportunity.prerequisiteDomainIds.includes(foundation.id);

    const needsImprovement = targetDomain.average < 2.5;

    return dependsOnFoundation && needsImprovement ? [opportunity.id] : [];
  });

export function evaluateGaps(
  domainScores: readonly DomainScore[],
): GapEvaluation {
  const completedDomains = getCompletedDomainScores(domainScores);

  const strengths = completedDomains.filter(
    (domain) =>
      domain.average >= 3.25 && domain.criticalFlags.length === 0,
  );

  const supportingCapabilities = completedDomains.filter(
    (domain) => domain.average >= 2.75 && domain.average < 3.25,
  );

  const criticalFlags = domainScores.flatMap(
    (domain) => domain.criticalFlags,
  );

  const sortedDomains = [...completedDomains].sort(
    (left, right) => right.average - left.average,
  );

  const strongestDomain = sortedDomains[0];
  const weakestDomain = sortedDomains.at(-1);

  const imbalance =
    strongestDomain !== undefined &&
    weakestDomain !== undefined &&
    strongestDomain.average - weakestDomain.average >= 1.25
      ? {
          spread: Number(
            (strongestDomain.average - weakestDomain.average).toFixed(2),
          ),
          strongestDomain,
          weakestDomain,
        }
      : null;

  const foundationalConstraints = completedDomains
    .filter(
      (domain) =>
        foundationalDomainIds.has(domain.id) && domain.average < 2.25,
    )
    .map((domain) => {
      const blockedOpportunityIds = getBlockedOpportunityIds(
        domain,
        domainScores,
      );

      return {
        domain,
        blockedOpportunityIds,
        blockedOpportunityCount: blockedOpportunityIds.length,
      };
    })
    .filter((constraint) => constraint.blockedOpportunityCount >= 2)
    .sort((left, right) => {
      if (
        right.blockedOpportunityCount !== left.blockedOpportunityCount
      ) {
        return (
          right.blockedOpportunityCount - left.blockedOpportunityCount
        );
      }

      return (
        (left.domain.average ?? Number.POSITIVE_INFINITY) -
        (right.domain.average ?? Number.POSITIVE_INFINITY)
      );
    });

  return {
    strengths,
    supportingCapabilities,
    criticalFlags,
    imbalance,
    foundationalConstraints,
  };
}
