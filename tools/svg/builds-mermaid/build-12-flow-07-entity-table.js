// 12-flow-07: Product（Entity）の項目と products テーブルの列の対応
const { C, node, grp, out } = require('./_wrap-12');
const nm = '12-flow-07-entity-table';

const rows = [
  [['Long id', '@Id と @GeneratedValue'], ['id BIGINT PK']],
  [['String name', '@Column length 100'], ['name VARCHAR 100']],
  [['Integer price'], ['price INTEGER']],
  [['Integer stock'], ['stock INTEGER']],
  [['LocalDateTime createdAt', '@Column name created_at'], ['created_at TIMESTAMP']],
];
const gE = grp({ x: 20, y: 20, w: 380, h: 468, color: 'green', label: 'Product.java（Entity）' });
const gT = grp({ x: 500, y: 20, w: 380, h: 468, color: 'orange', label: 'products テーブル' });
let body = gE + gT;
rows.forEach(([el, tl], i) => {
  const y = 64 + i * 84;
  const e = node({ x: 40, y, w: 340, h: 68, color: 'green', bold1: true, lines: el });
  const tt = node({ x: 520, y, w: 340, h: 68, color: 'orange', lines: tl });
  body += e.s + tt.s +
    `\n  <line x1="${e.r}" y1="${e.cy}" x2="${tt.x}" y2="${tt.cy}" stroke="${C.gray.main}" stroke-width="5" stroke-linecap="round"/>`;
});

out(nm, 488, 'Product（Entity）の項目と、products テーブルの列の対応',
  'Product.java（Entity）の項目と products テーブルの列が、1つずつ対応する。Long id（@Id と @GeneratedValue）は id BIGINT PK、String name（@Column length 100）は name VARCHAR 100、Integer price は price INTEGER、Integer stock は stock INTEGER、LocalDateTime createdAt（@Column name created_at）は created_at TIMESTAMP に対応する。',
  body,
  ['Product.java（Entity）', 'products テーブル', 'Long id', '@Id と @GeneratedValue', 'String name', '@Column length 100', 'Integer price', 'Integer stock', 'LocalDateTime createdAt', '@Column name created_at', 'id BIGINT PK', 'name VARCHAR 100', 'price INTEGER', 'stock INTEGER', 'created_at TIMESTAMP']);
