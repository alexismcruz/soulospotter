import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Region, CostLevel } from "@prisma/client";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import DestinationsClient from "@/components/destinations/DestinationsClient";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Destinations — SouloSpotter",
  description:
    "Browse solo-travel destinations by region, country, and city. Filter by region, cost, and safety to find your next soulo adventure.",
  alternates: { canonical: "https://soulospotter.com/destinations" },
};

async function getAllCities() {
  return prisma.city.findMany({
    where: { published: true },
    include: {
      country: true,
      tags: true,
      _count: { select: { spots: true } },
    },
    orderBy: { name: "asc" },
  });
}

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; region?: string; cost?: string }>;
}) {
  const { q, region, cost } = await searchParams;
  const cities = await getAllCities();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-stone-50">
        {/* Page header */}
        <div className="bg-soulo-slate text-soulo-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">Solo Travel Directory</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">Destinations</h1>
            <p className="text-soulo-mist text-lg max-w-2xl">
              {cities.length} cities across {new Set(cities.map((c) => c.region)).size} regions, curated for solo travelers.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <DestinationsClient
            cities={cities}
            initialQuery={q ?? ""}
            initialRegion={region ?? ""}
            initialCost={cost ?? ""}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
