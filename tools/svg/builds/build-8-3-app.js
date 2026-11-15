// 8-3-app: App の main メソッドの4行の役割と、3行目が作る受付の一覧表、App に書いてよいこと・書くべきでないこと。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const code = (x, y, s, o = {}) => t(x, y, s, { mono: true, anchor: 'start', ...o });
const step = (n, y, c, d, ds) => `
  ${L.badge({ cx: 52, cy: y - 5, n, color: 'green' })}
  ${code(72, y, c)}
${ds.map((s, k) => '  ' + t(72, y + 24 + k * 24, s, { anchor: 'start', fill: SUB })).join('\n')}`;
const left = `
${L.card({ x: 20, y: 20, w: 470, h: 450, color: 'green', title: 'App.java の main メソッド（上から順に実行される）' })}
${step('1', 106, 'initDatabase();', 0, ['テーブルと見本の商品を用意する（動作確認のための処理）'])}
${step('2', 188, 'Javalin app = Javalin.create();', 0, ['WEBサーバーを1つ作る（まだ動き出さない）'])}
  <g filter="url(#shadow)"><rect x="30" y="238" width="450" height="114" rx="10" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
${step('3', 274, 'app.get("/api/products", new ProductListApi());', 0, ['GET /api/products が来たら、', 'ProductListApi に任せる'])}
${step('4', 398, 'app.start(8080);', 0, ['8080 番で、リクエストの受付を始める'])}`;
const col = 175, tx = 544;
const row = (y, a, b, dashed) => `
  <rect x="${tx}" y="${y}" width="322" height="46" fill="${dashed ? '#ffffff' : C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"${dashed ? ' stroke-dasharray="6,4"' : ''}/>
  <line x1="${tx + col}" y1="${y}" x2="${tx + col}" y2="${y + 46}" stroke="${C.gray.main}" stroke-width="1.5"${dashed ? ' stroke-dasharray="6,4"' : ''}/>
  ${code(tx + 12, y + 29, a, { fill: dashed ? SUB : TEXT })}
  ${code(tx + col + 12, y + 29, b, { fill: dashed ? SUB : TEXT })}`;
const right = `
${L.card({ x: 530, y: 20, w: 350, h: 450, color: 'gray', title: '3 の行が作る「受付の一覧表」' })}
  ${L.arrow({ x1: 486, y1: 295, x2: 522, y2: 295, color: 'green', width: 4 })}
  <rect x="${tx}" y="74" width="322" height="34" fill="url(#headGray)"/>
  ${t(tx + 12, 97, '届いたリクエスト', { bold: true, fill: '#ffffff', anchor: 'start' })}
  ${t(tx + col + 12, 97, '任せる先のクラス', { bold: true, fill: '#ffffff', anchor: 'start' })}
${row(108, 'GET /api/products', 'ProductListApi', false)}
${row(154, 'GET /api/xxx', 'XxxApi', true)}
${row(200, '…', '…', true)}
  ${['実線の行は、今ある API。', '点線の行は、API を足すと', '1行ずつ増えるところ'].map((s, k) => t(705, 278 + k * 22, s, { fill: SUB })).join('\n  ')}
  ${['API が10個になっても、', 'App には10行並ぶだけ'].map((s, k) => t(705, 358 + k * 24, s, { bold: true, fill: C.yellow.dark })).join('\n  ')}
  ${['処理の中身は書かないので、', 'App は長くならない'].map((s, k) => t(705, 418 + k * 22, s, { fill: SUB })).join('\n  ')}`;
const bullets = (x, y, color, items, why) => `
${L.card({ x, y, w: 425, h: 190, color, title: '' })}
  ${items.map((s, k) => t(x + 16, y + 76 + k * 28, s, { anchor: 'start' })).join('\n  ')}
  ${t(x + 16, y + 176, why, { bold: true, anchor: 'start', fill: C[color].dark })}`;
const bottom = `
${L.card({ x: 20, y: 490, w: 425, h: 206, color: 'green', title: 'App に書いてよいこと' })}
  ${L.icon({ name: 'check', x: 34, y: 502, size: 24, color: '#ffffff' })}
  ${['・起動時の準備（initDatabase。', '　学習用の動作確認のため）', '・app.get(...) での URL と処理の対応づけ', '・8080 番での起動'].map((s, k) => t(36, 562 + k * 26, s, { anchor: 'start' })).join('\n  ')}
  ${t(36, 678, 'なぜ：App は「受付の一覧表」と割り切るため', { bold: true, anchor: 'start', fill: C.green.dark })}
${L.card({ x: 455, y: 490, w: 425, h: 206, color: 'red', title: 'App に書くべきでないこと' })}
  ${L.icon({ name: 'x', x: 469, y: 502, size: 24, color: '#ffffff' })}
  ${['・商品を取り出す処理など、API の中身（api/ の仕事）', '・接続先やパスワード（Database に任せる）', '・レスポンスの JSON の形（dto/ の仕事）'].map((s, k) => t(471, 562 + k * 26, s, { anchor: 'start' })).join('\n  ')}
  ${t(471, 678, 'なぜ：API が増えるたびに、App が長くなるため', { bold: true, anchor: 'start', fill: C.red.dark })}`;
const y0 = 712;
L.write('8-3-app', L.svg({
  y0,
  title: 'App の main メソッドの4行の役割と、3行目が作る URL と処理の対応づけの一覧、App に書いてよいことと書くべきでないこと',
  desc: 'main メソッドは上から順に、1 initDatabase でテーブルと見本の商品を用意し、2 Javalin でWEBサーバーを作り、3 app.get で GET /api/products を ProductListApi に任せる対応づけを作り、4 8080 番で受付を始める。3行目が作る受付の一覧表には、API を足すと1行ずつ増える。App に書いてよいのは起動時の準備、URL と処理の対応づけ、8080 番での起動。書くべきでないのは API の中身、接続先やパスワード、レスポンスの JSON の形。',
  body: left + right + bottom,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['App は、URL と処理を結びつける入口なんだ。', 'API の中身は api/ に任せるのがポイントだよ。'] }),
}));
