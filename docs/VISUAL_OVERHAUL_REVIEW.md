# Visual overhaul — implementation and verification

Local implementation verified on September 23, 2026. Publication was approved
after adding the Everything is Random project feature. Release status is tracked
through the repository PR and Firebase App Hosting checks.

## Implemented direction

The site now uses graphite and mineral-white surfaces, applied Geist typography,
restrained blue accents, fine rules, and original diagrams. Work and engineering
judgment lead the experience, with consulting contact available as a secondary
path.

- Homepage: original layered system illustration, both selected projects,
  engine-generated example assessment profile, approach, writing, and founder.
- Work: financial impact first; original responsive diagrams for both projects;
  preserved architecture decisions, controls, limitations, and confidentiality.
- Assessment: consolidated introduction, native radio questions, explicit focus
  through transitions, and a report with priorities, six domain scores, strengths,
  a phased roadmap, deferred investments, and support guidance.
- Supporting pages: founder-led About, concise Services and Contact, one article
  listing in Insights, refined article reading layout, and coordinated 404.
- Shared identity: wordmark, responsive navigation, footer, SVG favicon, and
  generated social images.

The assessment questions, scoring engine, recommendation data, and privacy model
are unchanged. No package dependencies or infrastructure were added.

## Everything is Random

A reusable independent-project feature on the homepage and Work page links to
[Everything is Random](https://everythingisrandom.mcqueencloud.com/). It introduces
the free tools for games, decisions, creative ideas, and random data, with a
small original illustration of those categories. The link opens in a new tab
with an accessible notice.

The description is grounded in that project's README and tool registry. The
canonical non-www address was verified to return HTTP 200; the extra www prefix
did not resolve. The advisory site does not embed or run the random generators.

## Motion

The hero layers settle into place and their paths draw once. Project diagram
glyphs enter in sequence. Supporting section entrances use native CSS scroll
timelines where available; other browsers keep the content in place. Buttons,
links, and quiz states have brief transitions.

Text stays fully opaque throughout movement. All animation is disabled by
`prefers-reduced-motion`, and important content remains available without motion
or additional client JavaScript. There is no continuous background animation,
scroll hijacking, animation framework, or WebGL runtime.

## Source details

The About page draws on the supplied [personal portfolio](https://smcqueen2023.github.io/skills-github-pages/)
and its [credential record](https://smcqueen2023.github.io/skills-github-pages/certifications/).
Credential issue dates are distinguished from current status. The previous
unsupported Azure Enterprise Data Analyst credential was removed.

The supplied [LinkedIn profile](https://www.linkedin.com/in/smmcqueen/) is linked
from About and Contact. Its content was not retrievable in this session; career
facts were not inferred from it. Employer identities were not carried into the
anonymized enterprise case study.

The homepage report preview is explicitly an example. Each question receives
its domain's documented synthetic score in `app/page.tsx`, then the existing
analysis engine generates the displayed stage and domain values.

## Local fonts

A clean build exposed the existing Google Fonts network requirement. Geist Sans
and Mono now use `next/font/local`, with approximately 60 KB of unmodified Latin
WOFF2 files and the upstream SIL license in `app/fonts/`. Font provenance and
update guidance are documented there. Neither build nor page load needs a Google
Fonts request.

## Verification

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript / production build | Passed; all public routes prerendered |
| Vitest | 20 tests passed across 5 files |
| Playwright | 29 tests passed against the production build |
| Axe | No serious/critical violations across ten content routes and the question/result states, including color contrast |
| Assessment behavior | Disabled Next, keyboard radio selection, retained Back answers, completion/restart focus, cleared responses |
| Navigation | Mobile keyboard opening, Escape and restored focus, route selection and menu dismissal |
| Responsive checks | Automated key-route overflow checks at 360, 768, and 1440px; visual inspection also at 390px |
| Report variants | All-low automated journey; all-high and mixed responses inspected at mobile/tablet/desktop sizes |
| Reduced motion | Computed animation disabled; content retained |
| Source contracts | Outcome-before-technology and knowledge-base placements preserved |
| Whitespace | `git diff --check` passed |

Screenshots were inspected for home, work, both case studies, assessment intro,
question, report, supporting pages, article, 404, and social image. Original-site
baseline screenshots and local review captures are in
`node_modules/.cache/visual-baseline/` and
`node_modules/.cache/visual-overhaul/`; these are local QA artifacts, not required
runtime files.

The final browser run used installed desktop Chrome because the managed
Playwright browser and video encoder were unavailable locally. Video was turned
off for this run; default CI behavior is retained. WebKit/Safari and physical
mobile devices were not tested.

An unthrottled local production-load check recorded approximately 252 KB of
subresource transfer for home and 241 KB for the assessment introduction,
including the two local fonts, with no third-party requests. These measurements
exclude the HTML document, vary with build/browser, and are not field Core Web
Vitals results. No controlled before/after performance benchmark was completed.

## Reproduce the checks

Standard commands remain:

```text
npm run lint
npm test
npm run build
npx playwright test --workers=1
git diff --check
```

For an existing local production server and installed Chrome on Windows:

```powershell
# Start separately: npm run start -- --port 3100
$env:PLAYWRIGHT_BASE_URL = 'http://localhost:3100'
$env:PLAYWRIGHT_CHANNEL = 'chrome'
$env:PLAYWRIGHT_VIDEO = 'off'
node node_modules/@playwright/test/cli.js test --workers=1
```

The external URL override prevents Playwright from starting a second server.
Without overrides, its original local/CI server and browser behavior remains.

The publication scope includes the visual overhaul and the independent-project
feature. Release through the existing protected PR/Firebase workflow; verify the
live homepage, Work page, project link, and assessment after the managed rollout.

Existing staged edits to `.gitignore`, `docs/ARCHITECTURE.md`, and
`docs/DEVELOPMENT_NOTES.md` were left intact.
