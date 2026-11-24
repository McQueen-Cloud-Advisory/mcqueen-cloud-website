import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

// App Hosting packages traced files before copying public/. A partial public/
// directory can cause older adapters to omit the remaining assets.
const publicRoot = resolve("public");
const serverRoot = resolve(".next/server");
const assets = (await readdir(publicRoot, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name));
const traces = (await readdir(serverRoot, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".nft.json"))
  .map((entry) => join(entry.parentPath, entry.name));
const packagedFiles = new Set();

for (const trace of traces) {
  const { files } = JSON.parse(await readFile(trace, "utf8"));
  for (const file of files) packagedFiles.add(resolve(dirname(trace), file));
}

const missing = assets.filter((asset) => !packagedFiles.has(asset));
if (missing.length) {
  throw new Error(`Public assets missing from deployment traces:\n${missing.join("\n")}`);
}
console.log(`Verified all ${assets.length} public assets in deployment traces.`);
