import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import { COUNTRY_GUIDES, COUNTRY_GUIDE_SLUGS } from "@/lib/countryGuides";

export const revalidate = 86400; // ISR: refresh daily

const BASE = "https://soulospotter.com";

export const metadata: Metadata = {
  title: "Solo Travel Guides by Country",
  description:
    "Start-here solo travel guides for every country we cover — safety, budget, visas, when to go, and the best cities to begin your trip.",
  alternates: { canonical: `${BASE}/guides` },
};

export default async function GuidesIndexPage() {
  // Live city counts per guide, for the card subtext.
  const countries = await prisma.country.findMany({
    where: { slug: { in: COUNTRY_GUIDE_SLUGS } },
    select: { slug: true, flagEmoji: true, _count: { select: { cities: { where: { published: true } } } } },
  });
  const bySlug = Object.fromEntries(countries.map((c) => [c.slug, c]));

  const guides = COUNTRY_GUIDE_SLUGS.map((slug) => COUNTRY_GUIDES[slug]);

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home",   url: BASE },
      { name: "Guides", url: `${BASE}/guides` },
    ]),
    itemListSchema({
      name: "Solo travel guides by country",
      items: guides.map((g) => ({ name: g.countryName, url: `${BASE}/guides/${g.countrySlug}` })),
    }),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 bg-soulo-white">
        <section className="bg-soulo-slate text-soulo-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">Country Guides</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              Solo Travel Guides by Country
            </h1>
            <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl">
              Before you land, get the essentials: is it safe to go alone, what will it cost, do you need a visa,
              and which cities to start in. One guide per country, written for people travelling solo.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {guides.length === 0 ? (
            <p className="text-soulo-grey">More country guides are on the way — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {guides.map((g) => {
                const country = bySlug[g.countrySlug];
                const cityCount = country?._count.cities ?? 0;
                return (
                  <Link
                    key={g.countrySlug}
                    href={`/guides/${g.countrySlug}`}
                    className="group flex flex-col gap-2 p-6 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl" aria-hidden>{country?.flagEmoji}</span>
                      <h2 className="font-display text-xl font-bold text-soulo-dark group-hover:text-soulo-gold transition-colors">
                        {g.countryName}
                      </h2>
                    </div>
                    <p className="text-sm text-soulo-grey leading-relaxed line-clamp-2">{g.intro}</p>
                    <p className="text-xs text-soulo-mist mt-1">
                      {cityCount} {cityCount === 1 ? "city" : "cities"} covered · Safety · Budget · Visa →
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
