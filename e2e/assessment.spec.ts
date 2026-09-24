import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectAccessibleAssessment(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const blockingViolations = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(blockingViolations, JSON.stringify(blockingViolations, null, 2)).toEqual([]);
}

test("a visitor can complete and restart the readiness assessment", async ({ page }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/assessment");
  await page.getByRole("button", { name: "Start the assessment" }).click();
  await expect(page.getByRole("button", { name: "Next question" })).toBeDisabled();

  for (let questionNumber = 1; questionNumber <= 24; questionNumber += 1) {
    const answerOptions = page.locator("fieldset label");
    await expect(answerOptions).toHaveCount(4);
    await expect(page.getByRole("progressbar", { name: "Assessment progress" }))
      .toHaveAttribute("aria-valuetext", `${questionNumber} of 24 questions`);
    await answerOptions.first().click();

    if (questionNumber === 1) {
      // Exercise selected and unselected controls with contrast checks enabled.
      await expectAccessibleAssessment(page);
    }

    const actionLabel = questionNumber === 24 ? "View results" : "Next question";
    const actionButton = page.getByRole("button", { name: actionLabel });
    await expect(actionButton).toBeEnabled();
    await actionButton.click();
  }

  await expect(page.getByText("Your modernization profile", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.getByRole("heading", { name: "Six-domain breakdown" })).toBeVisible();
  await expectAccessibleAssessment(page);

  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      viewport: document.documentElement.clientWidth,
    }));
    expect(dimensions.content, `Completed report overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
  }

  await page.getByRole("button", { name: "Restart assessment" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.getByRole("button", { name: "Start the assessment" })).toBeVisible();
  await page.getByRole("button", { name: "Start the assessment" }).click();
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Next question" })).toBeDisabled();
});

test("keyboard answers survive Back and returning through the overview", async ({ page }) => {
  await page.goto("/assessment");
  await page.getByRole("button", { name: "Start the assessment" }).click();
  await expect(page.locator(".assessment-question-region")).toBeFocused();
  await expect(page.getByRole("button", { name: "Next question" })).toBeDisabled();

  const choices = page.getByRole("radio");
  await page.keyboard.press("Tab");
  await expect(choices.first()).toBeFocused();
  await page.keyboard.press("Space");
  await expect(choices.first()).toBeChecked();
  await page.keyboard.press("ArrowDown");
  await expect(choices.nth(1)).toBeChecked();
  await expect(choices.nth(1)).toBeFocused();
  await expect(page.getByRole("button", { name: "Next question" })).toBeEnabled();

  await page.getByRole("button", { name: "Next question" }).click();
  await expect(page.locator(".assessment-question-region")).toBeFocused();
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuetext", "2 of 24 questions");
  await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Next question" })).toBeDisabled();

  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuetext", "1 of 24 questions");
  await expect(page.locator(".assessment-question-region")).toBeFocused();
  await expect(choices.nth(1)).toBeChecked();
  await expect(page.getByRole("button", { name: "Next question" })).toBeEnabled();

  await page.getByRole("button", { name: "Back to overview" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.getByRole("button", { name: "Start the assessment" }).click();
  await expect(choices.nth(1)).toBeChecked();
});
