import { Region } from "@prisma/client";

export type RegionMeta = {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  region: Region;
};

export const REGIONS: RegionMeta[] = [
  {
    region: Region.NORTH_AMERICA,
    slug: "north-america",
    label: "North America",
    emoji: "🗽",
    description:
      "From the buzzing streets of New York to the laid-back Pacific Northwest — solo travel in North America means total freedom, world-class cities, and an open road that never ends.",
  },
  {
    region: Region.LATIN_AMERICA,
    slug: "latin-america",
    label: "Latin America",
    emoji: "🌿",
    description:
      "Tacos at midnight, samba at dawn, cable cars over mountain cities. Latin America rewards solo travelers with extraordinary food, warmth, and a pace of life that resets your whole perspective.",
  },
  {
    region: Region.EUROPE,
    slug: "europe",
    label: "Europe",
    emoji: "🏛️",
    description:
      "Ancient capitals, hidden wine bars, sulphur baths in the Caucasus. Europe has more solo-travel character per square kilometre than anywhere on earth — and some of the safest cities in the world.",
  },
  {
    region: Region.AFRICA,
    slug: "africa",
    label: "Africa",
    emoji: "🦁",
    description:
      "Gorilla trekking in Rwanda, safaris across the Serengeti, the Sahara dunes of Morocco, and the warm hospitality that makes Africa the most rewarding continent for solo travel.",
  },
  {
    region: Region.CARIBBEAN,
    slug: "caribbean",
    label: "Caribbean",
    emoji: "🌴",
    description:
      "1950s Havana, reggae beaches in Jamaica, bioluminescent bays in Puerto Rico, and Carnival in Trinidad — the Caribbean rewards solo travelers with colour, music, and rum at every turn.",
  },
  {
    region: Region.ASIA,
    slug: "asia",
    label: "Asia",
    emoji: "🌏",
    description:
      "From the temples of Angkor to the streets of Bangkok, the rice terraces of Bali to the karst peaks of Guilin — Asia is the world's most rewarding solo travel continent. Warm, affordable, endlessly surprising, and full of people who came for a week and stayed for a year.",
  },
  {
    region: Region.OCEANIA,
    slug: "oceania",
    label: "Oceania",
    emoji: "🌊",
    description:
      "Coffee culture, surf breaks, mountain hikes, and a relaxed energy that makes solo travel feel completely natural. Australia and New Zealand welcome solo travelers like old friends.",
  },
];

export const REGION_BY_SLUG = Object.fromEntries(
  REGIONS.map((r) => [r.slug, r])
) as Record<string, RegionMeta>;

export const REGION_BY_ENUM = Object.fromEntries(
  REGIONS.map((r) => [r.region, r])
) as Record<Region, RegionMeta>;
