import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import { worldNomadsTrackingUrl } from "@/lib/affiliates";

/**
 * World Nomads affiliate page (CJ). Deliberately minimal: World Nomads' Content
 * Guidelines only allow affiliates to state that World Nomads provides travel insurance,
 * that we're an affiliate who receives a fee for quotes, and factual copy supplied by
 * them. NO comparisons with other insurers, NO "best"/"recommended"/"comprehensive",
 * NO advice on which plan to buy, and NO original insurance copy. Add their approved CJ
 * banners/text only. Both disclaimers below are mandatory and must stay on this page.
 */
export const metadata: Metadata = {
  title: "World Nomads Travel Insurance Quote",
  description: "Get a travel insurance quote from World Nomads. Affiliate disclosure and important information.",
  alternates: { canonical: "https://soulospotter.com/resources/world-nomads" },
  // Thin by design (compliance) — keep it out of search results.
  robots: { index: false, follow: true },
};

export default function WorldNomadsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 bg-soulo-white">
        <section className="bg-soulo-slate text-soulo-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="flex items-center gap-2 text-sm text-soulo-mist mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">World Nomads</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">World Nomads</h1>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <p className="text-soulo-grey leading-relaxed">World Nomads provides travel insurance.</p>

          <AffiliateCTA
            href={worldNomadsTrackingUrl()}
            label="Get a quote from World Nomads"
            sublabel="Opens World Nomads in a new tab"
            color="amber"
          />

          {/* Mandatory disclaimer #1 — wording supplied by World Nomads (welcome email), must sit near the link */}
          <p className="text-sm text-soulo-grey leading-relaxed border-l-4 border-soulo-gold pl-4">
            We receive a fee when you get a quote from World Nomads using this link. We do not represent
            World Nomads. This is not a recommendation to buy travel insurance.
          </p>

          {/* Mandatory disclaimer #2 — World Nomads Content Guidelines */}
          <p className="text-xs text-soulo-mist leading-relaxed">
            Travel insurance doesn&apos;t cover everything. All of the information we provide is a brief summary.
            It does not include all terms, conditions, limitations, exclusions and termination provisions of the
            plans described.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
