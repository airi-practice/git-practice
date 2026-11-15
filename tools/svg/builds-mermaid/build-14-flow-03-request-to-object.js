// 14-flow-03-request-to-object: リクエストの本文が、ReverseRequest のオブジェクトになるまでの4つの順番
const { L, C, t, nb, finish } = require('./_helper-14');
const X = 130, W = 640, H = 64, G = 40;
const items = [
  { color: 'blue', lines: ['リクエストの本文', 'JSON：text が hello'] },
  { color: 'green', n: 1, lines: ['Spring Boot が、引数なしのコンストラクタで', '空の ReverseRequest を作る'] },
  { color: 'green', n: 2, lines: ['項目名 text に合う', 'setText を呼び、hello を入れる'] },
  { color: 'green', n: 3, lines: ['ReverseRequest のオブジェクト', 'text の値が hello'] },
  { color: 'green', n: 4, lines: ['Controller の中で', 'getText が hello を返す'] },
];
let body = '';
items.forEach((it, i) => {
  const y = 20 + i * (H + G);
  body += '\n  ' + nb({ x: X, y, w: W, h: H, color: it.color, lines: it.lines });
  if (it.n) body += '\n  ' + L.badge({ cx: X + 26, cy: y + H / 2, n: String(it.n), color: it.color });
  if (i < items.length - 1) body += '\n  ' + L.arrow({ x1: 450, y1: y + H + 4, x2: 450, y2: y + H + G - 6, color: it.color });
});
finish('14-flow-03-request-to-object', 20 + 5 * H + 4 * G,
  'リクエストの本文を、Spring Boot が空の ReverseRequest を作り、setText で hello を入れて、Controller で getText が hello を返すまでの4つの順番を示した図',
  'リクエストの本文は JSON で、text が hello。1 Spring Boot が、引数なしのコンストラクタで、空の ReverseRequest を作る。2 項目名 text に合う setText を呼び、hello を入れる。3 ReverseRequest のオブジェクトの text の値が hello になる。4 Controller の中で getText が hello を返す。',
  body);
