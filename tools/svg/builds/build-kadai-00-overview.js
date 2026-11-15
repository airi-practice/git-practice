// kadai-00-overview: 課題1〜3で、画面と API をどう足すか。画面=青、API=緑。
// 状態は、新しく作る=緑、既存を変更する=黄、変更しない=灰（svg-rules の「状態を色分けするとき」）。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const X = [20, 320, 620];
const items = [
  { title: '課題1（★）', name: '在庫が少ない商品', screen: ['green', '新しく作る'], api: ['gray', 'お手本のまま使う'] },
  { title: '課題2（★★）', name: '商品の詳細', screen: ['green', '新しく作る'], api: ['green', '1つ新しく作る'] },
  { title: '課題3（★★★）', name: '商品名で探す検索', screen: ['green', '新しく作る'], api: ['yellow', 'お手本を変更する'] },
];
const row = (x, y, label, [color, text]) => `
  ${t(x + 20, y + 28, label, { anchor: 'start', bold: true, fill: C.gray.dark })}
  <rect x="${x + 76}" y="${y}" width="164" height="44" rx="10" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/>
  ${t(x + 158, y + 28, text, { bold: true, fill: C[color].dark })}`;
let body = `
  ${t(450, 28, '3つの課題で、手を動かす範囲が少しずつ広がる', { size: SIZE.head, bold: true })}`;
items.forEach((it, i) => {
  const x = X[i];
  body += L.card({ x, y: 48, w: 260, h: 214, color: 'blue', title: it.title });
  body += `\n  ${t(x + 130, 118, it.name, { size: SIZE.body, bold: true, fill: C.blue.dark })}`;
  body += row(x, 134, '画面', it.screen);
  body += row(x, 190, 'API', it.api);
  if (i < 2) body += '\n  ' + L.arrow({ x1: x + 262, y1: 155, x2: X[i + 1] - 2, y2: 155, color: 'gray', width: 4 });
});
body += `
  <g filter="url(#shadow)"><rect x="20" y="284" width="860" height="40" rx="12" fill="#ffffff" stroke="${L.LINE}" stroke-width="2"/></g>
  <rect x="60" y="297" width="18" height="18" rx="4" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/>${t(88, 311, '新しく作る', { anchor: 'start', bold: true, fill: C.green.dark })}
  <rect x="270" y="297" width="18" height="18" rx="4" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>${t(298, 311, 'お手本を変更する', { anchor: 'start', bold: true, fill: C.yellow.dark })}
  <rect x="520" y="297" width="18" height="18" rx="4" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/>${t(548, 311, '変更しない（お手本のまま使う）', { anchor: 'start', bold: true, fill: C.gray.dark })}`;
const y0 = 340;
L.write('kadai-00-overview', L.svg({
  y0,
  title: '課題1から課題3までで、画面と API を、どれだけ足すかを並べた図',
  desc: '課題1は、在庫が少ない商品の画面を新しく作る。API はお手本のまま使う。課題2は、商品の詳細画面を新しく作り、API も1つ新しく作る。課題3は、商品名で探す検索画面を新しく作り、お手本の API に条件を足して変更する。右へ進むほど、手を動かす範囲が広がる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['課題1から順番に進めよう。', '分からなくなったら、ヒントを', '1 → 2 → 3 の順に開くんだよ'] }),
}));
