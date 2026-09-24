import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const accessibilityRoutes = [
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

test.describe("automated accessibility checks, including color contrast", () => {
  for (const route of accessibilityRoutes) {
    test(`${route} has no serious or critical Axe violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await page.evaluate(async () => { await document.fonts.ready; });
      const results = await new AxeBuilder({ page }).analyze();
      const blockingViolations = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );
      expect(blockingViolations, JSON.stringify(blockingViolations, null, 2)).toEqual([]);
    });
  }
});
