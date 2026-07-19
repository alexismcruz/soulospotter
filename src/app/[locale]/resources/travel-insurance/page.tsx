import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageHero from "@/components/layout/PageHero";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import ResourceCityLinks from "@/components/resources/ResourceCityLinks";
import { safetyWingUrl, worldNomadsUrl } from "@/lib/affiliates";

// Revalidate daily so the dynamic year (below) refreshes without a redeploy.
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  return {
    title: `Best Travel Insurance for Solo Travelers (${year})`,
    description:
      "SafetyWing vs World Nomads — an honest comparison for solo travelers. Which travel insurance is right for your trip? We break down cost, coverage, and claims.",
    alternates: { canonical: "https://soulospotter.com/resources/travel-insurance" },
    openGraph: {
      title: `Best Travel Insurance for Solo Travelers (${year})`,
      description: "SafetyWing vs World Nomads — an honest comparison for solo travelers.",
    },
  };
}

const SAFETYWING_URL = safetyWingUrl();
const WORLD_NOMADS_URL = worldNomadsUrl(); // ⚠️ placeholder — see lib/affiliates.ts

export default function TravelInsurancePage() {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <PageHero imageKey="travel-insurance" imageAlt="Travel insurance for solo travelers">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="flex items-center gap-2 text-sm text-blue-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">Travel Insurance</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-5">
                🛡️ Updated for {year}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-soulo-white">
                Travel Insurance for<br />
                <span className="text-blue-300">Solo Travelers</span>
              </h1>
              <p className="mt-4 text-blue-100 text-lg leading-relaxed max-w-2xl">
                When you travel alone, there's no one to help if things go wrong. The right insurance is the difference between a bad day and a financial disaster. Here's what actually works.
              </p>
            </div>
          </div>
        </PageHero>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* Why solo travelers need insurance */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Why solo travelers need it more than anyone</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { emoji: "🏥", title: "Medical emergencies", body: "A broken leg in Bali or appendicitis in Tokyo can cost $10,000–$50,000 without insurance. Evacuation alone can exceed $100,000." },
                { emoji: "✈️", title: "Trip cancellation", body: "Flights get cancelled, visas get rejected, family emergencies happen. Without coverage you eat the full cost alone." },
                { emoji: "📱", title: "Theft & loss", body: "Solo travelers carry everything with them — laptop, camera, passport. One bag snatch without insurance is a trip-ending event." },
              ].map((item) => (
                <div key={item.title} className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-semibold text-stone-900 mt-2 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The two options */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">The two best options for solo travelers</h2>
            <div className="space-y-6">

              {/* SafetyWing */}
              <div className="rounded-2xl border-2 border-blue-200 bg-white overflow-hidden">
                <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">SafetyWing</span>
                    <span className="ml-3 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Best for long-term travelers</span>
                  </div>
                  <span className="text-2xl">🌐</span>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">Pros</h4>
                      <ul className="space-y-1.5 text-sm text-stone-700">
                        {["Subscription-based — pay monthly, cancel anytime", "Covers you in your home country for 30 days per 90", "Cheapest option at ~$45/month", "Covers Covid-19 treatment", "Can buy after you've already left home"].map((p) => (
                          <li key={p} className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">Cons</h4>
                      <ul className="space-y-1.5 text-sm text-stone-700">
                        {["Lower coverage limits than World Nomads", "No trip cancellation cover", "Deductible of $250 per claim", "Not available for US residents in the US"].map((p) => (
                          <li key={p} className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 mb-5">
                    <strong>Best for:</strong> Digital nomads, gap year travelers, anyone going slow for 3+ months across multiple countries.
                  </div>
                  <AffiliateCTA
                    href={SAFETYWING_URL}
                    label="Get a SafetyWing quote"
                    sublabel="From ~$45/month · Instant coverage"
                    color="blue"
                  />
                </div>
              </div>

              {/* World Nomads */}
              <div className="rounded-2xl border-2 border-amber-200 bg-white overflow-hidden">
                <div className="bg-amber-500 px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">World Nomads</span>
                    <span className="ml-3 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Best for adventure activities</span>
                  </div>
                  <span className="text-2xl">🏔️</span>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">Pros</h4>
                      <ul className="space-y-1.5 text-sm text-stone-700">
                        {["Covers 200+ adventure activities (surfing, hiking, diving)", "Trip cancellation and interruption cover", "Higher medical limits", "24/7 emergency assistance line", "Trusted by Lonely Planet"].map((p) => (
                          <li key={p} className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">Cons</h4>
                      <ul className="space-y-1.5 text-sm text-stone-700">
                        {["More expensive (~$100–$200/month)", "Must buy before departure", "Fixed trip duration only", "Age limits apply (66+ surcharge)"].map((p) => (
                          <li key={p} className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 mb-5">
                    <strong>Best for:</strong> Short trips (1–4 weeks), adventure travelers, anyone doing activities SafetyWing won't cover.
                  </div>
                  <AffiliateCTA
                    href={WORLD_NOMADS_URL}
                    label="Get a World Nomads quote"
                    sublabel="Covers 200+ adventure activities"
                    color="amber"
                    sponsored={false} /* not an affiliate — see lib/affiliates.ts */
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-5">Quick comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-left px-5 py-3 font-semibold text-stone-600">Feature</th>
                    <th className="text-center px-5 py-3 font-semibold text-blue-700">SafetyWing</th>
                    <th className="text-center px-5 py-3 font-semibold text-amber-700">World Nomads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    ["Monthly cost",         "~$45",        "~$100–200"],
                    ["Medical coverage",     "$250,000",    "$5,000,000"],
                    ["Trip cancellation",    "✗",           "✓"],
                    ["Adventure sports",     "Basic only",  "200+ activities"],
                    ["Buy after departure",  "✓",           "✗"],
                    ["Cancel anytime",       "✓",           "✗"],
                    ["Best for",            "Long stays",   "Short trips"],
                  ].map(([feature, sw, wn]) => (
                    <tr key={feature} className="hover:bg-stone-50">
                      <td className="px-5 py-3 font-medium text-stone-700">{feature}</td>
                      <td className="px-5 py-3 text-center text-stone-600">{sw}</td>
                      <td className="px-5 py-3 text-center text-stone-600">{wn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom CTAs */}
          <section className="grid sm:grid-cols-2 gap-4">
            <AffiliateCTA href={SAFETYWING_URL} label="Get SafetyWing" sublabel="Best for long trips" color="blue" />
            <AffiliateCTA href={WORLD_NOMADS_URL} label="Get World Nomads" sublabel="Best for adventure" color="amber" sponsored={false} />
          </section>

          {/* Related cities */}
          <ResourceCityLinks
            title="Planning a trip? Start here"
            slugs={["bali", "chiang-mai", "lisbon", "tbilisi", "siargao", "rishikesh", "queenstown", "marrakech"]}
          />

          {/* Disclaimer */}
          <p className="text-xs text-stone-400 border-t border-stone-100 pt-6">
            <strong className="text-stone-500">Affiliate disclosure:</strong> Our SafetyWing link is an affiliate link — SouloSpotter earns a commission if you purchase, at no extra cost to you. Our World Nomads link is <strong className="text-stone-500">not</strong> an affiliate link and earns us nothing; it&apos;s here purely because it&apos;s the better choice for some trips. We only recommend products we genuinely trust.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
