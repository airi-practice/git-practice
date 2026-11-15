// 6-6-data-change: 「登録日時」1項目が、データベースから画面まで通る道と、直す4か所。
// 色: データベース=橙、バックエンド=緑、フロントエンド=青、JSON（運ばれるもの）=灰、赤い印の項目=赤（本文が「赤い印」と呼ぶため）
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const RH = 84, GAP = 22, TOP = 156, LX = 20, LW = 250, RX = 286, RW = 594;
const MONO = `font-family="Consolas,'Courier New',monospace"`;
const red = C.red;
const rowY = (i) => TOP + i * (RH + GAP);
// 左の箱。n は直す順番のバッジ（データベースにはなし）
const left = (i, color, n, title, file, note) => {
  const y = rowY(i), c = C[color];
  return `
  <g filter="url(#shadow)"><rect x="${LX}" y="${y}" width="${LW}" height="${RH}" rx="14" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
  <path d="M${LX} ${y + 36} v-20 a14 14 0 0 1 14 -14 h${LW - 28} a14 14 0 0 1 14 14 v20 z" fill="${c.light}"/>
  <line x1="${LX + 1}" y1="${y + 36}" x2="${LX + LW - 1}" y2="${y + 36}" stroke="${c.main}" stroke-opacity="0.35"/>
  ${n ? `<circle cx="${LX + 22}" cy="${y + 20}" r="11" fill="${c.main}"/>\n  ${t(LX + 22, y + 25, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}` : ''}
  ${t(LX + (n ? 42 : 16), y + 26, title, { size: SIZE.head, bold: true, fill: c.dark, anchor: 'start' })}
  ${t(LX + 16, y + 56, file, { size: SIZE.note, fill: '#1e293b', anchor: 'start', mono: true })}
  ${t(LX + 16, y + 74, note, { size: SIZE.note, fill: SUB, anchor: 'start' })}`;
};
const panel = (i, color) => `<rect x="${RX}" y="${rowY(i)}" width="${RW}" height="${RH}" rx="14" fill="${C[color].light}" fill-opacity="0.55" stroke="${C[color].main}" stroke-opacity="0.6" stroke-width="1.5"/>`;
// 項目の並び。hot はその項目名（赤い印）。widths は文字数に合わせた幅
const chips = (i, names, hot, tail) => {
  const y = rowY(i) + 10;
  let x = RX + 14;
  return names.map((n, k) => {
    const isHot = k === names.length - 1;
    const w = n.length * 10 + 24;
    const s = `<rect x="${x}" y="${y}" width="${w}" height="34" rx="8" fill="${isHot ? red.light : '#ffffff'}" stroke="${isHot ? red.main : '#94a3b8'}" stroke-width="${isHot ? 2.5 : 1.5}"/>`
      + t(x + w / 2, y + 23, n, { size: SIZE.body, mono: true, bold: isHot, fill: isHot ? red.main : '#1e293b' });
    const xe = x + w;
    x += w + 8;
    return s;
  }).join('\n  ') + (tail ? '\n  ' + t(x + 4, y + 23, tail, { size: SIZE.body, mono: true, anchor: 'start' }) : '');
};
const arr = (i, color) => L.arrow({ x1: 145, y1: rowY(i) + RH + 2, x2: 145, y2: rowY(i + 1) - 3, color, width: 4 });
const raw = (x, y, inner, fill = '#1e293b', extra = '') => `<text x="${x}" y="${y}" font-size="13" ${MONO} fill="${fill}"${extra}>${inner}</text>`;

const body = `
  ${t(450, 36, '「登録日時」という1つの項目が、データベースから画面まで通る道', { size: SIZE.title, bold: true })}
  ${t(450, 62, '赤い印の項目が、登録日時。丸の番号は、直す順番（本文の表の番号）。途中のどこかで抜けると、画面に出ない', { size: SIZE.note, fill: SUB })}
  <g filter="url(#shadow)"><rect x="20" y="76" width="860" height="66" rx="14" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(40, 100, 'データが流れる順', { bold: true, fill: C.yellow.dark, anchor: 'start' })}${t(176, 100, 'DB → 2 → 1 → 3 → 4', { bold: true, mono: true, anchor: 'start' })}
  ${t(480, 100, '直す順番', { bold: true, fill: C.yellow.dark, anchor: 'start' })}${t(560, 100, '1 → 2 → 3 → 4', { bold: true, mono: true, anchor: 'start' })}
  ${t(40, 126, '1 と 2 だけ入れ替わる。表の順で直せば安心だ', { size: SIZE.note, fill: SUB, anchor: 'start' })}

${left(0, 'orange', null, 'データベース', 'products テーブル', 'created_at 列は、すでにある')}
  ${panel(0, 'orange')}
  ${chips(0, ['id', 'name', 'price', 'stock', 'created_at'])}
  ${arr(0, 'orange')}
${left(1, 'green', '2', '取り出す SQL', 'api/ProductListApi.java', '今は created_at を取り出していない')}
  ${panel(1, 'green')}
  ${raw(RX + 16, rowY(1) + 22, `SELECT id, name, price, stock<tspan fill="${red.main}" font-weight="bold">, created_at</tspan> FROM products`)}
  ${raw(RX + 16, rowY(1) + 40, 'ORDER BY id')}
  ${t(RX + 16, rowY(1) + 60, 'rs.getTimestamp("created_at") で値を取り出し、', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${t(RX + 16, rowY(1) + 78, 'new ProductResponse(...) に渡す', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${arr(1, 'green')}
${left(2, 'green', '1', 'レスポンスの形', 'dto/ProductResponse.java', 'フィールド・引数・getter の3か所')}
  ${panel(2, 'green')}
  ${chips(2, ['id', 'name', 'price', 'stock', 'createdAt'])}
  ${t(RX + 16, rowY(2) + 70, 'getCreatedAt() を足す', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${arr(2, 'green')}
${left(3, 'gray', null, 'JSON のレスポンス', 'ctx.json(products) が作る', '項目名は getter の名前から決まる')}
  ${panel(3, 'gray')}
  ${raw(RX + 16, rowY(3) + 26, '{"id":1, "name":"ボールペン", "price":150, "stock":200,')}
  ${raw(RX + 16, rowY(3) + 46, '"createdAt":"2026-11-11T22:51:15.853946"}', red.main, ' font-weight="bold"')}
  ${t(RX + 16, rowY(3) + 70, '（値は例）', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${arr(3, 'green')}
${left(4, 'blue', '3', '届くデータの型', 'frontend/src/types/product.ts', 'Product 型に項目を足す')}
  ${panel(4, 'blue')}
  ${chips(4, ['id', 'name', 'price', 'stock', 'createdAt'], null, ': string')}
  ${arr(4, 'blue')}
${left(5, 'blue', '4', '画面の表', 'pages/ProductListPage.tsx', 'th と td を1つずつ足す')}
  ${panel(5, 'blue')}
  ${[['商品ID', 80], ['商品名', 90], ['価格（円）', 110], ['在庫数', 90], ['登録日時', 100]].map((c, k, a) => {
    const x = RX + 14 + a.slice(0, k).reduce((s, v) => s + v[1] + 8, 0), hot = k === 4;
    return `<rect x="${x}" y="${rowY(5) + 10}" width="${c[1]}" height="34" rx="8" fill="${hot ? red.light : '#ffffff'}" stroke="${hot ? red.main : '#94a3b8'}" stroke-width="${hot ? 2.5 : 1.5}"/>` + t(x + c[1] / 2, rowY(5) + 32, c[0], { bold: hot, fill: hot ? red.main : '#1e293b' });
  }).join('\n  ')}
  ${t(RX + 16, rowY(5) + 70, 'th と td を1つずつ足す', { size: SIZE.note, anchor: 'start', fill: SUB })}`;
const y0 = rowY(5) + RH + 16;
L.write('6-6-data-change', L.svg({
  y0,
  title: '商品一覧に登録日時（created_at）を足すとき、1つの項目がデータベースから画面まで通る道と、直す4か所を示した図',
  desc: '登録日時の項目は、データベースの products テーブルにすでにある。データは、データベースから、取り出す SQL（2）、レスポンスの形 ProductResponse（1）、JSON のレスポンス、届くデータの型 Product（3）、画面の表（4）の順に流れる。直す順番は 1、2、3、4 で、1 と 2 だけデータが流れる順と入れ替わる。猫の先生が、番号の順に1か所ずつ見ていこうと話している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['項目を1つ足すときは、データベースから', '画面まで通る道の4か所を直すんだ。', '番号の順に、1か所ずつ見ていこう。'] }),
}));
