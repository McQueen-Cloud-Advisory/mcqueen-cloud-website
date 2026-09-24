import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import "../work.css";

export const metadata: Metadata = {
  title: "Automated Consultation Intelligence Workflow",
  description: "An event-driven Google Cloud workflow that turns structured client intake into a tailored, reviewable consultation preparation brief.",
};

const technologies = ["Google Forms", "Apps Script", "Cloud Run", "Vertex AI", "Google Workspace", "GitHub Actions"];

const objectives = [
  "Standardize the information collected before a consultation.",
  "Trigger preparation when the client completes the intake form.",
  "Use client responses to guide external research and analysis.",
  "Produce a consistent but client-specific briefing document.",
  "Minimize manual intervention while preserving human review.",
];

const decisions = [
  {
    title: "Structured intake with Google Forms",
    description: "Forms gives clients a low-friction way to submit consistent information without requiring a custom authentication system or application interface.",
  },
  {
    title: "Workspace orchestration with Apps Script",
    description: "Apps Script connects the intake workflow to Google Workspace and initiates downstream processing when a form response is received.",
  },
  {
    title: "Managed application logic on Cloud Run",
    description: "Cloud Run provides the execution environment for research, processing, and integration logic without requiring permanent server infrastructure.",
  },
  {
    title: "Structured analysis with Vertex AI",
    description: "The submitted context and gathered research help organize findings into a repeatable consultation briefing structure.",
  },
  {
    title: "Automated deployment with GitHub Actions",
    description: "Application changes are version controlled and deployed through an automated pipeline rather than manually uploaded to the production environment.",
  },
];

export default function ConsultationAutomationCaseStudy() {
  return (
    <>
      <article>
        <header className="case-hero">
          <div className="site-shell">
            <Link href="/work" className="text-link text-sm">← Selected work</Link>
            <div className="case-hero-grid">
              <div>
                <p className="eyebrow">02 / Consultation intelligence</p>
                <h1 className="case-title">From client intake.<br /><span>To a prepared conversation.</span></h1>
                <p className="lede mt-7 max-w-2xl">An event-driven workflow that turns structured client context into a tailored preparation brief, before the consultation begins.</p>
                <p className="work-project-status">Production demonstration</p>
              </div>
              <aside className="case-outcome">
                <p className="eyebrow">Primary outcome</p>
                <p className="case-outcome-title">Brief generated within minutes</p>
                <p>More preparation time for evaluating the client&apos;s situation, likely constraints, and the questions that make a meeting useful.</p>
              </aside>
            </div>
          </div>
        </header>

        <section className="case-summary" aria-label="Project overview">
          <dl className="site-shell case-summary-grid">
            <div className="case-summary-item"><dt>Business problem</dt><dd>Repetitive research and document assembly before each consultation</dd></div>
            <div className="case-summary-item"><dt>Trigger</dt><dd>A completed client intake form initiates preparation</dd></div>
            <div className="case-summary-item"><dt>Output</dt><dd>A tailored briefing document with human review retained</dd></div>
          </dl>
        </section>

        <div className="site-shell case-story">
          <section className="case-section">
            <p className="case-section-label"><span>01</span> The operating problem</p>
            <div>
              <h2>A useful conversation starts before the meeting.</h2>
              <div className="case-prose">
                <p>Preparation means understanding the client&apos;s organization, stated needs, operating environment, likely constraints, and relevant technical options. A calendar invitation provides very little of that context.</p>
                <p>Researching and assembling it manually for every meeting creates inconsistent results and consumes time that could be spent evaluating the problem and preparing meaningful questions.</p>
              </div>
              <ul className="case-objectives">{objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>02</span> Solution architecture</p>
            <div>
              <h2>Context in. A reviewable brief out.</h2>
              <div className="case-prose"><p>Following a booking request, a completed Google Forms intake triggers Apps Script. A Cloud Run research service combines the submitted context, open-source research, and Vertex AI analysis to prepare a Google Workspace briefing document.</p></div>
              <div className="case-diagram"><ProjectDiagram kind="consultation" /></div>
              <div className="case-prose"><p>Client responses guide the research and analysis. The output follows a consistent structure while remaining specific to the organization and its stated needs. Human review is the final step before the consultation.</p></div>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>03</span> Architectural decisions</p>
            <div>
              <h2>A small set of deliberate choices.</h2>
              <div className="case-decisions">{decisions.map((decision) => (
                <div className="case-decision" key={decision.title}><h3>{decision.title}</h3><p>{decision.description}</p></div>
              ))}</div>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>04</span> Result and business value</p>
            <div>
              <h2>Spend the time on better questions.</h2>
              <div className="case-prose">
                <p>The workflow can produce a tailored preparation brief within minutes of a client submitting the intake form. The client&apos;s stated needs, operating context, likely constraints, and relevant background are organized before the discussion.</p>
                <p>Preparation becomes a repeatable, reviewable process. The consultant can spend more time evaluating the situation and shaping useful questions, with less time collecting and assembling background material.</p>
              </div>
              <aside className="case-note"><h3 className="eyebrow">Human judgment remains part of the system</h3><p>The document supports preparation. The consultant still reviews the material, evaluates the client&apos;s situation, and determines which questions and recommendations are appropriate.</p></aside>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>05</span> Technical implementation</p>
            <div>
              <h2>The engine behind the result.</h2>
              <div className="case-prose"><p>The stack fits the operating workflow: low-friction intake, event-driven orchestration, managed compute, structured analysis, document generation, and automated delivery.</p></div>
              <ul className="case-technologies">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </div>
          </section>

          <section className="case-section">
            <p className="case-section-label"><span>06</span> What the work demonstrates</p>
            <div>
              <h2>Business context, carried through the architecture.</h2>
              <div className="case-prose"><p>This production demonstration connects Google Workspace and Google Cloud in a managed, event-driven system. It shows how a defined business need can shape application logic, AI-assisted knowledge work, and a maintainable delivery process.</p></div>
              <ul className="case-objectives">
                <li>Event-driven application design</li>
                <li>Google Workspace and Google Cloud integration</li>
                <li>Managed serverless architecture</li>
                <li>AI-assisted workflow automation</li>
                <li>CI/CD through GitHub Actions</li>
                <li>Translation of business needs into technical design</li>
              </ul>
            </div>
          </section>

          <div className="case-next"><p className="eyebrow">Next / Financial data automation</p><Link href="/work/enterprise-financial-reconciliation" className="text-link">A financial process built to repeat <span aria-hidden="true">↗</span></Link></div>
        </div>
      </article>
      <div className="site-shell pb-20">
      <AssessmentPathCta
        eyebrow="Explore the approach"
        title="Is automation the right next step?"
        description="The readiness assessment evaluates whether data, governance, cloud architecture, and technical support can sustain workflow automation, or whether another constraint should come first."
        assessmentLabel="Assess your readiness"
        contactLabel="Discuss an automation opportunity"
      />
      </div>
    </>
  );
}
