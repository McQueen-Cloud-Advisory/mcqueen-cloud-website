import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss a reporting, workflow, or systems project with Scott McQueen. Practical analytics, automation, and systems design for small and midsize organizations.",
};

const consultationUrl = "https://calendar.app.google/d9FXHWJLp8udKsvJ7";
const socialLinks = [
  { name: "Personal LinkedIn", href: "https://www.linkedin.com/in/smmcqueen/", description: "Connect with Scott McQueen." },
  { name: "Company LinkedIn", href: "https://www.linkedin.com/company/mcqueen-cloud-advisory", description: "Project updates and advisory perspectives." },
  { name: "YouTube", href: "https://www.youtube.com/@McQueenCloudAdvisory", description: "Technical walkthroughs and demonstrations." },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <div className="site-shell grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-20">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display-title mt-6">Discuss a project.</h1>
            <p className="lede mt-8 max-w-xl">Have recurring reporting, administrative work, or disconnected tools that need attention? Start with the people affected, the current process, and what a better outcome would change.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">Discuss a project <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              <Link href="/work" className="button button-secondary">View selected work</Link>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">Opens Google Calendar in a new tab to show available times.</p>
          </div>
          <aside className="border-t-2 border-accent bg-surface p-6 sm:p-8">
            <p className="eyebrow">A starting point is enough</p>
            <h2 className="mt-5 text-2xl font-medium leading-tight tracking-tight">Bring the context.<br /> Work through the options.</h2>
            <ul className="mt-7 space-y-5 text-base leading-relaxed text-muted">
              <li className="flex gap-4"><span className="font-mono text-sm text-accent">01</span><span>The process or decision that needs attention.</span></li>
              <li className="flex gap-4"><span className="font-mono text-sm text-accent">02</span><span>The process owner, people, systems, and constraints involved.</span></li>
              <li className="flex gap-4"><span className="font-mono text-sm text-accent">03</span><span>What a successful outcome would change.</span></li>
            </ul>
            <p className="mt-7 border-t border-line pt-5 text-sm leading-6 text-muted">High-level context is enough for scheduling. Keep confidential or sensitive material out of the booking form.</p>
          </aside>
        </div>
      </section>

      <section className="section-space border-y border-line bg-surface">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow">Elsewhere</p>
            <h2 className="section-title mt-5">Follow the work.</h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted sm:text-lg">Connect with Scott or explore project updates, practical guidance, and working demonstrations.</p>
          </div>
          <div className="border-t border-line">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] gap-5 border-b border-line py-6 transition hover:text-accent">
                <div><h3 className="text-xl font-medium tracking-tight">{link.name}</h3><p className="mt-2 text-base leading-relaxed text-muted">{link.description}</p></div>
                <span aria-hidden="true" className="text-xl text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span><span className="sr-only">Opens in a new tab</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div><p className="eyebrow">Optional discovery</p><h2 className="section-title mt-5 max-w-xl">Explore priorities at your own pace.</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">The readiness assessment can help you reflect on reporting, workflows, ownership, and technical support before a conversation. No account or contact details are required.</p></div>
          <Link href="/assessment" className="button button-secondary shrink-0">Explore the assessment <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
