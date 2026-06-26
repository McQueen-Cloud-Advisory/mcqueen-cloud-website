import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation with McQueen Cloud Advisory or follow the company on LinkedIn and YouTube for cloud, analytics, automation, and AI content.",
};

const consultationUrl =
  "https://calendar.app.google/d9FXHWJLp8udKsvJ7";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mcqueen-cloud-advisory",
    description:
      "Follow company updates, project announcements, and practical perspectives on cloud, analytics, automation, and AI.",
    action: "Visit LinkedIn",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@McQueenCloudAdvisory",
    description:
      "Watch technical walkthroughs, architecture discussions, and demonstrations of practical cloud solutions.",
    action: "Visit YouTube",
  },
];

const goodFitExamples = [
  "A reporting process depends on spreadsheets, manual consolidation, or undocumented knowledge.",
  "A recurring workflow involves repetitive research, document creation, approvals, or follow-up.",
  "A cloud prototype needs a practical architecture and a credible path toward production.",
  "Teams need clearer metrics, governed data, or better visibility into operational performance.",
  "An AI use case needs source grounding, workflow controls, and meaningful human review.",
];

const consultationSteps = [
  {
    number: "01",
    title: "Choose a time",
    description:
      "Use the scheduling page to select an available consultation time.",
  },
  {
    number: "02",
    title: "Describe the problem",
    description:
      "Provide enough context to identify the affected process, users, constraints, and desired outcome.",
  },
  {
    number: "03",
    title: "Receive a focused discussion",
    description:
      "The consultation will concentrate on clarifying the problem, likely options, and whether a technical engagement is justified.",
  },
];

const preparationItems = [
  "The process, report, or workflow that is creating difficulty",
  "The people or teams affected by the problem",
  "Current tools, systems, or manual steps",
  "Known security, timing, budget, or compliance constraints",
  "What a successful outcome would look like",
];

export default function ContactPage() {
  return (
    <>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Contact
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Start with the problem your organization needs to solve.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Book a consultation to discuss a reporting, workflow,
              architecture, data, or knowledge-management problem. The initial
              conversation is intended to clarify the situation before
              committing to a specific technology or implementation approach.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                Book a consultation
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>

              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-md border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400 hover:bg-slate-900"
              >
                Review selected work
              </Link>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              The scheduling page opens in a new tab and displays current
              availability through Google Calendar.
            </p>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Before you schedule
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              A useful starting point is enough.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              You do not need a complete technical specification. A clear
              description of the current problem, affected users, and desired
              outcome is more valuable than arriving with a predetermined
              solution.
            </p>

            <ul className="mt-7 space-y-4">
              {preparationItems.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-7 text-slate-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What happens next
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A structured conversation, not a generic sales call.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              The purpose of the initial consultation is to understand the
              operating problem, identify meaningful constraints, and determine
              whether a practical next step exists.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {consultationSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-7"
              >
                <p className="text-sm font-semibold text-blue-400">
                  {step.number}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Good-fit conversations
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              Problems that cross process, data, and technology boundaries.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              McQueen Cloud Advisory is best suited to situations where the
              problem cannot be solved by changing a single report, purchasing
              another tool, or automating an isolated task without considering
              the larger operating process.
            </p>
          </div>

          <ul className="space-y-4">
            {goodFitExamples.map((example) => (
              <li
                key={example}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5 leading-7 text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 font-semibold text-blue-400"
                >
                  ✓
                </span>

                <span>{example}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-950 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              What to expect
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Direct discussion and honest tradeoffs.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Recommendations should explain what is appropriate, why it is
              appropriate, what it will require, and where the limitations
              remain. If a technical project is not justified, that should be
              said clearly.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-950 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Privacy
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Share only what is appropriate for an initial discussion.
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              Do not submit passwords, confidential customer information,
              regulated data, proprietary source code, or sensitive internal
              documents through the scheduling form. High-level context is
              sufficient for the first conversation.
            </p>
          </article>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Follow and learn
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay connected beyond the initial conversation.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Follow McQueen Cloud Advisory for project updates, practical
              technical guidance, and demonstrations of cloud, analytics,
              automation, and AI solutions.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {socialLinks.map((socialLink) => (
              <article
                key={socialLink.name}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
              >
                <h3 className="text-2xl font-semibold text-white">
                  {socialLink.name}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-300">
                  {socialLink.description}
                </p>

                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center font-semibold text-blue-400 transition hover:text-blue-300"
                  aria-label={`${socialLink.action} in a new tab`}
                >
                  {socialLink.action}
                  <span aria-hidden="true" className="ml-2">
                    ↗
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-blue-400/10 px-8 py-14 text-center sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Ready to begin?
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Schedule a conversation about the problem, constraints, and
            practical next step.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The first objective is clarity. Architecture, automation, and
            implementation decisions should follow from that understanding.
          </p>

          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            View consultation availability
            <span aria-hidden="true" className="ml-2">
              ↗
            </span>
          </a>
        </div>
      </section>
    </>
  );
}