/**
 * Google shows roughly the first 55–60 characters of a <title> and cuts the END. The root
 * layout appends " | SouloSpotter", so what matters is that the meaningful part (before the
 * brand) fits — the brand is allowed to be the bit that gets truncated. Pass candidates from
 * most to least descriptive; we return the first whose own text is <= MAX_VISIBLE chars, or
 * the shortest if none fit.
 */
const MAX_VISIBLE = 60;

export function pickTitle(candidates: string[]): string {
  const fit = candidates.find((c) => c.length <= MAX_VISIBLE);
  return fit ?? candidates[candidates.length - 1];
}

/** True if the spot's name already contains the city (so we don't repeat it in the title). */
export function nameHasCity(name: string, cityName: string): boolean {
  return name.toLowerCase().includes(cityName.toLowerCase());
}
