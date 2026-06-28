import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const accessibilityRoutes = [
  "/",
  "/services",
  "/work",
  "/assessment",
  "/insights",
  "/about",
  "/contact",
] as const;

test.describe("automated accessibility checks", () => {
  for (const route of accessibilityRoutes) {
    test(`${route} has no serious or critical Axe violations`, async ({
      page,
    }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();

      const blockingViolations = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );

      expect(
        blockingViolations,
        JSON.stringify(blockingViolations, null, 2),
      ).toEqual([]);
    });
  }
});