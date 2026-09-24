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
      ? "button button-secondary"
      : "text-link";

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
