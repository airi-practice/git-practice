// 05-flow-04-file-correspondence: フロントエンドとバックエンドのファイルの対応の図（Mermaid の flowchart LR を置き換えたもの）
// 実線は「呼び出す」、点線は「形をそろえる」関係（Mermaid と同じ）
const M = require('./mm');
const { node, cyl, frame, line, label, labelW } = M;

// フロントエンド（左）
const FX = 20, FW = 208;
const fa = node({ x: FX, y: 62, w: FW, h: 68, color: 'blue', lines: ['hm|api/products.ts', 'n|バックエンドへリクエストを送る'] });
const fp = node({ x: FX, y: 196, w: FW, h: 92, color: 'blue', lines: ['hm|pages/', 'hm|ProductListPage.tsx', 'n|画面を作る'] });
const ft = node({ x: FX, y: 348, w: FW, h: 68, color: 'blue', lines: ['hm|types/product.ts', 'n|届くデータの型'] });

// バックエンド（右）
const BX = 444, BW = 434;
const ba = node({ x: BX, y: 62, w: BW, h: 68, color: 'green', lines: ['hm|App.java', 'n|URL を ProductListApi に振り分ける'] });
const bp = node({ x: BX, y: 196, w: BW, h: 68, color: 'green', lines: ['hm|api/ProductListApi.java', 'n|商品を取り出して返す'] });
const br = node({ x: BX, y: 342, w: 220, h: 92, color: 'green', lines: ['h|dto/ の', 'h|ProductResponse クラス', 'n|返すデータの形'] });
const bd = node({ x: 684, y: 342, w: 194, h: 92, color: 'green', lines: ['hm|Database.java', 'n|接続を作る'] });
// FT をバックエンドの dto と同じ高さにそろえる（横の矢印をまっすぐにするため）
const ft2 = node({ x: FX, y: br.cy - 34, w: FW, h: 68, color: 'blue', lines: ['hm|types/product.ts', 'n|届くデータの型'] });
const db = cyl({ x: BX, y: 560, w: BW, h: 84, color: 'orange', lines: ['h|PostgreSQL', 'n|products テーブル'] });

const bottom = br.b + 16;
const frames = frame({ x: 8, y: 10, w: 232, h: bottom - 10, color: 'blue', label: 'frontend/src' }) + '\n  ' +
  frame({ x: 430, y: 10, w: 462, h: bottom - 10, color: 'green', label: 'backend/src/main/java/jp/co/copel/training' });

const e = [];
const sx = 62; // フロントエンドの縦の矢印の位置
// FP → FA（呼び出す）
e.push(line([[sx, fp.y - 3], [sx, fa.b + 5]], 'blue'));
e.push(label(sx + 16 + labelW('呼び出す') / 2, (fp.y + fa.b) / 2, '呼び出す', 'blue'));
// FP -.-> FT（型を使う）
e.push(line([[sx, fp.b + 3], [sx, ft2.y - 5]], 'blue', { dash: true }));
e.push(label(sx + 16 + labelW('型を使う') / 2, (fp.b + ft2.y) / 2, '型を使う', 'blue'));
// FA → BA（GET /api/products）
e.push(line([[fa.r + 3, fa.cy], [ba.x - 5, ba.cy]], 'blue'));
e.push(label((fa.r + ba.x) / 2, ba.cy - 30, 'GET /api/products', 'blue'));
// BA → BP
const ax = 520;
e.push(line([[ax, ba.b + 3], [ax, bp.y - 5]], 'green'));
{ const s = 'ProductListApi の handle を呼ぶ'; e.push(label(ax + 16 + labelW(s) / 2, (ba.b + bp.y) / 2, s, 'green')); }
// BP → BR / BD / PostgreSQL（幹から分かれる）
const mid = (bp.b + br.y) / 2, tx = 674;
e.push(line([[tx - 0, bp.b + 3], [tx, mid], [br.cx, mid], [br.cx, br.y - 5]], 'green'));
e.push(line([[tx, mid], [bd.cx, mid], [bd.cx, bd.y - 5]], 'green'));
e.push(line([[tx, bp.b + 3], [tx, db.y - 5]], 'green'));
{ const s = 'SELECT の SQL'; e.push(label(tx - 16 - labelW(s) / 2, 500, s, 'green')); }
// BD → DB（接続する）
e.push(line([[bd.cx, bd.b + 3], [bd.cx, db.y - 5]], 'green'));
{ const s = '接続する'; e.push(label(bd.cx + 16 + labelW(s) / 2, 500, s, 'green')); }
// BR -.-> FT（同じ項目名の JSON）
e.push(line([[br.x - 5, br.cy], [ft2.r + 5, ft2.cy]], 'green', { dash: true }));
e.push(label((ft2.r + br.x) / 2, br.cy - 30, '同じ項目名の JSON', 'green'));

const body = frames + '\n' + [fa, fp, ft2, ba, bp, br, bd, db].map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('05-flow-04-file-correspondence', {
  title: 'フロントエンドとバックエンドのファイルの対応。実線は呼び出す関係、点線は形をそろえる関係',
  desc: 'フロントエンドの pages/ProductListPage.tsx が api/products.ts を呼び出し、types/product.ts の型を使う。api/products.ts は GET /api/products で、バックエンドの App.java にリクエストを送る。App.java は api/ProductListApi.java の handle を呼ぶ。ProductListApi は Database.java で接続を作り、PostgreSQL の products テーブルに SELECT の SQL を送り、dto/ の ProductResponse クラスを使う。ProductResponse の項目名の JSON は、types/product.ts の項目名とそろえる。',
  body,
  bottom: db.b,
});
