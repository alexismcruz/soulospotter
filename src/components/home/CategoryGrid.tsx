import Link from "next/link";
import { useTranslations } from "next-intl";
import { SpotCategory } from "@prisma/client";

const CATEGORY_META: Record<SpotCategory, { emoji: string; slug: string; desc: string }> = {
  ACCOMMODATION: { emoji: "🏨", slug: "accommodation", desc: "Hostels, guesthouses & stays" },
  CAFE:          { emoji: "☕", slug: "cafes",         desc: "Coffee shops & work spots" },
  COWORKING:     { emoji: "💻", slug: "coworking",     desc: "Desks, WiFi & community" },
  FOOD:          { emoji: "🍜", slug: "food",          desc: "Restaurants & street food" },
  WELLNESS:      { emoji: "🧘", slug: "wellness",      desc: "Yoga, spas & mindfulness" },
  COMMUNITY:     { emoji: "🤝", slug: "community",     desc: "Meetups & expat hubs" },
  NATURE:        { emoji: "🏔️", slug: "nature",        desc: "Hikes, parks & beaches" },
  CULTURE:       { emoji: "🏛️", slug: "culture",       desc: "Museums, temples & art" },
  NIGHTLIFE:     { emoji: "🌙", slug: "nightlife",     desc: "Bars, clubs & evening life" },
  TRANSPORT:     { emoji: "✈️", slug: "transport",     desc: "Airports, hubs & getting around" },
};

export default function CategoryGrid() {
  const t = useTranslations("categories");

  const categories = Object.entries(CATEGORY_META) as [SpotCategory, typeof CATEGORY_META[SpotCategory]][];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Browse by Category</h2>
          <p className="mt-2 text-stone-500">Find exactly what you need, wherever you are.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(([category, meta]) => (
            <Link
              key={category}
              href={`/categories/${meta.slug}`}
              className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                {meta.emoji}
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-800 group-hover:text-amber-600 transition-colors">
                  {t(category)}
                </p>
                <p className="text-xs text-stone-400 mt-0.5 leading-snug">
                  {meta.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
