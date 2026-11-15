// 12-flow-03: Spring Boot が起動するときの処理の順番
const { L, C, t, node, grp, arr, out } = require('./_wrap-12');
const nm = '12-flow-03-startup-order';

const X = 60, W = 780, GAP = 40;
const defs = [
  ['TrainingApplication の main が実行される'],
  ['jp.co.copel.training の中から', '@RestController と @Service が付いたクラスを探して、インスタンスを作る', 'ProductRepository は、メソッドの中身を自分で書かなくても使える。', '中身は Spring Boot が用意する'],
  ['application.yml を読んで、', 'localhost の 5433 番にある PostgreSQL に接続する'],
  ['Product クラスをもとに、', 'products テーブルがなければ作る（ddl-auto: update）'],
  ['data.sql を実行する', 'products が空のときだけ、見本の商品を5件登録する'],
  ['8080 番で、リクエストの待ち受けを始める'],
];
let y = 20;
const ns = defs.map((lines) => {
  const n = node({ x: X, y, w: W, color: 'green', lines });
  y = n.b + GAP;
  return n;
});
const body = ns.map((n) => n.s).join('') +
  ns.slice(0, -1).map((n, i) => arr({ x1: n.cx, y1: n.b + 2, x2: n.cx, y2: ns[i + 1].y - 5, color: 'green' })).join('');

out(nm, ns[5].b,
  'Spring Boot が起動するときの処理の順番',
  'TrainingApplication の main が実行される。次に、jp.co.copel.training の中から @RestController と @Service が付いたクラスを探してインスタンスを作る。次に、application.yml を読んで localhost の 5433 番にある PostgreSQL に接続する。次に、Product クラスをもとに products テーブルがなければ作る。次に、data.sql を実行し、products が空のときだけ見本の商品を5件登録する。最後に、8080 番でリクエストの待ち受けを始める。',
  body,
  defs.flat());
