"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Region, CostLevel, SoloLevel } from "@prisma/client";
import { REGIONS as REGION_LIST } from "@/lib/regions";
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
  soloLevel: SoloLevel | null;
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
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);
  const [cost, setCost] = useState(initialCost);

  // Keep filters in sync with the URL (e.g. when navigating from the
  // Destinations dropdown to /destinations?region=EUROPE while already mounted).
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setRegion(searchParams.get("region") ?? "");
    setCost(searchParams.get("cost") ?? "");
  }, [searchParams]);

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

  // Paginate so the DOM only ever holds one page of cards, not all ~321.
  const PAGE_SIZE = 24;
  const [page, setPage] = useState(1);

  // Any change to the filter set resets to the first page.
  useEffect(() => {
    setPage(1);
  }, [query, region, cost]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  );

  function goToPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages));
    // Jump back up to the results heading so the new page starts at the top.
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  // Windowed page numbers: 1 … (cur-1) cur (cur+1) … last
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= safePage - 1 && p <= safePage + 1)) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
    return pages;
  }, [totalPages, safePage]);

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
          : <>Showing <strong className="text-soulo-dark">{rangeStart}–{rangeEnd}</strong> of <strong className="text-soulo-dark">{filtered.length}</strong> {filtered.length === 1 ? "destination" : "destinations"}{hasFilters ? " matching your filters" : ""}</>
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

      {/* Paginated grid — only one page (~24 cards) is ever in the DOM */}
      {filtered.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paged.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center flex-wrap gap-1.5" aria-label="Destinations pagination">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-soulo-border text-soulo-grey hover:bg-soulo-linen disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                ← Prev
              </button>

              {pageNumbers.map((p, i) =>
                p === "ellipsis" ? (
                  <span key={`e${i}`} className="px-2 text-soulo-mist select-none">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    aria-current={p === safePage ? "page" : undefined}
                    className={`min-w-[2.25rem] px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      p === safePage
                        ? "bg-soulo-gold border-soulo-gold text-soulo-dark"
                        : "border-soulo-border text-soulo-grey hover:bg-soulo-linen"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="px-3 py-2 rounded-lg text-sm font-medium border border-soulo-border text-soulo-grey hover:bg-soulo-linen disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                Next →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
