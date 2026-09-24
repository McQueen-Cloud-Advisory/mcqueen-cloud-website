import type { Metadata } from "next";
import Link from "next/link";
import { HeroDiagram } from "@/components/visuals/HeroDiagram";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";
import { IndependentProjectFeature } from "@/components/engagement/IndependentProjectFeature";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";
import { assessmentQuestions, type AssessmentDomainId, type MaturityScore } from "@/data/assessment";
import { analyzeAssessment } from "@/lib/assessment/analyze-assessment";

export const metadata: Metadata = {
  title: "Analytics, Automation & Cloud Architecture",
  description: "Explore the systems, decisions, and working tools behind McQueen Cloud Advisory. Analytics, automation, and cloud architecture by Scott McQueen.",
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
  { number: "03", title: "Build for what comes next.", description: "Choose managed services, document the operating path, and preserve human judgment where it matters.", example: "Read the architecture decision", href: "/insights/why-this-site-uses-firebase-app-hosting" },
];

export default function Home() {
  const orderedProjects = [projects[1], projects[0]];
  const article = insights[0];
  return (
    <>
      <section className="hero dark-surface">
        <div className="site-shell">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Analytics / Automation / Architecture</p>
              <h1>Complex<br />operations.<span>Clear systems.</span></h1>
              <p className="hero-description">Thoughtful architecture for the work that matters. I turn fragmented data and manual processes into systems people can understand and trust.</p>
              <div className="hero-actions">
                <Link href="/work" className="button button-primary">View selected work <span aria-hidden="true">↗</span></Link>
                <Link href="/assessment" className="text-link">Explore the assessment <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <HeroDiagram />
          </div>
          <div className="hero-bottom">
            <span>Independent thinking. Practical engineering.</span>
            <Link href="/about">By Scott McQueen <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="selected-work-title">
        <div className="site-shell">
          <div className="section-head reveal">
            <div><p className="eyebrow">01 / Selected work</p><h2 id="selected-work-title" className="section-title">The thinking.<br />The system. The result.</h2></div>
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
                <p className="mt-5 font-mono text-[10px]! uppercase tracking-wide">{project.status}</p>
                <Link href={`/work/${project.slug}`} className="text-link mt-5">Inside the project <span aria-hidden="true">↗</span></Link>
              </div>
              <ProjectDiagram kind={index === 0 ? "financial" : "consultation"} compact />
            </article>
          ))}
          <IndependentProjectFeature />
        </div>
      </section>

      <section className="dark-surface section-space" aria-labelledby="assessment-feature-title">
        <div className="site-shell assessment-feature">
          <div className="reveal">
            <p className="eyebrow">02 / A working tool</p>
            <h2 id="assessment-feature-title" className="section-title mt-5">Find the next<br />right move.</h2>
            <p className="lede mt-6">Good modernization starts with knowing what is ready—and what needs attention first.</p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#bbc6d2]">Explore six connected capabilities and receive an explainable, prioritized roadmap. The assessment is built around real dependencies, with every recommendation tied to your answers.</p>
            <Link href="/assessment" className="button button-primary mt-8">Try the readiness assessment <span aria-hidden="true">↗</span></Link>
            <p className="mt-5 font-mono text-[10px] tracking-wide text-[#bbc6d2]">24 QUESTIONS · ABOUT 10 MINUTES · NO SIGN-UP</p>
          </div>
          <figure className="assessment-preview reveal" aria-label="Example assessment profile based on synthetic responses">
            <figcaption className="preview-top"><span>Modernization profile</span><span className="text-ice">Example result</span></figcaption>
            <p className="preview-title">{example.modernizationStage}</p>
            <p className="mt-2 text-sm text-[#bbc6d2]">Six capabilities. A connected view.</p>
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
          <div className="section-head reveal"><div><p className="eyebrow">03 / The approach</p><h2 id="approach-title" className="section-title">Clarity is a design decision.</h2></div></div>
          <div className="principle-grid">
            {principles.map((principle) => <article className="principle reveal" key={principle.number}>
              <span className="eyebrow">{principle.number}</span><h3>{principle.title}</h3><p>{principle.description}</p>
              <Link href={principle.href} className="text-link mt-5 text-xs!">{principle.example} <span aria-hidden="true">↗</span></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-t border-line section-space" aria-labelledby="notes-title">
        <div className="site-shell">
          <div className="section-head"><div><p className="eyebrow">04 / Notes from the work</p><h2 id="notes-title" className="section-title">The decisions behind the delivery.</h2></div></div>
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
              <p>I work across enterprise analytics, financial reporting, automation, and technical delivery. My focus is connecting the business question to a system that holds up in practice.</p>
              <Link href="/about" className="text-link mt-5">More about my work <span aria-hidden="true">↗</span></Link>
              <div className="mt-7 border-t border-line pt-5"><EngineeringKnowledgeBaseLink variant="text" label="Explore the cloud engineering knowledge base ↗" /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
