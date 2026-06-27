import {
  constraintPlaybooks,
  criticalOverrides,
  deliveryModels,
  opportunityPlaybooks,
  type DeliveryModel,
  type RoadmapAction,
} from "../../data/recommendations";
import type {
  AssessmentDomainId,
  CriticalCapabilityId,
} from "../../data/assessment";
import type { GapEvaluation, OpportunityId } from "./evaluate-gaps";
import type {
  OpportunityEvaluation,
  OpportunityStatus,
} from "./evaluate-readiness";
import type { PrioritySelection } from "./select-priorities";
import type { DomainScore } from "./score-domains";

export type RoadmapSource =
  | "critical-override"
  | "primary-constraint"
  | "best-opportunity"
  | "delivery-model";

export interface RecommendedRoadmapAction extends RoadmapAction {
  source: RoadmapSource;
  sourceId: string;
}

export interface DeliveryModelRecommendation {
  model: DeliveryModel;
  additionalGuidance: readonly string[];
}

export interface AssessmentRoadmap {
  actions: readonly RecommendedRoadmapAction[];
  deferredInvestments: readonly string[];
  deliveryModel: DeliveryModelRecommendation | null;
}

const MAX_ROADMAP_ACTIONS = 5;
const MAX_DEFERRED_INVESTMENTS = 3;

const unique = <T>(values: readonly T[]): readonly T[] =>
  [...new Set(values)];

const getDomainScore = (
  domainScores: readonly DomainScore[],
  domainId: AssessmentDomainId,
): DomainScore | undefined =>
  domainScores.find((domain) => domain.id === domainId);

const toRecommendedAction = (
  action: RoadmapAction,
  source: RoadmapSource,
  sourceId: string,
): RecommendedRoadmapAction => ({
  ...action,
  source,
  sourceId,
});

const getCriticalCapabilitiesByPriority = (
  gapEvaluation: GapEvaluation,
  priorities: PrioritySelection,
): readonly CriticalCapabilityId[] => {
  const primaryCapabilities =
    priorities.primaryConstraint?.criticalCapabilities ?? [];

  const opportunityCapabilities =
    priorities.bestOpportunity?.opportunity.blockingCapabilities ?? [];

  const allCapabilities = gapEvaluation.criticalFlags.map(
    (flag) => flag.capability,
  );

  return unique([
    ...primaryCapabilities,
    ...opportunityCapabilities,
    ...allCapabilities,
  ]);
};

const getCriticalActions = (
  gapEvaluation: GapEvaluation,
  priorities: PrioritySelection,
): readonly RecommendedRoadmapAction[] =>
  getCriticalCapabilitiesByPriority(gapEvaluation, priorities).map(
    (capability) => {
      const override = criticalOverrides[capability];

      return {
        id: `critical-${capability}`,
        phase: "days-1-30",
        title: override.title,
        description: override.description,
        source: "critical-override",
        sourceId: capability,
      };
    },
  );

const getConstraintActions = (
  priorities: PrioritySelection,
): readonly RecommendedRoadmapAction[] => {
  const domainId = priorities.primaryConstraint?.domain.id;

  if (domainId === undefined) {
    return [];
  }

  return constraintPlaybooks[domainId].actions
    .slice(0, 2)
    .map((action) =>
      toRecommendedAction(action, "primary-constraint", domainId),
    );
};

const getOpportunityActions = (
  priorities: PrioritySelection,
): readonly RecommendedRoadmapAction[] => {
  const opportunityId =
    priorities.bestOpportunity?.opportunity.id;

  if (opportunityId === undefined) {
    return [];
  }

  return opportunityPlaybooks[opportunityId].actions
    .slice(0, 2)
    .map((action) =>
      toRecommendedAction(action, "best-opportunity", opportunityId),
    );
};

const requiresDeliveryModelAction = (
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
): boolean => {
  const technicalDomain = getDomainScore(
    domainScores,
    "technical-capability-support",
  );

  const hasOwnershipGap = gapEvaluation.criticalFlags.some(
    (flag) => flag.capability === "technical-ownership",
  );

  const hasContinuityGap = gapEvaluation.criticalFlags.some(
    (flag) => flag.capability === "knowledge-staffing-continuity",
  );

  return (
    hasOwnershipGap ||
    hasContinuityGap ||
    (technicalDomain?.average !== null &&
      technicalDomain?.average !== undefined &&
      technicalDomain.average < 2.5)
  );
};

const getDeliveryModelRecommendation = (
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
): DeliveryModelRecommendation | null => {
  const technicalDomain = getDomainScore(
    domainScores,
    "technical-capability-support",
  );

  if (technicalDomain?.maturityLevel === null ||
      technicalDomain?.maturityLevel === undefined) {
    return null;
  }

  const model = deliveryModels[technicalDomain.maturityLevel];
  const additionalGuidance: string[] = [];

  const hasOwnershipGap = gapEvaluation.criticalFlags.some(
    (flag) => flag.capability === "technical-ownership",
  );

  const hasContinuityGap = gapEvaluation.criticalFlags.some(
    (flag) => flag.capability === "knowledge-staffing-continuity",
  );

  if (hasOwnershipGap) {
    additionalGuidance.push(
      "Assign an accountable internal technology owner before commissioning new work.",
    );
  }

  if (hasContinuityGap) {
    additionalGuidance.push(
      "Require documentation, cross-training, and vendor portability to reduce dependence on one person or provider.",
    );
  }

  const aiDomain = getDomainScore(
    domainScores,
    "ai-knowledge-workflows",
  );

  if (
    technicalDomain.average !== null &&
    technicalDomain.average >= 3.25 &&
    aiDomain?.average !== null &&
    aiDomain?.average !== undefined &&
    aiDomain.average < 2.5
  ) {
    additionalGuidance.push(
      "Use targeted AI and knowledge-governance expertise rather than broadly outsourcing technical delivery.",
    );
  }

  const cloudDomain = getDomainScore(
    domainScores,
    "cloud-architecture",
  );

  if (
    technicalDomain.average !== null &&
    technicalDomain.average >= 3.25 &&
    cloudDomain?.average !== null &&
    cloudDomain?.average !== undefined &&
    cloudDomain.average < 2.5
  ) {
    additionalGuidance.push(
      "Use targeted cloud-architecture support while retaining implementation ownership internally.",
    );
  }

  return {
    model,
    additionalGuidance,
  };
};

const getDeliveryModelAction = (
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
): RecommendedRoadmapAction[] => {
  const recommendation = getDeliveryModelRecommendation(
    domainScores,
    gapEvaluation,
  );

  if (
    recommendation === null ||
    !requiresDeliveryModelAction(domainScores, gapEvaluation)
  ) {
    return [];
  }

  return [
    {
      id: `delivery-${recommendation.model.id}`,
      phase: "days-1-30",
      title: "Confirm the delivery and support model",
      description: recommendation.model.summary,
      source: "delivery-model",
      sourceId: recommendation.model.id,
    },
  ];
};

const deduplicateActions = (
  actions: readonly RecommendedRoadmapAction[],
): readonly RecommendedRoadmapAction[] => {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  const result: RecommendedRoadmapAction[] = [];

  for (const action of actions) {
    const normalizedTitle = action.title.trim().toLowerCase();

    if (
      seenIds.has(action.id) ||
      seenTitles.has(normalizedTitle)
    ) {
      continue;
    }

    seenIds.add(action.id);
    seenTitles.add(normalizedTitle);
    result.push(action);
  }

  return result;
};

const deferredInvestmentByOpportunity: Readonly<
  Partial<Record<OpportunityId, string>>
> = {
  "analytics-modernization":
    "Broad self-service analytics or predictive modeling over ungoverned data",
  "workflow-automation":
    "Broad workflow automation before exception handling and ownership are reliable",
  "cloud-modernization":
    "Large cloud migration or re-platforming before ownership, recovery, and support are clear",
  "ai-enabled-workflows":
    "Broad AI deployment before data, review, governance, and monitoring are ready",
  "reliability-improvement":
    "Higher-risk system expansion before monitoring and recovery are established",
  "technical-operating-model":
    "Custom systems that lack accountable ownership and a sustainable support model",
};

const deferredStatusPriority: Readonly<
  Partial<Record<OpportunityStatus, number>>
> = {
  blocked: 3,
  premature: 2,
  conditional: 1,
};

const getReadinessDeferrals = (
  readinessEvaluations: readonly OpportunityEvaluation[],
): readonly string[] =>
  [...readinessEvaluations]
    .filter(
      (evaluation) =>
        evaluation.status === "blocked" ||
        evaluation.status === "premature" ||
        evaluation.status === "conditional",
    )
    .sort(
      (left, right) =>
        (deferredStatusPriority[right.status] ?? 0) -
        (deferredStatusPriority[left.status] ?? 0),
    )
    .flatMap((evaluation) => {
      const deferred =
        deferredInvestmentByOpportunity[evaluation.id];

      return deferred === undefined ? [] : [deferred];
    });

const getConstraintDeferrals = (
  priorities: PrioritySelection,
): readonly string[] => {
  const domainId = priorities.primaryConstraint?.domain.id;

  return domainId === undefined
    ? []
    : constraintPlaybooks[domainId].defer;
};

const buildDeferredInvestments = (
  priorities: PrioritySelection,
  readinessEvaluations: readonly OpportunityEvaluation[],
): readonly string[] =>
  unique([
    ...getReadinessDeferrals(readinessEvaluations),
    ...getConstraintDeferrals(priorities),
  ]).slice(0, MAX_DEFERRED_INVESTMENTS);

export function buildRoadmap(
  domainScores: readonly DomainScore[],
  gapEvaluation: GapEvaluation,
  readinessEvaluations: readonly OpportunityEvaluation[],
  priorities: PrioritySelection,
): AssessmentRoadmap {
  const actions = deduplicateActions([
    ...getCriticalActions(gapEvaluation, priorities),
    ...getConstraintActions(priorities),
    ...getOpportunityActions(priorities),
    ...getDeliveryModelAction(domainScores, gapEvaluation),
  ]).slice(0, MAX_ROADMAP_ACTIONS);

  return {
    actions,
    deferredInvestments: buildDeferredInvestments(
      priorities,
      readinessEvaluations,
    ),
    deliveryModel: getDeliveryModelRecommendation(
      domainScores,
      gapEvaluation,
    ),
  };
}
