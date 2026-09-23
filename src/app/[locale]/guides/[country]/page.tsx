import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import GuideFlightsCTA from "@/components/guides/GuideFlightsCTA";
import { getCountryGuide, COUNTRY_GUIDE_SLUGS } from "@/lib/countryGuides";
import { gygSearchUrl, breezeSimUrl, safetyWingUrl, bookingStaysPath } from "@/lib/affiliates";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";

export const revalidate = 86400; // ISR: refresh daily

const BASE = "https://soulospotter.com";

type Props = { params: Promise<{ country: string; locale: string }> };

export function generateStaticParams() {
  return COUNTRY_GUIDE_SLUGS.map((country) => ({ country }));
}

async function getGuideData(slug: string) {
  const guide = getCountryGuide(slug);
  if (!guide) return null;
  const country = await prisma.country.findUnique({
    where: { slug: guide.countrySlug },
    select: {
      flagEmoji: true,
      cities: {
        where: { published: true },
        select: { name: true, slug: true, _count: { select: { spots: true } } },
        orderBy: { name: "asc" },
      },
    },
  });
  return { guide, flag: country?.flagEmoji ?? "", cities: country?.cities ?? [] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const guide = getCountryGuide(country);
  if (!guide) return { title: "Page not found" };
  return {
    title: `${guide.countryName} Solo Travel Guide`,
    description: `Solo travel guide to ${guide.countryName}: safety, budget, visa requirements, when to go, getting around, and the best cities to start. Everything you need before you book.`,
    alternates: { canonical: `${BASE}/guides/${country}` },
    openGraph: {
      title: `${guide.countryName} Solo Travel Guide`,
      description: `The start-here guide to solo travel in ${guide.countryName} — safety, budget, visas and where to go.`,
    },
  };
}

export default async function CountryGuidePage({ params }: Props) {
  const { country } = await params;
  const data = await getGuideData(country);
  if (!data) notFound();
  const { guide, flag, cities } = data;

  const jsonLd = [
    breadcrumbSchema([
      { name: "Home",                                url: BASE },
      { name: "Guides",                               url: `${BASE}/guides` },
      { name: `${guide.countryName} Solo Travel Guide`, url: `${BASE}/guides/${country}` },
    ]),
    ...(cities.length > 0
      ? [
          itemListSchema({
            name: `Solo travel cities in ${guide.countryName}`,
            items: cities.map((c) => ({ name: c.name, url: `${BASE}/destinations/${c.slug}` })),
          }),
        ]
      : []),
  ];

  const toursUrl = gygSearchUrl(`${guide.countryName} tours`);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1 bg-soulo-white">
        {/* Hero */}
        <section className="bg-soulo-slate text-soulo-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-white">{guide.countryName}</span>
            </nav>
            <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">Solo Travel Guide</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              <span className="mr-2">{flag}</span>{guide.countryName} Solo Travel Guide
            </h1>
            <p className="text-soulo-mist text-lg leading-relaxed max-w-2xl">{guide.intro}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Big-ticket plan-your-trip CTAs */}
          <section>
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-4">Plan your {guide.countryName} trip</h2>
            <div className="space-y-4">
              <GuideFlightsCTA destCode={guide.gatewayAirport.code} destCity={guide.gatewayAirport.city} countryName={guide.countryName} />
              <div className="grid sm:grid-cols-2 gap-4">
                <AffiliateCTA href={bookingStaysPath(guide.countrySlug)} label={`Find a place to stay`} sublabel={`🏨 Hotels & stays in ${guide.countryName} on Booking.com`} color="blue" />
                <AffiliateCTA href={toursUrl} label={`Book ${guide.countryName} tours`} sublabel="🗺️ Day trips & experiences on GetYourGuide" color="amber" />
                <AffiliateCTA href={breezeSimUrl()} label="Get an eSIM" sublabel="📱 Data the moment you land — from $5" color="teal" />
                <AffiliateCTA href={safetyWingUrl()} label="Get travel insurance" sublabel="🛡️ Cover for the unexpected — from $45/mo" color="blue" />
              </div>
            </div>
          </section>

          {/* Best for */}
          <section className="rounded-2xl bg-soulo-linen border border-soulo-border p-6">
            <p className="text-sm font-semibold text-soulo-gold uppercase tracking-wide mb-1">Best for</p>
            <p className="text-soulo-dark leading-relaxed">{guide.bestFor}</p>
          </section>

          {/* Editorial sections */}
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-bold text-soulo-dark mb-3">{s.heading}</h2>
              <p className="text-soulo-grey leading-relaxed">{s.body}</p>
            </section>
          ))}

          {/* Visa */}
          <section id="visa" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-soulo-dark mb-3">Do you need a visa for {guide.countryName}?</h2>
            <p className="text-soulo-grey leading-relaxed mb-4">{guide.visa.summary}</p>
            <ul className="sm:hidden rounded-2xl border border-soulo-border divide-y divide-soulo-border text-sm">
              {guide.visa.cases.map((c) => (
                <li key={c.who} className="px-4 py-3">
                  <p className="font-medium text-soulo-dark">
                    <span className="mr-2">{c.flags}</span>{c.who}
                  </p>
                  <p className="mt-1 text-soulo-grey leading-relaxed">{c.rule}</p>
                </li>
              ))}
            </ul>
            <div className="hidden sm:block rounded-2xl border border-soulo-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-soulo-linen border-b border-soulo-border">
                    <th className="text-left px-5 py-3 font-semibold text-soulo-grey w-1/3">Your passport</th>
                    <th className="text-left px-5 py-3 font-semibold text-soulo-grey">Typical requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soulo-border">
                  {guide.visa.cases.map((c) => (
                    <tr key={c.who} className="align-top">
                      <td className="px-5 py-3 font-medium text-soulo-dark">
                        <span className="mr-2">{c.flags}</span>{c.who}
                      </td>
                      <td className="px-5 py-3 text-soulo-grey">{c.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-soulo-mist mt-3">
              Reviewed {guide.visa.updated}. Visa rules depend on your nationality and change often — always confirm the current requirement for your passport at the{" "}
              <a href={guide.visa.officialUrl} target="_blank" rel="noopener noreferrer" className="text-soulo-gold hover:underline">
                {guide.visa.officialLabel}
              </a>{" "}before you travel.
            </p>
          </section>

          {/* Where to go — live cities */}
          {cities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-soulo-dark mb-5">Where to go in {guide.countryName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/destinations/${c.slug}`}
                    className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 transition-all"
                  >
                    <span className="font-semibold text-soulo-dark">{c.name}</span>
                    <span className="text-xs text-soulo-mist whitespace-nowrap">{c._count.spots} spots →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
