// 09-flow-03-route-before-after: 第9章 9-7 の flowchart LR（追加の前後で、パスと画面の対応がどう変わるか）
const { C, L, nb, cd, frame, fin, arrow } = require('./_common-0809');

const X = [40, 330, 620], W = 235;
const ar = (row, k) => arrow({ x1: X[k] + W + 4, y1: row, x2: X[k + 1] - 4, y2: row, color: 'blue', width: 4 });
const section = (y, color, label, nodes) => `
  ${frame(20, y, 860, 275, color, label)}${nodes}`;

const before = section(50, 'gray', '追加前', `
  ${nb(X[0], 113, W, 64, 'blue', ['/products を開く'])}
  ${nb(X[1], 113, W, 64, 'blue', ['Route path が /products'])}
  ${cd(X[2], 100, W, 90, 'blue', 'ProductListPage', ['商品一覧'])}
  ${nb(X[0], 228, W, 64, 'blue', ['/message を開く'])}
  ${cd(X[1], 215, 340, 90, 'red', '合う Route がない', ['何も表示されない（空白のページ）'])}
  ${ar(145, 0)}
  ${ar(145, 1)}
  ${arrow({ x1: X[0] + W + 4, y1: 260, x2: X[1] - 4, y2: 260, color: 'blue', width: 4 })}`);

const after = section(350, 'green', '追加後', `
  ${nb(X[0], 413, W, 64, 'blue', ['/products を開く'])}
  ${nb(X[1], 413, W, 64, 'blue', ['Route path が /products'])}
  ${cd(X[2], 400, W, 90, 'blue', 'ProductListPage', ['商品一覧'])}
  ${nb(X[0], 528, W, 64, 'blue', ['/message を開く'])}
  ${nb(X[1], 528, W, 64, 'green', ['Route path が', '/message（追加）'])}
  ${cd(X[2], 515, W, 90, 'green', 'MessagePage', ['メッセージ表示（追加）'])}
  ${ar(445, 0)}
  ${ar(445, 1)}
  ${ar(560, 0)}
  ${ar(560, 1)}`);

fin('09-flow-03-route-before-after', 641,
  '画面を追加する前と後で、パスと画面の対応がどう変わるか',
  '追加前は、/products を開くと Route path が /products に合い、ProductListPage（商品一覧）が表示される。/message を開くと、合う Route がなく、何も表示されない空白のページになる。追加後は、/products は同じ。/message を開くと Route path が /message（追加）に合い、MessagePage（メッセージ表示）が表示される。',
  before + after);
