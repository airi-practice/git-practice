// 12-flow-08: findAll でデータが取得される流れ
const { node, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-08-findall-flow';

const W = 250, X1 = 20, X2 = 325, X3 = 630;
const S = node({ x: X1, y: 20, w: W, h: 90, color: 'green', bold1: true, lines: ['ProductService', 'productRepository.findAll()', 'を呼ぶ'] });
const R = node({ x: X2, y: 20, w: W, h: 90, color: 'green', bold1: true, lines: ['ProductRepository', 'JpaRepository の機能'] });
const SQL = node({ x: X3, y: 20, w: W, h: 90, color: 'green', bold1: true, lines: ['SQL が自動で作られる', 'products の全件を取得する', 'SELECT'] });
const E = node({ x: X1, y: 200, w: W, h: 90, color: 'green', bold1: true, lines: ['Product のリスト', '1行が1つの Product になる'] });
const D = node({ x: X3, y: 200, w: W, h: 90, color: 'orange', bold1: true, lines: ['PostgreSQL', 'products テーブル'] });

const body = S.s + R.s + SQL.s + E.s + D.s +
  arr({ x1: S.r + 2, y1: S.cy, x2: R.x - 5, y2: R.cy, color: 'green' }) +
  arr({ x1: R.r + 2, y1: R.cy, x2: SQL.x - 5, y2: SQL.cy, color: 'green' }) +
  arr({ x1: SQL.cx, y1: SQL.b + 2, x2: D.cx, y2: D.y - 5, color: 'green' }) +
  arr({ x1: D.x - 2, y1: D.cy, x2: E.r + 5, y2: E.cy, color: 'orange' }) +
  pill({ cx: 450, y: E.cy - 15, label: '行のデータ', color: 'orange' }) +
  arr({ x1: E.cx, y1: E.y - 2, x2: S.cx, y2: S.b + 5, color: 'green' });

out(nm, 290, 'findAll でデータが取得されて、ProductService に戻るまでの流れ',
  'ProductService が productRepository.findAll() を呼ぶ。ProductRepository（JpaRepository の機能）が、products の全件を取得する SELECT の SQL を自動で作る。SQL は PostgreSQL の products テーブルに送られ、行のデータが返ってくる。1行が1つの Product になり、Product のリストになって、ProductService に戻る。',
  body,
  ['ProductService', 'productRepository.findAll() を呼ぶ', 'ProductRepository', 'JpaRepository の機能', 'SQL が自動で作られる', 'products の全件を取得する SELECT', 'PostgreSQL', 'products テーブル', '行のデータ', 'Product のリスト', '1行が1つの Product になる']);
