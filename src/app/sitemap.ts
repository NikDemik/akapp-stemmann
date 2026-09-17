import type { MetadataRoute } from "next";
import { categories, series } from "@/lib/catalog";
import { regions } from "@/lib/regions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://akapp-stemmann.su";
  const staticPages = ["", "/catalogs", "/about", "/delivery", "/regions", "/contacts", "/privacy", "/consent"];
  return [
    ...staticPages.map((path, index) => ({ url: `${base}${path}/`, changeFrequency: index === 0 ? "weekly" as const : "monthly" as const, priority: index === 0 ? 1 : 0.6 })),
    ...categories.map((item) => ({ url: `${base}/${item.slug}/`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...series.map((item) => ({ url: `${base}/${item.category}/${item.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...regions.map((item) => ({ url: `${base}/regions/${item.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
