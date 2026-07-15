/**
 * Display helpers for the site-wide directory stats (city/spot/region counts).
 *
 * Counts themselves always come from the DB (prisma.city.count / spot.count /
 * groupBy) so display can never drift from reality. These helpers only format.
 */

/**
 * Floor `n` down to the nearest `unit` and append "+", e.g.
 *   approxPlus(321, 100)  -> "300+"
 *   approxPlus(2806, 100) -> "2,800+"
 *
 * Flooring keeps the label truthful as the catalog grows OR shrinks: the real
 * count is always >= the displayed number, so "300+" is never a lie.
 */
export function approxPlus(n: number, unit = 100): string {
  const floored = Math.max(unit, Math.floor(n / unit) * unit);
  return `${floored.toLocaleString("en-US")}+`;
}
