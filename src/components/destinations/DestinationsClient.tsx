"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Region, CostLevel } from "@prisma/client";
import CityCard from "./CityCard";

const REGIONS: { value: Region | ""; label: string; emoji: string }[] = [
  { value: "",                   label: "All Regions",          emoji: "🌍" },
  { value: "NORTH_AMERICA",      label: "North America",        emoji: "🗽" },
  { value: "LATIN_AMERICA",      label: "Latin America",        emoji: "🌿" },
  { value: "EUROPE",             label: "Europe",               emoji: "🏛️" },
  { value: "MIDDLE_EAST_AFRICA", label: "Middle East & Africa", emoji: "🏜️" },
  { value: "SOUTH_ASIA",         label: "South Asia",           emoji: "🕌" },
  { value: "SOUTHEAST_ASIA",     label: "Southeast Asia",       emoji: "🌴" },
  { value: "EAST_ASIA",          label: "East Asia",            emoji: "⛩️" },
  { value: "OCEANIA",            label: "Oceania",              emoji: "🌊" },
];

const COSTS: { value: CostLevel | ""; label: string }[] = [
  { value: "",          label: "Any Budget" },
  { value: "BUDGET",    label: "Budget ($)" },
  { value: "MID_RANGE", label: "Mid-range ($$)" },
  { value: "EXPENSIVE", label: "Expensive ($$$)" },
];

type City = {
  id: string;
  name: string;
  slug: string;
  region: Region;
  costLevel: CostLevel | null;
  safetyScore: number | null;
  description: string | null;
  country: { name: string; flagEmoji: string | null };
  tags: { tag: string }[];
  _count: { spots: number };
};

type Props = {
  cities: City[];
  initialQuery: string;
  initialRegion: string;
  initialCost: string;
};

export default function DestinationsClient({
  cities,
  initialQuery,
  initialRegion,
  initialCost,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);
  const [cost, setCost] = useState(initialCost);

  // Update URL params when filters change
  function updateParams(newQuery: string, newRegion: string, newCost: string) {
    const params = new URLSearchParams();
    if (newQuery) params.set("q", newQuery);
    if (newRegion) params.set("region", newRegion);
    if (newCost) params.set("cost", newCost);
    const search = params.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    return cities.filter((city) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        city.name.toLowerCase().includes(q) ||
        city.country.name.toLowerCase().includes(q) ||
        city.tags.some((t) => t.tag.toLowerCase().includes(q));
      const matchesRegion = !region || city.region === region;
      const matchesCost = !cost || city.costLevel === cost;
      return matchesQuery && matchesRegion && matchesCost;
    });
  }, [cities, query, region, cost]);

  // Group filtered cities by region for display
  const byRegion = useMemo(() => {
    if (region) return { [region]: filtered };
    const groups: Partial<Record<Region, City[]>> = {};
    for (const city of filtered) {
      if (!groups[city.region]) groups[city.region] = [];
      groups[city.region]!.push(city);
    }
    return groups;
  }, [filtered, region]);

  const hasFilters = query || region || cost;

  function clearFilters() {
    setQuery("");
    setRegion("");
    setCost("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      {/* Search + filters */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateParams(e.target.value, region, cost);
            }}
            placeholder="Search cities, countries, or tags..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); updateParams("", region, cost); }}
              className="absolute inset-y-0 right-3 flex items-center text-stone-400 hover:text-stone-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-3">
          {/* Region select */}
          <select
            value={region}
            onChange={(e) => { setRegion(e.target.value); updateParams(query, e.target.value, cost); }}
            className="flex-1 min-w-[160px] px-3 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.emoji} {r.label}
              </option>
            ))}
          </select>

          {/* Cost select */}
          <select
            value={cost}
            onChange={(e) => { setCost(e.target.value); updateParams(query, region, e.target.value); }}
            className="flex-1 min-w-[160px] px-3 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            {COSTS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results summary */}
      <p className="text-sm text-stone-500 mb-6">
        {filtered.length === 0
          ? "No destinations match your filters."
          : <>Showing <strong className="text-stone-800">{filtered.length}</strong> {filtered.length === 1 ? "destination" : "destinations"}{hasFilters ? " matching your filters" : ""}</>
        }
      </p>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          <p className="text-5xl mb-4">🗺️</p>
          <p className="text-lg font-medium text-stone-600">No destinations found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-5 py-2 rounded-xl bg-amber-500 text-stone-900 font-medium text-sm hover:bg-amber-400 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Grouped by region */}
      {filtered.length > 0 && (
        <div className="space-y-12">
          {Object.entries(byRegion).map(([reg, regCities]) => {
            if (!regCities || regCities.length === 0) return null;
            const regionMeta = REGIONS.find((r) => r.value === reg);
            return (
              <div key={reg}>
                {/* Region heading — only show when not filtered to one region */}
                {!region && (
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{regionMeta?.emoji}</span>
                    <h2 className="text-lg font-bold text-stone-800">{regionMeta?.label}</h2>
                    <span className="text-sm text-stone-400">{regCities.length} {regCities.length === 1 ? "city" : "cities"}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {regCities.map((city) => (
                    <CityCard key={city.id} city={city} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
