type EngineeringKnowledgeBaseLinkProps = {
  variant?: "button" | "text";
  label?: string;
  className?: string;
};

const knowledgeBaseUrl = "https://cloudengineer.mcqueencloud.com/";

export function EngineeringKnowledgeBaseLink({
  variant = "button",
  label = "Explore the cloud engineering knowledge base",
  className = "",
}: EngineeringKnowledgeBaseLinkProps) {
  const baseClasses =
    variant === "button"
      ? "inline-flex rounded-md border border-blue-400/40 bg-blue-400/10 px-5 py-3 font-semibold text-blue-200 transition hover:border-blue-300 hover:bg-blue-400/20 hover:text-white"
      : "font-semibold text-blue-400 transition hover:text-blue-300";

  return (
    <a
      href={knowledgeBaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${className}`.trim()}
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
