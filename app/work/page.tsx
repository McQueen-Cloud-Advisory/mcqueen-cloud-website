import Link from "next/link";
import { AssessmentPathCta } from "@/components/engagement/AssessmentPathCta";
import { projects } from "@/data/projects";

export default function WorkPage() {
  return (
    <>
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Selected work
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Systems designed around real operational problems.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            These projects show how business requirements are translated into
            practical architecture, automated workflows, governed data, and
            reliable cloud deployments.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-800 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                      {project.category}
                    </span>

                    <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                      {project.status}
                    </span>
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold text-white">
                    {project.title}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-300">
                    {project.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-300"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex shrink-0 items-center justify-center rounded-md bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
                >
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section>
        <AssessmentPathCta
          eyebrow="Apply the same thinking to your organization"
          title="Not sure whether automation is the right next investment?"
          description="The readiness assessment evaluates whether your data, governance, cloud architecture, and technical support model are strong enough to sustain workflow automation—or whether another constraint should be addressed first."
          assessmentLabel="Assess your readiness"
          contactLabel="Discuss an automation opportunity"
        />
      </section>
    </>
  );
}