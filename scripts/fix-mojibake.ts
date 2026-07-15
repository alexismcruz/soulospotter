/**
 * fix-mojibake.ts
 * Repairs double-encoded UTF-8 (mojibake) in City, Country, Spot, and Experience name fields.
 *
 * Dry-run by default — prints every before → after.
 * Pass --commit to persist changes to the DB.
 * Slugs are never touched.
 *
 * Usage:
 *   npx tsx scripts/fix-mojibake.ts           # dry run
 *   npx tsx scripts/fix-mojibake.ts --commit   # write to DB
 */

import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const COMMIT = process.argv.includes('--commit');

// ─── Mojibake detection & repair ─────────────────────────────────────────────

/**
 * Classic UTF-8 mojibake: UTF-8 bytes were misread as Latin-1.
 * U+00C3 (Ã) and U+00C2 (Â) are the UTF-8 lead bytes 0xC3 / 0xC2,
 * followed by a continuation byte 0x80–0xBF which appears as U+0080–U+00BF.
 */
function isMojibake(s: string): boolean {
  return /[ÃÂ][\x80-\xBF]/.test(s);
}

/**
 * The mojibake was produced by decoding UTF-8 bytes as Windows-1252 (CP1252),
 * NOT strict Latin-1. For bytes 0xA0–0xFF the two encodings are identical, so
 * accented letters (é, ñ, ó…) round-trip fine with a plain latin1 decode.
 * But bytes 0x80–0x9F map to distinct printable glyphs in CP1252 (€ – — ' ' " " …),
 * and a latin1 decode of those would corrupt them into replacement chars.
 * This reverse map lets us recover the original byte for those CP1252 glyphs.
 */
const CP1252_TO_BYTE: Record<string, number> = {
  '€': 0x80, '‚': 0x82, 'ƒ': 0x83, '„': 0x84,
  '…': 0x85, '†': 0x86, '‡': 0x87, 'ˆ': 0x88,
  '‰': 0x89, 'Š': 0x8A, '‹': 0x8B, 'Œ': 0x8C,
  'Ž': 0x8E, '‘': 0x91, '’': 0x92, '“': 0x93,
  '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97,
  '˜': 0x98, '™': 0x99, 'š': 0x9A, '›': 0x9B,
  'œ': 0x9C, 'ž': 0x9E, 'Ÿ': 0x9F,
};

function repair(s: string): string {
  // Reconstruct the original UTF-8 byte stream, then decode it correctly.
  const bytes: number[] = [];
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    const cp1252 = CP1252_TO_BYTE[ch];
    if (cp1252 !== undefined) {
      bytes.push(cp1252);            // CP1252-specific glyph → its original byte
    } else if (cp <= 0xff) {
      bytes.push(cp);                // Latin-1 range → byte value is the code point
    } else {
      // Genuine multi-byte char (not part of the mojibake) — preserve as-is.
      bytes.push(...Buffer.from(ch, 'utf8'));
    }
  }
  return Buffer.from(bytes).toString('utf8');
}

/** Returns repaired string, or null if no mojibake was detected. */
function tryRepair(s: string | null | undefined): string | null {
  if (!s || !isMojibake(s)) return null;
  const fixed = repair(s);
  // Sanity-check: repaired string must not still contain mojibake sequences.
  if (isMojibake(fixed)) return null;
  return fixed;
}

// ─── withRetry ───────────────────────────────────────────────────────────────

async function withRetry<T>(fn: () => Promise<T>, retries = 5): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: unknown) {
      if (i === retries - 1) throw e;
      const delay = 1500 * (i + 1);
      console.warn(`  ⚠ DB error, retrying in ${delay}ms…`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('unreachable');
}

// ─── Field scanners ──────────────────────────────────────────────────────────

type Fix = { id: string; field: string; before: string; after: string };

function scanFields<T extends Record<string, unknown>>(
  record: T,
  id: string,
  fields: (keyof T & string)[],
): Fix[] {
  const fixes: Fix[] = [];
  for (const field of fields) {
    const val = record[field];
    if (typeof val !== 'string') continue;
    const fixed = tryRepair(val);
    if (fixed) fixes.push({ id, field, before: val, after: fixed });
  }
  return fixes;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 Scanning for mojibake… (${COMMIT ? 'COMMIT mode' : 'DRY RUN'})\n`);

  const stats: Record<string, number> = {
    Country: 0,
    City: 0,
    Spot: 0,
    Experience: 0,
  };

  // ── Countries ──────────────────────────────────────────────────────────────
  console.log('── Countries ──────────────────────────────────');
  const countries = await withRetry(() => prisma.country.findMany({ select: { id: true, name: true } }));
  for (const c of countries) {
    const fixes = scanFields(c, c.id, ['name']);
    for (const fix of fixes) {
      console.log(`  [Country] ${fix.before}  →  ${fix.after}`);
      if (COMMIT) {
        await withRetry(() =>
          prisma.country.update({ where: { id: fix.id }, data: { [fix.field]: fix.after } })
        );
      }
      stats.Country++;
    }
  }
  if (stats.Country === 0) console.log('  ✓ No issues found');

  // ── Cities ─────────────────────────────────────────────────────────────────
  console.log('\n── Cities ─────────────────────────────────────');
  const cities = await withRetry(() =>
    prisma.city.findMany({
      select: { id: true, name: true, description: true, soloTips: true, language: true, currency: true, timezone: true },
    })
  );

  // Group fixes per city so we can do a single update per record
  const cityUpdates: Record<string, Record<string, string>> = {};
  for (const city of cities) {
    const fixes = scanFields(city, city.id, ['name', 'description', 'soloTips', 'language', 'currency', 'timezone']);
    for (const fix of fixes) {
      console.log(`  [City.${fix.field}] ${fix.before.slice(0, 80)}  →  ${fix.after.slice(0, 80)}`);
      if (!cityUpdates[fix.id]) cityUpdates[fix.id] = {};
      cityUpdates[fix.id][fix.field] = fix.after;
      stats.City++;
    }
  }
  if (COMMIT) {
    for (const [id, data] of Object.entries(cityUpdates)) {
      await withRetry(() => prisma.city.update({ where: { id }, data }));
    }
  }
  if (stats.City === 0) console.log('  ✓ No issues found');

  // ── Spots ──────────────────────────────────────────────────────────────────
  console.log('\n── Spots ──────────────────────────────────────');
  const spots = await withRetry(() =>
    prisma.spot.findMany({
      select: { id: true, name: true, description: true, address: true },
    })
  );

  const spotUpdates: Record<string, Record<string, string>> = {};
  for (const spot of spots) {
    const fixes = scanFields(spot, spot.id, ['name', 'description', 'address']);
    for (const fix of fixes) {
      console.log(`  [Spot.${fix.field}] ${fix.before.slice(0, 80)}  →  ${fix.after.slice(0, 80)}`);
      if (!spotUpdates[fix.id]) spotUpdates[fix.id] = {};
      spotUpdates[fix.id][fix.field] = fix.after;
      stats.Spot++;
    }
  }
  if (COMMIT) {
    for (const [id, data] of Object.entries(spotUpdates)) {
      await withRetry(() => prisma.spot.update({ where: { id }, data }));
    }
  }
  if (stats.Spot === 0) console.log('  ✓ No issues found');

  // ── Experiences ────────────────────────────────────────────────────────────
  console.log('\n── Experiences ────────────────────────────────');
  const experiences = await withRetry(() =>
    prisma.experience.findMany({
      select: { id: true, name: true, description: true, duration: true, frequency: true },
    })
  );

  const expUpdates: Record<string, Record<string, string>> = {};
  for (const exp of experiences) {
    const fixes = scanFields(exp, exp.id, ['name', 'description', 'duration', 'frequency']);
    for (const fix of fixes) {
      console.log(`  [Experience.${fix.field}] ${fix.before.slice(0, 80)}  →  ${fix.after.slice(0, 80)}`);
      if (!expUpdates[fix.id]) expUpdates[fix.id] = {};
      expUpdates[fix.id][fix.field] = fix.after;
      stats.Experience++;
    }
  }
  if (COMMIT) {
    for (const [id, data] of Object.entries(expUpdates)) {
      await withRetry(() => prisma.experience.update({ where: { id }, data }));
    }
  }
  if (stats.Experience === 0) console.log('  ✓ No issues found');

  // ── Summary ────────────────────────────────────────────────────────────────
  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  console.log('\n──────────────────────────────────────────────');
  console.log(`\n📊 Fields needing repair:`);
  for (const [table, count] of Object.entries(stats)) {
    console.log(`  ${table.padEnd(12)} ${count}`);
  }
  console.log(`  ${'TOTAL'.padEnd(12)} ${total}`);

  if (!COMMIT && total > 0) {
    console.log('\n⚠️  Dry run complete — no changes written.');
    console.log('   Re-run with --commit to apply fixes.\n');
  } else if (COMMIT && total > 0) {
    console.log('\n✅ All fixes committed to DB.\n');
  } else {
    console.log('\n✅ Database is clean — no mojibake found.\n');
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
