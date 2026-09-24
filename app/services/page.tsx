import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Analytics modernization, workflow automation, Google Cloud architecture, and AI-enabled knowledge workflows designed around real operational needs.",
};

const relatedWork: Record<string, { href: string; label: string }> = {
  "analytics-bi-modernization": { href: "/work/enterprise-financial-reconciliation", label: "Financial reconciliation case study" },
  "workflow-automation": { href: "/work/consultation-automation", label: "Consultation workflow demonstration" },
  "google-cloud-architecture": { href: "/insights/why-this-site-uses-firebase-app-hosting", label: "An architecture decision in practice" },
  "ai-knowledge-workflows": { href: "/work/consultation-automation", label: "Research and document-generation workflow" },
};

const engagementSteps = [
  { title: "Understand", description: "Define the operating problem, users, constraints, and decisions the system must support." },
  { title: "Design", description: "Choose a proportionate architecture. Make the purpose and tradeoffs of each component clear." },
  { title: "Demonstrate", description: "Test a prototype or implementation against actual requirements and outputs." },
  { title: "Operationalize", description: "Document controls, deployment, ownership, and the path to ongoing support." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-intro">
        <div className="site-shell">
          <p className="eyebrow">Services / Areas of practice</p>
          <h1 className="display-title mt-6 max-w-4xl">Built around<br /> the real problem.</h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <p className="lede max-w-2xl">Analytics, automation, and cloud architecture for the points where process, data, and technology need to work together.</p>
            <div className="flex flex-wrap gap-4 lg:justify-end"><Link href="/work" className="button button-primary">View selected work <span aria-hidden="true">↗</span></Link><Link href="/contact" className="button button-secondary">Discuss a project</Link></div>
          </div>
        </div>
      </section>

      <nav aria-label="Service navigation" className="border-y border-line">
        <div className="site-shell flex flex-wrap gap-x-8 gap-y-3 py-5">
          {services.map((service, index) => <a key={service.slug} href={`#${service.slug}`} className="inline-flex items-center gap-3 py-2 text-sm font-medium text-muted transition hover:text-accent"><span className="font-mono text-xs text-accent">0{index + 1}</span>{service.title}</a>)}
        </div>
      </nav>

      <section className="section-space">
        <div className="site-shell">
          {services.map((service, index) => (
            <article key={service.slug} id={service.slug} className="grid scroll-mt-28 gap-8 border-b border-line py-12 first:pt-0 lg:grid-cols-[0.15fr_0.9fr_0.95fr] lg:gap-12">
              <p className="font-mono text-sm text-accent">0{index + 1} /</p>
              <div>
                <h2 className="max-w-md text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{service.title}</h2>
                <p className="mt-5 max-w-lg text-lg leading-8 text-muted">{service.summary}</p>
                <Link href={relatedWork[service.slug].href} className="text-link mt-7 inline-flex items-start gap-3 text-sm">{relatedWork[service.slug].label}<span aria-hidden="true">↗</span></Link>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">What the work can include</p>
                <ul className="mt-5 grid gap-3">
                  {service.deliverables.map((deliverable) => <li key={deliverable} className="flex gap-3 text-sm leading-6"><span aria-hidden="true" className="text-accent">—</span><span>{deliverable}</span></li>)}
                </ul>
                <p className="mt-7 border-l-2 border-accent pl-4 leading-7 text-muted">{service.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space border-y border-line bg-white">
        <div className="site-shell">
          <p className="eyebrow">How an engagement takes shape</p>
          <h2 className="section-title mt-5 max-w-2xl">Clarity before complexity.</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((step, index) => (
              <article key={step.title} className="border-t border-line pt-6">
                <p className="font-mono text-xs text-accent">0{index + 1}</p>
                <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 leading-7 text-muted">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="site-shell section-space">
        <AssessmentPathCta eyebrow="Find the right starting point" title="Clarify what should improve first." description="The readiness assessment helps identify your most important modernization priority. If the scope and desired outcome are already clear, start a direct conversation." assessmentLabel="Explore the assessment" contactLabel="Discuss a defined project" />
      </div>
    </>
  );
}
