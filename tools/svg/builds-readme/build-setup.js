// README 5「環境構築手順」（Git・TortoiseGit・日本語化）の画面の模擬図を、まとめて書き出す。
// 作り直すには: node tools/svg/builds-readme/build-setup.js （docs/images/setup-*.svg を書き出す）
// 図の代替テキストは、README.md の ![代替テキスト](docs/images/setup-*.svg) から読み取る。
//
// 見た目は、実際の画面（2026年11月に確認）に合わせる。
//  - Git for Windows の公式サイト https://gitforwindows.org/（灰色のヘッダー、橙の Git ロゴ、青い Download ボタン）
//  - Download ボタンの先の GitHub のリリースページ（Git-<版>-64-bit.exe）
//  - TortoiseGit の公式サイト https://tortoisegit.org/download/（青 #4b8eb4 の見出し、32/64/ARM64 の表、言語パックの表）
//  - Git のインストーラー（Inno Setup 形式: 白いヘッダー帯・下の URL・Back/Next/Cancel）
//  - TortoiseGit のインストーラー（MSI 形式: 左のバナー・白いヘッダー帯）
//  - Windows 11 のエクスプローラー・右クリックメニュー、Git Bash（mintty）の黒い画面
// 赤い枠と番号の説明は、窓の右の余白に並べる（窓の中身を隠さないため）。
const fs = require('fs');
const path = require('path');
const S = require('../shot-lib');
const { hl, arrow, note, esc, MONO } = S;

const README = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'README.md'), 'utf8');
const alts = {};
for (const m of README.matchAll(/!\[([^\]]*)\]\(docs\/images\/(setup-[^)]+)\.svg\)/g)) alts[m[2]] = m[1];

const UI = "'Segoe UI', Tahoma, Meiryo, sans-serif";
const W = 900, WX = 10, WY = 10, WW = 620, NX = 656, ROWMAX = 236;
const BLUE = '#0b57d0', WBLUE = '#0078d4', GRAYTXT = '#555', BG = '#f0f0f0', LINE = '#a0a0a0';
const TG = '#4b8eb4';   // TortoiseGit のサイトの青
const GITO = '#f05133'; // Git のロゴの橙
const tw = (s, size, mono) => [...s].reduce((a, c) => a + (c.codePointAt(0) > 0x2e80 ? size : size * (mono ? 0.6 : 0.56)), 0);
const warnings = [];

const T = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 14}"${o.bold ? ' font-weight="bold"' : ''} fill="${o.fill ?? '#1a1a1a'}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''} font-family="${o.mono ? MONO : (o.font ?? UI)}">${esc(s)}</text>`;
const R = (x, y, w, h, fill, stroke, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}"${o.rx ? ` rx="${o.rx}"` : ''} fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${o.sw ?? 1}"` : ''}/>`;

// ---------- 部品 ----------
const gitLogo = (cx, cy, s) => { // 橙のひし形に白い枝分かれ
  const k = s / 40;
  return `<rect x="${cx - 14 * k}" y="${cy - 14 * k}" width="${28 * k}" height="${28 * k}" rx="${3 * k}" fill="${GITO}" transform="rotate(45 ${cx} ${cy})"/>` +
    `<path d="M${cx - 4 * k} ${cy - 7 * k}V${cy + 8 * k}M${cx - 4 * k} ${cy - 2 * k}L${cx + 5 * k} ${cy - 8 * k}" stroke="#fff" stroke-width="${2.6 * k}" fill="none"/>` +
    [[-4, -7], [-4, 8], [5, -8]].map(([a, b]) => `<circle cx="${cx + a * k}" cy="${cy + b * k}" r="${3 * k}" fill="#fff"/>`).join('');
};
const turtle = (cx, cy, s) => { // TortoiseGit のカメ（青い甲羅と頭）
  const k = s / 40;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${17 * k}" ry="${12 * k}" fill="#7fb0cf" stroke="#2f5f7d" stroke-width="${1.5 * k}"/>` +
    `<circle cx="${cx + 18 * k}" cy="${cy - 2 * k}" r="${5 * k}" fill="#a9cfe4" stroke="#2f5f7d" stroke-width="${1.5 * k}"/>` +
    T(cx - 1 * k, cy + 5 * k, 'Git', { size: Math.max(13, 12 * k), bold: true, fill: '#fff', anchor: 'middle' });
};
const folderIcon = (x, y, c = '#f4c542') => `<path d="M${x} ${y + 3}a2 2 0 0 1 2-2h6l2 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2z" fill="${c}"/>`;
const exeIcon = (x, y) => `<rect x="${x}" y="${y}" width="22" height="22" rx="3" fill="#fff" stroke="#6b7a8d" stroke-width="1.5"/><rect x="${x}" y="${y}" width="22" height="6" rx="2" fill="${GITO}"/><rect x="${x + 5}" y="${y + 10}" width="12" height="8" fill="#9db4c8"/>`;
const msiIcon = (x, y) => `<rect x="${x}" y="${y}" width="22" height="22" rx="3" fill="#fff" stroke="#6b7a8d" stroke-width="1.5"/><path d="M${x + 4} ${y + 9}l7-5l7 5v8h-14z" fill="#7fb0cf" stroke="#2f5f7d" stroke-width="1.2"/>`;
const winBtns = (x, y, dark) => { // 窓の右上の「－ □ ×」
  const c = dark ? '#ddd' : '#222';
  return `<path d="M${x - 76} ${y}h10M${x - 44} ${y - 5}h10v10h-10zM${x - 12} ${y - 5}l10 10M${x - 2} ${y - 5}l-10 10" stroke="${c}" stroke-width="1.2" fill="none"/>`;
};
const winBtnsClose = (x, y) => `<path d="M${x - 12} ${y - 5}l10 10M${x - 2} ${y - 5}l-10 10" stroke="#222" stroke-width="1.2" fill="none"/>`;
const winBox = (h) => `<rect x="${WX}" y="${WY}" width="${WW}" height="${h}" rx="6" fill="#fff" stroke="#7a7a7a" stroke-width="1.5"/>`;

// 窓の中に並べる部品。ctx.marks に、赤い枠が付いた場所を貯める
const markRow = (ctx, y, xEnd, text, elbow) => ctx.marks.push({ type: 'row', y, xEnd, text, elbow });
const withHl = (ctx, box, text, mid, elbow) => { if (text) { ctx.body.push(hl(box)); markRow(ctx, mid ?? box.y + box.h / 2, box.x + box.w, text, elbow); } };

const btn = (x, y, w, h, label, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${o.off ? '#f4f4f4' : '#fdfdfd'}" stroke="${o.def ? WBLUE : o.off ? '#d0d0d0' : '#adadad'}" stroke-width="${o.def ? 2 : 1}"/>` +
  T(x + w / 2, y + h / 2 + 5, label, { size: 14, anchor: 'middle', fill: o.off ? '#8a8a8a' : '#1a1a1a' });

// 本文に並べる項目（インストーラー・設定画面の中身）
const h = (s) => ({ t: 'h', s });
const p = (s, hl_, o = {}) => ({ t: 'p', s, hl: hl_, ...o });
const n = (s) => ({ t: 'n', s });
const radio = (s, on, hl_, d) => ({ t: 'radio', s, on, hl: hl_, d });
const check = (s, on, hl_, o = {}) => ({ t: 'check', s, on, hl: hl_, ...o });
const field = (label, s, hl_, o = {}) => ({ t: 'field', label, s, hl: hl_, ...o });
const sel = (label, s, hl_) => ({ t: 'sel', label, s, hl: hl_ });
const box = (lines, hh) => ({ t: 'box', lines, h: hh });
const gap = (v = 10) => ({ t: 'gap', v });
const lines = (a) => ({ t: 'lines', a });

function items(ctx, list, x0, y0, xMax, chkName) {
  let cy = y0;
  const over = (s, size, x, mono) => { if (x + tw(s, size, mono) > xMax) warnings.push(`${ctx.name}: はみ出し「${s}」`); };
  for (const it of list) {
    const on = it.hl;
    if (it.t === 'gap') cy += it.v;
    else if (it.t === 'h') { ctx.body.push(T(x0, cy + 18, it.s, { size: 18, bold: true })); cy += 36; }
    else if (it.t === 'p') {
      const sz = it.size ?? 14;
      ctx.body.push(T(x0, cy + 15, it.s, { size: sz, bold: !!it.bold })); over(it.s, sz, x0);
      withHl(ctx, { x: x0 - 6, y: cy - 3, w: tw(it.s, sz) + 12, h: 25 }, on, cy + 10);
      cy += sz > 14 ? 28 : 26;
    } else if (it.t === 'n') { ctx.body.push(T(x0, cy + 14, it.s, { size: 13, fill: GRAYTXT })); over(it.s, 13, x0); cy += 22; }
    else if (it.t === 'lines') { it.a.forEach((s) => { ctx.body.push(T(x0, cy + 15, s, { size: 14 })); over(s, 14, x0); cy += 22; }); cy += 4; }
    else if (it.t === 'radio' || it.t === 'check') {
      const bx = x0 + (it.indent ?? 0), by = cy + 3;
      if (it.t === 'radio') {
        ctx.body.push(`<circle cx="${bx + 7}" cy="${by + 7}" r="6.5" fill="#fff" stroke="#333"/>`);
        if (it.on) ctx.body.push(`<circle cx="${bx + 7}" cy="${by + 7}" r="3.5" fill="#222"/>`);
      } else {
        ctx.body.push(R(bx, by, 14, 14, '#fff', '#333'));
        if (it.on) ctx.body.push(`<path d="M${bx + 3} ${by + 7}l3 3l5-6" fill="none" stroke="#222" stroke-width="2"/>`);
      }
      ctx.body.push(T(bx + 24, cy + 16, it.s, { size: 14 })); over(it.s, 14, bx + 24);
      withHl(ctx, { x: bx - 4, y: cy - 1, w: 24 + tw(it.s, 14) + 10, h: 24 }, on, cy + 11);
      cy += 25;
      for (const d of it.d ?? []) { ctx.body.push(T(bx + 24, cy + 13, d, { size: 13, fill: GRAYTXT })); over(d, 13, bx + 24); cy += 20; }
      if (it.d) cy += 4;
    } else if (it.t === 'field' || it.t === 'sel') {
      const lw = it.label ? (it.lw ?? 130) : 0, bw = it.w ?? 360, fx = x0 + lw;
      if (it.label) ctx.body.push(T(x0, cy + 20, it.label, { size: 14 }));
      ctx.body.push(R(fx, cy, bw, 28, '#fff', '#7a7a7a'));
      ctx.body.push(T(fx + 8, cy + 19, it.s, { size: 14, mono: !!it.mono })); over(it.s, 14, fx + 8, !!it.mono);
      if (it.t === 'sel') ctx.body.push(`<path d="M${fx + bw - 22} ${cy + 11}l6 6l6-6" fill="none" stroke="#444" stroke-width="1.6"/>`);
      let right = fx + bw;
      if (it.btn) { ctx.body.push(btn(fx + bw + 10, cy, 96, 28, it.btn)); right = fx + bw + 106; }
      withHl(ctx, { x: fx - 4, y: cy - 4, w: bw + 8, h: 36 }, on, cy + 14);
      cy += 42;
    } else if (it.t === 'box') {
      const bh = it.h ?? it.lines.length * 20 + 14;
      ctx.body.push(R(x0, cy, xMax - x0, bh, '#fff', '#7a7a7a'));
      ctx.body.push(R(xMax - 16, cy + 1, 15, bh - 2, '#f0f0f0', '#e0e0e0'));
      ctx.body.push(R(xMax - 14, cy + 4, 11, bh * 0.38, '#c1c1c1'));
      it.lines.forEach((s, i) => { ctx.body.push(T(x0 + 10, cy + 22 + i * 20, s, { size: 13, bold: s.startsWith('GNU') })); over(s, 13, x0 + 10); });
      cy += bh + 10;
    }
  }
  return cy;
}

// 下のボタン。footer: [{ s, hl, off, def }]。ボタンの上に番号の説明と矢印を出す
function footerBtns(ctx, fy, footer) {
  let x = WX + WW - 18;
  for (const b of [...footer].reverse()) {
    const bw = Math.max(92, tw(b.s, 14) + 36);
    x -= bw;
    ctx.body.push(btn(x, fy, bw, 30, b.s, { off: b.off, def: b.def }));
    if (b.hl) { ctx.body.push(hl({ x: x - 3, y: fy - 3, w: bw + 6, h: 36 })); ctx.marks.push({ type: 'foot', cx: x + bw / 2, y: fy, text: b.hl }); }
    x -= 10;
  }
}

// ---------- インストーラーの窓 ----------
// brand: 'inno'（Git）| 'msi'（TortoiseGit のインストーラー）| 'wiz'（TortoiseGit の初回設定）
function installer(ctx, { brand, title, hdr, sub, body, footer, wide, link, minBody = 170 }) {
  const TB = 32, X0 = WX + 24, XM = WX + WW - 24;
  const parts = ctx.body;
  const hasNote = footer.some((b) => b.hl);
  const FH = hasNote ? 92 : 62;
  let top = WY + TB, bodyEnd;
  const tmp = [];
  ctx.body = tmp;
  if (wide) {
    const lx = WX + 170;
    bodyEnd = items(ctx, body, lx + 18, top + 26, XM, ctx.name);
  } else {
    const HH = 62;
    bodyEnd = items(ctx, body, X0, top + HH + 18, XM, ctx.name);
  }
  const bodyH = Math.max(minBody, bodyEnd - top - (wide ? 0 : 62) + 8);
  const WH = TB + (wide ? 0 : 62) + bodyH + FH;
  ctx.body = parts;
  parts.push(winBox(WH));
  // タイトルバー
  parts.push(R(WX + 1, WY + 1, WW - 2, TB - 1, '#fff', null));
  parts.push(brand === 'inno' ? gitLogo(WX + 18, WY + 17, 20) : turtle(WX + 18, WY + 17, 22));
  parts.push(T(WX + 38, WY + 21, title, { size: 13 }));
  parts.push(winBtns(WX + WW - 8, WY + 17));
  const bodyTop = WY + TB, footTop = WY + WH - FH;
  parts.push(R(WX + 1, bodyTop, WW - 2, footTop - bodyTop, wide ? '#fff' : BG, null));
  if (wide) {
    const lw = 170;
    parts.push(brand === 'inno'
      ? R(WX + 1, bodyTop, lw, footTop - bodyTop, '#fff', null) + gitLogo(WX + 1 + lw / 2, bodyTop + 80, 96)
      : `<rect x="${WX + 1}" y="${bodyTop}" width="${lw}" height="${footTop - bodyTop}" fill="${TG}"/>` + turtle(WX + 1 + lw / 2, bodyTop + 90, 110));
    parts.push(R(WX + 1, bodyTop, WW - 2, 0, 'none', null));
  } else {
    parts.push(R(WX + 1, bodyTop, WW - 2, 62, '#fff', null));
    parts.push(`<path d="M${WX + 1} ${bodyTop + 62}h${WW - 2}" stroke="#c8c8c8"/>`);
    parts.push(T(X0, bodyTop + 26, hdr, { size: 15, bold: true }));
    parts.push(T(X0 + 18, bodyTop + 48, sub, { size: 13 }));
    if (tw(sub, 13) + X0 + 18 > WX + WW - 90) warnings.push(`${ctx.name}: 副題がはみ出し`);
    parts.push(brand === 'inno' ? gitLogo(WX + WW - 46, bodyTop + 31, 44) : turtle(WX + WW - 46, bodyTop + 31, 44));
    if (tw(hdr, 15) + X0 > WX + WW - 90) warnings.push(`${ctx.name}: 見出しがはみ出し`);
  }
  parts.push(`<path d="M${WX + 1} ${footTop}h${WW - 2}" stroke="#c8c8c8"/>`);
  parts.push(...tmp);
  if (link) parts.push(T(X0, footTop + FH - 24, link, { size: 13, fill: '#555', font: UI }));
  footerBtns(ctx, footTop + FH - 46, footer);
  return WH;
}

// ---------- ブラウザの窓 ----------
function browser(ctx, { tab, url, page, ch }) {
  const parts = ctx.body, TOP = 40 + 42, CH = ch;
  const WH = TOP + CH;
  parts.push(winBox(WH));
  parts.push(`<path d="M${WX} ${WY + 6}a6 6 0 0 1 6-6h${WW - 12}a6 6 0 0 1 6 6v${TOP - 6}h-${WW}z" fill="#dee1e6"/>`);
  parts.push(`<path d="M${WX + 10} ${WY + 40}v-26a6 6 0 0 1 6-6h${190}a6 6 0 0 1 6 6v26z" fill="#fff"/>`);
  parts.push(`<circle cx="${WX + 28}" cy="${WY + 25}" r="7" fill="${tab.c}"/>`);
  parts.push(T(WX + 42, WY + 30, tab.s, { size: 13, fill: '#222' }));
  parts.push(`<path d="M${WX + 196} ${WY + 20}l8 8M${WX + 204} ${WY + 20}l-8 8" stroke="#555" stroke-width="1.2"/>`);
  parts.push(winBtns(WX + WW - 8, WY + 18));
  parts.push(R(WX, WY + 40, WW, 42, '#fff', null));
  parts.push(`<path d="M${WX + 18} ${WY + 61}h14m-6-6l-6 6l6 6M${WX + 52} ${WY + 61}h14m-6-6l6 6l-6 6" stroke="#555" stroke-width="1.6" fill="none"/>`);
  parts.push(`<path d="M${WX + 92} ${WY + 56}a6 6 0 1 0 2 5m-1-8v6h-6" stroke="#555" stroke-width="1.6" fill="none"/>`);
  parts.push(R(WX + 116, WY + 47, WW - 132, 28, '#eef1f5', null, { rx: 14 }));
  parts.push(`<rect x="${WX + 130}" y="${WY + 58}" width="9" height="7" rx="1" fill="#555"/><path d="M${WX + 132} ${WY + 58}v-3a2.5 2.5 0 0 1 5 0v3" stroke="#555" stroke-width="1.3" fill="none"/>`);
  parts.push(T(WX + 148, WY + 66, url, { size: 14, fill: '#222' }));
  parts.push(`<clipPath id="pg-${ctx.name}"><rect x="${WX + 1}" y="${WY + TOP}" width="${WW - 2}" height="${CH - 2}"/></clipPath><g clip-path="url(#pg-${ctx.name})">`);
  page(ctx, WX + 1, WY + TOP, WW - 2);
  parts.push('</g>');
  return WH;
}

// Git for Windows の公式サイト
function gfwPage(ctx, x, y, w, hot) {
  const b = ctx.body;
  b.push(`<defs><linearGradient id="gh-${ctx.name}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e9e9"/><stop offset="1" stop-color="#b9b9b9"/></linearGradient><linearGradient id="gb-${ctx.name}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a88d6"/><stop offset="1" stop-color="#2d63b3"/></linearGradient></defs>`);
  b.push(R(x, y, w, 300, `url(#gh-${ctx.name})`, null));
  b.push(R(x, y + 258, w, 8, '#2a5db0', null) + R(x, y + 266, w, 40, '#3573c6', null));
  b.push(T(x + 24, y + 42, 'git', { size: 36, bold: true, fill: '#555' }) + T(x + 78, y + 42, 'for windows', { size: 16, bold: true, fill: '#6a6a6a' }));
  b.push(T(x + 24, y + 66, 'VERSION 2.56.1', { size: 13, fill: '#3a78c4' }));
  b.push(T(x + w - 250, y + 38, 'FAQ', { size: 13, bold: true, fill: '#3a78c4' }) + T(x + w - 205, y + 38, 'REPOSITORY', { size: 13, fill: '#3a78c4' }) + T(x + w - 120, y + 38, 'DISCUSSIONS', { size: 13, fill: '#3a78c4' }));
  b.push(`<path d="M${x + 24} ${y + 48}h${w - 48}" stroke="#bdbdbd"/>`);
  b.push(gitLogo(x + 120, y + 160, 190));
  b.push(T(x + 270, y + 128, 'We bring the', { size: 24, fill: '#7a7a7a' }) + T(x + 270, y + 160, 'awesome', { size: 24, fill: '#7a7a7a' }) + T(x + 270 + 100, y + 160, 'Git', { size: 24, bold: true, fill: '#666' }) + T(x + 270 + 140, y + 160, 'SCM', { size: 24, fill: '#7a7a7a' }) + T(x + 270, y + 192, 'to Windows', { size: 24, fill: '#7a7a7a' }));
  b.push(`<path d="M${x + 270} ${y + 208}h${w - 294}" stroke="#bdbdbd"/>`);
  const mk = (bx, label, bw) => `<rect x="${bx}" y="${y + 220}" width="${bw}" height="36" rx="4" fill="url(#gb-${ctx.name})" stroke="#1f4f96"/>` + T(bx + bw / 2, y + 244, label, { size: 16, anchor: 'middle', fill: '#fff' });
  b.push(mk(x + 270, 'Download', 150) + mk(x + 430, 'Contribute', 150));
  if (hot) withHl(ctx, { x: x + 266, y: y + 216, w: 158, h: 44 }, hot);
  b.push(T(x + w / 2, y + 292, 'Tools & Features', { size: 18, anchor: 'middle', fill: '#fff' }));
}

// GitHub のリリースページ
function releasePage(ctx, x, y, w, hot) {
  const b = ctx.body;
  b.push(R(x, y, w, 330, '#fff', null) + R(x, y, w, 46, '#f6f8fa', null) + `<path d="M${x} ${y + 46}h${w}" stroke="#d0d7de"/>`);
  b.push(`<circle cx="${x + 28}" cy="${y + 23}" r="12" fill="#1f2328"/>` + T(x + 52, y + 28, 'git-for-windows / git', { size: 14, bold: true, fill: '#1f2328' }));
  b.push(T(x + 24, y + 78, 'Releases', { size: 13, fill: '#0969da' }) + T(x + 82, y + 78, '/ v2.56.1.windows.1', { size: 13, fill: '#57606a' }));
  b.push(T(x + 24, y + 116, 'Git for Windows 2.56.1', { size: 26, bold: true, fill: '#1f2328' }));
  b.push(R(x + 330, y + 98, 58, 24, '#dafbe1', '#4ac26b', { rx: 12 }) + T(x + 359, y + 115, 'Latest', { size: 13, anchor: 'middle', fill: '#1a7f37', bold: true }));
  b.push(T(x + 24, y + 156, 'Assets', { size: 18, bold: true, fill: '#1f2328' }) + R(x + 90, y + 140, 28, 22, '#eaeef2', null, { rx: 11 }) + T(x + 104, y + 156, '16', { size: 13, anchor: 'middle', fill: '#57606a' }));
  b.push(R(x + 24, y + 172, w - 48, 138, '#fff', '#d0d7de', { rx: 6 }));
  const rows = ['Git-2.56.1-64-bit.exe', 'Git-2.56.1-arm64.exe', 'Git-2.56.1-64-bit.7z.exe', 'Git-2.56.1-64-bit.zip'];
  rows.forEach((s, i) => {
    const ry = y + 172 + i * 34;
    if (i) b.push(`<path d="M${x + 24} ${ry}h${w - 48}" stroke="#d8dee4"/>`);
    b.push(`<path d="M${x + 40} ${ry + 9}h9l4 4v11h-13z" fill="none" stroke="#57606a" stroke-width="1.4"/>` + T(x + 66, ry + 23, s, { size: 14, fill: '#0969da' }));
  });
  b.push(T(x + 66, y + 172 + 4 * 34 + 20, '…', { size: 14, fill: '#57606a' }));
  if (hot) withHl(ctx, { x: x + 60, y: y + 172 + 3, w: tw(rows[0], 14) + 12, h: 28 }, hot, y + 172 + 17);
}

// TortoiseGit の公式サイトの共通ヘッダー
function tgitHead(ctx, x, y, w) {
  const b = ctx.body;
  b.push(R(x, y, w, 300, '#fff', null));
  b.push(turtle(x + 44, y + 32, 50) + T(x + 82, y + 34, 'Tortoise', { size: 24, fill: '#333' }) + T(x + 82 + 94, y + 34, 'Git', { size: 24, bold: true, fill: '#333' }));
  b.push(T(x + 82, y + 52, 'Windows Shell Interface to Git', { size: 13, fill: '#555' }));
  b.push(T(x + w - 330, y + 38, 'About', { size: 13, bold: true, fill: '#444' }) + T(x + w - 262, y + 38, 'Download', { size: 13, bold: true, fill: '#444' }) + `<path d="M${x + w - 262} ${y + 46}h58" stroke="${TG}" stroke-width="2"/>` + T(x + w - 190, y + 38, 'Get Support ⌄', { size: 13, bold: true, fill: '#444' }) + T(x + w - 92, y + 38, 'Contribute', { size: 13, bold: true, fill: '#444' }));
  b.push(R(x, y + 66, w, 22, TG, null) + T(x + 14, y + 82, 'TortoiseGit.org » Download', { size: 13, fill: '#fff' }));
  b.push(R(x, y + 88, w, 212, '#f6f6f6', null));
}
function tgitPage(ctx, x, y, w, hot) {
  tgitHead(ctx, x, y, w);
  const b = ctx.body;
  b.push(T(x + 24, y + 124, 'Download', { size: 26, bold: true, fill: TG }));
  b.push(T(x + 24, y + 148, 'The current stable version is: 2.19.0', { size: 13, bold: true, fill: TG }));
  b.push(T(x + 24, y + 170, 'For detailed info on what\u2019s new, read the release notes.', { size: 13, fill: TG }));
  b.push(T(x + 24, y + 192, 'Please make sure that you choose the right installer for your PC, otherwise', { size: 13, fill: TG }));
  b.push(T(x + 24, y + 210, 'the setup will fail.', { size: 13, fill: TG }));
  const cw = 190, tx0 = x + 24, ty = y + 222;
  const cols = [['for 32-bit Windows', 'Download TortoiseGit', '2.19.1.0 32-bit (15.0 MiB)'], ['for 64-bit Windows', 'Download TortoiseGit', '2.19.1.0 64-bit (18.3 MiB)'], ['for ARM64 Windows', 'Download TortoiseGit', '2.19.1.0 ARM64 (14.8 MiB)']];
  cols.forEach((c, i) => {
    const cx = tx0 + i * cw;
    b.push(R(cx, ty, cw, 24, '#f6f6f6', '#dcdcdc') + T(cx + 6, ty + 17, c[0], { size: 13, bold: true, fill: TG }));
    b.push(R(cx, ty + 24, cw, 50, '#f6f6f6', '#dcdcdc'));
    b.push(T(cx + 6, ty + 43, '\u2B07 ' + c[1], { size: 13, fill: TG }) + T(cx + 6, ty + 61, c[2], { size: 13, fill: TG }));
  });
  if (hot) withHl(ctx, { x: tx0 + cw + 2, y: ty + 26, w: cw - 4, h: 46 }, hot, ty + 49);
}
function tgitLangPage(ctx, x, y, w, hot) {
  const b = ctx.body;
  b.push(R(x, y, w, 330, '#f6f6f6', null));
  b.push(`<path d="M${x + 24} ${y + 30}v-18h16l-4 6l4 6h-12" fill="${TG}"/>` + T(x + 48, y + 30, 'Language Packs', { size: 18, bold: true, fill: TG }));
  b.push(T(x + 24, y + 58, 'The language packs contain no standalone localized version of', { size: 13, fill: TG }));
  b.push(T(x + 24, y + 76, 'TortoiseGit, you need TortoiseGit from above. Each language pack has a', { size: 13, fill: TG }));
  b.push(T(x + 24, y + 94, 'download size of 2\u201310 MiB.', { size: 13, fill: TG }));
  const cx = [x + 24, x + 156, x + 206, x + 306, x + 426], cwid = [132, 50, 100, 120, 140], head = ['Language', 'Code', 'Completeness', '32-Bit', '64-Bit/ARM64'];
  const ty = y + 108;
  head.forEach((s, i) => b.push(R(cx[i], ty, cwid[i], 26, '#f6f6f6', '#d6d6d6') + T(cx[i] + 5, ty + 18, s, { size: 13, bold: true, fill: TG })));
  const rows = [['Hungarian', 'hu', '49 %', '#c33'], ['Italian', 'it', '72 %', '#0a0'], ['Japanese', 'ja', '99 %', '#c33'], ['Korean', 'ko', '83 %', '#36c']];
  const sz = ['3.5 MiB', '3.1 MiB', '2.8 MiB', '2.8 MiB'];
  rows.forEach((r, i) => {
    const ry = ty + 26 + i * 26;
    r.slice(0, 3).forEach((s, j) => b.push(R(cx[j], ry, cwid[j], 26, '#f6f6f6', '#d6d6d6') + T(j === 2 ? cx[j] + cwid[j] - 6 : cx[j] + (j === 0 ? 26 : 5), ry + 18, s, { size: 13, fill: TG, anchor: j === 2 ? 'end' : undefined })));
    b.push(R(cx[0] + 4, ry + 8, 16, 11, r[3], null));
    [3, 4].forEach((j) => b.push(R(cx[j], ry, cwid[j], 26, '#f6f6f6', '#d6d6d6') + T(cx[j] + 5, ry + 18, `\u2B07 Setup (${sz[i]})`, { size: 13, fill: TG })));
  });
  if (hot) withHl(ctx, { x: cx[4] + 2, y: ty + 26 + 2 * 26 + 1, w: cwid[4] - 4, h: 24 }, hot);
}

// ---------- エクスプローラー ----------
function explorer(ctx, { tab, path_, nav, contentH, files, menu }) {
  const parts = ctx.body, TOP = 36 + 40 + 40, WH = TOP + contentH;
  parts.push(winBox(WH));
  parts.push(`<path d="M${WX} ${WY + 6}a6 6 0 0 1 6-6h${WW - 12}a6 6 0 0 1 6 6v${TOP - 6}h-${WW}z" fill="#f3f3f3"/>`);
  parts.push(`<path d="M${WX + 10} ${WY + 36}v-24a6 6 0 0 1 6-6h160a6 6 0 0 1 6 6v24z" fill="#fff"/>`);
  parts.push(folderIcon(WX + 22, WY + 12) + T(WX + 56, WY + 27, tab, { size: 13 }) + `<path d="M${WX + 168} ${WY + 17}l8 8M${WX + 176} ${WY + 17}l-8 8" stroke="#555" stroke-width="1.2"/>`);
  parts.push(winBtns(WX + WW - 8, WY + 17));
  parts.push(R(WX, WY + 36, WW, 80, '#fff', null));
  // コマンドバー
  parts.push(`<path d="M${WX + 18} ${WY + 56}h12m-6-6v12" stroke="#1a73e8" stroke-width="2"/>` + T(WX + 40, WY + 61, '新規作成', { size: 13 }) + `<path d="M${WX + 98} ${WY + 55}l4 4l4-4" stroke="#555" fill="none"/>`);
  parts.push(`<path d="M${WX + 130} ${WY + 46}v20" stroke="#ddd"/>`);
  [WX + 150, WX + 186, WX + 222, WX + 258].forEach((ix) => parts.push(R(ix, WY + 51, 16, 14, 'none', '#777', { rx: 2 })));
  parts.push(T(WX + 300, WY + 61, '並べ替え', { size: 13 }) + T(WX + 372, WY + 61, '表示', { size: 13 }));
  // アドレスバー
  parts.push(`<path d="M${WX + 18} ${WY + 96}h14m-6-6l-6 6l6 6M${WX + 48} ${WY + 96}h14m-6-6l6 6l-6 6M${WX + 82} ${WY + 102}v-12m-6 6l6-6l6 6" stroke="#555" stroke-width="1.5" fill="none"/>`);
  parts.push(R(WX + 106, WY + 82, 330, 28, '#fff', '#c8c8c8', { rx: 4 }) + T(WX + 118, WY + 101, path_, { size: 13 }));
  parts.push(R(WX + 446, WY + 82, WW - 462, 28, '#fff', '#c8c8c8', { rx: 4 }) + T(WX + 458, WY + 101, '検索', { size: 13, fill: '#888' }));
  // ナビゲーション
  const cy0 = WY + TOP;
  parts.push(`<path d="M${WX + 140} ${cy0}v${contentH}" stroke="#e5e5e5"/>`);
  ['ホーム', 'ギャラリー', '', 'デスクトップ', 'ダウンロード', 'ドキュメント', 'ピクチャ'].forEach((s, i) => {
    if (!s) { parts.push(`<path d="M${WX + 12} ${cy0 + 18 + i * 28}h116" stroke="#ddd"/>`); return; }
    const ny = cy0 + 10 + i * 28, sel_ = s === nav;
    if (sel_) parts.push(R(WX + 8, ny, 126, 26, '#dce8f8', null, { rx: 4 }));
    parts.push(folderIcon(WX + 14, ny + 4, sel_ ? '#3a8ad6' : '#f4c542') + T(WX + 46, ny + 18, s, { size: 13, bold: sel_ }));
  });
  if (files) {
    const fx = WX + 140;
    parts.push(T(fx + 44, cy0 + 22, '名前', { size: 13, fill: '#555' }) + T(fx + 44 + 340, cy0 + 22, '更新日時', { size: 13, fill: '#555' }));
    parts.push(`<path d="M${fx + 6} ${cy0 + 32}h${WW - 146}" stroke="#eee"/>`);
    files.forEach((f, i) => {
      const ry = cy0 + 36 + i * 32;
      if (f.hl) parts.push(R(fx + 6, ry, WW - 152, 32, '#e8f0fb', null, { rx: 3 }));
      parts.push((f.name.endsWith('.msi') ? msiIcon : exeIcon)(fx + 14, ry + 5) + T(fx + 44, ry + 21, f.name, { size: 13 }) + T(fx + 384, ry + 21, f.date, { size: 13, fill: '#555' }));
      if (f.hl) { withHl(ctx, { x: fx + 8, y: ry + 1, w: WW - 156, h: 30 }, f.hl, ry + 16); }
    });
    if (files.some((f) => tw(f.name, 13) + fx + 44 > fx + 384)) warnings.push(`${ctx.name}: ファイル名が長い`);
  }
  if (menu) {
    parts.push(T(WX + 140 + (WW - 140) / 2, cy0 + 30, 'このフォルダーは空です。', { size: 13, anchor: 'middle', fill: '#777' }));
    ctxMenu(ctx, WX + 150, cy0 + 8, menu);
  }
  return WH;
}

// 右クリックのメニュー（Windows 11 の「その他のオプション」の形）
function ctxMenu(ctx, mx, my, def) {
  const MW = 252, RH = 26, parts = ctx.body;
  let y = my;
  const rows = [], pos = {};
  for (const it of def) {
    if (it === '-') { rows.push(`<path d="M${mx + 10} ${y + 5}h${MW - 20}" stroke="#d8d8d8"/>`); y += 10; continue; }
    pos[it.s] = y;
    it.y = y;
    y += RH;
  }
  const H = y - my + 8;
  parts.push(`<rect x="${mx}" y="${my - 4}" width="${MW}" height="${H}" rx="6" fill="#fbfbfb" stroke="#b4b4b4"/>`);
  parts.push(...rows);
  let subDraw = null;
  for (const it of def) {
    if (it === '-') continue;
    const ty = it.y;
    if (it.on) parts.push(R(mx + 4, ty - 3, MW - 8, RH - 2, '#cfe3fa', null, { rx: 3 }));
    if (it.ic) parts.push(R(mx + 12, ty + 3, 15, 15, it.ic, null, { rx: 3 }));
    parts.push(T(mx + 38, ty + 16, it.s, { size: 13, fill: it.dis ? '#aaa' : '#1a1a1a' }));
    if (it.sub) parts.push(`<path d="M${mx + MW - 18} ${ty + 6}l5 5l-5 5" stroke="#444" stroke-width="1.4" fill="none"/>`);
    if (it.sub && it.subItems) subDraw = it;
  }
  // 強調。同じ説明が続く行は、1つの枠にまとめる
  const hot = def.filter((it) => it !== '-' && it.hl);
  const groups = [];
  hot.forEach((it) => { const g = groups[groups.length - 1]; if (g && g.text === it.hl && g.last.y + RH === it.y) { g.last = it; } else groups.push({ text: it.hl, first: it, last: it }); });
  groups.forEach((g) => withHl(ctx, { x: mx + 2, y: g.first.y - 4, w: MW - 4, h: g.last.y - g.first.y + RH }, g.text, (g.first.y + g.last.y + RH) / 2 - 3, g.first.subItems ? { ex: mx + MW - 30, top: g.first.y - 4 } : null));
  if (subDraw) {
    const sx = mx + MW + 4, sy = subDraw.y - 4, SW = 190;
    let yy = sy + 4, sRows = [];
    const sub = subDraw.subItems;
    parts.push(`<rect x="${sx}" y="${sy}" width="${SW}" height="${sub.reduce((a, q) => a + (q === '-' ? 10 : RH), 0) + 8}" rx="6" fill="#fbfbfb" stroke="#b4b4b4"/>`);
    for (const q of sub) {
      if (q === '-') { parts.push(`<path d="M${sx + 10} ${yy + 5}h${SW - 20}" stroke="#d8d8d8"/>`); yy += 10; continue; }
      if (q.on) parts.push(R(sx + 4, yy - 1, SW - 8, RH - 2, '#cfe3fa', null, { rx: 3 }));
      if (q.ic) parts.push(R(sx + 10, yy + 4, 15, 15, q.ic, null, { rx: 3 }));
      parts.push(T(sx + 34, yy + 17, q.s, { size: 13, bold: !!q.on }));
      q.y = yy;
      yy += RH;
    }
    sub.filter((q) => q !== '-' && q.hl).forEach((q) => withHl(ctx, { x: sx + 2, y: q.y - 2, w: SW - 4, h: RH }, q.hl, q.y + 11));
  }
  ctx.menuBottom = y + 6;
}

// ---------- 黒い画面（Git Bash） ----------
function terminal(ctx, { rows }) {
  const parts = ctx.body, TB = 32, LH = 26, WH = TB + 24 + rows.length * LH + 40;
  parts.push(winBox(WH));
  parts.push(`<path d="M${WX} ${WY + 6}a6 6 0 0 1 6-6h${WW - 12}a6 6 0 0 1 6 6v${TB - 6}h-${WW}z" fill="#fff"/>`);
  parts.push(gitLogo(WX + 18, WY + 17, 20) + T(WX + 38, WY + 21, 'MINGW64:/c/Users/USER01', { size: 13 }) + winBtns(WX + WW - 8, WY + 17));
  parts.push(`<path d="M${WX + 1} ${WY + TB}h${WW - 2}v${WH - TB - 6}a5 5 0 0 1-5 5h${-(WW - 12)}a5 5 0 0 1-5-5z" fill="#0c0c0c"/>`);
  let cy = WY + TB + 28;
  const mono = { mono: true, size: 15 };
  const X = WX + 14;
  rows.forEach((r) => {
    if (r.prompt) {
      const a = 'USER01@PC', c = ' MINGW64', d = ' ~';
      parts.push(T(X, cy, a, { ...mono, fill: '#3fd23f' }) + T(X + tw(a, 15, true), cy, c, { ...mono, fill: '#d054d0' }) + T(X + tw(a + c, 15, true), cy, d, { ...mono, fill: '#d6d63a' }));
    } else if (r.out) {
      parts.push(T(X, cy, r.out, { ...mono, fill: '#e6e6e6' }));
    } else {
      parts.push(T(X, cy, '$ ' + (r.cmd ?? ''), { ...mono, fill: '#f2f2f2' }));
      if (r.cmd && r.hl) withHl(ctx, { x: X - 6, y: cy - 18, w: tw('$ ' + r.cmd, 15, true) + 14, h: 26 }, r.hl, cy - 5);
      if (!r.cmd) parts.push(R(X + 20, cy - 14, 9, 17, '#e6e6e6', null));
    }
    cy += LH;
  });
  return WH;
}

// ---------- スタートメニュー ----------
function startMenu(ctx) {
  const parts = ctx.body, WH = 300;
  parts.push(`<rect x="${WX}" y="${WY}" width="${WW}" height="${WH}" rx="10" fill="#eef1f6" stroke="#9aa5b5" stroke-width="1.5"/>`);
  parts.push(R(WX + 24, WY + 20, WW - 48, 40, '#fff', '#c9d1dc', { rx: 20 }));
  parts.push(`<circle cx="${WX + 48}" cy="${WY + 40}" r="7" fill="none" stroke="#555" stroke-width="1.8"/><path d="M${WX + 53} ${WY + 45}l6 6" stroke="#555" stroke-width="1.8"/>`);
  parts.push(T(WX + 72, WY + 46, 'Git Bash', { size: 16 }));
  parts.push(T(WX + 28, WY + 94, '最も一致する検索結果', { size: 13, bold: true, fill: '#444' }));
  parts.push(R(WX + 24, WY + 106, 360, 72, '#fff', '#c9d1dc', { rx: 8 }));
  parts.push(gitLogo(WX + 62, WY + 142, 44));
  parts.push(T(WX + 96, WY + 138, 'Git Bash', { size: 16, bold: true }) + T(WX + 96, WY + 160, 'アプリ', { size: 13, fill: '#555' }));
  ctx.body.push(hl({ x: WX + 20, y: WY + 102, w: 368, h: 80 }));
  markRow(ctx, WY + 142, WX + 388, '「Git Bash」を開く');
  parts.push(T(WX + 28, WY + 214, 'アプリ', { size: 13, bold: true, fill: '#444' }));
  [['Git CMD', 0], ['Git GUI', 1]].forEach(([s, i]) => parts.push(R(WX + 24, WY + 226 + i * 32, 360, 30, '#f7f9fc', null, { rx: 6 }) + gitLogo(WX + 44, WY + 241 + i * 32, 22) + T(WX + 66, WY + 247 + i * 32, s, { size: 14 })));
  return WH;
}

// ---------- TortoiseGit の設定画面 ----------
function settings(ctx, { hot }) {
  const parts = ctx.body, TB = 32, WH = 380, X = WX, Y = WY;
  parts.push(winBox(WH));
  parts.push(R(X + 1, Y + 1, WW - 2, TB - 1, '#fff', null) + turtle(X + 18, Y + 17, 22) + T(X + 38, Y + 21, 'Settings - TortoiseGit', { size: 13 }) + winBtnsClose(X + WW - 8, Y + 17));
  parts.push(R(X + 1, Y + TB, WW - 2, WH - TB - 1, BG, null));
  parts.push(R(X + 12, Y + TB + 12, 180, WH - TB - 76, '#fff', '#828790'));
  const tree = [['Settings', 0], ['General', 1, 1], ['Context Menu', 1], ['Dialogs 1', 1], ['Dialogs 2', 1], ['Colours', 1], ['Network', 1], ['External Programs', 1]];
  tree.forEach(([s, lv, on], i) => {
    const ty = Y + TB + 18 + i * 26;
    if (on) parts.push(R(X + 14, ty, 176, 24, '#cfe3fa', null));
    parts.push(T(X + 24 + lv * 18, ty + 17, s, { size: 13 }));
  });
  parts.push(T(X + 212, Y + TB + 34, 'General', { size: 16, bold: true }));
  parts.push(`<path d="M${X + 206} ${Y + TB + 44}h${WW - 226}" stroke="#c8c8c8"/>`);
  const items_ = [];
  ctx.body = parts;
  const gy = Y + TB + 62;
  parts.push(T(X + 212, gy + 22, 'Language:', { size: 13 }));
  parts.push(R(X + 290, gy + 4, 220, 26, '#fff', '#7a7a7a') + T(X + 298, gy + 22, hot ? '日本語' : 'English', { size: 13 }) + `<path d="M${X + 490} ${gy + 14}l5 5l5-5" fill="none" stroke="#444" stroke-width="1.5"/>`);
  withHl(ctx, { x: X + 286, y: gy, w: 228, h: 34 }, hot ? '日本語にする' : null);
  parts.push(R(X + 212, gy + 56, 14, 14, '#fff', '#333') + `<path d="M${X + 215} ${gy + 63}l3 3l5-6" fill="none" stroke="#222" stroke-width="2"/>` + T(X + 236, gy + 68, 'Check for newer versions every week', { size: 13 }));
  parts.push(btn(X + 236, gy + 84, 110, 28, 'Check now'));
  const fy = Y + WH - 48;
  parts.push(`<path d="M${X + 1} ${fy - 14}h${WW - 2}" stroke="#c8c8c8"/>`);
  return { WH, fy };
}

// ---------- 小さなダイアログ（再起動の確認） ----------
function restartDlg(ctx, { title, text, hot }) {
  const parts = ctx.body, WH = 232;
  parts.push(winBox(WH));
  parts.push(R(WX + 1, WY + 1, WW - 2, 31, '#fff', null) + turtle(WX + 18, WY + 17, 22) + T(WX + 38, WY + 21, title, { size: 13 }) + winBtnsClose(WX + WW - 8, WY + 17));
  parts.push(R(WX + 1, WY + 32, WW - 2, WH - 33, BG, null));
  text.forEach((s, i) => { parts.push(T(WX + 30, WY + 64 + i * 22, s, { size: 14 })); if (tw(s, 14) + WX + 30 > WX + WW - 20) warnings.push(`${ctx.name}: はみ出し「${s}」`); });
  parts.push(btn(WX + WW - 220, WY + WH - 52, 90, 30, 'Yes', { def: 1 }) + btn(WX + WW - 120, WY + WH - 52, 90, 30, 'No'));
  ctx.body.push(hl({ x: WX + WW - 223, y: WY + WH - 55, w: 96, h: 36 }));
  ctx.marks.push({ type: 'foot', cx: WX + WW - 175, y: WY + WH - 52, text: hot });
  return WH;
}

// ---------- 図を組み立てる ----------
function make(name, build) {
  const ctx = { name, body: [], marks: [] };
  const WH = build(ctx);
  const rank = { row: 0, foot: 1 };
  ctx.marks.sort((a, b) => rank[a.type] - rank[b.type] || (a.y ?? 0) - (b.y ?? 0));
  const notes = [];
  let lastY = -99;
  ctx.marks.forEach((m, i) => {
    const num = String(i + 1), label = `${num}. ${m.text}`, wd = tw(label, 15) + 6;
    if (m.type === 'row') {
      if (wd > ROWMAX) warnings.push(`${name}: 説明が長い「${m.text}」`);
      const ny = Math.max(m.y + 6, lastY + 24); lastY = ny;
      if (m.elbow) {
        const ya = m.elbow.top - 20;
        notes.push(`<path d="M${NX - 8},${ya} H${m.elbow.ex} V${m.elbow.top - 3}" stroke="${S.RED}" stroke-width="3" fill="none" marker-end="url(#r)"/>`, note({ x: NX, y: ya + 6, n: num, text: m.text }));
        lastY = ya + 6;
      } else notes.push(arrow({ x1: NX - 8, y1: m.y, x2: Math.min(m.xEnd + 8, NX - 14), y2: m.y }), note({ x: NX, y: ny, n: num, text: m.text }));
    } else {
      const atEdge = m.cx + wd / 2 > WX + WW - 12;
      notes.push(arrow({ x1: m.cx, y1: m.y - 22, x2: m.cx, y2: m.y - 6 }), note({ x: atEdge ? WX + WW - 16 : m.cx, y: m.y - 28, n: num, text: m.text, anchor: atEdge ? 'end' : 'middle' }));
    }
  });
  const alt = alts[name];
  if (!alt) warnings.push(`${name}: README に代替テキストがない`);
  return S.svg({
    W, H: WY + WH + 14,
    title: alt || name,
    desc: `${alt || name}。実際の画面を再現した図で、赤い枠と番号の説明が、この手順で操作する場所を示す。`,
    body: `  ${ctx.body.join('\n  ')}\n  ${notes.join('\n  ')}`,
  });
}

const S_ = [];
const add = (name, build) => S_.push([name, build]);
const NEXT = (text = '「Next」を押す', back = true) => [{ s: '< Back', off: back }, { s: 'Next >', hl: text, def: 1 }, { s: 'Cancel' }];
const INSTALL = [{ s: '< Back' }, { s: 'Install', hl: '「Install」を押す', def: 1 }, { s: 'Cancel' }];
const FINISH = [{ s: 'Finish', hl: '「Finish」を押す', def: 1 }];
const KEEP = '何も変えずに「Next」を押す';
const GITT = 'Git 2.56.1 Setup', GURL = 'https://gitforwindows.org/';
const TGT = 'TortoiseGit 2.19.1.0 (64 bit) Setup';
const LPT = 'TortoiseGit LanguagePack 2.19.0.0 (64 bit) Setup';
const TGURL = 'https://tortoisegit.org/download/';
const gitPage = (hdr, sub, body, footer = NEXT(KEEP), minBody) => (ctx) => installer(ctx, { brand: 'inno', title: GITT, hdr, sub, body, footer, link: GURL, minBody });
const msiPage = (title, hdr, sub, body, footer = NEXT(KEEP), minBody) => (ctx) => installer(ctx, { brand: 'msi', title, hdr, sub, body, footer, minBody });
const DLDATE = '2026/11/15';
const dl = (nm, hlt) => (ctx) => explorer(ctx, { tab: 'ダウンロード', path_: 'PC  >  ダウンロード', nav: 'ダウンロード', contentH: 235, files: [{ name: nm, date: DLDATE, hl: hlt }] });
const brw = (url, tabS, tabC, page, ch = 330) => (ctx) => browser(ctx, { tab: { s: tabS, c: tabC }, url, page, ch });

// 5-1 Git
add('setup-git-01-open-site', brw('gitforwindows.org', 'Git for Windows', GITO, (c, x, y, w) => gfwPage(c, x, y, w), 308));
add('setup-git-02-download', brw('gitforwindows.org', 'Git for Windows', GITO, (c, x, y, w) => gfwPage(c, x, y, w, '「Download」を押す'), 308));
add('setup-git-02b-releases', brw('github.com/git-for-windows/git/releases/tag/v2.56.1.windows.1', 'Git for Windows 2.56.1', '#24292f', (c, x, y, w) => releasePage(c, x, y, w, 'これを押す'), 340));
add('setup-git-03-launch', dl('Git-2.56.1-64-bit.exe', 'ダブルクリックする'));
add('setup-git-04-license', gitPage('Information', 'Please read the following important information before continuing.', [
  p('When you are ready to continue with Setup, click Next.'),
  box(['GNU General Public License', 'Version 2, June 1991', 'Copyright (C) 1989, 1991 Free Software Foundation, Inc.', '51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA', 'Everyone is permitted to copy and distribute verbatim copies', 'of this license document, but changing it is not allowed.'], 140),
], [{ s: 'Next >', hl: '「Next」を押す', def: 1 }, { s: 'Cancel' }]));
add('setup-git-05-destination', gitPage('Select Destination Location', 'Where should Git be installed?', [
  p('Setup will install Git into the following folder.'), p('To continue, click Next, or click Browse to pick another folder.'),
  gap(4), field('', 'C:\\Program Files\\Git', null, { w: 330, btn: 'Browse...', mono: false }), gap(14), n('At least 330 MB of free disk space is required.'),
], NEXT(KEEP)));
add('setup-git-06-components', gitPage('Select Components', 'Which components should be installed?', [
  n('Select the components you want to install; clear the others.'),
  check('Additional icons', false), check('Windows Explorer integration', true), check('Open Git Bash here', true, null, { indent: 24 }), check('Open Git GUI here', true, null, { indent: 24 }),
  check('Git LFS (Large File Support)', true), check('Associate .git* configuration files with the default text editor', true), check('Associate .sh files to be run with Bash', true),
], NEXT(KEEP)));
add('setup-git-07-start-menu', gitPage('Select Start Menu Folder', 'Where should Setup place the program\u2019s shortcuts?', [
  p('Setup will create the shortcuts in the following Start Menu folder.'), p('To continue, click Next.'), gap(4), field('', 'Git', null, { w: 330, btn: 'Browse...' }), check('Don\u2019t create a Start Menu folder', false),
], NEXT(KEEP)));
add('setup-git-08-editor', gitPage('Choosing the default editor used by Git', 'Which editor would you like Git to use?', [
  gap(8), sel('', 'Use Notepad as Git\u2019s default editor', '「Notepad」を選ぶ'), gap(6), n('Git opens this editor when it asks you to type some text.'),
], NEXT(), 210));
add('setup-git-09-branch-name', gitPage('Adjusting the name of the initial branch in new repositories', 'What would you like Git to name the first branch?', [
  radio('Let Git decide', false, null, ['Use Git\u2019s default branch name for new repositories.']),
  radio('Override the default branch name for new repositories', true, '「Override…」を選ぶ', ['Many teams use \u201Cmain\u201D for the first branch.']),
  field('', 'main', 'main と入力する', { w: 220 }),
], NEXT()));
add('setup-git-10-path', gitPage('Adjusting your PATH environment', 'How would you like to use Git from the command line?', [
  radio('Use Git from Git Bash only', false, null, ['Git is available only inside the Git Bash window.']),
  radio('Git from the command line and also from 3rd-party software', true, null, ['(Recommended)']),
  radio('Use Git and optional Unix tools from the Command Prompt', false),
], NEXT(KEEP)));
add('setup-git-11-defaults', gitPage('Configuring the line ending conversions', 'How should Git treat line endings in text files?', [
  radio('Checkout Windows-style, commit Unix-style line endings', true, null, ['(Recommended on Windows)']),
  radio('Checkout as-is, commit Unix-style line endings', false), radio('Checkout as-is, commit as-is', false),
], NEXT(KEEP)));
add('setup-git-12-install', gitPage('Ready to Install', 'Setup is now ready to begin installing Git on your computer.', [
  p('Click Install to continue with the installation.'), gap(4),
  box(['Destination location:', '    C:\\Program Files\\Git', 'Start Menu folder:', '    Git'], 100),
], INSTALL));
add('setup-git-13-finish', (ctx) => installer(ctx, { brand: 'inno', title: GITT, wide: true, link: GURL, footer: FINISH, minBody: 200, body: [
  p('Completing the Git Setup Wizard', null, { bold: 1, size: 16 }), gap(2),
  lines(['Setup has finished installing Git on your', 'computer.', 'Click Finish to exit Setup.']), gap(4), check('Launch Git Bash', true), check('View Release Notes', true),
] }));
add('setup-git-14-open-bash', (ctx) => startMenu(ctx));
add('setup-git-15-version', (ctx) => terminal(ctx, { rows: [{ prompt: 1 }, { cmd: 'git --version', hl: 'Enter キーを押す' }, { out: 'git version 2.56.1.windows.1' }, { prompt: 1 }, {}] }));
add('setup-git-16-set-name', (ctx) => terminal(ctx, { rows: [{ prompt: 1 }, { cmd: 'git config --global user.name "あなたの名前"', hl: 'Enter キーを押す' }, { prompt: 1 }, {}] }));
add('setup-git-17-set-email', (ctx) => terminal(ctx, { rows: [{ prompt: 1 }, { cmd: 'git config --global user.email "you@example.com"', hl: 'Enter キーを押す' }, { prompt: 1 }, {}] }));

// 5-2 TortoiseGit
add('setup-tortoise-01-open-site', brw('tortoisegit.org/download/', 'Download – TortoiseGit', TG, (c, x, y, w) => tgitPage(c, x, y, w), 310));
add('setup-tortoise-02-download', brw('tortoisegit.org/download/', 'Download – TortoiseGit', TG, (c, x, y, w) => tgitPage(c, x, y, w, '64bit 版を押す'), 310));
add('setup-tortoise-03-launch', dl('TortoiseGit-2.19.1.0-64bit.msi', 'ダブルクリックする'));
add('setup-tortoise-04-welcome', (ctx) => installer(ctx, { brand: 'msi', title: TGT, wide: true, footer: NEXT(), minBody: 210, body: [
  p('Welcome to the TortoiseGit 2.19.1.0', null, { bold: 1, size: 16 }), p('(64 bit) Setup Wizard', null, { bold: 1, size: 16 }), gap(4),
  lines(['The Setup Wizard will install TortoiseGit on', 'your computer. Click Next to continue or', 'Cancel to exit the Setup Wizard.']),
] }));
add('setup-tortoise-05-license', msiPage(TGT, 'End-User License Agreement', 'Please read the following license agreement carefully', [
  box(['GNU GENERAL PUBLIC LICENSE', 'Version 2, June 1991', 'Copyright (C) 1989, 1991 Free Software Foundation, Inc.', '51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA', 'Everyone is permitted to copy and distribute verbatim copies', 'of this license document, but changing it is not allowed.'], 150),
], NEXT('内容を確かめて「Next」')));
add('setup-tortoise-06-ssh', msiPage(TGT, 'Choose SSH Client', 'Select the SSH client TortoiseGit uses.', [
  radio('TortoiseGitPlink (default)', true, null, ['Recommended. Works without extra setup.']), radio('OpenSSH', false, null, ['Uses the OpenSSH that comes with Git for Windows.']),
], NEXT(KEEP)));
add('setup-tortoise-07-destination', msiPage(TGT, 'Destination Folder', 'Click Next to install to the default folder.', [
  p('Install TortoiseGit to:'), gap(2), field('', 'C:\\Program Files\\TortoiseGit\\', null, { w: 330, btn: 'Change...' }),
], NEXT(KEEP)));
add('setup-tortoise-08-install', msiPage(TGT, 'Ready to install TortoiseGit', 'Click Install to begin the installation.', [
  lines(['Click Install to begin the installation. Click Back to review', 'or change any of your installation settings.', 'Click Cancel to exit the wizard.']),
], INSTALL));
add('setup-tortoise-09-finish', (ctx) => installer(ctx, { brand: 'msi', title: TGT, wide: true, footer: [{ s: '< Back', off: 1 }, { s: 'Finish', hl: '「Finish」を押す', def: 1 }, { s: 'Cancel', off: 1 }], minBody: 190, body: [
  p('Completed the TortoiseGit 2.19.1.0', null, { bold: 1, size: 16 }), p('(64 bit) Setup Wizard', null, { bold: 1, size: 16 }), gap(4),
  lines(['Click the Finish button to exit the', 'Setup Wizard.']),
] }));
add('setup-tortoise-10-restart', (ctx) => restartDlg(ctx, { title: TGT, text: ['You must restart your system for the configuration', 'changes made to TortoiseGit to take effect.', 'Click Yes to restart now or No if you plan to restart later.'], hot: '「Yes」を押す' }));
const WIZ = 'TortoiseGit First Start Wizard';
const WIZNEXT = (text) => [{ s: 'Next >', hl: text, def: 1 }, { s: 'Cancel' }];
add('setup-tortoise-11-wizard-language', msiPage(WIZ, 'Language', 'Choose the language for TortoiseGit.', [gap(8), sel('Language', 'English', '「English」のまま')], WIZNEXT('「Next」を押す'), 140));
add('setup-tortoise-12-wizard-git-path', msiPage(WIZ, 'Configure git.exe path', 'TortoiseGit needs to know where Git is installed.', [gap(8), field('Git の場所', 'C:\\Program Files\\Git\\cmd', '入っているか確かめる', { w: 270, lw: 100 })], WIZNEXT('「Next」を押す'), 140));
add('setup-tortoise-13-wizard-user', msiPage(WIZ, 'Configure user information', 'Your name and e-mail address are saved in every commit.', [gap(4), field('Name', 'あなたの名前', '5-1 の名前か確かめる', { w: 270, lw: 100 }), field('Email', 'you@example.com', '5-1 のアドレスか確かめる', { w: 270, lw: 100 })], WIZNEXT('「Next」を押す'), 150));
add('setup-tortoise-14-wizard-finish', msiPage(WIZ, 'Authentication and Credential Configuration', 'Choose how TortoiseGit stores your login information.', [gap(8), n('何も変えない')], [{ s: 'Finish', hl: '「Finish」を押す', def: 1 }, { s: 'Cancel' }], 130));
const WIN_MENU = (git, sel_, sub) => [
  { s: '表示(V)', sub: 1 }, { s: '並べ替え(O)', sub: 1 }, { s: '最新の情報に更新(E)' }, '-',
  { s: '貼り付け(P)', dis: 1 }, { s: 'ターミナルで開く(T)', ic: '#444' }, { s: 'Open Git GUI here', ic: '#e8793a' }, { s: 'Open Git Bash here', ic: '#e8793a' }, '-',
  ...git, { s: 'TortoiseGit', ic: '#6c8bb8', sub: 1, subItems: sub, on: sel_ ? 1 : 0, hl: sel_ }, '-',
  { s: '新規作成(W)', sub: 1 },
];
const TSUB_EN = (hotSettings) => [
  { s: 'Pull...', ic: '#2e9a3a' }, { s: 'Fetch...', ic: '#3aa04a' }, { s: 'Push...', ic: '#4aa83a' }, '-',
  { s: 'Show log', ic: '#333' }, { s: 'Switch/Checkout...', ic: '#3a9a4a' }, { s: 'Create Branch...', ic: '#e8793a' }, '-',
  { s: 'Settings', ic: '#c9822b', on: !!hotSettings, hl: hotSettings }, { s: 'Help', ic: '#555' }, { s: 'About TortoiseGit', ic: '#2a6ad6' },
];
const folderWin = (menu, ch = 470) => (ctx) => explorer(ctx, { tab: '新しいフォルダー', path_: 'PC  >  ドキュメント  >  新しいフォルダー', nav: 'ドキュメント', contentH: ch, menu });
add('setup-tortoise-15-context-menu', folderWin(WIN_MENU([{ s: 'Git Clone...', ic: '#d9a21b' }, { s: 'Git Create repository here...', ic: '#e0a33a' }], '「TortoiseGit」が出る', null)));

// 5-3 日本語化
add('setup-lang-01-open-list', brw('tortoisegit.org/download/', 'Download – TortoiseGit', TG, (c, x, y, w) => tgitLangPage(c, x, y, w), 292));
add('setup-lang-02-download', brw('tortoisegit.org/download/', 'Download – TortoiseGit', TG, (c, x, y, w) => tgitLangPage(c, x, y, w, 'Japanese の 64bit を押す'), 292));
add('setup-lang-03-launch', dl('TortoiseGit-LanguagePack-2.19.0.0-64bit-ja.msi', 'ダブルクリックする'));
add('setup-lang-04-welcome', (ctx) => installer(ctx, { brand: 'msi', title: LPT, wide: true, footer: NEXT(), minBody: 210, body: [
  p('Welcome to the TortoiseGit', null, { bold: 1, size: 16 }), p('LanguagePack 2.19.0.0 (64 bit)', null, { bold: 1, size: 16 }), p('Setup Wizard', null, { bold: 1, size: 16 }), gap(4),
  lines(['The Setup Wizard will install the language', 'pack on your computer. Click Next to', 'continue or Cancel to exit.']),
] }));
add('setup-lang-05-install', msiPage(LPT, 'Ready to install TortoiseGit LanguagePack', 'Click Install to begin the installation.', [
  lines(['Click Install to begin the installation. Click Back to review', 'or change any of your installation settings.', 'Click Cancel to exit the wizard.']),
], INSTALL));
add('setup-lang-06-finish', (ctx) => installer(ctx, { brand: 'msi', title: LPT, wide: true, footer: [{ s: '< Back', off: 1 }, { s: 'Finish', hl: '「Finish」を押す', def: 1 }, { s: 'Cancel', off: 1 }], minBody: 190, body: [
  p('Completed the TortoiseGit', null, { bold: 1, size: 16 }), p('LanguagePack 2.19.0.0 (64 bit)', null, { bold: 1, size: 16 }), p('Setup Wizard', null, { bold: 1, size: 16 }), gap(4),
  lines(['Click the Finish button to exit the', 'Setup Wizard.']),
] }));
add('setup-lang-07-open-settings', folderWin(WIN_MENU([{ s: 'Git Clone...', ic: '#d9a21b' }, { s: 'Git Create repository here...', ic: '#e0a33a' }], '「TortoiseGit」を選ぶ', TSUB_EN('「Settings」を選ぶ')), 545));
add('setup-lang-08-select-language', (ctx) => {
  const r = settings(ctx, { hot: true });
  ctx.body.push(btn(WX + WW - 340, WY + r.WH - 40, 100, 30, 'OK', { def: 1 }) + btn(WX + WW - 230, WY + r.WH - 40, 100, 30, 'Cancel') + btn(WX + WW - 120, WY + r.WH - 40, 100, 30, 'Apply'));
  ctx.body.push(hl({ x: WX + WW - 343, y: WY + r.WH - 43, w: 106, h: 36 }));
  ctx.marks.push({ type: 'foot', cx: WX + WW - 290, y: WY + r.WH - 40, text: '「OK」を押す' });
  return r.WH;
});
add('setup-lang-09-confirm', folderWin(WIN_MENU([{ s: 'Git クローン(複製)...', ic: '#d9a21b' }, { s: 'Git ここにリポジトリを作成(Y)...', ic: '#e0a33a' }], null, null).map((it) => (it && it.s === 'Git クローン(複製)...' ? { ...it, hl: '日本語になった' } : it && it.s === 'Git ここにリポジトリを作成(Y)...' ? { ...it, hl: '日本語になった' } : it))));

for (const [name, build] of S_) S.write(name, make(name, build));
const missing = Object.keys(alts).filter((k) => !S_.some((s) => s[0] === k));
if (missing.length) warnings.push('図が未作成: ' + missing.join(', '));
console.log(`${S_.length} 枚を書き出した`);
if (warnings.length) console.log('警告:\n' + warnings.join('\n'));
