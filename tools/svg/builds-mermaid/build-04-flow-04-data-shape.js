const { L, node, label, finish, nodeH } = require('./_common');
const N = [
  { color: 'orange', lines: ['products テーブルの1行', 'id / name / price / stock / created_at'] },
  { color: 'green', lines: ['ResultSet の1行', 'SELECT で指定した', 'id / name / price / stock の4項目'] },
  { color: 'green', lines: ['ProductResponse（クラス）', 'dto/ProductResponse.java', 'id / name / price / stock の4項目'] },
  { color: 'gray', lines: ['JSON', 'id / name / price / stock'] },
  { color: 'blue', lines: ['Product 型', 'frontend/src/types/product.ts'] },
  { color: 'blue', lines: ['表の1行', 'ProductListPage.tsx の tr'] },
];
const E = [
  { c: 'orange', lines: ['SELECT で 4 項目を選んで取り出す'] },
  { c: 'green', lines: ['rs.getLong などで値を取り出し、', 'new ProductResponse で詰める'] },
  { c: 'green', lines: ['ctx.json が getter の名前を見て変換する'] },
  { c: 'gray', lines: ['response.json() が変換する'] },
  { c: 'blue', lines: ['map で画面にする'] },
];
const GAP = 60;
let y = 20, b = '';
const pos = N.map((n) => { const h = nodeH(n.lines.length); const p = { y, h }; y += h + GAP; return p; });
N.forEach((n, i) => { b += `\n  ${node({ x: 20, y: pos[i].y, w: 400, h: pos[i].h, color: n.color, lines: n.lines, bold1: true })}`; });
E.forEach((e, i) => {
  const y1 = pos[i].y + pos[i].h, y2 = pos[i + 1].y;
  b += `\n  ${L.arrow({ x1: 220, y1: y1 + 2, x2: 220, y2: y2 - 2, color: e.c })}`;
  b += `\n  ${label({ cx: 270 + 190, cy: (y1 + y2) / 2, w: 380, lines: e.lines, color: e.c })}`;
});
finish('04-flow-04-data-shape', {
  bottom: y - GAP, body: b,
  title: '商品1件のデータが、products テーブルの1行から、ResultSet の1行、ProductResponse、JSON、Product 型を通って、表の1行になるまでに形を変えていく流れの図',
  desc: 'products テーブルの1行（id / name / price / stock / created_at）から、SELECT で4項目を選んで取り出し、ResultSet の1行にする。rs.getLong などで値を取り出し、new ProductResponse で詰めて ProductResponse（クラス）にする。ctx.json が getter の名前を見て変換して JSON にする。response.json() が変換して Product 型にする。map で画面にして、表の1行になる。',
});
