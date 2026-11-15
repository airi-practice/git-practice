// 9-1-copy-points: お手本の ProductListPage.tsx から真似する4つのところを、コードの上に色分けして示す。
// 色: 4つの箇所は役割を持たない並列なので p1〜p4 で区別し、番号バッジと見出しも付ける。ファイル名の帯は青（フロントエンド）
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;

const code = (x, y, s, o = {}) => t(x, y, s, { size: SIZE.note, mono: true, anchor: 'start', fill: o.fill });
const hl = (y, h, color) => `<rect x="28" y="${y}" width="544" height="${h}" rx="8" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2.5"/>`;
const conn = (y1, y2, color) => `<line x1="572" y1="${y1}" x2="590" y2="${y2}" stroke="${C[color].main}" stroke-width="3" stroke-dasharray="5,4" stroke-linecap="round"/>`;
const wbadge = (cx, cy, n, color) => `<circle cx="${cx}" cy="${cy}" r="11" fill="#ffffff"/>
  ${t(cx, cy + 5, n, { size: SIZE.note, bold: true, fill: C[color].main })}`;
const cardNo = (x, y, n, color) => wbadge(x + 24, y + 23, n, color);
const nt = (x, y, s, o) => t(x, y, s, { size: SIZE.body, ...o });

const body = `
  <g filter="url(#shadow)"><rect x="20" y="15" width="560" height="426" rx="14" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/></g>
  <rect x="28" y="23" width="544" height="44" rx="8" fill="${C.blue.light}" stroke="${C.p1.main}" stroke-width="2.5"/>
  ${L.badge({ cx: 50, cy: 45, n: '1', color: 'p1' })}
  ${t(70, 51, 'frontend/src/pages/ProductListPage.tsx', { mono: true, bold: true, anchor: 'start', fill: C.blue.dark })}
  ${hl(144, 30, 'p2')}
  ${L.badge({ cx: 50, cy: 159, n: '2', color: 'p2' })}
  ${code(70, 164, 'export function ProductListPage() {')}
  ${hl(244, 30, 'p3')}
  ${L.badge({ cx: 50, cy: 259, n: '3', color: 'p3' })}
  ${code(70, 264, '  const [products, setProducts] = useState<Product[] | null>(null)'.replace(/^ +/, (m) => ' '.repeat(m.length)))}
  ${code(70, 306, '  ...', { fill: SUB })}
  ${hl(318, 116, 'p4')}
  ${L.badge({ cx: 50, cy: 336, n: '4', color: 'p4' })}
  ${code(70, 341, '  return (')}
  ${code(70, 364, '    <main>')}
  ${code(70, 387, '      <h2>商品一覧</h2>')}
  ${code(70, 410, '      ...', { fill: SUB })}

  ${conn(45, 58, 'p1')}
${L.card({ x: 590, y: 15, w: 290, h: 86, color: 'p1', title: 'ファイルの置き場所と名前' })}
  ${cardNo(590, 15, '1', 'p1')}
  ${nt(735, 85, 'pages/ の下に、○○Page.tsx')}

  ${conn(159, 172, 'p2')}
${L.card({ x: 590, y: 115, w: 290, h: 86, color: 'p2', title: '部品の書き方' })}
  ${cardNo(590, 115, '2', 'p2')}
  ${t(735, 185, 'export function ○○Page() { ... }', { size: SIZE.note, mono: true, fill: C.p2.dark })}

  ${conn(259, 272, 'p3')}
${L.card({ x: 590, y: 215, w: 290, h: 86, color: 'p3', title: '覚えておくデータの持ち方' })}
  ${cardNo(590, 215, '3', 'p3')}
  ${nt(735, 285, 'useState で、画面が覚えておく値を作る')}

  ${conn(376, 372, 'p4')}
${L.card({ x: 590, y: 315, w: 290, h: 126, color: 'p4', title: '画面の外枠' })}
  ${cardNo(590, 315, '4', 'p4')}
  ${nt(735, 377, 'return の一番外側を <main> で囲み、')}
  ${nt(735, 399, '中に <h2> で見出しを書く')}
  ${nt(735, 424, '（新しい画面も、同じ形にそろえる）', { size: SIZE.note, fill: SUB })}`;

const y0 = 457;
L.write('9-1-copy-points', L.svg({
  y0,
  title: 'お手本の ProductListPage.tsx から真似する4つのところを、実際のコードの上に色分けして示した図',
  desc: '商品一覧のお手本 ProductListPage.tsx から真似するところは4つ。1つめはファイルの置き場所と名前（pages/ の下に ○○Page.tsx）。2つめは部品の書き方（export function ○○Page() { ... }）。3つめは覚えておくデータの持ち方（useState で、画面が覚えておく値を作る）。4つめは画面の外枠（return の一番外側を main で囲み、中に h2 で見出しを書く。新しい画面も、同じ形にそろえる）。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['お手本の ProductListPage.tsx から、', '真似するところは4つあるんだ。', '新しい画面も、同じ形にそろえてみよう。'] }),
}));
