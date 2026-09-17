/**
 * Country "start here" guide content.
 *
 * Each guide is genuinely written, evergreen editorial — NOT an auto-generated
 * template with the country name swapped in (that reads as thin-affiliate spam to
 * Google). The page shell (src/app/[locale]/guides/[country]/page.tsx) pulls the
 * live cities for the country from the DB and renders the affiliate CTAs; this file
 * only holds the words. Add a country here → its guide page goes live.
 *
 * Visa notes are deliberately HIGH-LEVEL and dated: requirements depend on the
 * traveller's passport and change often, so we point people to the official source
 * for their exact allowance rather than asserting precise day counts.
 */

export type VisaCase = {
  flags: string;   // emoji flags for the nationalities this row covers
  who: string;     // e.g. "US, UK, EU, Australia, Canada"
  rule: string;    // high-level, stable guidance
  /**
   * ISO 3166-1 alpha-2 passport codes this row covers, for the visa checker to
   * match a picked nationality to a row. Omit (or leave empty) on the catch-all
   * "everyone else" row.
   */
  matchCodes?: string[];
};

export type CountryGuide = {
  /** Must match Country.slug in the database. */
  countrySlug: string;
  countryName: string;
  /** IATA code of the main international gateway, for the flights CTA. */
  gatewayAirport: { code: string; city: string };
  /** One-paragraph "start here" overview. */
  intro: string;
  /** Who this country suits (first-timers etc.). */
  bestFor: string;
  /** Main editorial sections. */
  sections: { heading: string; body: string }[];
  visa: {
    updated: string;         // year the summary was last reviewed
    summary: string;         // high-level overview
    officialUrl: string;     // authoritative source for exact requirements
    officialLabel: string;
    cases: VisaCase[];       // common-nationality quick answers
  };
};

export const COUNTRY_GUIDES: Record<string, CountryGuide> = {
  thailand: {
    countrySlug: "thailand",
    countryName: "Thailand",
    gatewayAirport: { code: "BKK", city: "Bangkok" },
    intro:
      "Thailand is the country that turns nervous first-timers into lifelong solo travellers. It's cheap, ridiculously easy to get around, packed with other solo travellers, and genuinely welcoming — you can land in Bangkok knowing no one and be sharing a table with new friends by dinner. Beaches in the south, mountains and temples in the north, street food everywhere, and a backpacker infrastructure so smooth you rarely have to plan more than a day ahead.",
    bestFor:
      "First solo trips, backpackers, digital nomads, and anyone who wants big adventure on a small budget. If you've never travelled alone before, Thailand is one of the safest and softest places on earth to start.",
    sections: [
      {
        heading: "Is Thailand safe for solo travellers?",
        body:
          "Yes — Thailand is one of the safest countries in Asia for solo travellers, including solo women. Violent crime against tourists is rare; the real risks are petty scams (tuk-tuk overcharging, gem shops, dodgy jet-ski deposits), motorbike accidents, and drink spiking in party spots. Use metered taxis or Grab, wear a helmet if you rent a scooter (and only if you can actually ride one), watch your drink on the islands, and you'll be fine. Trust the general rule: if a stranger is unusually eager to help you shop, walk away.",
      },
      {
        heading: "How much does Thailand cost?",
        body:
          "Thailand runs from shoestring to plush. Backpackers get by on roughly US$25–40 a day (hostel dorm, street food, local transport); a comfortable mid-range solo budget is around US$50–90 a day (private guesthouse room, sit-down restaurants, the odd tour). Street food is the great equaliser — a brilliant meal is often US$1–2. The north (Chiang Mai, Pai) is cheaper than the southern islands, where accommodation and boats push costs up.",
      },
      {
        heading: "Best time to visit",
        body:
          "The cool, dry season (November to February) is peak for a reason — comfortable temperatures and little rain nationwide. March to May is hot; June to October is the green, wetter season (cheaper, quieter, still very doable — rain often comes in short bursts). Note the Gulf islands (Koh Tao, Koh Samui) run on a slightly different weather clock and can be wettest in October–December, so check your specific islands before booking.",
      },
      {
        heading: "Getting around",
        body:
          "This is where Thailand shines for solo travellers. Cheap domestic flights (AirAsia, Nok Air, Thai Lion) connect Bangkok to Chiang Mai, Phuket and the islands in an hour or two. Overnight trains and VIP buses cover the rest comfortably. In cities, use the Grab app (like Uber) to avoid taxi haggling. Boats and ferries link the islands. You almost never need to book far ahead — but do buy an eSIM before you land so you have data the moment you step off the plane.",
      },
      {
        heading: "Culture & etiquette",
        body:
          "A few things go a long way: dress modestly at temples (shoulders and knees covered, shoes off), never touch anyone's head or point your feet at people or Buddha images, and treat images of the King and monks with respect. A small bow with palms together (the wai) is a lovely greeting. Thais value keeping calm — losing your temper in public makes you 'lose face' and rarely gets you anywhere. Learn 'sawadee' (hello) and 'khop khun' (thank you) and you'll get warm smiles back.",
      },
    ],
    visa: {
      updated: "2026",
      summary:
        "Thailand is visa-friendly for tourism. Many Western passports can enter visa-free for a set number of days, some nationalities get a visa on arrival, and others apply online through the official Thai e-Visa system before travelling. Allowances and the list of eligible countries change, so always confirm the current rule for YOUR passport before you fly.",
      officialUrl: "https://www.thaievisa.go.th/",
      officialLabel: "Official Thai e-Visa portal",
      cases: [
        {
          flags: "🇺🇸🇬🇧🇪🇺🇦🇺🇨🇦",
          who: "US, UK, EU/Schengen, Australia, Canada",
          rule: "Visa-free entry for tourism (commonly up to 30–60 days depending on current policy). Confirm your exact allowance before booking.",
          matchCodes: [
            "US", "GB", "AU", "CA",
            // EU / Schengen
            "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
            "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
          ],
        },
        {
          flags: "🇮🇳🇨🇳",
          who: "India, China",
          rule: "Visa on arrival or e-Visa is typically available for short tourist stays. Check current eligibility and apply online where required.",
          matchCodes: ["IN", "CN"],
        },
        {
          flags: "🌍",
          who: "Other nationalities",
          rule: "Requirements vary widely — some need a visa arranged in advance. Check the official e-Visa portal for your passport.",
          // No matchCodes — this is the catch-all row.
        },
      ],
    },
  },
};

export function getCountryGuide(slug: string): CountryGuide | null {
  return COUNTRY_GUIDES[slug] ?? null;
}

export const COUNTRY_GUIDE_SLUGS = Object.keys(COUNTRY_GUIDES);
