import type { Metadata } from "next";
import Link from "next/link";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";

export const metadata: Metadata = {
  title: "About Scott McQueen",
  description:
    "Scott McQueen connects business intelligence, automation, cloud architecture, and technical delivery. Explore the experience and judgment behind McQueen Cloud Advisory.",
};

const experience = [
  {
    number: "01",
    title: "Reporting that can be explained.",
    description:
      "My work spans finance metrics, analytical data models, and portfolio reporting. I connect the business definition to the data and checks that make the result useful.",
  },
  {
    number: "02",
    title: "Automation with a clear operating path.",
    description:
      "From recurring reconciliation to document workflows, I build around the inputs, exceptions, ownership, and human decisions that keep a process accountable.",
  },
  {
    number: "03",
    title: "Architecture tested against reality.",
    description:
      "I have led platform assessments and technical delivery across business and IT teams. A working prototype is evidence to examine; workload, dependencies, and operating limits still determine the right design.",
  },
];

const credentials = [
  { name: "Project Management Professional (PMP)", issuer: "Project Management Institute", detail: "Current through December 2026" },
  { name: "Power BI Data Analyst Associate", issuer: "Microsoft", detail: "Active through May 2027" },
  { name: "Azure Data Engineer Associate", issuer: "Microsoft", detail: "Issued January 2025" },
  { name: "Azure Data Scientist Associate", issuer: "Microsoft", detail: "Issued October 2025" },
  { name: "Applied Data Science Program", issuer: "MIT Professional Education", detail: "Completed October 2024" },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-intro border-b border-line">
        <div className="site-shell grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <p className="eyebrow">About / Scott McQueen</p>
            <h1 className="display-title mt-6 max-w-4xl">The person behind<br className="hidden sm:block" /> the systems.</h1>
            <p className="lede mt-8 max-w-2xl">I’m Scott McQueen. I lead technical work from the first business question through design, implementation, and handoff.</p>
          </div>
          <div className="border-l-2 border-accent pl-6 lg:mb-2">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Founder</p>
            <p className="mt-3 text-xl font-medium tracking-tight">McQueen Cloud Advisory</p>
            <p className="mt-4 leading-7 text-muted">Business intelligence.<br /> Automation. Cloud architecture.<br /> Technical delivery.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a className="text-link" href="https://www.linkedin.com/in/smmcqueen/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              <a className="text-link" href="https://smcqueen2023.github.io/skills-github-pages/" target="_blank" rel="noopener noreferrer">Personal portfolio <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow">Experience & perspective</p>
            <h2 className="section-title mt-5 max-w-md">Technical depth.<br /> Business context.</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">The interesting problems cross boundaries: a reporting issue becomes a data problem; a manual process reveals a missing control. That is where I do my best work.</p>
            <Link href="/work" className="text-link mt-8 inline-flex">See the work <span aria-hidden="true" className="ml-3">↗</span></Link>
          </div>
          <div className="border-t border-line">
            {experience.map((area) => (
              <article key={area.number} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-8 sm:gap-6">
                <span className="pt-1 font-mono text-xs text-accent">{area.number}</span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{area.title}</h3>
                  <p className="mt-4 leading-7 text-muted">{area.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-line bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow">Selected qualifications</p>
            <h2 className="section-title mt-5">Study, applied.</h2>
            <p className="mt-6 max-w-md leading-7 text-muted">Project delivery, analytics, and cloud data form the foundation. The published work shows how I use them.</p>
            <a className="text-link mt-6 inline-flex" href="https://smcqueen2023.github.io/skills-github-pages/certifications/" target="_blank" rel="noopener noreferrer">Credential record & verification <span aria-hidden="true" className="ml-2">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <div>
            <ul className="border-t border-line">
              {credentials.map((credential) => (
                <li key={credential.name} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[1.35fr_0.65fr] sm:gap-6">
                  <div><p className="font-medium">{credential.name}</p><p className="mt-1 text-sm text-muted">{credential.issuer}</p></div>
                  <p className="font-mono text-xs leading-6 text-muted sm:text-right">{credential.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-muted">Dates reflect the published credential record. Issue dates do not imply current certification status; issuer profiles provide renewal details.</p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow">A working technical library</p>
            <h2 className="section-title mt-5">The reasoning stays visible.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">My cloud engineering knowledge base collects platform concepts, architecture decisions, implementation patterns, and hands-on labs. It is a deeper view into how I learn and build.</p>
            <EngineeringKnowledgeBaseLink className="mt-8" />
          </div>
          <div className="flex flex-col justify-between border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="max-w-lg text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">Every major component should have a clear purpose tied to a requirement, risk, or expected outcome.</p>
            <div className="mt-10 flex flex-wrap gap-6"><Link href="/insights" className="text-link">Read the architecture notes <span aria-hidden="true">↗</span></Link><Link href="/contact" className="text-link">Get in touch <span aria-hidden="true">↗</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
