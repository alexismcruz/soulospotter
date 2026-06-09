import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Region } from "@prisma/client";
import HeroSection from "@/components/home/HeroSection";
import RegionGrid from "@/components/home/RegionGrid";
import FeaturedCities from "@/components/home/FeaturedCities";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { websiteSchema, organizationSchema } from "@/lib/jsonld";

// Refresh the homepage at most hourly so newly-seeded cities, spot counts
// and photos appear without waiting for a redeploy.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: "SouloSpotter — Travel alone. Travel Soulo. Find yourself.",
    description: t("heroSubtitle"),
  };
}

async function getHomeData() {
  const [featuredCities, regionCounts, cityCount, spotCount] = await Promise.all([
    prisma.city.findMany({
      where: { published: true },
      include: {
        country: true,
        tags: true,
        _count: { select: { spots: true } },
      },
      orderBy: { safetyScore: "desc" },
      take: 8,
    }),
    prisma.city.groupBy({
      by: ["region"],
      where: { published: true },
      _count: { id: true },
    }),
    prisma.city.count({ where: { published: true } }),
    prisma.spot.count({ where: { published: true } }),
  ]);

  return { featuredCities, regionCounts, cityCount, spotCount };
}

export default async function HomePage() {
  const { featuredCities, regionCounts, cityCount, spotCount } = await getHomeData();

  const regionCountMap = regionCounts.reduce(
    (acc, r) => ({ ...acc, [r.region]: r._count.id }),
    {} as Record<Region, number>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={[websiteSchema(), organizationSchema()]} />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection cityCount={cityCount} spotCount={spotCount} regionCount={regionCounts.length} />
        <RegionGrid regionCounts={regionCountMap} />
        <FeaturedCities cities={featuredCities} />
      </main>
      <SiteFooter />
    </div>
  );
}
