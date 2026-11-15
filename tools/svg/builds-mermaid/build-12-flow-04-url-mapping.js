// 12-flow-04: クラスと メソッドの指定から、呼ばれるメソッドが決まる流れ
const { node, arr, out } = require('./_wrap-12');
const nm = '12-flow-04-url-mapping';

const A = node({ x: 20, y: 20, w: 270, color: 'green', bold1: true, lines: ['クラスの @RequestMapping', { s: '/api/products', mono: true, bold: true }] });
const B = node({ x: 20, y: 120, w: 270, color: 'green', bold1: true, lines: ['メソッドの @GetMapping', 'URL の指定はなし'] });
const U = node({ x: 350, y: 70, w: 190, h: 56, color: 'green', lines: [{ s: '/api/products', mono: true, bold: true }] });
const M = node({ x: 600, y: 60, w: 280, color: 'green', bold1: true, lines: ['GET /api/products が来たとき', 'list メソッドが呼ばれる'] });

const body = A.s + B.s + U.s + M.s +
  arr({ x1: A.r + 2, y1: A.cy, x2: U.x - 5, y2: U.cy - 8, color: 'green' }) +
  arr({ x1: B.r + 2, y1: B.cy, x2: U.x - 5, y2: U.cy + 8, color: 'green' }) +
  arr({ x1: U.r + 2, y1: U.cy, x2: M.x - 5, y2: M.cy, color: 'green' });

out(nm, B.b, 'URL とメソッドが決まって、list メソッドが呼ばれる流れ',
  'クラスの @RequestMapping の /api/products と、メソッドの @GetMapping（URL の指定はなし）が合わさって、URL は /api/products になる。GET /api/products が来たとき、list メソッドが呼ばれる。',
  body,
  ['クラスの @RequestMapping', '/api/products', 'メソッドの @GetMapping', 'URL の指定はなし', 'GET /api/products が来たとき', 'list メソッドが呼ばれる']);
