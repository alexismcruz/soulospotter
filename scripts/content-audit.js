// Content audit — finds where SouloSpotter is thin and writes CONTENT_BACKLOG.md (ranked).
//
//   node scripts/content-audit.js                       # database only
//   node scripts/content-audit.js --gsc path/Pages.csv  # also weight by Search Console impressions
//
// Re-run after every content push. Record finished work in scripts/content-done.json so it drops off.
// Rule of thumb (learned Sep 2026): enrich with FACTS FROM FIRST-PARTY SOURCES (venue/park websites),
// never mass-generated claims about specific businesses. See CONTENT_BACKLOG.md header.
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const THIN_DESC = 150; // chars
const arg = (name) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : null; };

function loadGsc(file) {
  // Pages.csv: "Top pages,Clicks,Impressions,CTR,Position"
  const impr = {}; // citySlug -> impressions
  if (!file || !fs.existsSync(file)) return null;
  const lines = fs.readFileSync(file, "utf8").replace(/^﻿/, "").trim().split(/\r?\n/).slice(1);
  for (const l of lines) {
    const m = l.match(/^"?(https?:\/\/[^",]+)"?,(\d+),(\d+),/);
    if (!m) continue;
    const p = m[1].replace(/^https?:\/\/[^/]+/, "").split("/").filter(Boolean);
    if (p[0] === "destinations" && p[1]) impr[p[1]] = (impr[p[1]] || 0) + Number(m[3]);
  }
  return impr;
}

(async () => {
  const gsc = loadGsc(arg("--gsc"));
  const donePath = path.join(__dirname, "content-done.json");
  const done = fs.existsSync(donePath) ? JSON.parse(fs.readFileSync(donePath, "utf8")) : [];
  const doneSlugs = new Set(done.map((d) => d.city));

  const cities = await prisma.city.findMany({
    where: { published: true },
    select: {
      slug: true, name: true, soloTips: true, description: true,
      country: { select: { slug: true, name: true } },
      spots: { where: { published: true }, select: { category: true, description: true, address: true, website: true, googleMapsUrl: true, phone: true } },
    },
  });

  const isGenericAddr = (s, cityName) => !s.address || s.address.trim().length < 14 || (s.address.toLowerCase().includes(cityName.toLowerCase()) && s.address.trim().length <= cityName.length + 12);
  const rows = cities.map((c) => {
    const n = c.spots.length;
    const thinDesc = c.spots.filter((s) => (s.description || "").length < THIN_DESC).length;
    const noLink = c.spots.filter((s) => !s.website && !s.googleMapsUrl).length;
    const genericAddr = c.spots.filter((s) => isGenericAddr(s, c.name)).length;
    const acc = c.spots.filter((s) => s.category === "ACCOMMODATION");
    const accNoWeb = acc.filter((s) => !s.website).length;
    const avgDesc = n ? Math.round(c.spots.reduce((a, s) => a + (s.description || "").length, 0) / n) : 0;
    const impressions = gsc ? gsc[c.slug] || 0 : 0;
    // Priority: how much is missing, weighted up by search demand when we have it.
    const missing = thinDesc + noLink * 1.5 + genericAddr * 0.5 + accNoWeb + (acc.length < 3 ? 3 : 0) + (c.soloTips ? 0 : 4);
    const score = Math.round(missing * (1 + Math.log10(1 + impressions)));
    return { slug: c.slug, city: c.name, country: c.country.name, countrySlug: c.country.slug, n, avgDesc, thinDesc, noLink, genericAddr, acc: acc.length, accNoWeb, hasTips: !!c.soloTips, impressions, score, done: doneSlugs.has(c.slug) };
  });

  const open = rows.filter((r) => !r.done).sort((a, b) => b.score - a.score);
  const totals = rows.reduce((t, r) => ({ spots: t.spots + r.n, thin: t.thin + r.thinDesc, noLink: t.noLink + r.noLink, generic: t.generic + r.genericAddr }), { spots: 0, thin: 0, noLink: 0, generic: 0 });

  // Countries with cities but no full guide
  // Guide slugs are read from the source files (no TS loader needed): every `countrySlug: "x"` is a guide.
  const COUNTRY_GUIDE_SLUGS = ["countryGuides.ts", "guideContent.ts"]
    .flatMap((f) => [...fs.readFileSync(path.join(__dirname, "..", "src", "lib", f), "utf8").matchAll(/countrySlug:\s*"([a-z-]+)"/g)].map((m) => m[1]));
  const byCountry = {};
  rows.forEach((r) => { (byCountry[r.countrySlug] ||= { name: r.country, cities: 0, spots: 0, impressions: 0 }); byCountry[r.countrySlug].cities++; byCountry[r.countrySlug].spots += r.n; byCountry[r.countrySlug].impressions += r.impressions; });
  const noGuide = Object.entries(byCountry).filter(([slug]) => !(COUNTRY_GUIDE_SLUGS || []).includes(slug)).sort((a, b) => b[1].impressions - a[1].impressions || b[1].cities - a[1].cities);

  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const L = [];
  L.push("# SouloSpotter content backlog");
  L.push("");
  L.push(`_Generated ${new Date().toISOString().slice(0, 10)} by \`node scripts/content-audit.js${arg("--gsc") ? " --gsc <Pages.csv>" : ""}\`. Do not edit by hand — re-run it. Log finished work in \`scripts/content-done.json\`._`);
  L.push("");
  L.push("## How to enrich (rules)");
  L.push("- Use **first-party facts** only: the venue's own website, the park/tourism-board site, the operator's contact page. Cite the source in the script header, like `scripts/add-simien-accommodation.js`.");
  L.push("- **Never mass-generate** descriptions/claims about specific businesses (hours, menus, prices, awards). If it can't be verified, leave it out or ask Alexis.");
  L.push("- Every enriched spot needs: a real `website` **or** `googleMapsUrl`, a real `address`, and a description over ~250 chars from verified facts. No placeholder links.");
  L.push("- Also check the searched intent (solo dining / going out alone / cafes to meet people) — see `project_soulospotter_seo_baseline` memory.");
  L.push("");
  L.push("## Where we stand");
  L.push(`- Published cities: **${rows.length}** · spots: **${totals.spots}**`);
  L.push(`- Spots with description under ${THIN_DESC} chars: **${totals.thin}** (${pct(totals.thin, totals.spots)}%)`);
  L.push(`- Spots with **no website and no Maps link** (nothing to click): **${totals.noLink}** (${pct(totals.noLink, totals.spots)}%)`);
  L.push(`- Spots with a generic/missing address: **${totals.generic}** (${pct(totals.generic, totals.spots)}%)`);
  L.push(`- Cities with fewer than 3 accommodation spots: **${rows.filter((r) => r.acc < 3).length}** · cities with no solo tips: **${rows.filter((r) => !r.hasTips).length}**`);
  L.push(`- Cities marked done: ${done.length ? done.map((d) => `${d.city} (${d.date})`).join(", ") : "none yet"}`);
  L.push("");
  L.push(`## Top 40 cities to enrich next${gsc ? " (weighted by Search Console impressions)" : " (re-run with --gsc for demand weighting)"}`);
  L.push("");
  L.push("| # | City | Country | Spots | Avg desc | Thin desc | No link | Generic addr | Accom (no site) | Solo tips | GSC impr | Score |");
  L.push("|--:|---|---|--:|--:|--:|--:|--:|--:|:-:|--:|--:|");
  open.slice(0, 40).forEach((r, i) => L.push(`| ${i + 1} | ${r.city} | ${r.country} | ${r.n} | ${r.avgDesc} | ${r.thinDesc} | ${r.noLink} | ${r.genericAddr} | ${r.acc} (${r.accNoWeb}) | ${r.hasTips ? "✓" : "✗"} | ${r.impressions || "–"} | ${r.score} |`));
  L.push("");
  L.push("## Accommodation gaps (fewer than 3 listings — the Simien Mountains problem)");
  L.push("");
  const accGaps = open.filter((r) => r.acc < 3).sort((a, b) => b.impressions - a.impressions || a.acc - b.acc).slice(0, 30);
  accGaps.forEach((r) => L.push(`- **${r.city}**, ${r.country}: ${r.acc} accommodation listing(s)${r.impressions ? ` · ${r.impressions} GSC impressions` : ""}`));
  L.push("");
  L.push("## Countries without a full country guide");
  L.push("");
  L.push("_(guides are the best pages for 'solo travel <country>' searches; see `src/lib/guideContent.ts`)_");
  L.push("");
  if (COUNTRY_GUIDE_SLUGS) noGuide.slice(0, 30).forEach(([slug, c]) => L.push(`- ${c.name} — ${c.cities} cities, ${c.spots} spots${c.impressions ? `, ${c.impressions} GSC impressions` : ""}`));
  else L.push("- (could not load guide list — run from the repo root with ts-node available)");
  L.push("");
  fs.writeFileSync(path.join(__dirname, "..", "CONTENT_BACKLOG.md"), L.join("\n"));
  console.log(`Wrote CONTENT_BACKLOG.md — ${open.length} open cities; top 5:`);
  open.slice(0, 5).forEach((r) => console.log(`  ${r.city} (${r.country}) score ${r.score}: ${r.thinDesc} thin, ${r.noLink} no-link, ${r.acc} accom`));
  await prisma.$disconnect();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
