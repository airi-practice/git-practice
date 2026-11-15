// 12-flow-05: 自分で new する場合と、Spring Boot が渡す場合の比較
const { node, grp, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-05-di-compare';

// 自分で new する場合（比較用なので灰）
const gx = grp({ x: 20, y: 20, w: 860, h: 120, color: 'gray', label: '自分で new する場合' });
const X1 = node({ x: 40, y: 64, w: 200, h: 46, color: 'gray', lines: ['ProductController'] });
const X2 = node({ x: 660, y: 64, w: 200, h: 46, color: 'gray', lines: ['ProductService'] });

// このシステム（緑）
const gy = grp({ x: 20, y: 170, w: 860, h: 280, color: 'green', label: 'このシステム：Spring Boot が渡す場合' });
const Y2 = node({ x: 660, y: 214, w: 200, h: 46, color: 'green', lines: ['ProductService'] });
const Y1 = node({ x: 660, y: 380, w: 200, h: 46, color: 'green', lines: ['ProductController'] });
const Y0 = node({ x: 40, y: 297, w: 150, h: 46, color: 'green', lines: ['Spring Boot'] });

const body = gx + gy + X1.s + X2.s + Y2.s + Y1.s + Y0.s +
  arr({ x1: X1.r + 2, y1: X1.cy, x2: X2.x - 5, y2: X2.cy, color: 'gray' }) +
  pill({ cx: 450, y: X1.cy - 15, label: 'new ProductService を自分で書く', color: 'gray' }) +
  arr({ x1: Y0.r + 2, y1: Y0.cy - 10, x2: Y2.x - 5, y2: Y2.cy + 4, color: 'green' }) +
  arr({ x1: Y0.r + 2, y1: Y0.cy + 10, x2: Y1.x - 5, y2: Y1.cy - 4, color: 'green' }) +
  arr({ x1: Y1.cx, y1: Y1.y - 2, x2: Y2.cx, y2: Y2.b + 6, color: 'green', dashed: true }) +
  pill({ cx: 425, y: 260, label: 'ProductService を作る', n: '1', color: 'green' }) +
  pill({ cx: 425, y: 350, label: 'コンストラクタの引数として渡す', n: '2', color: 'green' }) +
  pill({ cx: 760, y: 307, label: '受け取って使う', n: '3', color: 'green' });

out(nm, 450, '自分で new する場合と、Spring Boot が ProductService を渡す場合の比較',
  '自分で new する場合は、ProductController が new ProductService を自分で書いて ProductService を作る。このシステムでは、Spring Boot が、1 ProductService を作り、2 コンストラクタの引数として ProductController に渡し、3 ProductController が受け取って ProductService を使う。',
  body,
  ['自分で new する場合', 'このシステム：Spring Boot が渡す場合', 'ProductController', 'ProductService', 'Spring Boot', 'new ProductService を自分で書く', 'ProductService を作る', 'コンストラクタの引数として渡す', '受け取って使う']);
