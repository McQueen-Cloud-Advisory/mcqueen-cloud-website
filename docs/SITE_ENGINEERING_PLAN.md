# Site and Engineering Improvement Plan

## Objective

Address the valid concerns raised in the recent critique without adding performative infrastructure or weakening the business-facing experience.

The plan also establishes two development standards for all future work:

- Apply Twelve-Factor App design principles where relevant.
- Use test-driven development for new behavior and refactoring.

## Priority 1 — Make outcomes lead the case studies

### Problem

The case-study hero sections currently show technology chips before the reader reaches the operating problem and outcome. This gives technology more visual priority than the site’s own philosophy supports.

### Changes

- Remove technology chips from the hero area.
- Promote the primary result into the hero.
- Add a short operating-impact statement immediately below the result.
- Move the technology list to a later section titled **Technical implementation** or **The engine behind the result**.
- Keep architecture visible and easy to scan for technical evaluators.

### Acceptance criteria

- A business visitor can identify the problem and result without knowing the technology.
- A technical evaluator can still find the complete stack within one page scroll after the architecture discussion.
- Existing measurable claims remain accurate and supportable.
- Responsive layout and accessibility remain intact.

### Testing approach

- Add component or snapshot coverage for the revised case-study hero pattern if it becomes reusable.
- Add Playwright assertions that the result appears before the technology section in document order.
- Run visual checks at mobile and desktop widths.

## Priority 2 — Surface the engineering knowledge base

### Problem

The cloud-engineering learning resource is strong evidence of technical depth but is not discoverable from the business site.

### Changes

Start with secondary placements:

- Add an About-page section describing the knowledge base.
- Add a featured card to the Insights hub.
- Add a footer link.
- Add contextual links from relevant technical articles.

Do not add it to primary navigation until visitor behavior or usability testing supports that change.

### Positioning

Describe it as:

> A continuously developed cloud-engineering knowledge base documenting platform concepts, architecture decisions, implementation patterns, and hands-on labs.

Avoid presenting it as an official industry standard or as proof of capabilities that the repository does not yet implement.

### Acceptance criteria

- The resource is discoverable from at least three appropriate site locations.
- Business visitors are not forced into technical content.
- Links clearly indicate that they open a separate technical resource.
- Tracking is added only if privacy and analytics requirements are defined.

## Priority 3 — Expand automated quality coverage

### Changes

- Add Playwright.
- Add critical-route smoke tests.
- Add an end-to-end assessment completion test.
- Add automated accessibility checks with Axe.
- Add component tests for shared interactive components.
- Add regression tests before refactoring assessment behavior.

### Initial critical journeys

1. Homepage loads and primary navigation works.
2. Services page offers both assessment and direct-contact paths.
3. Assessment can be completed and restarted.
4. Case-study pages render outcome-first content.
5. Contact page reaches the external booking path.
6. Metadata endpoints, sitemap, and robots routes return successfully.
7. Custom 404 renders correctly.

### TDD rule

For every new behavioral story:

```text
failing test
→ minimal implementation
→ passing test
→ refactor
→ full validation
```

## Priority 4 — Operational hardening

### 4xx analysis

- Export or query request logs.
- Group 4xx responses by status and path.
- Separate expected bot probes from real broken routes.
- Add redirects only for legitimate former URLs.
- Fix missing first-party assets or internal links.
- Avoid spending time blocking harmless low-cost probes unless they create risk or cost.

### App Hosting scaling

- Confirm whether the managed service repeatedly attempts `max_instance_count > 20`.
- Inspect the backend’s supported App Hosting configuration.
- Add `apphosting.yaml` only after confirming the correct supported setting.
- Use a conservative maximum appropriate to expected traffic and budget.
- Validate a successful rollout after the change.

### Observability

- Define user-impacting failure conditions.
- Add alerts only for actionable events.
- Avoid alerting on noisy bot-generated 404s.
- Track deployment failures, 5xx rates, latency, and backend task failures when those capabilities exist.

## Priority 5 — Select the first real IaC-backed backend capability

## Recommended candidate

**Downloadable assessment report generation** is the strongest first candidate if it provides real user value.

Possible flow:

```text
Browser assessment result
→ user explicitly requests report
→ validated request to Cloud Run
→ deterministic report payload
→ generated PDF or document
→ short-lived download
```

Why it fits:

- Extends an existing product rather than creating a demo-only service.
- Creates a justified server-side boundary.
- Can remain optional and privacy-conscious.
- Demonstrates Cloud Run, IAM, storage, logging, and cost controls.
- Supports TDD and contract testing.
- Creates a natural reason for Terraform.

Alternative candidates:

- Secure consultation intake
- Optional result sharing
- Consultation-workflow handoff

### IaC scope

Terraform should manage:

- API enablement
- Service account
- IAM
- Cloud Run service
- Secret containers if actually required
- Storage bucket or Firestore resources if required
- Logging metrics and alert policies
- Budget notifications
- Development and production environment separation

### 12-factor requirements

The Cloud Run service must:

- Use the repository as its codebase
- Declare all dependencies
- Read deploy-specific config from the environment
- Treat storage and external APIs as attached resources
- Separate build, release, and run stages
- Remain stateless
- Bind to the runtime-provided port
- Scale horizontally
- Start and stop safely
- Maintain dev/prod parity
- Emit structured logs to stdout/stderr
- Run maintenance tasks as explicit one-off processes

### TDD requirements

Before implementation:

- Write request-schema tests.
- Write authorization and abuse-guard tests.
- Write report-content contract tests.
- Write error-path tests.
- Write size and cost-limit tests.
- Write integration tests against local or non-production backing services.

## Priority 6 — Documentation maintenance

### Authority order

1. `docs/DEVELOPMENT_NOTES.md`
2. `ARCHITECTURE.md`
3. `README.md`
4. Feature specifications and ADRs

### New documentation practices

- Add an ADR when selecting the first backend capability.
- Add an ADR for Terraform state and environment strategy.
- Add a runbook for backend deployment and rollback.
- Mark diagrams as **current state** or **target state**.
- Remove completed items from “planned” sections promptly.
- Do not describe an integration as implemented until code, tests, deployment, and verification exist.

## Suggested implementation sequence

### Refactor PR 1

- Outcome-first case-study heroes
- Technology sections moved lower
- Tests for document order and critical rendering

### Content PR 2

- Knowledge-base integration in About, Insights, and footer
- External-link accessibility and labeling checks

### Quality PR 3

- Playwright setup
- Axe accessibility checks
- Critical-path end-to-end suite

### Operations PR 4

- 4xx classification
- App Hosting scaling configuration, if verified
- Documentation and runbook updates

### Architecture PR 5

- ADR for first backend capability
- ADR for Terraform state
- Threat model
- Acceptance tests written before service code

### Backend PR series

- Terraform foundation
- Cloud Run service skeleton
- Feature behavior
- Integration and end-to-end coverage
- Production rollout and operational verification

## Decision gate before building infrastructure

Do not begin the IaC backend until the following are written:

- User problem and expected value
- Scope and non-goals
- Data classification
- Request and response contracts
- Cost ceiling
- Abuse controls
- Test plan
- Rollback plan
- Operational owner
