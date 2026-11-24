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
  assessmentLabel = "Explore the assessment",
  contactLabel = "Discuss a project",
}: AssessmentPathCtaProps) {
  return (
    <section className="border-t-2 border-accent bg-surface p-6 sm:p-8 lg:p-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5 max-w-3xl text-ink">{title}</h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link href="/contact" className="button button-primary">{contactLabel}<span aria-hidden="true">↗</span></Link>
        <Link href="/assessment" className="button button-secondary">{assessmentLabel}</Link>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">The assessment is optional: use it to explore priorities before a conversation. No account or contact details are required.</p>
    </section>
  );
}
