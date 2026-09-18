import { copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve, sep } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "out");

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function addSegmentPayloadAliases() {
  const files = await collectFiles(outDir);
  let aliases = 0;

  for (const file of files) {
    const relativeParts = file.slice(outDir.length + 1).split(sep);
    const segmentStart = relativeParts.findIndex((part) => part.startsWith("__next."));

    if (segmentStart === -1 || segmentStart === relativeParts.length - 1) {
      continue;
    }

    const aliasParts = [
      ...relativeParts.slice(0, segmentStart),
      relativeParts.slice(segmentStart).join("."),
    ];
    const aliasPath = resolve(outDir, ...aliasParts);

    await copyFile(file, aliasPath);
    aliases += 1;
  }

  return aliases;
}

await mkdir(resolve(root, "out"), { recursive: true });
await copyFile(resolve(root, "deploy/.htaccess"), resolve(root, "out/.htaccess"));
const aliases = await addSegmentPayloadAliases();
console.log(`Added ${aliases} flat RSC payload aliases for static hosting.`);
console.log("Файл out/.htaccess добавлен в сборку для Beget.");
