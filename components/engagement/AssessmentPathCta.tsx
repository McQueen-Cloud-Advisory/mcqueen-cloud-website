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
    <section className="border-t-2 border-accent bg-white p-6 sm:p-10 lg:p-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5 max-w-3xl text-ink">{title}</h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link href="/assessment" className="button button-primary">{assessmentLabel}<span aria-hidden="true">↗</span></Link>
        <Link href="/contact" className="button button-secondary">{contactLabel}</Link>
      </div>
    </section>
  );
}
