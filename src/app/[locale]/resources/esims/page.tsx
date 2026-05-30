import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import ResourceCityLinks from "@/components/resources/ResourceCityLinks";

export const metadata: Metadata = {
  title: "Best eSIM for Solo Travelers — Airalo Review (2025) — SouloSpotter",
  description:
    "Never get stranded without data again. Airalo lets you buy a local eSIM before you land — works in 200+ countries. Our honest review for solo travelers.",
};

const AIRALO_URL = "https://www.airalo.com/?referral=soulospotter"; // replace with real affiliate URL

export default function EsimsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-stone-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <nav className="flex items-center gap-2 text-sm text-teal-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">eSIMs</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-teal-300 mb-5">
                📱 Works in 200+ countries
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Stay Connected Anywhere<br />
                <span className="text-teal-300">with Airalo eSIM</span>
              </h1>
              <p className="mt-4 text-teal-100 text-lg leading-relaxed max-w-2xl">
                No more airport SIM card queues. No more roaming charges. Buy a local data plan from your phone before you even board the plane.
              </p>
              <div className="mt-6">
                <AffiliateCTA href={AIRALO_URL} label="Browse eSIM plans on Airalo" sublabel="Plans from $5 · Instant activation" color="teal" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* What is an eSIM */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">What's an eSIM and why do solo travelers love it?</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              An eSIM is a digital SIM card built into your phone. Instead of buying a physical SIM at a foreign airport (usually overpriced, sometimes sketchy), you download a local data plan directly to your phone — before you land.
            </p>
            <p className="text-stone-600 leading-relaxed">
              For solo travelers it's close to essential. Being connected from the moment you touch down means you can navigate, translate, call a taxi, and message home without scrambling for WiFi or standing in queues at arrivals.
            </p>
          </section>

          {/* Why Airalo */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-5">Why Airalo is the best option</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { emoji: "🌍", title: "200+ countries covered", body: "From Bali to Tbilisi to Siargao — wherever SouloSpotter sends you, Airalo has a plan." },
                { emoji: "💸", title: "Plans from $5", body: "A 1GB plan for a weekend in Bangkok costs less than a coffee. Competitive pricing vs. airport SIMs." },
                { emoji: "⚡", title: "Instant activation", body: "Buy on the plane, activate on landing. No queues, no shops, no language barrier." },
                { emoji: "📲", title: "Keep your home number", body: "Your eSIM runs alongside your regular SIM. You can still receive calls and texts on your real number." },
                { emoji: "🔄", title: "Switch between countries", body: "Traveling multiple countries? Buy a regional plan or switch between country plans in the app." },
                { emoji: "⭐", title: "Trusted by millions", body: "4.7 stars on Trustpilot with over 600,000 reviews. The most-used travel eSIM app in the world." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-teal-50 border border-teal-100">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-sm">{item.title}</h3>
                    <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-5">How it works in 3 steps</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { step: "1", title: "Check compatibility", body: "Most iPhones from XS onwards and Android flagships from 2020+ support eSIM. Check Airalo's compatibility list." },
                { step: "2", title: "Buy your plan", body: "Search your destination, pick a data plan (1GB to unlimited), and pay. Plans start at $5." },
                { step: "3", title: "Activate on arrival", body: "Open the Airalo app, tap activate, and you're online. Takes about 30 seconds." },
              ].map((item) => (
                <div key={item.step} className="flex-1 bg-white rounded-2xl border border-stone-200 p-5">
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular plans by destination */}
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-5">Popular plans by destination</h2>
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-left px-5 py-3 font-semibold text-stone-600">Destination</th>
                    <th className="text-left px-5 py-3 font-semibold text-stone-600">Typical plan</th>
                    <th className="text-left px-5 py-3 font-semibold text-stone-600">Starting price</th>
                    <th className="text-left px-5 py-3 font-semibold text-stone-600"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    ["🇮🇩 Bali, Indonesia",     "1GB / 7 days",  "~$4.50"],
                    ["🇹🇭 Thailand",             "3GB / 15 days", "~$8"],
                    ["🇵🇹 Portugal",             "3GB / 30 days", "~$10"],
                    ["🇯🇵 Japan",                "3GB / 30 days", "~$12"],
                    ["🇵🇭 Philippines",          "1GB / 7 days",  "~$5"],
                    ["🇬🇪 Georgia",              "3GB / 30 days", "~$9"],
                    ["🇦🇺 Australia",            "3GB / 30 days", "~$15"],
                    ["🇨🇴 Colombia",             "3GB / 30 days", "~$11"],
                  ].map(([dest, plan, price]) => (
                    <tr key={dest as string} className="hover:bg-stone-50">
                      <td className="px-5 py-3 font-medium text-stone-800">{dest}</td>
                      <td className="px-5 py-3 text-stone-600">{plan}</td>
                      <td className="px-5 py-3 text-stone-600">{price}</td>
                      <td className="px-5 py-3">
                        <a
                          href={AIRALO_URL}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                        >
                          Get plan →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom CTA */}
          <AffiliateCTA href={AIRALO_URL} label="Browse all Airalo eSIM plans" sublabel="200+ countries · Plans from $5 · Instant activation" color="teal" />

          {/* Related cities */}
          <ResourceCityLinks
            title="Where are you headed?"
            slugs={["bali", "chiang-mai", "kyoto", "siargao", "lisbon", "tbilisi", "melbourne", "medellin"]}
          />

          <p className="text-xs text-stone-400 border-t border-stone-100 pt-6">
            <strong className="text-stone-500">Affiliate disclosure:</strong> The Airalo link above is an affiliate link. SouloSpotter earns a small commission if you purchase — at no extra cost to you.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
