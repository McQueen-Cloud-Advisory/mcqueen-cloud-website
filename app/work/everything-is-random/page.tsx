import type { Metadata } from "next";
import Link from "next/link";
import "../work.css";
import styles from "./case.module.css";

const productUrl = "https://everythingisrandom.mcqueencloud.com";

export const metadata: Metadata = {
  title: "Everything is Random — Product & Engineering Case Study",
  description:
    "A playful browser product built with deliberate engineering: game state, random selection, responsive interaction, static delivery, and testable domain logic.",
  alternates: { canonical: "/work/everything-is-random" },
  // Keep unrelated site-level account verification out of this public case study.
  other: { "google-adsense-account": [] },
};

const roundSteps = [
  { label: "Prepare", detail: "Keep the next prompt hidden until the player is ready." },
  { label: "Play", detail: "Reveal, start the timer, score a guess, or pass." },
  { label: "Pause", detail: "Stop the clock while the group needs a moment." },
  { label: "Hand off", detail: "End the round and carry the remaining cards into the next turn." },
];

const engineeringDecisions = [
  {
    title: "Publish useful HTML, then add interaction.",
    description:
      "React Router and Vite prerender the authored pages. Instructions, tool descriptions, and sharing metadata arrive as HTML; React makes the controls interactive in the browser. Content changes require a rebuild, and the games require JavaScript.",
  },
  {
    title: "Keep the rules separate from the screen.",
    description:
      "TypeScript domain modules hold validation, selection, game transitions, and output formatting. Pages compose those rules into different experiences, so a rule can be tested without replaying an entire interface.",
  },
  {
    title: "Use workers where the work justifies them.",
    description:
      "Selected generation jobs run in Web Workers with cancellation and result-lifecycle handling. Small, bounded interactions run directly. This balances responsiveness against the overhead of moving every action into a worker.",
  },
  {
    title: "Share infrastructure, preserve the experience.",
    description:
      "Charades and drawing share timing, scoring, and card-pool rules while keeping their own prompts, instructions, and activity pages. The catalog centralizes tool descriptions and discovery; route wiring remains explicit.",
  },
  {
    title: "Plan complete turns, not just minutes.",
    description:
      "The game-night planner uses deterministic rules to balance team sizes and fit complete team cycles around setup, handoffs, breaks, and wrap-up. The displayed sample and exported plan use the same planning rules. Changed settings require a rebuilt plan before export.",
  },
];

const verification = [
  { label: "Domain rules", title: "Test what must always hold.", description: "Fixed inputs and controlled random sources exercise bounds, uniqueness, duplicate handling, shuffle preservation, team balance, and output formats." },
  { label: "Game transitions", title: "Test the moments between screens.", description: "State tests cover timing, scoring, card visibility, resets, and the remaining prompt pool. The same rules support both games." },
  { label: "Browser journeys", title: "Use the product as a visitor would.", description: "Playwright coverage exercises generation, validation, copy/download, navigation, keyboard controls, and desktop/mobile layouts against a production build." },
  { label: "Published pages", title: "Check the full delivery path.", description: "Build and hosting checks cover direct routes, rendered pages, missing-page behavior, and downloadable assets. Live checks then confirm that the published tools work." },
];

function ProductSketch() {
  return (
    <figure className={styles.productSketch}>
      <div className={styles.sketchTop}><span>Game night / Browser companion</span><span aria-hidden="true">✦</span></div>
      <div className={styles.sketchCard}>
        <svg viewBox="0 0 120 88" fill="none" aria-hidden="true">
          <rect x="13" y="19" width="47" height="47" rx="9" transform="rotate(-10 13 19)" />
          <circle cx="29" cy="33" r="2.5" /><circle cx="45" cy="29" r="2.5" /><circle cx="39" cy="43" r="2.5" /><circle cx="33" cy="56" r="2.5" /><circle cx="49" cy="53" r="2.5" />
          <path d="m72 65 4-16 27-27 11 11-27 27-15 5Zm5-17 11 11m8-30 11 11M70 73h37" />
          <path className={styles.sketchSpark} d="M80 9v12m-6-6h12M10 76h9m-4-4v8" />
        </svg>
        <p>Less setup.<br /> More play.</p>
        <span>Prompts · Timers · Team scores</span>
      </div>
      <div className={styles.sketchPhases} aria-hidden="true"><span>Reveal</span><i>→</i><span>Play</span><i>→</i><span>Next turn</span></div>
      <figcaption>Illustration of the product experience.</figcaption>
    </figure>
  );
}

function ArchitectureDiagram() {
  return (
    <figure className={styles.architecture} aria-labelledby="eir-architecture-caption">
      <div className={styles.architectureHeader}><span>System view</span><span>Static delivery / Local interaction</span></div>
      <div className={styles.deliveryPath}>
        <div><span className={styles.nodeNumber}>01 / Build</span><strong>React Router + Vite</strong><p>Prerender authored pages and bundle application code.</p></div>
        <span className={styles.flowArrow} aria-hidden="true">→</span>
        <div><span className={styles.nodeNumber}>02 / Serve</span><strong>Firebase Hosting</strong><p>Deliver HTML, styles, scripts, and downloadable assets.</p></div>
        <span className={styles.flowArrow} aria-hidden="true">→</span>
        <div><span className={styles.nodeNumber}>03 / Interact</span><strong>The visitor’s browser</strong><p>Hydrate the page and respond to the visitor’s actions.</p></div>
      </div>
      <div className={styles.browserBoundary}>
        <p className={styles.boundaryLabel}>Inside the browser</p>
        <div className={styles.browserGrid}>
          <div><h3>Interface & state</h3><p>Controls, prompt visibility, timers, and temporary results.</p></div>
          <div><h3>Domain logic</h3><p>Validation, Web Crypto sampling, game rules, and selected workers.</p></div>
          <div><h3>A usable result</h3><p>Play the next turn, read a result, copy it, or choose an available export.</p></div>
        </div>
      </div>
      <figcaption id="eir-architecture-caption">High-level application architecture. Generation and game state run locally; the diagram shows the product’s delivery and computation paths.</figcaption>
    </figure>
  );
}

export default function EverythingIsRandomCaseStudy() {
  return (
    <article>
      <header className="case-hero">
        <div className="site-shell">
          <Link href="/work" className="text-link text-sm">← Selected work</Link>
          <div className={`case-hero-grid ${styles.heroGrid}`}>
            <div>
              <p className="eyebrow">03 / Independent product</p>
              <h1 className="case-title">Everything is Random.<br /><span>Built for a little fun.</span></h1>
              <p className="lede mt-7 max-w-2xl">A free browser app for game nights, everyday decisions, and useful random results. A playful side project with deliberate work behind every interaction.</p>
              <div className={styles.heroActions}>
                <a href={`${productUrl}/`} target="_blank" rel="noopener noreferrer" className="button button-primary">Explore the live product <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                <span className="work-project-status">Designed and built by Scott McQueen</span>
              </div>
            </div>
            <ProductSketch />
          </div>
        </div>
      </header>

      <section className="case-summary" aria-label="Project overview">
        <dl className="site-shell case-summary-grid">
          <div className="case-summary-item"><dt>Product</dt><dd>Games, decision tools, and generators available without an account</dd></div>
          <div className="case-summary-item"><dt>Role</dt><dd>Product design, application architecture, implementation, and verification</dd></div>
          <div className="case-summary-item"><dt>Engineering focus</dt><dd>Explicit rules, responsive interaction, and clear state boundaries</dd></div>
        </dl>
      </section>

      <div className="site-shell case-story">
        <section className="case-section">
          <p className="case-section-label"><span>01</span> The product experience</p>
          <div>
            <h2>Pick something. Get playing.</h2>
            <div className="case-prose">
              <p>The starting point is an ordinary moment: a group needs a game, a choice needs making, or a project needs a few useful values. Everything is Random brings those small tasks into one approachable product, with clear controls and results people can use immediately.</p>
              <p>The homepage puts charades and drawing first. Players choose the kind of prompts, prepare a round, keep the answer hidden from guessers, and use the timer and team scores to keep play moving. The drawing game supplies the prompts; players bring paper or a whiteboard.</p>
            </div>
            <div className={styles.experienceGrid}>
              <div><span className="eyebrow">Play together</span><h3>Help the host, then get out of the way.</h3><p>Family and party presets, clear instructions, optional team scoring, and a printable starter kit make the product useful around a real table.</p><a className="text-link" href={`${productUrl}/tools/charades/`} target="_blank" rel="noopener noreferrer">Try a round of charades <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
              <div><span className="eyebrow">Make something useful</span><h3>A small tool with a complete result.</h3><p>Spin a decision wheel, split participants into teams, or generate numbers, strings, and UUIDs. Search and categories keep the broader toolbox within reach.</p><a className="text-link" href={`${productUrl}/tools/random-teams/`} target="_blank" rel="noopener noreferrer">Explore the team generator <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
              <div className={styles.plannerFeature}>
                <span className="eyebrow">Plan the evening</span>
                <h3>Make room for every team.</h3>
                <p>The game-night planner turns group size and available time into balanced team sizes, equal turns for each team within an activity, and a practical host schedule. Copy, download, or print the plan to keep it at hand.</p>
                <p>Game links open a preset in a new tab so the plan stays visible. The host sets the listed team count and timer before play; setup, handoffs, and buffer time are part of the schedule.</p>
                <a className="text-link" href={`${productUrl}/tools/game-night-planner/`} target="_blank" rel="noopener noreferrer">Plan a game night <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <p className="case-section-label"><span>02</span> Application architecture</p>
          <div>
            <h2>A simple delivery path.<br /> A capable browser.</h2>
            <div className="case-prose"><p>The application pairs prerendered pages with interactive React components. Hosting serves the product; the visitor’s browser handles generation and game state. That keeps the core tools independent of a generation API, an account system, or a database.</p></div>
            <ArchitectureDiagram />
            <div className="case-decisions">{engineeringDecisions.map((decision) => <div key={decision.title} className="case-decision"><h3>{decision.title}</h3><p>{decision.description}</p></div>)}</div>
          </div>
        </section>

        <section className="case-section">
          <p className="case-section-label"><span>03</span> Interaction design</p>
          <div>
            <h2>A game is a sequence of promises.</h2>
            <div className="case-prose"><p>A prompt should stay hidden until the player reveals it. A correct answer should count once. Pausing should preserve the time remaining. Starting the next team’s turn should keep already-used cards out of the pool. These small expectations define whether a casual game feels dependable.</p></div>
            <figure className={styles.roundFlow}>
              <ol>{roundSteps.map((step, index) => <li key={step.label}><span className={styles.roundNumber}>0{index + 1}</span><strong>{step.label}</strong><p>{step.detail}</p></li>)}</ol>
              <figcaption>A simplified view of a round. Pause is optional; the implemented state machine also handles reset and completion.</figcaption>
            </figure>
            <div className="case-prose"><p>Charades and drawing use a shared state machine for those transitions. Timers follow deadlines instead of assuming every screen update arrives on time. Drawn cards leave the pool across rounds, including passes, and a reset starts a fresh game.</p><p>The interface explains that cards and scores belong to the current open page. Sharing an activity sends a curated preset, so another group can start its own game.</p></div>
          </div>
        </section>

        <section className="case-section">
          <p className="case-section-label"><span>04</span> Rules behind the result</p>
          <div>
            <h2>Define the possibilities.<br /> Then make the draw.</h2>
            <div className="case-prose"><p>Randomness is only one part of a useful generator. The application also has to define which values are eligible, how duplicates behave, what “unique” means, and when a request is impossible. Those rules are visible in the controls and reflected in validation.</p><p>A shared sampling layer uses browser Web Crypto and bounded selection. Lists use Fisher–Yates shuffling. The test interface can supply known values to exercise exact branches, while the published generators use the browser’s random source.</p></div>
            <dl className={styles.rulesList}>
              <div><dt>Team balance</dt><dd>Shuffle participants and distribute them so team sizes differ by at most one.</dd></div>
              <div><dt>Duplicate entries</dt><dd>Repeated list entries count separately unless the visitor chooses to remove duplicates.</dd></div>
              <div><dt>Unique results</dt><dd>Uniqueness applies within the requested batch or current pool, with validation against the available choices.</dd></div>
              <div><dt>Useful output</dt><dd>Text labels, copy actions, and supported file formats make results usable beyond the visual draw.</dd></div>
            </dl>
            <aside className="case-note"><h3 className="eyebrow">Clear scope</h3><p>These are browser tools for everyday use. Testing their rules does not establish independent certification or make a draw publicly auditable. The <a href={`${productUrl}/why/`} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>product’s About page<span className="sr-only"> (opens in a new tab)</span></a> explains the intended use and limits.</p></aside>
          </div>
        </section>

        <section className="case-section">
          <p className="case-section-label"><span>05</span> Verification</p>
          <div>
            <h2>Test the rules.<br /> Then play the game.</h2>
            <div className="case-prose"><p>The project combines unit tests for domain rules with browser workflows for the experience around them. That distinction matters: a valid generated value is only useful if the visitor can configure the tool, understand the result, and complete the next action.</p></div>
            <div className={styles.verificationGrid}>{verification.map((item) => <div key={item.label}><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
            <div className="case-prose"><p>Live product review exercised prompt reveals, timer starts, scoring, and completed rounds in both games, along with a decision-wheel result, team generation, and UUID generation. Planner review confirmed balanced teams, complete activity cycles, consistent output for the same inputs, and a downloadable schedule.</p></div>
          </div>
        </section>

        <section className="case-section">
          <p className="case-section-label"><span>06</span> Tradeoffs & capability</p>
          <div>
            <h2>Keep the product small.<br /> Make the thinking visible.</h2>
            <div className="case-prose"><p>Temporary browser state keeps the core interactions straightforward, with the tradeoff that leaving or reloading a tool can discard the current work. The games are designed around people sharing a device and a room; they do not synchronize a multiplayer session across devices.</p><p>Authored prompt banks give the games a reviewable voice and finite variety. Application rules produce the results during use. AI-assisted development supported building and testing the product, while architecture, validation, and what ships remain engineering decisions.</p><p>Local computation is a precise boundary, not a claim that a visit produces no network activity. The <a href={`${productUrl}/privacy/`} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>public privacy page<span className="sr-only"> (opens in a new tab)</span></a> distinguishes tool data from saved preferences and ordinary site services.</p></div>
            <ul className="case-objectives"><li>Turning a small idea into a coherent public product</li><li>TypeScript domain modeling and reusable interaction rules</li><li>Responsive React interfaces and accessible controls</li><li>Browser computation, workers, and explicit state lifecycles</li><li>Automated verification across logic, interaction, and delivery</li><li>Explaining capabilities and limits in the product itself</li></ul>
            <p className="eyebrow mt-8">Technical implementation</p>
            <ul className="case-technologies" aria-label="Technologies"><li>React</li><li>TypeScript</li><li>React Router</li><li>Vite</li><li>Web Crypto</li><li>Web Workers</li><li>Vitest</li><li>Playwright</li><li>Firebase Hosting</li></ul>
          </div>
        </section>

        <div className={styles.closing}>
          <div><p className="eyebrow">Try it yourself</p><h2>Bring a few people.<br /> Or just a little curiosity.</h2></div>
          <div className={styles.closingActions}><a href={`${productUrl}/`} target="_blank" rel="noopener noreferrer" className="button button-primary">Open Everything is Random <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><Link href="/work" className="text-link">Back to selected work <span aria-hidden="true">↗</span></Link></div>
        </div>
      </div>
    </article>
  );
}
