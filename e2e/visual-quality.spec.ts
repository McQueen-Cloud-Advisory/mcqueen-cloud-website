import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page, context: string) {
  const dimensions = await page.evaluate(() => ({
    content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    viewport: document.documentElement.clientWidth,
  }));
  expect(dimensions.content, `${context} has horizontal overflow`).toBeLessThanOrEqual(dimensions.viewport);
}

test("mobile navigation supports keyboard opening, Escape focus, and route selection", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("navigation", { name: "Mobile navigation", includeHidden: true });
  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menu).toBeHidden();
  await menuButton.focus();
  await page.keyboard.press("Enter");

  const closeButton = page.getByRole("button", { name: "Close navigation menu" });
  await expect(closeButton).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(menu.getByRole("link", { name: "Work", exact: true })).toBeFocused();
  await expectNoHorizontalOverflow(page, "Open mobile navigation at 360px");

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();

  await page.keyboard.press("Space");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work\/?$/);
  await expect(menu).toBeHidden();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test.describe("responsive presentation", () => {
  const routes = [
    "/",
    "/work",
    "/work/enterprise-financial-reconciliation",
    "/work/consultation-automation",
    "/assessment",
    "/insights/why-this-site-uses-firebase-app-hosting",
  ];

  for (const width of [360, 768, 1440]) {
    test(`key routes fit a ${width}px viewport`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(route);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await page.evaluate(async () => { await document.fonts.ready; });
        await expectNoHorizontalOverflow(page, `${route} at ${width}px`);

        if (route === "/assessment") {
          await page.getByRole("button", { name: "Start the assessment" }).click();
          await expect(page.getByRole("progressbar", { name: "Assessment progress" })).toBeVisible();
          await expectNoHorizontalOverflow(page, `Active assessment at ${width}px`);
        }
      }
    });
  }
});

test("reduced motion disables hero animation while retaining the content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: "View selected work", exact: true })).toBeVisible();
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator("#selected-work-title")).toBeVisible();

  const animatedElements = page.locator(".hero-copy, .hero-flow, .hero-layer");
  expect(await animatedElements.count()).toBeGreaterThan(1);
  const animations = await animatedElements.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).animationName),
  );
  expect(animations.every((animation) => animation === "none"), JSON.stringify(animations)).toBe(true);
});
