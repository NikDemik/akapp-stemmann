import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: "https://akapp-stemmann.su/sitemap.xml", host: "https://akapp-stemmann.su" };
}
