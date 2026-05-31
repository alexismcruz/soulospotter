"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const t = useTranslations("home");
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/destinations?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-soulo-slate text-soulo-white">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #FAFAF8 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-soulo-slate via-soulo-slate to-[#0d1821]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm font-medium text-soulo-gold mb-6">
            <span>🌍</span>
            <span>21 cities · 8 regions · 63 spots</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 text-soulo-white">
            {t("heroTitle")}{" "}
            <span className="text-soulo-gold italic">{t("heroTitleHighlight")}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-soulo-mist mb-10 max-w-xl leading-relaxed">
            {t("heroSubtitle")}
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-soulo-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a city or country..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-soulo-white placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-2xl transition-colors whitespace-nowrap"
            >
              Explore
            </button>
          </form>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-soulo-mist">
            <span>Popular:</span>
            {["Bali", "Lisbon", "Chiang Mai", "Tbilisi", "Kyoto"].map((city) => (
              <button
                key={city}
                onClick={() => router.push(`/destinations?q=${city}`)}
                className="px-3 py-1 rounded-full border border-white/20 hover:border-soulo-gold hover:text-soulo-gold transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
