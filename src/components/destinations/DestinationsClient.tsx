"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Region, CostLevel } from "@prisma/client";
import { REGIONS as REGION_LIST, REGION_BY_ENUM } from "@/lib/regions";
import CityCard from "./CityCard";

const REGIONS: { value: Region | ""; label: string; emoji: string }[] = [
  { value: "", label: "All Regions", emoji: "🌍" },
  ...REGION_LIST.map((r) => ({ value: r.region, label: r.label, emoji: r.emoji })),
];

const REGION_PILLS = REGIONS; // same list, used for pill tabs

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
  imageUrl: string | null;
  country: { name: string; code: string; flagEmoji: string | null };
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
      <div className="mb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-soulo-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-soulo-border bg-white text-soulo-dark placeholder-soulo-mist focus:outline-none focus:ring-2 focus:ring-soulo-gold focus:border-transparent transition-all text-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); updateParams("", region, cost); }}
              className="absolute inset-y-0 right-3 flex items-center text-soulo-mist hover:text-soulo-grey"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Region pills */}
        <div className="flex flex-wrap gap-2">
          {REGION_PILLS.map((r) => (
            <button
              key={r.value}
              onClick={() => { setRegion(r.value); updateParams(query, r.value, cost); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                region === r.value
                  ? "bg-soulo-gold text-soulo-dark"
                  : "bg-white border border-soulo-border text-soulo-dark hover:bg-soulo-linen"
              }`}
            >
              <span>{r.emoji}</span>
              {r.label}
            </button>
          ))}

          {/* Budget filter */}
          <select
            value={cost}
            onChange={(e) => { setCost(e.target.value); updateParams(query, region, e.target.value); }}
            className="px-4 py-2 rounded-full border border-soulo-border text-sm text-soulo-dark bg-white focus:outline-none focus:ring-2 focus:ring-soulo-gold cursor-pointer font-semibold"
          >
            {COSTS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full border border-soulo-border text-sm text-soulo-grey hover:bg-soulo-linen transition-colors"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Results summary */}
      <p className="text-sm text-soulo-grey mb-6">
        {filtered.length === 0
          ? "No destinations match your filters."
          : <>Showing <strong className="text-soulo-dark">{filtered.length}</strong> {filtered.length === 1 ? "destination" : "destinations"}{hasFilters ? " matching your filters" : ""}</>
        }
      </p>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-soulo-mist">
          <p className="text-5xl mb-4">🗺️</p>
          <p className="text-lg font-medium text-soulo-grey">No destinations found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-5 py-2 rounded-xl bg-soulo-gold text-soulo-dark font-medium text-sm hover:bg-amber-400 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Grouped by region -> country -> city (all alphabetical) */}
      {filtered.length > 0 && (
        <div className="space-y-14">
          {Object.entries(byRegion)
            .filter(([, regCities]) => regCities && regCities.length > 0)
            .sort(([a], [b]) => {
              const la = REGION_BY_ENUM[a as Region]?.label ?? a;
              const lb = REGION_BY_ENUM[b as Region]?.label ?? b;
              return la.localeCompare(lb);
            })
            .map(([reg, regCities]) => {
              const regionMeta = reg ? REGION_BY_ENUM[reg as Region] : null;
              // group this region's cities by country, alphabetically
              const byCountry = Object.entries(
                regCities!.reduce((acc, city) => {
                  (acc[city.country.name] ??= []).push(city);
                  return acc;
                }, {} as Record<string, City[]>)
              )
                .map(([name, cs]) => [name, cs.slice().sort((x, y) => x.name.localeCompare(y.name))] as [string, City[]])
                .sort(([a], [b]) => a.localeCompare(b));

              return (
                <div key={reg}>
                  {/* Region heading — hidden when filtered to one region */}
                  {!region && (
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-soulo-border">
                      <span className="text-2xl">{regionMeta?.emoji}</span>
                      <h2 className="font-display text-2xl font-bold text-soulo-dark">{regionMeta?.label}</h2>
                      <span className="text-sm text-soulo-mist">{regCities!.length} {regCities!.length === 1 ? "city" : "cities"}</span>
                    </div>
                  )}
                  <div className="space-y-10">
                    {byCountry.map(([countryName, countryCities]) => (
                      <div key={countryName}>
                        <div className="flex items-center gap-2.5 mb-5">
                          <span className="text-xl">{countryCities[0].country.flagEmoji}</span>
                          <h3 className="font-display text-lg font-bold text-soulo-dark">{countryName}</h3>
                          <span className="text-xs text-soulo-mist">{countryCities.length} {countryCities.length === 1 ? "city" : "cities"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          {countryCities.map((city) => (
                            <CityCard key={city.id} city={city} />
                          ))}
                        </div>
                      </div>
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
