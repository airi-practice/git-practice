// 10-flow-02-handle-order: ReverseApi.handle の処理の順番（元は Mermaid の flowchart TD）
const { L, C, t, SIZE, finish, nodeBox } = require('./_common-ch10');

const X = 150, W = 600, GAP = 36;
const nodes = [
  { color: 'blue', lines: ['POST /api/reverse が届く'] },
  { color: 'green', lines: ['App.java の app.post(...) の1行が、', 'ReverseApi.handle を呼ぶ'] },
  { color: 'green', lines: ['ctx.bodyAsClass で、', '本文の JSON を ReverseRequest にする'] },
  { color: 'green', lines: ['StringBuilder で反転する'] },
  { color: 'green', lines: ['ctx.json で、ReverseResponse を', 'JSON にして返す'] },
];
let y = 20, out = '';
nodes.forEach((n, i) => {
  const h = n.lines.length === 1 ? 54 : 78;
  out += '\n  ' + nodeBox({ x: X, y, w: W, h, color: n.color, lines: n.lines, size: SIZE.head, bold: true });
  if (i < nodes.length - 1) out += '\n  ' + L.arrow({ x1: 450, y1: y + h + 3, x2: 450, y2: y + h + GAP - 3, color: n.color });
  y += h + GAP;
});
const bottom = y - GAP;

finish('10-flow-02-handle-order', bottom,
  'POST /api/reverse が届いてから、ReverseApi.handle が JSON を返すまでの5つの処理の順番',
  'POST /api/reverse が届く。App.java の app.post(...) の1行が ReverseApi.handle を呼ぶ。ctx.bodyAsClass で本文の JSON を ReverseRequest にする。StringBuilder で反転する。ctx.json で ReverseResponse を JSON にして返す。',
  out);
