import styles from "./IndependentProjectFeature.module.css";

export const everythingIsRandomUrl = "https://everythingisrandom.mcqueencloud.com/";

export function IndependentProjectFeature() {
  return (
    <aside className={styles.feature} aria-labelledby="independent-project-title">
      <div className={styles.copy}>
        <p className="eyebrow">Independent project / Live on the web</p>
        <h2 id="independent-project-title">Everything is Random.</h2>
        <p>A playful side of the same engineering practice. Free browser tools for games, decisions, creative ideas, and random data—from a quick dice roll to your next game of charades.</p>
        <a href={everythingIsRandomUrl} target="_blank" rel="noopener noreferrer" className="text-link">
          Explore Everything is Random <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.tile}>
          <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="6" /><g fill="currentColor" stroke="none"><circle cx="17" cy="17" r="2" /><circle cx="31" cy="17" r="2" /><circle cx="24" cy="24" r="2" /><circle cx="17" cy="31" r="2" /><circle cx="31" cy="31" r="2" /></g></svg>
          <span>Games</span>
        </div>
        <div className={styles.tile}>
          <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" /><path d="M24 8v16l14 8M24 24l-14 8" /><path d="m33 5 6 2-4 5" /></svg>
          <span>Decisions</span>
        </div>
        <div className={styles.tile}>
          <svg viewBox="0 0 48 48" fill="none"><path d="m10 34 2-9L32 5l9 9-20 20-11 2Zm3-10 10 10M28 9l9 9M9 42h30" /></svg>
          <span>Ideas</span>
        </div>
        <div className={styles.tile}>
          <svg viewBox="0 0 48 48" fill="none"><path d="m15 10-9 14 9 14m18-28 9 14-9 14M27 8l-6 32" /></svg>
          <span>Data</span>
        </div>
      </div>
    </aside>
  );
}
