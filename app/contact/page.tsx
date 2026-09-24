import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Scott McQueen and McQueen Cloud Advisory. Book a conversation about analytics, automation, or cloud architecture, or follow the work.",
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
        <div className="site-shell grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display-title mt-6">A useful<br /> conversation.</h1>
            <p className="lede mt-8 max-w-xl">Have a reporting, workflow, or architecture problem in mind? Let’s start with the situation and what a better outcome would look like.</p>
            <a href={consultationUrl} target="_blank" rel="noopener noreferrer" className="button button-primary mt-9">Book a consultation <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">Opens Google Calendar in a new tab to show available times.</p>
          </div>
          <aside className="border-t-2 border-accent bg-white p-7 sm:p-9">
            <p className="eyebrow">A starting point is enough</p>
            <h2 className="mt-5 text-2xl font-medium leading-tight tracking-tight">Bring the problem.<br /> We can work through the options.</h2>
            <ul className="mt-7 space-y-5 text-sm leading-6 text-muted">
              <li className="flex gap-4"><span className="font-mono text-xs text-accent">01</span><span>The process or decision that needs attention.</span></li>
              <li className="flex gap-4"><span className="font-mono text-xs text-accent">02</span><span>The people, systems, and constraints involved.</span></li>
              <li className="flex gap-4"><span className="font-mono text-xs text-accent">03</span><span>What a successful outcome would change.</span></li>
            </ul>
            <p className="mt-7 border-t border-line pt-5 text-sm leading-6 text-muted">High-level context is enough for scheduling. Keep confidential or sensitive material out of the booking form.</p>
          </aside>
        </div>
      </section>

      <section className="section-space border-y border-line bg-white">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow">Elsewhere</p>
            <h2 className="section-title mt-5">Follow the work.</h2>
            <p className="mt-6 max-w-sm leading-7 text-muted">Connect directly or explore project updates, technical discussions, and working demonstrations.</p>
          </div>
          <div className="border-t border-line">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] gap-5 border-b border-line py-6 transition hover:text-accent">
                <div><h3 className="text-xl font-medium tracking-tight">{link.name}</h3><p className="mt-2 text-sm leading-6 text-muted">{link.description}</p></div>
                <span aria-hidden="true" className="text-xl text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span><span className="sr-only">Opens in a new tab</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-2xl font-medium tracking-tight">Just exploring? The work is a good place to start.</p>
          <Link href="/work" className="text-link shrink-0">View selected work <span aria-hidden="true" className="ml-3">↗</span></Link>
        </div>
      </section>
    </>
  );
}
