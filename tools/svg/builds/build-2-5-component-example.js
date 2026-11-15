// 2-5-component-example: 関数（コード）を実行すると、画面の一部が表示される。どちらもブラウザ側なので青。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, LINE } = L;
const NB = ' ';
const row = (y, hdr) => `<rect x="610" y="${y}" width="238" height="28" fill="${hdr ? '#e2e8f0' : '#ffffff'}" stroke="#cbd5e1"/>`;
const body = L.card({ x: 20, y: 20, w: 490, h: 304, color: 'blue', title: '部品の正体は「関数」', sub: '（ProductListPage.tsx の抜粋）' })
  + `
  ${L.box({ x: 40, y: 110, w: 450, h: 92, color: 'blue' })}
  ${t(56, 136, 'export function ProductListPage() {', { mono: true, anchor: 'start', fill: C.blue.dark })}
  ${t(56, 162, NB + NB + 'return (', { mono: true, anchor: 'start', fill: C.blue.dark })}
  ${t(56, 188, NB.repeat(6) + '（ここに、画面に出したい形を書く）', { anchor: 'start', fill: C.blue.dark })}
  <rect x="40" y="214" width="450" height="98" rx="10" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>
  ${t(56, 241, '・関数の名前（ProductListPage）が、部品の名前になる', { anchor: 'start' })}
  ${t(56, 267, '・return の中に、この部品が画面に出す形を書く', { anchor: 'start' })}
  ${t(56, 293, '・商品一覧の画面は、この部品1つでできている', { anchor: 'start' })}
  ${L.arrow({ x1: 520, y1: 180, x2: 570, y2: 180, color: 'blue' })}
  ${t(545, 160, '実行', { size: SIZE.note, bold: true, fill: C.blue.dark })}`
  + '\n' + L.card({ x: 580, y: 20, w: 300, h: 304, color: 'blue', title: '画面に表示される' })
  + `
  <g filter="url(#shadow)"><rect x="596" y="84" width="268" height="224" rx="10" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="1.5"/></g>
  ${t(610, 116, '商品一覧', { size: SIZE.title, bold: true, anchor: 'start' })}
  ${row(130, true)}
  ${t(618, 149, '商品ID　商品名　価格（円）　在庫数', { size: SIZE.note, anchor: 'start' })}
  ${row(158)}${row(186)}${row(214)}
  ${t(730, 276, '（見出しの下に、商品の行が並ぶ表）', { size: SIZE.note, fill: SUB })}`;
const y0 = 340;
L.write('2-5-component-example', L.svg({
  y0,
  title: 'ProductListPage という関数が、1つの部品として商品一覧の画面の一部を返すことを示した図',
  desc: '左は ProductListPage.tsx の抜粋で、export function ProductListPage() の中の return に画面に出したい形を書く。関数を実行すると、右のように商品一覧の見出しと、商品の行が並ぶ表が画面に表示される。猫の先生が、関数を実行すると return に書いた形が画面の一部として表示されると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['関数を実行すると、returnに書いた形が', '画面の一部として表示されるよ。'] }),
}));
