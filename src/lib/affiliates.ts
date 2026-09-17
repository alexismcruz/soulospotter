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
    // NOT an affiliate. The application was DECLINED (2026-07, reason: insufficient
    // site traffic). The old "?affiliate=soulospotter" param was fake and has been
    // removed — this is now a plain editorial link that earns nothing.
    //
    // Because status is "none": do NOT add rel="sponsored" to these links, and do
    // NOT describe World Nomads as an affiliate in any disclosure copy.
    // Worth reapplying once traffic grows; if approved, set a real url + "live".
    status: "none" as AffiliateStatus,
    url: "https://www.worldnomads.com/",
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
