/**
 * Central registry for every outbound affiliate program.
 *
 * SINGLE SOURCE OF TRUTH for partner/reference IDs and tracking URLs. When an ID
 * changes or a program goes live, update it here and every link across the site
 * follows. Never hardcode an affiliate URL in a page/component — import a builder
 * from this file instead.
 *
 * `status` marks whether the tracking is real & approved ("live") or still a
 * placeholder that does NOT earn commission ("placeholder"). Anything marked
 * placeholder needs a real ID before it makes money.
 */

/**
 * - "live"        — real, approved tracking; earns commission.
 * - "placeholder" — tracking not real yet; earns nothing. Needs a real ID.
 * - "none"        — no affiliate relationship at all. Plain editorial link:
 *                   must NOT be marked rel="sponsored" and must NOT be described
 *                   as an affiliate link in any disclosure.
 */
export type AffiliateStatus = "live" | "placeholder" | "none";

export const AFFILIATES = {
  safetywing: {
    name: "SafetyWing",
    // Real Ambassador reference ID — clicks are attributed.
    status: "live" as AffiliateStatus,
    referenceId: "26538744",
  },
  worldNomads: {
    name: "World Nomads",
    // APPROVED via CJ (welcome email 2026-07-21; CJ advertiser 6159036, pays per
    // quote/lead ~US$2.50). Tracking link below is our real CJ link (PID 101773002,
    // link 15403748). The 1x1 impression pixel from CJ's HTML is intentionally omitted.
    //
    // status stays "none" and `url` stays the plain homepage on purpose: World Nomads'
    // Content Guidelines forbid competitor comparisons, "best"/recommendation wording,
    // and original insurance copy, and require their disclaimers on the same page as any
    // affiliate link. Our /resources/travel-insurance page is a SafetyWing-vs-World-Nomads
    // comparison, so the tracked link must NOT go there. Use `trackingUrl` only on a page
    // that uses their approved CJ copy + both mandatory disclaimers, with rel="sponsored".
    // (An old fake "?affiliate=soulospotter" param was removed earlier.)
    status: "none" as AffiliateStatus,
    url: "https://www.worldnomads.com/",
    trackingUrl: "https://www.jdoqocy.com/click-101773002-15403748",
    pid: "101773002",
  },
  breezesim: {
    name: "BreezeSim",
    // Real eSIMGo/BreezeSim referral ref — live.
    status: "live" as AffiliateStatus,
    ref: "11468464.321pPwPKQ4",
  },
  getYourGuide: {
    name: "GetYourGuide",
    // Real partner ID — live.
    status: "live" as AffiliateStatus,
    partnerId: "CDE4NF2",
  },
  viator: {
    name: "Viator",
    // ⚠️ PLACEHOLDER — current Viator links carry NO tracking parameter, so clicks
    // are unattributed. Apply to the Viator/Tripadvisor affiliate program and set
    // `partnerId` (Viator "pid"); viatorSearchUrl() will start appending it.
    status: "placeholder" as AffiliateStatus,
    partnerId: null as string | null,
  },
  visahq: {
    name: "VisaHQ",
    // Real, approved affiliate ID — live.
    status: "live" as AffiliateStatus,
    affiliateId: "vaff18597",
  },
  booking: {
    name: "Booking.com",
    // Booking.com runs REGIONAL CJ programs, and CJ's own guidance is to use the program
    // that matches where the AUDIENCE is located — "where traffic originates, not travel
    // destinations". So we pick the program from the VISITOR's country at click time
    // (src/app/api/stays/[slug]/route.ts reads Vercel's x-vercel-ip-country header), and the
    // hotel search target is the city being viewed — any city, worldwide.
    //
    // Each program has a deep-link-enabled "Evergreen Link" (CJ link ID). `sid` carries the
    // city slug so CJ reports show per-city performance. Booking is session-based (a booking
    // must complete in the same browser session as the click) and forbids voucher/discount
    // promotions — never advertise "X% off Booking.com" deals.
    //
    // APPROVED + wired (Booking aid): apac 8133105, northAmerica 8133101, latam 8133104,
    // australia 8133102. APPLIED, pending (2026-09-21): unitedKingdom (CJ 4297311),
    // spainPortugal (4347393), nordics (5095558), centralEasternEurope (5096493) — when
    // approved, add each program's Evergreen link ID below and visitors from those markets
    // switch over automatically (see VISITOR_COUNTRY_PROGRAM).
    status: "live" as AffiliateStatus,
    cjPid: "101773002",
    fallbackProgram: "northAmerica",
    programs: {
      apac:         { advertiserId: "7854081", evergreenLinkId: "17293139" },
      northAmerica: { advertiserId: "7864295", evergreenLinkId: "17293132" },
      latam:        { advertiserId: "7864342", evergreenLinkId: "17293137" },
      australia:    { advertiserId: "7864353", evergreenLinkId: "17293136" },
      // unitedKingdom:        { advertiserId: "4297311", evergreenLinkId: "TODO" },
      // spainPortugal:        { advertiserId: "4347393", evergreenLinkId: "TODO" },
      // nordics:              { advertiserId: "5095558", evergreenLinkId: "TODO" },
      // centralEasternEurope: { advertiserId: "5096493", evergreenLinkId: "TODO" },
    } as Record<string, { advertiserId: string; evergreenLinkId: string }>,
  },
} as const;

/** True if any program is still a placeholder (handy for a build-time warning). */
export const HAS_PLACEHOLDER_AFFILIATES = Object.values(AFFILIATES).some(
  (a) => a.status === "placeholder",
);

// ── URL builders ─────────────────────────────────────────────────────────────

export function safetyWingUrl(): string {
  const id = AFFILIATES.safetywing.referenceId;
  return `https://safetywing.com/?referenceID=${id}&utm_source=${id}&utm_medium=Ambassador`;
}

/**
 * VISITOR country (ISO alpha-2) -> Booking.com CJ program that matches that audience.
 * Includes programs we haven't joined yet; a program only takes effect once it has an
 * entry in AFFILIATES.booking.programs — until then that market uses the fallback program.
 */
const VISITOR_COUNTRY_PROGRAM: Record<string, string> = {
  // North America
  US: "northAmerica", CA: "northAmerica", PR: "northAmerica",
  // Australia (own program); NZ and the rest of Asia-Pacific use APAC
  AU: "australia",
  NZ: "apac", PH: "apac", SG: "apac", MY: "apac", ID: "apac", TH: "apac", VN: "apac", IN: "apac",
  JP: "apac", KR: "apac", HK: "apac", TW: "apac", CN: "apac", LK: "apac", BD: "apac", PK: "apac",
  NP: "apac", KH: "apac", MM: "apac", LA: "apac", MO: "apac", FJ: "apac", MN: "apac", BN: "apac",
  // Latin America
  MX: "latam", CO: "latam", PE: "latam", CL: "latam", AR: "latam", UY: "latam", PY: "latam",
  BO: "latam", EC: "latam", VE: "latam", CR: "latam", PA: "latam", GT: "latam", HN: "latam",
  SV: "latam", NI: "latam", DO: "latam", CU: "latam",
  BR: "brazil", // separate Booking program (not joined)
  // Europe (programs applied for / not yet joined)
  GB: "unitedKingdom",
  ES: "spainPortugal", PT: "spainPortugal",
  SE: "nordics", NO: "nordics", DK: "nordics", FI: "nordics", IS: "nordics",
  PL: "centralEasternEurope", CZ: "centralEasternEurope", SK: "centralEasternEurope",
  HU: "centralEasternEurope", RO: "centralEasternEurope", BG: "centralEasternEurope",
  HR: "centralEasternEurope", SI: "centralEasternEurope", EE: "centralEasternEurope",
  LV: "centralEasternEurope", LT: "centralEasternEurope", RS: "centralEasternEurope",
  UA: "centralEasternEurope",
};

/** The joined program to use for a visitor (never null — falls back to the default). */
function bookingProgramForVisitor(visitorCountry: string | null | undefined): string {
  const key = visitorCountry ? VISITOR_COUNTRY_PROGRAM[visitorCountry.toUpperCase()] : undefined;
  return key && AFFILIATES.booking.programs[key] ? key : AFFILIATES.booking.fallbackProgram;
}

/**
 * Tracked Booking.com hotel-search link for a city, via the regional CJ program matching
 * the VISITOR's country (audience), not the city's location. Called from the redirect
 * route at click time so it works on statically cached pages.
 */
export function bookingStaysUrl(opts: {
  /** null => search the whole country (used by country guides). */
  cityName: string | null;
  countryName: string;
  citySlug: string;
  visitorCountry?: string | null;
}): string {
  const program = AFFILIATES.booking.programs[bookingProgramForVisitor(opts.visitorCountry)];
  const place = opts.cityName ? `${opts.cityName}, ${opts.countryName}` : opts.countryName;
  const target = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(place)}`;
  return (
    `https://www.jdoqocy.com/click-${AFFILIATES.booking.cjPid}-${program.evergreenLinkId}` +
    `?sid=${encodeURIComponent(opts.citySlug)}&url=${encodeURIComponent(target)}`
  );
}

/** Internal, on-site link that redirects to the right tracked Booking link (see route). */
export function bookingStaysPath(citySlug: string): string {
  return `/api/stays/${encodeURIComponent(citySlug)}`;
}

/**
 * Real CJ tracking link. ONLY use on /resources/world-nomads (the page built to
 * World Nomads' Content Guidelines), always with rel="sponsored" and both mandatory
 * disclaimers on the same page. Never on the SafetyWing comparison page.
 */
export function worldNomadsTrackingUrl(): string {
  return AFFILIATES.worldNomads.trackingUrl;
}

/**
 * Tracked links for World Nomads' approved "Short Copy" templates (from their CJ welcome
 * email, PID 101773002). Each template has its own CJ link ID; all resolve to worldnomads.com.
 * Same rules as worldNomadsTrackingUrl(): only on /resources/world-nomads, rel="sponsored",
 * with WORLD_NOMADS_DISCLAIMER next to the link.
 */
export function worldNomadsCopyUrl(template: 2 | 4): string {
  const aid = template === 2 ? "15798887" : "15798936";
  return `https://www.jdoqocy.com/click-${AFFILIATES.worldNomads.pid}-${aid}`;
}

/** MANDATORY (World Nomads welcome email, FCA/ASA): must appear near every tracked link. Verbatim. */
export const WORLD_NOMADS_DISCLAIMER =
  "We receive a fee when you get a quote from World Nomads using this link. We do not represent World Nomads. This is not a recommendation to buy travel insurance.";

/** MANDATORY (World Nomads Content Guidelines): on the same page as any tracked link. Verbatim. */
export const WORLD_NOMADS_GENERAL_DISCLAIMER =
  "Travel insurance doesn't cover everything. All of the information we provide is a brief summary. It does not include all terms, conditions, limitations, exclusions and termination provisions of the plans described.";

export function worldNomadsUrl(): string {
  // Placeholder passthrough until a real affiliate URL is available.
  return AFFILIATES.worldNomads.url;
}

export function breezeSimUrl(): string {
  return `https://breezesim.com?sca_ref=${AFFILIATES.breezesim.ref}`;
}

/** GetYourGuide homepage with partner tracking. */
export function gygHomeUrl(): string {
  return `https://www.getyourguide.com/?partner_id=${AFFILIATES.getYourGuide.partnerId}`;
}

/** GetYourGuide keyword search with partner tracking. */
export function gygSearchUrl(query: string): string {
  return `https://www.getyourguide.com/s/?q=${encodeURIComponent(query)}&partner_id=${AFFILIATES.getYourGuide.partnerId}`;
}

/** GetYourGuide city location page (path already includes the GYG location id). */
export function gygCityUrl(locationPath: string): string {
  return `https://www.getyourguide.com/${locationPath}/?partner_id=${AFFILIATES.getYourGuide.partnerId}`;
}

/**
 * Viator keyword search. Appends the Viator partner id once one is configured;
 * until then it returns an untracked search URL (see placeholder note above).
 */
export function viatorSearchUrl(query: string): string {
  const base = `https://www.viator.com/searchResults/all?text=${encodeURIComponent(query)}`;
  return AFFILIATES.viator.partnerId ? `${base}&pid=${AFFILIATES.viator.partnerId}` : base;
}

// ── VisaHQ ────────────────────────────────────────────────────────────────────
// Country slugs VisaHQ actually has a /<slug>/ page for, pulled from their own
// sitemap_1.xml on visahq.co.uk (2026-09) — NOT guessed. Deep-linking a country
// not on this list risks a 404 on their site, so anything outside it falls back
// to the VisaHQ homepage instead. Re-verify against
// https://www.visahq.co.uk/sitemap_1.xml occasionally, since their catalogue
// changes. Affiliate tracking (?a_aid=) is confirmed to work on both the
// homepage and country pages on this exact domain (visahq.co.uk) — use this
// domain, not visahq.com, since the affiliate ID was issued against it.
const VISAHQ_COUNTRY_SLUGS = new Set([
  "afghanistan", "albania", "algeria", "american-samoa", "andorra", "angola",
  "anguilla", "antigua-barbuda", "argentina", "armenia", "aruba", "australia",
  "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados",
  "belarus", "belgium", "belize", "benin", "bermuda", "bhutan", "bolivia",
  "bosnia-herzegovina", "botswana", "brazil", "british-virgin-islands",
  "brunei-darussalam", "bulgaria", "burkina-faso", "burundi", "cambodia",
  "cameroon", "canada", "cape-verde", "cayman-islands",
  "central-african-republic", "chad", "chile", "china", "christmas-island",
  "cocos-islands", "colombia", "comoros", "congo-democratic-republic",
  "congo-republic", "cook-islands", "costa-rica", "croatia", "cuba", "cyprus",
  "czech-republic", "denmark", "djibouti", "dominica", "dominican-republic",
  "ecuador", "egypt", "el-salvador", "equatorial-guinea", "eritrea", "estonia",
  "ethiopia", "falkland-islands", "faroe-islands", "fiji", "finland", "france",
  "french-guiana", "french-polynesia", "gabon", "gambia", "georgia", "germany",
  "ghana", "gibraltar", "greece", "greenland", "grenada", "guadeloupe", "guam",
  "guatemala", "guinea", "guinea-bissau", "guyana", "haiti", "honduras",
  "hong-kong", "hungary", "iceland", "india", "indonesia", "iran", "iraq",
  "ireland", "israel", "italy", "ivory-coast", "jamaica", "japan", "jordan",
  "kazakhstan", "kenya", "kiribati", "kosovo", "kuwait", "kyrgyzstan", "laos",
  "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein",
  "lithuania", "luxembourg", "macau", "macedonia", "madagascar", "malawi",
  "malaysia", "maldives", "mali", "malta", "marshall-islands", "martinique",
  "mauritania", "mauritius", "mayotte", "mexico", "micronesia", "moldova",
  "monaco", "mongolia", "montenegro", "montserrat", "morocco", "mozambique",
  "myanmar", "namibia", "nauru", "nepal", "netherlands", "netherlands-antilles",
  "new-caledonia", "new-zealand", "nicaragua", "niger", "nigeria", "niue",
  "norfolk-island", "north-korea", "norway", "oman", "pakistan", "palau",
  "palestine", "panama", "papua-new-guinea", "paraguay", "peru", "philippines",
  "pitcairn-island", "poland", "portugal", "puerto-rico", "qatar", "reunion",
  "romania", "russia", "rwanda", "saint-helena", "saint-kitts-nevis",
  "saint-lucia", "saint-martin", "saint-pierre-miquelon",
  "saint-vincent-grenadines", "samoa", "san-marino", "sao-tome-principe",
  "saudi-arabia", "senegal", "serbia", "seychelles", "sierra-leone",
  "singapore", "slovak-republic", "slovenia", "solomon-islands", "somalia",
  "south-africa", "south-korea", "south-sudan", "spain", "sri-lanka", "sudan",
  "suriname", "swaziland", "sweden", "switzerland", "syria", "taiwan",
  "tajikistan", "tanzania", "thailand", "timor-leste", "togo", "tokelau",
  "tonga", "trinidad-tobago", "tunisia", "turkey", "turkmenistan", "tuvalu",
  "uganda", "ukraine", "united-arab-emirates", "united-kingdom",
  "united-states", "uruguay", "us-virgin-islands", "uzbekistan", "vanuatu",
  "vatican", "venezuela", "vietnam", "wallis-futuna-islands", "yemen",
  "zambia", "zimbabwe",
]);

// A few country names don't kebab-case straight into VisaHQ's slug — map the
// exceptions here rather than guessing.
const VISAHQ_SLUG_OVERRIDES: Record<string, string> = {
  "cote-divoire": "ivory-coast",
  "czechia": "czech-republic",
  "slovakia": "slovak-republic",
  "brunei": "brunei-darussalam",
  "congo": "congo-republic",
  "dr-congo": "congo-democratic-republic",
  "saint-kitts-and-nevis": "saint-kitts-nevis",
  "trinidad-and-tobago": "trinidad-tobago",
  "bosnia-and-herzegovina": "bosnia-herzegovina",
  "vatican-city": "vatican",
};

function toKebab(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * VisaHQ link for a country's real visa page when we've confirmed they have
 * one, otherwise their homepage. Both carry the live affiliate tracking param.
 */
export function visahqUrl(countryName: string): string {
  const slug = toKebab(countryName);
  const visahqSlug = VISAHQ_SLUG_OVERRIDES[slug] ?? slug;
  const id = AFFILIATES.visahq.affiliateId;
  const base = VISAHQ_COUNTRY_SLUGS.has(visahqSlug)
    ? `https://www.visahq.co.uk/${visahqSlug}/`
    : "https://www.visahq.co.uk/";
  return `${base}?a_aid=${id}`;
}

/** VisaHQ homepage with our affiliate ID, for generic (non-country) mentions. */
export function visahqHomeUrl(): string {
  return `https://www.visahq.co.uk/?a_aid=${AFFILIATES.visahq.affiliateId}`;
}

// ── GetYourGuide per-city location paths ─────────────────────────────────────
// City slug → GYG location path (includes GYG's own location id, e.g. "-l46").
// These are GYG destination pages, not our data — kept here so all GYG config
// lives in one place.
export const GYG_CITY_PATHS: Record<string, string> = {
  "new-york-city":  "new-york-city-l18",
  "portland":       "portland-l29",
  "mexico-city":    "mexico-city-l43",
  "medellin":       "medellin-l122",
  "rio-de-janeiro": "rio-de-janeiro-l101",
  "lisbon":         "lisbon-l46",
  "tbilisi":        "tbilisi-l148",
  "barcelona":      "barcelona-l25",
  "berlin":         "berlin-l23",
  "marrakech":      "marrakech-l133",
  "rishikesh":      "rishikesh-l209",
  "kathmandu":      "kathmandu-l75",
  "chiang-mai":     "chiang-mai-l67",
  "hanoi":          "hanoi-l88",
  "bali":           "bali-l128",
  "siargao":        "siargao-l329",
  "hong-kong":      "hong-kong-l103",
  "kyoto":          "kyoto-l104",
  "seoul":          "seoul-l57",
  "melbourne":      "melbourne-l125",
  "queenstown":     "queenstown-l144",
  "byron-bay":      "byron-bay-l211",
};

/** GetYourGuide tours URL for a city, or null if we don't have a GYG location for it. */
export function gygCityToursUrl(citySlug: string): string | null {
  const path = GYG_CITY_PATHS[citySlug];
  return path ? gygCityUrl(path) : null;
}
