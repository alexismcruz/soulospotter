import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  {
    href: "/destinations",
    emoji: "🧭",
    label: "Destinations",
    desc: "Browse cities curated for solo travelers",
  },
  {
    href: "/experiences",
    emoji: "✨",
    label: "Experiences",
    desc: "Tours & activities for going it alone",
  },
  {
    href: "/resources",
    emoji: "📋",
    label: "Resources",
    desc: "Insurance, eSIMs, tours & trip prep",
  },
];

// Static — no data fetching, so this renders as a lightweight static page.
export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-soulo-white text-soulo-dark">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-xl text-center">
          {/* Compass — you took a wrong turn, but that's part of solo travel */}
          <div className="text-6xl mb-6" aria-hidden>🧭</div>

          <p className="text-soulo-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Error 404
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-soulo-dark mb-4">
            You&apos;ve wandered off the map
          </h1>
          <p className="text-soulo-grey leading-relaxed mb-8 max-w-md mx-auto">
            This page doesn&apos;t exist — maybe the city moved on, or the link took a wrong turn.
            No worries: even the best solo trips involve getting a little lost. Let&apos;s get you back on route.
          </p>

          {/* Search — native GET form, navigates to /destinations?q=… (no client JS) */}
          <form
            action="/destinations"
            method="get"
            role="search"
            className="relative max-w-md mx-auto mb-8"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-soulo-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              name="q"
              placeholder="Search cities, countries, or tags…"
              aria-label="Search destinations"
              className="w-full pl-12 pr-24 py-3 rounded-2xl border border-soulo-border bg-white text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold focus:border-transparent transition-all text-sm"
            />
            <button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 px-4 rounded-xl bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-semibold text-sm transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex flex-col gap-1 p-4 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl" aria-hidden>{l.emoji}</span>
                <span className="text-sm font-semibold text-soulo-dark">{l.label}</span>
                <span className="text-xs text-soulo-mist leading-snug">{l.desc}</span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-soulo-grey">
            Or head back to the{" "}
            <Link href="/" className="text-soulo-gold font-semibold hover:text-amber-500 underline underline-offset-2">
              homepage
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
