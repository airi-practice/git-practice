// 07-flow-02-three-layers: 3層構造の全体図（Mermaid の flowchart TB を置き換えたもの）
// 番号つきのラベル（1・2・3・4）は、Mermaid のラベルにある番号をそのまま番号バッジにした
const M = require('./mm');
const { node, cyl, frame, line, label, labelW, t, C } = M;

// ---- フロントエンド ----
const f1 = node({ x: 30, y: 56, w: 380, h: 68, color: 'blue', lines: ['hm|src/main.tsx → src/App.tsx', 'n|画面を起動して、パスごとに表示する画面を決める'] });
const f5 = node({ x: 600, y: 56, w: 270, h: 68, color: 'blue', lines: ['hm|vite.config.ts', 'n|/api をバックエンドへ中継する'] });
const f2 = node({ x: 30, y: 170, w: 380, h: 68, color: 'blue', lines: ['hm|src/pages/ProductListPage.tsx', 'n|ProductListPage：商品の表を表示する'] });
const f4 = node({ x: 600, y: 170, w: 270, h: 68, color: 'blue', lines: ['hm|src/types/product.ts', 'n|Product：届くデータの型'] });
const f3 = node({ x: 30, y: 290, w: 590, h: 68, color: 'blue', lines: ['hm|src/api/products.ts', 'n|fetchProducts：リクエストを送る'] });
const feBottom = f3.b + 16;

// ---- バックエンド ----
const BY = feBottom + 120; // 枠の上
const b1 = node({ x: 130, y: BY + 56, w: 560, h: 68, color: 'green', lines: ['hm|App.java', 'n|main：URL と ProductListApi を対応づけて、8080 番で待ち受ける'] });
const b2 = node({ x: 130, y: b1.b + 56, w: 560, h: 68, color: 'green', lines: ['hm|api/ProductListApi.java', 'n|handle：商品を取り出して、JSON で返す'] });
const b3 = node({ x: 640, y: b2.b + 56, w: 230, h: 106, color: 'green', lines: ['hm|Database.java', 'n|connect：', 'n|データベースへの接続を作る', 'n|（接続情報はここだけ）'] });
const b4 = node({ x: 250, y: b2.b + 56, w: 262, h: 106, color: 'green', lines: ['hm|dto/ProductResponse.java', 'n|ProductResponse：', 'n|商品1件の値を持つ'] });
const beBottom = b3.b + 16;

// ---- データベース ----
const DY = beBottom + 112;
const tb = cyl({ x: 400, y: DY + 48, w: 420, h: 98, color: 'orange', lines: ['h|products テーブル', 'n|id / name / price / stock / created_at'] });
const dbBottom = tb.b + 16;

const frames =
  frame({ x: 10, y: 10, w: 880, h: feBottom - 10, color: 'blue', label: 'フロントエンド：frontend/（ブラウザの中で動く）' }) + '\n  ' +
  frame({ x: 10, y: BY, w: 880, h: beBottom - BY, color: 'green', label: 'バックエンド：backend/src/main/java/jp/co/copel/training/（Java）' }) + '\n  ' +
  frame({ x: 10, y: DY, w: 880, h: dbBottom - DY, color: 'orange', label: 'データベース：PostgreSQL 17（Docker のコンテナ。docker-compose.yml で起動）' });

const e = [];
// フロントエンドの中
e.push(line([[120, f2.b + 3], [120, f3.y - 5]], 'blue'));
e.push(line([[f2.r + 3, f2.cy], [f4.x - 5, f4.cy]], 'blue', { dash: true }));
e.push(label((f2.r + f4.x) / 2, f2.cy - 30, 'Product 型を使う', 'blue'));
// 1: フロントエンド → バックエンド（HTTP リクエスト）
const reqX = 500, resX = 560;
e.push(line([[reqX, f3.b + 3], [reqX, b1.y - 5]], 'blue'));
{ const s = 'HTTP リクエスト GET /api/products'; e.push(label(reqX - 16 - labelW(s, 1) / 2, 470, s, 'blue', '1')); }
// 4: バックエンド → フロントエンド（JSON のレスポンス）。App.java の右側を回って、上へ戻る
const midY = feBottom + 46, rx = 800;
e.push(line([[b2.r + 3, b2.cy], [rx, b2.cy], [rx, midY], [resX, midY], [resX, f3.b + 5]], 'green'));
e.push(label(650, midY + 30, 'JSON のレスポンス', 'green', '4'));
// バックエンドの中
e.push(line([[250, b1.b + 3], [250, b2.y - 5]], 'green'));
{ const s = 'handle を呼ぶ'; e.push(label(266 + labelW(s, 2) / 2, (b1.b + b2.y) / 2, s, 'green', '2')); }
e.push(line([[710, b2.b + 3], [710, b3.y - 5]], 'green'));
{ const s = 'connect を呼ぶ'; e.push(label(726 + labelW(s, 2) / 2, (b2.b + b3.y) / 2, s, 'green', '2')); }
e.push(line([[300, b2.b + 3], [300, b4.y - 5]], 'green', { dash: true }));
{ const s = 'ProductResponse を使う'; e.push(label(316 + labelW(s) / 2, (b2.b + b4.y) / 2, s, 'green')); }
// 3: バックエンド → データベース（SQL）と、その戻り
const q1 = 570, q2 = 600;
e.push(line([[q1, b2.b + 3], [q1, tb.y - 2]], 'green'));
e.push(line([[q2, tb.y - 2 + 9], [q2, b2.b + 5]], 'orange'));
{ const s = 'SQL（products の全件取得）'; e.push(label(q1 - 16 - labelW(s, 3) / 2, beBottom + 56, s, 'green', '3')); }
{ const s = 'の戻り：行のデータ'; e.push(label(q2 + 16 + labelW(s, 3) / 2, beBottom + 56, s, 'orange', '3')); }
// 点線: 起動時に initDatabase() がテーブルと見本のデータを用意する
e.push(line([[b1.x - 3, b1.cy], [18, b1.cy], [18, tb.cy + 8], [tb.x - 5, tb.cy + 8]], 'green', { dash: true }));
{
  const bx = 38, bw = 260, by = tb.cy + 8 - 66, bh = 52;
  e.push(`<g filter="url(#shadow)"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12" fill="#ffffff" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(bx + bw / 2, by + 22, '起動時に initDatabase() が', { size: 13, bold: true, fill: C.green.dark })}
  ${t(bx + bw / 2, by + 41, 'テーブルと見本のデータを用意する', { size: 13, bold: true, fill: C.green.dark })}`);
}

const body = frames + '\n' + [f1, f5, f2, f4, f3, b1, b2, b3, b4, tb].map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('07-flow-02-three-layers', {
  title: '3層構造の全体図。フロントエンド、バックエンド、データベースにあるファイルと、その間を流れるもの',
  desc: 'フロントエンドの src/api/products.ts が、1番目に HTTP リクエスト GET /api/products をバックエンドの App.java に送る。2番目に、App.java が api/ProductListApi.java の handle を呼び、ProductListApi が Database.java の connect を呼ぶ。3番目に、ProductListApi が products テーブルへ SQL を送り、行のデータが戻る。4番目に、ProductListApi が JSON のレスポンスをフロントエンドに返す。点線は、使う側から使われる側への関係で、App.java は起動時に initDatabase() で、テーブルと見本のデータを用意する。',
  body,
  bottom: dbBottom,
});
