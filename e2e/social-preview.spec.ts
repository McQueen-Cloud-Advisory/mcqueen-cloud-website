import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

test("the independent case study has its own canonical URL without account verification metadata", async ({ page }) => {
  const response = await page.goto("/work/everything-is-random");
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mcqueencloud.com").origin;
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${origin}/work/everything-is-random`);
  await expect(page.locator('meta[name="google-adsense-account"]')).toHaveCount(0);
  expect(await response!.text()).not.toMatch(/ca-pub-\d+/);
});

test("shared links publish fresh, absolute images matching the current identity", async ({ page, request, baseURL }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Complex operations. Clear systems. | McQueen Cloud Advisory");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /helps small and midsize organizations simplify back-office work/);
  const approvedArtwork = await readFile(join(process.cwd(), "public", "brand", "v2", "mca-og-dark.png"));

  // Next intentionally uses localhost for file-based social images in dev.
  // External production previews and CI must resolve to the canonical origin.
  const expectedOrigin = new URL(
    process.env.PLAYWRIGHT_METADATA_ORIGIN ??
      (!process.env.PLAYWRIGHT_BASE_URL && !process.env.CI
        ? baseURL!
        : process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mcqueencloud.com"),
  ).origin;
  for (const format of ["og", "twitter"] as const) {
    const attribute = format === "og" ? "property" : "name";
    const meta = (field: string) => page.locator(`meta[${attribute}="${format}:${field}"]`);
    await expect(meta("image")).toHaveCount(1);
    const imageUrl = new URL((await meta("image").getAttribute("content"))!);
    expect(imageUrl.origin).toBe(expectedOrigin);
    expect(imageUrl.pathname).toBe(`/${format === "og" ? "opengraph" : "twitter"}-image/brand-v2`);
    await expect(meta("image:width")).toHaveAttribute("content", "1200");
    await expect(meta("image:height")).toHaveAttribute("content", "630");
    await expect(meta("image:type")).toHaveAttribute("content", "image/png");
    await expect(meta("image:alt")).toHaveAttribute("content", /Complex operations\. Clear systems\./);

    // Resolve the advertised path against this test server, before publication.
    const response = await request.get(`${imageUrl.pathname}${imageUrl.search}`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
    const png = await response.body();
    expect(png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    expect(png.length).toBeLessThan(5 * 1024 * 1024);
    expect(png.equals(approvedArtwork), "Share image must preserve the approved brand artwork").toBe(true);
    await testInfo.attach(`${format}-preview`, { body: png, contentType: "image/png" });
  }
});

test("previous image endpoints redirect to the fresh share images", async ({ request, baseURL }) => {
  for (const route of ["opengraph-image", "twitter-image"]) {
    const redirect = await request.get(`/${route}`, { maxRedirects: 0 });
    expect(redirect.status()).toBe(307);
    expect(new URL(redirect.headers().location, baseURL).pathname).toBe(`/${route}/brand-v2`);
    const response = await request.get(`/${route}`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
  }
});

test("the browser icon uses the approved micro artwork", async ({ page, request }) => {
  await page.goto("/");
  const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
  await expect(icon).toHaveCount(1);
  const href = await icon.getAttribute("href");
  expect(href).toBeTruthy();
  const response = await request.get(href!);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/svg+xml");
  expect(await response.text()).toBe(await readFile(join(process.cwd(), "public", "brand", "v2", "mca-micro.svg"), "utf8"));
});
