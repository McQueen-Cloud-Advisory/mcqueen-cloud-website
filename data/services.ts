export type Service = {
  slug: string;
  title: string;
  summary: string;
  problems: string[];
  deliverables: string[];
  result: string;
  technologies: string[];
};

export const services: Service[] = [
  {
    slug: "analytics-bi-modernization",
    title: "Analytics and BI Modernization",
    summary:
      "Replace fragile reporting processes with governed data, consistent metrics, and reporting that leaders can trust.",
    problems: [
      "Reporting depends on manual spreadsheet consolidation.",
      "Different teams calculate the same metric differently.",
      "Critical reports depend on undocumented knowledge.",
      "Existing dashboards show activity without supporting decisions.",
    ],
    deliverables: [
      "Current-state reporting and data-flow assessment",
      "Target-state analytics architecture",
      "KPI and metric definitions",
      "Semantic model or governed reporting layer",
      "Dashboard or reporting prototype",
      "Migration and implementation roadmap",
    ],
    result:
      "A clearer reporting model with less manual work, stronger metric consistency, and better traceability from source data to business decisions.",
    technologies: [
      "BigQuery",
      "dbt",
      "Looker Studio",
      "Power BI",
      "SQL",
      "Python",
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    summary:
      "Turn repetitive, disconnected work into structured processes that are easier to operate, monitor, and improve.",
    problems: [
      "Employees repeatedly copy information between systems.",
      "Requests arrive through inconsistent channels.",
      "Documents, approvals, and status updates are manually coordinated.",
      "Important work depends on reminders and individual follow-up.",
    ],
    deliverables: [
      "Workflow and process assessment",
      "Trigger, action, and exception design",
      "Automated intake and notification workflows",
      "Document or report generation",
      "Operational logging and error handling",
      "Process documentation and support guidance",
    ],
    result:
      "A repeatable workflow that reduces manual coordination while preserving visibility, accountability, and human review where it matters.",
    technologies: [
      "Google Forms",
      "Apps Script",
      "Cloud Run",
      "Google Workspace",
      "Pub/Sub",
      "Python",
    ],
  },
  {
    slug: "google-cloud-architecture",
    title: "Google Cloud Architecture",
    summary:
      "Design practical cloud solutions around business requirements without introducing infrastructure the organization does not need.",
    problems: [
      "A cloud project has tools but no coherent architecture.",
      "Teams are unsure which managed services fit the requirement.",
      "Security, deployment, and operations are considered too late.",
      "A prototype needs a credible path toward production.",
    ],
    deliverables: [
      "Requirements and constraint analysis",
      "Service selection and architecture design",
      "Architecture diagrams and decision rationale",
      "Security and access-control recommendations",
      "Deployment and environment strategy",
      "Implementation roadmap or working prototype",
    ],
    result:
      "A documented cloud architecture that is proportionate to the problem, maintainable by the organization, and defensible to technical and business stakeholders.",
    technologies: [
      "Firebase",
      "Cloud Run",
      "BigQuery",
      "Cloud Storage",
      "Pub/Sub",
      "GitHub Actions",
    ],
  },
  {
    slug: "ai-knowledge-workflows",
    title: "AI-Enabled Knowledge Workflows",
    summary:
      "Apply generative AI to research, documentation, and knowledge-intensive work where the sources and review process can be clearly controlled.",
    problems: [
      "Employees spend significant time assembling background information.",
      "Useful knowledge is scattered across documents and systems.",
      "Documentation is difficult to create, maintain, or consume.",
      "AI experimentation is occurring without a defined operating process.",
    ],
    deliverables: [
      "Use-case and source-data assessment",
      "Prompt and workflow design",
      "Research or document-generation prototype",
      "Source-grounding and human-review controls",
      "Output quality and failure-mode evaluation",
      "Implementation and governance recommendations",
    ],
    result:
      "A controlled AI-assisted workflow that accelerates knowledge work without treating generated output as automatically accurate or complete.",
    technologies: [
      "Vertex AI",
      "Gemini",
      "NotebookLM",
      "Cloud Run",
      "Google Workspace",
      "Python",
    ],
  },
];