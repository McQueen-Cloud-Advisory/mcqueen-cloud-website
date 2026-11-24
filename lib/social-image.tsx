import { readFile } from "node:fs/promises";
import { join } from "node:path";
import brand from "@/brand/brand-system.json";

// Change the version when replacing this approved artwork so social crawlers
// receive a fresh image URL, including when only an imported asset changes.
export const socialImageMetadata = {
  id: "brand-v2",
  alt: `${brand.meta.name}. ${brand.strategy.headline} ${brand.strategy.descriptor}.`,
  size: { width: 1200, height: 630 },
  contentType: "image/png",
};

export async function createSocialImage() {
  const artwork = await readFile(
    join(process.cwd(), "public", "brand", "v2", "mca-og-dark.png"),
  );

  // Serve the approved export intact rather than recreating the brand artwork.
  return new Response(new Uint8Array(artwork), {
    headers: { "Content-Type": socialImageMetadata.contentType },
  });
}
