import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { REGIONS } from "@/lib/regions";

const BASE_URL = "https://soulospotter.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published cities
  const cities = await prisma.city.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/destinations`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/resources`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources/travel-insurance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources/esims`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources/tours`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/submit`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/advertise`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Region pages
  const regionPages: MetadataRoute.Sitemap = REGIONS.map((r) => ({
    url: `${BASE_URL}/regions/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // City pages — highest SEO value
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/destinations/${city.slug}`,
    lastModified: city.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...regionPages, ...cityPages];
}
