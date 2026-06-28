import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string): string =>
  readFileSync(resolve(process.cwd(), relativePath), "utf-8");

const expectOutcomeBeforeTechnology = ({
  source,
  outcomeMarker,
}: {
  source: string;
  outcomeMarker: string;
}): void => {
  const outcomeIndex = source.indexOf(outcomeMarker);
  const technologyIndex = source.indexOf("Technical implementation");

  expect(outcomeIndex).toBeGreaterThanOrEqual(0);
  expect(technologyIndex).toBeGreaterThanOrEqual(0);
  expect(outcomeIndex).toBeLessThan(technologyIndex);
};

describe("case-study content hierarchy", () => {
  it("presents the consultation outcome before the technology stack", () => {
    const source = readSource(
      "app/work/consultation-automation/page.tsx",
    );

    expectOutcomeBeforeTechnology({
      source,
      outcomeMarker: "Brief generated within minutes",
    });
  });

  it("presents the financial outcome before the technology stack", () => {
    const source = readSource(
      "app/work/enterprise-financial-reconciliation/page.tsx",
    );

    expectOutcomeBeforeTechnology({
      source,
      outcomeMarker: "Manual hours reduced monthly",
    });
  });

  it("keeps technology chips out of both hero sections", () => {
    const consultationSource = readSource(
      "app/work/consultation-automation/page.tsx",
    );
    const financialSource = readSource(
      "app/work/enterprise-financial-reconciliation/page.tsx",
    );

    const consultationHero =
      consultationSource.split("Business problem")[0] ?? "";
    const financialHero =
      financialSource.split("Operating signals")[0] ?? "";

    expect(consultationHero).not.toContain("technologies.map");
    expect(financialHero).not.toContain("technologies.map");
  });
});
