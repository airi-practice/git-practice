// 12-flow-10: Product（Entity）から ProductResponse（DTO）への詰め替え
const { node, grp, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-10-entity-dto';

const gE = grp({ x: 20, y: 20, w: 240, h: 374, color: 'green', label: 'Product（Entity）' });
const gD = grp({ x: 330, y: 20, w: 280, h: 308, color: 'green', label: 'ProductResponse（DTO）' });
const names = ['id', 'name', 'price', 'stock', 'createdAt'];
let body = gE + gD;
const ps = names.map((s, i) => node({ x: 40, y: 64 + i * 66, w: 200, h: 46, color: 'green', lines: [{ s, mono: true }] }));
const rs = names.slice(0, 4).map((s, i) => node({ x: 350, y: 64 + i * 66, w: 240, h: 46, color: 'green', lines: [{ s, mono: true }] }));
const X = node({ x: 680, y: 328, w: 200, h: 46, color: 'gray', lines: ['画面には渡らない'] });
body += ps.map((n) => n.s).join('') + rs.map((n) => n.s).join('') + X.s;
rs.forEach((r, i) => { body += arr({ x1: ps[i].r + 2, y1: ps[i].cy, x2: r.x - 5, y2: r.cy, color: 'green' }); });
body += arr({ x1: ps[4].r + 2, y1: ps[4].cy, x2: X.x - 5, y2: X.cy, color: 'green', dashed: true }) +
  pill({ cx: 450, y: ps[4].cy - 15 + 4, label: '詰め替えない', color: 'green' });

out(nm, 394, 'Product（Entity）から ProductResponse（DTO）への詰め替え',
  'Product（Entity）の id・name・price・stock は、それぞれ ProductResponse（DTO）の id・name・price・stock に詰め替えられる。createdAt は詰め替えないので、画面には渡らない。',
  body,
  ['Product（Entity）', 'ProductResponse（DTO）', 'id', 'name', 'price', 'stock', 'createdAt', '詰め替えない', '画面には渡らない']);
