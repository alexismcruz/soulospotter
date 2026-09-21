import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { REGION_BY_SLUG, REGIONS } from "@/lib/regions";

export const revalidate = 86400; // ISR: revalidate every 24 hours
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CityCard from "@/components/destinations/CityCard";
import PageHero, { HERO_IMAGES } from "@/components/layout/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema, faqSchema } from "@/lib/jsonld";
import { COUNTRY_GUIDES, COUNTRY_GUIDE_SLUGS } from "@/lib/countryGuides";
import { REGION_EDITORIAL } from "@/lib/regionContent";

const BASE = "https://soulospotter.com";

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
    orderBy: [{ country: { name: "asc" } }, { name: "asc" }],
  });

  return { meta, cities };
}

export async function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = REGION_BY_SLUG[slug];
  if (!meta) return { title: "Page not found" };
  return {
    title: `Solo Travel in ${meta.label}`,
    description: meta.description,
    alternates: { canonical: `${BASE}/regions/${slug}` },
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

  // Full country guides for countries in this region (internal links to our best pages)
  const guideCountries = Array.from(
    new Map(cities.map((c) => [c.country.slug, c.country])).values(),
  )
    .filter((c) => COUNTRY_GUIDE_SLUGS.includes(c.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const editorial = REGION_EDITORIAL[slug];

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home",         url: BASE },
      { name: "Destinations", url: `${BASE}/destinations` },
      { name: meta.label,     url: `${BASE}/regions/${slug}` },
    ]),
    ...(cities.length > 0
      ? [
          itemListSchema({
            name: `Solo travel destinations in ${meta.label}`,
            items: cities.map((c) => ({
              name: c.name,
              url: `${BASE}/destinations/${c.slug}`,
            })),
          }),
        ]
      : []),
    ...(editorial ? [faqSchema(editorial.faqs)] : []),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <PageHero imageKey={(slug in HERO_IMAGES ? slug : "destinations") as keyof typeof HERO_IMAGES} imageAlt={meta.label}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-6">
              <Link href="/" className="hover:text-soulo-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-soulo-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-soulo-white">{meta.label}</span>
            </nav>

            <div className="flex items-start gap-5">
              <span className="text-6xl">{meta.emoji}</span>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-soulo-white">{meta.label}</h1>
                <p className="mt-3 text-soulo-mist text-lg max-w-2xl leading-relaxed">
                  {meta.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                  <div>
                    <span className="text-2xl font-bold text-soulo-gold">{cities.length}</span>
                    <span className="ml-1.5 text-soulo-mist">{cities.length === 1 ? "city" : "cities"}</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-soulo-gold">{countries}</span>
                    <span className="ml-1.5 text-soulo-mist">{countries === 1 ? "country" : "countries"}</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-soulo-gold">{totalSpots}</span>
                    <span className="ml-1.5 text-soulo-mist">curated spots</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageHero>

        {/* Cities grid */}
        <div className="bg-soulo-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {guideCountries.length > 0 && (
              <section className="mb-12">
                <h2 className="font-display text-xl font-bold text-soulo-dark mb-4">
                  Start-here guides for {meta.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guideCountries.map((c) => {
                    const g = COUNTRY_GUIDES[c.slug];
                    return (
                      <Link
                        key={c.slug}
                        href={`/guides/${c.slug}`}
                        className="group flex flex-col gap-1.5 p-5 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 hover:shadow-md transition-all"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-2xl" aria-hidden>{c.flagEmoji}</span>
                          <span className="font-display text-lg font-bold text-soulo-dark group-hover:text-soulo-gold transition-colors">
                            {c.name} solo travel guide
                          </span>
                        </span>
                        <span className="text-sm text-soulo-grey leading-relaxed line-clamp-2">{g.intro}</span>
                        <span className="text-xs font-semibold text-soulo-gold">Safety · Budget · Visa →</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {cities.length === 0 ? (
              <div className="text-center py-20 text-soulo-mist">
                <p className="text-4xl mb-3">{meta.emoji}</p>
                <p className="text-lg font-medium text-soulo-grey">More cities coming soon.</p>
                <p className="text-sm mt-1">We're curating the best solo travel spots in {meta.label}.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-soulo-grey mb-8">
                  Showing <strong className="text-soulo-dark">{cities.length}</strong>{" "}
                  {cities.length === 1 ? "destination" : "destinations"} in {meta.label}
                </p>
                <div className="space-y-12">
                  {Object.entries(
                    cities.reduce((acc, city) => {
                      (acc[city.country.name] ??= []).push(city);
                      return acc;
                    }, {} as Record<string, typeof cities>)
                  )
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([countryName, countryCities]) => (
                      <div key={countryName}>
                        <div className="flex items-center gap-3 mb-5">
                          <span className="text-2xl">{countryCities[0].country.flagEmoji}</span>
                          <h2 className="font-display text-xl font-bold text-soulo-dark">{countryName}</h2>
                          <span className="text-sm text-soulo-mist">
                            {countryCities.length} {countryCities.length === 1 ? "city" : "cities"}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          {countryCities.map((city) => (
                            <CityCard key={city.id} city={city} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Editorial (only for regions we've written it for) */}
        {editorial && (
          <div className="bg-soulo-white border-t border-soulo-border py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold text-soulo-dark mb-6">{editorial.heading}</h2>
              <div className="space-y-6">
                {editorial.paragraphs.map((p) => (
                  <div key={p.title}>
                    <h3 className="font-display text-lg font-bold text-soulo-dark mb-2">{p.title}</h3>
                    <p className="text-soulo-grey leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
              <h2 className="font-display text-2xl font-bold text-soulo-dark mt-12 mb-5">Frequently asked questions</h2>
              <div className="space-y-5">
                {editorial.faqs.map((f) => (
                  <div key={f.question} className="border-b border-soulo-border pb-5 last:border-0">
                    <h3 className="font-display text-base font-bold text-soulo-dark mb-1.5">{f.question}</h3>
                    <p className="text-sm text-soulo-grey leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-soulo-grey">
                Planning entry rules?{" "}
                <Link href="/guides/visas" className="text-soulo-gold font-semibold hover:underline">
                  Check visa requirements by country →
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Explore other regions */}
        <div className="bg-soulo-linen border-t border-soulo-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-6">Explore other regions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherRegions.map((r) => (
                <Link
                  key={r.slug}
                  href={`/regions/${r.slug}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:bg-soulo-linen transition-all group"
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-sm font-medium text-soulo-grey group-hover:text-soulo-dark leading-snug">
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
