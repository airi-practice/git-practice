// 12-flow-06: Repository と データベースの間でやりとりされるもの
const { node, grp, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-06-repository-db';

const gj = grp({ x: 20, y: 20, w: 320, h: 278, color: 'green', label: 'バックエンドの Java プログラムの中' });
const gd = grp({ x: 580, y: 20, w: 300, h: 160, color: 'orange', label: 'Docker のコンテナの中' });
const R = node({ x: 40, y: 64, w: 280, h: 96, color: 'green', bold1: true, lines: ['ProductRepository', '倉庫の係にあたる'] });
const EN = node({ x: 40, y: 210, w: 280, h: 68, color: 'green', bold1: true, lines: ['Product', '荷物1つ分にあたる'] });
const PG = node({ x: 600, y: 64, w: 260, h: 96, color: 'orange', lines: ['PostgreSQL の', 'products テーブル', '倉庫にあたる'] });

const body = gj + gd + R.s + EN.s + PG.s +
  arr({ x1: R.r + 2, y1: 88, x2: PG.x - 5, y2: 88, color: 'green' }) +
  arr({ x1: PG.x - 2, y1: 136, x2: R.r + 5, y2: 136, color: 'orange' }) +
  pill({ cx: 460, y: 73, label: 'SQL を送る', color: 'green' }) +
  pill({ cx: 460, y: 121, label: '行のデータを返す', color: 'orange' }) +
  arr({ x1: R.cx, y1: R.b + 2, x2: EN.cx, y2: EN.y - 5, color: 'green' });

out(nm, 298, 'ProductRepository と PostgreSQL の products テーブルのやりとり',
  'バックエンドの Java プログラムの中にある ProductRepository（倉庫の係）が、Docker のコンテナの中にある PostgreSQL の products テーブル（倉庫）へ SQL を送る。products テーブルは行のデータを ProductRepository へ返す。ProductRepository は、そのデータから Product（荷物1つ分）を作る。',
  body,
  ['バックエンドの Java プログラムの中', 'Docker のコンテナの中', 'ProductRepository', '倉庫の係にあたる', 'Product', '荷物1つ分にあたる', 'PostgreSQL の products テーブル', '倉庫にあたる', 'SQL を送る', '行のデータを返す']);
