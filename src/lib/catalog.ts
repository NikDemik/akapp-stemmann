import { z } from "zod";
import categoriesData from "@/data/categories.json";
import seriesData from "@/data/series.json";

const categorySchema = z.object({
  slug: z.string().min(1),
  number: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(1),
  range: z.string().min(1),
  image: z.string().min(1),
});

const specificationSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const modelSchema = z.object({
  model: z.string().min(1),
  current: z.string().min(1),
  application: z.string().min(1),
});

const seriesSchema = z.object({
  slug: z.string().min(1),
  category: z.string().min(1),
  name: z.string().min(1),
  subtitle: z.string().min(1),
  range: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  catalog: z.string().min(1),
  specs: z.array(specificationSchema).min(1),
  models: z.array(modelSchema).min(1),
});

export const categories = z.array(categorySchema).parse(categoriesData);
export const series = z.array(seriesSchema).parse(seriesData);

export type Category = z.infer<typeof categorySchema>;
export type ProductSeries = z.infer<typeof seriesSchema>;

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getSeries(category: string, slug: string) {
  return series.find((item) => item.category === category && item.slug === slug);
}

export function getSeriesByCategory(category: string) {
  return series.filter((item) => item.category === category);
}

export function getSeriesHref(item: ProductSeries) {
  return `/${item.category}/${item.slug}/`;
}
