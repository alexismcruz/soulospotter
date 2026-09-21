import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AffiliateCTA from "@/components/resources/AffiliateCTA";
import {
  worldNomadsTrackingUrl,
  worldNomadsCopyUrl,
  WORLD_NOMADS_DISCLAIMER,
  WORLD_NOMADS_GENERAL_DISCLAIMER,
} from "@/lib/affiliates";

/**
 * World Nomads affiliate page (CJ). Deliberately minimal: World Nomads' Content
 * Guidelines only allow affiliates to state that World Nomads provides travel insurance,
 * that we're an affiliate who receives a fee for quotes, and factual copy supplied by
 * them. NO comparisons with other insurers, NO "best"/"recommended"/"comprehensive",
 * NO advice on which plan to buy, and NO original insurance copy — the two paragraphs
 * below are World Nomads' own approved "Short Copy" templates 2 and 4, verbatim.
 * Both disclaimers are mandatory and must stay on this page (see affiliates.ts).
 */
export const metadata: Metadata = {
  title: "World Nomads Travel Insurance Quote",
  description: "Get a travel insurance quote from World Nomads. Affiliate disclosure and important information.",
  alternates: { canonical: "https://soulospotter.com/resources/world-nomads" },
  // Thin by design (compliance) — keep it out of search results.
  robots: { index: false, follow: true },
};

const LINK_CLASS = "font-medium text-soulo-gold hover:underline";

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
          {/* World Nomads' approved copy (Short Copy templates 2 and 4), verbatim */}
          <div className="space-y-4 text-soulo-grey leading-relaxed">
            <p>
              <a
                href={worldNomadsCopyUrl(2)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={LINK_CLASS}
              >
                World Nomads
              </a>{" "}
              travel insurance policies offer coverage for more than 150 activities. Get a quote, make a claim, or
              buy or extend your policy while on the road.
            </p>
            <p>
              <a
                href={worldNomadsCopyUrl(4)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={LINK_CLASS}
              >
                World Nomads
              </a>{" "}
              offers simple and flexible travel insurance. Buy at home or while traveling and claim online from
              anywhere in the world.
            </p>
          </div>

          <AffiliateCTA
            href={worldNomadsTrackingUrl()}
            label="Get a quote from World Nomads"
            sublabel="Opens World Nomads in a new tab"
            color="amber"
          />

          {/* Mandatory disclaimer #1 — must sit near the links */}
          <p className="text-sm text-soulo-grey leading-relaxed border-l-4 border-soulo-gold pl-4">
            {WORLD_NOMADS_DISCLAIMER}
          </p>

          {/* Mandatory disclaimer #2 — same page as any link */}
          <p className="text-xs text-soulo-mist leading-relaxed">{WORLD_NOMADS_GENERAL_DISCLAIMER}</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
