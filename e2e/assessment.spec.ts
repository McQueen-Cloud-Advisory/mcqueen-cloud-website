import { expect, test } from "@playwright/test";

test("a visitor can complete and restart the readiness assessment", async ({
  page,
}) => {
  await page.goto("/assessment");

  await page.getByRole("button", { name: "Start the assessment" }).click();

  for (let questionNumber = 1; questionNumber <= 24; questionNumber += 1) {
    const answerOptions = page.locator("fieldset label");
    await expect(answerOptions).toHaveCount(4);

    await answerOptions.first().click();

    const actionLabel =
      questionNumber === 24 ? "View results" : "Next question";

    const actionButton = page.getByRole("button", { name: actionLabel });
    await expect(actionButton).toBeEnabled();
    await actionButton.click();
  }

  await expect(page.getByText("Your modernization profile")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Restart assessment" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Restart assessment" }).click();

  await expect(
    page.getByRole("button", { name: "Start the assessment" }),
  ).toBeVisible();
});
