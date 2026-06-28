import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/services",
  "/work",
  "/work/consultation-automation",
  "/work/enterprise-financial-reconciliation",
  "/assessment",
  "/insights",
  "/insights/why-this-site-uses-firebase-app-hosting",
  "/about",
  "/contact",
] as const;

test.describe("public route smoke tests", () => {
  for (const route of publicRoutes) {
    test(`${route} renders successfully`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
    });
  }

  test("crawler and metadata routes respond successfully", async ({
    request,
  }) => {
    const routes = ["/robots.txt", "/sitemap.xml", "/opengraph-image"];

    for (const route of routes) {
      const response = await request.get(route);
      expect(response.ok()).toBe(true);
    }
  });

  test("unknown routes render the custom not-found experience", async ({
    page,
  }) => {
    const response = await page.goto("/this-route-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Return home", exact: true }),
    ).toBeVisible();
  });
});