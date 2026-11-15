// 05-flow-03-startup-order: 起動したときに起きることを、順番に並べた図（Mermaid の flowchart TD を置き換えたもの）
const M = require('./mm');
const { node, line } = M;

const X = 70, W = 760;
const specs = [
  ['h|App の main が実行される'],
  ['h|initDatabase() を呼ぶ', 'n|Database.connect() で、localhost の 5433 番にある PostgreSQL に接続する'],
  ['h|products テーブルがなければ作る', 'n|（CREATE TABLE IF NOT EXISTS）'],
  ['h|products が空のときだけ、見本の商品を5件登録する'],
  ['h|Javalin.create() で、WEBサーバーを作る'],
  ['h|app.get(...) で、URL と処理を対応づける', 'n|/api/products は ProductListApi'],
  ['h|app.start(8080) で、8080 番の待ち受けを始める', 'n|コンソールに Listening on http://localhost:8080/ と出る'],
];
const GAP = 38;
let y = 16;
const ns = specs.map((lines) => {
  const n = node({ x: X, y, w: W, color: 'green', lines });
  y = n.b + GAP;
  return n;
});
const e = [];
for (let i = 0; i < ns.length - 1; i++) e.push(line([[450, ns[i].b], [450, ns[i + 1].y - 5]], 'green'));

const body = ns.map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('05-flow-03-startup-order', {
  title: 'バックエンドを起動したときに、App の main が上から順に行う7つの処理',
  desc: 'App の main が実行される。initDatabase() を呼び、Database.connect() で localhost の 5433 番にある PostgreSQL に接続する。products テーブルがなければ作る。products が空のときだけ、見本の商品を5件登録する。Javalin.create() で WEBサーバーを作る。app.get(...) で URL と処理を対応づける。app.start(8080) で 8080 番の待ち受けを始め、コンソールに Listening on http://localhost:8080/ と出る。',
  body,
  bottom: ns[ns.length - 1].b,
});
