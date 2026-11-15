// 06_画面開発で行うこと.md の2つ目の flowchart（登録日時の項目が通る道）。ノード中の 1〜4 は、Mermaid の文言にある番号なのでバッジにする
const { L, cardN, boxN, finish } = require('./mm-a-common');
const X = 210, W = 480, CX = X + W / 2, GAP = 44;
const nodes = [
  { color: 'orange', head: 'products テーブル', lines: ['created_at 列を持つ'] },
  { color: 'green', head: 'ProductListApi の SQL', lines: ['created_at を取り出す'], badgeN: 2 },
  { color: 'green', head: 'ProductResponse クラス', lines: ['createdAt を追加'], badgeN: 1 },
  { box: true, color: 'gray', lines: ['JSON に createdAt が入る'] },
  { color: 'blue', head: 'types/product.ts', lines: ['createdAt を追加'], badgeN: 3 },
  { color: 'blue', head: 'ProductListPage.tsx', lines: ['th と td を追加'], badgeN: 4 },
];
// 矢印は送る側の色
const arrowColors = ['orange', 'green', 'green', 'gray', 'blue'];
let y = 24, body = '';
nodes.forEach((n, i) => {
  const h = n.box ? 56 : 84;
  body += '\n' + (n.box ? boxN({ x: X, y, w: W, h, color: n.color, lines: n.lines }) : cardN({ x: X, y, w: W, ...n }));
  if (i < nodes.length - 1) body += '\n  ' + L.arrow({ x1: CX, y1: y + h + 3, x2: CX, y2: y + h + GAP - 3, color: arrowColors[i] });
  y += h + GAP;
});
finish('06-flow-02-data-change', y - GAP,
  '登録日時の項目が通る道。products テーブルの created_at 列から、ProductListApi の SQL、ProductResponse クラス、JSON、types/product.ts、ProductListPage.tsx まで、矢印で順につながる図',
  '上から順に、products テーブル（created_at 列を持つ）、2 ProductListApi の SQL（created_at を取り出す）、1 ProductResponse クラス（createdAt を追加）、JSON に createdAt が入る、3 types/product.ts（createdAt を追加）、4 ProductListPage.tsx（th と td を追加）が矢印でつながる。番号は、直す順番を表している。',
  body);
