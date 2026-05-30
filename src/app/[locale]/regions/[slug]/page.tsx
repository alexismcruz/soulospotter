import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { REGION_BY_SLUG, REGIONS } from "@/lib/regions";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CityCard from "@/components/destinations/CityCard";

type Props = { params: Promise<{ slug: string }> };

async function getCitiesByRegion(slug: string) {
  const meta = REGION_BY_SLUG[slug];
  if (!meta) return null;

  const cities = await prisma.city.findMany({
    where: { published: true, region: meta.region },
    include: {
      country: true,
      tags: true,
      _count: { select: { spots: true } },
    },
    orderBy: { name: "asc" },
  });

  return { meta, cities };
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = REGION_BY_SLUG[slug];
  if (!meta) return {};
  return {
    title: `Solo Travel in ${meta.label} — SouloSpotter`,
    description: meta.description,
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCitiesByRegion(slug);
  if (!data) notFound();

  const { meta, cities } = data;

  // Aggregate stats
  const totalSpots = cities.reduce((sum, c) => sum + c._count.spots, 0);
  const countries = new Set(cities.map((c) => c.country.name)).size;

  // Other regions for "Explore other regions" section
  const otherRegions = REGIONS.filter((r) => r.slug !== slug);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{meta.label}</span>
            </nav>

            <div className="flex items-start gap-5">
              <span className="text-6xl">{meta.emoji}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{meta.label}</h1>
                <p className="mt-3 text-stone-300 text-lg max-w-2xl leading-relaxed">
                  {meta.description}
                </p>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                  <div>
                    <span className="text-2xl font-bold text-amber-400">{cities.length}</span>
                    <span className="ml-1.5 text-stone-400">{cities.length === 1 ? "city" : "cities"}</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-amber-400">{countries}</span>
                    <span className="ml-1.5 text-stone-400">{countries === 1 ? "country" : "countries"}</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-amber-400">{totalSpots}</span>
                    <span className="ml-1.5 text-stone-400">curated spots</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cities grid */}
        <div className="bg-stone-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {cities.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <p className="text-4xl mb-3">{meta.emoji}</p>
                <p className="text-lg font-medium text-stone-600">More cities coming soon.</p>
                <p className="text-sm mt-1">We're curating the best solo travel spots in {meta.label}.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-stone-500 mb-6">
                  Showing <strong className="text-stone-800">{cities.length}</strong>{" "}
                  {cities.length === 1 ? "destination" : "destinations"} in {meta.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {cities.map((city) => (
                    <CityCard key={city.id} city={city} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Explore other regions */}
        <div className="bg-white border-t border-stone-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Explore other regions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherRegions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/regions/${r.slug}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-amber-300 hover:bg-amber-50 transition-all group"
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-sm font-medium text-stone-700 group-hover:text-amber-700 leading-snug">
                    {r.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
