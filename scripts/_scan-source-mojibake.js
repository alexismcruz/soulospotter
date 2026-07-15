// Scans source .js/.ts files (scripts/ + prisma/) for mojibake in string literals.
// Usage: node scripts/_scan-source-mojibake.js
const fs = require('fs');
const path = require('path');

// Detect: accented-latin mojibake (Ã?/Â?) OR the 3-byte-sequence mojibake lead "â" + specials.
const RE = /[ÃÂ][-¿]|â€[–—’“”™]/;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(js|ts)$/.test(e.name) && !/_scan-source-mojibake|test-mojibake|validate-no-mojibake|fix-mojibake/.test(e.name)) out.push(p);
  }
  return out;
}

const files = [...walk('scripts'), ...walk('prisma')];
let totalLines = 0;
const dirty = [];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  let count = 0;
  for (const l of lines) if (RE.test(l)) count++;
  if (count) { dirty.push(f); totalLines += count; console.log(String(count).padStart(4), f); }
}
console.log('---');
console.log(`Files with mojibake: ${dirty.length} | total lines: ${totalLines}`);
process.exit(dirty.length ? 1 : 0);
