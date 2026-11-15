// 13-2-startup-compare: backend/ の main の4つの手順が、backend_spring/ でどう対応するかを並べる。
// 手順1はデータベースの準備なので橙、手順2〜4はサーバーの仕事なので緑。左右の対応の矢印は灰。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const cardMono = (o) => L.card({ ...o, title: '' }) + '\n  ' + t(o.x + o.w / 2, o.y + 30, o.title, { size: SIZE.body, bold: true, mono: true, fill: '#ffffff' });
const rows = [
  ['orange', 'initDatabase();', 'テーブルを作り、見本データを登録する', ['Entity からテーブルを作り、', 'data.sql を実行する（ddl-auto など）']],
  ['green', 'Javalin app = Javalin.create();', 'WEBサーバーを1つ作る', ['Spring Boot が、WEBサーバーを自動で作る']],
  ['green', 'app.get("/api/products", new ProductListApi());', 'URL と処理を対応づける', ['@RestController・@GetMapping などが付いた', 'クラスやメソッドを探して、対応づける']],
  ['green', 'app.start(8080);', '8080 番で、待ち受けを始める', ['application.yml の server.port（8080）で、', '待ち受ける']],
];
const R0 = 164, RH = 68, RG = 10;
let body = `
${cardMono({ x: 20, y: 12, w: 410, h: 478, color: 'green', title: 'backend/ の App.main' })}
${cardMono({ x: 470, y: 12, w: 410, h: 478, color: 'green', title: 'backend_spring/ の TrainingApplication.main' })}
  ${t(225, 112, '4つの手順を、上から順に、自分で書く', { fill: SUB })}
  <rect x="490" y="70" width="370" height="82" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/>
  ${t(505, 94, 'SpringApplication.run(TrainingApplication.class,', { size: SIZE.note, bold: true, mono: true, anchor: 'start', fill: C.green.dark })}
  ${t(505, 112, '\u00a0\u00a0args);', { size: SIZE.note, bold: true, mono: true, anchor: 'start', fill: C.green.dark })}
  ${t(675, 138, 'この1行で、Spring Boot が次のことをまとめてやる', { bold: true, fill: C.green.dark })}`;
rows.forEach(([col, code, desc, rt], i) => {
  const y = R0 + i * (RH + RG), c = C[col], mid = y + RH / 2;
  body += `
  <g filter="url(#shadow)"><rect x="40" y="${y}" width="370" height="${RH}" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  ${t(225, y + 28, code, { size: SIZE.note, bold: true, mono: true, fill: c.dark })}
  ${t(225, y + 52, desc)}
  ${L.badge({ cx: 40, cy: y, n: i + 1, color: col })}
  ${L.arrow({ x1: 436, y1: mid, x2: 464, y2: mid, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="490" y="${y}" width="370" height="${RH}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
  ${rt.length === 1 ? t(675, mid + 5, rt[0]) : rt.map((s, k) => t(675, y + 29 + k * 22, s)).join('\n  ')}`;
});
const y0 = 490 + 16;
L.write('13-2-startup-compare', L.svg({
  y0,
  title: 'backend/ の main に自分で書く4つの手順が、backend_spring/ では SpringApplication.run の1行と、Spring Boot が自動でやることに、どう対応するかを並べた図',
  desc: 'backend/ の App.main には、initDatabase()、Javalin.create()、app.get(...)、app.start(8080) の4つの手順を自分で書く。backend_spring/ の TrainingApplication.main は SpringApplication.run の1行だけで、Spring Boot が、Entity からのテーブル作成と data.sql の実行、WEBサーバーの自動作成、アノテーションを探しての URL と処理の対応づけ、application.yml の server.port での待ち受けをまとめてやる。猫の先生が、左は自分で書き、右は Spring Boot がまとめてやってくれると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['左は4つの手順を自分で書くけど、', '右は1行で Spring Boot が', 'まとめてやってくれるんだ。'] }),
}));
