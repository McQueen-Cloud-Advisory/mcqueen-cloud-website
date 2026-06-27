# McQueen Cloud Advisory Website — Development Notes

## Project purpose

This project replaced a basic Google Sites presence with a professional, production-oriented website for McQueen Cloud Advisory.

The website was designed to do more than describe the company. It was intended to demonstrate the same capabilities offered to clients:

- Practical cloud architecture
- Version-controlled development
- Automated testing and deployment
- Analytics and workflow automation
- Clear technical documentation
- Secure, maintainable implementation choices
- Business-focused communication

These notes document the project chronologically. They complement `README.md`, which explains how to use and run the repository, and `ARCHITECTURE.md`, which explains the technical design and major platform choices.

---

## 1. Defined the target architecture

The initial design decision was to move from Google Sites to a custom Next.js application hosted on Firebase App Hosting.

### Selected stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Firebase App Hosting
- **Source control:** GitHub
- **Deployment:** Automatic Firebase rollout from the `main` branch
- **Planned integrations:** Firebase, Google Cloud, Google Workspace, and Cloud Run where justified

### Why Firebase App Hosting

Firebase App Hosting was selected because it provides a managed path for deploying a modern framework-based application while preserving room for future dynamic functionality.

The current website is mostly static, but the long-term design may include:

- Structured consultation intake
- Interactive assessment tools
- Server-side form processing
- Firestore-backed records
- Integration with an automated consultation preparation workflow
- Additional Google Cloud services

A direct Cloud Run deployment would have provided more control, but it would also have introduced more infrastructure work than the initial website required.

---

## 2. Created the Next.js project

A new Next.js project was created using the recommended defaults from `create-next-app`.

The generated project included:

- TypeScript
- Tailwind CSS
- ESLint
- The App Router
- Turbopack
- Standard import aliases

The application was tested locally with:

```bash
npm run dev
```

The initial production build was validated with:

```bash
npm run build
```

### Early dependency issue

The editor initially reported:

```text
This JSX tag requires the module path 'react/jsx-runtime' to exist
```

The issue was resolved by reinstalling project dependencies and confirming that:

- The project root was open in VS Code
- `page.tsx` used the `.tsx` extension
- React, Next.js, and TypeScript dependencies were present
- The TypeScript language service was reloaded

---

## 3. Created and connected the GitHub repository

A GitHub repository was created for the website and the local project was connected to it.

The initial source-control workflow was:

```bash
git add .
git commit -m "Initialize McQueen Cloud website"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

### Remote configuration issue

During the first deployment cycle, a homepage update appeared to commit locally but did not appear in the expected repository.

The issue was diagnosed with:

```bash
git remote -v
git rev-parse --show-toplevel
git status
```

The local remote was corrected, and the updated homepage was successfully pushed to the intended repository.

---

## 4. Deployed the initial site to Firebase App Hosting

A Firebase project and App Hosting backend were created.

### Initial deployment settings

- **Live branch:** `main`
- **App root directory:** `/`
- **Automatic rollouts:** Enabled
- **Region:** United States
- **GitHub repository:** Website repository
- **Production deployment:** Triggered from `main`

Firebase successfully deployed the default Next.js starter page to a temporary `hosted.app` URL.

A subsequent GitHub push confirmed that automatic deployment from `main` was working.

### Deployment verification issue

The first Firebase deployment showed the default Next.js page rather than the edited homepage.

The root cause was that the updated `page.tsx` file had not been committed and pushed.

The fix was:

```bash
git add app/page.tsx
git commit -m "Update homepage content"
git push origin main
```

After the new commit reached GitHub, Firebase automatically created a new rollout.

---

## 5. Added repository documentation

Two primary documentation files were created.

### `README.md`

The README documents:

- Project purpose
- Current status
- Technology stack
- Local setup
- Git workflow
- Deployment workflow
- Planned features
- Security principles
- Repository structure
- Architectural boundaries

### `ARCHITECTURE.md`

The architecture document includes:

- A Mermaid architecture diagram
- Current-state deployment design
- Technology-selection rationale
- Planned Google Cloud integrations
- Security principles
- Deliberate non-goals
- Phased roadmap

These development notes were later added to preserve the sequential history and implementation decisions that are not captured by the README or architecture overview.

---

## 6. Built the shared site foundation

The initial single-page application was expanded into a reusable site structure.

### Shared components

Created:

```text
components/layout/Header.tsx
components/layout/Footer.tsx
```

The root layout was updated to include:

- Shared header
- Shared footer
- Site metadata
- Global font configuration
- Consistent dark theme
- Full-height page structure

### Route structure

The following routes were created:

```text
/
/services
/work
/insights
/about
/contact
```

The build confirmed that all routes were statically generated.

### Folder-structure correction

The project used a root-level `app` folder rather than `src/app`.

An early component folder was mistakenly created under:

```text
src/components/layout
```

It was moved to:

```text
components/layout
```

This kept the project consistent with the existing root-level App Router structure and import alias behavior.

---

## 7. Built the Work section and first case study

The Work section was designed to provide evidence of capability rather than a list of marketing claims.

### Shared project data

Created:

```text
data/projects.ts
```

The first project added was:

**Automated Consultation Intelligence Workflow**

The case study describes an event-driven workflow using:

- Google Forms
- Apps Script
- Cloud Run
- Vertex AI
- Google Workspace
- GitHub Actions

The public case study focuses on:

- The business problem
- Design objectives
- Architecture
- Technology choices
- Outcome
- Tradeoffs
- What the project demonstrates

The implementation produced a reusable project-card pattern on `/work`.

---

## 8. Rebuilt the homepage around proof

The homepage was changed from a simple hero page into a proof-focused landing page.

### Added sections

- Clearer value proposition
- Capability summary
- Featured project
- Architecture-oriented evidence
- Delivery approach
- Consultation call to action

The project data model was extended with:

```ts
featured: boolean
outcome: string
```

This allowed the homepage to display the featured case study and its business result without duplicating content.

### Responsive typography note

At one desktop width, the hero headline wrapped more aggressively than intended.

A possible breakpoint adjustment was identified, but it was intentionally deferred because it did not block the MVP.

---

## 9. Built the Services page

The placeholder Services page was replaced with detailed, bounded offerings.

### Service areas

- Analytics and BI Modernization
- Workflow Automation
- Google Cloud Architecture
- AI-Enabled Knowledge Workflows

Each service includes:

- Problems addressed
- Possible deliverables
- Intended result
- Supporting technologies

The page also documents deliberate boundaries, including avoiding:

- Technology-first design
- Unnecessary custom platforms
- Ungrounded AI output
- Dashboards without metric definitions
- Automation that hides exceptions or controls

This was intended to make the service offering more credible and less generic.

---

## 10. Built the About page

The About page was designed to establish credibility without becoming a résumé or certification wall.

### Focus areas

- Enterprise analytics experience
- Financial and controlled processes
- Cloud architecture and automation
- Delivery and adoption
- Practical working principles
- Selected certifications

The page explicitly positions certifications as supporting evidence rather than the core value proposition.

---

## 11. Built the Contact page

The Contact page was created around the existing Google Calendar consultation scheduling flow.

### Primary paths

- Book a consultation
- Review selected work
- Follow McQueen Cloud Advisory on LinkedIn
- Watch technical content on YouTube

The page also explains:

- What to prepare
- What happens next
- Good-fit problems
- Privacy expectations
- What clients should expect from the first conversation

A fake contact form was deliberately avoided because there was no backend submission path yet.

The page was later expanded with a secondary **Follow and learn** section linking to:

- LinkedIn company updates and project announcements
- YouTube technical walkthroughs, architecture discussions, and solution demonstrations

These links remain secondary to the consultation call to action so they support trust and ongoing engagement without competing with the primary conversion path.

### Copy/paste issue

The original code was accidentally pasted with Markdown code fences:

```text
```tsx
```

This caused a runtime error because the fence text became part of the TypeScript file.

The fix was to remove the opening and closing Markdown fences so the file began directly with the import statements.

---

## 12. Built the Insights section

The Insights area was created as a curated technical library rather than a high-volume generic blog.

### First article

**Why This Website Uses Firebase App Hosting**

The article documents:

- Requirements
- Options considered
- Deployment architecture
- Platform rationale
- Tradeoffs
- Reconsideration triggers
- Official references

This article turns the website itself into a documented architecture case study.

The Insights hub was built with shared data stored in:

```text
data/insights.ts
```

---

## 13. Evaluated an additional analytics case study

A possible **Cloud Financial Analytics Platform** case study was evaluated for inclusion.

The proposed case study would have demonstrated technologies such as:

- BigQuery
- dbt
- GitHub Actions
- Workload Identity Federation
- Looker Studio
- SQL
- Automated data tests
- Layered data modeling

The project was not retained as a current public case study because there was no completed standalone project page that could be represented accurately. The site continues to follow the rule that only completed, supportable work should be published.


---

## 14. Added a second anonymized enterprise case study

A third case study was added:

**Enterprise Financial Reconciliation Automation**

The project was intentionally anonymized to protect confidential organizational and financial details.

### Publicly presented outcomes

- Approximately 30 hours of recurring manual effort reduced per month
- Improved consistency
- Better traceability
- Clearer exception visibility
- Support for structured financial review

### Confidentiality protections

The case study omits:

- Employer name
- Program or plan name
- Account structures
- Source-system identifiers
- Confidential financial records
- Detailed internal control procedures

The page clearly states that automation supported the process and did not replace accountable human review.

### Incomplete project deliberately excluded

An unfinished Financial Analytics Hub project was not added to the public site. The decision was to publish only projects that could be explained credibly and completely.

---

## 15. Added responsive mobile navigation

The original header was desktop-oriented.

`Header.tsx` was converted into a Client Component using:

```tsx
"use client";
```

The responsive header added:

- Mobile hamburger menu
- Close icon
- Active-page highlighting
- Sticky positioning
- Keyboard focus styling
- Menu closing after navigation
- Responsive company-name treatment

The current route is detected with `usePathname`.

---

## 16. Added accessibility infrastructure

Accessibility hardening was added before launch.

### Skip navigation

The root layout now includes a skip link:

```tsx
<a href="#main-content">Skip to main content</a>
```

The main content target includes:

```tsx
<main id="main-content" tabIndex={-1}>
```

This allows keyboard users to bypass repeated navigation.

### Global focus visibility

A global `:focus-visible` style was added to improve keyboard focus visibility.

### Custom 404 page

Created:

```text
app/not-found.tsx
```

The custom page includes links to:

- Home
- Work
- Contact

It renders inside the standard header and footer layout.

---

## 17. Managed local OneDrive build-lock issues

The repository is stored inside a OneDrive-synchronized business-development folder.

Occasionally, local builds failed with errors similar to:

```text
EPERM: operation not permitted, unlink ...
```

The problem affected generated files inside `.next`, not application source code.

### Working recovery process

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .next
npm run build
```

If PowerShell could not remove `.next`, the fallback was:

```powershell
cmd /c rmdir /s /q .next
```

Moving the repositories outside OneDrive was considered but deferred because the disruption to the broader repository organization was not justified.

The GitHub Actions build environment does not have this local OneDrive issue.

---

## 18. Declared the site a viable MVP

The site was considered ready for production-domain migration after it included:

- Homepage
- Services
- Work portfolio
- Two completed public case studies
- About page
- Contact and booking flow
- Insights hub
- Technical article
- Responsive navigation
- Accessibility improvements
- Custom 404 page
- Automated Firebase deployment

Additional features were judged useful but not necessary for launch.

The project intentionally stopped adding features and moved into production hardening.

---

## 19. Began custom-domain migration

The existing public domain was migrated from Google Sites to Firebase App Hosting.

### Existing DNS state

The old Google Sites configuration used:

```text
CNAME www → ghs.googlehosted.com
```

Firebase required:

- A new `A` record for `www`
- A Firebase claim TXT record
- A Google Certificate Manager ACME CNAME
- Removal of the old Google Sites CNAME

### Squarespace DNS behavior

Squarespace expects relative host names.

For example:

```text
www
```

rather than:

```text
www.example.com
```

The ACME record was entered using its relative host name, and the trailing period was omitted from the target because Squarespace does not require it.

### DNS validation

Public DNS was verified from both Google and Cloudflare resolvers.

Checks confirmed:

- The new A record resolved correctly
- The Firebase claim TXT record was visible
- The ACME CNAME was visible
- The old Google Sites CNAME no longer existed

Example validation commands:

```powershell
Resolve-DnsName www.mcqueencloud.com -Type A -Server 8.8.8.8
Resolve-DnsName www.mcqueencloud.com -Type TXT -Server 8.8.8.8
Resolve-DnsName _acme-challenge_<token>.www.mcqueencloud.com -Type CNAME -Server 8.8.8.8
```

Firebase detected the records incrementally rather than all at once. Because the public resolvers returned the correct values, no further DNS changes were made.

Sensitive claim and certificate tokens are intentionally omitted from these public notes.

---

## 20. Added continuous integration

Firebase App Hosting already provided continuous deployment from `main`.

A GitHub Actions workflow was added to provide continuous integration before merge.

Created:

```text
.github/workflows/ci.yml
```

### CI workflow

The pipeline performs:

1. Repository checkout
2. Node.js setup
3. Clean dependency installation
4. Production dependency audit
5. Linting
6. Production build

The intended flow is now:

```text
Feature branch
→ Pull request
→ GitHub Actions validation
→ Merge to main
→ Firebase App Hosting rollout
```

### Security-audit decision

`npm audit` reported a moderate PostCSS advisory through the Next.js dependency tree.

The suggested forced fix would have downgraded Next.js to an obsolete major version, which would have been a breaking and unsafe change.

The decision was:

- Do not use `npm audit fix --force`
- Keep the current supported Next.js version
- Block high and critical production findings in CI
- Monitor the moderate transitive advisory
- Upgrade normally when an appropriate stable dependency update is available

The CI audit command is:

```bash
npm audit --omit=dev --audit-level=high
```

### YAML formatting issue

The initial workflow failed because YAML indentation was damaged during copying.

A corrected downloadable `ci.yml` file was created and placed at:

```text
.github/workflows/ci.yml
```

### Pull-request trigger behavior

A commit pushed to `chore/add-ci` did not trigger the workflow until a pull request targeting `main` existed.

This was expected because the workflow only listens for:

- Pull requests targeting `main`
- Pushes directly to `main`

Once the pull request was created, the workflow executed successfully.

### GitHub Actions runtime warning

The successful workflow produced a warning that `actions/checkout@v4` and `actions/setup-node@v4` used the deprecated Node.js 20 action runtime.

This warning was later resolved by upgrading the actions and pinning them to immutable commit SHAs while retaining Node.js 22 for the application build. See Section 22.

---

## 21. Established the branch workflow

The preferred development process is now:

```bash
git switch main
git pull origin main
git switch -c feature/descriptive-name
```

After changes:

```bash
git add .
git commit -m "Describe the change"
git push -u origin feature/descriptive-name
```

Then:

1. Open a pull request into `main`
2. Wait for CI to pass
3. Merge
4. Allow Firebase to deploy the merged commit

After merge:

```bash
git switch main
git pull origin main
git branch -d feature/descriptive-name
```

A branch cannot be deleted while it is still checked out in the active worktree. The working directory must first be switched back to `main`.

---

## 22. Hardened the GitHub Actions supply chain

The CI workflow was updated after the initial pull request produced a warning about the Node.js runtime used by older GitHub Actions releases.

The workflow now uses newer official releases and pins each action to a full, immutable commit SHA rather than a moving major-version tag.

### Final action configuration

```yaml
- name: Check out repository
  uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0
  with:
    persist-credentials: false

- name: Set up Node.js
  uses: actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e # v6.4.0
  with:
    node-version: 22
    cache: npm
```

### Security rationale

A reference such as:

```yaml
uses: actions/checkout@v7
```

can later resolve to a different commit if the tag moves.

A full commit SHA is immutable, which reduces the risk of unexpectedly executing a compromised or breaking action release.

The readable version remains in a comment so maintainers and automated dependency tools can still identify the intended release.

The checkout step also uses:

```yaml
persist-credentials: false
```

The CI job only needs read access, so the GitHub token does not need to remain stored in the repository's local Git configuration after checkout.

The updated workflow was validated through the pull-request process and merged successfully.

---

## 23. Expanded site-wide search and social metadata

The root layout metadata was expanded beyond the original page title and description.

Updated:

```text
app/layout.tsx
```

### Added metadata

- Production-aware `metadataBase`
- Default title and title template
- Site description
- Application name
- Creator and publisher
- Open Graph title, description, site name, locale, and content type
- Twitter/X large-image card configuration

The production URL is read from:

```text
NEXT_PUBLIC_SITE_URL
```

with a fallback to:

```text
https://www.mcqueencloud.com
```

This preserves local and hosted flexibility without hard-coding different metadata configurations for each environment.

### Browser validation

The rendered metadata was checked in the browser console.

Examples:

```javascript
document.querySelector('meta[property="og:title"]')?.content
document.querySelector('meta[property="og:description"]')?.content
document.querySelector('meta[name="twitter:card"]')?.content
document.querySelector('meta[name="application-name"]')?.content
```

The returned values matched the intended site title, description, application name, and `summary_large_image` card type.

A root canonical URL was deliberately not added because a single homepage canonical in the shared layout could incorrectly identify every route as a duplicate of the homepage.

---

## 24. Added generated social-sharing images

A reusable social-card renderer was created with the Next.js `ImageResponse` API.

Created:

```text
lib/social-image.tsx
app/opengraph-image.tsx
app/twitter-image.tsx
```

### Shared visual design

The generated image uses:

- A dark blue gradient aligned with the website
- McQueen Cloud Advisory branding
- Analytics, automation, and architecture positioning
- The company slogan
- The public domain
- A Google Cloud positioning label
- A 1200 × 630 layout suitable for large social preview cards

The shared renderer prevents the Open Graph and Twitter/X versions from drifting into separate designs.

### Metadata routes

Next.js exposes the generated images through:

```text
/opengraph-image
/twitter-image
```

These file-based metadata routes also connect the generated images to the corresponding page metadata.

### Implementation correction

During implementation, the reusable renderer was accidentally placed in the route file.

This caused errors stating that:

- The route had no default export
- `createSocialImage` was defined more than once

The issue was fixed by restoring the intended separation:

- `lib/social-image.tsx` contains the reusable `ImageResponse` renderer
- Each file in `app` contains a small route wrapper with a default-exported function

Both image routes were then previewed successfully in the local development environment, and the production build passed.

---

## 25. Added crawler and sitemap metadata routes

Two additional metadata routes were created:

```text
app/robots.ts
app/sitemap.ts
```

### `robots.txt`

The robots route:

- Allows crawling of the public site
- Identifies the preferred host
- Links search engines to the sitemap

The generated route was validated at:

```text
/robots.txt
```

### Dynamic sitemap

The sitemap includes:

- Homepage
- Services
- Work
- Assessment
- Insights
- About
- Contact
- Every project defined in `data/projects.ts`
- Every article defined in `data/insights.ts`

The data-driven approach ensures that new projects and insights are added to the sitemap automatically when their shared data records are created.

The sitemap also assigns relative priorities and suggested crawl frequencies.

Artificial `lastModified` timestamps were intentionally omitted. Assigning the build time to every route would incorrectly tell search engines that every page changed during every deployment.

The generated route was validated at:

```text
/sitemap.xml
```

### URL-normalization follow-up

A pull-request review identified that `robots.ts` should normalize `NEXT_PUBLIC_SITE_URL` in the same way as `sitemap.ts`.

Without normalization, a configured value ending in `/` could generate:

```text
https://www.mcqueencloud.com//sitemap.xml
```

The follow-up change strips one or more trailing slashes:

```ts
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mcqueencloud.com"
).replace(/\/+$/, "");
```

This keeps host and sitemap URLs consistent even if the environment variable is copied with a trailing slash.

---

## 26. Completed Phase 1 application work

The metadata and CI hardening changes were completed on a feature branch and submitted through a pull request.

The pull request included:

- Immutable GitHub Actions pins
- Disabled persisted checkout credentials
- Expanded Open Graph and Twitter/X metadata
- Generated social-preview images
- `robots.txt`
- Dynamic sitemap
- Updated public development notes

All automated checks passed, the pull request was merged, and the branch was deleted remotely.

The local repository was then returned to `main`, synchronized with the remote repository, and cleaned up.

Firebase App Hosting created a successful production rollout from the merged commit.

### Production verification

The deployed application was checked for:

- Homepage availability
- Open Graph image route
- Twitter/X image route
- `robots.txt`
- `sitemap.xml`
- Rendered Open Graph metadata
- Rendered Twitter/X metadata

All application and deployment checks passed.

The custom domain is now serving the application over HTTPS. The earlier DNS migration and certificate-provisioning work no longer blocks application development.

---

## 27. Added public LinkedIn and YouTube paths

The Contact page was expanded to include the company’s public channels:

```text
https://www.linkedin.com/company/mcqueen-cloud-advisory
https://www.youtube.com/@McQueenCloudAdvisory
```

A new **Follow and learn** section was placed above the final consultation call to action.

### Design decision

The consultation path remains the primary action.

LinkedIn and YouTube are presented as secondary trust-building paths for visitors who are not yet ready to schedule a discussion but want to review:

- Company updates
- Project announcements
- Technical walkthroughs
- Architecture discussions
- Cloud, analytics, automation, and AI demonstrations

Both external links open in a new tab and use:

```tsx
target="_blank"
rel="noopener noreferrer"
```

---

## 28. Designed the Operational Modernization Readiness Assessment

Phase 2 began with an interactive assessment intended to demonstrate advisory reasoning, product thinking, front-end development, and explainable decision logic.

The feature is available at:

```text
/assessment
```

### Customer-value requirement

The assessment was deliberately designed to do more than produce a maturity score.

It is intended to answer:

> What should the organization improve next, what should it defer, and what support model is appropriate?

The final result includes:

- Organizational profile
- Modernization stage
- Primary constraint
- Best next opportunity
- Existing strengths
- Prioritized 90-day roadmap
- Investments to defer
- Recommended support model
- Six-domain maturity breakdown
- Consultation call to action

### Assessment domains

The assessment contains 24 questions across six domains:

1. Data and Reporting
2. Workflow Automation
3. Cloud Architecture
4. Governance and Reliability
5. AI and Knowledge Workflows
6. Technical Capability and Support Model

Each question has four operating-state responses:

- Reactive
- Emerging
- Managed
- Scalable

Users see descriptive operating states rather than numeric values.

### Human-readable specification

Created:

```text
docs/assessment-spec.md
```

The specification documents:

- All questions and answer choices
- Maturity thresholds
- Critical-capability flags
- Dependency rules
- Opportunity-readiness rules
- Primary-constraint selection
- Modernization-stage classification
- Delivery-model guidance
- Constraint and opportunity playbooks
- Deferred-investment rules
- Result hierarchy
- Initial privacy and architecture boundaries

---

## 29. Implemented typed assessment data

Created:

```text
data/assessment.ts
data/recommendations.ts
```

### `data/assessment.ts`

Contains:

- Domain metadata
- All 24 questions
- Four answer choices per question
- Maturity scores and labels
- Critical-capability identifiers
- Flattened question exports
- Domain and question lookup records

### `data/recommendations.ts`

Contains:

- Six primary-constraint playbooks
- Six opportunity playbooks
- 90-day actions grouped by phase
- Critical-risk overrides
- Deferred-investment guidance
- Four delivery and support models

### TypeScript tuple issue

The first assessment-data implementation used:

```ts
as const satisfies readonly AssessmentDomain[]
```

This preserved each domain’s question collection as a different literal tuple.

TypeScript then rejected:

```ts
assessmentDomains.flatMap((domain) => domain.questions)
```

because question IDs from different domains were inferred as incompatible tuple members.

The fix was to type the collection directly:

```ts
export const assessmentDomains: readonly AssessmentDomain[] = [
  // domains
];
```

This preserved validation while allowing the questions to be flattened into a shared `AssessmentQuestion[]`.

---

## 30. Built the deterministic assessment engine

The assessment uses a transparent rules engine rather than an opaque AI-generated recommendation.

Created:

```text
lib/assessment/score-domains.ts
lib/assessment/evaluate-gaps.ts
lib/assessment/evaluate-readiness.ts
lib/assessment/select-priorities.ts
lib/assessment/build-roadmap.ts
lib/assessment/analyze-assessment.ts
```

### Domain scoring

`score-domains.ts` calculates:

- Domain average
- Maturity level
- Lowest score
- Highest score
- Score spread
- Count of Reactive answers
- Count of Emerging-or-lower answers
- Critical-capability flags
- Completion status
- Overall average

Averages do not erase material weaknesses. A domain can be strong overall while still carrying a critical capability flag.

### Gap evaluation

`evaluate-gaps.ts` identifies:

- Meaningful strengths
- Supporting capabilities
- Critical gaps
- Capability imbalances
- Foundational constraints
- Opportunities blocked by weak prerequisites

### Readiness evaluation

`evaluate-readiness.ts` classifies modernization opportunities as:

- Ready
- Conditional
- Premature
- Blocked
- Established
- Incomplete

Opportunities are evaluated against prerequisite domains and relevant critical controls.

For example, weak AI maturity can be interpreted differently depending on whether data, governance, and technical capabilities are already strong.

### Priority selection

`select-priorities.ts` applies this hierarchy:

1. Critical-capability gaps
2. Foundational constraints
3. Prerequisite bottlenecks
4. Lowest remaining domain

The lowest score does not automatically become the first recommendation.

The best next opportunity is ranked using:

- Capability gap
- Prerequisite readiness
- Existing supporting strengths
- Opportunity status

An edge case was corrected so an organization scoring Scalable in every domain does not receive an artificial primary constraint.

### Roadmap assembly

`build-roadmap.ts` combines:

- Critical overrides
- Primary-constraint actions
- Best-opportunity actions
- Delivery-model guidance
- Deferred investments

The roadmap is deduplicated and capped at five actions.

### Analysis orchestration

`analyze-assessment.ts` runs the full pipeline:

```text
24 responses
→ Domain scores
→ Gaps and strengths
→ Opportunity readiness
→ Primary constraint
→ Best opportunity
→ Modernization stage
→ Organizational profile
→ 90-day roadmap
→ Deferred investments
→ Delivery model
```

Final recommendations are not produced until all 24 questions are complete.

---

## 31. Built the interactive assessment experience

Created:

```text
app/assessment/page.tsx
components/assessment/Assessment.tsx
components/assessment/AssessmentQuestion.tsx
components/assessment/AssessmentProgress.tsx
components/assessment/AssessmentResults.tsx
```

### User experience

The assessment provides:

- Introductory overview
- Approximately 10-minute completion estimate
- One question at a time
- Visible progress
- Current domain name
- Back and Next controls
- Disabled Next control until an answer is selected
- Native radio-button semantics
- Keyboard-accessible response selection
- Focus movement when the question changes
- Preserved answers when navigating backward
- Immediate result generation after question 24
- Restart option

### Result experience

The results page presents:

- Modernization stage and modifier
- Organizational profile
- Overall maturity context
- Primary constraint
- Best next opportunity
- Critical capability warnings
- Existing strengths
- Five-action 90-day roadmap
- Investments to defer
- Recommended support model
- Six-domain score breakdown
- Roadmap-review call to action
- Directional-guidance disclaimer

### Privacy and data boundary

The initial implementation is intentionally client-side only.

- No login
- No database
- No answer persistence
- No personal information collection
- No hidden tracking requirement
- No backend scoring dependency

The assessment remains useful without requiring the visitor to submit contact information.

### Route naming issue

The initial route file was named:

```text
app/assessment/assessment-page.tsx
```

Next.js App Router did not recognize that file as a page, so `/assessment` returned a 404.

The file was renamed to:

```text
app/assessment/page.tsx
```

The route then rendered successfully.

### Editor diagnostic issue

After adding the assessment components, VS Code temporarily reported that local component and analysis-module imports could not be found even though the files were in the correct directories.

The production build passed.

Restarting the TypeScript language server cleared the stale editor diagnostics.

---

## 32. Added assessment navigation and crawler discovery

The shared navigation was updated to include:

```text
Services | Work | Assessment | Insights | About
```

The Assessment link is available in both:

- Desktop navigation
- Mobile navigation

Active-route highlighting continues to use `usePathname`.

The dynamic sitemap was also updated with:

```text
https://www.mcqueencloud.com/assessment
```

The assessment route uses:

- `changeFrequency: "monthly"`
- `priority: 0.9`

The generated XML was opened and inspected successfully.

The browser message stating that the XML has no style information is expected and does not indicate an error.

---

## 33. Completed assessment implementation validation

The assessment was manually validated through the complete 24-question flow.

Confirmed behaviors include:

- The route renders at `/assessment`
- All questions can be selected
- Back and Next navigation work
- Answers remain selected when navigating backward
- Next remains disabled until a response is selected
- The final results screen renders
- The analysis engine returns a modernization stage
- Primary constraint and opportunity content render
- The roadmap, deferrals, support model, and domain scores render
- Restart clears the assessment
- The production build passes
- The sitemap includes the assessment
- Desktop and mobile navigation include the assessment

The feature remains pending repository commit, pull-request validation, merge, and Firebase production rollout.


---

## Current state

At the time these notes were updated:

- The website is a viable production MVP
- Firebase App Hosting deployment is operational
- GitHub-based CI is operational
- Firebase-based CD is operational
- GitHub Actions are pinned to immutable commit SHAs
- Production dependency auditing, linting, and builds run automatically
- Search and social-sharing metadata are implemented
- Generated Open Graph and Twitter/X images are implemented
- `robots.txt` is implemented
- The dynamic sitemap is implemented
- The custom production domain is serving the application over HTTPS
- The Contact page includes consultation, LinkedIn, and YouTube paths
- Two completed public case studies are currently published
- Phase 1 application development is complete
- The Operational Modernization Readiness Assessment has been implemented locally as the first major Phase 2 capability
- The assessment currently runs entirely in the browser and does not persist answers or collect personal information
- The assessment feature has passed local production builds and end-to-end manual testing
- The assessment changes are pending final commit, pull-request validation, merge, and production rollout


---

## Deferred post-MVP work

Potential future improvements include:

- Branch protection or repository rulesets requiring CI before merge
- Structured data and richer schema metadata
- Analytics and conversion tracking
- Automated accessibility testing
- Unit tests for assessment scoring and dependency rules
- End-to-end browser testing
- Printable or downloadable assessment results
- Optional assessment result sharing
- Additional completed case studies
- Architecture recommendation explorer
- Technical project walkthroughs
- Embedded demonstration videos
- Additional architecture diagrams
- Selected public GitHub repository links
- Secure inquiry form
- Firestore-backed lead records
- Optional assessment lead capture
- Consultation workflow integration
- Internal lead-status tooling

These items should be added only when they solve a real business or operating need.

---

## Key lessons

1. **Build proof, not just marketing pages.**  
   The site became more credible when it included architecture decisions, case studies, measurable outcomes, and implementation details.

2. **Keep the repository as the source of truth.**  
   GitHub now controls application history, review, validation, and deployment triggers.

3. **Separate CI from CD responsibilities.**  
   GitHub Actions validates changes. Firebase App Hosting deploys approved changes from `main`.

4. **Do not force dependency fixes blindly.**  
   A technically available fix can be worse than the reported vulnerability.

5. **Managed hosting still requires architecture decisions.**  
   Firebase simplifies operations but does not eliminate security, data, deployment, or lifecycle decisions.

6. **DNS records can propagate and validate independently.**  
   Public resolver checks are more reliable than repeatedly changing correct records.

7. **Only publish completed work.**  
   Incomplete projects were intentionally excluded until they could support a credible public case study.

8. **Stop when the MVP is viable.**  
   The site did not need every possible feature before launch. Production hardening became more valuable than continued page creation.

9. **Pin workflow dependencies when practical.**  
   Immutable action references reduce the chance that CI behavior changes without a corresponding repository change.

10. **Separate shared rendering logic from framework routes.**  
    Reusable helpers and route entry points have different responsibilities. Keeping them separate makes errors easier to diagnose and prevents framework-specific export problems.

11. **Validate generated metadata as real endpoints.**  
    A successful TypeScript build is not enough. Social images, crawler files, sitemaps, and rendered meta tags should also be opened and inspected directly.

12. **An assessment must guide a decision, not merely label maturity.**  
    Users already have a general sense of whether their organization is technically mature. The product becomes valuable when it identifies what to do next, what to defer, and why.

13. **Uneven capability profiles require dependency-aware interpretation.**  
    A strong cloud and engineering organization with weak AI maturity should receive a different recommendation from an organization that is weak across every prerequisite.

14. **Keep recommendation logic deterministic and explainable.**  
    Structured rules make results consistent, testable, and auditable. Generative AI may improve wording later, but it should not replace the source-of-truth decision logic.

15. **Test high-maturity and low-maturity edge cases.**  
    A scoring engine should not invent a primary constraint for an organization that is already strong across every domain.
