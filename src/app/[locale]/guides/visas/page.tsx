import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import { COUNTRY_GUIDES, COUNTRY_GUIDE_SLUGS } from "@/lib/countryGuides";
import VisaChecker from "@/components/guides/VisaChecker";

export const revalidate = 86400; // ISR: refresh daily

const BASE = "https://soulospotter.com";

export const metadata: Metadata = {
  title: "Visa Requirements for Solo Travelers, by Country",
  description:
    "Quick visa reference for solo travelers — do you need a visa, a visa on arrival, or can you enter visa-free? Country-by-country summaries, linking to the full breakdown by passport.",
  alternates: { canonical: `${BASE}/guides/visas` },
};

export default async function VisaGuidesIndexPage() {
  // All destination countries we cover — the checker's "Going to" list should
  // span everywhere on the site, not just the countries with a written guide.
  const allCountries = await prisma.country.findMany({
    select: { slug: true, name: true, flagEmoji: true },
    orderBy: { name: "asc" },
  });
  const flagBySlug = Object.fromEntries(allCountries.map((c) => [c.slug, c.flagEmoji]));

  const guides = COUNTRY_GUIDE_SLUGS.map((slug) => COUNTRY_GUIDES[slug]);

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home",         url: BASE },
      { name: "Guides",       url: `${BASE}/guides` },
      { name: "Visa Guides",  url: `${BASE}/guides/visas` },
    ]),
    itemListSchema({
      name: "Visa requirements by country",
      items: guides.map((g) => ({ name: g.countryName, url: `${BASE}/guides/${g.countrySlug}#visa` })),
    }),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 bg-soulo-white">
        <section className="bg-soulo-slate text-soulo-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-white">Visa Guides</span>
            </nav>
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">Visa Guides</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              Do You Need a Visa? Quick Reference by Country
            </h1>
            <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl mb-7">
              A fast overview of entry requirements for solo travelers — visa-free, visa on arrival, or apply
              online first. Click through to each country for the full breakdown by passport, plus a link to the
              official source.
            </p>
            <VisaChecker
              destinations={allCountries.map((c) => ({ slug: c.slug, name: c.name, flag: c.flagEmoji }))}
              triggerLabel="🛂 Check my visa requirement"
            />
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {guides.length === 0 ? (
            <p className="text-soulo-grey">Visa guides are on the way — check back soon.</p>
          ) : (
            <div className="space-y-4">
              {guides.map((g) => (
                <Link
                  key={g.countrySlug}
                  href={`/guides/${g.countrySlug}#visa`}
                  className="group block p-6 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-2xl" aria-hidden>{flagBySlug[g.countrySlug]}</span>
                        <h2 className="font-display text-xl font-bold text-soulo-dark group-hover:text-soulo-gold transition-colors">
                          {g.countryName}
                        </h2>
                      </div>
                      <p className="text-sm text-soulo-grey leading-relaxed max-w-2xl">{g.visa.summary}</p>
                      <p className="text-xs text-soulo-mist mt-2">Reviewed {g.visa.updated}</p>
                    </div>
                    <span className="flex-shrink-0 text-sm font-bold text-soulo-gold whitespace-nowrap mt-1">
                      Full breakdown →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <p className="text-xs text-soulo-mist mt-8 border-t border-soulo-border pt-6">
            Visa rules depend on your specific passport and change often. Always confirm the current requirement
            with the destination's official immigration source before you book.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
