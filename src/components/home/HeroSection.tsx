"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&auto=format&fit=crop",
    alt: "Solo traveler overlooking mountains",
    label: "🏔️ Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85&auto=format&fit=crop",
    alt: "Vibrant city nightlife",
    label: "🌙 Nightlife",
  },
  {
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&auto=format&fit=crop",
    alt: "Open road road trip",
    label: "🚗 Road Trips",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop",
    alt: "Coworking space for nomads",
    label: "💻 Coworking",
  },
];

export default function HeroSection() {
  const t = useTranslations("home");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/destinations?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-soulo-slate text-soulo-white">
      {/* Carousel slides — crossfade */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.url}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
        {/* Gradient overlay — text stays readable on all photos */}
        <div className="absolute inset-0 bg-gradient-to-b from-soulo-slate/65 via-soulo-slate/55 to-soulo-slate" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 lg:py-56">
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

        {/* Slide indicators + current label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          {/* Current slide label */}
          <span className="text-xs font-semibold text-soulo-gold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            {SLIDES[current].label}
          </span>
          {/* Dot indicators */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-soulo-gold w-6 h-2"
                    : "bg-white/40 hover:bg-white/70 w-2 h-2"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
