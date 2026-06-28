import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string): string =>
  readFileSync(resolve(process.cwd(), relativePath), "utf-8");

const knowledgeBaseUrl = "https://cloudengineer.mcqueencloud.com/";

describe("cloud-engineering knowledge-base discoverability", () => {
  it("defines the external resource in one reusable component", () => {
    const source = readSource(
      "components/engagement/EngineeringKnowledgeBaseLink.tsx",
    );

    expect(source).toContain(knowledgeBaseUrl);
    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noopener noreferrer"');
  });

  it.each([
    "app/about/page.tsx",
    "app/insights/page.tsx",
    "components/layout/Footer.tsx",
  ])("surfaces the resource from %s", (path) => {
    const source = readSource(path);

    expect(source).toContain("EngineeringKnowledgeBaseLink");
  });

  it("does not add the resource to primary navigation", () => {
    const source = readSource("components/layout/Header.tsx");

    expect(source).not.toContain(knowledgeBaseUrl);
    expect(source).not.toContain("EngineeringKnowledgeBaseLink");
  });
});
