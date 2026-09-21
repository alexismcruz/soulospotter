/**
 * Google shows roughly the first 55–60 characters of a <title>. The root layout appends
 * " | SouloSpotter" (15 chars), so long page titles get truncated in results and lose the
 * part that sells the click. Pass candidates from most to least descriptive; we return the
 * first that fits once the brand suffix is added, or the shortest if none do.
 */
const BRAND_SUFFIX_LENGTH = " | SouloSpotter".length;
const MAX_TOTAL = 64;

export function pickTitle(candidates: string[]): string {
  const fit = candidates.find((c) => c.length + BRAND_SUFFIX_LENGTH <= MAX_TOTAL);
  return fit ?? candidates[candidates.length - 1];
}

/** True if the spot's name already contains the city (so we don't repeat it in the title). */
export function nameHasCity(name: string, cityName: string): boolean {
  return name.toLowerCase().includes(cityName.toLowerCase());
}
