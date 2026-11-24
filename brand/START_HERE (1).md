# McQueen Cloud Advisory brand system v2.0

Start with the Brand Playbook and use the Brand Strategy workbook as the searchable specification register. Both use brand-system.json.

## Asset selection
- assets/mca-lockup-horizontal-light.png is the default full-name logo for white and light layouts.
- assets/mca-lockup-horizontal-dark.png is the reversed logo for dark layouts.
- Use stacked versions in narrow or square compositions.
- Symbol-only PNGs support profile tiles and compact placements. Use the micro mark below 48px.
- Use PNG in Google Docs and Slides. SVG files are scalable source masters, with outlined type so a recipient does not need the font installed.
- Dark/light backgrounds contain no logo or text and are for selected digital uses.
- LinkedIn and Open Graph exports are already sized to their named destinations. Preview actual crop before publishing.
- legacy/ contains unchanged originals for reference only. They are retired from production.

## Fonts and editable work
Geist Sans and Geist Mono are the web/designed-export families. Original variable fonts and their SIL Open Font License notices are in fonts/. Google Docs, Sheets and Slides use Arial when Geist is unavailable in the app. No Adobe software is required.

## Single source of truth
brand-system.json contains strategy, copy, tokens, contrast pairs, fonts, sizes, asset use, dimensions and QA. brand-tokens.css exposes the palette for web implementation. email-signature.html provides a simple editable signature with live text.

Website messaging and asset deployment described in the guide are a handoff recommendation; the live site was not modified. Ratios and minimum sizes in the guide are house rules unless explicitly labeled as platform requirements.

## Future changes
The Google Docs, Google Sheets, and downloaded files are separate copies. They do not synchronize automatically. Keep one release number and update the canonical data, working guides, and affected exports together when a brand decision changes.
