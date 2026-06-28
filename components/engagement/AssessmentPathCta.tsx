import Link from "next/link";

type AssessmentPathCtaProps = {
  eyebrow?: string;
  title: string;
  description: string;
  assessmentLabel?: string;
  contactLabel?: string;
};

export function AssessmentPathCta({
  eyebrow = "Choose your next step",
  title,
  description,
  assessmentLabel = "Take the readiness assessment",
  contactLabel = "Discuss a defined project",
}: AssessmentPathCtaProps) {
  return (
    <section className="rounded-3xl border border-blue-400/20 bg-blue-400/10 p-8 sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
        {title}
      </h2>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
        {description}
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/assessment"
          className="rounded-md bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {assessmentLabel}
        </Link>

        <Link
          href="/contact"
          className="rounded-md border border-slate-600 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {contactLabel}
        </Link>
      </div>
    </section>
  );
}
