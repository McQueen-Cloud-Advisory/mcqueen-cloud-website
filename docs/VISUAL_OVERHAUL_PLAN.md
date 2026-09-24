# McQueen Cloud Advisory — Visual Overhaul Plan

Status: Implemented locally and ready for visual review. See [implementation and verification notes](VISUAL_OVERHAUL_REVIEW.md). The sections below retain the original design brief and acceptance criteria.

## Purpose and direction

Raise the site to the standard of a distinctive public portfolio of Scott McQueen's work. The priority is visual craft, technical credibility, and a memorable identity. Consulting inquiries remain welcome, but generating more leads is not the primary measure of success.

The requested direction is **modern, sleek, and professional, with a restrained technology, architecture, and analytics character**.

Build that identity around three signature elements:

1. A composed homepage hero with a custom system illustration.
2. Substantial case-study presentations that make real outcomes and engineering decisions visible.
3. A refined assessment experience with results presented as a clear advisory report.

These should feel like parts of one designed system. Distinctiveness should come from typography, composition, and original visual explanations of the work.

## What the current site gives us

This plan is based on the current repository, architecture and development notes, test source, and retrieved public homepage content. An interactive browser was unavailable during planning, so rendered layout, computed styles, screenshots, and measured performance still need a baseline review in Phase 1. Reference sites below were reviewed through retrieved content, not a screenshot audit.

| Finding | Design implication |
| --- | --- |
| Most pages repeat slate backgrounds, blue accents, rounded bordered panels, and similar section spacing. | Introduce deliberate contrast in scale, surface, and composition. Give each content type its own hierarchy. |
| The homepage hero uses its second column for another list of promises; capabilities precede the featured project. | Give the hero an original visual and bring concrete work immediately below it. |
| Only consultation automation is featured; the enterprise project records approximately 30 hours of manual effort saved monthly. | Show both projects, leading with the enterprise outcome and preserving its qualification and anonymity. |
| Architecture appears largely as lists and ASCII diagrams. | Turn existing technical content into accurate, custom vector illustrations. |
| Geist and Geist Mono are loaded, while global body CSS explicitly selects Arial. | Apply an intentional type system and verify the rendered font. |
| The assessment already has a deterministic engine and repeats its opening headline across the route and intro state. | Consolidate the introduction and improve presentation around the existing behavior. |
| Insights repeats its single article as featured and latest content. | Present a small collection confidently, with less repetition. |
| Scott appears in an About-page aside. | Make the person and judgment behind the work easier to find. |
| Public assets are starter SVGs; there is no established custom illustration library. | Treat original diagram design as a central deliverable. |
| Axe currently disables color-contrast checks; browser coverage is Desktop Chromium. | Include contrast and targeted mobile/state verification in the redesign's acceptance criteria. |

Primary source files: `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `data/projects.ts`, `app/work/**`, `app/about/page.tsx`, `app/insights/page.tsx`, `components/assessment/**`, and `e2e/**`.

## Visual system

### Palette and surfaces

Use a mineral near-white canvas for reading, deep graphite for the hero and selected technical illustrations, and restrained blue for links, focus, selection, and key paths. This is one fixed, composed identity; a theme switcher is outside this project.

Starting palette for prototype evaluation:

| Role | Proposed value | Use |
| --- | --- | --- |
| Canvas | `#F5F7FA` | Main reading surfaces |
| Surface | `#FFFFFF` | Forms and occasional contained content |
| Graphite | `#111820` | Hero, diagram fields, primary text on light surfaces |
| Secondary text | `#526171` | Supporting text on light surfaces |
| Accent | `#245BDB` | Links, primary controls, active diagram paths on light surfaces |
| Accent on dark | `#8CB8FF` | Links and selected details on graphite |
| Subtle rule | `#D8DFE7` | Decorative dividers; not sufficient by itself for essential control boundaries |

These are candidates, not certified accessible pairings. Define semantic tokens for each surface, text, interaction, and status role, then test every actual pairing. Keep assessment warning/success colors separate from the brand accent.

### Typography and layout

- Apply Geist as the primary face and Geist Mono for small figure labels, sequence numbers, and technical annotations. Prove the composition with existing fonts before considering another typeface.
- Use short, expressive headlines: approximately 72–88px on wide desktop and 40–48px on mobile, with fluid sizing and carefully controlled wrapping.
- Keep body text around 17–18px, generous line height, and long-form measures around 60–72 characters.
- Use a 12-column desktop grid, approximately 1,200–1,280px maximum content width, and 20–24px mobile gutters. Let project compositions use unequal columns where useful.
- Establish a spacing scale and vary section depth by importance. Reserve the most generous space for the hero and selected work.
- Use fine rules and alignment to group information. Reserve modest corner radii for controls and genuinely contained surfaces.

### Original visual language

Create a family of precise diagrams using labeled inputs, processing stages, control boundaries, and outputs. Use consistent line weights, node shapes, spacing, and annotations. The architecture and analytics character should be visible without requiring visitors to read a technology list.

The hero illustration should show fragmented operational inputs becoming a structured, reviewable output. Label it as a conceptual illustration. Actual project diagrams must follow the documented systems and retain their distinct Azure and Google Cloud contexts.

Required assets:

- One hero system illustration, designed separately for wide and narrow layouts.
- One financial reconciliation diagram, based on source files → storage → transformation → governed query → reporting, with human review clearly represented.
- One consultation workflow diagram, following the existing case-study architecture and its research/document-generation branches.
- A static preview of the redesigned assessment report, generated from a documented synthetic response set and visibly labeled as an example.
- Coordinated social preview imagery and a simple favicon derived from the wordmark/diagram language.

Author diagrams with SVG and HTML/CSS. Give meaningful diagrams accessible text equivalents; hide purely decorative geometry from assistive technology. Do not render a large desktop diagram as tiny unreadable text on mobile: recompose it vertically.

Avoid stock cloud photography, invented dashboards or customer logos, decorative KPI counters, and diagrams that imply unimplemented infrastructure. A real founder portrait is optional; the initial design must work without one.

### Motion

Use brief hover/focus transitions and, if it improves the composition, one short path-drawing sequence in the hero. Content must be visible before enhancement and remain complete when motion is disabled. Keep scrolling native. Avoid continuous particle fields, scroll hijacking, cursor effects, and mandatory video or WebGL.

## Homepage composition

| Sequence | Proposed presentation | Purpose |
| --- | --- | --- |
| Header | Refined text wordmark; Work, Assessment, Insights, About, Services; quiet Contact link. | Put proof and exploration first while keeping all routes reachable. |
| Hero | Graphite field, large concise headline, one short description, original system illustration, and two clear links. | Establish craft and subject matter immediately. |
| Selected work | Two substantial project compositions with different diagrams and the same underlying design rules. | Make the work the main evidence. |
| Assessment | Contrasting technical panel with a legible example report excerpt and a single invitation to try it. | Present the functioning assessment as a flagship artifact. |
| Approach | Three concise principles, each tied to a decision in the published work. | Show judgment with concrete examples. |
| Writing and person | Existing article, knowledge-base link, and short introduction to Scott. | Connect the work to ongoing technical thinking and its author. |
| Footer | Restrained closing statement, Contact, and existing useful links. | Leave a clear next step without repeating a sales pitch. |

Proposed hero copy for the prototype:

> **Complex operations. Clear systems.**
>
> Analytics, automation, and cloud architecture by Scott McQueen. Explore the systems, decisions, and working tools behind the work.
>
> View selected work · Explore the assessment

Lead the selected-work section with **approximately 30 hours of manual effort saved per month**, explicitly attached to the anonymized enterprise reconciliation case. Give the consultation workflow its own visual story and retain its **Production demonstration** label. Preserve the distinction between a project outcome, a demonstration, and a conceptual graphic.

## Route-by-route changes

| Surface | Proposed change |
| --- | --- |
| `/work` | Two substantial entries with outcome, status, short context, and custom visual. Keep technology details subordinate to the result. |
| Both case studies | Outcome → problem and constraints → annotated system diagram → key decisions → evidence and controls → limitations. Consolidate duplicate architecture presentations while retaining technical substance and confidentiality notes. |
| `/assessment` introduction | One composed opening, compact question/domain/time metadata, clear privacy statement, and a prominent start control. |
| Assessment questions | Calm reading surface, clear domain and question progress, four spacious native radio options, strong selected/focus states, and stable Back/Next placement. Reduce introductory page furniture around the active task. |
| Assessment results | Designed report with stage/profile, primary constraint and best opportunity, six labeled domain scores, and a 30/60/90-day sequence. Preserve gaps, deferments, support model, explanations, and directional-guidance context. |
| `/about` | Lead with Scott, his perspective, and selected experience. Compact credentials and remove repeated general positioning. |
| `/insights` and article | One strong article presentation, a clear knowledge-base link, and an excellent reading layout. Remove duplicate listing and empty collection scaffolding. |
| `/services` | Concise capabilities connected to actual work; maintain assessment and contact paths. Use the new identity without expanding service offerings. |
| `/contact` | Simple, composed contact destination using existing channels and booking path. Avoid adding qualification flows. |
| Shared edges | Apply the identity to header, footer, engagement links, 404, favicon, Open Graph, and Twitter/X preview imagery. |

For domain scores, prefer aligned labeled bars or scales showing existing values over a decorative radar chart. Keep the numeric values and maturity descriptions visible, and avoid presenting the average as the sole verdict. Reordering the report must preserve the engine's dependency-aware priorities.

## Scope and technical boundaries

Retain Next.js, React, Tailwind, Firebase App Hosting, existing routes, and the current delivery workflow. Static content should remain server-rendered; isolate any small interactive visual enhancements.

The assessment's 24 questions, six domains, question IDs/order, answer meanings, scoring, dependencies, recommendations, and browser-only/no-storage behavior remain unchanged. Keep `lib/assessment/**`, `data/assessment.ts`, and `data/recommendations.ts` outside the visual redesign.

Preserve native radio semantics, keyboard operation, progress semantics, disabled Next before selection, Back retaining responses, and Restart clearing responses. Preserve the skip link, active navigation state, mobile-menu semantics, outcome-first case studies, and knowledge-base discoverability.

Do not add a CMS, backend, lead gate, chatbot, authentication, analytics installation, PDF export, new assessment logic, or a component/chart/animation framework as part of this overhaul. No infrastructure work is needed for the visual direction.

Introduce only reusable presentation pieces justified by the designed pages: buttons/links, section labels, project presentation, diagram framing, and report sections. Avoid a broad component-library refactor before the homepage and case-study prototype establish the actual patterns.

## Implementation sequence

Each phase produces a reviewable result. The design review is about concrete screens and assets, not abstract mood descriptions.

| Phase | Deliverable and dependencies | Completion gate |
| --- | --- | --- |
| 1. Baseline and visual prototype | Capture current desktop/mobile home, case-study, question, and result states; record baseline performance. Produce complete desktop/mobile visual compositions for the homepage and one case study, plus a report excerpt to validate the assessment direction. | The screens demonstrate the requested restrained technical character, visible proof, and readable mobile diagrams. Decide final palette and composition here. |
| 2. Foundation and homepage | Implement tokens, applied typography, shared shell, hero illustration, and the new homepage hierarchy. Depends on Phase 1. | The homepage feels distinctive at 390px and 1440px, with accurate proof and a clear route to both projects and the assessment. |
| 3. Work and case studies | Complete both original project diagrams; redesign the work index and both case studies. Depends on established visual rules. | Outcomes remain before technology, technical detail is legible, and actual versus illustrative material is clear. |
| 4. Assessment and remaining pages | Restyle intro/questions/report; simplify About, Insights, Services, and Contact; finish 404 and share imagery. Reuse the established system. | All routes and assessment states feel related; existing behavior and content contracts hold. |
| 5. Quality and release preparation | Visual review, targeted behavioral/accessibility coverage, production build, performance comparison, and normal PR validation. | Acceptance criteria below pass. Prepare release through the existing protected-branch/Firebase workflow when implementation and release are authorized. |

The first design milestone is **a complete desktop/mobile homepage and one case-study composition**. Resolve the visual quality there before implementing and propagating patterns across every route.

If time is constrained, prioritize the hero, selected work, original diagrams, and shared typography; then the assessment report and public share preview. Drop optional motion before reducing visual coherence or mobile quality. Do not ship a partial theme that leaves the quiz or secondary pages visibly disconnected.

### File map

| Area | Likely files |
| --- | --- |
| Tokens and typography | `app/globals.css`, `app/layout.tsx` |
| Shared identity | `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/engagement/**` |
| Homepage and project presentation | `app/page.tsx`, `app/work/**`, `data/projects.ts` for presentation metadata only |
| Original diagrams | New task-specific components under `components/visuals/` and/or assets under `public/` |
| Assessment presentation | `app/assessment/page.tsx`, `components/assessment/Assessment.tsx`, `AssessmentQuestion.tsx`, `AssessmentProgress.tsx`, `AssessmentResults.tsx` |
| Supporting routes | `app/about/page.tsx`, `app/services/page.tsx`, `app/insights/**`, `app/contact/page.tsx`, `app/not-found.tsx` |
| Share identity | `lib/social-image.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/favicon.ico` |
| Verification | `e2e/**`, `playwright.config.ts`, affected content-hierarchy/discoverability tests |

## Acceptance criteria

### Visual and content quality

- At first glance, the homepage communicates the subject and gives the work a recognizable visual identity. It includes a designed artifact rather than another paragraph panel.
- In a brief review with someone unfamiliar with the site, they can identify what Scott does, one real outcome, and where to inspect the work or try the assessment.
- Both project illustrations are specific to their documented systems. The approximate savings figure remains qualified; the demonstration and anonymized project remain accurately labeled.
- The homepage, case study, quiz, and report each have a deliberate hierarchy, with typography and diagram rules tying them together.
- Inspect 360px, 390px, 768px, and 1440px layouts, plus browser zoom. No horizontal page overflow, clipped labels, undersized diagram text, or obscured focused controls.
- Review representative screenshots as images, not only DOM assertions. Include the mobile menu, a long answer, a long result profile, and the social share image.

### Accessibility and behavior

- Re-enable Axe color-contrast checks and fix failures. Target WCAG AA contrast: at least 4.5:1 for normal text and 3:1 for qualifying large text; verify essential control boundaries and focus separately. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Extend scans to both case studies and the assessment question/result states. Retain zero serious/critical Axe violations, plus manual keyboard and zoom review.
- Verify first-question disabled Next, answer selection by keyboard, Back preserving a response, completion, and Restart. Check focus when entering the completed report as well as between questions.
- Review all-low, all-high, and mixed constrained response profiles so different report lengths and warning states remain readable. Reuse existing engine fixtures where practical.
- Keep the assessment engine tests unchanged and passing. Add targeted behavior tests only where presentation restructuring creates a meaningful regression risk.
- Adapt source-string content tests if component extraction requires it, preserving outcome-before-technology and knowledge-base placement requirements through meaningful rendered assertions where appropriate.
- Verify targeted mobile Chromium coverage and a Safari/WebKit spot check when available. Any unavailable checks must be recorded rather than reported as passed.

### Performance and release quality

- Record a production-build baseline before adding assets. Compare the same routes under the same mobile lab settings afterward; inspect LCP, layout shift, loading weight, and interaction responsiveness.
- Use the Core Web Vitals good thresholds as targets: LCP ≤2.5 seconds, INP ≤200ms, CLS ≤0.1. These are field metrics evaluated at the 75th percentile; a lab run alone does not establish a field pass, and this low-traffic site may lack field data. [Web Vitals guidance](https://web.dev/articles/vitals).
- Keep critical text available without animation, reserve asset dimensions, avoid blocking font/visual loading, and avoid adding a heavy client runtime for decorative effects.
- Run `npm run lint`, `npm test`, `npm run build`, `npx playwright test --workers=1`, and `git diff --check` for implementation. Pass existing CI and verify public routes, metadata, sitemap, robots, and 404 behavior.
- Use the existing PR and Firebase rollout process. Once a release is authorized, verify production and retain the existing rollback path.

## Reference material for the design pass

Use these as focused references for how to present technical work; the proposed palette and layout above are McQueen-specific design recommendations.

- [Oxide](https://oxide.computer/) places its actual cloud computer and integrated platform at the center of its story. The relevant lesson is to make the system itself visible; use McQueen's workflows as the subject.
- [Stripe Dot Dev](https://stripe.dev/) organizes engineering material with figure labels, content types, and a clear editorial index. The relevant lesson is confident presentation of technical content; scale the collection to the site's real inventory.
- Review current motion, spacing, and responsive behavior visually during Phase 1 before adopting any specific reference treatment. Borrow principles, not another company's branding or assets.

## Planning handoff

This document is a proposed visual workstream alongside `docs/SITE_ENGINEERING_PLAN.md`. Current-state architecture remains documented in `docs/ARCHITECTURE.md`; update implementation history only as redesign work is completed. Existing staged edits to architecture, development notes, and `.gitignore` were left intact.

The desktop/mobile direction has been implemented across the homepage, case studies, assessment, and supporting routes. Review the local site and the verification notes before the normal release workflow.
