import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const categories = JSON.parse(await readFile(resolve(root, "src/data/categories.json"), "utf8"));
const series = JSON.parse(await readFile(resolve(root, "src/data/series.json"), "utf8"));
const errors = [];
const categorySlugs = new Set();
const routeKeys = new Set();

for (const item of categories) {
  if (!item.slug || categorySlugs.has(item.slug)) errors.push(`Некорректный или повторяющийся slug категории: ${item.slug}`);
  categorySlugs.add(item.slug);
}

for (const item of series) {
  const key = `${item.category}/${item.slug}`;
  if (!categorySlugs.has(item.category)) errors.push(`Неизвестная категория у ${item.name}: ${item.category}`);
  if (!item.slug || routeKeys.has(key)) errors.push(`Повторяющийся маршрут серии: ${key}`);
  routeKeys.add(key);
  if (!Array.isArray(item.specs) || item.specs.length === 0) errors.push(`Нет характеристик: ${item.name}`);
  if (!Array.isArray(item.models) || item.models.length === 0) errors.push(`Нет модификаций: ${item.name}`);
  for (const asset of [item.image, item.catalog]) {
    try { await access(resolve(root, "public", asset.replace(/^\//, ""))); }
    catch { errors.push(`Не найден файл ${asset} для ${item.name}`); }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`Данные корректны: ${categories.length} категории, ${series.length} серий.`);
