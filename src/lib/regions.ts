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
    region: Region.MIDDLE_EAST_AFRICA,
    slug: "middle-east-africa",
    label: "Middle East & Africa",
    emoji: "🏜️",
    description:
      "Medinas, souks, and sunsets over the Sahara. The Middle East and Africa are the most underrated solo travel regions on the planet — rich in culture, hospitality, and once-in-a-lifetime experiences.",
  },
  {
    region: Region.SOUTH_ASIA,
    slug: "south-asia",
    label: "South Asia",
    emoji: "🕌",
    description:
      "Yoga ashrams, Himalayan trails, and the most intense sensory experiences you'll ever have. South Asia has a way of changing solo travelers permanently — you leave a different person.",
  },
  {
    region: Region.SOUTHEAST_ASIA,
    slug: "southeast-asia",
    label: "Southeast Asia",
    emoji: "🌴",
    description:
      "The original solo traveler's paradise — affordable, warm, endlessly beautiful, and full of people who've been here before and never quite left. From rice terraces to surf breaks, SEA has it all.",
  },
  {
    region: Region.EAST_ASIA,
    slug: "east-asia",
    label: "East Asia",
    emoji: "⛩️",
    description:
      "Temples at sunrise, world-class food on every corner, and cities so safe you'll forget to be careful. East Asia is the most rewarding solo travel region for first-time solo adventurers.",
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
