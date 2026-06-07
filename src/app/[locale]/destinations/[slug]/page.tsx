import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CityHero from "@/components/city/CityHero";
import CityStats from "@/components/city/CityStats";
import SpotList from "@/components/city/SpotList";
import TripResources from "@/components/city/TripResources";
import FlightCheck from "@/components/city/FlightCheck";

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

  const categories = Array.from(new Set(city.spots.map((s) => s.category)));

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <CityHero city={city} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <CityStats city={city} />
          <FlightCheck citySlug={slug} cityName={city.name} />
          <TripResources citySlug={slug} />
          <SpotList
            spots={city.spots}
            allSpots={city.spots}
            categories={categories}
            activeCategory={undefined}
            citySlug={slug}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
