export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  technologies: string[];
  status: string;
};

export const projects: Project[] = [
  {
    slug: "consultation-automation",
    title: "Automated Consultation Intelligence Workflow",
    summary:
      "An event-driven Google Cloud workflow that transforms client intake responses into a tailored consultation preparation brief within minutes.",
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
  },
];