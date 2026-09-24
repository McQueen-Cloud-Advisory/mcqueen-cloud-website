import styles from "./ProjectDiagram.module.css";

type ProjectDiagramProps = {
  kind: "financial" | "consultation";
  compact?: boolean;
};

const systems = {
  financial: {
    label: "Financial reconciliation",
    platform: "Azure",
    stages: [
      { title: "Preserve the source", short: "Source records", detail: "Monthly financial files", nodes: ["Monthly source files", "Azure Blob Storage"], annotation: "Original period files retained" },
      { title: "Make it repeatable", short: "Structured data", detail: "Repeatable transformation", nodes: ["Synapse · Python", "Structured reconciliation data", "Serverless SQL views"], annotation: "Extract · standardize · validate" },
      { title: "Support the review", short: "Financial review", detail: "Traceable reporting", nodes: ["Power BI Report Builder", "Human review & investigation"], annotation: "Exceptions remain visible" },
    ],
    caption: "Source preservation → repeatable processing → accountable review",
    note: "Anonymized implementation",
  },
  consultation: {
    label: "Consultation intelligence",
    platform: "Google Cloud",
    stages: [
      { title: "Capture the context", short: "Client intake", detail: "Structured client context", nodes: ["Google Forms intake", "Apps Script event trigger"], annotation: "Preparation starts with a response" },
      { title: "Organize the research", short: "Research & analysis", detail: "Context-informed research", nodes: ["Cloud Run research service", "Intake + open-source research", "Vertex AI analysis"], annotation: "Context and research inform analysis" },
      { title: "Prepare the conversation", short: "Preparation brief", detail: "A document ready for review", nodes: ["Google Workspace document", "Human review before consultation"], annotation: "Judgment stays with the consultant" },
    ],
    caption: "Structured intake → research and analysis → a reviewable brief",
    note: "Production demonstration",
  },
} as const;

function StageGlyph({ stage }: { stage: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 56 48" fill="none" className={styles.glyph}>
      {stage === 0 ? (
        <><path d="M8 11h29v29H8zM14 5h29v29M20 0h29v28" /><path d="M15 20h15M15 26h15M15 32h8" /></>
      ) : stage === 1 ? (
        <><path d="M4 24h12m24 0h12M28 0v10m0 28v10" /><path d="m28 7 17 17-17 17-17-17Z" /><path d="m28 17 7 7-7 7-7-7Z" /><circle cx="4" cy="24" r="2" /><circle cx="52" cy="24" r="2" /></>
      ) : (
        <><rect x="8" y="3" width="39" height="41" rx="2" /><path d="M15 13h24M15 19h16M15 36V27m8 9V24m8 12V29m8 7V22" /></>
      )}
    </svg>
  );
}

export function ProjectDiagram({ kind, compact = false }: ProjectDiagramProps) {
  const system = systems[kind];

  return (
    <figure className={`${styles.diagram} ${compact ? styles.compact : ""}`}>
      <figcaption className={styles.header}>
        <span>{system.label}</span><span className={styles.platform}>{system.platform}</span>
      </figcaption>
      <ol className={styles.flow}>
        {system.stages.map((stage, index) => (
          <li key={stage.title} className={styles.stage}>
            <div className={styles.stageTop}><span className={styles.number}>0{index + 1}</span><StageGlyph stage={index} /></div>
            <h3 className={styles.title}>{compact ? stage.short : stage.title}</h3>
            {compact ? <p className={styles.detail}>{stage.detail}</p> : (
              <><ol className={styles.nodes}>{stage.nodes.map((node) => <li key={node}>{node}</li>)}</ol><p className={styles.annotation}>{stage.annotation}</p></>
            )}
          </li>
        ))}
      </ol>
      <div className={styles.footer}>
        <span className={styles.signal} aria-hidden="true" /><p>{compact ? system.note : system.caption}</p><span className={styles.figureNumber} aria-hidden="true">FIG. {kind === "financial" ? "01" : "02"}</span>
      </div>
    </figure>
  );
}
