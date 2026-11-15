// 第3章の Mermaid flowchart を SVG にするための、build 共通の小さな部品（猫なし・内容は Mermaid のまま）
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const LH = 22;
// 文字の幅の見積もり（全角は15、半角は約8.3、太字の半角は9）。枠や吹き出しの幅を決めるために使う
const est = (s, b) => [...s].reduce((a, ch) => a + (ch.charCodeAt(0) > 0x2000 ? 15 : (b ? 9 : 8.3)), 0);
const nodeH = (n) => n * LH + 20;
const cylH = (n) => n * LH + 40;

// 薄い色の角丸の箱。1行目だけ太字（1行だけのときは太字なし）
const node = ({ x, y, w, color, lines, bold }) => {
  const c = C[color];
  const b = bold ?? (lines.length > 1 ? 1 : 0);
  let o = `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${nodeH(lines.length)}" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>`;
  lines.forEach((s, k) => { o += '\n  ' + t(x + w / 2, y + 26 + k * LH, s, { bold: k < b, fill: c.dark }); });
  return o;
};

// 円柱（データベース）
const cyl = ({ x, y, w, color, lines, bold }) => {
  const c = C[color];
  const b = bold ?? (lines.length > 1 ? 1 : 0);
  const h = cylH(lines.length), ry = 10;
  let o = `<g filter="url(#shadow)"><path d="M${x} ${y + ry} a${w / 2} ${ry} 0 0 1 ${w} 0 v${h - 2 * ry} a${w / 2} ${ry} 0 0 1 ${-w} 0 z" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>`;
  o += `\n  <ellipse cx="${x + w / 2}" cy="${y + ry}" rx="${w / 2}" ry="${ry}" fill="#ffffff" fill-opacity="0.6" stroke="${c.main}" stroke-width="2"/>`;
  lines.forEach((s, k) => { o += '\n  ' + t(x + w / 2, y + 22 + 15 + k * LH, s, { bold: k < b, fill: c.dark }); });
  return o;
};

// ひし形（分岐）
const diamond = ({ x, y, w, h, color, lines }) => {
  const c = C[color];
  const cx = x + w / 2, cy = y + h / 2;
  let o = `<g filter="url(#shadow)"><polygon points="${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}" fill="${c.light}" stroke="${c.main}" stroke-width="2" stroke-linejoin="round"/></g>`;
  const y0 = cy - (lines.length * LH) / 2 + 16;
  lines.forEach((s, k) => { o += '\n  ' + t(cx, y0 + k * LH, s, { fill: c.dark }); });
  return o;
};

// 薄い色の大きな枠（グループ）
const frame = ({ x, y, w, h, color, label }) => {
  const c = C[color];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${c.light}" fill-opacity="0.5" stroke="${c.main}" stroke-width="2" stroke-dasharray="8,5"/>
  ${t(x + 16, y + 28, label, { size: SIZE.head, bold: true, anchor: 'start', fill: c.dark })}`;
};

// 矢印の端に、ノードとの隙間をあける（矢じりが先に出る分も引く）
const down = (x, fromBottom, toTop, color, width) => L.arrow({ x1: x, y1: fromBottom + 4, x2: x, y2: toTop - 6, color, width });
const right = (y, fromRight, toLeft, color, width) => L.arrow({ x1: fromRight + 4, y1: y, x2: toLeft - 6, y2: y, color, width });

// 折れ線の矢印・点線の矢印
const poly = ({ pts, color, dashed, width = 6 }) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${dashed ? ' stroke-dasharray="10,9"' : ''} marker-end="url(#${C[color].arrow})"/>`;

// 番号付き（または番号なし）の吹き出し形ラベル。幅は文字数から決める
const pl = ({ cx, y, label, n, color = 'green' }) =>
  L.pill({ cx, y, w: Math.ceil(est(label, true)) + (n ? 54 : 30), label, n, color });

// 2行のラベル
const lab2 = ({ cx, y, lines, color }) => {
  const c = C[color];
  const w = Math.ceil(Math.max(...lines.map((s) => est(s, true)))) + 30, h = lines.length * LH + 10;
  let o = `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/>`;
  lines.forEach((s, k) => { o += '\n  ' + t(cx, y + 22 + k * LH, s, { bold: true, fill: c.dark }); });
  return o;
};

// 猫なしで書き出す。高さは「図の本体の下端 + 16」になる（L.svg は y0 + 122 を使うので、その分を引く）
const done = (name, bottom, title, desc, body) =>
  L.write(name, L.svg({ y0: bottom + 16 - 122, title, desc, body, footer: '' }));

module.exports = { L, C, t, SIZE, est, nodeH, cylH, node, cyl, diamond, frame, down, right, poly, pl, lab2, done };
