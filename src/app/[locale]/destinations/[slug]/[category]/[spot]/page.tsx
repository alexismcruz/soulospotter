import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AffiliateProvider, PriceRange } from "@prisma/client";

export const revalidate = 86400; // ISR: revalidate every 24 hours
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FlagImage from "@/components/ui/FlagImage";
import TripResources from "@/components/city/TripResources";
import { SLUG_TO_CATEGORY, CATEGORY_SLUGS, CATEGORY_META } from "@/lib/categoryUtils";
import JsonLd from "@/components/seo/JsonLd";
import { spotSchema, breadcrumbSchema } from "@/lib/jsonld";
import { pickTitle, nameHasCity } from "@/lib/seoTitle";
import { spotMetaDescription, aloneSentence } from "@/lib/seoText";
import RelatedCityCategories from "@/components/city/RelatedCityCategories";
import { decodeSlug } from "@/lib/slug";

const BASE = "https://soulospotter.com";

type Props = {
  params: Promise<{ slug: string; category: string; spot: string; locale: string }>;
};

const PRICE_LABELS: Record<PriceRange, string> = {
  FREE:   "Free",
  BUDGET: "$",
  MID:    "$$",
  HIGH:   "$$$",
};

const PRICE_TEXT: Record<PriceRange, string> = {
  FREE:   "Free to visit",
  BUDGET: "Budget-friendly ($)",
  MID:    "Mid-range ($$)",
  HIGH:   "Higher-end ($$$)",
};

const AFFILIATE_LABELS: Partial<Record<AffiliateProvider, string>> = {
  BOOKING_COM:  "Book on Booking.com",
  HOSTELWORLD:  "Book on Hostelworld",
  AIRBNB:       "Book on Airbnb",
  SAFETYWING:   "Get Travel Insurance",
  WORLD_NOMADS: "Get Travel Insurance",
  AIRALO:       "Get an eSIM",
  GETYOURGUIDE: "Book a Tour",
  VIATOR:       "Book on Viator",
  OTHER:        "Learn More",
};

async function getSpot(citySlug: string, spotSlug: string) {
  return prisma.spot.findFirst({
    where: {
      slug: decodeSlug(spotSlug),
      city: { slug: decodeSlug(citySlug) },
      published: true,
    },
    include: {
      city: { include: { country: true } },
      tags: true,
      affiliateLinks: true,
    },
  });
}

export async function generateStaticParams() {
  const spots = await prisma.spot.findMany({
    where: { published: true },
    include: { city: { select: { slug: true } } },
  });
  return spots.map((s) => ({
    slug: s.city.slug,
    category: CATEGORY_SLUGS[s.category],
    spot: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category: catSlug, spot: spotSlug } = await params;
  const spot = await getSpot(slug, spotSlug);
  if (!spot) return { title: "Page not found" };
  const catMeta = CATEGORY_META[spot.category];
  // Snippet = the spot's own first sentence + a hook built from its real solo flags
  // (comfortable alone / good for meeting people), kept under ~158 chars.
  const cleanDesc = spotMetaDescription({
    description: spot.description,
    category: spot.category,
    comfortableAlone: spot.comfortableAlone,
    meetPeople: spot.meetPeople,
  });
  // Don't repeat the city when the spot's name already has it ("Sairee Night Market Koh Tao"),
  // and fall back to shorter forms so the title isn't truncated in search results.
  const inCity = nameHasCity(spot.name, spot.city.name) ? "" : ` in ${spot.city.name}`;
  return {
    title: pickTitle([
      `${spot.name}${inCity} — ${catMeta.label} for Solo Travelers`,
      `${spot.name}${inCity} — Solo Travel Guide`,
      `${spot.name}${inCity}`,
    ]),
    description:
      cleanDesc ??
      `${spot.name} — a solo-travel-friendly ${catMeta.label.toLowerCase()} in ${spot.city.name}, hand-picked by SouloSpotter for people travelling alone.`,
    alternates: {
      canonical: `${BASE}/destinations/${slug}/${catSlug}/${spotSlug}`,
    },
  };
}

export default async function SpotPage({ params }: Props) {
  const { slug: citySlug, category: categorySlug, spot: spotSlug } = await params;

  const activeCategory = SLUG_TO_CATEGORY[categorySlug];
  if (!activeCategory) notFound();

  const spot = await getSpot(citySlug, spotSlug);
  if (!spot) notFound();

  const catMeta = CATEGORY_META[spot.category];

  // Related spots in the same city + category
  const related = await prisma.spot.findMany({
    where: {
      cityId: spot.cityId,
      category: spot.category,
      published: true,
      NOT: { slug: spot.slug },
    },
    take: 3,
  });

  const jsonLd = [
    spotSchema({
      name: spot.name,
      slug: spot.slug,
      category: spot.category,
      description: spot.description,
      address: spot.address,
      cityName: spot.city.name,
      citySlug: citySlug,
      countryName: spot.city.country.name,
      countryCode: spot.city.country.code,
      imageUrl: spot.imageUrl,
      website: spot.website,
      categorySlug,
    }),
    breadcrumbSchema([
      { name: "Home",                          url: BASE },
      { name: "Destinations",                  url: `${BASE}/destinations` },
      { name: spot.city.name,                  url: `${BASE}/destinations/${citySlug}` },
      { name: catMeta.label,                   url: `${BASE}/destinations/${citySlug}/${categorySlug}` },
      { name: spot.name,                       url: `${BASE}/destinations/${citySlug}/${categorySlug}/${spot.slug}` },
    ]),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-soulo-white border-b border-soulo-border py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-soulo-grey">
              <Link href="/" className="hover:text-soulo-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-soulo-gold transition-colors">Destinations</Link>
              <span>/</span>
              <Link href={`/destinations/${citySlug}`} className="hover:text-soulo-gold transition-colors">
                {spot.city.name}
              </Link>
              <span>/</span>
              <Link href={`/destinations/${citySlug}/${categorySlug}`} className="hover:text-soulo-gold transition-colors">
                {catMeta.emoji} {catMeta.label}
              </Link>
              <span>/</span>
              <span className="text-soulo-dark font-semibold">{spot.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left — main info */}
            <article className="lg:col-span-2">

              {/* Category badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soulo-linen text-soulo-dark text-sm font-semibold">
                  {catMeta.emoji} {catMeta.label}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl font-bold text-soulo-dark mb-3">
                {spot.name}
              </h1>

              {/* City + flag */}
              <div className="flex items-center gap-2 mb-6">
                <FlagImage code={spot.city.country.code} name={spot.city.country.name} size="sm" />
                <span className="text-soulo-grey">
                  {spot.city.name}, {spot.city.country.name}
                </span>
              </div>

              {/* Description */}
              {spot.description && (
                <>
                  <h2 className="font-display text-xl font-bold text-soulo-dark mb-3">
                    About {spot.name}
                  </h2>
                  <p className="text-soulo-grey leading-relaxed text-lg mb-8">
                    {spot.description}
                  </p>
                </>
              )}

              {/* Tags */}
              {spot.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {spot.tags.map((t) => (
                    <span
                      key={t.tag}
                      className="px-3 py-1 rounded-full bg-soulo-linen text-soulo-grey text-sm"
                    >
                      {t.tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Address */}
              {spot.address && (
                <div className="flex items-start gap-2 text-soulo-grey mb-3">
                  <span className="mt-0.5">📍</span>
                  <span>{spot.address}</span>
                </div>
              )}

              {/* Phone */}
              {spot.phone && (
                <div className="flex items-center gap-2 text-soulo-grey mb-3">
                  <span>📞</span>
                  <a href={`tel:${spot.phone}`} className="hover:text-soulo-gold transition-colors">
                    {spot.phone}
                  </a>
                </div>
              )}

              {/* Google Maps link */}
              {spot.googleMapsUrl && (
                <div className="flex items-center gap-2 mb-6">
                  <span>🗺️</span>
                  <a
                    href={spot.googleMapsUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-soulo-gold hover:text-amber-500 font-semibold text-sm transition-colors"
                  >
                    View on Google Maps & Reviews →
                  </a>
                </div>
              )}

              {/* Why it works for solo travelers — real flags from the spot record. (This used to
                  be a hard-coded "Solo-friendly spot" badge shown on every spot, flagged or not.) */}
              {(spot.comfortableAlone || spot.meetPeople || spot.priceRange) && (
                <section className="rounded-2xl border border-soulo-teal/30 bg-soulo-teal/5 p-5 mt-2">
                  <h2 className="font-display text-lg font-bold text-soulo-dark mb-3">Why it works for solo travelers</h2>
                  <ul className="space-y-2 text-sm text-soulo-grey leading-relaxed">
                    {spot.comfortableAlone && <li>✓ {aloneSentence(spot.category)}</li>}
                    {spot.meetPeople && <li>✓ Good for meeting other travelers and locals.</li>}
                    {spot.priceRange && <li>✓ {PRICE_TEXT[spot.priceRange]}.</li>}
                  </ul>
                  <p className="mt-4 text-sm flex flex-wrap gap-x-5 gap-y-1 font-semibold">
                    <Link href={`/destinations/${citySlug}/${categorySlug}`} className="text-soulo-gold hover:underline">
                      More solo-friendly {catMeta.label.toLowerCase()} in {spot.city.name} →
                    </Link>
                    <Link href={`/destinations/${citySlug}`} className="text-soulo-gold hover:underline">
                      {spot.city.name} solo travel guide →
                    </Link>
                  </p>
                </section>
              )}
            </article>

            {/* Right — sidebar */}
            <div className="lg:col-span-1 space-y-4">

              {/* Quick info card */}
              <div className="bg-soulo-linen rounded-2xl p-6 border border-soulo-border">
                <h3 className="font-display font-bold text-soulo-dark mb-4">Quick info</h3>
                <div className="space-y-3 text-sm">
                  {spot.priceRange && (
                    <div>
                      <p className="text-soulo-mist font-semibold uppercase text-xs mb-0.5">Price range</p>
                      <p className="text-soulo-dark font-bold">{PRICE_LABELS[spot.priceRange]}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-soulo-mist font-semibold uppercase text-xs mb-0.5">Category</p>
                    <p className="text-soulo-dark font-bold">{catMeta.emoji} {catMeta.label}</p>
                  </div>
                  <div>
                    <p className="text-soulo-mist font-semibold uppercase text-xs mb-0.5">City</p>
                    <p className="text-soulo-dark font-bold">{spot.city.name}</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2">
                {spot.affiliateLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full text-center px-4 py-3 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-xl transition-colors text-sm"
                  >
                    {link.label ?? AFFILIATE_LABELS[link.provider] ?? "Book Now"} →
                  </a>
                ))}
                {spot.website && (
                  <a
                    href={spot.website}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-full text-center px-4 py-3 border border-soulo-border text-soulo-grey hover:bg-soulo-linen font-medium rounded-xl transition-colors text-sm"
                  >
                    Visit Website →
                  </a>
                )}
                {spot.googleMapsUrl && (
                  <a
                    href={spot.googleMapsUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-full text-center px-4 py-3 border border-soulo-border text-soulo-grey hover:bg-soulo-linen font-medium rounded-xl transition-colors text-sm"
                  >
                    ⭐ Google Reviews →
                  </a>
                )}
              </div>

              {/* Back to city category */}
              <Link
                href={`/destinations/${citySlug}/${categorySlug}`}
                className="block text-center text-sm text-soulo-gold hover:text-amber-500 transition-colors pt-2"
              >
                ← All {catMeta.label} in {spot.city.name}
              </Link>
            </div>
          </div>

          {/* Related spots */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-soulo-border">
              <h2 className="font-display text-2xl font-bold text-soulo-dark mb-6">
                More {catMeta.label} in {spot.city.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/destinations/${citySlug}/${categorySlug}/${r.slug}`}
                    className="p-4 rounded-2xl border border-soulo-border hover:shadow-md hover:-translate-y-0.5 transition-all bg-white"
                  >
                    <p className="text-xl mb-2">{catMeta.emoji}</p>
                    <h3 className="font-display font-semibold text-soulo-dark mb-1">{r.name}</h3>
                    <p className="text-sm text-soulo-grey line-clamp-2">{r.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Internal links: same category in other cities (category pages are our top performers) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <RelatedCityCategories
            citySlug={citySlug}
            countryId={spot.city.countryId}
            region={spot.city.region}
            category={spot.category}
            categorySlug={categorySlug}
            categoryLabel={catMeta.label}
            countryName={spot.city.country.name}
          />
        </div>

        {/* Trip resources */}
        <div className="bg-soulo-linen border-t border-soulo-border py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-soulo-dark mb-6 text-center">
              Planning your trip to {spot.city.name}?
            </h2>
            <TripResources citySlug={citySlug} cityName={spot.city.name} />
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
