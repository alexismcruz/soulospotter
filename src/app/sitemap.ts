import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { REGIONS } from "@/lib/regions";
import { CATEGORY_SLUGS } from "@/lib/categoryUtils";

const BASE_URL = "https://soulospotter.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published cities with their spot categories
  const cities = await prisma.city.findMany({
    where: { published: true },
    select: {
      slug: true,
      updatedAt: true,
      spots: { where: { published: true }, select: { category: true } },
    },
  });

  // Fetch all active experiences
  const experiences = await prisma.experience.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/destinations`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/experiences`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/experiences/list-your-experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/resources`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources/travel-insurance`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources/esims`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources/tours`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/submit`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/advertise`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
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

  // City × category pages — only for combos that actually have spots
  const categoryPages: MetadataRoute.Sitemap = cities.flatMap((city) => {
    const uniqueCategories = [...new Set(city.spots.map((s) => s.category))];
    return uniqueCategories.map((cat) => ({
      url: `${BASE_URL}/destinations/${city.slug}/${CATEGORY_SLUGS[cat]}`,
      lastModified: city.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  });

  // Individual experience pages
  const experiencePages: MetadataRoute.Sitemap = experiences.map((exp) => ({
    url: `${BASE_URL}/experiences/${exp.slug}`,
    lastModified: exp.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...regionPages, ...cityPages, ...categoryPages, ...experiencePages];
}
