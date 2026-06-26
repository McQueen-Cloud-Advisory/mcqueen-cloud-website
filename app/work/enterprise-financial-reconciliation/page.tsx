import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise Financial Reconciliation Automation",
  description:
    "An anonymized enterprise case study showing how Python, Azure Synapse, serverless SQL, and Power BI reduced manual financial reconciliation work.",
};

const technologies = [
  "Azure Synapse",
  "Python",
  "Azure Blob Storage",
  "Serverless SQL",
  "Power BI Report Builder",
  "SQL",
];

const metrics = [
  {
    value: "~30",
    label: "Manual hours reduced monthly",
  },
  {
    value: "1",
    label: "Repeatable reconciliation pipeline",
  },
  {
    value: "Monthly",
    label: "Controlled reporting cycle",
  },
];

const objectives = [
  "Reduce repetitive manual file preparation and consolidation.",
  "Create a consistent transformation process across monthly reporting periods.",
  "Preserve traceability between source records and reported results.",
  "Separate processing logic from the final presentation layer.",
  "Support repeatable review and exception investigation.",
  "Produce reporting output suitable for an established financial process.",
];

const architectureSteps = [
  {
    title: "Monthly source files",
    description:
      "Financial source files and supporting records arrive for the reporting period.",
  },
  {
    title: "Azure Blob Storage",
    description:
      "Files are retained in a controlled cloud-storage location for processing and reference.",
  },
  {
    title: "Synapse notebooks",
    description:
      "Python notebooks extract, standardize, validate, and consolidate the source records.",
  },
  {
    title: "Structured reconciliation data",
    description:
      "Processed records are converted into consistent tabular structures for analysis.",
  },
  {
    title: "Serverless SQL layer",
    description:
      "SQL views expose governed reconciliation data without requiring a dedicated database server.",
  },
  {
    title: "Power BI Report Builder",
    description:
      "Paginated reporting provides review-ready output for the monthly financial process.",
  },
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
        <header className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/work"
              className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              ← Back to selected work
            </Link>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Anonymized enterprise case study
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Enterprise Financial Reconciliation Automation
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
              A monthly financial reconciliation was redesigned as a
              repeatable data pipeline, reducing manual preparation while
              preserving review, traceability, and exception visibility.
            </p>

            <ul className="mt-10 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-300"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-16 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-4xl font-bold text-white">{metric.value}</p>

                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-20">
            <section>
              <h2 className="text-3xl font-semibold text-white">
                The operating problem
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
                <p>
                  The monthly reconciliation depended on significant manual
                  preparation. Source files had to be collected, converted,
                  standardized, combined, and reviewed before the financial
                  comparison could be completed.
                </p>

                <p>
                  The work was repetitive but still sensitive. Errors in file
                  preparation, transformation, or period handling could affect
                  the reconciliation result and create additional review work.
                </p>

                <p>
                  The objective was therefore not simply to make the process
                  faster. It was to make the preparation more consistent and
                  traceable without hiding the exceptions that required human
                  judgment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Design objectives
              </h2>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {objectives.map((objective) => (
                  <li
                    key={objective}
                    className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 leading-7 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 font-semibold text-blue-400"
                    >
                      ✓
                    </span>

                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Solution architecture
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                The design separates original source files, transformation
                logic, structured data, query access, and reporting output.
              </p>

              <div className="mt-10 space-y-4">
                {architectureSteps.map((step, index) => (
                  <div key={step.title}>
                    <div className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-400/10 font-semibold text-blue-300">
                        {index + 1}
                      </span>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>

                        <p className="mt-2 leading-7 text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {index < architectureSteps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="py-2 text-center text-blue-400"
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Processing workflow
              </h2>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-7">
                <pre className="min-w-max text-sm leading-7 text-slate-300">
{`Monthly source files
        │
        ▼
Azure Blob Storage
        │
        ▼
Synapse Python notebooks
        │
        ├── Extract records
        ├── Standardize fields
        ├── Validate formats
        ├── Consolidate periods
        └── Flag exceptions
        │
        ▼
Structured reconciliation dataset
        │
        ▼
Serverless SQL views
        │
        ▼
Paginated financial report
        │
        ▼
Human review and investigation`}
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Key architectural decisions
              </h2>

              <div className="mt-8 grid gap-6">
                {decisions.map((decision) => (
                  <article
                    key={decision.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {decision.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {decision.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Reliability and control considerations
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                The workflow supported a controlled financial process. That
                meant reliability and traceability were more important than
                simply producing a faster report.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {controls.map((control) => (
                  <article
                    key={control.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {control.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {control.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Result and business value
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
                <p>
                  The automated workflow reduced recurring manual preparation
                  by approximately 30 hours per month.
                </p>

                <p>
                  The larger benefit was consistency. The reconciliation no
                  longer depended on rebuilding the preparation process
                  manually during every reporting period.
                </p>

                <p>
                  Reviewers received more structured output, clearer exception
                  visibility, and a more traceable path between source files,
                  processing logic, and reported results.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Tradeoffs and limitations
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {limitations.map((limitation) => (
                  <article
                    key={limitation.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {limitation.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {limitation.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-8 sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                What this project demonstrates
              </p>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
                Automation designed around financial reliability, not just
                speed.
              </h2>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Enterprise process analysis",
                  "Python-based data transformation",
                  "Cloud storage and data lineage",
                  "Serverless SQL consumption",
                  "Paginated financial reporting",
                  "Exception-aware automation",
                  "Controlled human review",
                  "Measurable operational improvement",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 leading-7 text-slate-300"
                  >
                    <span aria-hidden="true" className="text-blue-400">
                      ✓
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/work"
                  className="rounded-md bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
                >
                  View more work
                </Link>

                <Link
                  href="/contact"
                  className="rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-400"
                >
                  Discuss a project
                </Link>
              </div>
            </section>

            <aside className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Confidentiality note
              </p>

              <p className="mt-4 leading-7 text-slate-400">
                This case study intentionally omits the organization, financial
                program, account structures, source-system identifiers,
                confidential records, and detailed internal control procedures.
              </p>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}