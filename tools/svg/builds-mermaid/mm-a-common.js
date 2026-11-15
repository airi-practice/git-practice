// Mermaid の flowchart を SVG にする図（00・01・02・06章分）で共通の部品。
// 猫の吹き出しは付けず、図の本体の下端 + 16 の高さで終える（内容を変えないため、台詞を足さない）
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;

// 図を書き出す。L.svg は高さを y0+122 にするので、y0 = bottom+16-122 とすると、高さが bottom+16 になる
const finish = (name, bottom, title, desc, body) => {
  L.write(name, L.svg({ y0: bottom + 16 - 122, title, desc, body, footer: '' }));
};

// ラベルの横幅の目安（全角15・半角8.5 + 余白）
const pw = (s) => [...s].reduce((a, ch) => a + (ch.charCodeAt(0) > 255 ? 15 : 8.5), 28);

// 矢印のラベル（番号なし）。cx は中心、y は上端
const lab = (cx, y, label, color) => L.pill({ cx, y, w: Math.ceil(pw(label)), label, color });

// 見出し帯付きのカード。lines は本文の行（Mermaid の <br/> で分けた2行目以降）。badge は見出しの左の番号
const cardH = (n) => 84 + (Math.max(n, 1) - 1) * 22;
const cardN = ({ x, y, w, color, head, lines = [], badgeN, headMono }) => {
  const c = C[color];
  const h = cardH(lines.length);
  let o = L.card({ x, y, w, h, color, title: badgeN ? '' : head });
  if (badgeN) {
    o += `\n  <circle cx="${x + 26}" cy="${y + 23}" r="12" fill="#ffffff"/>\n  ${t(x + 26, y + 28, String(badgeN), { size: SIZE.note, bold: true, fill: c.dark })}`;
    o += '\n  ' + t(x + w / 2 + 12, y + 31, head, { size: SIZE.head, bold: true, fill: c.headText ?? '#ffffff' });
  }
  lines.forEach((s, k) => { o += '\n  ' + t(x + w / 2, y + 70 + k * 22, s, { fill: c.dark }); });
  return o;
};

// 薄い色の角丸の箱（1〜数行）。lines の1行目を太字にする
const boxN = ({ x, y, w, color, lines, h, boldFirst }) => {
  const c = C[color];
  const hh = h ?? (lines.length * 22 + 26);
  const top = y + (hh - lines.length * 22) / 2 + 16;
  let o = `<g filter="url(#shadow)">${L.box({ x, y, w, h: hh, color })}</g>`;
  lines.forEach((s, k) => { o += '\n  ' + t(x + w / 2, top + k * 22, s, { bold: boldFirst && k === 0, fill: c.dark }); });
  return o;
};

// ひし形（Mermaid の { } の判断）。cx, cy は中心
const diamond = ({ cx, cy, w, h, color, lines }) => {
  const c = C[color];
  const pts = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  let o = `<g filter="url(#shadow)"><polygon points="${pts}" fill="${c.light}" stroke="${c.main}" stroke-width="2" stroke-linejoin="round"/></g>`;
  const top = lines.length === 1 ? cy + 5 : cy - 6;
  lines.forEach((s, k) => { o += '\n  ' + t(cx, top + k * 22, s, { bold: true, fill: c.dark }); });
  return o;
};

// 折れ線の矢印（先端にだけ矢じり）。points は [[x,y],...]
const poly = (points, color, width = 6) =>
  `<polyline points="${points.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${C[color].arrow})"/>`;
// 矢じりなしの線（枝分かれの幹）
const trunk = (x1, y1, x2, y2, color, width = 6) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="round"/>`;

module.exports = { L, C, t, SIZE, SUB, finish, pw, lab, cardH, cardN, boxN, diamond, poly, trunk };
