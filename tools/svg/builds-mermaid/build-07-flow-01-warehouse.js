// 07-flow-01-warehouse: 倉庫のたとえを、このシステムの実物に当てはめた図（Mermaid の flowchart LR を置き換えたもの）
const M = require('./mm');
const { node, cyl, frame, line, label, labelW } = M;

const d = node({ x: 30, y: 62, w: 360, h: 100, color: 'green', lines: ['hm|Database.connect()', 'n|倉庫の入口の鍵にあたる', 'n|接続を作る'] });
const r = node({ x: 30, y: 214, w: 360, h: 100, color: 'green', lines: ['hm|ProductListApi', 'n|倉庫の係員にあたる', 'n|SQL を送って、結果を受け取る'] });
const en = node({ x: 30, y: 366, w: 360, h: 72, color: 'green', lines: ['h|ProductResponse クラス', 'n|荷物1つ分にあたる'] });
const pg = cyl({ x: 655, y: r.cy - 62, w: 220, h: 124, color: 'orange', lines: ['h|PostgreSQL の', 'h|products テーブル', 'n|倉庫にあたる'] });

const frames = frame({ x: 10, y: 10, w: 400, h: en.b + 16 - 10, color: 'green', label: 'バックエンドの Java プログラムの中' }) + '\n  ' +
  frame({ x: 640, y: 10, w: 250, h: 340, color: 'orange', label: 'Docker のコンテナの中' });

const e = [];
const gx = (d.r + 3 + 640) / 2; // 2つの枠の間の中心
// R → D
e.push(line([[120, r.y - 3], [120, d.b + 5]], 'green'));
{ const s = '接続を作ってもらう'; e.push(label(136 + labelW(s) / 2, (d.b + r.y) / 2, s, 'green')); }
// D → PG
e.push(line([[d.r + 3, d.cy], [pg.cx, d.cy], [pg.cx, pg.y - 5]], 'green'));
e.push(label(gx + 20, d.cy - 28, '接続する', 'green'));
// R → PG（SQL を送る）と PG → R（行のデータを返す）
e.push(line([[r.r + 3, r.cy - 14], [pg.x - 5, r.cy - 14]], 'green'));
e.push(label(gx, r.cy - 44, 'SELECT の SQL を送る', 'green'));
e.push(line([[pg.x - 5, r.cy + 14], [r.r + 5, r.cy + 14]], 'orange'));
e.push(label(gx, r.cy + 46, '行のデータを返す', 'orange'));
// R → EN
e.push(line([[120, r.b + 3], [120, en.y - 5]], 'green'));

const body = frames + '\n' + [d, r, en, pg].map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('07-flow-01-warehouse', {
  title: '倉庫のたとえを、このシステムの実物に当てはめた図',
  desc: 'バックエンドの Java プログラムの中に、倉庫の係員にあたる ProductListApi、倉庫の入口の鍵にあたる Database.connect()、荷物1つ分にあたる ProductResponse クラスがある。ProductListApi は、Database.connect() に接続を作ってもらい、Docker のコンテナの中にある、倉庫にあたる PostgreSQL の products テーブルへ SELECT の SQL を送り、行のデータを受け取って、ProductResponse クラスに入れる。',
  body,
  bottom: en.b + 16,
});
