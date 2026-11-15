// 第8章・第9章の flowchart を SVG にするための、build 共通の小さな部品。rich-lib.js は変更しない。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

// 文字列のおおよその幅（日本語は文字の大きさ、半角は 0.6 倍）。ラベルの箱の幅を決めるために使う
const tw = (s, size = 15) => [...s].reduce((a, ch) => a + (ch.charCodeAt(0) > 255 ? size : size * 0.6), 0);

// 矢印の上に置くラベル（白い箱。複数行可）
const lbl = (cx, cy, lines, color, size = 13) => {
  const w = Math.max(...lines.map((s) => tw(s, size))) + 24;
  const h = lines.length * (size + 5) + 12;
  return `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="10" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/>` +
    lines.map((s, k) => t(cx, cy - h / 2 + 6 + (size + 5) * k + size - 1, s, { size, bold: true, fill: C[color].dark })).join('');
};

// 1行〜数行の文字が入る、薄い色の角丸の箱
const nb = (x, y, w, h, color, lines) =>
  L.box({ x, y, w, h, color }) +
  lines.map((s, k) => t(x + w / 2, y + h / 2 - (lines.length - 1) * 10 + k * 20 + 5, s, { bold: k === 0, fill: C[color].dark })).join('');

// 見出し帯付きのカード。subs は見出しの下の行（複数可）
const cd = (x, y, w, h, color, title, subs = []) =>
  L.card({ x, y, w, h, color, title }) + subs.map((s, k) => t(x + w / 2, y + 74 + k * 22, s, { fill: L.SUB })).join('');

// subgraph の枠（薄い色の大きな枠＋ラベル）
const frame = (x, y, w, h, color, label, labelOpt = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${C[color].light}" fill-opacity="0.55" stroke="${C[color].main}" stroke-width="2" stroke-dasharray="6,4"/>` +
  t(labelOpt.x ?? x + 16, y + 28, label, { size: SIZE.head, bold: true, fill: C[color].dark, anchor: labelOpt.anchor ?? 'start' });

// 点線の矢印（灰）
const dash = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.gray.main}" stroke-width="4" stroke-dasharray="9,7" marker-end="url(#arK)"/>`;

// 猫なしの図。高さは「図の本体の下端+16」の H にする
const fin = (name, H, title, desc, body) => L.write(name, L.svg({ y0: H - 122, title, desc, body, footer: '' }));

module.exports = { L, C, t, SIZE, tw, lbl, nb, cd, frame, dash, fin, arrow: L.arrow };
