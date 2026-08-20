"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

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
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=85&auto=format&fit=crop",
    alt: "Solo traveler meditating at sunrise",
    label: "🧘 Wellness",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop",
    alt: "Coworking space for nomads",
    label: "💻 Coworking",
  },
];

const POPULAR = ["Lisbon", "Bali", "Medellín", "Chiang Mai", "Cape Town", "Tbilisi"];

const TRUST_STATS = [
  { value: "Solo-first", label: "Every spot curated for solo travelers" },
  { value: "No ads", label: "Organic results, never pay-to-rank" },
  { value: "Free", label: "Always free to browse" },
];

type SearchResult = {
  name: string;
  slug: string;
  country: { name: string; code: string };
  region: string;
};

interface HeroSectionProps {
  cityCount: number;
  spotCount: number;
  regionCount: number;
}

export default function HeroSection({ cityCount, spotCount, regionCount }: HeroSectionProps) {
  const t = useTranslations("home");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Autocomplete fetch with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) { setResults([]); setIsOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data: SearchResult[] = await res.json();
      setResults(data);
      setIsOpen(data.length > 0);
      setActiveIndex(-1);
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/destinations/${slug}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      navigate(results[activeIndex].slug);
    } else if (query.trim()) {
      setIsOpen(false);
      router.push(`/destinations?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, -1)); }
    if (e.key === "Escape")    { setIsOpen(false); }
  };

  return (
    <section className="relative overflow-hidden bg-soulo-slate text-soulo-white">
      {/* Carousel slides */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div key={slide.url} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
            <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-soulo-slate/65 via-soulo-slate/55 to-soulo-slate" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 lg:py-56">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm font-medium text-soulo-gold mb-6">
            <span>🌍</span>
            <span>{cityCount} cities · {regionCount} regions · {spotCount} spots</span>
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

          {/* Search with autocomplete */}
          <div ref={wrapperRef} className="max-w-lg">
            <form onSubmit={handleSearch} className="flex gap-3">
              {/* Input — dropdown is anchored to this element */}
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
                  onKeyDown={handleKeyDown}
                  onFocus={() => results.length > 0 && setIsOpen(true)}
                  placeholder="Search a city or country..."
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-soulo-white placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold focus:border-transparent transition-all"
                />

                {/* Dropdown anchored to input width — left-0 right-0 = matches input exactly */}
                {isOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-soulo-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {results.map((city, i) => (
                      <button
                        key={city.slug}
                        type="button"
                        onMouseDown={() => navigate(city.slug)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          i === activeIndex ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                      >
                        <svg className="w-4 h-4 text-soulo-mist flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-soulo-white">{city.name}</span>
                          <span className="text-xs text-soulo-mist ml-2">{city.country.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-2xl transition-colors whitespace-nowrap"
              >
                Explore
              </button>
            </form>
          </div>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-soulo-mist">
            <span>Popular:</span>
            {POPULAR.map((city) => (
              <button
                key={city}
                onClick={() => router.push(`/destinations?q=${city}`)}
                className="px-3 py-1 rounded-full border border-white/20 hover:border-soulo-gold hover:text-soulo-gold transition-colors"
              >
                {city}
              </button>
            ))}
          </div>

          {/* Trust bar — stacks vertically on mobile, horizontal from sm up */}
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-8">
            {TRUST_STATS.map((s) => (
              <div key={s.value} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-soulo-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-sm text-soulo-mist">
                  <strong className="text-soulo-white">{s.value}</strong>
                  <span className="hidden sm:inline"> · {s.label}</span>
                  <span className="sm:hidden text-soulo-mist/70"> · {s.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs font-semibold text-soulo-gold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            {SLIDES[current].label}
          </span>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "bg-soulo-gold w-6 h-2" : "bg-white/40 hover:bg-white/70 w-2 h-2"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
