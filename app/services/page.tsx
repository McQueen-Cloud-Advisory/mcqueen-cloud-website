import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Analytics and Reporting, Workflow Automation, and Workspace and Systems Design for small and midsize organizations. Practical scopes with validation, ownership, and handoff.",
};

const relatedWork: Record<string, { href: string; label: string; context: string }> = {
  "analytics-and-reporting": {
    href: "/work/enterprise-financial-reconciliation",
    label: "Explore the reconciliation case study",
    context: "Professional experience / anonymized enterprise project",
  },
  "workflow-automation": {
    href: "/work/consultation-automation",
    label: "Explore the consultation workflow",
    context: "Production demonstration",
  },
  "workspace-and-systems-design": {
    href: "/insights/why-this-site-uses-firebase-app-hosting",
    label: "Read an architecture decision",
    context: "McQueen Cloud Advisory’s own website",
  },
};

const engagementSteps = [
  { title: "Understand the work", description: "Identify the recurring problem, the people affected, and the owner responsible for the process." },
  { title: "Agree the scope", description: "Define deliverables, constraints, and acceptance criteria before selecting or building a solution." },
  { title: "Implement and validate", description: "Build the agreed change and check the result with the people who will use it." },
  { title: "Hand over", description: "Leave operating instructions and clear ownership. Arrange ongoing support separately when needed." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-intro">
        <div className="site-shell">
          <p className="eyebrow">Services / Three areas of practice</p>
          <h1 className="display-title mt-6 max-w-3xl">Useful systems.<br /> A practical scope.</h1>
          <p className="lede mt-8 max-w-2xl">Clear reporting, simpler workflows, and organized tools for small and midsize organizations. Each engagement starts with a defined operating problem and ends with a result your team can own.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="button button-primary">Discuss a project <span aria-hidden="true">↗</span></Link>
            <Link href="/work" className="button button-secondary">View selected work</Link>
          </div>
        </div>
      </section>

      <nav aria-label="Service navigation" className="border-y border-line">
        <div className="site-shell flex flex-wrap gap-x-8 gap-y-3 py-5">
          {services.map((service, index) => (
            <a key={service.slug} href={`#${service.slug}`} className="inline-flex min-h-11 items-center gap-3 py-2 text-base font-medium text-muted transition hover:text-accent">
              <span className="font-mono text-sm text-accent">0{index + 1}</span>{service.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="section-space" aria-label="Service scopes and deliverables">
        <div className="site-shell">
          {services.map((service, index) => (
            <article key={service.slug} id={service.slug} className="relative grid scroll-mt-4 gap-8 border-b border-line py-12 first:pt-0 lg:grid-cols-[0.12fr_0.94fr_0.94fr] lg:gap-10">
              {service.legacySlugs?.map((slug) => <span key={slug} id={slug} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 scroll-mt-4" />)}
              <p className="font-mono text-sm text-accent">0{index + 1} /</p>
              <div>
                <h2 className="section-title max-w-md">{service.title}</h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{service.summary}</p>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">{service.scope}</p>
                <div className="mt-7">
                  <p className="text-sm leading-relaxed text-muted">{relatedWork[service.slug].context}</p>
                  <Link href={relatedWork[service.slug].href} className="text-link mt-2 inline-flex items-start gap-3">{relatedWork[service.slug].label}<span aria-hidden="true">↗</span></Link>
                </div>
              </div>
              <div>
                <h3 className="eyebrow">Agreed deliverables</h3>
                <ul className="mt-5 grid gap-3">
                  {service.deliverables.map((deliverable) => <li key={deliverable} className="flex gap-3 text-base leading-relaxed"><span aria-hidden="true" className="text-accent">—</span><span>{deliverable}</span></li>)}
                </ul>
                <dl className="mt-7 border-t border-line pt-5 text-base leading-relaxed">
                  <div><dt className="font-medium">How to assess the result</dt><dd className="mt-2 text-muted">{service.evidence}</dd></div>
                  <div className="mt-5"><dt className="font-medium">Scope boundary</dt><dd className="mt-2 text-muted">{service.boundary}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space border-y border-line bg-surface">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div><p className="eyebrow">How an engagement takes shape</p><h2 className="section-title mt-5 max-w-xl">The problem comes first.</h2></div>
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Google Workspace and Google Cloud are core capabilities. Microsoft 365 may be the right fit for your team. Existing tools come first where they meet the requirement; a new platform needs a clear reason.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((step, index) => (
              <article key={step.title} className="border-t border-line pt-6">
                <p className="font-mono text-sm text-accent">0{index + 1}</p>
                <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="site-shell section-space">
        <AssessmentPathCta eyebrow="Find a starting point" title="Clarify what should improve first." description="Bring the recurring problem to a conversation. If you would like to explore priorities first, the readiness assessment offers a structured look at the conditions that may help or limit progress." assessmentLabel="Explore the assessment" />
      </div>
    </>
  );
}
