import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SpotCategory } from "@prisma/client";

export const revalidate = 86400; // ISR: revalidate every 24 hours
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CityHero from "@/components/city/CityHero";
import CityStats from "@/components/city/CityStats";
import SpotList from "@/components/city/SpotList";
import TripResources from "@/components/city/TripResources";
import { SLUG_TO_CATEGORY, CATEGORY_SLUGS, CATEGORY_META } from "@/lib/categoryUtils";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

const BASE = "https://soulospotter.com";

type Props = {
  params: Promise<{ slug: string; category: string; locale: string }>;
};

async function getCity(slug: string) {
  return prisma.city.findUnique({
    where: { slug },
    include: {
      country: true,
      tags: true,
      spots: {
        where: { published: true },
        include: { tags: true, affiliateLinks: true },
        orderBy: { name: "asc" },
      },
    },
  });
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({
    where: { published: true },
    select: {
      slug: true,
      spots: { where: { published: true }, select: { category: true } },
    },
  });

  return cities.flatMap((city) => {
    const uniqueCategories = [...new Set(city.spots.map((s) => s.category))];
    return uniqueCategories.map((cat) => ({
      slug: city.slug,
      category: CATEGORY_SLUGS[cat],
    }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category: categorySlug } = await params;

  const activeCategory = SLUG_TO_CATEGORY[categorySlug];
  if (!activeCategory) return {};

  const city = await getCity(slug);
  if (!city) return {};

  const meta = CATEGORY_META[activeCategory];
  const count = city.spots.filter((s) => s.category === activeCategory).length;

  return {
    title: `${meta.label} in ${city.name} for Solo Travelers — SouloSpotter`,
    description: `The best ${meta.label.toLowerCase()} in ${city.name} for solo travelers. ${count} curated ${count === 1 ? "spot" : "spots"} — handpicked for people who travel alone.`,
    alternates: {
      canonical: `${BASE}/destinations/${slug}/${categorySlug}`,
    },
    openGraph: {
      title: `${meta.emoji} ${meta.label} in ${city.name} | SouloSpotter`,
      description: `${count} solo-travel-friendly ${meta.label.toLowerCase()} in ${city.name}.`,
    },
  };
}

export default async function CityCategoryPage({ params }: Props) {
  const { slug, category: categorySlug } = await params;

  // Resolve URL slug → enum value
  const activeCategory = SLUG_TO_CATEGORY[categorySlug] as SpotCategory | undefined;
  if (!activeCategory) notFound();

  const city = await getCity(slug);
  if (!city) notFound();

  // Filter to this category only
  const filteredSpots = city.spots.filter((s) => s.category === activeCategory);

  // 404 if this city has no spots in this category
  if (filteredSpots.length === 0) notFound();

  const categories = Array.from(new Set(city.spots.map((s) => s.category)));

  const jsonLd = breadcrumbSchema([
    { name: "Home",                               url: BASE },
    { name: "Destinations",                       url: `${BASE}/destinations` },
    { name: city.name,                            url: `${BASE}/destinations/${slug}` },
    { name: CATEGORY_META[activeCategory].label,  url: `${BASE}/destinations/${slug}/${categorySlug}` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">
        <CityHero city={city} activeCategory={activeCategory} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <CityStats city={city} />
          <TripResources />
          <SpotList
            spots={filteredSpots}
            allSpots={city.spots}
            categories={categories}
            activeCategory={activeCategory}
            citySlug={slug}
            cityName={city.name}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
