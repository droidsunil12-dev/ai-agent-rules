#!/usr/bin/env node
// ship-check: catches layout MISALIGNMENT that a casual screenshot misses.
// Usage: node ship-check.js <target-folder-or-url>
//   - target = local folder (reads index/products html) OR a live URL.
//   - For a URL: serves over localhost is NOT usable in Aside browser; this script
//     instead runs in-page via the Aside REPL (see bottom: emit JS snippet).
// Static mode: grep the HTML for CTA/hero/btn-row flex containers whose parent is
// text-center but the row lacks justify-center/justify-between, plus overflow-x tells.
// This is the "alignment sweep" that the screenshot never caught.
const fs = require('fs');
const path = require('path');

function findHtmlTargets(root) {
  // collect .html under root (skip node_modules)
  const out = [];
  function walk(d){
    for (const e of fs.readdirSync(d, {withFileTypes:true})) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (e.name!=='node_modules') walk(p); }
      else if (e.name.endsWith('.html')) out.push(p);
    }
  }
  walk(root);
  return out;
}

function main() {
  const arg = process.argv[2];
  if (!arg) { console.log('usage: node ship-check.js <folder> [onlyThisFile]'); process.exit(2); }
  let files;
  if (fs.existsSync(arg) && fs.statSync(arg).isDirectory()) files = findHtmlTargets(arg);
  else files = [arg];
  const only = process.argv[3];
  if (only) files = files.filter(f => f.includes(only));

  let fails = 0, warns = 0;
  for (const f of files) {
    const blob = fs.readFileSync(f, 'utf8');
    const lines = [];
    // Pattern A: a centered parent (text-center) containing a flex row without justify-*.
    // Heuristic: same line has 'text-center' AND 'flex' but no 'justify-'.
    const rowRe = /<div[^>]*class="[^"]*(flex|grid)[^"]*"[^>]*>/g;
    blob.split('\n').forEach((line, i) => {
      if (/\bflex\b/.test(line) && !/(justify-center|justify-between|justify-end|justify-start|justify-around|justify-evenly|items-)/.test(line)) {
        // is it inside/after a text-center context on same or previous line?
        const ctx = blob.substring(Math.max(0, blob.indexOf(line)-600), blob.indexOf(line)+400);
        if (/text-center/.test(ctx)) {
          fails++;
          lines.push(`L${i+1} [ALIGN] flex row has no justify-* but sits in a text-center context -> will look left-biased/ragged. Add justify-center (or justify-between). :: ${(line.trim().slice(0,90))}`);
        }
      }
      // Pattern B: overflow-x not clipped (a horizontal-overflow tell)
      if (/overflow-x:\s*(auto|scroll)/.test(line)) { warns++; lines.push(`L${i+1} [OVERFLOW] overflow-x:auto/scroll can cause horizontal scroll. Prefer overflow-x:clip where intentional.`); }
      // Pattern C: a row with large inline margin-left/right asymmetry (manual centering hack)
      const m = line.match(/margin-(left|right)[:\s"]+(\d{2,}px)/g) || [];
      if (m.length>=2 && m[0]!==m[1]) { warns++; lines.push(`L${i+1} [SYM] asymmetric inline margins ${m.join(' vs ')} -> misaligned block. Prefer auto margins.`); }
    });
    if (lines.length) {
      console.log(`\n=== ${f} ===`);
      console.log(lines.join('\n'));
    }
  }
  console.log(`\n[ship-check] ${fails} ALIGN FAIL, ${warns} OVERFLOW/SYM warns, ${files.length} file(s) scanned.`);
  process.exit(fails ? 1 : 0);
}
main();
