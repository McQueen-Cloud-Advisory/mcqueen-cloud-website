# Local typefaces

The active website fonts are derived from the supplied approved brand v2
masters, loaded by `next/font/local` in `app/layout.tsx`. No external font
request is needed at build time or in the browser.

| Web file | Supplied source | Font version | Size |
| --- | --- | --- | --- |
| `geist-brand-v2.woff2` | `brand/fonts/Geist-Variable.ttf` | Geist 1.800 | 69,880 bytes |
| `geist-mono-brand-v2.woff2` | `brand/fonts/GeistMono-Variable.ttf` | Geist Mono 1.701 | 70,996 bytes |

Both fonts retain the complete supplied glyph set and the variable weight
axis from 100 to 900. Conversion changed the container to WOFF2; it did not
subset, redraw, or instantiate the fonts. The earlier `*-latin.woff2` files
were Next.js-bundled version 1.401 subsets and are no longer active.

Conversion used FontTools 4.68.0 and Brotli 1.2.1 as temporary authoring tools,
not application dependencies. Reproduction with those tools available:

```python
from fontTools.ttLib import TTFont

for source, target in [
    ("brand/fonts/Geist-Variable.ttf", "app/fonts/geist-brand-v2.woff2"),
    ("brand/fonts/GeistMono-Variable.ttf", "app/fonts/geist-mono-brand-v2.woff2"),
]:
    font = TTFont(source)
    font.flavor = "woff2"
    font.save(target)
    font.close()
```

Keep [Geist-OFL.txt](Geist-OFL.txt) and [GeistMono-OFL.txt](GeistMono-OFL.txt)
with these fonts. They preserve the wording of the licenses supplied with the
brand masters. The earlier [OFL.txt](OFL.txt) accompanies the retained legacy
subsets.

Source SHA-256 values:

- Geist: `73894e0448cae90a92b6c2f8732b7bb9acb7b94c418bff559dad4a18e1de9659`
- Geist Mono: `d00e590b8eb3a59acc329b2d044fd143ae935090b7da33199ebee27cc7de8196`

Review desktop/mobile wrapping and assessment controls after a future font
update. Preserve the approved spelling, actual weight, and source licenses.
