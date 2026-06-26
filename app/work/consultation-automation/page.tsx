import Link from "next/link";

const technologies = [
  "Google Forms",
  "Apps Script",
  "Cloud Run",
  "Vertex AI",
  "Google Workspace",
  "GitHub Actions",
];

export default function ConsultationAutomationCaseStudy() {
  return (
    <>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/work"
            className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            ← Back to selected work
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Workflow automation case study
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Automated Consultation Intelligence Workflow
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
            An event-driven workflow that converts structured client intake
            responses into a tailored consultation preparation brief within
            minutes.
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
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Business problem
            </p>
            <p className="mt-3 leading-7 text-slate-300">
              Consultation preparation required repetitive manual research,
              document review, and assembly before every client meeting.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Solution
            </p>
            <p className="mt-3 leading-7 text-slate-300">
              A cloud-based workflow uses intake responses to trigger research,
              generate structured analysis, and prepare a customized briefing
              document.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Outcome
            </p>
            <p className="mt-3 leading-7 text-slate-300">
              A tailored consultation brief can be generated within minutes of
              a client submitting the intake form.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          <section>
            <h2 className="text-3xl font-semibold text-white">The problem</h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
              <p>
                Preparing for a consultation involves more than reviewing a
                calendar invitation. Useful preparation requires understanding
                the client&apos;s organization, stated needs, operating
                environment, likely constraints, and relevant technical
                options.
              </p>

              <p>
                Performing that research manually for every meeting creates
                inconsistent results and consumes time that could instead be
                spent evaluating the client&apos;s problem and preparing
                meaningful recommendations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white">
              Design objectives
            </h2>

            <ul className="mt-6 space-y-4 text-lg leading-8 text-slate-300">
              <li>
                • Standardize the information collected before a consultation.
              </li>
              <li>
                • Trigger preparation automatically when the client completes
                the intake form.
              </li>
              <li>
                • Use client responses to guide external research and analysis.
              </li>
              <li>
                • Produce a consistent but client-specific briefing document.
              </li>
              <li>
                • Minimize manual intervention while preserving human review.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white">
              Solution architecture
            </h2>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-6">
              <pre className="min-w-max text-sm leading-7 text-slate-300">
{`Client booking request
        │
        ▼
Google Forms intake
        │
        ▼
Apps Script event trigger
        │
        ▼
Cloud Run research service
        │
        ├── Structured intake data
        ├── Open-source research
        └── Vertex AI analysis
        │
        ▼
Google Workspace briefing document
        │
        ▼
Human review before consultation`}
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white">
              Key architectural choices
            </h2>

            <div className="mt-8 grid gap-6">
              <div className="rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Google Forms for structured intake
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Forms provides a low-friction way for clients to submit
                  consistent information without requiring a custom
                  authentication system or application interface.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Apps Script for Workspace orchestration
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Apps Script connects the intake workflow to Google Workspace
                  and initiates downstream processing when a form response is
                  received.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Cloud Run for application logic
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Cloud Run provides a managed execution environment for
                  research, processing, and integration logic without requiring
                  permanent server infrastructure.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-semibold text-white">
                  Vertex AI for structured analysis
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Vertex AI uses the client&apos;s submitted context and
                  gathered research to help organize findings into a repeatable
                  consultation briefing structure.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 p-6">
                <h3 className="text-xl font-semibold text-white">
                  GitHub Actions for automated deployment
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Application changes are version controlled and deployed
                  through an automated pipeline rather than manually uploaded
                  to the production environment.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-white">
              Result and business value
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
              <p>
                The workflow can produce a tailored preparation brief within
                minutes of the client submitting the intake form.
              </p>

              <p>
                The primary value is not simply speed. The workflow creates a
                repeatable preparation standard, reduces omitted information,
                and frees the consultant to spend more time evaluating the
                client&apos;s situation rather than assembling background
                material.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-8">
            <h2 className="text-2xl font-semibold text-white">
              What this project demonstrates
            </h2>

            <ul className="mt-5 space-y-3 leading-7 text-slate-300">
              <li>• Event-driven application design</li>
              <li>• Google Workspace and Google Cloud integration</li>
              <li>• Managed serverless architecture</li>
              <li>• AI-assisted workflow automation</li>
              <li>• CI/CD through GitHub Actions</li>
              <li>• Translation of business needs into technical design</li>
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}