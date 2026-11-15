// 08-flow-03-change-order: 第8章 末尾の flowchart LR（変更がデータベースから画面へ伝わる順）
const { C, t, cd, fin, arrow } = require('./_common-0809');

const ys = [50, 202, 338, 474, 610, 746];
const hs = [106, 90, 90, 90, 90, 90];
const body = `
  ${cd(170, ys[0], 560, hs[0], 'orange', 'データベース', ['created_at の列はすでにある', '（変更なし）'])}
  ${cd(170, ys[1], 560, hs[1], 'green', 'ProductListApi.java', ['SELECT に created_at を足す'])}
  ${cd(170, ys[2], 560, hs[2], 'green', 'ProductResponse.java', ['登録日時の項目と getter を足す'])}
  ${cd(170, ys[3], 560, hs[3], 'gray', 'JSON', ['createdAt の項目が増える'])}
  ${cd(170, ys[4], 560, hs[4], 'blue', 'product.ts', ['Product 型に createdAt を足す'])}
  ${cd(170, ys[5], 560, hs[5], 'blue', 'ProductListPage.tsx', ['表に登録日時の列を足す'])}
  ${['orange', 'green', 'green', 'gray', 'blue'].map((c, k) => arrow({ x1: 450, y1: ys[k] + hs[k] + 3, x2: 450, y2: ys[k + 1] - 4, color: c, width: 4 })).join('\n  ')}`;

fin('08-flow-03-change-order', 852,
  '登録日時を足す変更が、データベースから画面へ伝わる順',
  'データベースは created_at の列がすでにあり変更しない。ProductListApi.java は SELECT に created_at を足し、ProductResponse.java は登録日時の項目と getter を足す。JSON には createdAt の項目が増える。product.ts は Product 型に createdAt を足し、ProductListPage.tsx は表に登録日時の列を足す。',
  body);
