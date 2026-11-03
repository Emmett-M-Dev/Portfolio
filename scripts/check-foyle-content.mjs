// Fails if the Foyle case study leaks anything it must not: real names listed in the
// gitignored .foyle-banned.txt (one per line), the diet supplement price, "What's new",
// Radar, or hype words. Usage: node scripts/check-foyle-content.mjs [extra dir, e.g. out]
import fs from "node:fs";
import path from "node:path";

if (!fs.existsSync(".foyle-banned.txt")) { console.error("Missing .foyle-banned.txt (one real name per line)."); process.exit(1); }
const names = fs.readFileSync(".foyle-banned.txt", "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const rules = [
  ...names.map((n) => ({ why: "banned name", re: new RegExp(`(?<![\\p{L}])${esc(n)}(?![\\p{L}])`, "iu") })),
  { why: "diet supplement price", re: /£\s?15\b|diet supplement[^.\n]{0,20}£/i },
  { why: "What's new screen", re: /what(&apos;|'|’)s new/i },
  { why: "Radar", re: /\bradar\b/i },
  { why: "hype word", re: /\b(leverag(e|ed|ing)|cutting-edge|seamless(ly)?|revolutioni[sz])/i },
];
const roots = ["src/lib/foyle.ts", "src/app/foyle", "src/components/foyle", ...process.argv.slice(2)];
const TEXT = /\.(tsx?|mjs|js|html|txt|json|css|md)$/;
const files = [];
const walk = (p) => { if (!fs.existsSync(p)) return; const s = fs.statSync(p); if (s.isDirectory()) { if (path.basename(p) === "_next") return; } if (s.isDirectory()) for (const f of fs.readdirSync(p)) walk(path.join(p, f)); else if (TEXT.test(p)) files.push(p); };
roots.forEach(walk);
let bad = 0;
for (const f of files) {
  fs.readFileSync(f, "utf8").split(/\r?\n/).forEach((line, i) => {
    for (const r of rules) if (r.re.test(line)) { bad++; console.log(`${f}:${i + 1}: ${r.why}`); }
  });
}
console.log(bad ? `FAIL ${bad} problem(s) in ${files.length} files` : `PASS ${files.length} files clean`);
process.exit(bad ? 1 : 0);
