import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ExperienceFiltersClient from "@/components/experiences/ExperienceFiltersClient";
import PageHero from "@/components/layout/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  // Live distinct-country count so the description never goes stale.
  const rows = await prisma.experience.findMany({
    where: { isActive: true },
    select: { city: { select: { country: { select: { code: true } } } } },
  });
  const countryCount = new Set(rows.map((r) => r.city.country.code)).size;

  return {
    title: "Curated Experiences for Solo Travelers",
    description:
      `Browse solo-friendly tours, activities, and experiences across ${countryCount} countries. Cooking classes, hiking tours, photography walks, and more — curated for travelers going alone.`,
    alternates: { canonical: "https://soulospotter.com/experiences" },
  };
}

export default async function ExperiencesPage() {
  // Fetch all published experiences with city info
  const experiences = await prisma.experience.findMany({
    where: { isActive: true },
    include: {
      city: {
        include: { country: true },
      },
      organizer: true,
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  // Group cities with counts
  const cityMap = new Map<string, number>();
  experiences.forEach((exp) => {
    const key = exp.city.name;
    cityMap.set(key, (cityMap.get(key) || 0) + 1);
  });

  const cities = Array.from(cityMap.entries())
    .map(([name, count]) => ({
      slug: experiences.find((e) => e.city.name === name)?.city.slug || "",
      name,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Distinct countries represented by active experiences (derived, never hardcoded).
  const countryCount = new Set(experiences.map((e) => e.city.country.code)).size;

  // Transform for client component
  const clientExperiences = experiences.map((exp) => ({
    id: exp.id,
    slug: exp.slug,
    name: exp.name,
    city: {
      slug: exp.city.slug,
      name: exp.city.name,
      country: {
        code: exp.city.country.code,
        name: exp.city.country.name,
        flagEmoji: exp.city.country.flagEmoji ?? undefined,
      },
    },
    category: exp.category,
    price: exp.price,
    groupSizeMin: exp.groupSizeMin,
    groupSizeMax: exp.groupSizeMax,
    duration: exp.duration,
    photoUrl: exp.photoUrl ?? undefined,
    isFeatured: exp.isFeatured,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <PageHero imageKey="experiences" imageAlt="Experiences for solo travelers">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-8">
              <Link href="/" className="hover:text-soulo-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-soulo-white">Experiences</span>
            </nav>

            <div className="max-w-3xl mb-8">
              <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-4">
                Curated Activities
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Experiences for<br />
                <span className="text-soulo-gold">Solo Travelers</span>
              </h1>
              <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl">
                Cooking classes, hiking tours, photography walks, wellness retreats, and more. Curated for people who travel alone.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-soulo-gold border-opacity-30">
              <div>
                <p className="text-3xl font-bold text-soulo-gold">{clientExperiences.length}+</p>
                <p className="text-sm text-soulo-mist mt-1">Experiences</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-soulo-gold">{cities.length}</p>
                <p className="text-sm text-soulo-mist mt-1">Cities</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-soulo-gold">{countryCount}</p>
                <p className="text-sm text-soulo-mist mt-1">Countries</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-soulo-gold">8</p>
                <p className="text-sm text-soulo-mist mt-1">Categories</p>
              </div>
            </div>
          </div>
        </PageHero>

        {/* Filters and Results */}
        <ExperienceFiltersClient experiences={clientExperiences} cities={cities} />

        {/* CTA to List Experience */}
        <div className="bg-soulo-linen border-t border-soulo-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h3 className="font-display text-2xl font-bold text-soulo-dark mb-2">
              Got an experience to share?
            </h3>
            <p className="text-soulo-grey mb-6">
              List your tour, activity, or experience and reach solo travelers worldwide
            </p>
            <Link
              href="/experiences/list-your-experience"
              className="inline-block px-6 py-3 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-2xl transition-colors"
            >
              List Your Experience
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
