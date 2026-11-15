// 14章の Mermaid flowchart を SVG に置き換える図で使う、小さな部品。猫は付けず、図の本体の下端+16 で高さを決める。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

// 薄い色の角丸の箱に、中央そろえで文字を置く。lines は行の配列。mono は等幅
const nb = ({ x, y, w, h, color, lines, mono = false, bold = false, dashed = false }) => {
  const c = C[color];
  const n = lines.length;
  const y0 = y + h / 2 - ((n - 1) * 22) / 2 + 5;
  return `<g filter="url(#shadow)">${L.box({ x, y, w, h, color, dashed })}</g>
  ${lines.map((s, k) => t(x + w / 2, y0 + k * 22, s, { fill: c.dark, mono, bold })).join('\n  ')}`;
};

// ひし形に近い六角形（Mermaid の { } の分岐）。中央そろえで文字を置く
const hex = ({ x, y, w, h, color, lines }) => {
  const c = C[color];
  const k = 34;
  const pts = `${x + k},${y} ${x + w - k},${y} ${x + w},${y + h / 2} ${x + w - k},${y + h} ${x + k},${y + h} ${x},${y + h / 2}`;
  const n = lines.length;
  const y0 = y + h / 2 - ((n - 1) * 22) / 2 + 5;
  return `<g filter="url(#shadow)"><polygon points="${pts}" fill="${c.light}" stroke="${c.main}" stroke-width="2" stroke-linejoin="round"/></g>
  ${lines.map((s, i) => t(x + w / 2, y0 + i * 22, s, { fill: c.dark, bold: true })).join('\n  ')}`;
};

// 円柱（データベース）
const cyl = ({ x, y, w, h, color, lines }) => {
  const c = C[color];
  const e = 10;
  const n = lines.length;
  const y0 = y + h / 2 - ((n - 1) * 22) / 2 + 9;
  return `<g filter="url(#shadow)"><path d="M${x} ${y + e} a${w / 2} ${e} 0 0 1 ${w} 0 v${h - 2 * e} a${w / 2} ${e} 0 0 1 ${-w} 0 z" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  <path d="M${x} ${y + e} a${w / 2} ${e} 0 0 0 ${w} 0" fill="none" stroke="${c.main}" stroke-width="2"/>
  ${lines.map((s, i) => t(x + w / 2, y0 + i * 22, s, { fill: c.dark, bold: true })).join('\n  ')}`;
};

// 薄い色の大きな枠（subgraph）。ラベルは右上
const group = ({ x, y, w, h, color, label, mono = false }) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${C[color].light}" fill-opacity="0.45" stroke="${C[color].main}" stroke-width="2" stroke-dasharray="8,5"/>
  ${t(x + w - 16, y + 28, label, { size: SIZE.head, bold: true, anchor: 'end', mono, fill: C[color].dark })}`;

// 点線の矢印（Mermaid の -.->）
const dashed = ({ x1, y1, x2, y2, color }) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color].main}" stroke-width="4" stroke-linecap="round" stroke-dasharray="3,9" marker-end="url(#${C[color].arrow})"/>`;

// 折れ線の矢印（実線）
const elbow = ({ pts, color, width = 6 }) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${C[color].arrow})"/>`;

// 書き出し。bottom は図の本体の下端。L.svg は y0+122 を高さにするので、下端+16 になるよう y0 を逆算する
const finish = (name, bottom, title, desc, body) =>
  L.write(name, L.svg({ y0: bottom + 16 - 122, title, desc, body, footer: '' }));

module.exports = { L, C, t, SIZE, nb, hex, cyl, group, dashed, elbow, finish };
