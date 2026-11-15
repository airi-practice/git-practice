// 12-8-datasql-parts: INSERT を4つの部分に分けて読む。4つの部分は役割を持たないので p1〜p4 で区別し、番号も付ける。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const rows = [
  ['p1', 'INSERT INTO products (name, price, stock, created_at)', 'products テーブルの、この4つの列に、', 'データを登録する（id は自動で付く）'],
  ['p2', 'SELECT v.name, v.price, v.stock, CURRENT_TIMESTAMP', '登録する値を、下の v から取り出す。', '登録日時は、実行した時刻'],
  ['p3', ["FROM (VALUES ('ボールペン', 150, 200), ...)", 'AS v(name, price, stock)'], '5件分の商品名・価格・在庫数を並べた、', '仮の表を作って、v と名付ける'],
  ['p4', 'WHERE NOT EXISTS (SELECT 1 FROM products)', 'products に1件もないときだけ、', 'という条件'],
];
const rowH = 66, gap = 10, top0 = 62;
let body = `
  ${t(105, 38, 'data.sql の INSERT', { size: SIZE.title, bold: true, mono: true, anchor: 'start' })}
  ${t(330, 38, 'を、部分ごとに読む（実際は、続けて1つの文）', { size: SIZE.title, bold: true, anchor: 'start' })}`;
rows.forEach((r, i) => {
  const [col, code, d1, d2] = r, c = C[col], y = top0 + i * (rowH + gap), mid = y + rowH / 2;
  const lines = Array.isArray(code) ? code : [code];
  body += `
  <g filter="url(#shadow)"><rect x="20" y="${y}" width="480" height="${rowH}" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  ${lines.map((s, k) => t(260, lines.length === 1 ? mid + 5 : y + 28 + k * 24, s, { mono: true, bold: true, fill: c.dark })).join('\n  ')}
  ${L.badge({ cx: 20, cy: y, n: i + 1, color: col })}
  ${L.arrow({ x1: 506, y1: mid, x2: 540, y2: mid, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="546" y="${y}" width="334" height="${rowH}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
  ${t(713, y + 28, d1)}
  ${t(713, y + 50, d2)}`;
});
const yb = top0 + 4 * (rowH + gap) - gap; // 4つ目の下端
body += `
  ${L.arrow({ x1: 450, y1: yb + 4, x2: 450, y2: yb + 28, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="20" y="${yb + 32}" width="860" height="52" rx="14" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(450, yb + 65, 'バックエンドを何度起動しても、同じ商品が増えない', { size: SIZE.head, bold: true, fill: C.green.dark })}`;
const y0 = yb + 84 + 16;
L.write('12-8-datasql-parts', L.svg({
  y0,
  title: 'data.sql の INSERT を、4つの部分に分けて、それぞれの意味と結びつけた図',
  desc: 'INSERT INTO products で4つの列にデータを登録し、SELECT で値を v から取り出し、FROM (VALUES ...) で5件分の仮の表 v を作り、WHERE NOT EXISTS で products が空のときだけ実行する。その結果、バックエンドを何度起動しても同じ商品が増えない。猫の先生が、部分ごとに読めば何をしているか分かると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['INSERT は部分ごとに読めば、', '何をしているか分かるんだよ。', 'まず4つの列を見てみよう。'] }),
}));
