export type Service = {
  slug: string;
  legacySlugs?: string[];
  title: string;
  summary: string;
  scope: string;
  deliverables: string[];
  evidence: string;
  boundary: string;
};

export const services: Service[] = [
  {
    slug: "analytics-and-reporting",
    legacySlugs: ["analytics-bi-modernization"],
    title: "Analytics and Reporting",
    summary:
      "Turn scattered data into clear reporting your team can use with confidence.",
    scope:
      "Agree on measures, organize sources, build a focused report or dashboard, reconcile results, and document refresh and ownership.",
    deliverables: [
      "Metric definitions",
      "Source-to-report map",
      "Focused report or dashboard",
      "Validation evidence",
      "Refresh and ownership instructions",
    ],
    evidence:
      "Source reconciliation, stable definitions, preparation time and actual use.",
    boundary:
      "Advanced forecasting, custom machine learning and unrestricted platform migrations require separate scope.",
  },
  {
    slug: "workflow-automation",
    legacySlugs: ["ai-knowledge-workflows"],
    title: "Workflow Automation",
    summary:
      "Reduce repetitive administration and make everyday handoffs easier.",
    scope:
      "Map one recurring process, simplify steps, automate appropriate handoffs, define exceptions, and train the process owner.",
    deliverables: [
      "Current and future workflow",
      "Agreed automation",
      "Exception handling",
      "Owner instructions",
      "Handoff",
    ],
    evidence:
      "Time spent, missed steps, rework and turnaround before and after.",
    boundary:
      "Support is provided only under an agreed arrangement. Scope does not include emergency monitoring or a promise that every task can be automated.",
  },
  {
    slug: "workspace-and-systems-design",
    legacySlugs: ["google-cloud-architecture"],
    title: "Workspace and Systems Design",
    summary:
      "Organize the tools and information your team relies on.",
    scope:
      "Improve shared files, forms, permissions and information flow; design proportionate integrations where needed.",
    deliverables: [
      "Information structure",
      "Access and ownership plan",
      "Configuration or prototype",
      "Implementation roadmap",
      "Operating instructions",
    ],
    evidence:
      "Findability, consistent access, clear ownership and simpler recurring work.",
    boundary:
      "Engagements cover an agreed system or workflow. General helpdesk support, AV/production services and a full outsourced IT department are outside this offer.",
  },
];
