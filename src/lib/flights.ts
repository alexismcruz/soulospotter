/**
 * Expedia flight-search affiliate links via Partnerize.
 *
 * Verified link format (from the Partnerize Link Builder, unshortened):
 *   https://expedia.com/affiliate?siteid=1&landingPage=<ENCODED>&camref=...&creativeref=...&adref=...
 *
 * We build an Expedia Flights-Search URL for the user's route/dates, then
 * wrap it as the `landingPage` so the click is tracked to the account.
 */

export const EXPEDIA_AFFILIATE = {
  siteid: "1",
  camref: "1110lGF9J",
  creativeref: "1100l68075",
  adref: "PZrSlazHLG",
} as const;

export type Airport = { code: string; city: string };

/**
 * Primary / gateway airport for each destination city.
 * For cities without their own airport, the nearest practical gateway is used
 * (e.g. Koh Tao -> Koh Samui USM, Pai -> Chiang Mai CNX). The destination field
 * is editable on the form, so users can adjust if needed.
 */
export const CITY_AIRPORTS: Record<string, Airport> = {
  "bali":            { code: "DPS", city: "Bali (Denpasar)" },
  "bangkok":         { code: "BKK", city: "Bangkok" },
  "barcelona":       { code: "BCN", city: "Barcelona" },
  "berlin":          { code: "BER", city: "Berlin" },
  "byron-bay":       { code: "BNK", city: "Ballina (Byron Bay gateway)" },
  "cebu":            { code: "CEB", city: "Cebu" },
  "chengdu":         { code: "CTU", city: "Chengdu" },
  "chiang-mai":      { code: "CNX", city: "Chiang Mai" },
  "el-nido":         { code: "ENI", city: "El Nido" },
  "guilin":          { code: "KWL", city: "Guilin" },
  "hanoi":           { code: "HAN", city: "Hanoi" },
  "ho-chi-minh-city":{ code: "SGN", city: "Ho Chi Minh City" },
  "hong-kong":       { code: "HKG", city: "Hong Kong" },
  "kathmandu":       { code: "KTM", city: "Kathmandu" },
  "koh-tao":         { code: "USM", city: "Koh Samui (Koh Tao gateway)" },
  "kuala-lumpur":    { code: "KUL", city: "Kuala Lumpur" },
  "kyoto":           { code: "KIX", city: "Osaka Kansai (Kyoto gateway)" },
  "lisbon":          { code: "LIS", city: "Lisbon" },
  "luang-prabang":   { code: "LPQ", city: "Luang Prabang" },
  "marrakech":       { code: "RAK", city: "Marrakech" },
  "medellin":        { code: "MDE", city: "Medellín" },
  "melbourne":       { code: "MEL", city: "Melbourne" },
  "mexico-city":     { code: "MEX", city: "Mexico City" },
  "new-york-city":   { code: "NYC", city: "New York City" },
  "pai":             { code: "CNX", city: "Chiang Mai (Pai gateway)" },
  "penang":          { code: "PEN", city: "Penang" },
  "phuket":          { code: "HKT", city: "Phuket" },
  "portland":        { code: "PDX", city: "Portland" },
  "queenstown":      { code: "ZQN", city: "Queenstown" },
  "rio-de-janeiro":  { code: "RIO", city: "Rio de Janeiro" },
  "rishikesh":       { code: "DED", city: "Dehradun (Rishikesh gateway)" },
  "seoul":           { code: "SEL", city: "Seoul" },
  "siargao":         { code: "IAO", city: "Siargao" },
  "siem-reap":       { code: "SAI", city: "Siem Reap" },
  "singapore":       { code: "SIN", city: "Singapore" },
  "tbilisi":         { code: "TBS", city: "Tbilisi" },
  "ubud":            { code: "DPS", city: "Bali (Denpasar)" },
  "ulaanbaatar":     { code: "UBN", city: "Ulaanbaatar" },
  "xian":            { code: "XIY", city: "Xi'an" },
};

/** Common origin airports for the autocomplete datalist. */
export const COMMON_ORIGINS: Airport[] = [
  { code: "JFK", city: "New York" },
  { code: "LAX", city: "Los Angeles" },
  { code: "SFO", city: "San Francisco" },
  { code: "ORD", city: "Chicago" },
  { code: "SEA", city: "Seattle" },
  { code: "YYZ", city: "Toronto" },
  { code: "YVR", city: "Vancouver" },
  { code: "LHR", city: "London Heathrow" },
  { code: "LGW", city: "London Gatwick" },
  { code: "MAN", city: "Manchester" },
  { code: "CDG", city: "Paris" },
  { code: "AMS", city: "Amsterdam" },
  { code: "FRA", city: "Frankfurt" },
  { code: "MAD", city: "Madrid" },
  { code: "BCN", city: "Barcelona" },
  { code: "FCO", city: "Rome" },
  { code: "IST", city: "Istanbul" },
  { code: "DXB", city: "Dubai" },
  { code: "DOH", city: "Doha" },
  { code: "SIN", city: "Singapore" },
  { code: "BKK", city: "Bangkok" },
  { code: "KUL", city: "Kuala Lumpur" },
  { code: "HKG", city: "Hong Kong" },
  { code: "NRT", city: "Tokyo Narita" },
  { code: "HND", city: "Tokyo Haneda" },
  { code: "ICN", city: "Seoul" },
  { code: "SYD", city: "Sydney" },
  { code: "MEL", city: "Melbourne" },
  { code: "AKL", city: "Auckland" },
  { code: "DEL", city: "Delhi" },
  { code: "BOM", city: "Mumbai" },
  { code: "MNL", city: "Manila" },
  { code: "GRU", city: "São Paulo" },
  { code: "MEX", city: "Mexico City" },
];

/**
 * Comprehensive list of major international airports worldwide, so visitors can
 * search ANY global route — not only the destinations featured on the site.
 * The flight form accepts free text too (any valid IATA code works), this just
 * powers the autocomplete suggestions.
 */
export const WORLD_AIRPORTS: Airport[] = [
  // ── North America ──
  { code: "JFK", city: "New York JFK" }, { code: "EWR", city: "New York Newark" },
  { code: "LGA", city: "New York LaGuardia" }, { code: "LAX", city: "Los Angeles" },
  { code: "SFO", city: "San Francisco" }, { code: "ORD", city: "Chicago O'Hare" },
  { code: "SEA", city: "Seattle" }, { code: "MIA", city: "Miami" }, { code: "BOS", city: "Boston" },
  { code: "ATL", city: "Atlanta" }, { code: "DFW", city: "Dallas" }, { code: "DEN", city: "Denver" },
  { code: "LAS", city: "Las Vegas" }, { code: "IAD", city: "Washington Dulles" },
  { code: "PHX", city: "Phoenix" }, { code: "PDX", city: "Portland" }, { code: "AUS", city: "Austin" },
  { code: "HNL", city: "Honolulu" }, { code: "YYZ", city: "Toronto" }, { code: "YVR", city: "Vancouver" },
  { code: "YUL", city: "Montreal" }, { code: "YYC", city: "Calgary" }, { code: "MEX", city: "Mexico City" },
  { code: "CUN", city: "Cancún" }, { code: "GDL", city: "Guadalajara" }, { code: "PTY", city: "Panama City" },
  { code: "SJO", city: "San José (Costa Rica)" }, { code: "HAV", city: "Havana" },
  // ── South America ──
  { code: "GRU", city: "São Paulo" }, { code: "GIG", city: "Rio de Janeiro" }, { code: "EZE", city: "Buenos Aires" },
  { code: "SCL", city: "Santiago" }, { code: "LIM", city: "Lima" }, { code: "BOG", city: "Bogotá" },
  { code: "MDE", city: "Medellín" }, { code: "UIO", city: "Quito" }, { code: "CUZ", city: "Cusco" },
  { code: "MVD", city: "Montevideo" }, { code: "LPB", city: "La Paz" },
  // ── Europe ──
  { code: "LHR", city: "London Heathrow" }, { code: "LGW", city: "London Gatwick" },
  { code: "STN", city: "London Stansted" }, { code: "MAN", city: "Manchester" }, { code: "EDI", city: "Edinburgh" },
  { code: "DUB", city: "Dublin" }, { code: "CDG", city: "Paris CDG" }, { code: "ORY", city: "Paris Orly" },
  { code: "AMS", city: "Amsterdam" }, { code: "FRA", city: "Frankfurt" }, { code: "MUC", city: "Munich" },
  { code: "BER", city: "Berlin" }, { code: "MAD", city: "Madrid" }, { code: "BCN", city: "Barcelona" },
  { code: "LIS", city: "Lisbon" }, { code: "OPO", city: "Porto" }, { code: "FCO", city: "Rome" },
  { code: "MXP", city: "Milan" }, { code: "VCE", city: "Venice" }, { code: "ATH", city: "Athens" },
  { code: "VIE", city: "Vienna" }, { code: "ZRH", city: "Zurich" }, { code: "GVA", city: "Geneva" },
  { code: "BRU", city: "Brussels" }, { code: "CPH", city: "Copenhagen" }, { code: "ARN", city: "Stockholm" },
  { code: "OSL", city: "Oslo" }, { code: "HEL", city: "Helsinki" }, { code: "KEF", city: "Reykjavik" },
  { code: "PRG", city: "Prague" }, { code: "BUD", city: "Budapest" }, { code: "WAW", city: "Warsaw" },
  { code: "KRK", city: "Kraków" }, { code: "OTP", city: "Bucharest" }, { code: "IST", city: "Istanbul" },
  { code: "DBV", city: "Dubrovnik" }, { code: "ZAG", city: "Zagreb" }, { code: "TLL", city: "Tallinn" },
  { code: "LJU", city: "Ljubljana" }, { code: "TBS", city: "Tbilisi" }, { code: "SVO", city: "Moscow" },
  // ── Middle East & Africa ──
  { code: "DXB", city: "Dubai" }, { code: "AUH", city: "Abu Dhabi" }, { code: "DOH", city: "Doha" },
  { code: "TLV", city: "Tel Aviv" }, { code: "AMM", city: "Amman" }, { code: "RUH", city: "Riyadh" },
  { code: "JED", city: "Jeddah" }, { code: "CAI", city: "Cairo" }, { code: "RAK", city: "Marrakech" },
  { code: "CMN", city: "Casablanca" }, { code: "CPT", city: "Cape Town" }, { code: "JNB", city: "Johannesburg" },
  { code: "NBO", city: "Nairobi" }, { code: "ADD", city: "Addis Ababa" }, { code: "ZNZ", city: "Zanzibar" },
  { code: "MRU", city: "Mauritius" },
  // ── Asia ──
  { code: "NRT", city: "Tokyo Narita" }, { code: "HND", city: "Tokyo Haneda" }, { code: "KIX", city: "Osaka" },
  { code: "ICN", city: "Seoul Incheon" }, { code: "PUS", city: "Busan" }, { code: "CJU", city: "Jeju" },
  { code: "PEK", city: "Beijing" }, { code: "PVG", city: "Shanghai" }, { code: "CTU", city: "Chengdu" },
  { code: "XIY", city: "Xi'an" }, { code: "KWL", city: "Guilin" }, { code: "HKG", city: "Hong Kong" },
  { code: "TPE", city: "Taipei" }, { code: "BKK", city: "Bangkok" }, { code: "HKT", city: "Phuket" },
  { code: "CNX", city: "Chiang Mai" }, { code: "USM", city: "Koh Samui" }, { code: "SIN", city: "Singapore" },
  { code: "KUL", city: "Kuala Lumpur" }, { code: "PEN", city: "Penang" }, { code: "DPS", city: "Bali (Denpasar)" },
  { code: "CGK", city: "Jakarta" }, { code: "MNL", city: "Manila" }, { code: "CEB", city: "Cebu" },
  { code: "SGN", city: "Ho Chi Minh City" }, { code: "HAN", city: "Hanoi" }, { code: "REP", city: "Siem Reap" },
  { code: "PNH", city: "Phnom Penh" }, { code: "VTE", city: "Vientiane" }, { code: "LPQ", city: "Luang Prabang" },
  { code: "RGN", city: "Yangon" }, { code: "DEL", city: "Delhi" }, { code: "BOM", city: "Mumbai" },
  { code: "BLR", city: "Bangalore" }, { code: "MAA", city: "Chennai" }, { code: "GOI", city: "Goa" },
  { code: "DED", city: "Dehradun (Rishikesh)" }, { code: "KTM", city: "Kathmandu" }, { code: "CMB", city: "Colombo" },
  { code: "MLE", city: "Malé (Maldives)" }, { code: "ULN", city: "Ulaanbaatar" },
  // ── Oceania ──
  { code: "SYD", city: "Sydney" }, { code: "MEL", city: "Melbourne" }, { code: "BNE", city: "Brisbane" },
  { code: "PER", city: "Perth" }, { code: "OOL", city: "Gold Coast" }, { code: "AKL", city: "Auckland" },
  { code: "ZQN", city: "Queenstown" }, { code: "CHC", city: "Christchurch" }, { code: "NAN", city: "Fiji (Nadi)" },
];

/**
 * All airports for the global picker — world airports + featured destinations +
 * common origins, de-duped by IATA code. The form also accepts any free-text
 * IATA code, so destinations not listed here can still be searched.
 */
export const ALL_AIRPORTS: Airport[] = (() => {
  const map = new Map<string, Airport>();
  for (const a of [...WORLD_AIRPORTS, ...COMMON_ORIGINS, ...Object.values(CITY_AIRPORTS)]) {
    if (!map.has(a.code)) map.set(a.code, a);
  }
  return Array.from(map.values()).sort((x, y) => x.city.localeCompare(y.city));
})();

export type FlightQuery = {
  origin: string;       // IATA code or city, e.g. "JFK"
  dest: string;         // IATA code or city
  depart: string;       // YYYY-MM-DD
  ret?: string;         // YYYY-MM-DD (omit for one-way)
  adults?: number;
};

/** Build the raw Expedia Flights-Search URL. */
export function buildExpediaFlightsUrl(q: FlightQuery): string {
  const adults = q.adults && q.adults > 0 ? q.adults : 1;
  const oneway = !q.ret;
  const o = q.origin.trim().toUpperCase();
  const d = q.dest.trim().toUpperCase();

  const leg1 = `from:${o},to:${d},departure:${q.depart}TANYT`;
  let url = `https://www.expedia.com/Flights-Search?trip=${oneway ? "oneway" : "roundtrip"}&leg1=${leg1}`;
  if (!oneway) {
    url += `&leg2=from:${d},to:${o},departure:${q.ret}TANYT`;
  }
  url += `&passengers=adults:${adults}&mode=search`;
  return url;
}

/** Wrap an Expedia URL in the Partnerize affiliate tracking link. */
export function toAffiliateLink(expediaUrl: string): string {
  const { siteid, camref, creativeref, adref } = EXPEDIA_AFFILIATE;
  return (
    `https://expedia.com/affiliate?siteid=${siteid}` +
    `&landingPage=${encodeURIComponent(expediaUrl)}` +
    `&camref=${camref}&creativeref=${creativeref}&adref=${adref}`
  );
}

/** Convenience: full tracked flight-search link from a query. */
export function buildFlightAffiliateLink(q: FlightQuery): string {
  return toAffiliateLink(buildExpediaFlightsUrl(q));
}
