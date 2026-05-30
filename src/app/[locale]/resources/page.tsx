import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Solo Travel Resources — SouloSpotter",
  description:
    "Everything a solo traveler needs before departure — travel insurance, eSIMs, tours, and gear. Curated and trusted by SouloSpotter.",
};

const RESOURCES = [
  {
    href: "/resources/travel-insurance",
    emoji: "🛡️",
    title: "Travel Insurance",
    subtitle: "SafetyWing & World Nomads",
    description:
      "Solo travel means no one's got your back if things go wrong. The right insurance changes that. We compare the two best options for solo travelers.",
    cta: "Compare plans",
    highlight: "bg-blue-50 border-blue-200",
    badge: "Most important",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    href: "/resources/esims",
    emoji: "📱",
    title: "eSIMs for Travel",
    subtitle: "Stay connected anywhere",
    description:
      "No more hunting for SIM cards at airports. Airalo lets you buy a local data plan before you land — works in 200+ countries.",
    cta: "Get an eSIM",
    highlight: "bg-teal-50 border-teal-200",
    badge: "Buy before you fly",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    href: "/resources/tours",
    emoji: "🗺️",
    title: "Solo-Friendly Tours",
    subtitle: "GetYourGuide & Viator",
    description:
      "The fastest way to meet other travelers and see a city properly. Group tours, food walks, sunrise hikes — all vetted for solo travelers.",
    cta: "Browse tours",
    highlight: "bg-amber-50 border-amber-200",
    badge: "Meet other travelers",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-4">
              <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-stone-700">Resources</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">Solo Travel Resources</h1>
            <p className="mt-3 text-stone-500 text-lg max-w-2xl">
              The essential toolkit for traveling alone — safely, cheaply, and confidently. Everything here is used and trusted by the SouloSpotter team.
            </p>
          </div>
        </div>

        {/* Resource cards */}
        <div className="bg-stone-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESOURCES.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className={`group flex flex-col p-7 rounded-2xl border ${r.highlight} hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{r.emoji}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                    {r.title}
                  </h2>
                  <p className="text-sm text-stone-500 mt-0.5 mb-3">{r.subtitle}</p>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1">{r.description}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-amber-600 group-hover:text-amber-700">
                    {r.cta}
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white py-8 border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-stone-400 max-w-2xl">
              <strong className="text-stone-500">Disclosure:</strong> Some links on this page are affiliate links. If you purchase through them, SouloSpotter earns a small commission at no extra cost to you. We only recommend products we genuinely believe in and would use ourselves.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
