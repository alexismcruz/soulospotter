import { SpotCategory } from "@prisma/client";

/** Map SpotCategory enum → URL-friendly slug */
export const CATEGORY_SLUGS: Record<SpotCategory, string> = {
  ACCOMMODATION: "accommodation",
  CAFE:          "cafes",
  COWORKING:     "coworking",
  FOOD:          "food-drink",
  WELLNESS:      "wellness",
  COMMUNITY:     "community",
  NATURE:        "nature",
  CULTURE:       "culture",
  NIGHTLIFE:     "nightlife",
  TRANSPORT:     "transport",
};

/** Reverse lookup: URL slug → SpotCategory enum */
export const SLUG_TO_CATEGORY: Record<string, SpotCategory> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([k, v]) => [v, k as SpotCategory])
);

/** Human-readable labels and emojis — shared with SpotList and CityHero */
export const CATEGORY_META: Record<SpotCategory, { label: string; emoji: string }> = {
  ACCOMMODATION: { label: "Accommodation", emoji: "🏨" },
  CAFE:          { label: "Cafes",          emoji: "☕" },
  COWORKING:     { label: "Coworking",      emoji: "💻" },
  FOOD:          { label: "Food & Drink",   emoji: "🍜" },
  WELLNESS:      { label: "Wellness",       emoji: "🧘" },
  COMMUNITY:     { label: "Community",      emoji: "🤝" },
  NATURE:        { label: "Nature",         emoji: "🏔️" },
  CULTURE:       { label: "Culture",        emoji: "🏛️" },
  NIGHTLIFE:     { label: "Nightlife",      emoji: "🌙" },
  TRANSPORT:     { label: "Transport",      emoji: "✈️" },
};
