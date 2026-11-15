// 12-flow-09: ProductResponse の一覧が JSON になる流れ
const { node, arr, out } = require('./_wrap-12');
const nm = '12-flow-09-json-convert';

const A = node({ x: 20, y: 20, w: 240, color: 'green', bold1: true, lines: ['ProductService が返す', 'ProductResponse の一覧', 'id・name・price・stock'] });
const B = node({ x: 310, y: 20, w: 200, h: A.h, color: 'green', bold1: true, lines: ['Spring Boot が', 'JSON に変換する'] });
const C = node({ x: 560, y: 20, w: 320, h: A.h, color: 'green', bold1: true, lines: ['JSON の配列', '1件ずつ id・name・price・stock を持つ'] });

const body = A.s + B.s + C.s +
  arr({ x1: A.r + 2, y1: A.cy, x2: B.x - 5, y2: B.cy, color: 'green' }) +
  arr({ x1: B.r + 2, y1: B.cy, x2: C.x - 5, y2: C.cy, color: 'green' });

out(nm, A.b, 'ProductResponse の一覧が JSON の配列になる流れ',
  'ProductService が返す ProductResponse の一覧（id・name・price・stock）を、Spring Boot が JSON に変換する。結果は JSON の配列で、1件ずつ id・name・price・stock を持つ。',
  body,
  ['ProductService が返す', 'ProductResponse の一覧', 'id・name・price・stock', 'Spring Boot が', 'JSON に変換する', 'JSON の配列', '1件ずつ id・name・price・stock を持つ']);
