// Append content-done.json entries: node scripts/_log-done.js <script> <notes.json>
const fs = require("fs");
const [script, notesFile] = process.argv.slice(2);
const f = "scripts/content-done.json";
const d = JSON.parse(fs.readFileSync(f, "utf8"));
const notes = JSON.parse(fs.readFileSync(notesFile, "utf8"));
const date = new Date().toISOString().slice(0, 10);
for (const [city, note] of Object.entries(notes)) {
  if (d.some((e) => e.city === city)) { console.log(`already logged: ${city}`); continue; }
  d.push({ city, date, note: `${note} Script: ${script}` });
}
fs.writeFileSync(f, JSON.stringify(d, null, 2) + "\n");
console.log(`logged ${Object.keys(notes).length} cities`);
