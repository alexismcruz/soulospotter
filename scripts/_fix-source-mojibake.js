// Repairs mojibake in source .js/.ts files in-place.
// Reconstructs the original UTF-8 byte stream (CP1252-aware) and re-decodes.
// SAFETY: before repairing, verifies the file contains no "genuine" multibyte
// UTF-8 char (a codepoint > 0xFF that is NOT one of the CP1252 mojibake glyphs).
// If a file has genuine UTF-8 mixed in, a whole-file repair would corrupt it — so
// we refuse and report it for manual handling.
//
// Usage:
//   node scripts/_fix-source-mojibake.js            # dry run (reports only)
//   node scripts/_fix-source-mojibake.js --commit    # writes repaired files

const fs = require('fs');
const path = require('path');

const COMMIT = process.argv.includes('--commit');

const CP1252_TO_BYTE = {
  '€': 0x80, '‚': 0x82, 'ƒ': 0x83, '„': 0x84, '…': 0x85,
  '†': 0x86, '‡': 0x87, 'ˆ': 0x88, '‰': 0x89, 'Š': 0x8A,
  '‹': 0x8B, 'Œ': 0x8C, 'Ž': 0x8E, '‘': 0x91, '’': 0x92,
  '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97,
  '˜': 0x98, '™': 0x99, 'š': 0x9A, '›': 0x9B, 'œ': 0x9C,
  'ž': 0x9E, 'Ÿ': 0x9F,
};
const CP1252_GLYPHS = new Set(Object.keys(CP1252_TO_BYTE));
const MOJIBAKE_RE = /[ÃÂ][\x80-\xBF]|â€[–—‘’“”™]/;

function repair(s) {
  const bytes = [];
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (CP1252_TO_BYTE[ch] !== undefined) bytes.push(CP1252_TO_BYTE[ch]);
    else if (cp <= 0xff) bytes.push(cp);
    else bytes.push(...Buffer.from(ch, 'utf8'));
  }
  return Buffer.from(bytes).toString('utf8');
}

// Is a whole-file repair safe? Only if every codepoint > 0xFF is a CP1252 mojibake
// glyph. U+FEFF (BOM) is exempt — it round-trips through repair() unchanged.
function isSafeToRepair(txt) {
  for (const ch of txt) {
    const cp = ch.codePointAt(0);
    if (cp === 0xfeff) continue; // BOM — harmless, repairs to itself
    if (cp > 0xff && !CP1252_GLYPHS.has(ch)) return { safe: false, offender: ch, cp };
  }
  return { safe: true };
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(js|ts)$/.test(e.name) && !/_scan-source-mojibake|_fix-source-mojibake|test-mojibake|validate-no-mojibake|fix-mojibake/.test(e.name)) out.push(p);
  }
  return out;
}

const files = [...walk('scripts'), ...walk('prisma')].filter((f) => MOJIBAKE_RE.test(fs.readFileSync(f, 'utf8')));

console.log(`\n${COMMIT ? 'REPAIRING' : 'DRY RUN'} — ${files.length} file(s) with mojibake\n`);

let repaired = 0, refused = 0;
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  const safety = isSafeToRepair(txt);
  if (!safety.safe) {
    console.log(`  ⚠ REFUSED ${f} — contains genuine UTF-8 char "${safety.offender}" (U+${safety.cp.toString(16).toUpperCase()}); repair manually`);
    refused++;
    continue;
  }
  const fixed = repair(txt);
  if (MOJIBAKE_RE.test(fixed)) {
    console.log(`  ⚠ REFUSED ${f} — repair left residual mojibake; repair manually`);
    refused++;
    continue;
  }
  const before = (txt.match(/[ÃÂ][\x80-\xBF]|â€[–—‘’“”™]/g) || []).length;
  console.log(`  ✓ ${f} — ${before} mojibake sequences repaired`);
  if (COMMIT) fs.writeFileSync(f, fixed, 'utf8');
  repaired++;
}

console.log(`\n${repaired} repaired, ${refused} refused.`);
if (!COMMIT && repaired) console.log('Re-run with --commit to write changes.\n');
