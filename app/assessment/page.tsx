import type { Metadata } from "next";

import Assessment from "../../components/assessment/Assessment";
import "../../components/assessment/assessment.css";

export const metadata: Metadata = {
  title: "Operational Modernization Readiness Assessment",
  description:
    "Evaluate your organization’s readiness across data, automation, cloud architecture, governance, AI, and technical support, then receive a prioritized modernization roadmap.",
};

export default function AssessmentPage() {
  return (
    <div className="assessment-page site-shell">
      <Assessment />
    </div>
  );
}
