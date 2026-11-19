// Read-only Type-A preflight. The canonical workflow and approval semantics are in AGENTS.md §0.0.
// Node: node type-a-preflight.cjs <absolute-project-root> <--style-guide|--brand-kit|--screen-images|<screen-id>|--qa>
// Aside REPL: read this trusted skill helper with fs.readFile and evaluate it;
// await preflightTypeA(fs, path, projectRoot, screenId). Never evaluate project files.
const TYPE_A_HOLD_MS = 90_000;

// read() supplies persisted session messages; this cannot see undispatched host input.
async function waitForTypeADecision({ read, shownAt, after = shownAt, now = Date.now, pause }) {
  if (!Number.isFinite(shownAt) || !Number.isFinite(after) || shownAt > now()) throw Error('Use the actual posted decision timestamp.');
  const deadline = shownAt + TYPE_A_HOLD_MS;
  for (;;) {
    const rows = await read();
    if (!Array.isArray(rows)) throw Error('Live session reader did not return messages.');
    const replies = rows.filter(row => row.role === 'user' && Number.isFinite(row.timestamp) && row.timestamp > after && row.timestamp <= deadline).sort((a,b) => a.timestamp - b.timestamp);
    if (replies.length) return {kind:'reply', replies, deadline};
    const remaining = deadline - now();
    if (remaining <= 0) return {kind:'elapsed', deadline, checkedAt:now()};
    await pause(Math.min(2500,remaining));
  }
}

async function preflightTypeA(fs, path, root, request) {
  const failures = [];
  const nonempty = x => typeof x === 'string' && x.trim() !== '';
  const base = path.resolve(root);
  const baseStat = await fs.lstat(base).catch(() => null);
  if (!baseStat?.isDirectory() || baseStat.isSymbolicLink()) return {ok:false, failures:['Project root must be a real directory.']};
  async function regular(rel) {
    if (!nonempty(rel) || path.isAbsolute(rel) || rel.includes(':')) return null;
    const parts = rel.split(/[\\/]/);
    if (parts.some(p => !p || /^[. ]+$/.test(p))) return null;
    let full = base, stat;
    for (const part of parts) {
      full = path.join(full, part);
      stat = await fs.lstat(full).catch(() => null);
      if (!stat || stat.isSymbolicLink()) return null;
    }
    return stat?.isFile() && stat.size > 0 ? full : null;
  }
  // Read real image dimensions from a file (PNG big-endian header; JPEG SOF fallback). Returns {width,height} or null.
  async function imageDims(rel) {
    const full = await regular(rel); if (!full) return null;
    try { const b = await fs.readFile(full); 
      if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return {width: b.readUInt32BE(16), height: b.readUInt32BE(20)}; // PNG
      if (b[0] === 0xff && b[1] === 0xd8) { for (let o = 2; o < b.length - 9;) { if (b[o] !== 0xff) { o++; continue; } const len = b.readUInt16BE(o + 2); if ((o >= 0 && b[o+1] >= 0xc0 && b[o+1] <= 0xcf) && b[o+1] !== 0xc4 && b[o+1] !== 0xc8 && b[o+1] !== 0xcc) return {height: b.readUInt16BE(o+5), width: b.readUInt16BE(o+7)}; o += 2 + len; } } } catch { /* ignore */ }
    return null;
  }
  async function mustFile(rel, label, image = false) {
    if (!(await regular(rel)) || (image && !/\.(png|webp|jpe?g|avif)$/i.test(rel))) failures.push(label + ': missing or invalid file');
  }
  const ledger = await regular('.aside/type-a-progress.json');
  let s;
  try { if (ledger) s = JSON.parse((await fs.readFile(ledger, 'utf8')).replace(/^\uFEFF/, '')); } catch { /* fail closed */ }
  if (!s || s.version !== 2 || typeof s !== 'object') return {ok:false, failures:['Missing or outdated .aside/type-a-progress.json (version 2 required for unfinished Type-A work).']};
  const result = () => ({ok:failures.length === 0, failures});
  const timestamp = x => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(x) ? Date.parse(x) : NaN;
  const later = (a,b) => timestamp(a) > timestamp(b);
  const notFuture = a => timestamp(a) <= Date.now();
  const timed = (done,start) => timestamp(done) - timestamp(start) >= TYPE_A_HOLD_MS && notFuture(done);
  const authorized = nonempty(s.autonomy?.authorization);
  function sourceUrl(value) {
    if (!nonempty(value)) return null;
    try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && u.pathname !== '/' ? u : null; } catch { return null; }
  }
  const isCoolors = u => !!u && ['coolors.co','www.coolors.co'].includes(u.hostname.toLowerCase());
  if (!nonempty(s.plan)) failures.push('Written Type-A plan evidence is missing.');
  if (!nonempty(s.docsSource)) failures.push('ChatGPT document download provenance is missing.');
  for (const doc of ['PRD.md','ARCHITECTURE.md','DESIGN_RESEARCH.md']) await mustFile(doc, doc);
  const r = s.refApproval;
  const design = Object.entries(s.options?.design ?? {});
  const color = Object.entries(s.options?.color ?? {});
  if (design.length < 3) failures.push('Expected at least three verified published design references.');
  if (color.length < 3 || color.length > 4) failures.push('Expected 3–4 Coolors palette options.');
  const cards = [...design,...color];
  const letters = cards.map(([letter]) => letter).sort();
  if (letters.length > 26 || !letters.every((letter,i) => letter === String.fromCharCode(65+i))) failures.push('Reference cards must use one continuous set of unique letters.');
  const files = cards.map(([,file]) => file);
  if (new Set(files).size !== files.length) failures.push('Each reference card requires its own preview file.');
  const colorsSeen = new Set();
  for (const [group, choices] of [['design',design],['color',color]]) {
    for (const [letter,file] of choices) {
      await mustFile(file, group + ' ' + letter + ' preview', true);
      const src = Object.hasOwn(s.sources ?? {}, file) ? s.sources[file] : null;
      const url = sourceUrl(src?.url);
      if (group === 'design') {
        if (!url || isCoolors(url) || src?.kind !== 'published-ui' || !nonempty(src.creator) || !nonempty(src.engagement)) failures.push('Design ' + letter + ': record the inspected published source, creator, and visible engagement or not shown.');
      } else {
        const hex = Array.isArray(src?.hex) ? src.hex : [];
        const clean = new Set(hex.filter(x => typeof x === 'string' && /^#[0-9a-f]{6}$/i.test(x)).map(x => x.toUpperCase()));
        const key = [...clean].sort().join(',');
        if (!isCoolors(url) || src?.kind !== 'coolors-generated' || clean.size < 3 || clean.size !== hex.length) failures.push('Color ' + letter + ': requires a specific Coolors source and distinct generated HEX values.');
        if (key && colorsSeen.has(key)) failures.push('Color ' + letter + ': duplicates another palette.');
        if (key) colorsSeen.add(key);
      }
    }
  }
  const picksRef = r?.decisionRef ?? r?.userMessage;
  const structuredPicks = r?.designDecision !== undefined || r?.colorDecision !== undefined;
  function validPick(d) {
    if (!later(d?.resolvedAt,s.review?.shownAt) || !notFuture(d?.resolvedAt)) return false;
    if (d.kind === 'user') return nonempty(d.userMessage);
    return d.kind === 'timeout' && authorized && !nonempty(d.userMessage) && nonempty(d.reason) && timed(d.resolvedAt,s.review?.shownAt);
  }
  if (!nonempty(s.review?.message) || !later(r?.pickedAt,s.review?.shownAt) || !nonempty(picksRef) || !design.some(([,file]) => file === r.design) || !color.some(([,file]) => file === r.color)) {
    failures.push('Record the posted previews and both resolved selections.');
  } else if (structuredPicks ? !nonempty(r.decisionRef) || nonempty(r.userMessage) || !validPick(r.designDecision) || !validPick(r.colorDecision) || timestamp(r.pickedAt) !== Math.max(timestamp(r.designDecision?.resolvedAt),timestamp(r.colorDecision?.resolvedAt)) : !nonempty(r.userMessage) || r.decisionRef !== undefined || !notFuture(r.pickedAt)) {
    failures.push('Selection evidence must show actual replies or an authorized, elapsed 90-second fallback for each unanswered choice.');
  }
  const feedback = r?.feedback;
  const feedbackRef = feedback?.decisionRef ?? feedback?.userMessage;
  const feedbackBound = feedback?.picksMessage === picksRef && feedbackRef !== picksRef && later(feedback?.answeredAt,r?.pickedAt) && notFuture(feedback?.answeredAt);
  const userFeedback = ['no','feedback'].includes(feedback?.kind) && nonempty(feedback?.userMessage) && feedback?.decisionRef === undefined;
  const timedFeedback = feedback?.kind === 'timeout-no' && authorized && !nonempty(feedback?.userMessage) && nonempty(feedback?.decisionRef) && nonempty(feedback?.promptMessage) && later(feedback?.shownAt,r?.pickedAt) && timed(feedback?.answeredAt,feedback?.shownAt) && !nonempty(feedback?.comment) && !nonempty(feedback?.reference);
  if (!feedbackBound || !(userFeedback || timedFeedback)) {
    failures.push('Record actual feedback/No or an authorized 90-second no-feedback fallback after the separate prompt.');
  } else if (feedback.kind === 'feedback') {
    if (!nonempty(feedback.comment) && !nonempty(feedback.reference)) failures.push('Feedback answer has neither a comment nor another reference.');
    if (nonempty(feedback.reference)) await mustFile(feedback.reference, 'Additional user design reference', true);
  }
  if (request === '--style-guide') return result();
  await mustFile('STYLE_GUIDE.md', 'STYLE_GUIDE.md');
  if (!later(s.styleGuide?.derivedAt,feedback?.answeredAt) || s.styleGuide?.feedbackMessage !== feedbackRef) failures.push('Style guide must be derived after the current picks and follow-up answer.');
  if (request === '--brand-kit') return result();
  await mustFile(s.brandKit?.paletteExport, 'Selected Coolors palette export');
  await mustFile(s.brandKit?.image, 'Brand kit', true);
  if (!later(s.brandKit?.generatedAt,s.styleGuide?.derivedAt) || s.brandKit?.feedbackMessage !== feedbackRef || s.brandKit?.color !== r?.color || s.brandKit?.design !== r?.design) failures.push('Brand kit was generated too early or does not match the current picks and feedback.');
  const kit = s.brandKit;
  const kitDecision = kit?.decision;
  const userKit = kitDecision === undefined && nonempty(kit?.userMessage) && later(kit?.approvedAt,kit?.generatedAt) && notFuture(kit?.approvedAt);
  const timedKit = kitDecision?.kind === 'timeout' && authorized && !nonempty(kit?.userMessage) && kit?.approvedAt === undefined && nonempty(kit?.reviewMessage) && later(kit?.shownAt,kit?.generatedAt) && timed(kitDecision?.resolvedAt,kit?.shownAt) && nonempty(kitDecision?.qualityCheck);
  if (!(userKit || timedKit)) failures.push('Brand kit needs explicit approval or an authorized 90-second quality-checked fallback for the displayed kit.');
  if (request === '--screen-images') return result();
  const order = Array.isArray(s.order) ? s.order : [];
  if (!order.length || !order.every(x => typeof x === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(x)) || new Set(order).size !== order.length) {
    failures.push('Expected a nonempty, unique ordered PRD screen list.');
    return {ok:false, failures};
  }
  const at = request === '--qa' ? order.length : order.indexOf(request);
  if (at < 0) return {ok:false, failures:[...failures,'Requested screen is not in the PRD screen list.']};
  for (let i = 0; i < order.length; i++) {
    const id = order[i];
    const e = Object.hasOwn(s.screens ?? {}, id) ? s.screens[id] : null;
    if (i > at && e) { failures.push(id + ': a later screen is recorded ahead of the requested screen.'); continue; }
    if (i > at) continue;
    if (e?.kit !== s.brandKit?.image || !nonempty(e?.imageCheck)) failures.push(id + ': needs verified ChatGPT mockup tied to the approved kit.');
    await mustFile(e?.mockup, id + ' mockup', true);
    const assets = Array.isArray(e?.assets) ? e.assets : [];
    // A normal full-UI screen MUST carry ChatGPT-generated icon/banner art. noArtworkReason only for a genuinely data-only screen the plan explicitly marks as such.
    const dataOnly = e?.dataOnly === true;
    if (!assets.length) failures.push(id + (dataOnly ? ': recorded dataOnly but no artwork files listed (mark dataOnly=true only for a truly iconless data screen).' : ': needs ChatGPT-generated icon/banner assets — do NOT build a plain text/box UI without them.'));
    for (const asset of assets) {
      await mustFile(asset?.file, id + ' artwork', true);
      const kindOk = asset?.kind ? true : (asset?.kind === undefined && !asset?.banner ? true : false);
      if (!['generated','approved-reuse'].includes(asset?.source)) failures.push(id + ': asset ' + (asset?.file||'') + ' must be ChatGPT-generated or approved-reuse, not hand-drawn/stock/inline-SVG.');
      if (!nonempty(asset?.check)) failures.push(id + ': asset ' + (asset?.file||'') + ' needs inspection evidence (alpha-bbox trim for icons/logo; opaque-JPEG note for banners).');
      // Assets must be EXTRACTED from the screen image in the SAME chat, never a fresh from-scratch generation.
      if (!nonempty(asset?.derivedFrom) || !/screen|mockup|same.?chat|from.?screen|export/i.test(String(asset.derivedFrom))) failures.push(id + ': asset ' + (asset?.file||'') + ' must be marked derivedFrom the screen image (same chat), not a fresh from-scratch asset chat.');
    }
    if (i < at) {
      await mustFile(e?.screenshot, id + ' build screenshot', true);
      if (!nonempty(e?.comparison)) failures.push(id + ': needs screenshot-to-mockup comparison and interaction check.');
      // Reference match: the screen must mirror the canonical layout reference on six axes, not just palette.
      const refMatch = Array.isArray(e?.referenceMatch) ? e.referenceMatch : [];
      if (nonempty(e?.mockup) && refMatch.length === 0) failures.push(id + ': needs referenceMatch evidence — confirm layout/text-placement/type/shapes/spacing/minimalism/element-size against the project\'s canonical reference (refs/layout-reference-canonical.png or that project\'s approved ref), not just color.');
      // Build fidelity: the built HTML must actually use the generated assets, not ship a plain text/box UI.
      const buildFile = nonempty(e?.build) ? e.build : null;
      if (buildFile) {
        const built = await fs.readFile(buildFile, 'utf8').catch(() => '');
        const referenced = (Array.isArray(e?.assets) ? e.assets : []).filter(a => a?.file && (a.file.split('/').pop() && built.includes(a.file.split('/').pop()))).length;
        const assetCount = Array.isArray(e?.assets) ? e.assets.length : 0;
        if (assetCount > 0 && referenced === 0) failures.push(id + ': built UI references NONE of its ' + assetCount + ' generated assets — looks like a text/box-only placeholder; wire the real assets in.');
        // No emoji in the UI: an emoji standing in for an icon is an AI-slop tell. Flag built HTML containing emoji.
        const emojiRe = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B50}\u{2190}-\u{21FF}\u{2460}-\u{24FF}]/u;
        if (emojiRe.test(built)) failures.push(id + ': built UI contains emoji — replace with the generated icon set; emoji are an AI-slop tell.');
      }
    }
    if (s.device === 'mobile' && i <= at && nonempty(e?.mockup)) {
      const dim = await imageDims(e.mockup);
      if (!dim) failures.push(id + ': could not read mobile mockup pixel dimensions.');
      else if (Math.abs((dim.width/dim.height)-(9/16)) > 0.01) failures.push(id + ': mobile mockup not 9:16 (actual '+dim.width+'x'+dim.height+', need 9:16 portrait e.g. 1080x1920); regenerate or resize.');
    }
  }
  return {ok:failures.length === 0, failures};
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = preflightTypeA;
  module.exports.waitForTypeADecision = waitForTypeADecision;
  if (require.main === module) {
    const [root, request] = process.argv.slice(2);
    if (!root || !request) {
      console.error('Usage: node type-a-preflight.cjs <absolute-project-root> <--style-guide|--brand-kit|--screen-images|<screen-id>|--qa>');
      process.exitCode = 2;
    } else {
      preflightTypeA(require('node:fs/promises'),require('node:path'),root,request).then(result => {
        console.log(result.ok ? 'PASS: recorded evidence and files exist. Confirm approvals and current scope against source.' : 'BLOCKED:\n- ' + result.failures.join('\n- '));
        if (!result.ok) process.exitCode = 1;
      }).catch(error => { console.error('BLOCKED: ' + error.message); process.exitCode = 1; });
    }
  }
}
