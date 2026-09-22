// Technical SEO audit of the LIVE site, driven by its own sitemap.
//   node scripts/seo-audit.js [--base https://soulospotter.com] [--spots 300] [--cats 150] [--cities 60]
// 1) HEAD-checks EVERY sitemap URL (status, redirects).  2) Full-fetches a stratified sample and checks title/
// description uniqueness+length, canonical, H1 count, JSON-LD types, noindex, OG image, internal links.
// 3) HEAD-checks every internal link found in the sample (broken-link / 404 detection).  4) robots.txt.
// Writes seo-audit-report.json (gitignored-worthy) and prints a summary.
const fs = require("fs");
const BASE = (process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : "https://soulospotter.com").replace(/\/$/, "");
const num = (n, d) => (process.argv.includes(n) ? Number(process.argv[process.argv.indexOf(n) + 1]) : d);
const N = { spots: num("--spots", 300), cats: num("--cats", 150), cities: num("--cities", 60) };
const UA = { "user-agent": "SouloSpotterSEOAudit/1.0" };

async function pool(items, size, fn) {
  const out = new Array(items.length); let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) { const k = i++; try { out[k] = await fn(items[k], k); } catch (e) { out[k] = { error: String(e.message || e) }; } } }));
  return out;
}
const type = (u) => { const p = new URL(u).pathname.split("/").filter(Boolean); if (!p.length) return "home"; if (p[0] === "destinations") return p.length === 1 ? "destinations-index" : p.length === 2 ? "city" : p.length === 3 ? "category" : "spot"; return p[0]; };
const pick = (arr, n) => { const a = [...arr].sort(() => Math.random() - 0.5); return a.slice(0, n); };
const dec = (s) => (s || "").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');

(async () => {
  const t0 = Date.now();
  const sm = await (await fetch(`${BASE}/sitemap.xml`, { headers: UA })).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const byType = urls.reduce((a, u) => ((a[type(u)] = (a[type(u)] || 0) + 1), a), {});
  console.log(`sitemap: ${urls.length} URLs`, JSON.stringify(byType));
  const dupes = urls.length - new Set(urls).size;

  // robots
  const robots = await (await fetch(`${BASE}/robots.txt`, { headers: UA })).text();

  // 1) status of every sitemap URL
  console.log("HEAD-checking all sitemap URLs…");
  const status = {};
  await pool(urls, 10, async (u) => { const r = await fetch(u, { method: "HEAD", redirect: "manual", headers: UA }); status[u] = { s: r.status, loc: r.headers.get("location") }; });
  const bad = Object.entries(status).filter(([, v]) => v.s !== 200).map(([u, v]) => ({ u, ...v }));
  console.log(`  non-200: ${bad.length}`);

  // 2) sample full fetch
  const sample = [
    ...pick(urls.filter((u) => type(u) === "spot"), N.spots),
    ...pick(urls.filter((u) => type(u) === "category"), N.cats),
    ...pick(urls.filter((u) => type(u) === "city"), N.cities),
    ...urls.filter((u) => !["spot", "category", "city"].includes(type(u))).slice(0, 80),
  ];
  console.log(`Full-fetching ${sample.length} sampled pages…`);
  const pages = await pool(sample, 8, async (u) => {
    const r = await fetch(u, { headers: UA }); const h = await r.text();
    const title = dec((h.match(/<title>([^<]*)<\/title>/) || [])[1]);
    const desc = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
    const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    const robotsMeta = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
    const h1s = (h.match(/<h1[\s>]/g) || []).length;
    const ld = [...new Set([...h.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]))];
    const og = /property="og:image"/.test(h);
    const links = [...new Set([...h.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]))].filter((l) => !l.startsWith("/_next") && !l.startsWith("/api/") && !/\.(png|jpe?g|svg|webp|ico|css|js|xml|txt)$/i.test(l));
    return { u, t: type(u), status: r.status, title, tl: title.length, desc, dl: desc.length, canon, canonOk: canon === u, robotsMeta, h1s, ld, og, links, bytes: h.length };
  });
  const ok = pages.filter((p) => !p.error);

  const dupBy = (key) => { const m = {}; ok.forEach((p) => p[key] && (m[p[key]] = (m[p[key]] || []).concat(p.u))); return Object.entries(m).filter(([, v]) => v.length > 1).map(([k, v]) => ({ [key]: k.slice(0, 90), n: v.length, ex: v.slice(0, 2) })); };
  const issues = {
    notCanonicalSelf: ok.filter((p) => !p.canonOk).map((p) => ({ u: p.u, canon: p.canon })),
    noindex: ok.filter((p) => /noindex/.test(p.robotsMeta || "")).map((p) => p.u),
    missingTitle: ok.filter((p) => !p.title).map((p) => p.u),
    titleTooLong: ok.filter((p) => p.tl > 70).map((p) => ({ u: p.u, len: p.tl })),
    titleShort: ok.filter((p) => p.tl && p.tl < 20).map((p) => ({ u: p.u, len: p.tl })),
    missingDesc: ok.filter((p) => !p.desc).map((p) => p.u),
    descShort: ok.filter((p) => p.desc && p.dl < 70).map((p) => ({ u: p.u, len: p.dl })),
    descTooLong: ok.filter((p) => p.dl > 170).map((p) => ({ u: p.u, len: p.dl })),
    h1NotOne: ok.filter((p) => p.h1s !== 1).map((p) => ({ u: p.u, h1s: p.h1s })),
    noJsonLd: ok.filter((p) => p.ld.length === 0).map((p) => p.u),
    duplicateTitles: dupBy("title"),
    duplicateDescriptions: dupBy("desc"),
  };
  const ldByType = {}; ok.forEach((p) => { (ldByType[p.t] ||= {}); p.ld.forEach((k) => (ldByType[p.t][k] = (ldByType[p.t][k] || 0) + 1)); });
  const ogByType = {}; ok.forEach((p) => { (ogByType[p.t] ||= { n: 0, og: 0 }); ogByType[p.t].n++; if (p.og) ogByType[p.t].og++; });

  // 3) internal links found → status
  const linkSet = [...new Set(ok.flatMap((p) => p.links))].map((l) => BASE + l);
  const need = linkSet.filter((l) => !(l in status) && !(l.replace(/\/$/, "") in status));
  console.log(`Checking ${need.length} additional internal links…`);
  const lstat = {};
  await pool(need, 10, async (u) => { const r = await fetch(u, { method: "HEAD", redirect: "manual", headers: UA }); lstat[u] = r.status; });
  const brokenLinks = Object.entries(lstat).filter(([, s]) => s >= 400).map(([u, s]) => ({ u, s }));
  const redirectLinks = Object.entries(lstat).filter(([, s]) => s >= 300 && s < 400).map(([u, s]) => ({ u, s }));

  const linkCounts = {}; ok.forEach((p) => { (linkCounts[p.t] ||= []).push(p.links.length); });
  const avg = (a) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
  const report = { base: BASE, when: new Date().toISOString(), sitemap: { total: urls.length, byType, duplicateUrls: dupes, nonOk: bad.length, bad: bad.slice(0, 30) }, robots: robots.slice(0, 500), sampled: sample.length, issueCounts: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length])), issues: Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.slice(0, 8)])), jsonLdByType: ldByType, ogImageByType: ogByType, avgInternalLinksByType: Object.fromEntries(Object.entries(linkCounts).map(([k, v]) => [k, avg(v)])), links: { checked: need.length, broken: brokenLinks.slice(0, 30), brokenCount: brokenLinks.length, redirects: redirectLinks.slice(0, 15), redirectCount: redirectLinks.length }, seconds: Math.round((Date.now() - t0) / 1000) };
  fs.writeFileSync("seo-audit-report.json", JSON.stringify(report, null, 1));
  console.log(JSON.stringify({ sitemap: report.sitemap, issueCounts: report.issueCounts, jsonLdByType: ldByType, ogImageByType: ogByType, avgInternalLinksByType: report.avgInternalLinksByType, links: { checked: report.links.checked, brokenCount: report.links.brokenCount, redirectCount: report.links.redirectCount }, seconds: report.seconds }, null, 1));
})().catch((e) => { console.error("AUDIT ERROR:", e); process.exit(1); });
