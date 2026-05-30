import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Region, CostLevel } from "@prisma/client";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import DestinationsClient from "@/components/destinations/DestinationsClient";

export const metadata: Metadata = {
  title: "Destinations — SouloSpotter",
  description:
    "Browse 21 cities across 8 regions curated for solo travelers. Filter by region, cost, and safety to find your next soulo adventure.",
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
        <div className="bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">Destinations</h1>
            <p className="mt-2 text-stone-500 text-lg">
              {cities.length} cities curated for solo travelers, across{" "}
              {new Set(cities.map((c) => c.region)).size} regions worldwide.
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
