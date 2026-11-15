// 2-1-tag-to-screen: HTML のタグ4つが、画面の4つの部品になる。役割のない4項目なので p1〜p4 で区別し、ラベルも付ける。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const rows = [
  { c: 'p1', tag: '<h1>商品一覧</h1>', label: '見出し' },
  { c: 'p2', tag: '<p>5件あります</p>', label: '文章' },
  { c: 'p3', tag: '<input type="text" />', label: '入力欄' },
  { c: 'p4', tag: '<button>購入</button>', label: 'ボタン' },
];
const ry = (k) => 82 + 56 * k;
let body = L.card({ x: 20, y: 20, w: 400, h: 290, color: 'blue', title: 'HTML（タグを書く）' })
  + '\n' + L.card({ x: 480, y: 20, w: 400, h: 290, color: 'blue', title: '画面（ブラウザに表示される）' });
rows.forEach((r, k) => {
  const y = ry(k), c = C[r.c];
  body += `
  <rect x="40" y="${y}" width="360" height="44" rx="10" fill="${c.light}" stroke="${c.main}" stroke-width="2"/>
  ${t(220, y + 29, r.tag, { size: SIZE.head, mono: true, fill: c.dark })}
  ${L.arrow({ x1: 428, y1: y + 22, x2: 474, y2: y + 22, color: 'gray', width: 4 })}
  ${t(452, y + 10, r.label, { size: SIZE.note, bold: true, fill: C.gray.dark })}
  <rect x="500" y="${y}" width="360" height="44" rx="10" fill="#ffffff" stroke="${c.main}" stroke-width="2"/>`;
});
body += `
  ${t(520, ry(0) + 30, '商品一覧', { size: SIZE.title, bold: true, anchor: 'start' })}
  ${t(520, ry(1) + 28, '5件あります', { anchor: 'start' })}
  <rect x="520" y="${ry(2) + 8}" width="200" height="28" rx="4" fill="#ffffff" stroke="#767676" stroke-width="1.5"/>
  <rect x="520" y="${ry(3) + 8}" width="70" height="28" rx="6" fill="#efefef" stroke="#767676" stroke-width="1.5"/>
  ${t(555, ry(3) + 28, '購入', { fill: '#000000' })}`;
const y0 = 326;
L.write('2-1-tag-to-screen', L.svg({
  y0,
  title: 'HTML のタグを書くと、そのタグの部品が画面に表示されることを示した図',
  desc: '左の HTML に書いた見出し・文章・入力欄・ボタンのタグが、右の画面でそれぞれ見出し・文章・入力欄・ボタンの部品として表示される。猫の先生が、タグ1つが画面の1つの部分になると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['HTMLのタグを1つ書くと、画面の部品が', '1つ表示されるんだ。'] }),
}));
