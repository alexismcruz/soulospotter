"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ExperienceCategory } from "@prisma/client";
import ExperienceCard from "./ExperienceCard";

interface Experience {
  id: string;
  slug: string;
  name: string;
  city: {
    slug: string;
    name: string;
    country: { code: string; name: string; flagEmoji?: string };
  };
  category: ExperienceCategory;
  price: number;
  groupSizeMin: number;
  groupSizeMax: number;
  duration: string;
  photoUrl?: string;
  isFeatured: boolean;
}

interface ExperienceFiltersClientProps {
  experiences: Experience[];
  cities: { slug: string; name: string; count: number }[];
}

const CATEGORY_DISPLAY: Record<ExperienceCategory, { label: string; icon: string }> = {
  OUTDOOR_ADVENTURE:   { label: "Outdoor & Adventure", icon: "🥾" },
  FOOD_DRINK:          { label: "Food & Drink",         icon: "🍜" },
  ARTS_CULTURE:        { label: "Arts & Culture",       icon: "🎨" },
  WELLNESS_MINDFULNESS:{ label: "Wellness & Mindfulness",icon: "🧘" },
  NIGHTLIFE_SOCIAL:    { label: "Nightlife & Social",   icon: "🌙" },
  DAY_TRIPS:           { label: "Day Trips",            icon: "🚌" },
  PHOTOGRAPHY_WALKS:   { label: "Photography Walks",    icon: "📸" },
  FITNESS_SPORTS:      { label: "Fitness & Sports",     icon: "🥊" },
};

export default function ExperienceFiltersClient({
  experiences,
  cities,
}: ExperienceFiltersClientProps) {
  const searchParams = useSearchParams();
  // Pre-select a city when arriving from a destination page (?city=<slug>),
  // but only if that slug actually has experiences.
  const cityParam = searchParams.get("city");
  const initialCity =
    cityParam && cities.some((c) => c.slug === cityParam) ? cityParam : null;
  const [selectedCity, setSelectedCity] = useState<string | null>(initialCity);
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | null>(null);

  // Filter experiences
  const filtered = useMemo(() => {
    return experiences.filter((exp) => {
      if (selectedCity && exp.city.slug !== selectedCity) return false;
      if (selectedCategory && exp.category !== selectedCategory) return false;
      return true;
    });
  }, [experiences, selectedCity, selectedCategory]);

  // Available categories in current filtered set
  const availableCategories = useMemo(() => {
    return Array.from(new Set(filtered.map((e) => e.category))).sort();
  }, [filtered]);

  // Sort: featured first
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
  }, [filtered]);

  // Group by country → city (only when no city filter is active)
  const grouped = useMemo(() => {
    if (selectedCity) return null; // flat grid when a single city is selected

    // Build: countryName → { meta, cities: cityName → Experience[] }
    const map = new Map<string, { flagEmoji?: string; cities: Map<string, Experience[]> }>();

    for (const exp of sorted) {
      const cn = exp.city.country.name;
      if (!map.has(cn)) map.set(cn, { flagEmoji: exp.city.country.flagEmoji, cities: new Map() });
      const country = map.get(cn)!;
      if (!country.cities.has(exp.city.name)) country.cities.set(exp.city.name, []);
      country.cities.get(exp.city.name)!.push(exp);
    }

    // Sort countries A→Z, cities A→Z within each country
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([countryName, { flagEmoji, cities: cityMap }]) => ({
        countryName,
        flagEmoji,
        cities: Array.from(cityMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([cityName, exps]) => ({ cityName, exps })),
      }));
  }, [sorted, selectedCity]);

  const selectedCityName = cities.find((c) => c.slug === selectedCity)?.name;

  function clearFilters() {
    setSelectedCity(null);
    setSelectedCategory(null);
  }

  return (
    <>
      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-soulo-border bg-soulo-white">
        {/* City Filter */}
        <div className="mb-6">
          <label className="block text-xs text-soulo-mist uppercase font-semibold mb-2">
            Filter by City
          </label>
          <select
            value={selectedCity || ""}
            onChange={(e) => {
              setSelectedCity(e.target.value || null);
              setSelectedCategory(null);
            }}
            className="w-full sm:w-64 px-4 py-2.5 border border-soulo-border rounded-xl text-soulo-dark focus:ring-2 focus:ring-soulo-gold focus:outline-none"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name} ({city.count})
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter Tabs */}
        {availableCategories.length > 0 && (
          <div>
            <p className="text-xs text-soulo-mist uppercase font-semibold mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === null
                    ? "bg-soulo-gold text-soulo-dark"
                    : "bg-soulo-linen text-soulo-dark hover:bg-soulo-border"
                }`}
              >
                All Categories
              </button>
              {availableCategories.map((cat) => {
                const info = CATEGORY_DISPLAY[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1 ${
                      selectedCategory === cat
                        ? "bg-soulo-gold text-soulo-dark"
                        : "bg-soulo-linen text-soulo-dark hover:bg-soulo-border"
                    }`}
                  >
                    <span>{info.icon}</span>
                    {info.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-soulo-dark">
            {selectedCityName ? `Experiences in ${selectedCityName}` : "All Experiences"}
          </h2>
          <p className="text-soulo-grey mt-1">
            {sorted.length} experience{sorted.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-soulo-grey text-lg">No experiences found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>

        ) : grouped ? (
          /* ── Grouped by Country → City ── */
          <div className="space-y-16">
            {grouped.map(({ countryName, flagEmoji, cities: groupCities }) => (
              <div key={countryName}>
                {/* Country heading */}
                <div className="flex items-center gap-3 mb-8 pb-3 border-b border-soulo-border">
                  {flagEmoji && <span className="text-2xl">{flagEmoji}</span>}
                  <h3 className="font-display text-2xl font-bold text-soulo-dark">{countryName}</h3>
                  <span className="text-sm text-soulo-mist">
                    {groupCities.reduce((n, c) => n + c.exps.length, 0)} experiences
                  </span>
                </div>

                {/* Cities within country */}
                <div className="space-y-12">
                  {groupCities.map(({ cityName, exps }) => (
                    <div key={cityName}>
                      {/* City sub-heading */}
                      <div className="flex items-center gap-2 mb-5">
                        <h4 className="font-display text-lg font-bold text-soulo-dark">{cityName}</h4>
                        <span className="text-xs text-soulo-mist">
                          {exps.length} experience{exps.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exps.map((exp) => (
                          <ExperienceCard key={exp.id} {...exp} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        ) : (
          /* ── Flat grid (single city selected) ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
