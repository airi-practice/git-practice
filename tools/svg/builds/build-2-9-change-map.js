// 2-9-change-map: ProductListPage.tsx のどの行を書き換えると、画面のどの部分が変わるかの対応図。
// 3か所の対応は役割のない項目なので p1・p2・p3 で区別し、番号と矢印の色を合わせる
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const NB = '\u00A0';
const marks = ['p1', 'p2', 'p3'].map((k) => `<marker id="m-${k}" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0,0 L16,8 L0,16 z" fill="${C[k].main}"/></marker>`).join('');
const path = (d, k) => `<path d="${d}" fill="none" stroke="${C[k].main}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#m-${k})"/>`;
const blk = (y, h, k, label, lines) => `
  <rect x="35" y="${y}" width="370" height="${h}" rx="10" fill="${C[k].light}" stroke="${C[k].main}" stroke-width="2"/>
  ${t(47, y + 22, label, { size: SIZE.note, bold: true, anchor: 'start', fill: C[k].dark })}
${lines.map((s, i) => '  ' + t(47, y + 46 + i * 22, s, { mono: true, anchor: 'start' })).join('\n')}`;
const cell = (x, w, h0, txt, opt = {}) => t(x + w / 2, h0, txt, { size: SIZE.note, ...opt });
const body = `
  <defs>${marks}</defs>
${L.card({ x: 20, y: 20, w: 400, h: 440, color: 'gray', title: 'ProductListPage.tsx のコード' })}
${blk(82, 62, 'p1', '試す①', ['<h2>商品一覧</h2>'])}
${blk(160, 62, 'p2', '試す②', ['<th>価格（円）</th>'])}
${blk(238, 108, 'p3', '試す③', ['<td className="number">', NB + NB + '{product.stock === 0 ?', NB + NB + "'在庫なし' : product.stock}"])}
  ${t(220, 384, '書き換えるのは、この3か所だけ', { bold: true })}
  ${t(220, 410, '保存すると、Vite が画面を自動で更新する')}
${L.card({ x: 480, y: 20, w: 400, h: 440, color: 'blue', title: 'ブラウザに表示される画面' })}
  <rect x="500" y="82" width="360" height="56" rx="10" fill="${C.p1.light}" stroke="${C.p1.main}" stroke-width="2"/>
  ${t(516, 118, '商品一覧', { size: SIZE.head, bold: true, anchor: 'start', fill: C.p1.dark })}
  ${t(845, 116, '見出しの文字が変わる', { size: SIZE.note, anchor: 'end', fill: C.p1.dark })}
  <rect x="500" y="170" width="70" height="34" fill="#cbd5e1"/><rect x="570" y="170" width="120" height="34" fill="#cbd5e1"/>
  <rect x="690" y="170" width="90" height="34" fill="${C.p2.light}" stroke="${C.p2.main}" stroke-width="2.5"/><rect x="780" y="170" width="80" height="34" fill="#cbd5e1"/>
  ${cell(500, 70, 192, '商品ID')}${cell(570, 120, 192, '商品名')}${cell(690, 90, 192, '価格（円）', { bold: true, fill: C.p2.dark })}${cell(780, 80, 192, '在庫数')}
  <g stroke="#e2e8f0">
  <rect x="500" y="204" width="360" height="32" fill="#ffffff"/><rect x="500" y="236" width="360" height="32" fill="#ffffff"/>
  </g>
  <rect x="500" y="268" width="360" height="32" fill="${C.p3.light}" stroke="${C.p3.main}" stroke-width="2.5"/>
  ${[['1', 224, '商品の名前', 'price'], ['2', 256, '商品の名前', 'price'], ['3', 288, '在庫が 0 の商品', 'price']].map(([n, yy, name]) => cell(500, 70, yy, n) + cell(570, 120, yy, name) + t(770, yy, '価格', { size: SIZE.note, anchor: 'end' })).join('')}
  ${t(850, 224, '在庫', { size: SIZE.note, anchor: 'end' })}${t(850, 256, '在庫', { size: SIZE.note, anchor: 'end' })}
  ${t(850, 288, '在庫なし', { size: SIZE.note, bold: true, anchor: 'end', fill: C.p3.dark })}
${L.pill({ cx: 680, y: 316, w: 370, label: '列の見出しだけが変わる（数字は変わらない）', n: '2', color: 'p2' })}
${L.pill({ cx: 680, y: 354, w: 370, label: '在庫が 0 の行だけ、数字が「在庫なし」に変わる', n: '3', color: 'p3' })}
  ${t(680, 412, '矢印の色が同じところが、書き換えた場所と変わる場所の対応だよ', { size: SIZE.note, fill: SUB })}
  ${t(680, 434, '試し終わったら、コピーしておいたファイルで元に戻す', { size: SIZE.note, fill: SUB })}
  ${path('M406,113 L496,113', 'p1')}
  ${path('M406,191 L442,191 L442,154 L735,154 L735,166', 'p2')}
  ${path('M406,292 C450,292 470,286 496,285', 'p3')}`;
const y0 = 476;
L.write('2-9-change-map', L.svg({
  y0,
  title: 'ProductListPage.tsx のどの行を書き換えると、画面のどの部分が変わるかの対応図',
  desc: '左は ProductListPage.tsx のコードで、書き換える3か所。試す①の <h2>商品一覧</h2> は画面の見出しの文字に、試す②の <th>価格（円）</th> は表の列の見出し（数字は変わらない）に、試す③の在庫が 0 のときに「在庫なし」を出す <td className="number"> の部分は、在庫が 0 の行の数字が「在庫なし」に変わる部分に対応する。矢印の色が同じところが対応している。保存すると Vite が画面を自動で更新する。試し終わったら、コピーしておいたファイルで元に戻す。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['書き換えた場所が、画面のどこに響くか', '試して確かめてみよう！'] }),
}));
