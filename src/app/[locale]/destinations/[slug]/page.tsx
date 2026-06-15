import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const revalidate = 86400; // ISR: revalidate every 24 hours
import CityHero from "@/components/city/CityHero";
import CityStats from "@/components/city/CityStats";
import SpotList from "@/components/city/SpotList";
import TripResources from "@/components/city/TripResources";
import CityExperiences from "@/components/city/CityExperiences";
import CityCard from "@/components/destinations/CityCard";
import JsonLd from "@/components/seo/JsonLd";
import { citySchema, breadcrumbSchema } from "@/lib/jsonld";

const BASE = "https://soulospotter.com";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

async function getCity(slug: string) {
  return prisma.city.findUnique({
    where: { slug },
    include: {
      country: true,
      tags: true,
      spots: {
        where: { published: true },
        include: {
          tags: true,
          affiliateLinks: true,
        },
        orderBy: { name: "asc" },
      },
      experiences: {
        where: { isActive: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        take: 12,
      },
    },
  });
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCity(slug);
  if (!city) return {};
  return {
    title: city.seoTitle ?? `Solo Travel in ${city.name} — SouloSpotter`,
    description:
      city.seoDesc ??
      `Discover the best spots for solo travelers in ${city.name}, ${city.country.name}. Cafes, coworking, accommodation, wellness and more.`,
    alternates: {
      canonical: `${BASE}/destinations/${slug}`,
    },
    openGraph: {
      title: `Solo Travel in ${city.name}`,
      description: `${city.spots.length} curated spots for solo travelers in ${city.name}.`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;

  const city = await getCity(slug);
  if (!city) notFound();

  // Related cities — same region, exclude self, up to 4
  const relatedCities = await prisma.city.findMany({
    where: { published: true, region: city.region, NOT: { slug } },
    include: { country: true, tags: true, _count: { select: { spots: true } } },
    orderBy: { safetyScore: "desc" },
    take: 4,
  });

  const categories = Array.from(new Set(city.spots.map((s) => s.category)));

  const jsonLd = [
    citySchema({
      name: city.name,
      slug: city.slug,
      description: city.description,
      countryName: city.country.name,
      countryCode: city.country.code,
      imageUrl: city.imageUrl,
    }),
    breadcrumbSchema([
      { name: "Home",         url: BASE },
      { name: "Destinations", url: `${BASE}/destinations` },
      { name: city.name,      url: `${BASE}/destinations/${slug}` },
    ]),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">
        <CityHero city={city} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <CityStats city={city} />
          <TripResources citySlug={slug} />
          <CityExperiences
            cityName={city.name}
            citySlug={slug}
            experiences={city.experiences.map((exp) => ({
              id: exp.id,
              slug: exp.slug,
              name: exp.name,
              category: exp.category,
              price: exp.price,
              groupSizeMin: exp.groupSizeMin,
              groupSizeMax: exp.groupSizeMax,
              duration: exp.duration,
              photoUrl: exp.photoUrl ?? undefined,
              isFeatured: exp.isFeatured,
              city: { name: city.name, country: { code: city.country.code, name: city.country.name } },
            }))}
          />
          <SpotList
            spots={city.spots}
            allSpots={city.spots}
            categories={categories}
            activeCategory={undefined}
            citySlug={slug}
            cityName={city.name}
          />
        </div>

        {/* Related cities — internal linking for SEO */}
        {relatedCities.length > 0 && (
          <div className="bg-soulo-linen border-t border-soulo-border py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-xl font-bold text-soulo-dark mb-6">
                More Solo Travel Destinations in {city.region.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedCities.map((rc) => (
                  <CityCard key={rc.id} city={rc} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/destinations"
                  className="inline-block text-sm font-semibold text-soulo-gold hover:text-amber-500 transition-colors"
                >
                  View all destinations →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
