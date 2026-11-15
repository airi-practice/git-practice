// Mermaid の flowchart を SVG に置き換える図の、共通の小さな部品。猫の吹き出しは付けない（内容を変えないため）。
// 図の高さは「図の本体の下端+16」にする。L.svg は y0+122 を高さにするので、y0 = bottom - 106 を渡す。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const finish = (name, { bottom, title, desc, body }) =>
  L.write(name, L.svg({ y0: bottom - 106, title, desc, body, footer: '' }));

const nodeH = (n) => n * 22 + 22;

// 薄い色の角丸の箱に、中央そろえで文字を置く。bold1 は1行目だけ太字
const node = ({ x, y, w, h, color, lines, bold1, boldAll, fill }) => {
  const c = C[color];
  const y0 = y + h / 2 - (lines.length - 1) * 11 + 5;
  return `<g filter="url(#shadow)">${L.box({ x, y, w, h, color })}</g>
  ${lines.map((s, k) => t(x + w / 2, y0 + k * 22, s, { bold: boldAll || (bold1 && k === 0), fill: fill ?? c.dark })).join('\n  ')}`;
};

// 矢印のラベル。n があれば番号バッジ付き
const label = ({ cx, cy, w, lines, color, n }) => {
  const c = C[color];
  const h = lines.length * 20 + 14;
  const left = cx - w / 2;
  const y0 = cy - (lines.length - 1) * 10 + 5;
  return `<rect x="${left}" y="${cy - h / 2}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/>${n ? `
  <circle cx="${left + 18}" cy="${cy}" r="11" fill="${c.main}"/>
  ${t(left + 18, cy + 5, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}` : ''}
  ${lines.map((s, k) => t(cx + (n ? 15 : 0), y0 + k * 20, s, { fill: c.dark })).join('\n  ')}`;
};

// グループ（subgraph）の大きな枠
const frame = ({ x, y, w, h, color, label: lb }) => {
  const c = C[color];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${c.light}" fill-opacity="0.45" stroke="${c.main}" stroke-width="2" stroke-dasharray="8,5"/>
  ${t(x + 20, y + 30, lb, { size: SIZE.head, bold: true, anchor: 'start', fill: c.dark })}`;
};

module.exports = { L, C, t, SIZE, finish, nodeH, node, label, frame };
