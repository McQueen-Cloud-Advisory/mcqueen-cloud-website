import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";

export const metadata: Metadata = {
  title: "Why This Website Uses Firebase App Hosting",
  description:
    "The requirements, alternatives, architecture, and tradeoffs behind the decision to deploy the McQueen Cloud Advisory website through Firebase App Hosting.",
};

const requirements = [
  "Support a modern Next.js application rather than a fixed website template",
  "Deploy automatically from a version-controlled GitHub repository",
  "Preserve a path toward forms, assessments, and backend integrations",
  "Remain primarily managed rather than requiring server administration",
  "Integrate naturally with Google Cloud and Firebase services",
  "Provide traceable builds and repeatable production deployments",
];

const options = [
  {
    name: "Google Sites",
    strengths:
      "Very low maintenance and appropriate for basic informational content.",
    limitation:
      "Insufficient control over application behavior, source control, automated testing, and custom integrations.",
  },
  {
    name: "Firebase Hosting",
    strengths:
      "A strong option for static websites, static assets, and single-page applications.",
    limitation:
      "The project is intended to grow beyond purely static content and may use server-rendered or backend-connected functionality.",
  },
  {
    name: "Cloud Run",
    strengths:
      "Provides extensive control over containerized applications, runtime configuration, and backend services.",
    limitation:
      "Introduces more direct infrastructure and deployment responsibility than this website currently requires.",
  },
  {
    name: "Firebase App Hosting",
    strengths:
      "Combines framework-aware builds, GitHub integration, managed deployment, and access to the broader Google Cloud ecosystem.",
    limitation:
      "Requires billing to be enabled and abstracts some of the underlying Cloud Run and build configuration.",
  },
];

const tradeoffs = [
  {
    title: "The current site is mostly static",
    description:
      "Firebase Hosting could serve the present content effectively. App Hosting was selected because the intended destination includes dynamic workflows and application features, not because every current page requires server execution.",
  },
  {
    title: "Managed infrastructure reduces direct control",
    description:
      "App Hosting makes deployment easier by managing the build and runtime path. The tradeoff is less direct control than operating a customized Cloud Run deployment.",
  },
  {
    title: "Billing must be enabled",
    description:
      "App Hosting requires a billing-enabled Firebase project. Usage and cost still need to be monitored even when the application remains small.",
  },
  {
    title: "Convenience does not replace architecture",
    description:
      "A managed platform simplifies operations, but security, data handling, service boundaries, and application design still require deliberate decisions.",
  },
];

const reconsiderationTriggers = [
  "The website becomes entirely static with no planned backend features.",
  "The application requires specialized container or networking configuration.",
  "Multiple backend services need independent deployment and scaling.",
  "Infrastructure must be managed through a broader organization-wide platform.",
  "Cost, compliance, or regional requirements no longer fit the service.",
];

export default function FirebaseAppHostingInsightPage() {
  return (
    <>
      <article>
        <header className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/insights"
              className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              ← Back to insights
            </Link>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Architecture decision
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Why This Website Uses Firebase App Hosting
            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-300">
              The platform was selected not simply because it is a Google
              product, but because it provides a proportionate path from a
              professional content site to a working cloud application.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>June 2026</span>
              <span aria-hidden="true">•</span>
              <span>7 minute read</span>
              <span aria-hidden="true">•</span>
              <span>McQueen Cloud Advisory</span>
            </div>
          </div>
        </header>

        <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Decision summary
            </p>

            <p className="mt-5 text-2xl font-semibold leading-10 text-white">
              Use Next.js with Firebase App Hosting to provide managed,
              GitHub-driven deployment today while preserving a practical path
              toward dynamic features and Google Cloud integrations later.
            </p>
          </div>
        </section>

        <div className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-20">
            <section>
              <h2 className="text-3xl font-semibold text-white">
                The website requirement
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
                <p>
                  The objective was not merely to replace one marketing page
                  with another. The website needed to become evidence that
                  McQueen Cloud Advisory can design, build, document, and
                  operate a credible cloud solution.
                </p>

                <p>
                  That means the platform must support professional content,
                  case studies, interactive tools, secure intake workflows,
                  analytics, and future integration with the consultation
                  preparation system.
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 leading-7 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 font-semibold text-blue-400"
                    >
                      ✓
                    </span>

                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Options considered
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Each option could host some version of the site. The question
                was which one best fit both the current need and the intended
                direction without adding unjustified complexity.
              </p>

              <div className="mt-8 space-y-6">
                {options.map((option) => (
                  <article
                    key={option.name}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      {option.name}
                    </h3>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-400">
                          Strength
                        </p>

                        <p className="mt-3 leading-7 text-slate-300">
                          {option.strengths}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                          Limitation for this project
                        </p>

                        <p className="mt-3 leading-7 text-slate-400">
                          {option.limitation}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Deployment architecture
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                The source repository remains the system of record. A push to
                the production branch triggers a managed build and rollout
                rather than a manual upload.
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-5 md:items-center">
                {[
                  "Local development",
                  "GitHub main branch",
                  "Cloud Build",
                  "Cloud Run revision",
                  "App Hosting URL",
                ].map((step, index) => (
                  <div key={step} className="contents">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-center text-sm font-medium text-slate-300">
                      {step}
                    </div>

                    {index < 4 && (
                      <div
                        aria-hidden="true"
                        className="text-center text-blue-400 md:hidden"
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-7">
                <p className="leading-8 text-slate-300">
                  Firebase App Hosting uses Google-managed build and runtime
                  services beneath the Firebase interface. This preserves a
                  relatively simple developer workflow while still producing a
                  containerized deployment with traceable rollouts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Why App Hosting was selected
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-300">
                <p>
                  App Hosting was the smallest managed platform that satisfied
                  the intended direction of the website without requiring a
                  custom container deployment process from the beginning.
                </p>

                <p>
                  It supports the current Next.js application, connects the live
                  environment to GitHub, and leaves room for server-side
                  functionality, secrets, Firestore, and Cloud Run services as
                  those needs become real.
                </p>

                <p>
                  The decision is therefore based on architectural fit rather
                  than brand preference. A different project with different
                  requirements could justify Firebase Hosting, Cloud Run, or
                  another platform entirely.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Tradeoffs and limitations
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {tradeoffs.map((tradeoff) => (
                  <article
                    key={tradeoff.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7"
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {tradeoff.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-400">
                      {tradeoff.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                When the decision should be revisited
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Architecture decisions are not permanent truths. The platform
                should be reconsidered when the assumptions behind the choice
                materially change.
              </p>

              <ul className="mt-8 space-y-4">
                {reconsiderationTriggers.map((trigger) => (
                  <li
                    key={trigger}
                    className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 leading-7 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="font-semibold text-blue-400"
                    >
                      —
                    </span>

                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-white">
                Official references
              </h2>

              <p className="mt-6 leading-8 text-slate-300">
                The implementation and platform descriptions in this article
                are based on the official Firebase documentation.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="https://firebase.google.com/docs/app-hosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-800 p-5 font-semibold text-blue-400 transition hover:border-slate-600 hover:text-blue-300"
                >
                  Firebase App Hosting overview ↗
                </a>

                <a
                  href="https://firebase.google.com/docs/app-hosting/about-app-hosting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-800 p-5 font-semibold text-blue-400 transition hover:border-slate-600 hover:text-blue-300"
                >
                  How Firebase App Hosting works ↗
                </a>

                <a
                  href="https://firebase.google.com/docs/app-hosting/product-comparison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-800 p-5 font-semibold text-blue-400 transition hover:border-slate-600 hover:text-blue-300"
                >
                  App Hosting product comparison ↗
                </a>
              </div>
            </section>

            <section className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-8 sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Core lesson
              </p>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
                Choose the platform that fits the operating requirement—not the
                one with the longest feature list.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                The right architecture is the smallest design that credibly
                meets the current need while preserving a reasonable path
                toward known future requirements.
              </p>
            </section>

            <section>
              <AssessmentPathCta
                eyebrow="Evaluate your architecture in context"
                title="Not sure whether your cloud platform is the real constraint?"
                description="The readiness assessment evaluates cloud architecture alongside data, workflow, governance, AI, and internal support capability so you can identify the area most likely to limit progress before committing to a platform change."
                assessmentLabel="Assess your modernization readiness"
                contactLabel="Discuss a cloud architecture decision"
              />
            </section>
          </div>
        </div>
      </article>
    </>
  );
}