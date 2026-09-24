import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";
import { IndependentProjectFeature } from "@/components/engagement/IndependentProjectFeature";
import { ProjectDiagram } from "@/components/visuals/ProjectDiagram";
import { projects } from "@/data/projects";
import "./work.css";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore financial reconciliation, consultation automation, and Everything is Random: real outcomes, explainable architecture, and independent product development.",
};

const orderedProjects = [...projects].sort((first, second) =>
  Number(second.slug === "enterprise-financial-reconciliation") -
  Number(first.slug === "enterprise-financial-reconciliation"),
);

export default function WorkPage() {
  return (
    <>
      <section className="page-intro">
        <div className="site-shell">
          <p className="eyebrow">Selected work / Systems & products</p>
          <h1 className="display-title mt-6 max-w-4xl">Real problems.<br /><span className="text-muted">Considered systems.</span></h1>
          <p className="lede mt-7 max-w-2xl">A closer look at the decisions, architecture, and outcomes behind the work. Built around the way organizations actually operate.</p>
        </div>
      </section>

      <section className="site-shell work-index" aria-label="Project case studies">
        {orderedProjects.map((project, index) => {
          const kind = project.slug === "enterprise-financial-reconciliation" ? "financial" : "consultation";

          return (
            <article className="work-project" key={project.slug}>
              <div className="work-project-copy">
                <p className="work-project-number">0{index + 1} / {project.category}</p>
                <h2 className="work-project-title">{project.title}</h2>
                <p className="mt-5 text-base leading-7 text-muted">{project.summary}</p>
                <p className="work-project-outcome">{project.outcome}</p>
                <p className="work-project-status">{project.status}</p>
                <Link href={"/work/" + project.slug} className="text-link mt-7">Explore the case study <span aria-hidden="true">↗</span></Link>
              </div>
              <ProjectDiagram kind={kind} compact />
            </article>
          );
        })}
        <IndependentProjectFeature />
      </section>

      <div className="site-shell pb-20">
      <AssessmentPathCta
        eyebrow="Explore the approach"
        title="Where would you start?"
        description="The readiness assessment applies the same thinking to your operating foundation: data, governance, architecture, automation, and the ability to support it."
        assessmentLabel="Assess your readiness"
        contactLabel="Discuss an automation opportunity"
      />
      </div>
    </>
  );
}
