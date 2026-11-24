import type { Metadata } from "next";

import Assessment from "../../components/assessment/Assessment";
import "../../components/assessment/assessment.css";

export const metadata: Metadata = {
  title: "Operational Modernization Readiness Assessment",
  description:
    "Find a practical next step for your reporting, workflows, and systems. Explore six connected capabilities and receive a prioritized readiness profile and roadmap.",
};

export default function AssessmentPage() {
  return (
    <div className="assessment-page site-shell">
      <Assessment />
    </div>
  );
}
