import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { SpotCategory } from "@prisma/client";

/**
 * "More <category> in other cities" — internal links between category pages, which are the site's
 * top-performing pages (Search Console, Sep 2026). Prefers other cities in the same country, then
 * fills from the same region, so links stay relevant. Renders nothing if there's nothing to link.
 */
export default async function RelatedCityCategories({
  citySlug,
  countryId,
  region,
  category,
  categorySlug,
  categoryLabel,
  countryName,
}: {
  citySlug: string;
  countryId: string;
  region: string;
  category: SpotCategory;
  categorySlug: string;
  categoryLabel: string;
  countryName: string;
}) {
  const select = {
    slug: true,
    name: true,
    countryId: true,
    country: { select: { name: true } },
    _count: { select: { spots: { where: { published: true, category } } } },
  } as const;
  const base = { published: true, NOT: { slug: citySlug }, spots: { some: { published: true, category } } };

  // Optional extra: if the database hiccups, hide this block instead of failing the whole page.
  let picked: Awaited<ReturnType<typeof prisma.city.findMany<{ select: typeof select }>>> = [];
  let fromRegion: typeof picked = [];
  try {
    const sameCountry = await prisma.city.findMany({ where: { ...base, countryId }, select, take: 8 });
    picked = sameCountry.sort((a, b) => b._count.spots - a._count.spots).slice(0, 4);
    if (picked.length < 4) {
      fromRegion = (
        await prisma.city.findMany({
          where: { ...base, region: region as never, NOT: [{ slug: citySlug }, { countryId }] },
          select,
          take: 12,
        })
      )
        .sort((a, b) => b._count.spots - a._count.spots)
        .slice(0, 4 - picked.length);
    }
  } catch (err) {
    console.error("[RelatedCityCategories] query failed, hiding block:", err instanceof Error ? err.message.slice(0, 120) : err);
    return null;
  }
  const links = [...picked, ...fromRegion];
  if (links.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold text-soulo-dark mb-4">
        {categoryLabel} in other cities{picked.length ? ` in ${countryName} and nearby` : ""}
      </h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {links.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/destinations/${c.slug}/${categorySlug}`}
              className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-soulo-border bg-white hover:border-soulo-gold hover:-translate-y-0.5 transition-all"
            >
              <span className="font-semibold text-soulo-dark">
                {categoryLabel} in {c.name}
                <span className="block text-xs font-normal text-soulo-mist">{c.country.name}</span>
              </span>
              <span className="text-xs text-soulo-mist whitespace-nowrap">{c._count.spots} spots →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
