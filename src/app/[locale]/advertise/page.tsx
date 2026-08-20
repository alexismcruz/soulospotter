import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageHero from "@/components/layout/PageHero";
import AdvertiseForm from "@/components/advertise/AdvertiseForm";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  // Brand is structural in this title — use `absolute` to keep it appearing once.
  title: { absolute: "Advertise with SouloSpotter — Reach Travelers Worldwide" },
  description:
    "Put your business in front of thousands of solo travelers. Featured listings, city spotlights, and homepage placements — transparent pricing, no hidden fees.",
  alternates: { canonical: "https://soulospotter.com/advertise" },
  openGraph: {
    title: "Advertise with SouloSpotter",
    description: "Reach thousands of solo travelers. Featured listings and city spotlights.",
  },
};

const TIERS = [
  {
    id: "featured",
    name: "Featured Listing",
    price: "$29",
    period: "/month",
    badge: null,
    description: "Your spot stands out on the city page with a Featured badge and priority placement above standard listings.",
    includes: [
      "Featured badge on your listing card",
      "Priority placement — top of category",
      "Bold card styling that catches the eye",
      "Your website link prominently displayed",
      "Included in city page meta description",
      "Cancel anytime",
    ],
    cta: "Get started",
    color: "border-stone-200",
    btnColor: "bg-stone-900 hover:bg-stone-700 text-white",
  },
  {
    id: "spotlight",
    name: "City Spotlight",
    price: "$79",
    period: "/month",
    badge: "Most popular",
    description: "Your business is featured at the top of a city page with a dedicated spotlight section — the first thing every visitor sees.",
    includes: [
      "Everything in Featured Listing",
      "Dedicated spotlight section at top of city page",
      '"Recommended by SouloSpotter" badge',
      "Custom description up to 200 words",
      "Photo displayed on city page",
      "Linked from the region page",
      "Monthly performance report",
    ],
    cta: "Get the spotlight",
    color: "border-amber-400 ring-2 ring-amber-400",
    btnColor: "bg-amber-500 hover:bg-amber-400 text-stone-900",
  },
  {
    id: "homepage",
    name: "Homepage Feature",
    price: "$149",
    period: "/month",
    badge: "Maximum reach",
    description: "Your destination or business featured in the SouloSpotter homepage — seen by every visitor from every country.",
    includes: [
      "Everything in City Spotlight",
      "Featured card on the homepage",
      "Placement in 'Featured Destinations' section",
      "Included in our social media rotation",
      "Featured in our next newsletter send",
      "Dedicated blog post (quarterly)",
      "Priority support",
      "Monthly analytics report",
    ],
    cta: "Get homepage reach",
    color: "border-stone-200",
    btnColor: "bg-stone-900 hover:bg-stone-700 text-white",
  },
];

export default async function AdvertisePage() {
  const [cityCount, spotCount, regionRows] = await Promise.all([
    prisma.city.count({ where: { published: true } }),
    prisma.spot.count({ where: { published: true } }),
    prisma.city.groupBy({ by: ["region"], where: { published: true }, _count: { id: true } }),
  ]);
  const regionCount = regionRows.length;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero */}
        <PageHero imageKey="advertise" imageAlt="Reach solo travelers worldwide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Advertise</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-amber-300 mb-5">
                🌍 Reaching solo travelers in {cityCount} cities across {regionCount} regions
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-soulo-white">
                Advertise with<br />
                <span className="text-amber-400">SouloSpotter</span>
              </h1>
              <p className="text-stone-300 text-lg leading-relaxed max-w-2xl">
                SouloSpotter connects solo travelers to the best spots in every city. If your business — hostel, café, coworking space, tour, or retreat — serves solo travelers, this is your audience.
              </p>
            </div>

            {/* Trust stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: String(cityCount),       label: "Cities covered" },
                { value: String(regionCount),      label: "Global regions" },
                { value: `${spotCount}+`,          label: "Curated spots" },
                { value: "100%",                   label: "Solo travel focus" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-amber-400">{s.value}</p>
                  <p className="text-sm text-stone-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageHero>

        {/* Who it's for */}
        <div className="bg-stone-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">Who advertises on SouloSpotter?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { emoji: "🏨", label: "Hostels & guesthouses" },
                { emoji: "☕", label: "Cafés & coworking" },
                { emoji: "🧘", label: "Wellness & retreats" },
                { emoji: "🗺️", label: "Tour operators" },
                { emoji: "🏄", label: "Activity providers" },
                { emoji: "🏡", label: "Boutique hotels" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-stone-200">
                  <span className="text-3xl mb-2">{item.emoji}</span>
                  <p className="text-xs font-medium text-stone-700 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Transparent pricing. No surprises.</h2>
              <p className="mt-3 text-stone-500 max-w-xl mx-auto">
                Every plan is month-to-month. Cancel anytime. No long-term contracts, no setup fees, no hidden charges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier) => (
                <div key={tier.id} className={`relative rounded-2xl border-2 ${tier.color} bg-white flex flex-col overflow-hidden`}>
                  {tier.badge && (
                    <div className="bg-amber-500 text-stone-900 text-xs font-bold text-center py-2">
                      ⭐ {tier.badge}
                    </div>
                  )}
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="mb-5">
                      <h3 className="text-xl font-bold text-stone-900">{tier.name}</h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-stone-900">{tier.price}</span>
                        <span className="text-stone-500 text-sm">{tier.period}</span>
                      </div>
                      <p className="mt-3 text-sm text-stone-600 leading-relaxed">{tier.description}</p>
                    </div>

                    <ul className="space-y-2.5 flex-1 mb-7">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#inquiry-form"
                      className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors ${tier.btnColor}`}
                    >
                      {tier.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-stone-400 mt-8">
              All prices in USD. Billed monthly. Cancel anytime with no penalty.
            </p>
          </div>
        </div>

        {/* What you get visually */}
        <div className="bg-stone-50 py-14 border-t border-stone-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">What does a Featured listing look like?</h2>
            <div className="bg-white rounded-2xl border-2 border-amber-400 overflow-hidden shadow-lg">
              <div className="bg-amber-500 px-5 py-2 flex items-center gap-2">
                <span className="text-sm font-bold text-stone-900">⭐ Featured</span>
                <span className="text-xs text-stone-700">· Sponsored</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">☕</span>
                    <div>
                      <h3 className="font-bold text-stone-900">Your Business Name</h3>
                      <p className="text-xs text-stone-400">Café · Coworking</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">$$</span>
                </div>
                <p className="mt-3 text-sm text-stone-600">Your description — up to 200 words telling solo travelers exactly why your spot is worth visiting. Written by you, approved by us.</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["wifi", "laptop-friendly", "specialty-coffee"].map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-amber-500 text-stone-900">Visit Website →</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-stone-400 mt-4">Example of how a Featured listing appears on a city page</p>

            {/* Reconciles the homepage "never pay-to-rank" promise with paid placements */}
            <p className="max-w-2xl mx-auto text-center text-sm text-stone-500 mt-6 leading-relaxed">
              <strong className="text-stone-700">How this fits our &ldquo;no pay-to-rank&rdquo; promise:</strong>{" "}
              Featured listings are always clearly labeled <em>Sponsored</em> and sit in their own promoted slot. They never change how our free, editorial listings rank against each other — we don&apos;t sell organic ranking. Paying only buys a labeled, more prominent placement, never a better editorial position.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white py-14 border-t border-stone-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Common questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How quickly will my listing go live?",
                  a: "Within 48 hours of payment confirmation. We review every listing to make sure it meets our quality standards before it goes live."
                },
                {
                  q: "Can I list a business in a city not currently on SouloSpotter?",
                  a: "Yes. If you purchase a listing for a city we don't cover yet, we'll add that city to the directory as part of your package."
                },
                {
                  q: "What if I want to cancel?",
                  a: "Cancel anytime with no penalty. Your listing stays live until the end of the billing month."
                },
                {
                  q: "Do you offer discounts for multiple listings?",
                  a: "Yes — if you have multiple locations across different cities, contact us for a multi-listing rate."
                },
                {
                  q: "Is this the same as submitting a free listing?",
                  a: "No. Free submissions are reviewed and may or may not be approved — and if approved, they appear as standard listings. Paid listings are guaranteed live within 48 hours, with Featured badge and priority placement."
                },
              ].map((item) => (
                <div key={item.q} className="border-b border-stone-100 pb-6">
                  <h3 className="font-semibold text-stone-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry form */}
        <div id="inquiry-form" className="bg-stone-50 py-16 border-t border-stone-100">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900">Get started today</h2>
              <p className="mt-2 text-stone-500 text-sm">
                Fill in the form and we'll be in touch within 24 hours to get your listing live.
              </p>
            </div>
            <AdvertiseForm />
          </div>
        </div>

      </main>
      <SiteFooter />
    </div>
  );
}
