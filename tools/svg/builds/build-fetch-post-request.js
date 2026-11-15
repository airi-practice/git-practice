// fetch-post-request: fetch のコードの各部分と、実際に送られる POST リクエストの対応。部分ごとに p1・p2・p3 で区別する（ラベルも付ける）
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const parts = ['p1', 'p2', 'p3'];
const code = [['fetch(\'/api/reverse\', {', 0], ['  method: \'POST\',', 0], ['  headers: { \'Content-Type\': \'application/json\' },', 1], ['  body: JSON.stringify({ text }),', 2], ['})', -1]];
const cy = 20, ch = 284;
const nbsp = (s) => s.replace(/^ +/, (m) => '&#160;'.repeat(m.length));
let body = L.card({ x: 20, y: cy, w: 450, h: ch, color: 'blue', title: 'fetch のコード（フロントエンド）' })
  + '\n' + L.card({ x: 560, y: cy, w: 320, h: ch, color: 'blue', title: '実際に送られるリクエスト' });
// 左：コード（5行）。行の中心 y
const rowY = (k) => cy + 62 + k * 44;
code.forEach(([s, p], k) => {
  if (p >= 0) body += `\n  <rect x="30" y="${rowY(k)}" width="430" height="34" rx="8" fill="${C[parts[p]].light}" stroke="${C[parts[p]].main}" stroke-width="1.5"/>\n  <rect x="30" y="${rowY(k)}" width="7" height="34" rx="3" fill="${C[parts[p]].main}"/>`;
  body += `\n  <text x="46" y="${rowY(k) + 23}" font-size="15" fill="#1e293b" font-family="Consolas,'Courier New',monospace">${nbsp(s.replace(/&/g, '&amp;'))}</text>`;
});
// 右：リクエスト
const R = [
  { p: 0, label: '1行目：メソッドと送り先', text: 'POST /api/reverse', ly: cy + 84, ry: cy + 92 },
  { p: 1, label: 'ヘッダー', text: 'Content-Type: application/json', ly: cy + 150, ry: cy + 158 },
  { p: 2, label: '本文', text: '{"text":"hello"}', ly: cy + 242, ry: cy + 250 },
];
R.forEach((r) => {
  const c = C[parts[r.p]];
  body += `\n  ${t(574, r.ly, r.label, { anchor: 'start', bold: true, fill: c.dark })}`
    + `\n  <rect x="572" y="${r.ry}" width="296" height="34" rx="8" fill="${c.light}" stroke="${c.main}" stroke-width="1.5"/>\n  <rect x="572" y="${r.ry}" width="7" height="34" rx="3" fill="${c.main}"/>`
    + `\n  <text x="588" y="${r.ry + 23}" font-size="15" fill="#1e293b" font-family="Consolas,'Courier New',monospace">${r.text}</text>`;
});
body += `\n  ${t(574, cy + 216, '（空行。ここから下が本文）', { anchor: 'start', fill: SUB })}`;
// 対応の線（部分ごとの色。端に丸を付ける）
const link = (k, ri) => {
  const c = C[parts[code[k][1]]].main, y1 = rowY(k) + 17, y2 = R[ri].ry + 17;
  return `\n  <path d="M462 ${y1} C520 ${y1} 514 ${y2} 572 ${y2}" fill="none" stroke="${c}" stroke-width="3"/><circle cx="462" cy="${y1}" r="4" fill="${c}"/><circle cx="572" cy="${y2}" r="4" fill="${c}"/>`;
};
body += link(0, 0) + link(1, 0) + link(2, 1) + link(3, 2);
body += `\n  ${t(450, cy + ch + 30, '実際のリクエストには、ほかのヘッダーも付く。ここでは、コードとの対応が分かる部分だけを書いている', { fill: SUB })}`;
const y0 = cy + ch + 30 + 16;
L.write('fetch-post-request', L.svg({
  y0,
  title: 'fetch の引数と、実際に送られる POST リクエストの対応',
  desc: '左は fetch のコード（フロントエンド）、右は実際に送られるリクエスト。送り先 /api/reverse とメソッド POST が1行目の POST /api/reverse に、headers の Content-Type が ヘッダー Content-Type: application/json に、body が本文 {"text":"hello"} に対応する。実際のリクエストには、ほかのヘッダーも付く。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['fetch のコードが、実際には', 'こんなリクエストになって送られるんだ。', '色ごとの対応を見てみよう。'] }),
}));
