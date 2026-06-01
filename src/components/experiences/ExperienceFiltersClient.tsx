"use client";

import { useState, useMemo } from "react";
import { ExperienceCategory } from "@prisma/client";
import ExperienceCard from "./ExperienceCard";

interface Experience {
  id: string;
  slug: string;
  name: string;
  city: {
    name: string;
    country: { code: string };
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
  OUTDOOR_ADVENTURE: { label: "Outdoor & Adventure", icon: "🥾" },
  FOOD_DRINK: { label: "Food & Drink", icon: "🍜" },
  ARTS_CULTURE: { label: "Arts & Culture", icon: "🎨" },
  WELLNESS_MINDFULNESS: { label: "Wellness & Mindfulness", icon: "🧘" },
  NIGHTLIFE_SOCIAL: { label: "Nightlife & Social", icon: "🌙" },
  DAY_TRIPS: { label: "Day Trips", icon: "🚌" },
  PHOTOGRAPHY_WALKS: { label: "Photography Walks", icon: "📸" },
  FITNESS_SPORTS: { label: "Fitness & Sports", icon: "🥊" },
};

export default function ExperienceFiltersClient({
  experiences,
  cities,
}: ExperienceFiltersClientProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | null>(null);

  // Filter experiences
  const filtered = useMemo(() => {
    return experiences.filter((exp) => {
      if (selectedCity && exp.city.name !== cities.find((c) => c.slug === selectedCity)?.name) {
        return false;
      }
      if (selectedCategory && exp.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [experiences, selectedCity, selectedCategory, cities]);

  // Get available categories (only show if they have experiences in current filter)
  const availableCategories = useMemo(() => {
    const categories = new Set(
      filtered.map((exp) => exp.category)
    );
    return Array.from(categories).sort();
  }, [filtered]);

  // Sort: featured first, then by creation date
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }
      return 0;
    });
  }, [filtered]);

  const selectedCityName = cities.find((c) => c.slug === selectedCity)?.name;

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
              setSelectedCategory(null); // Reset category when changing city
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
            <p className="text-xs text-soulo-mist uppercase font-semibold mb-3">
              Category
            </p>
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

        {/* Results Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-soulo-grey text-lg">
              No experiences found matching your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCity(null);
                setSelectedCategory(null);
              }}
              className="mt-4 px-6 py-2.5 bg-soulo-gold hover:bg-amber-400 text-soulo-dark font-bold rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
