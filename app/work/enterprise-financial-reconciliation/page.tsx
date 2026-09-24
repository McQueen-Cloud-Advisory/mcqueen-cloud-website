import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import "../work.css";

export const metadata: Metadata = {
  title: "Enterprise Financial Reconciliation Automation",
  description: "An anonymized enterprise case study showing how Python, Azure Synapse, serverless SQL, and Power BI reduced manual financial reconciliation work.",
};

const technologies = [
  "Azure Synapse",
  "Python",
  "Azure Blob Storage",
  "Serverless SQL",
  "Power BI Report Builder",
  "SQL",
];

const objectives = [
  "Reduce repetitive manual file preparation and consolidation.",
  "Create a consistent transformation process across monthly reporting periods.",
  "Preserve traceability between source records and reported results.",
  "Separate processing logic from the final presentation layer.",
  "Support repeatable review and exception investigation.",
  "Produce reporting output suitable for an established financial process.",
];

const decisions = [
  {
    title: "Python for repeatable transformation",
    description:
      "Python replaced repeated manual manipulation with a defined sequence of extraction, cleaning, normalization, and consolidation steps.",
  },
  {
    title: "Cloud storage for source retention",
    description:
      "Source files were stored separately from transformation logic and reporting output, supporting clearer lineage and repeatable processing.",
  },
  {
    title: "Synapse notebooks for orchestration",
    description:
      "Notebook-based processing provided a practical environment for combining Python transformations with the existing Azure analytics platform.",
  },
  {
    title: "Serverless SQL for consumption",
    description:
      "The reporting layer could query processed data using familiar SQL without requiring a continuously running dedicated warehouse.",
  },
  {
    title: "Paginated reporting for financial review",
    description:
      "Report Builder was selected because the process required structured, reviewable output rather than only an interactive dashboard.",
  },
  {
    title: "Human review remained part of the process",
    description:
      "The automation reduced preparation work but did not remove the need for review, exception analysis, or accountable approval.",
  },
];

const controls = [
  {
    title: "Source preservation",
    description:
      "Original period files were retained separately from transformed outputs.",
  },
  {
    title: "Consistent processing",
    description:
      "The same coded transformation steps were applied across reporting periods.",
  },
  {
    title: "Exception visibility",
    description:
      "Unexpected records and reconciliation differences remained visible for investigation.",
  },
  {
    title: "Traceable reporting",
    description:
      "Reported results could be connected back to structured source and transformation stages.",
  },
];

const limitations = [
  {
    title: "The case study is intentionally anonymized",
    description:
      "The organization, financial program, account structures, source systems, and detailed control procedures are not identified.",
  },
  {
    title: "Automation supported rather than replaced the control",
    description:
      "The workflow reduced preparation effort and improved consistency, but responsible reviewers still evaluated the results and exceptions.",
  },
  {
    title: "Source complexity remained",
    description:
      "Standardizing the workflow did not eliminate variation or quality problems in upstream source files.",
  },
  {
    title: "The architecture reflected the existing environment",
    description:
      "Azure services were appropriate because the organization already operated within that platform. Another organization could justify a different design.",
  },
];

export default function EnterpriseFinancialReconciliationPage() {
  return (
    <>
      <article>
        <header className="case-hero">
          <div className="site-shell">
            <Link href="/work" className="text-link text-sm">← Selected work</Link>
            <div className="case-hero-grid">
              <div>
                <p className="eyebrow">01 / Financial data automation</p>
                <h1 className="case-title">Financial reconciliation.<br /><span>Built to repeat.</span></h1>
                <p className="lede mt-7 max-w-2xl">A monthly financial process redesigned as a repeatable data pipeline, preserving the review, traceability, and exception visibility that make the result trustworthy.</p>
                <p className="work-project-status">Anonymized enterprise case study</p>
              </div>
              <aside className="case-outcome">
                <p className="eyebrow">Primary outcome</p>
                <p className="case-outcome-number">~30</p>
                <p className="case-outcome-label">Manual hours reduced monthly</p>
                <p>Approximately 30 hours moved away from recurring preparation and toward review, investigation, and financial analysis.</p>
              </aside>
            </div>
          </div>
        </header>

        <section className="case-summary" aria-label="Operating signals">
          <dl className="site-shell case-summary-grid">
            <div className="case-summary-item"><dt>Operating signals / cadence</dt><dd>One repeatable monthly reporting cycle</dd></div>
            <div className="case-summary-item"><dt>Design priority</dt><dd>Traceability from source to reported result</dd></div>
            <div className="case-summary-item"><dt>Accountability</dt><dd>Human review and exception investigation retained</dd></div>
          </dl>
        </section>

        <div className="site-shell case-story">
          <section className="case-section">
            <p className="case-section-label"><span>01</span> The operating problem</p>
            <div>
              <h2>Less preparation.<br />More room for judgment.</h2>
              <div className="case-prose">
                <p>Every month, source files had to be collected, converted, standardized, combined, and reviewed before the financial comparison could begin. Repeating that preparation consumed time and introduced opportunities for error.</p>
                <p>The work was also sensitive. Problems in file preparation, transformation, or period handling could affect the reconciliation itself. The objective was a consistent, traceable process that kept exceptions visible to the people responsible for reviewing them.</p>
              </div>
              <ul className="case-objectives">{objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>02</span> Solution architecture</p>
            <div>
              <h2>A clear path from source to review.</h2>
              <div className="case-prose"><p>Original files, transformation logic, structured data, query access, and reporting each have a distinct place in the system. The stages below follow the implemented Azure workflow.</p></div>
              <div className="case-diagram"><ProjectDiagram kind="financial" /></div>
              <div className="case-prose"><p>Synapse Python notebooks extract records, standardize fields, validate formats, consolidate periods, and flag exceptions. Serverless SQL views expose the resulting reconciliation data to paginated financial reporting.</p></div>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>03</span> Architectural decisions</p>
            <div>
              <h2>Every component has a reason.</h2>
              <div className="case-decisions">{decisions.map((decision) => (
                <div className="case-decision" key={decision.title}><h3>{decision.title}</h3><p>{decision.description}</p></div>
              ))}</div>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>04</span> Outcome and controls</p>
            <div>
              <h2>Consistency is part of the outcome.</h2>
              <div className="case-prose">
                <p>The automated workflow reduced recurring manual preparation by approximately 30 hours per month. That time shifted toward reviewing exceptions, investigating differences, and evaluating the financial result.</p>
                <p>The reconciliation no longer depended on rebuilding the preparation process manually each period. Reviewers received structured output and a clearer path between source files, processing logic, and reported results.</p>
              </div>
              <div className="case-decisions">{controls.map((control) => (
                <div className="case-decision" key={control.title}><h3>{control.title}</h3><p>{control.description}</p></div>
              ))}</div>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>05</span> Technical implementation</p>
            <div>
              <h2>The engine behind the result.</h2>
              <div className="case-prose"><p>The technology stack reflected the organization&apos;s existing Azure environment and the need for repeatable transformation, governed query access, source retention, and review-ready reporting.</p></div>
              <ul className="case-technologies">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>06</span> Tradeoffs and limitations</p>
            <div>
              <h2>What the system still depends on.</h2>
              <div className="case-decisions">{limitations.map((limitation) => (
                <div className="case-decision" key={limitation.title}><h3>{limitation.title}</h3><p>{limitation.description}</p></div>
              ))}</div>
              <aside className="case-note"><h3 className="eyebrow">Confidentiality note</h3><p>This case study intentionally omits the organization, financial program, account structures, source-system identifiers, confidential records, and detailed internal control procedures.</p></aside>
            </div>
          </section>

          <div className="case-next"><p className="eyebrow">Next / Workflow automation</p><Link href="/work/consultation-automation" className="text-link">From intake to a prepared conversation <span aria-hidden="true">↗</span></Link></div>
        </div>
      </article>
      <div className="site-shell pb-20">
      <AssessmentPathCta
        eyebrow="Explore the approach"
        title="A useful next step starts with the right constraint."
        description="The readiness assessment helps identify whether data quality, governance, architecture, workflow design, or internal support capability should be addressed first."
        assessmentLabel="Assess your readiness"
        contactLabel="Discuss a financial automation opportunity"
      />
      </div>
    </>
  );
}
