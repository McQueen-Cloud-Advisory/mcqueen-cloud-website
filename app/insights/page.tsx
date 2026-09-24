import type { Metadata } from "next";
import Link from "next/link";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Architecture decisions and practical engineering notes from McQueen Cloud Advisory: requirements, alternatives, tradeoffs, and lessons from building.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="page-intro border-b border-line">
        <div className="site-shell">
          <p className="eyebrow">Insights / Field notes</p>
          <h1 className="display-title mt-6 max-w-4xl">Decisions,<br /> made explainable.</h1>
          <p className="lede mt-8 max-w-2xl">The requirements, tradeoffs, and implementation lessons behind the work. A closer look at why a system takes the shape it does.</p>
        </div>
      </section>

      <section className="section-space" aria-label="Published articles">
        <div className="site-shell space-y-12">
          {insights.map((insight, index) => (
            <article key={insight.slug} className="grid border-y border-line lg:grid-cols-[1.1fr_0.9fr]">
              <div className="py-9 sm:py-12 lg:pr-14">
                <p className="eyebrow">{insight.category} / {String(index + 1).padStart(2, "0")}</p>
                <h2 className="section-title mt-6 max-w-xl"><Link href={`/insights/${insight.slug}`} className="transition hover:text-accent">{insight.title}</Link></h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{insight.summary}</p>
                <p className="mt-7 font-mono text-xs text-muted">{insight.published}<span aria-hidden="true" className="mx-3">/</span>{insight.readTime}</p>
                <Link href={`/insights/${insight.slug}`} className="text-link mt-9 inline-flex gap-4">Read the article <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="flex flex-col justify-center bg-night p-7 text-white sm:p-12">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ice">Decision record / 001</p>
                <p className="mt-6 text-2xl font-medium tracking-tight">A platform chosen<br /> for its operating fit.</p>
                <dl className="mt-9 space-y-6">
                  <div className="grid grid-cols-[5rem_1fr] gap-4 border-t border-white/20 pt-5"><dt className="font-mono text-xs text-ice">NEED</dt><dd className="text-sm leading-6 text-slate-300">Next.js, source control, managed deployment.</dd></div>
                  <div className="grid grid-cols-[5rem_1fr] gap-4 border-t border-white/20 pt-5"><dt className="font-mono text-xs text-ice">CHOICE</dt><dd className="text-sm leading-6 text-slate-300">Firebase App Hosting.</dd></div>
                  <div className="grid grid-cols-[5rem_1fr] gap-4 border-t border-white/20 pt-5"><dt className="font-mono text-xs text-ice">TRADEOFF</dt><dd className="text-sm leading-6 text-slate-300">A simpler operating path with less direct infrastructure control.</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space border-t border-line bg-white">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div><p className="eyebrow">Extended technical resource</p><h2 className="section-title mt-5">Keep going<br /> under the surface.</h2></div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-muted">The cloud engineering knowledge base is a technical companion to these notes: structured explanations of cloud platforms, networking, identity, containers, serverless services, and implementation patterns.</p>
            <EngineeringKnowledgeBaseLink className="mt-8" />
          </div>
        </div>
      </section>
    </>
  );
}
