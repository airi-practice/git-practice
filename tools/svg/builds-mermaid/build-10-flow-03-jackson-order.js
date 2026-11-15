// 10-flow-03-jackson-order: Jackson が JSON を ReverseRequest にして、getText で取り出すまで（元は Mermaid の flowchart LR）
const { L, C, t, SIZE, finish, nodeBox } = require('./_common-ch10');

const W = 150, GAP = 27.5, Y = 30, H = 190;
const nodes = [
  { color: 'blue', lines: ['リクエストの本文', 'JSON：text が hello'] },
  { color: 'green', n: '1', lines: ['Jackson が、', '引数なしの', 'コンストラクタで', '空の', 'ReverseRequest', 'を作る'] },
  { color: 'green', n: '2', lines: ['項目名 text に合う', 'setText を呼び、', 'hello を入れる'] },
  { color: 'green', n: '3', lines: ['ReverseRequest', 'のオブジェクト', 'text の値が hello'] },
  { color: 'green', n: '4', lines: ['handle の中で', 'getText が', 'hello を返す'] },
];
let out = '';
nodes.forEach((n, i) => {
  const x = 20 + i * (W + GAP);
  out += '\n  ' + nodeBox({ x, y: Y, w: W, h: H, color: n.color, lines: n.lines, badge: n.n, align: 'top' });
  if (i < nodes.length - 1) out += '\n  ' + L.arrow({ x1: x + W + 3, y1: Y + H / 2, x2: x + W + GAP - 3, y2: Y + H / 2, color: n.color, width: 4 });
});

finish('10-flow-03-jackson-order', Y + H,
  'リクエストの本文の JSON を、Jackson が ReverseRequest にして、handle の中で getText が hello を返すまでの4つの順番',
  'リクエストの本文は JSON で、text が hello。1 Jackson が、引数なしのコンストラクタで空の ReverseRequest を作る。2 項目名 text に合う setText を呼び、hello を入れる。3 ReverseRequest のオブジェクトの text の値が hello になる。4 handle の中で getText が hello を返す。',
  out);
