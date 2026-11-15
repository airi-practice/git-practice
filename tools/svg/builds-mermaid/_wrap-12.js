// 第12章の Mermaid flowchart を SVG に置き換えるための補助部品。猫なし。rich-lib.js は変えずに使う。
const fs = require('fs');
const path = require('path');
const L = require('../rich-lib');
const { C, t, SIZE } = L;

// 文字の幅の見積もり（全角=size、半角=0.56*size）
const tw = (s, size = 15, bold = false) =>
  [...s].reduce((a, ch) => a + (ch.charCodeAt(0) < 256 ? 0.56 : 1) * size, 0) * (bold ? 1.06 : 1);

// ノード。lines は文字列、または { s, bold, mono, size } の配列。n があれば番号バッジを左に付ける
const node = ({ x, y, w, h, color, lines, n, dashed, bold1, fill }) => {
  const c = C[color];
  const ls = lines.map((l) => (typeof l === 'string' ? { s: l } : l));
  const hh = h ?? ls.length * 22 + 24;
  const cxText = n ? x + 40 + (w - 40) / 2 : x + w / 2;
  const avail = n ? w - 50 : w - 24;
  const y0 = y + (hh - ls.length * 22) / 2 + 16;
  let out = `\n  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="12" fill="${fill ?? '#ffffff'}" stroke="${c.main}" stroke-width="2"${dashed ? ' stroke-dasharray="6,4"' : ''}/></g>`;
  if (n) out += '\n  ' + L.badge({ cx: x + 22, cy: y + hh / 2, n, color });
  ls.forEach((l, i) => {
    const bold = l.bold ?? (bold1 && i === 0 && ls.length > 1);
    const size = l.size ?? SIZE.body;
    if (tw(l.s, size, bold) > avail) console.warn(`WARN 幅超過 ${Math.round(tw(l.s, size, bold))}>${avail}: ${l.s}`);
    out += '\n  ' + t(cxText, y0 + i * 22, l.s, { size, bold, mono: l.mono, fill: c.dark });
  });
  return { s: out, x, y, w, h: hh, cx: x + w / 2, cy: y + hh / 2, r: x + w, b: y + hh };
};

// subgraph の枠（薄い色の大きな枠。ラベル付き）
const grp = ({ x, y, w, h, color, label }) => {
  const c = C[color];
  const ls = Array.isArray(label) ? label : [label];
  return `\n  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c.light}" stroke="${c.main}" stroke-width="2"/>` +
    ls.map((s, i) => '\n  ' + t(x + 16, y + 27 + i * 24, s, { size: SIZE.head, bold: true, fill: c.dark, anchor: 'start' })).join('');
};

// 矢印。dashed なら点線。color は送る側の色
const arr = ({ x1, y1, x2, y2, color, dashed, width = 5 }) => {
  if (!dashed) return '\n  ' + L.arrow({ x1, y1, x2, y2, color, width });
  const c = C[color];
  return `\n  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c.main}" stroke-width="${width}" stroke-linecap="round" stroke-dasharray="3,11" marker-end="url(#${c.arrow})"/>`;
};

// 矢印のラベル
const pill = ({ cx, y, label, n, color }) => {
  const w = Math.round(tw(label, 15, true) + 28 + (n ? 24 : 0));
  return L.pill({ cx, y, w, label, n, color });
};

// 書き出し。猫を付けないので、高さを「図の本体の下端+16」にする（L.svg の高さは y0+122）
const out = (name, bodyEnd, title, desc, body, expected) => {
  L.write(name, L.svg({ y0: bodyEnd - 106, title, desc, body, footer: '' }));
  const f = path.join(__dirname, '..', '..', '..', 'docs', 'images', name + '.svg');
  const txt = fs.readFileSync(f, 'utf8');
  const all = [...txt.matchAll(/<text [^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join('')
    .replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/\s/g, '');
  let ng = 0;
  expected.forEach((e) => { if (!all.includes(e.replace(/\s/g, ''))) { ng++; console.log('NG 見つからない: ' + e); } });
  console.log(`確認: ${expected.length - ng}/${expected.length} 件の文言が SVG に含まれる`);
};

module.exports = { L, C, t, SIZE, tw, node, grp, arr, pill, out };
