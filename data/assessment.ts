export type MaturityScore = 1 | 2 | 3 | 4;

export type MaturityLevel =
  | "Reactive"
  | "Emerging"
  | "Managed"
  | "Scalable";

export type AssessmentDomainId =
  | "data-reporting"
  | "workflow-automation"
  | "cloud-architecture"
  | "governance-reliability"
  | "ai-knowledge-workflows"
  | "technical-capability-support";

export type CriticalCapabilityId =
  | "data-quality-detection"
  | "exception-handling"
  | "access-management"
  | "monitoring-alerting"
  | "production-change-control"
  | "recovery-preparedness"
  | "ai-output-review"
  | "ai-workflow-monitoring"
  | "technical-ownership"
  | "knowledge-staffing-continuity";

export interface AssessmentOption {
  score: MaturityScore;
  level: MaturityLevel;
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  number: number;
  domainId: AssessmentDomainId;
  prompt: string;
  options: readonly AssessmentOption[];
  criticalCapability?: CriticalCapabilityId;
}

export interface AssessmentDomain {
  id: AssessmentDomainId;
  name: string;
  shortName: string;
  purpose: string;
  questions: readonly AssessmentQuestion[];
}

export interface AssessmentMetadata {
  title: string;
  description: string;
  estimatedMinutes: number;
  questionCount: number;
  domainCount: number;
}

export const assessmentMetadata: AssessmentMetadata = {
  title: "Operational Modernization Readiness Assessment",
  description:
    "Identify the capabilities limiting your organization’s next stage of modernization and receive a prioritized path for what to stabilize, standardize, automate, scale, or optimize next.",
  estimatedMinutes: 10,
  questionCount: 24,
  domainCount: 6,
};

export const maturityLevels: Readonly<
  Record<MaturityScore, { level: MaturityLevel; summary: string }>
> = {
  1: {
    level: "Reactive",
    summary:
      "Work depends heavily on individuals, manual effort, or informal practices.",
  },
  2: {
    level: "Emerging",
    summary:
      "Some repeatable practices exist, but they are inconsistent or incomplete.",
  },
  3: {
    level: "Managed",
    summary:
      "Processes are standardized, owned, measured, and generally reliable.",
  },
  4: {
    level: "Scalable",
    summary:
      "Capabilities are integrated, governed, resilient, and designed to grow.",
  },
};

export const assessmentDomains: readonly AssessmentDomain[] = [
  {
    id: "data-reporting",
    name: "Data and Reporting",
    shortName: "Data",
    purpose:
      "Evaluate whether reporting is consistent, trustworthy, repeatable, and connected to business decisions.",
    questions: [
      {
        id: "q1",
        number: 1,
        domainId: "data-reporting",
        prompt:
          "How consistently are important business metrics defined across teams?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Different teams frequently use the same metric names with different definitions, and disagreements are resolved manually.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some important metrics are documented, but definitions are incomplete, inconsistently applied, or maintained by individual teams.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Core metrics have documented definitions, identified owners, and are used consistently across most reporting.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Metrics are centrally governed, versioned, traceable to source data, and reviewed through a defined change process.",
          },
        ],
      },
      {
        id: "q2",
        number: 2,
        domainId: "data-reporting",
        prompt: "How are recurring reports and dashboards produced?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Reports are created manually when requested and depend heavily on individual knowledge or spreadsheet work.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Recurring reports exist, but they still require manual file preparation, reconciliation, or intervention.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Most recurring reporting follows standardized processes and scheduled data refreshes, with documented handling for common exceptions.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Reporting pipelines are automated, monitored, owned, and designed to recover from failures with minimal manual intervention.",
          },
        ],
      },
      {
        id: "q3",
        number: 3,
        domainId: "data-reporting",
        prompt:
          "How does the organization detect and address data-quality problems?",
        criticalCapability: "data-quality-detection",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Problems are usually discovered by report users after incorrect or incomplete information has already been published.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Teams perform some manual checks, but validation varies by report, analyst, or reporting cycle.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Important datasets have defined validation checks, accountable owners, and documented processes for resolving issues.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Data quality is monitored automatically using validation rules, lineage, alerting, and a defined incident-response process.",
          },
        ],
      },
      {
        id: "q4",
        number: 4,
        domainId: "data-reporting",
        prompt: "How directly does reporting support business decisions?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Reporting mainly summarizes past activity, and users must determine independently what action to take.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some reports are used in recurring decisions, but measures, thresholds, and expected actions are not consistently defined.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Reports and dashboards are designed around specific business questions, decision points, and accountable users.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Reporting is integrated into operational workflows with defined thresholds, recommended actions, measurable outcomes, and feedback loops.",
          },
        ],
      },
    ],
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    shortName: "Automation",
    purpose:
      "Evaluate whether recurring work is standardized, visible, and appropriately automated without hiding exceptions or accountability.",
    questions: [
      {
        id: "q5",
        number: 5,
        domainId: "workflow-automation",
        prompt: "How are repetitive operational tasks currently performed?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Most recurring tasks are completed manually, depend on individual memory, and are difficult to transfer when someone is unavailable.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some tasks use templates, macros, or point solutions, but the overall process still depends on manual coordination.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "High-volume and repetitive tasks are standardized, documented, and automated where the business rules are sufficiently clear.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Automation is integrated across systems, monitored for failures, and designed to scale without creating hidden manual work.",
          },
        ],
      },
      {
        id: "q6",
        number: 6,
        domainId: "workflow-automation",
        prompt:
          "How are handoffs between people, teams, or systems managed?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Handoffs rely on email, chat messages, spreadsheets, or informal follow-up, making ownership and status difficult to track.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some handoffs use shared tools or checklists, but delays and missed steps still require frequent manual intervention.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Handoffs follow defined workflows with clear owners, statuses, required inputs, and escalation paths.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Handoffs are orchestrated across systems with automated routing, service expectations, exception alerts, and end-to-end visibility.",
          },
        ],
      },
      {
        id: "q7",
        number: 7,
        domainId: "workflow-automation",
        prompt: "How are exceptions and unusual cases handled?",
        criticalCapability: "exception-handling",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Exceptions are handled differently each time and often require finding the right person who knows what to do.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Common exceptions are recognized, but resolution steps are only partially documented or inconsistently followed.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Common exceptions have documented decision rules, assigned owners, and defined escalation procedures.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Exceptions are detected automatically, routed based on risk and complexity, tracked through resolution, and used to improve the process.",
          },
        ],
      },
      {
        id: "q8",
        number: 8,
        domainId: "workflow-automation",
        prompt: "How is the success of an automated workflow evaluated?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Automation is considered successful if it runs, even if its effect on time, quality, risk, or user experience is unknown.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Teams track some operational measures, but baselines and expected outcomes are not consistently defined.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Automations have documented objectives, owners, baselines, and measures such as time saved, error reduction, or cycle-time improvement.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Automation performance is monitored continuously, connected to business outcomes, and reviewed to identify further optimization opportunities.",
          },
        ],
      },
    ],
  },
  {
    id: "cloud-architecture",
    name: "Cloud Architecture",
    shortName: "Cloud",
    purpose:
      "Evaluate whether cloud services are selected and operated intentionally, with clear ownership, appropriate controls, and room to scale.",
    questions: [
      {
        id: "q9",
        number: 9,
        domainId: "cloud-architecture",
        prompt: "How are cloud services selected for new solutions?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Services are chosen based on familiarity, urgency, or individual preference, with limited comparison of cost, security, or operational fit.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Teams consider multiple options, but decisions are inconsistent and are not always documented.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Service selection follows defined criteria that consider business requirements, integration, security, cost, scalability, and support needs.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Architecture decisions are documented, reviewed, and informed by reusable standards, approved patterns, and lessons from prior implementations.",
          },
        ],
      },
      {
        id: "q10",
        number: 10,
        domainId: "cloud-architecture",
        prompt:
          "How are development, testing, and production environments managed?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Work is performed in shared or production-like environments, and changes may be tested manually after deployment.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some environment separation exists, but configuration and deployment practices vary across projects.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Development, testing, and production environments are clearly separated, with controlled configuration and repeatable deployment processes.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Environments are provisioned consistently through automation, governed by policy, and designed to minimize configuration drift.",
          },
        ],
      },
      {
        id: "q11",
        number: 11,
        domainId: "cloud-architecture",
        prompt: "How are cloud costs understood and controlled?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Costs are reviewed only after unexpected charges or budget concerns arise.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Basic budgets or alerts exist, but ownership, allocation, and optimization practices are inconsistent.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Cloud costs are tracked by service, project, or owner, with budgets, alerts, and periodic optimization reviews.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Cost management is embedded in architecture decisions, usage is forecast and attributed, and optimization is treated as an ongoing engineering responsibility.",
          },
        ],
      },
      {
        id: "q12",
        number: 12,
        domainId: "cloud-architecture",
        prompt:
          "How well can cloud solutions adapt to growth, failure, or changing requirements?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Solutions depend on manual scaling, individual knowledge, or tightly coupled components that are difficult to change.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some services can scale or recover automatically, but resilience and capacity planning are inconsistent.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Solutions are designed with clear service boundaries, appropriate scaling, monitoring, backups, and documented recovery expectations.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Architectures are modular, observable, resilient by design, and regularly reviewed against performance, availability, recovery, and growth requirements.",
          },
        ],
      },
    ],
  },
  {
    id: "governance-reliability",
    name: "Governance and Reliability",
    shortName: "Governance",
    purpose:
      "Evaluate whether systems are controlled, observable, recoverable, and supported by clear ownership.",
    questions: [
      {
        id: "q13",
        number: 13,
        domainId: "governance-reliability",
        prompt: "How are access permissions managed?",
        criticalCapability: "access-management",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Access is granted informally, shared accounts may be used, and permissions are reviewed mainly when a problem occurs.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Individual accounts and role-based access exist in some systems, but reviews and removal processes are inconsistent.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Access follows documented roles, least-privilege principles, approval processes, and periodic reviews.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Identity and access controls are centrally governed, automated where appropriate, continuously monitored, and integrated with employee lifecycle processes.",
          },
        ],
      },
      {
        id: "q14",
        number: 14,
        domainId: "governance-reliability",
        prompt:
          "How are system health, failures, and service performance monitored?",
        criticalCapability: "monitoring-alerting",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Problems are usually discovered when users report that something is unavailable, incorrect, or delayed.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Basic logs, alerts, or dashboards exist, but coverage and response expectations vary by system.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Important services have defined health indicators, actionable alerts, accountable responders, and documented escalation procedures.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Monitoring is tied to service objectives, alerts are tested and prioritized, trends are reviewed, and incidents drive measurable reliability improvements.",
          },
        ],
      },
      {
        id: "q15",
        number: 15,
        domainId: "governance-reliability",
        prompt: "How are production changes reviewed and deployed?",
        criticalCapability: "production-change-control",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Changes may be made directly in production with limited testing, documentation, or approval.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some changes use tickets, peer review, or test environments, but practices vary by team and urgency.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Production changes follow version control, peer review, automated validation, approval, and documented deployment procedures.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Changes move through standardized automated pipelines with policy checks, rollback capability, traceability, and measurable deployment performance.",
          },
        ],
      },
      {
        id: "q16",
        number: 16,
        domainId: "governance-reliability",
        prompt:
          "How prepared is the organization to recover from failures or disruptions?",
        criticalCapability: "recovery-preparedness",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Recovery depends on individual knowledge, and backups or restoration procedures may be incomplete or untested.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Backups and recovery procedures exist for some systems, but ownership, recovery targets, and testing are inconsistent.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Critical systems have documented recovery objectives, tested backups, assigned owners, and defined continuity procedures.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Recovery is engineered into the architecture, tested regularly, measured against business requirements, and improved through simulations and incident reviews.",
          },
        ],
      },
    ],
  },
  {
    id: "ai-knowledge-workflows",
    name: "AI and Knowledge Workflows",
    shortName: "AI",
    purpose:
      "Evaluate whether the organization has the information quality, governance, human oversight, and operational discipline needed to use AI responsibly and effectively.",
    questions: [
      {
        id: "q17",
        number: 17,
        domainId: "ai-knowledge-workflows",
        prompt:
          "How ready is the organization’s information for AI-enabled use?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Important knowledge is scattered across inboxes, shared drives, personal files, and undocumented processes.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some information is centralized, but content quality, ownership, versioning, and searchability are inconsistent.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Priority knowledge sources are organized, current, owned, and accessible through defined repositories and permissions.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Knowledge is structured, governed, searchable, traceable, and maintained through defined lifecycle and quality processes.",
          },
        ],
      },
      {
        id: "q18",
        number: 18,
        domainId: "ai-knowledge-workflows",
        prompt: "How are AI use cases selected?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "AI tools are adopted mainly because they are available or popular, without clear business problems, controls, or success measures.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Teams experiment with promising use cases, but prioritization, ownership, and expected value are inconsistent.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "AI initiatives are selected against defined business needs, feasibility, risk, data readiness, and measurable outcomes.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "AI opportunities are managed through a repeatable portfolio process with prioritization, governance, experimentation, and value realization.",
          },
        ],
      },
      {
        id: "q19",
        number: 19,
        domainId: "ai-knowledge-workflows",
        prompt: "How are AI-generated outputs reviewed and trusted?",
        criticalCapability: "ai-output-review",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Users may accept AI-generated outputs without consistent verification or awareness of limitations.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Human review is encouraged, but standards vary by user, team, or use case.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "AI outputs have defined review requirements, approved uses, source expectations, and accountable human decision-makers.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Review depth is matched to risk, outputs are traceable to approved sources, quality is measured, and controls are continuously improved.",
          },
        ],
      },
      {
        id: "q20",
        number: 20,
        domainId: "ai-knowledge-workflows",
        prompt:
          "How are AI-enabled workflows monitored after implementation?",
        criticalCapability: "ai-workflow-monitoring",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "AI tools are deployed or adopted without ongoing monitoring of accuracy, drift, cost, misuse, or business impact.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Teams review issues when they arise, but monitoring and ownership are not consistently defined.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "AI workflows have accountable owners, usage monitoring, quality checks, cost tracking, and documented escalation procedures.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "AI performance, risk, adoption, cost, and business outcomes are monitored continuously and used to improve prompts, models, controls, and workflows.",
          },
        ],
      },
    ],
  },
  {
    id: "technical-capability-support",
    name: "Technical Capability and Support Model",
    shortName: "Technical Capability",
    purpose:
      "Evaluate whether the organization has the internal capability, external support relationships, technical ownership, and continuity needed to operate and improve its systems effectively.",
    questions: [
      {
        id: "q21",
        number: 21,
        domainId: "technical-capability-support",
        prompt:
          "How well do internal technical capabilities match the systems the organization depends on?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Critical systems depend on individuals with limited backup, and the organization often lacks the expertise needed to diagnose or resolve problems.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "The team can handle routine issues, but more complex problems frequently require outside help or extended troubleshooting.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Internal capabilities are aligned to the organization’s core systems, with clear escalation paths for specialized or infrequent needs.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "The organization deliberately balances internal expertise, external specialists, and managed services based on business criticality, risk, and cost.",
          },
        ],
      },
      {
        id: "q22",
        number: 22,
        domainId: "technical-capability-support",
        prompt: "How clearly are technical responsibilities assigned?",
        criticalCapability: "technical-ownership",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Ownership is unclear, and technical issues are often passed between employees, vendors, or departments until someone takes responsibility.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Primary contacts are known for some systems, but responsibilities for maintenance, security, integration, and improvement are not consistently defined.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Critical systems have documented owners, support responsibilities, decision rights, and escalation paths.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "Ownership is defined across the full service lifecycle, including strategy, architecture, operations, security, vendor management, and continuous improvement.",
          },
        ],
      },
      {
        id: "q23",
        number: 23,
        domainId: "technical-capability-support",
        prompt:
          "How does the organization decide which technical problems to manage internally versus through external support?",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Decisions are made case by case during incidents, often based on who is available rather than the type or risk of the problem.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some informal boundaries exist, but internal teams and vendors may duplicate effort or assume the other party is responsible.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "The organization has defined support boundaries based on expertise, urgency, system criticality, cost, and contractual responsibilities.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "The sourcing model is reviewed regularly, vendor performance is measured, escalation procedures are tested, and internal teams retain enough knowledge to govern external providers effectively.",
          },
        ],
      },
      {
        id: "q24",
        number: 24,
        domainId: "technical-capability-support",
        prompt:
          "How resilient is the organization’s technical knowledge and staffing model?",
        criticalCapability: "knowledge-staffing-continuity",
        options: [
          {
            score: 1,
            level: "Reactive",
            description:
              "Important knowledge is concentrated in one person or vendor, and absences or turnover can significantly disrupt operations.",
          },
          {
            score: 2,
            level: "Emerging",
            description:
              "Some documentation and cross-training exist, but key systems still depend on a small number of people.",
          },
          {
            score: 3,
            level: "Managed",
            description:
              "Critical knowledge is documented, responsibilities have backups, and capacity or skills gaps are reviewed periodically.",
          },
          {
            score: 4,
            level: "Scalable",
            description:
              "The organization actively manages succession, cross-training, documentation, workforce capacity, and future skill requirements as part of technology planning.",
          },
        ],
      },
    ],
  },
];

export const assessmentQuestions: readonly AssessmentQuestion[] =
  assessmentDomains.flatMap((domain) => domain.questions);

export const assessmentDomainById = Object.fromEntries(
  assessmentDomains.map((domain) => [domain.id, domain]),
) as Record<AssessmentDomainId, AssessmentDomain>;

export const assessmentQuestionById = Object.fromEntries(
  assessmentQuestions.map((question) => [question.id, question]),
) as Record<string, AssessmentQuestion>;
