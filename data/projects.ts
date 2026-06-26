export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  status: string;
  featured: boolean;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "consultation-automation",
    title: "Automated Consultation Intelligence Workflow",
    summary:
      "An event-driven Google Cloud workflow that transforms client intake responses into a tailored consultation preparation brief.",
    category: "Workflow Automation",
    technologies: [
      "Google Forms",
      "Apps Script",
      "Cloud Run",
      "Vertex AI",
      "Google Workspace",
      "GitHub Actions",
    ],
    status: "Production demonstration",
    featured: true,
    outcome:
      "Generates a tailored consultation preparation brief within minutes of receiving a completed client intake form.",
  },
{
  slug: "enterprise-financial-reconciliation",
  title: "Enterprise Financial Reconciliation Automation",
  summary:
    "An anonymized enterprise implementation that converted a labor-intensive monthly financial reconciliation into a repeatable data pipeline and reporting workflow.",
  category: "Financial Data Automation",
  technologies: [
    "Azure Synapse",
    "Python",
    "Azure Blob Storage",
    "Serverless SQL",
    "Power BI Report Builder",
    "SQL",
  ],
  status: "Anonymized enterprise case study",
  featured: false,
  outcome:
    "Reduced recurring manual effort by approximately 30 hours per month while improving traceability, consistency, and support for financial review.",
},
];