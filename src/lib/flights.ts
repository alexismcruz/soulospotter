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

/** All destination airports + common origins, de-duped, for global pickers. */
export const ALL_AIRPORTS: Airport[] = (() => {
  const map = new Map<string, Airport>();
  for (const a of [...COMMON_ORIGINS, ...Object.values(CITY_AIRPORTS)]) {
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
