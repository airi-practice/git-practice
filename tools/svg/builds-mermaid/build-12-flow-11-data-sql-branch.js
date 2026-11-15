// 12-flow-11: 起動時に data.sql が見本の商品を登録するかの分かれ道
const { C, t, SIZE, node, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-11-data-sql-branch';

const GAP = 36, X = 150, W = 600;
const A = node({ x: X, y: 20, w: W, h: 46, color: 'green', lines: ['Spring Boot が起動する'] });
const B = node({ x: X, y: A.b + GAP, w: W, color: 'green', lines: ['Product クラスを読んで', 'products テーブルがなければ作る', '（ddl-auto: update）'] });
const Cn = node({ x: X, y: B.b + GAP, w: W, color: 'green', lines: ['data.sql を実行する', '（defer-datasource-initialization: true で後回しになっている）'] });

// 分かれ道（ひし形）
const dy = Cn.b + GAP, dh = 120, dcx = 450, dcy = dy + dh / 2;
const dia = `
  <g filter="url(#shadow)"><polygon points="${dcx},${dy} ${dcx + 170},${dcy} ${dcx},${dy + dh} ${dcx - 170},${dcy}" fill="#ffffff" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(dcx, dcy - 4, 'products に', { fill: C.yellow.dark })}
  ${t(dcx, dcy + 18, '1件でもあるか', { fill: C.yellow.dark })}`;

const E = node({ x: 60, y: dy + dh + 30, w: 260, h: 46, color: 'gray', lines: ['登録しない'] });
const F = node({ x: 580, y: dy + dh + 30, w: 260, h: 46, color: 'green', lines: ['見本の商品を5件登録する'] });

const chain = [A, B, Cn];
const body = A.s + B.s + Cn.s + dia + E.s + F.s +
  chain.map((n, i) => arr({ x1: n.cx, y1: n.b + 2, x2: 450, y2: (chain[i + 1] ? chain[i + 1].y : dy) - 5, color: 'green' })).join('') +
  arr({ x1: dcx - 168, y1: dcy + 2, x2: E.cx, y2: E.y - 5, color: 'yellow' }) +
  arr({ x1: dcx + 168, y1: dcy + 2, x2: F.cx, y2: F.y - 5, color: 'yellow' }) +
  pill({ cx: 245, y: 0 + dcy + 28, label: 'ある', color: 'yellow' }) +
  pill({ cx: 655, y: dcy + 28, label: 'ない', color: 'yellow' });

out(nm, E.b, '起動時に data.sql が見本の商品を登録するかどうかの流れ',
  'Spring Boot が起動する。次に、Product クラスを読んで、products テーブルがなければ作る（ddl-auto: update）。次に、data.sql を実行する（defer-datasource-initialization: true で後回しになっている）。次に、products に1件でもあるかを調べる。ある場合は登録しない。ない場合は、見本の商品を5件登録する。',
  body,
  ['Spring Boot が起動する', 'Product クラスを読んで', 'products テーブルがなければ作る', '（ddl-auto: update）', 'data.sql を実行する', '（defer-datasource-initialization: true で後回しになっている）', 'products に', '1件でもあるか', 'ある', 'ない', '登録しない', '見本の商品を5件登録する']);
