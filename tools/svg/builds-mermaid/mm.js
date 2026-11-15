// Mermaid の flowchart を SVG にするときの補助部品。rich-lib.js の部品に、箱・枠・折れ線の矢印を足したもの。
// 猫の吹き出しは付けない（図の内容を Mermaid のまま変えないため）。
const L = require('../rich-lib');
const { C, t, TEXT } = L;

// 文字の幅の目安（はみ出しの警告に使う）
const est = (s, size, mono, bold) => {
  let w = 0;
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    w += c >= 0x2e80 ? size : size * (mono ? 0.6 : bold ? 0.6 : 0.54);
  }
  return w;
};

// 行の書き方: 'h|見出し'(太字15) 'hm|コード見出し'(等幅の太字15) 'b|本文'(15) 'n|注記'(13) 'm|コード'(等幅13)
// 接頭辞がなければ、1行目は h、2行目以降は n
const STY = {
  h: { size: 15, bold: true, head: true },
  hm: { size: 15, bold: true, mono: true, head: true },
  b: { size: 15 },
  n: { size: 13 },
  m: { size: 13, mono: true },
};
const LH = { 13: 19, 15: 22, 18: 26 };
const parse = (lines) =>
  lines.map((l, i) => {
    let k = i === 0 ? 'h' : 'n';
    const m = /^(hm|h|b|n|m)\|([\s\S]*)$/.exec(l);
    if (m) { k = m[1]; l = m[2]; }
    return { s: l, ...STY[k], lh: LH[STY[k].size] };
  });

const place = (x, y, w, h, color, ls, top = 0) => {
  const total = ls.reduce((a, l) => a + l.lh, 0);
  let cur = y + top + (h - top - total) / 2;
  return ls.map((l) => {
    const base = cur + l.lh * 0.72;
    cur += l.lh;
    if (est(l.s, l.size, l.mono, l.bold) > w - 14) console.warn(`はみ出しの疑い(${Math.round(est(l.s, l.size, l.mono, l.bold))}>${w - 14}): ${l.s}`);
    return t(x + w / 2, base, l.s, { size: l.size, bold: l.bold, mono: l.mono, fill: l.head ? C[color].dark : TEXT });
  }).join('\n  ');
};

const geo = (x, y, w, h) => ({ x, y, w, h, cx: x + w / 2, cy: y + h / 2, r: x + w, b: y + h });

// 白い箱（色の枠）。h を省くと行数から決める
const node = ({ x, y, w, h, color, lines }) => {
  const ls = parse(lines);
  h = h ?? ls.reduce((a, l) => a + l.lh, 0) + 24;
  const svg = `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>
  ${place(x, y, w, h, color, ls)}`;
  return { svg, ...geo(x, y, w, h) };
};

// 見出し帯付きのカード
const card = ({ x, y, w, h, color, title, lines }) => {
  const ls = parse(lines.map((l) => (/^(hm|h|b|n|m)\|/.test(l) ? l : 'n|' + l)));
  h = h ?? 46 + ls.reduce((a, l) => a + l.lh, 0) + 22;
  if (est(title, 18, false, true) > w - 20) console.warn('見出しがはみ出しの疑い: ' + title);
  const svg = L.card({ x, y, w, h, color, title }) + '\n  ' + place(x, y, w, h, color, ls, 46);
  return { svg, ...geo(x, y, w, h) };
};

// 円筒（データベース）
const cyl = ({ x, y, w, h, color, lines }) => {
  const ls = parse(lines);
  const c = C[color], ry = 11;
  const svg = `<g filter="url(#shadow)"><path d="M${x} ${y + ry} a${w / 2} ${ry} 0 0 1 ${w} 0 v${h - 2 * ry} a${w / 2} ${ry} 0 0 1 -${w} 0 z" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
  <path d="M${x} ${y + ry} a${w / 2} ${ry} 0 0 0 ${w} 0" fill="none" stroke="${c.main}" stroke-width="2"/>
  ${place(x, y + ry, w, h - ry, color, ls)}`;
  return { svg, ...geo(x, y, w, h) };
};

// グループ（subgraph）の大きな枠
const frame = ({ x, y, w, h, color, label }) => {
  const c = C[color];
  if (est(label, 15, false, true) > w - 30) console.warn('枠のラベルがはみ出しの疑い: ' + label);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c.light}" stroke="${c.main}" stroke-width="2" stroke-dasharray="6,4"/>
  ${t(x + 16, y + 26, label, { size: 15, bold: true, fill: c.dark, anchor: 'start' })}`;
};

// 折れ線の矢印（点線にもできる）
const line = (pts, color, { dash, width = 4 } = {}) =>
  `<path d="M${pts.map((p) => p.join(' ')).join(' L')}" fill="none" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="${dash ? 'butt' : 'round'}" stroke-linejoin="round"${dash ? ' stroke-dasharray="9,7"' : ''} marker-end="url(#${C[color].arrow})"/>`;

// 矢印のラベル。n があれば番号バッジ付き。cx, cy は中心
const label = (cx, cy, text, color, n) => {
  const w = Math.round(est(text, 15, false, true) + 28 + (n ? 20 : 0));
  return L.pill({ cx, y: cy - 15, w, label: text, n, color });
};
// 左端 / 右端をそろえて置きたいとき用（幅を返す）
const labelW = (text, n) => Math.round(est(text, 15, false, true) + 28 + (n ? 20 : 0));

const finish = (name, { title, desc, body, bottom }) =>
  L.write(name, L.svg({ y0: bottom + 16 - 122, title, desc, body, footer: '' }));

module.exports = { L, C, t, est, node, card, cyl, frame, line, label, labelW, finish };
