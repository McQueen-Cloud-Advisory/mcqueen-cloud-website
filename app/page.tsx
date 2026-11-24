import type { Metadata } from "next";
import Link from "next/link";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";
import { IndependentProjectFeature } from "@/components/engagement/IndependentProjectFeature";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { insights } from "@/data/insights";
import { assessmentQuestions, type AssessmentDomainId, type MaturityScore } from "@/data/assessment";
import { analyzeAssessment } from "@/lib/assessment/analyze-assessment";

export const metadata: Metadata = {
  title: "Analytics, Automation & Systems Design",
  description: "Clear reporting, simpler workflows, and organized tools for small and midsize organizations. Explore the work and try the operational readiness assessment.",
};

// Synthetic example only: every question in each domain receives this score.
// The live engine generates the preview; it is never presented as a visitor result.
const exampleScores: Record<AssessmentDomainId, MaturityScore> = {
  "data-reporting": 3,
  "workflow-automation": 2,
  "cloud-architecture": 3,
  "governance-reliability": 3,
  "ai-knowledge-workflows": 2,
  "technical-capability-support": 3,
};
const example = analyzeAssessment(Object.fromEntries(
  assessmentQuestions.map((question) => [question.id, exampleScores[question.domainId]]),
));

const principles = [
  { number: "01", title: "Let the problem lead.", description: "Start with the decisions, delays, and constraints. Architecture follows the operating requirement.", example: "See the reconciliation case", href: "/work/enterprise-financial-reconciliation" },
  { number: "02", title: "Make the system legible.", description: "Clear inputs. Explainable decisions. Traceable outputs. A system should make sense to the people who own it.", example: "Explore the assessment", href: "/assessment" },
  { number: "03", title: "Leave a system you can own.", description: "Use existing tools where they fit. Validate the result, document the work, and give the process owner a clear handoff.", example: "Read the architecture decision", href: "/insights/why-this-site-uses-firebase-app-hosting" },
];

export default function Home() {
  const orderedProjects = [projects[1], projects[0]];
  const article = insights[0];
  return (
    <>
      <section className="hero dark-surface">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="site-shell">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Analytics, automation, and systems design</p>
              <h1>Complex operations.<span>Clear systems.</span></h1>
              <p className="hero-description">Clear reporting, simpler workflows, and organized tools for small and midsize organizations. Spend less time on administration and more time serving customers, members, and communities.</p>
              <div className="hero-actions">
                <Link href="/contact" className="button button-primary">Discuss a project <span aria-hidden="true">↗</span></Link>
                <Link href="/work" className="text-link">View selected work <span aria-hidden="true">→</span></Link>
              </div>
              <p className="hero-assessment"><Link href="/assessment" className="text-link">Explore the readiness assessment <span aria-hidden="true">→</span></Link></p>
            </div>
          </div>
          <div className="hero-bottom">
            <span>Enterprise experience. Practical scope.</span>
            <Link href="/about">By Scott McQueen <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="services-title">
        <div className="site-shell">
          <div className="section-head reveal">
            <div><p className="eyebrow">01 / How I can help</p><h2 id="services-title" className="section-title">Useful systems for everyday work.</h2></div>
            <Link href="/services" className="text-link">Explore the services <span aria-hidden="true">→</span></Link>
          </div>
          <div className="offer-grid">
            {services.map((service, index) => <article className="offer-summary reveal" key={service.slug}>
              <span className="eyebrow">0{index + 1}</span><h3>{service.title}</h3><p>{service.summary}</p>
              <Link href={`/services#${service.slug}`} className="text-link">See the scope <span className="sr-only"> for {service.title}</span><span aria-hidden="true">→</span></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="selected-work-title">
        <div className="site-shell">
          <div className="section-head reveal">
            <div><p className="eyebrow">02 / Selected work</p><h2 id="selected-work-title" className="section-title">The thinking. The system. The result.</h2></div>
            <Link href="/work" className="text-link">Explore all work <span aria-hidden="true">↗</span></Link>
          </div>
          {orderedProjects.map((project, index) => (
            <article key={project.slug} className="project-spread reveal">
              <div className="project-copy">
                <p className="eyebrow">{index === 0 ? "Financial data automation" : "Cloud workflow automation"}</p>
                <h3><Link href={`/work/${project.slug}`}>{index === 0 ? "A clearer path through financial reconciliation." : "From client intake to a prepared conversation."}</Link></h3>
                <div className="project-outcome">
                  <strong>{index === 0 ? "~30" : "Minutes"}</strong>
                  <span>{index === 0 ? "manual hours saved each month" : "from completed intake to consultation brief"}</span>
                </div>
                <p>{project.summary}</p>
                <p className="project-status">{project.status}</p>
                <Link href={`/work/${project.slug}`} className="text-link mt-5">Inside the project <span aria-hidden="true">↗</span></Link>
              </div>
              <ProjectDiagram kind={index === 0 ? "financial" : "consultation"} compact />
            </article>
          ))}
          <IndependentProjectFeature />
        </div>
      </section>

      <section className="assessment-home section-space" aria-labelledby="assessment-feature-title">
        <div className="site-shell assessment-feature">
          <div className="reveal">
            <p className="eyebrow">03 / A working tool</p>
            <h2 id="assessment-feature-title" className="section-title mt-5">Find the next<br />right move.</h2>
            <p className="lede mt-6">Good modernization starts with knowing what is ready—and what needs attention first.</p>
            <p className="mt-6 max-w-lg text-muted">Explore six connected capabilities and receive an explainable, prioritized roadmap. The assessment is built around real dependencies, with every recommendation tied to your answers.</p>
            <Link href="/assessment" className="button button-primary mt-8">Try the readiness assessment <span aria-hidden="true">↗</span></Link>
            <p className="mt-6 text-sm text-muted">24 questions · About 10 minutes · No sign-up</p>
          </div>
          <figure className="assessment-preview reveal" aria-label="Example assessment profile based on synthetic responses">
            <figcaption className="preview-top"><span>Modernization profile</span><span className="text-accent">Example result</span></figcaption>
            <p className="preview-title">{example.modernizationStage}</p>
            <p className="mt-2 text-sm text-muted">Six capabilities. A connected view.</p>
            <div className="mt-7">
              {example.domainScores.map((domain) => (
                <div className="preview-score" key={domain.id}>
                  <span>{domain.shortName}</span>
                  <div className="preview-bar" aria-hidden="true"><span style={{ width: `${((domain.average ?? 0) / 4) * 100}%` }} /></div>
                  <span className="font-mono text-right" aria-label={`${domain.name}: ${domain.average} out of 4`}>{domain.average?.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <p className="preview-note">Illustrative responses, evaluated by the same rules as the live assessment. Your own answers determine your profile and 90-day roadmap.</p>
          </figure>
        </div>
      </section>

      <section className="section-space" aria-labelledby="approach-title">
        <div className="site-shell">
          <div className="section-head reveal"><div><p className="eyebrow">04 / The approach</p><h2 id="approach-title" className="section-title">Clarity is a design decision.</h2></div></div>
          <div className="principle-grid">
            {principles.map((principle) => <article className="principle reveal" key={principle.number}>
              <span className="eyebrow">{principle.number}</span><h3>{principle.title}</h3><p>{principle.description}</p>
              <Link href={principle.href} className="text-link mt-5">{principle.example} <span aria-hidden="true">↗</span></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-t border-line section-space" aria-labelledby="notes-title">
        <div className="site-shell">
          <div className="section-head"><div><p className="eyebrow">05 / Notes from the work</p><h2 id="notes-title" className="section-title">The decisions behind the delivery.</h2></div></div>
          <div className="notes-grid">
            <article className="note-feature reveal">
              <p className="eyebrow">Architecture decision / {article.readTime}</p>
              <h3><Link href={`/insights/${article.slug}`}>Why this site uses<br />Firebase App Hosting.</Link></h3>
              <p>A closer look at the requirements, tradeoffs, and managed delivery model behind the site you are using.</p>
              <Link href={`/insights/${article.slug}`} className="text-link">Read the decision <span aria-hidden="true">↗</span></Link>
            </article>
            <div className="founder-note reveal">
              <p className="eyebrow">The person behind the systems</p>
              <h3>Scott McQueen.</h3>
              <p>I help teams connect the business question to reporting and workflows that hold up in everyday use. Experience from complex enterprise environments, applied to useful systems your team can run and maintain.</p>
              <Link href="/about" className="text-link mt-5">More about my work <span aria-hidden="true">↗</span></Link>
              <div className="mt-7 border-t border-line pt-5"><EngineeringKnowledgeBaseLink variant="text" label="Explore the cloud engineering knowledge base ↗" /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
