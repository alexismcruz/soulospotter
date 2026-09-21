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

import { MORE_GUIDES } from "./guideContent";

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
  /** Very short label for the at-a-glance table, e.g. "Visa-free · 90 days". */
  short?: string;
  /** Colour/meaning of that label in the table. */
  tone?: "free" | "auth" | "visa" | "varies";
};

export type VisaInfo = {
  updated: string;         // year the summary was last reviewed
  summary: string;         // high-level overview
  officialUrl: string;     // authoritative source for exact requirements
  officialLabel: string;
  cases: VisaCase[];       // common-nationality quick answers
};

/** A guide as authored: `visa` is optional — if omitted it's taken from VISA_NOTES. */
export type GuideContent = Omit<CountryGuide, "visa"> & { visa?: VisaInfo };

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
  visa: VisaInfo;
};

const CORE_GUIDES: Record<string, GuideContent> = {
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
          short: "Visa-free · 30–60 days",
          tone: "free",
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
          short: "Visa on arrival / eVisa",
          tone: "auth",
          rule: "Visa on arrival or e-Visa is typically available for short tourist stays. Check current eligibility and apply online where required.",
          matchCodes: ["IN", "CN"],
        },
        {
          flags: "🌍",
          who: "Other nationalities",
          short: "Varies by passport",
          tone: "varies",
          rule: "Requirements vary widely — some need a visa arranged in advance. Check the official e-Visa portal for your passport.",
          // No matchCodes — this is the catch-all row.
        },
      ],
    },
  },
};

/** All guides. Editorial for the newer ones lives in ./guideContent (visa data in VISA_NOTES). */
export const COUNTRY_GUIDES: Record<string, GuideContent> = { ...CORE_GUIDES, ...MORE_GUIDES };

/** A full guide with its visa section resolved. Null if unknown or no visa data yet. */
export function getCountryGuide(slug: string): CountryGuide | null {
  const g = COUNTRY_GUIDES[slug];
  if (!g) return null;
  const visa = g.visa ?? VISA_NOTES[slug];
  return visa ? { ...g, visa } : null;
}

export const COUNTRY_GUIDE_SLUGS = Object.keys(COUNTRY_GUIDES);

/**
 * Visa notes, decoupled from full country guides.
 *
 * A full CountryGuide (intro, safety, budget, culture, etc.) takes real
 * research and editorial effort to write well, so guide coverage will always
 * lag our 92-country destinations list. Visa facts are narrower, more
 * mechanical, and arguably the single most-wanted piece of trip-planning info
 * (see: the visa checker's "no notes yet" dead end) — so they're tracked here
 * independently and can be populated much faster than full guides.
 *
 * getVisaNotes() checks this map FIRST, then falls back to a full guide's
 * embedded `visa` field if one exists (so Thailand's data — written inline in
 * COUNTRY_GUIDES — keeps working without duplicating it here).
 *
 * Every entry MUST be sourced from a real, checkable source (the destination's
 * own official immigration/e-Visa portal, cross-referenced with VisaHQ's or
 * IATA's country page) — never invented. `updated` is the year it was last
 * verified; re-check periodically, since visa policy changes without notice.
 */
// Shared ISO code lists, reused across multiple countries' visa cases.
const EU_SCHENGEN_CODES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "NO", "CH", "LI",
];

export const VISA_NOTES: Record<string, VisaInfo> = {
  germany: {
    updated: "2026",
    summary:
      "Germany is in the Schengen Area. EU/Schengen citizens can enter freely with no visa. Many other nationalities (US, UK, Canada, Australia and others) can enter visa-free for short tourist or business stays; everyone else needs a Schengen visa arranged in advance. A separate travel authorization (ETIAS) has been repeatedly delayed for visa-exempt travellers — check its current status before you fly.",
    officialUrl: "https://www.germany.info/us-en/service/visa",
    officialLabel: "German Federal Foreign Office — Visa Information",
    cases: [
      {
        flags: "🇪🇺",
        who: "EU / Schengen area citizens",
        short: "No visa needed",
        tone: "free",
        rule: "No visa needed at all — freedom of movement within the Schengen area covers entry, residence, and work.",
        matchCodes: EU_SCHENGEN_CODES,
      },
      {
        flags: "🇺🇸🇬🇧🇨🇦🇦🇺🇳🇿",
        who: "US, UK, Canada, Australia, New Zealand, and other visa-exempt nationalities",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism or business, for stays of up to 90 days within any 180-day period. Visa-exempt travellers may additionally need to register for ETIAS before flying — its enforcement date has been postponed multiple times, so check europa.eu/etias for the current status.",
        matchCodes: ["US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG"],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Schengen visa required",
        tone: "visa",
        rule: "A Schengen visa is typically required in advance for stays up to 90 days; longer stays (work, study, relocation) need a residence visa. Apply well before travelling — processing commonly takes 2–3 weeks.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  portugal: {
    updated: "2026",
    summary:
      "Portugal is in the Schengen Area. EU/Schengen citizens can enter freely with no visa. Many other nationalities (US, UK, Canada, Australia, New Zealand and others) can enter visa-free for short stays; everyone else needs a Schengen visa arranged in advance. Non-EU visitors are now registered at Schengen external borders under the EU's Entry/Exit System (EES), and the separate ETIAS travel authorisation for visa-exempt travellers has not yet started — check europa.eu/etias for the current status before you fly.",
    officialUrl: "https://vistos.mne.gov.pt/en/",
    officialLabel: "Portugal's official visa portal (Ministry of Foreign Affairs)",
    cases: [
      {
        flags: "🇪🇺",
        who: "EU / Schengen area citizens",
        short: "No visa needed",
        tone: "free",
        rule: "No visa needed at all — freedom of movement within the Schengen area covers entry, residence, and work.",
        matchCodes: EU_SCHENGEN_CODES,
      },
      {
        flags: "🇺🇸🇬🇧🇨🇦🇦🇺🇳🇿",
        who: "US, UK, Canada, Australia, New Zealand, and other visa-exempt nationalities",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism or business, for stays of up to 90 days within any 180-day period across the whole Schengen area (not per country). ETIAS registration for visa-exempt travellers has not started yet — check europa.eu/etias for the current status.",
        matchCodes: ["US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG"],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Schengen visa required",
        tone: "visa",
        rule: "A Schengen visa is typically required in advance for stays up to 90 days; longer stays (work, study, relocation) need a national visa or residence permit. Apply well before travelling — processing commonly takes 2–3 weeks.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  japan: {
    updated: "2026",
    summary:
      "Japan lets citizens of many countries — including the US, UK, Canada, Australia, New Zealand and most of Europe — enter without a visa as a 'temporary visitor' for tourism, typically for up to 90 days. Other nationalities need a visa arranged in advance (an online e-Visa is available for some). The list of exempt countries and the allowed stay can differ by passport and change over time, so confirm your exact allowance on the Ministry of Foreign Affairs list.",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html",
    officialLabel: "Japan Ministry of Foreign Affairs — visa exemption list",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, Canada, Australia, New Zealand, and most European countries",
        short: "Visa-free · up to 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism, short business visits and visiting family, typically for up to 90 days (the exact period is set per passport on the MOFA list). Paid work is not allowed on this status.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "IE", "KR", "SG", "HK",
          "AT", "BE", "DK", "FI", "FR", "DE", "GR", "IT", "LU", "NL", "NO", "PT", "ES", "SE", "CH", "PL", "CZ", "HU",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Varies by passport",
        tone: "varies",
        rule: "Many other passports need a visa in advance, and some can apply online through Japan's e-Visa system. Check the MOFA list for your nationality.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  indonesia: {
    updated: "2026",
    summary:
      "Most Western passports can enter Indonesia for tourism on a Visa on Arrival for 30 days, extendable once, for a fee of IDR 500,000 (roughly US$30, depending on the exchange rate). You can buy it online in advance through the official e-Visa site (the 'e-VoA') and skip the airport queue. Your passport should be valid for at least six months, and you must complete the All Indonesia digital arrival form; visitors to Bali also pay a separate tourist levy (IDR 150,000).",
    officialUrl: "https://evisa.imigrasi.go.id/",
    officialLabel: "Indonesia's official e-Visa website (Directorate General of Immigration)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and many other nationalities",
        short: "Visa on arrival · 30 days",
        tone: "auth",
        rule: "Visa on Arrival (IDR 500,000) for tourism, valid 30 days and extendable once for a further 30 days at an immigration office. Buy the e-VoA online before you fly, or pay at the airport. Passport valid at least six months; onward ticket and the All Indonesia arrival form required.",
        matchCodes: ["US", "GB", "CA", "AU", "NZ", "JP", "KR", ...EU_SCHENGEN_CODES],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Varies by passport",
        tone: "varies",
        rule: "Eligibility for the Visa on Arrival covers roughly 100 countries; some nationalities (including some ASEAN passports) enter visa-free, and others must obtain a visa in advance. Check the official e-Visa site for your passport.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  mexico: {
    updated: "2026",
    summary:
      "Mexico is one of the most visa-friendly countries for tourism worldwide — a long list of nationalities (including the US, UK, EU, Canada, Australia, and most of Latin America) can enter visa-free for up to 180 days. Even travellers from countries that normally need a visa can often enter using a substitute visa rule if they already hold a valid US, UK, Canadian, Schengen, or Japanese visa.",
    officialUrl: "https://www.gob.mx/inm",
    officialLabel: "Instituto Nacional de Migración (Mexico's immigration authority)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · up to 180 days",
        tone: "free",
        rule: "Visa-free entry for tourism, business, study, or medical purposes for up to 180 days. On arrival you'll get a tourist permit (FMM) — keep it, since you'll need to hand it back when you leave.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "HK",
          ...EU_SCHENGEN_CODES,
          "AR", "CL", "CO", "CR", "PA", "PY", "UY", "IL", "AE", "BS", "BB", "BZ", "BO", "TT", "MY",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is normally required in advance — but if you already hold a valid multiple-entry visa or permanent residence card from the US, UK, Canada, a Schengen country, or Japan, you can usually enter Mexico visa-free instead (a 'substitute visa'). Check both options for your passport.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  colombia: {
    updated: "2026",
    summary:
      "Colombia is straightforward for most solo travellers — a long list of nationalities (US, UK, EU, Canada, Australia, and most of Latin America) can enter visa-free for tourism, typically for 90 days, extendable up to 180 days total within a calendar year. Canadian citizens pay a small entry fee on arrival.",
    officialUrl: "https://www.migracioncolombia.gov.co",
    officialLabel: "Migración Colombia (Colombia's immigration authority)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for up to 90 days, extendable to a total of 180 days within a calendar year. Canadian citizens pay a small entry fee (around CAD$85) on arrival — everyone else pays nothing.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "HK",
          ...EU_SCHENGEN_CODES,
          "AR", "BO", "BR", "CL", "CR", "DO", "EC", "SV", "GT", "HN", "JM", "MX",
          "PA", "PY", "PE", "TT", "UY", "VE", "AE", "IL", "BS", "BB", "BZ", "ID", "PH",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance. Check the requirement for your specific passport with Migración Colombia or your nearest Colombian consulate before booking.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  "united-states": {
    updated: "2026",
    summary:
      "Canadian citizens can enter the US visa-free with just a passport, under a longstanding separate arrangement. Most Western Europeans, the UK, Australia, Japan, South Korea, and several others enter under the Visa Waiver Program (VWP) — visa-free for up to 90 days, but only after registering online via ESTA before departure. Everyone else needs a US visitor visa (B-2) arranged in advance, including Bulgarian, Cypriot, and Romanian citizens, who are notably NOT covered by the EU's VWP membership.",
    officialUrl: "https://esta.cbp.dhs.gov",
    officialLabel: "Official ESTA application (US Customs and Border Protection)",
    cases: [
      {
        flags: "🇨🇦",
        who: "Canada",
        short: "Visa-free · no ESTA",
        tone: "free",
        rule: "Visa-free entry with just a valid passport — Canada has its own long-standing arrangement with the US and doesn't use ESTA or the Visa Waiver Program.",
        matchCodes: ["CA"],
      },
      {
        flags: "🇬🇧🇪🇺🇦🇺🇯🇵🇰🇷",
        who: "UK, most of the EU, Australia, New Zealand, Japan, South Korea, Singapore, Chile, Israel, and Taiwan (Visa Waiver Program)",
        short: "Visa-free · 90 days + ESTA",
        tone: "auth",
        rule: "Visa-free entry for tourism or business for up to 90 days — but you must apply for ESTA (Electronic System for Travel Authorization) online before you fly, ideally at least 72 hours ahead. ESTA is not a visa, but you cannot board without an approved one.",
        matchCodes: [
          ...EU_SCHENGEN_CODES.filter((c) => !["BG", "CY", "RO"].includes(c)),
          "GB", "AU", "NZ", "JP", "KR", "SG", "CL", "IL",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities (including Bulgaria, Cyprus, and Romania)",
        short: "Visa required",
        tone: "visa",
        rule: "A B-2 visitor visa is required in advance — this includes several EU nationalities not covered by the Visa Waiver Program. Apply well ahead, as interview wait times vary widely by consulate and can run into weeks or months.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  brazil: {
    updated: "2026",
    summary:
      "Brazil is visa-free for tourism for a long list of nationalities, including the EU, UK, Japan, and most of Latin America, for up to 90 days. US, Canadian, and Australian citizens are a special case: Brazil has gone back and forth on requiring an eVisa versus restoring unilateral visa-free entry for these three, and the rule has been actively changing — check the official status for your passport before booking.",
    officialUrl: "https://www.gov.br/mre/en",
    officialLabel: "Brazilian Ministry of Foreign Affairs",
    cases: [
      {
        flags: "🇪🇺🇬🇧🇯🇵",
        who: "EU/Schengen, UK, Japan, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism or business for up to 90 days.",
        matchCodes: [
          ...EU_SCHENGEN_CODES,
          "GB", "JP", "KR", "SG", "IL", "AR", "BO", "CL", "CO", "CR", "EC", "SV",
          "GT", "HN", "MX", "NI", "PA", "PY", "PE", "UY", "VE", "BS", "BB", "BZ",
          "TT", "ZA", "HK",
        ],
      },
      {
        flags: "🇺🇸🇨🇦🇦🇺",
        who: "US, Canada, Australia",
        short: "Check current rule",
        tone: "varies",
        rule: "This is Brazil's most changeable visa rule for our audience — it has required an eVisa in the past, and a legislative proposal to restore unilateral visa-free entry for these three nationalities has been under consideration. Confirm the current requirement directly with the Brazilian Ministry of Foreign Affairs or your nearest Brazilian consulate before booking; don't rely on older advice you may have seen elsewhere.",
        matchCodes: ["US", "CA", "AU"],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa / eVisa required",
        tone: "visa",
        rule: "A visa or eVisa is typically required in advance. Check the requirement for your specific passport with the Brazilian Ministry of Foreign Affairs or your nearest consulate.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  argentina: {
    updated: "2026",
    summary:
      "Argentina is one of the easiest South American countries to enter — the US, UK, EU, Canada, Australia, and most of Latin America can all enter visa-free for tourism, typically for 90 days.",
    officialUrl: "https://www.migraciones.gob.ar",
    officialLabel: "Dirección Nacional de Migraciones (Argentina's immigration authority)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism or business for up to 90 days, extendable up to twice for a further 30 or 90 days at a time.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "HK", "ZA", "IL", "AE",
          ...EU_SCHENGEN_CODES,
          "BO", "BR", "CL", "CO", "CR", "EC", "SV", "GT", "HN", "MX", "NI", "PA",
          "PY", "PE", "UY", "VE", "BB", "TT",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance. Check the requirement for your specific passport with the Dirección Nacional de Migraciones or your nearest Argentine consulate.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  chile: {
    updated: "2026",
    summary:
      "Chile is straightforward for tourism — the US, UK, EU, Canada, Australia, and most of Latin America can enter visa-free for up to 90 days.",
    officialUrl: "https://www.serviciomigraciones.cl",
    officialLabel: "Servicio Nacional de Migraciones (Chile's immigration authority)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism or business for up to 90 days.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "TW", "IL", "AE", "ZA",
          ...EU_SCHENGEN_CODES,
          "AR", "BO", "BR", "CO", "CR", "EC", "SV", "GT", "HN", "MX", "NI", "PA",
          "PY", "PE", "UY", "JM", "TT", "BS", "BB", "BZ",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance. Chinese citizens holding a valid US or Canadian visa may qualify for a substitute-visa entry — check current eligibility. Everyone else should confirm the requirement with the Servicio Nacional de Migraciones or their nearest Chilean consulate.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  peru: {
    updated: "2026",
    summary:
      "Peru is easy to enter for tourism — the US, UK, EU (except Ireland, which has its own separate visa-free arrangement), Canada, Australia, and most of Latin America can all enter visa-free for up to 90 days, extendable to 180.",
    officialUrl: "https://www.gob.pe/migraciones",
    officialLabel: "Superintendencia Nacional de Migraciones (Peru's immigration authority)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for tourism or business for up to 90 days, extendable to a total of 180 days.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "TW", "HK", "IL", "AE", "ZA",
          ...EU_SCHENGEN_CODES,
          "AR", "BO", "BR", "CL", "CO", "CR", "EC", "GT", "HN", "PA", "PY", "UY",
          "JM", "TT", "BS", "BB", "BZ",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance. Check the requirement for your specific passport with the Superintendencia Nacional de Migraciones or your nearest Peruvian consulate.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  "costa-rica": {
    updated: "2026",
    summary:
      "Costa Rica is very solo-friendly on entry — the US, UK, EU, Canada, and Australia can all enter visa-free for up to 180 days, one of the most generous allowances in Latin America.",
    officialUrl: "https://www.migracion.go.cr",
    officialLabel: "Dirección General de Migración y Extranjería (Costa Rica's immigration authority)",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea",
        short: "Visa-free · 180 days",
        tone: "free",
        rule: "Visa-free entry for up to 180 days — one of the longest allowances in the region. Your passport must be valid on arrival.",
        matchCodes: ["US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "IL", "AE", "ZA", ...EU_SCHENGEN_CODES],
      },
      {
        flags: "🌎",
        who: "Argentina, Brazil, Chile, Mexico, Panama, Paraguay, Peru, Uruguay, and other Latin American nationalities",
        short: "Visa-free · 30–180 days",
        tone: "free",
        rule: "Visa-free entry, typically for 30 or 180 days depending on nationality. Check your specific allowance before booking.",
        matchCodes: ["AR", "BR", "CL", "MX", "PA", "PY", "PE", "UY", "BO", "GT", "HN", "SV"],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance. Check the requirement for your specific passport with the Dirección General de Migración y Extranjería or your nearest Costa Rican consulate.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  ecuador: {
    updated: "2026",
    summary:
      "Ecuador defaults to visa-free entry — most nationalities, including the US, UK, EU, Canada, Australia, and almost all of Latin America, can enter for up to 90 days without applying for anything in advance. A shorter list of nationalities (including China, India, and Vietnam) needs an eVisa arranged before travel.",
    officialUrl: "https://www.cancilleria.gob.ec",
    officialLabel: "Ecuador Ministry of Foreign Affairs and Human Mobility",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, and most nationalities",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for up to 90 days — Ecuador's default policy for most passports. Your passport must be valid for at least 6 months.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "IL", "AE", "ZA",
          ...EU_SCHENGEN_CODES,
          "AR", "BO", "BR", "CL", "CO", "PY", "PE", "UY", "MX", "PA", "CR",
          "GT", "HN", "SV", "NI", "JM", "TT", "BS", "BB", "BZ",
        ],
      },
      {
        flags: "🇨🇳🇮🇳🇵🇭",
        who: "China, India, Pakistan, Philippines, Vietnam, and several other nationalities",
        short: "eVisa required",
        tone: "auth",
        rule: "An eVisa is required and must be arranged before you travel — Ecuador is one of the more restrictive countries in the region for these specific passports.",
        matchCodes: ["CN", "IN", "PK", "PH", "VN"],
      },
      {
        flags: "🌍",
        who: "Everyone else",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Most other nationalities enter visa-free by default. Confirm your specific passport's status with the Ecuadorian Ministry of Foreign Affairs before booking.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  guatemala: {
    updated: "2026",
    summary:
      "Guatemala is easy to enter for tourism — the US, UK, EU, Canada, Australia, and most of Latin America can all enter visa-free for up to 90 days, extendable for another 90.",
    officialUrl: "https://igm.gob.gt",
    officialLabel: "Instituto Guatemalteco de Migración",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for up to 90 days, extendable for a further 90 days.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "TW", "IL", "AE", "ZA",
          ...EU_SCHENGEN_CODES,
          "AR", "BR", "CL", "CO", "CR", "MX", "PA", "PY", "PE", "UY", "SV", "HN",
          "NI", "JM", "TT", "BS", "BB", "BZ",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance — but if you already hold a valid visa or permanent residence card from a Schengen country, Canada, Mexico, or the US, you can usually enter Guatemala visa-free instead for up to 90 days.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  panama: {
    updated: "2026",
    summary:
      "Panama is easy to enter for tourism. US and Canadian citizens get a generous 180-day visa-free allowance; the UK, EU, Australia, and most of Latin America and Asia get 90 days visa-free.",
    officialUrl: "https://www.migracion.gob.pa",
    officialLabel: "Servicio Nacional de Migración de Panamá",
    cases: [
      {
        flags: "🇺🇸🇨🇦",
        who: "US and Canada",
        short: "Visa-free · 180 days",
        tone: "free",
        rule: "Visa-free entry for up to 180 days — a longer allowance than almost anywhere else in the region.",
        matchCodes: ["US", "CA"],
      },
      {
        flags: "🇬🇧🇪🇺🇦🇺🇯🇵",
        who: "UK, EU/Schengen, Australia, New Zealand, Japan, South Korea, and most of Latin America and Asia",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for up to 90 days.",
        matchCodes: [
          "GB", "AU", "NZ", "JP", "KR", "SG", "TW", "IL", "AE", "ZA",
          ...EU_SCHENGEN_CODES,
          "AR", "BO", "BR", "CL", "CO", "CR", "EC", "SV", "GT", "HN", "MX", "NI",
          "PY", "PE", "UY", "JM", "TT", "BS", "BB", "BZ", "VN",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance. Check the requirement for your specific passport with the Servicio Nacional de Migración or your nearest Panamanian consulate.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
  uruguay: {
    updated: "2026",
    summary:
      "Uruguay is straightforward for tourism — the US, UK, EU, Canada, Australia, and most of Latin America can all enter visa-free for up to 90 days, extendable for a further 90.",
    officialUrl: "https://www.gub.uy/ministerio-relaciones-exteriores",
    officialLabel: "Uruguay Ministry of Foreign Affairs",
    cases: [
      {
        flags: "🇺🇸🇬🇧🇪🇺🇨🇦🇦🇺",
        who: "US, UK, EU/Schengen, Canada, Australia, New Zealand, Japan, South Korea, and most of Latin America",
        short: "Visa-free · 90 days",
        tone: "free",
        rule: "Visa-free entry for up to 90 days, extendable for a further 90 days.",
        matchCodes: [
          "US", "GB", "CA", "AU", "NZ", "JP", "KR", "SG", "HK", "IL", "AE", "ZA",
          ...EU_SCHENGEN_CODES,
          "AR", "BO", "BR", "CL", "CO", "CR", "EC", "SV", "GT", "HN", "MX", "NI",
          "PA", "PY", "PE", "VE", "JM", "TT", "BS", "BB", "BZ",
        ],
      },
      {
        flags: "🌍",
        who: "Other nationalities",
        short: "Visa required",
        tone: "visa",
        rule: "A visa is typically required in advance — Chinese citizens with a valid visa from certain other countries may qualify for substitute-visa entry. Check the requirement for your specific passport with the Uruguay Ministry of Foreign Affairs.",
        // No matchCodes — this is the catch-all row.
      },
    ],
  },
};

export function getVisaNotes(slug: string): VisaInfo | null {
  return VISA_NOTES[slug] ?? COUNTRY_GUIDES[slug]?.visa ?? null;
}

/** Every country slug we have visa data for, from either source. */
export const VISA_NOTES_SLUGS = Array.from(
  new Set([...Object.keys(VISA_NOTES), ...COUNTRY_GUIDE_SLUGS]),
);
