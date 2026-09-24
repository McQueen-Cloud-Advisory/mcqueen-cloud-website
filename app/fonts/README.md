# Local typefaces

Geist Sans and Geist Mono are loaded by `next/font/local` in `app/layout.tsx`.
The Latin variable WOFF2 files total about 60 KB. Builds and visitors do not
need to request font files from Google Fonts.

These unmodified font files were copied from the installed Next.js 16.3.6
distribution at `next/dist/next-devtools/server/font/`:

- `geist-latin.woff2`
- `geist-mono-latin.woff2`

Upstream: [Vercel Geist](https://github.com/vercel/geist-font).
The accompanying [OFL.txt](OFL.txt) is the upstream SIL Open Font License.
Keep the license with these files when redistributing them.

When updating fonts, replace the files intentionally and review text wrapping
on desktop/mobile and the assessment. Do not restore a build-time external font
request as an incidental dependency update.
