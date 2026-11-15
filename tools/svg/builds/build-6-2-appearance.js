// 6-2-appearance: 画面の見た目は、JSX（何を表示するか）と CSS（どう見せるか）の2か所で決まる図
const L = require('../rich-lib');
const { C, t, SIZE } = L;
// JSX と CSS はどちらもフロントエンドの中の話で、役割の色（青など）では区別できないため、区別用の p1・p2 を使う。名前のラベルと番号も付ける
const left = (y, color, title, path, rows) => {
  const c = C[color];
  let s = L.card({ x: 20, y, w: 430, h: 190, color, title });
  s += `\n  ${t(36, y + 68, path, { size: SIZE.note, anchor: 'start', fill: c.dark })}`;
  rows.forEach(([n, code, d], k) => {
    const yy = y + 100 + k * 50;
    s += `\n  ${L.badge({ cx: 44, cy: yy - 5, n, color })}
  ${t(66, yy, code, { mono: true, anchor: 'start' })}
  ${t(66, yy + 20, d, { size: SIZE.note, anchor: 'start' })}`;
  });
  return s;
};
const body = `
${left(20, 'p1', '何を表示するか（文字、表、並び順）', 'frontend/src/pages/ProductListPage.tsx の return の中（JSX）', [
  ['1', '<h2>商品一覧</h2>', '見出しの文字。ここを直すと、見出しが変わる'],
  ['2', '<th>商品名</th>', '表の見出しの文字。並び順も、タグの並びで決まる'],
])}
${left(226, 'p2', 'どう見せるか（色、余白、線）', 'frontend/src/index.css', [
  ['3', 'th { background: #f3f3f3; }', '見出しの行だけ、背景を薄い灰色にする'],
  ['4', '.number { text-align: right; }', 'className="number" を付けたマスだけ、右寄せにする'],
])}
  <g filter="url(#shadow)"><rect x="470" y="20" width="410" height="396" rx="16" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  <path d="M470 56 v-20 a16 16 0 0 1 16 -16 h378 a16 16 0 0 1 16 16 v20 z" fill="#e2e8f0" stroke="${C.gray.main}" stroke-width="2"/>
  <circle cx="488" cy="38" r="4" fill="#ef5350"/><circle cx="502" cy="38" r="4" fill="#ffb300"/><circle cx="516" cy="38" r="4" fill="#43a047"/>
  ${t(534, 43, 'localhost:5173/products', { size: SIZE.note, anchor: 'start', mono: true, fill: C.gray.dark })}
  ${t(675, 84, '画面のイメージ', { size: SIZE.note, anchor: 'start', fill: C.gray.main })}

  ${t(494, 130, '商品一覧', { size: SIZE.title, bold: true, anchor: 'start' })}
  ${L.badge({ cx: 618, cy: 123, n: '1', color: 'p1' })}
  <rect x="494" y="150" width="362" height="36" fill="#f3f3f3" stroke="#cbd5e1"/>
  <rect x="494" y="186" width="362" height="36" fill="#ffffff" stroke="#cbd5e1"/>
  <line x1="564" y1="150" x2="564" y2="222" stroke="#cbd5e1"/><line x1="674" y1="150" x2="674" y2="222" stroke="#cbd5e1"/><line x1="774" y1="150" x2="774" y2="222" stroke="#cbd5e1"/>
  ${t(504, 173, '商品ID', { size: SIZE.note, bold: true, anchor: 'start' })}
  ${t(574, 173, '商品名', { size: SIZE.note, bold: true, anchor: 'start' })}
  ${t(684, 173, '価格（円）', { size: SIZE.note, bold: true, anchor: 'start' })}
  ${t(784, 173, '在庫数', { size: SIZE.note, bold: true, anchor: 'start' })}
  ${t(504, 209, '1', { size: SIZE.note, anchor: 'start' })}
  ${t(574, 209, 'ボールペン', { size: SIZE.note, anchor: 'start' })}
  ${t(764, 209, '150', { size: SIZE.note, anchor: 'end' })}
  ${t(846, 209, '200', { size: SIZE.note, anchor: 'end' })}

  ${L.badge({ cx: 650, cy: 168, n: '2', color: 'p1' })}
  <line x1="530" y1="244" x2="530" y2="184" stroke="${C.p2.main}" stroke-width="2" stroke-dasharray="4,3"/>
  ${L.badge({ cx: 530, cy: 256, n: '3', color: 'p2' })}
  ${t(550, 261, '見出しの行の背景に効く', { size: SIZE.note, anchor: 'start' })}
  <line x1="750" y1="290" x2="750" y2="222" stroke="${C.p2.main}" stroke-width="2" stroke-dasharray="4,3"/>
  ${L.badge({ cx: 750, cy: 302, n: '4', color: 'p2' })}
  ${t(494, 307, '数字のマスの寄せ方に効く', { size: SIZE.note, anchor: 'start' })}
  ${t(494, 348, '1 と 2 は、表示される文字そのものを決める', { size: SIZE.note, anchor: 'start' })}
  <rect x="490" y="366" width="374" height="36" rx="10" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="1.5"/>
  ${t(677, 390, 'JSX は「中身」、CSS は「見た目」と覚える', { bold: true, fill: C.yellow.dark })}

  <g filter="url(#shadow)"><rect x="20" y="432" width="860" height="100" rx="12" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${L.icon({ name: 'alert-circle', x: 34, y: 444, size: 26, color: C.red.main })}
  ${t(72, 463, '注意：index.css は、すべての画面に適用される', { bold: true, fill: C.red.dark, anchor: 'start' })}
  ${t(36, 490, 'table { ... } のように、タグ名だけで書いた設定を変えると、ほかの画面の表にも影響する。', { anchor: 'start' })}
  ${t(36, 514, '特定の部品だけ変えたいときは、新しいクラス名を作って、その部品に className で付ける。', { anchor: 'start' })}`;

L.write('6-2-appearance', L.svg({
  y0: 548,
  title: '画面の見た目は、何を表示するか（JSX）とどう見せるか（CSS）の2か所で決まり、商品一覧の画面のどこに効くかを番号で示した図',
  desc: '何を表示するかは ProductListPage.tsx の JSX で決まる。1 は見出しの h2、2 は表の見出しの th。どう見せるかは index.css で決まる。3 は th の背景を薄い灰色にする設定、4 は number クラスのマスを右寄せにする設定。商品一覧の画面のイメージに番号を重ねて、どこに効くかを示している。index.css はすべての画面に適用されるので、タグ名だけの設定を変えるとほかの画面にも影響する。',
  body,
  footer: L.foot({ W: 900, y0: 548, pose: 'wave', lines: ['見た目は、JSX で何を出すかと、', 'CSS でどう見せるかの2か所で決まるんだ。', '直したい見た目は、どっちかな。'] }),
}));
