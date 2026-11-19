// ship-check: live MISALIGNMENT / overflow sweep. Catches what a glance screenshot misses.
// How to run (Aside REPL), after opening the page in a tab `pg`:
//   const report = await shipCheckAlignment(pg);
//   console.log(report.text);
//   console.log(report.items.map(i=>`"${i.label}" L=${i.leftGap} R=${i.rightGap} (${i.asym}x) jc=${i.jc||'none'}`).join('\n'));
//
// Checks (per flex/grid row with >=2 visible children):
//  MISALIGNED: parent is text-center (or row textAlign center) but the row has no justify-center/between/...
//   and the left vs right empty gutter is asymmetric (bigger side >= minAsymRatio x smaller side AND
//   >= minAsymPx). This is the Narangpur "buttons hug left, empty space right" bug. A glance screenshot
//   misses it because it still "looks fine".
//  OVERFLOW: document scrollWidth > clientWidth (horizontal scroll on mobile).
//
// It does NOT judge "looks fine". It measures actual gutter widths. Run at 1280 (desktop) and 375 (mobile).
const shipCheckAlignment = async (page, opts = {}) => {
  const minAsymRatio = opts.minAsymRatio ?? 1.5;
  const minAsymPx    = opts.minAsymPx    ?? 48;
  const r = await page.evaluate(({ minAsymRatio, minAsymPx }) => {
    const vw = document.documentElement.clientWidth;
    const overflow = document.documentElement.scrollWidth > vw + 2;
    const rows = Array.from(document.querySelectorAll('div,ul,ol,nav,section,article,header,footer')).filter(el => {
      const d = getComputedStyle(el).display;
      return (d === 'flex' || d === 'grid') && el.children.length >= 2;
    });
    const items = [];
    for (const row of rows) {
      const rr = row.getBoundingClientRect();
      if (rr.width < 40 || rr.height < 12) continue;
      const cs = getComputedStyle(row);
      const jc = cs.justifyContent;
      const kids = Array.from(row.children).filter(k => k.offsetParent !== null);
      if (kids.length < 2) continue;
      const leftGap  = kids[0].getBoundingClientRect().left - rr.left;
      const rightGap = rr.right - kids[kids.length - 1].getBoundingClientRect().right;
      if (leftGap < -1 || rightGap < -1) continue;             // negative = overflow, caught separately
      const asym = Math.max(leftGap, rightGap) / Math.max(1, Math.min(leftGap, rightGap));
      const biggest = Math.max(leftGap, rightGap);
      const centeredParent = /text-center/.test((row.parentElement && row.parentElement.className) || '')
        || /text-center/.test((row.className || ''))
        || getComputedStyle(row.parentElement || document.body).textAlign === 'center'
        || cs.textAlign === 'center';
      const misaligned = centeredParent
        && !/(center|between|around|evenly|space-)/.test(jc || '')
        && asym >= minAsymRatio && biggest >= minAsymPx;
      items.push({
        label: (row.querySelector('h1,h2,h3,a,button,strong')?.textContent || row.className || 'row').trim().slice(0,40),
        jc: jc || 'none', leftGap: Math.round(leftGap), rightGap: Math.round(rightGap),
        asym: +asym.toFixed(2), misaligned,
      });
    }
    return { flagged: items.filter(i => i.misaligned), allRows: items.length, overflow, vw };
  }, { minAsymRatio, minAsymPx });
  const lines = [`[ship-check] ${r.vw}px · ${r.allRows} rows · overflow: ${r.overflow ? 'YES' : 'no'}`];
  if (r.flagged.length) {
    lines.push(`  MISALIGNED (${r.flagged.length}):`);
    for (const f of r.flagged) lines.push(`    • "${f.label}" L=${f.leftGap}px R=${f.rightGap}px (${f.asym}x) jc=${f.jc} → add justify-center (or intentional-align)`);
  } else lines.push('  no misaligned centered rows found.');
  return { text: lines.join('\n'), items: r.flagged, raw: r };
};
module.exports = shipCheckAlignment;
