// 05-flow-02-startup-relation: 起動する3つの関係の図（Mermaid の flowchart LR を置き換えたもの）
const M = require('./mm');
const { node, cyl, line, label, labelW } = M;

const RX = 450, RW = 430; // 右の列
const db = cyl({ x: RX, y: 20, w: RW, h: 96, color: 'orange', lines: ['h|PostgreSQL', 'n|ポート 5433'] });
const be = node({ x: RX, y: 190, w: RW, h: 100, color: 'green', lines: ['h|バックエンド（App.java から始まる', 'h|Java プログラム）', 'n|ポート 8080'] });
const fe = node({ x: RX, y: 364, w: RW, h: 80, color: 'blue', lines: ['h|Vite', 'n|ポート 5173'] });
const br = node({ x: RX, y: 518, w: RW, h: 80, color: 'blue', lines: ['h|ブラウザ', 'n|localhost:5173/products を開く'] });

const TX = 20, TW = 250;
const t1 = node({ x: TX, y: db.cy - 38, w: TW, h: 76, color: 'gray', lines: ['h|ターミナル1', 'm|docker compose up -d'] });
const t2 = node({ x: TX, y: be.cy - 30, w: TW, h: 60, color: 'gray', lines: ['h|Eclipse で App.java を実行'] });
const t3 = node({ x: TX, y: fe.cy - 38, w: TW, h: 76, color: 'gray', lines: ['h|ターミナル2', 'm|npm run dev'] });

const ax = 520; // 縦の矢印の位置
const e = [];
// ターミナル → 起動するもの（横）
for (const [t, n, s] of [[t1, db, '1番目に起動する'], [t2, be, '2番目に起動する'], [t3, fe, '3番目に起動する']]) {
  e.push(line([[t.r + 3, n.cy], [n.x - 5, n.cy]], 'gray'));
  e.push(label((t.r + n.x) / 2, n.cy - 30, s, 'gray'));
}
// BE → DB
e.push(line([[ax, be.y - 3], [ax, db.b + 5]], 'green'));
{ const s = '起動するときに接続する'; e.push(label(ax + 16 + labelW(s) / 2, (be.y + db.b) / 2, s, 'green')); }
// FE → BE
e.push(line([[ax, fe.y - 3], [ax, be.b + 5]], 'blue'));
{ const s = '/api で始まるリクエストを中継する'; e.push(label(ax + 16 + labelW(s) / 2, (fe.y + be.b) / 2, s, 'blue')); }
// ブラウザ → FE
e.push(line([[ax, br.y - 3], [ax, fe.b + 5]], 'blue'));

const body = [db, be, fe, br, t1, t2, t3].map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('05-flow-02-startup-relation', {
  title: '起動する3つの関係。ターミナルや Eclipse から、データベース、バックエンド、フロントエンドを順に起動する図',
  desc: 'ターミナル1で docker compose up -d を実行して、PostgreSQL（ポート 5433）を1番目に起動する。Eclipse で App.java を実行して、バックエンド（ポート 8080）を2番目に起動する。ターミナル2で npm run dev を実行して、Vite（ポート 5173）を3番目に起動する。バックエンドは起動するときにデータベースへ接続する。Vite は /api で始まるリクエストをバックエンドへ中継する。ブラウザは localhost:5173/products を開いて Vite に接続する。',
  body,
  bottom: br.b,
});
