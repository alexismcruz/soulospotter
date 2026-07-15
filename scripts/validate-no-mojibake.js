/**
 * validate-no-mojibake.js
 * Call assertNoMojibake(value, context) anywhere in a seed/import script to
 * blow up loudly before bad data reaches the DB.
 *
 * Usage:
 *   const { assertNoMojibake } = require('./validate-no-mojibake');
 *   assertNoMojibake(city.name, `City.name for slug "${city.slug}"`);
 */

const MOJIBAKE_RE = /[ÃÂ][\x80-\xBF]/;

function hasMojibake(str) {
  return typeof str === 'string' && MOJIBAKE_RE.test(str);
}

function assertNoMojibake(value, context = 'value') {
  if (hasMojibake(value)) {
    throw new Error(
      `Mojibake detected in ${context}: "${value}"\n` +
      `Fix: ensure the source file is read as UTF-8, or repair with:\n` +
      `  Buffer.from(value, 'latin1').toString('utf8')`
    );
  }
}

/**
 * Validate an entire record object against a list of fields.
 * @param {Record<string,unknown>} record
 * @param {string[]} fields
 * @param {string} label  e.g. 'City "pucon"'
 */
function assertRecordNoMojibake(record, fields, label) {
  for (const field of fields) {
    const val = record[field];
    if (typeof val === 'string') assertNoMojibake(val, `${label}.${field}`);
  }
}

module.exports = { hasMojibake, assertNoMojibake, assertRecordNoMojibake };
