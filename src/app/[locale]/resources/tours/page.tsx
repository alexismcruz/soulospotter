import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageHero from "@/components/layout/PageHero";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import ResourceCityLinks from "@/components/resources/ResourceCityLinks";
import { gygHomeUrl } from "@/lib/affiliates";

export const metadata: Metadata = {
  title: "Best Tours for Solo Travelers (2025)",
  description:
    "Group tours are the fastest way to meet other travelers and see a city properly. Our picks from GetYourGuide — curated for solo travelers across every region.",
  alternates: { canonical: "https://soulospotter.com/resources/tours" },
  openGraph: {
    title: "Best Tours for Solo Travelers (2025)",
    description: "Group tours, food walks, sunrise hikes — curated for solo travelers worldwide.",
  },
};

const GYG_URL = gygHomeUrl();

const TOUR_PICKS = [
  {
    city: "Chiang Mai",
    slug: "chiang-mai",
    emoji: "🏯",
    tour: "Doi Suthep Temple & City Highlights Tour",
    why: "Shared minibus, small group, instant friendships on the mountain road up.",
    duration: "Half day",
    price: "From $25",
  },
  {
    city: "Lisbon",
    slug: "lisbon",
    emoji: "🛤️",
    tour: "Lisbon by Tuk Tuk — Alfama & Viewpoints",
    why: "Three or four strangers sharing a tuk tuk through the most beautiful neighbourhood in Europe.",
    duration: "2 hours",
    price: "From $20",
  },
  {
    city: "Bali",
    slug: "bali",
    emoji: "🌋",
    tour: "Mount Batur Sunrise Hike",
    why: "Nothing bonds solo travelers like a 2am start and watching sunrise over a volcano together.",
    duration: "Full day",
    price: "From $35",
  },
  {
    city: "Tbilisi",
    slug: "tbilisi",
    emoji: "🍷",
    tour: "Georgian Wine & Khachapuri Food Tour",
    why: "Food tours are the single best solo activity in any city. Tbilisi's is extraordinary.",
    duration: "3 hours",
    price: "From $30",
  },
  {
    city: "Kyoto",
    slug: "kyoto",
    emoji: "⛩️",
    tour: "Fushimi Inari Early Morning Walking Tour",
    why: "Beat the crowds with a small group and a local guide who knows which gates to stop at.",
    duration: "3 hours",
    price: "From $40",
  },
  {
    city: "Marrakech",
    slug: "marrakech",
    emoji: "🏮",
    tour: "Medina Street Food Tour",
    why: "Essential for solo travelers — navigating the medina alone on the first night is intimidating. With a guide, it's magical.",
    duration: "3 hours",
    price: "From $35",
  },
];

export default function ToursPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <PageHero imageKey="tours" imageAlt="Group tours for solo travelers">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="flex items-center gap-2 text-sm text-amber-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">Tours</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-amber-300 mb-5">
                🗺️ Curated for solo travelers
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-soulo-white">
                Group Tours for<br />
                <span className="text-amber-300">Solo Travelers</span>
              </h1>
              <p className="mt-4 text-amber-100 text-lg leading-relaxed max-w-2xl">
                A good group tour is the fastest way to see a new city properly — and meet other travelers doing the same thing. These are our picks, by city.
              </p>
            </div>
          </div>
        </PageHero>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* Why tours work for solo travelers */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-5">Why solo travelers love group tours</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { emoji: "🤝", title: "Instant community", body: "A shared 3-hour experience creates more genuine connections than a week in a hostel common room." },
                { emoji: "🗝️", title: "Local access", body: "Good guides take you places you'd never find alone and tell you stories Google can't." },
                { emoji: "🛡️", title: "Safety in numbers", body: "In unfamiliar cities, a guided tour is smart on day one — you learn the geography and what to avoid." },
              ].map((item) => (
                <div key={item.title} className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-semibold text-stone-900 mt-2 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Handpicked tours */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Our picks by city</h2>
            <div className="space-y-4">
              {TOUR_PICKS.map((pick) => (
                <div
                  key={pick.city}
                  className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl flex-shrink-0 sm:w-12 text-center">{pick.emoji}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Link
                        href={`/destinations/${pick.slug}`}
                        className="text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        {pick.city}
                      </Link>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-500">{pick.duration}</span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs font-medium text-green-600">{pick.price}</span>
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-1">{pick.tour}</h3>
                    <p className="text-sm text-stone-500 italic">"{pick.why}"</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <a
                      href={GYG_URL}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                    >
                      Book on GYG →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Browse all CTA */}
          <section className="bg-amber-50 rounded-2xl p-7 border border-amber-200 text-center">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Find tours in any city</h2>
            <p className="text-stone-600 text-sm mb-5">
              GetYourGuide has 300,000+ experiences in 170+ countries — filtered, reviewed, and bookable in minutes.
            </p>
            <AffiliateCTA href={GYG_URL} label="Browse all tours on GetYourGuide" sublabel="300,000+ experiences · Free cancellation on most" color="amber" />
          </section>

          {/* Related cities */}
          <ResourceCityLinks
            title="Explore these destinations"
            slugs={["chiang-mai", "lisbon", "bali", "tbilisi", "kyoto", "marrakech", "barcelona", "berlin"]}
          />

          <p className="text-xs text-stone-400 border-t border-stone-100 pt-6">
            <strong className="text-stone-500">Affiliate disclosure:</strong> GetYourGuide links are affiliate links. SouloSpotter earns a commission if you book — at no extra cost to you.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
