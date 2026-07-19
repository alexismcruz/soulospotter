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
