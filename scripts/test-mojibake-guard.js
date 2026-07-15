/**
 * test-mojibake-guard.js
 * Self-running unit tests for validate-no-mojibake.js and the CP1252 repair logic,
 * using Node's built-in assert (no test-runner dependency).
 * Run with: node scripts/test-mojibake-guard.js  (or `npm test`)
 * Exit code 0 = all passed. Non-zero = failure (CI / pre-commit friendly).
 *
 * Mojibake strings are built programmatically from raw UTF-8 bytes so there is
 * zero ambiguity about which quote/dash characters the literals contain.
 */

const assert = require('assert');
const { hasMojibake, assertNoMojibake, assertRecordNoMojibake } = require('./validate-no-mojibake');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${e.message}`);
    failed++;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

// Produce the mojibake form of a clean UTF-8 string exactly the way it happened
// in the DB: take the correct UTF-8 bytes and decode them as Windows-1252.
function toMojibake(clean) {
  const bytes = Buffer.from(clean, 'utf8');
  // Minimal CP1252 high-range decode (0x80–0x9F specials; 0xA0–0xFF == latin1).
  const CP1252 = {
    0x80: '€', 0x82: '‚', 0x83: 'ƒ', 0x84: '„', 0x85: '…',
    0x86: '†', 0x87: '‡', 0x88: 'ˆ', 0x89: '‰', 0x8A: 'Š',
    0x8B: '‹', 0x8C: 'Œ', 0x8E: 'Ž', 0x91: '‘', 0x92: '’',
    0x93: '“', 0x94: '”', 0x95: '•', 0x96: '–', 0x97: '—',
    0x98: '˜', 0x99: '™', 0x9A: 'š', 0x9B: '›', 0x9C: 'œ',
    0x9E: 'ž', 0x9F: 'Ÿ',
  };
  let out = '';
  for (const b of bytes) {
    if (b < 0x80) out += String.fromCharCode(b);
    else if (CP1252[b] !== undefined) out += CP1252[b];
    else out += String.fromCharCode(b); // 0xA0–0xFF map 1:1
  }
  return out;
}

// The repair function under test (kept in sync with scripts/fix-mojibake.ts).
const CP1252_TO_BYTE = {
  '€': 0x80, '‚': 0x82, 'ƒ': 0x83, '„': 0x84, '…': 0x85,
  '†': 0x86, '‡': 0x87, 'ˆ': 0x88, '‰': 0x89, 'Š': 0x8A,
  '‹': 0x8B, 'Œ': 0x8C, 'Ž': 0x8E, '‘': 0x91, '’': 0x92,
  '“': 0x93, '”': 0x94, '•': 0x95, '–': 0x96, '—': 0x97,
  '˜': 0x98, '™': 0x99, 'š': 0x9A, '›': 0x9B, 'œ': 0x9C,
  'ž': 0x9E, 'Ÿ': 0x9F,
};
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

console.log('\nMojibake guard tests\n');

// ── hasMojibake detection ────────────────────────────────────────────────────

test('detects mojibake in "São Paulo"', () => {
  assert.strictEqual(hasMojibake(toMojibake('São Paulo')), true);
});

test('detects mojibake in "Pucón"', () => {
  assert.strictEqual(hasMojibake(toMojibake('Pucón')), true);
});

test('detects mojibake in "café"', () => {
  assert.strictEqual(hasMojibake(toMojibake('café')), true);
});

test('clean ASCII string returns false', () => {
  assert.strictEqual(hasMojibake('Bangkok'), false);
});

test('clean accented string returns false', () => {
  assert.strictEqual(hasMojibake('São Paulo'), false);
  assert.strictEqual(hasMojibake('Pucón'), false);
});

test('null / undefined returns false', () => {
  assert.strictEqual(hasMojibake(null), false);
  assert.strictEqual(hasMojibake(undefined), false);
});

// ── repair round-trip ────────────────────────────────────────────────────────

for (const clean of ['São Paulo', 'Pucón', 'Asunción', 'Baños', 'Florianópolis', 'Bogotá']) {
  test(`repair restores accented name "${clean}"`, () => {
    const broken = toMojibake(clean);
    assert.notStrictEqual(broken, clean); // sanity: it really is corrupted
    assert.strictEqual(repair(broken), clean);
    assert.strictEqual(hasMojibake(repair(broken)), false);
  });
}

test('repair restores em-dash without data loss (no replacement char)', () => {
  const clean = 'café — a striking A-frame';
  const broken = toMojibake(clean);
  const fixed = repair(broken);
  assert.strictEqual(fixed, clean);
  assert.ok(!fixed.includes('�'), 'must not contain replacement char');
});

test('repair restores smart quotes and bullets', () => {
  const clean = 'the island’s best “granola bowls” • daily';
  const broken = toMojibake(clean);
  assert.strictEqual(repair(broken), clean);
});

test('repair is idempotent for clean ASCII strings', () => {
  assert.strictEqual(repair('Bangkok'), 'Bangkok');
});

test('naive latin1 repair WOULD corrupt em-dash (regression guard)', () => {
  const broken = toMojibake('café — a striking');
  const naive = Buffer.from(broken, 'latin1').toString('utf8');
  assert.ok(naive.includes('�'), 'naive latin1 path is expected to be lossy');
});

// ── assertNoMojibake ─────────────────────────────────────────────────────────

test('assertNoMojibake passes on clean string', () => {
  assert.doesNotThrow(() => assertNoMojibake('São Paulo', 'City.name'));
});

test('assertNoMojibake throws on broken string', () => {
  assert.throws(() => assertNoMojibake(toMojibake('São Paulo'), 'City.name'), /Mojibake detected/);
});

// ── assertRecordNoMojibake ───────────────────────────────────────────────────

test('assertRecordNoMojibake passes on clean record', () => {
  assert.doesNotThrow(() =>
    assertRecordNoMojibake({ name: 'São Paulo', description: 'A great city' }, ['name', 'description'], 'City "sao-paulo"')
  );
});

test('assertRecordNoMojibake throws on broken name field', () => {
  assert.throws(
    () => assertRecordNoMojibake({ name: toMojibake('São Paulo'), description: 'Fine' }, ['name', 'description'], 'City "sao-paulo"'),
    /Mojibake detected in City "sao-paulo"\.name/,
  );
});

test('assertRecordNoMojibake skips non-string fields silently', () => {
  assert.doesNotThrow(() =>
    assertRecordNoMojibake({ name: 'Bangkok', count: 42, active: true }, ['name', 'count', 'active'], 'City')
  );
});

test('seed guard catches mojibake before DB write', () => {
  const cityData = { name: toMojibake('Pucón'), slug: 'pucon', region: 'LATIN_AMERICA' };
  assert.throws(() => assertRecordNoMojibake(cityData, ['name'], `City "${cityData.slug}"`), /Mojibake detected/);
});

// ── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
