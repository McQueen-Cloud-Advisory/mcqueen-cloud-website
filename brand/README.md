# Brand v2 website integration

`brand-system.json` is the canonical v2.0 specification supplied on November 23,
2026. `brand-tokens.css` is its supplied color/font token export. The original
imported files with `(1)` names remain reference copies; the application uses
these stable names and the production assets below.

- `app/globals.css` imports the tokens and maps them to the existing Tailwind
  theme. Font aliases resolve on `body`, where `next/font/local` defines its
  generated family variables.
- `public/brand/v2/` contains exact approved SVG logo/background assets and PNG
  share images with normalized filenames. Only website assets are public; the
  playbook, workbook, and other source material are not served from that folder.
- `brand/fonts/Geist-Variable.ttf` and `GeistMono-Variable.ttf` preserve the
  approved masters and their OFL notices. The locally hosted WOFF2 conversions
  and reproduction details are in `app/fonts/README.md`.
- The header uses the horizontal light lockup above 640px and the compact
  symbol below it. Artwork is never reconstructed as live lettering. Desktop
  navigation starts at 1280px so the full lockup keeps its minimum size.
- `lib/social-image.tsx` serves the approved dark 1200×630 PNG unchanged.
  `/opengraph-image/brand-v2` and `/twitter-image/brand-v2` are the advertised
  image URLs. Previous unversioned endpoints redirect to them.

When brand decisions change, update the canonical specification, dependent
assets/tokens, and working guides in the same release. Change the social image
version when replacing the artwork, then verify the actual metadata and PNG
responses. Platform caches may retain an existing post until it is recrawled.

Keep the assessment's domain model separate from the three service offers.
Its six diagnostic capabilities and recommendations are not marketing
categories. Brand changes should preserve its behavior and run the existing
unit and browser checks.
