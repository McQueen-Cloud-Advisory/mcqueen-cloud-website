import type {
  AssessmentDomainId,
  CriticalCapabilityId,
  MaturityLevel,
} from "./assessment";
import type { OpportunityId } from "../lib/assessment/evaluate-gaps";

export type RoadmapPhase =
  | "days-1-30"
  | "days-31-60"
  | "days-61-90";

export interface RoadmapAction {
  id: string;
  phase: RoadmapPhase;
  title: string;
  description: string;
}

export interface ConstraintPlaybook {
  domainId: AssessmentDomainId;
  summary: string;
  actions: readonly RoadmapAction[];
  defer: readonly string[];
}

export interface OpportunityPlaybook {
  opportunityId: OpportunityId;
  summary: string;
  actions: readonly RoadmapAction[];
}

export interface CriticalOverride {
  capability: CriticalCapabilityId;
  title: string;
  description: string;
  blocks: readonly OpportunityId[];
}

export type DeliveryModelId =
  | "managed-support"
  | "hybrid-implementation"
  | "internal-targeted-specialists"
  | "internal-selective-review";

export interface DeliveryModel {
  id: DeliveryModelId;
  maturityLevel: MaturityLevel;
  name: string;
  summary: string;
  recommendations: readonly string[];
}

export const constraintPlaybooks: Readonly<
  Record<AssessmentDomainId, ConstraintPlaybook>
> = {
  "data-reporting": {
    domainId: "data-reporting",
    summary:
      "Establish trustworthy definitions, ownership, validation, and repeatable reporting before expanding analytics or AI use.",
    actions: [
      {
        id: "data-identify-core-metrics",
        phase: "days-1-30",
        title: "Identify and assign ownership for core metrics",
        description:
          "Select the five to ten measures most important to recurring business decisions and document each metric’s definition, source, calculation, owner, refresh expectation, and intended use.",
      },
      {
        id: "data-map-quality-failures",
        phase: "days-1-30",
        title: "Map recurring data-quality failures",
        description:
          "Document where incorrect, incomplete, stale, or duplicated data enters the reporting process and how those issues are currently discovered.",
      },
      {
        id: "data-standardize-one-output",
        phase: "days-31-60",
        title: "Standardize one high-value report",
        description:
          "Rebuild one recurring report or dashboard around approved definitions, accountable ownership, and a documented refresh process.",
      },
      {
        id: "data-add-validation",
        phase: "days-31-60",
        title: "Add practical validation checks",
        description:
          "Introduce checks for completeness, freshness, duplicates, and material variances, with clear ownership for resolving failures.",
      },
      {
        id: "data-measure-and-expand",
        phase: "days-61-90",
        title: "Measure improvement and choose the next reporting process",
        description:
          "Compare cycle time, manual adjustments, issue frequency, and usage against the prior process before expanding the approach.",
      },
    ],
    defer: [
      "Large analytics-platform migration",
      "Predictive modeling over unreliable source data",
      "Broad self-service BI rollout",
      "AI analysis over ungoverned data",
    ],
  },

  "workflow-automation": {
    domainId: "workflow-automation",
    summary:
      "Standardize one measurable workflow and its exception paths before attempting broad or autonomous automation.",
    actions: [
      {
        id: "automation-select-workflow",
        phase: "days-1-30",
        title: "Select one bounded workflow",
        description:
          "Choose a high-volume, rules-based process with clear pain, identifiable owners, and measurable outcomes.",
      },
      {
        id: "automation-map-current-state",
        phase: "days-1-30",
        title: "Map the process and establish a baseline",
        description:
          "Document inputs, outputs, handoffs, delays, common exceptions, cycle time, effort, failure rate, and rework.",
      },
      {
        id: "automation-standardize-paths",
        phase: "days-31-60",
        title: "Standardize the normal and exception paths",
        description:
          "Define the expected process, decision rules, exception owners, and escalation steps before automating execution.",
      },
      {
        id: "automation-deliver-bounded-change",
        phase: "days-31-60",
        title: "Automate one stable portion",
        description:
          "Implement a limited automation with visible status, accountable ownership, and failure notification rather than replacing the entire workflow.",
      },
      {
        id: "automation-evaluate-results",
        phase: "days-61-90",
        title: "Evaluate business impact",
        description:
          "Compare time saved, error reduction, unresolved exceptions, and hidden manual work with the original baseline before expanding.",
      },
    ],
    defer: [
      "End-to-end automation of an undocumented process",
      "Autonomous operational decision-making",
      "Broad orchestration across many systems",
      "Automation without monitoring or exception handling",
    ],
  },

  "cloud-architecture": {
    domainId: "cloud-architecture",
    summary:
      "Clarify ownership, environments, resilience, deployment, and cost before committing to broad modernization.",
    actions: [
      {
        id: "cloud-inventory",
        phase: "days-1-30",
        title: "Inventory critical cloud services",
        description:
          "Document services, owners, environments, integrations, costs, recovery expectations, and business purpose.",
      },
      {
        id: "cloud-identify-risk",
        phase: "days-1-30",
        title: "Identify the highest-risk architecture gap",
        description:
          "Prioritize missing environment separation, manual deployment, absent monitoring, weak recovery, or unclear cost ownership.",
      },
      {
        id: "cloud-remediate-one-gap",
        phase: "days-31-60",
        title: "Remediate one bounded architecture weakness",
        description:
          "Address one high-risk issue and document the decision, implementation boundary, owner, and rollback approach.",
      },
      {
        id: "cloud-define-standards",
        phase: "days-31-60",
        title: "Define minimum standards for new solutions",
        description:
          "Create lightweight criteria covering security, deployment, monitoring, recovery, cost, integration, and support.",
      },
      {
        id: "cloud-validate-backlog",
        phase: "days-61-90",
        title: "Validate the change and build a prioritized backlog",
        description:
          "Test deployment, monitoring, recovery, and cost visibility before selecting the next modernization increment.",
      },
    ],
    defer: [
      "Multi-cloud architecture without a business requirement",
      "Broad re-platforming",
      "Kubernetes adoption without an operational need",
      "Custom infrastructure when managed services meet the requirement",
    ],
  },

  "governance-reliability": {
    domainId: "governance-reliability",
    summary:
      "Reduce operational risk through clear ownership, controlled access, actionable monitoring, traceable changes, and tested recovery.",
    actions: [
      {
        id: "governance-identify-critical-services",
        phase: "days-1-30",
        title: "Identify critical services and accountable owners",
        description:
          "Prioritize the systems whose failure would create the greatest operational, financial, security, or customer impact.",
      },
      {
        id: "governance-review-access",
        phase: "days-1-30",
        title: "Review privileged and shared access",
        description:
          "Remove unnecessary access, eliminate shared credentials where possible, and define approval and review ownership.",
      },
      {
        id: "governance-add-monitoring",
        phase: "days-31-60",
        title: "Add actionable monitoring to one critical service",
        description:
          "Define service indicators, failure alerts, responders, and escalation expectations that lead to a clear action.",
      },
      {
        id: "governance-control-changes",
        phase: "days-31-60",
        title: "Standardize production change control",
        description:
          "Require version control, peer review, validation, documented deployment, and rollback for the selected service.",
      },
      {
        id: "governance-test-recovery",
        phase: "days-61-90",
        title: "Test recovery and improve the process",
        description:
          "Run one backup restoration, rollback, or incident-response exercise and convert lessons into updated controls.",
      },
    ],
    defer: [
      "Higher-risk automation",
      "Autonomous AI use",
      "Large system migrations",
      "Expansion into platforms without operational ownership",
    ],
  },

  "ai-knowledge-workflows": {
    domainId: "ai-knowledge-workflows",
    summary:
      "Use one bounded, source-grounded, human-reviewed use case to establish evidence before broad AI adoption.",
    actions: [
      {
        id: "ai-select-use-case",
        phase: "days-1-30",
        title: "Select one bounded AI-assisted use case",
        description:
          "Choose a knowledge-intensive task where AI assists a person rather than independently making a high-impact decision.",
      },
      {
        id: "ai-define-sources-controls",
        phase: "days-1-30",
        title: "Define sources, ownership, and review controls",
        description:
          "Identify approved source material, the accountable owner, required human review, unacceptable outputs, and measures of usefulness.",
      },
      {
        id: "ai-build-pilot",
        phase: "days-31-60",
        title: "Build a controlled pilot",
        description:
          "Use representative source material, preserve traceability where practical, and keep scope narrow enough to evaluate safely.",
      },
      {
        id: "ai-measure-quality",
        phase: "days-31-60",
        title: "Measure quality, effort, cost, and adoption",
        description:
          "Track accuracy, unsupported claims, reviewer effort, usage, cost, and failure patterns.",
      },
      {
        id: "ai-decide-next-step",
        phase: "days-61-90",
        title: "Compare with the existing process and decide",
        description:
          "Use evidence to expand, redesign, or stop the use case instead of assuming the pilot should continue.",
      },
    ],
    defer: [
      "Organization-wide AI rollout",
      "Autonomous operational decisions",
      "Sensitive-data use without governance",
      "AI over disorganized or outdated knowledge",
    ],
  },

  "technical-capability-support": {
    domainId: "technical-capability-support",
    summary:
      "Create accountable internal ownership, intentional support boundaries, and continuity before adding systems the organization cannot govern.",
    actions: [
      {
        id: "technical-assign-owners",
        phase: "days-1-30",
        title: "Assign an internal owner to every critical system",
        description:
          "Retain clear decision authority and accountability internally even when implementation or support is outsourced.",
      },
      {
        id: "technical-map-capability",
        phase: "days-1-30",
        title: "Map skills, providers, dependencies, and escalation paths",
        description:
          "Document internal expertise, external support, capability gaps, and systems dependent on one employee or vendor.",
      },
      {
        id: "technical-define-boundaries",
        phase: "days-31-60",
        title: "Define internal and external support boundaries",
        description:
          "Decide which responsibilities must remain internal and which are appropriate for specialist or managed support.",
      },
      {
        id: "technical-document-continuity",
        phase: "days-31-60",
        title: "Document critical knowledge and backup ownership",
        description:
          "Capture architecture, access, maintenance, recovery, support contacts, and backup responsibility for critical systems.",
      },
      {
        id: "technical-test-and-plan",
        phase: "days-61-90",
        title: "Test a handoff and create a capability plan",
        description:
          "Exercise one vendor escalation or staff handoff, then create a 12-month sourcing, skills, and continuity plan.",
      },
    ],
    defer: [
      "Hiring full-time specialists for every technical domain",
      "Fully outsourcing accountability",
      "Major platforms without a support model",
      "Custom systems the organization cannot maintain",
    ],
  },
};

export const opportunityPlaybooks: Readonly<
  Record<OpportunityId, OpportunityPlaybook>
> = {
  "analytics-modernization": {
    opportunityId: "analytics-modernization",
    summary:
      "Use one governed data product to improve a real decision rather than replacing the entire analytics platform.",
    actions: [
      {
        id: "opportunity-analytics-select-decision",
        phase: "days-1-30",
        title: "Select one decision limited by reporting quality",
        description:
          "Choose a recurring business decision affected by delays, inconsistent definitions, or low trust.",
      },
      {
        id: "opportunity-analytics-build-product",
        phase: "days-31-60",
        title: "Deliver one governed data product",
        description:
          "Create one report or dashboard with an owner, approved definitions, validation, and a clear decision purpose.",
      },
      {
        id: "opportunity-analytics-measure",
        phase: "days-61-90",
        title: "Measure decision impact",
        description:
          "Assess whether the output improved cycle time, accuracy, confidence, or actionability.",
      },
    ],
  },

  "workflow-automation": {
    opportunityId: "workflow-automation",
    summary:
      "Automate one stable, measurable workflow while preserving explicit exception routing and ownership.",
    actions: [
      {
        id: "opportunity-automation-select",
        phase: "days-1-30",
        title: "Select a repeatable process with clear rules",
        description:
          "Prioritize a process with meaningful volume, stable inputs, and a measurable operational outcome.",
      },
      {
        id: "opportunity-automation-implement",
        phase: "days-31-60",
        title: "Automate the normal path",
        description:
          "Implement the stable portion while routing exceptions to accountable people.",
      },
      {
        id: "opportunity-automation-measure",
        phase: "days-61-90",
        title: "Measure time saved and unresolved effort",
        description:
          "Compare cycle time, errors, manual intervention, and user experience with the baseline.",
      },
    ],
  },

  "cloud-modernization": {
    opportunityId: "cloud-modernization",
    summary:
      "Modernize one bounded system where managed cloud capabilities materially improve reliability, delivery speed, or cost.",
    actions: [
      {
        id: "opportunity-cloud-select-system",
        phase: "days-1-30",
        title: "Select one system with a clear modernization case",
        description:
          "Choose a workload where cloud services solve a documented business or operational problem.",
      },
      {
        id: "opportunity-cloud-design-increment",
        phase: "days-31-60",
        title: "Design and deliver one limited increment",
        description:
          "Document the target architecture, migration boundary, ownership, security, cost, and rollback plan.",
      },
      {
        id: "opportunity-cloud-validate",
        phase: "days-61-90",
        title: "Validate outcomes before expanding",
        description:
          "Measure reliability, delivery speed, support effort, and cost before committing to a broader program.",
      },
    ],
  },

  "ai-enabled-workflows": {
    opportunityId: "ai-enabled-workflows",
    summary:
      "Move from exploration to a controlled production pilot only where source quality, governance, and human accountability are sufficient.",
    actions: [
      {
        id: "opportunity-ai-select-task",
        phase: "days-1-30",
        title: "Select one source-grounded task",
        description:
          "Choose a task with approved knowledge sources, human review, and a measurable current-state baseline.",
      },
      {
        id: "opportunity-ai-pilot",
        phase: "days-31-60",
        title: "Run a controlled production pilot",
        description:
          "Track traceability, quality, reviewer effort, cost, and operational failures.",
      },
      {
        id: "opportunity-ai-expand",
        phase: "days-61-90",
        title: "Expand only when evidence supports it",
        description:
          "Use measured value and manageable risk, not novelty, to determine whether the use case should grow.",
      },
    ],
  },

  "reliability-improvement": {
    opportunityId: "reliability-improvement",
    summary:
      "Improve one critical service through explicit indicators, actionable alerts, ownership, and tested recovery.",
    actions: [
      {
        id: "opportunity-reliability-define",
        phase: "days-1-30",
        title: "Define reliability expectations",
        description:
          "Select a critical service and define meaningful health indicators, ownership, and recovery expectations.",
      },
      {
        id: "opportunity-reliability-monitor",
        phase: "days-31-60",
        title: "Add actionable monitoring",
        description:
          "Implement alerts tied to a clear responder, escalation path, and expected action.",
      },
      {
        id: "opportunity-reliability-test",
        phase: "days-61-90",
        title: "Test rollback or recovery",
        description:
          "Measure actual recovery performance and improve the operating procedure.",
      },
    ],
  },

  "technical-operating-model": {
    opportunityId: "technical-operating-model",
    summary:
      "Clarify which capabilities should remain internal and where specialist support provides better value.",
    actions: [
      {
        id: "opportunity-technical-map",
        phase: "days-1-30",
        title: "Map ownership and capability boundaries",
        description:
          "Identify decision rights, internal responsibilities, external responsibilities, and unresolved gaps.",
      },
      {
        id: "opportunity-technical-align",
        phase: "days-31-60",
        title: "Align support to business criticality",
        description:
          "Retain internal governance while using external support for uncommon or uneconomical specialties.",
      },
      {
        id: "opportunity-technical-govern",
        phase: "days-61-90",
        title: "Test and govern the support model",
        description:
          "Review performance, documentation, escalation, portability, and knowledge transfer.",
      },
    ],
  },
};

export const criticalOverrides: Readonly<
  Record<CriticalCapabilityId, CriticalOverride>
> = {
  "data-quality-detection": {
    capability: "data-quality-detection",
    title: "Add data validation before expanding analytics or AI",
    description:
      "Define practical checks and accountable issue resolution so incorrect information is detected before publication or automated use.",
    blocks: ["analytics-modernization", "ai-enabled-workflows"],
  },
  "exception-handling": {
    capability: "exception-handling",
    title: "Document exception paths before broader automation",
    description:
      "Define common exceptions, decision rules, owners, and escalation paths before increasing automation scope.",
    blocks: ["workflow-automation"],
  },
  "access-management": {
    capability: "access-management",
    title: "Review privileged access before system expansion",
    description:
      "Remove unnecessary access, eliminate shared credentials where possible, and establish approval and review ownership.",
    blocks: ["cloud-modernization", "ai-enabled-workflows"],
  },
  "monitoring-alerting": {
    capability: "monitoring-alerting",
    title: "Add basic health and failure alerting",
    description:
      "Ensure critical failures are detected through actionable monitoring rather than user reports.",
    blocks: [
      "workflow-automation",
      "cloud-modernization",
      "reliability-improvement",
    ],
  },
  "production-change-control": {
    capability: "production-change-control",
    title: "Introduce controlled and repeatable production changes",
    description:
      "Use version control, review, validation, documented deployment, and rollback before accelerating delivery.",
    blocks: ["cloud-modernization", "reliability-improvement"],
  },
  "recovery-preparedness": {
    capability: "recovery-preparedness",
    title: "Test backup restoration or rollback",
    description:
      "Validate that critical services can recover within business expectations before adding complexity.",
    blocks: ["cloud-modernization", "reliability-improvement"],
  },
  "ai-output-review": {
    capability: "ai-output-review",
    title: "Require accountable human review for AI outputs",
    description:
      "Define approved use, review depth, source expectations, and accountable decision-makers before expanding AI use.",
    blocks: ["ai-enabled-workflows"],
  },
  "ai-workflow-monitoring": {
    capability: "ai-workflow-monitoring",
    title: "Define AI quality, cost, and misuse monitoring",
    description:
      "Track operational quality, adoption, cost, failures, and inappropriate use before moving beyond limited pilots.",
    blocks: ["ai-enabled-workflows"],
  },
  "technical-ownership": {
    capability: "technical-ownership",
    title: "Assign an accountable internal technology owner",
    description:
      "Retain clear decision authority internally before commissioning new technical work or expanding external support.",
    blocks: [
      "analytics-modernization",
      "workflow-automation",
      "cloud-modernization",
      "ai-enabled-workflows",
      "reliability-improvement",
    ],
  },
  "knowledge-staffing-continuity": {
    capability: "knowledge-staffing-continuity",
    title: "Document critical knowledge and establish backup ownership",
    description:
      "Reduce dependence on one employee or vendor through documentation, cross-training, and support portability.",
    blocks: [
      "cloud-modernization",
      "ai-enabled-workflows",
      "technical-operating-model",
    ],
  },
};

export const deliveryModels: Readonly<
  Record<MaturityLevel, DeliveryModel>
> = {
  Reactive: {
    id: "managed-support",
    maturityLevel: "Reactive",
    name: "Internal business owner with managed technical support",
    summary:
      "Retain accountable internal ownership while using a managed provider for routine operation and support.",
    recommendations: [
      "Assign one internal owner with decision authority.",
      "Require documentation, access transparency, service reporting, and knowledge transfer.",
      "Do not fully outsource architecture or vendor-governance responsibility.",
    ],
  },
  Emerging: {
    id: "hybrid-implementation",
    maturityLevel: "Emerging",
    name: "Hybrid model with external implementation support",
    summary:
      "Keep business ownership and prioritization internal while using outside specialists for architecture, security, integration, or implementation.",
    recommendations: [
      "Define the internal owner before engaging outside delivery support.",
      "Require maintainable documentation and staff knowledge transfer.",
      "Use contracts and escalation paths that make responsibilities explicit.",
    ],
  },
  Managed: {
    id: "internal-targeted-specialists",
    maturityLevel: "Managed",
    name: "Internally led with targeted specialists",
    summary:
      "Keep architecture and delivery internally owned while using specialists for narrow capability gaps.",
    recommendations: [
      "Use specialists for uncommon needs such as AI governance, cloud security, or advanced integration.",
      "Avoid broad managed-service contracts unless operational capacity is the real constraint.",
      "Retain internal decision rights and operating knowledge.",
    ],
  },
  Scalable: {
    id: "internal-selective-review",
    maturityLevel: "Scalable",
    name: "Internal delivery with selective expert review",
    summary:
      "Keep implementation and operations internal while using external experts for independent review, acceleration, or uncommon specialties.",
    recommendations: [
      "Focus outside spending on challenge, validation, and temporary acceleration.",
      "Use independent review for high-risk or unfamiliar decisions.",
      "Avoid outsourcing routine delivery the internal team already performs well.",
    ],
  },
};
