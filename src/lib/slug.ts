/**
 * URL slugs can contain non-ASCII characters (e.g. "flam-næroyfjord", "pyhajärvi", "feskekôrka").
 * Next hands dynamic params to pages percent-encoded, so a DB lookup by the raw param 404s.
 * Always run route params through this before querying by slug.
 */
export function decodeSlug(param: string): string {
  try {
    return decodeURIComponent(param);
  } catch {
    return param; // malformed escape — use as-is (will simply 404)
  }
}
