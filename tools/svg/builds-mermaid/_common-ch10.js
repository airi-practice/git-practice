// 第10章の flowchart 用の共通部品。猫なしで、図の本体の下端+16 の高さにそろえて書き出す。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

// 図全体を書き出す。bottom は図の本体の下端。L.svg の高さ（y0+122）が bottom+16 になるように y0 を決める
const finish = (name, bottom, title, desc, body) => {
  L.write(name, L.svg({ y0: bottom + 16 - 122, title, desc, body, footer: '' }));
};

// 薄い色の角丸の箱＋文字。lines は行の配列。badge は番号（Mermaid に番号があるときだけ）
const nodeBox = ({ x, y, w, h, color, lines, size = SIZE.body, bold = false, badge, align = 'center', mono = false }) => {
  const c = C[color];
  const lh = size + 6;
  const n = lines.length;
  let o = `<g filter="url(#shadow)">${L.box({ x, y, w, h, color })}</g>`;
  let first;
  if (align === 'top') first = y + (badge ? 46 : 22) + 4;
  else {
    const top = badge ? y + 34 : y;
    const centre = (top + y + h) / 2;
    first = centre - ((n - 1) * lh) / 2 + 5;
  }
  if (badge) o += '\n  ' + L.badge({ cx: x + w / 2, cy: y + 22, n: badge, color });
  lines.forEach((s, k) => { o += '\n  ' + t(x + w / 2, first + k * lh, s, { size, bold, fill: c.dark, mono }); });
  return o;
};

// subgraph の大きな枠（ラベル付き）
const frame = ({ x, y, w, h, color, label, right }) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${C[color].light}" fill-opacity="0.45" stroke="${C[color].main}" stroke-width="2" stroke-dasharray="8,5"/>
  ${right ? t(x + w - 16, y + 28, label, { size: SIZE.head, bold: true, anchor: 'end', fill: C[color].dark }) : t(x + 16, y + 28, label, { size: SIZE.head, bold: true, anchor: 'start', fill: C[color].dark })}`;

// 点線の矢印（Mermaid の -.-> ）
const dashArrow = ({ x1, y1, x2, y2, color, width = 5 }) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="round" stroke-dasharray="3,10" marker-end="url(#${C[color].arrow})"/>`;

module.exports = { L, C, t, SIZE, finish, nodeBox, frame, dashArrow };
