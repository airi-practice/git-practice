// 5-4-startup: データベース、バックエンド、フロントエンドの順に起動するときの図
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const Y = 50, H = 420;
const lab = (x, y, s, c) => t(x, y, s, { bold: true, fill: C[c].dark, anchor: 'start' });
const ln = (x, y, s) => t(x, y, s, { size: SIZE.note, anchor: 'start' });
const mono = (x, y, s, size = SIZE.body) => t(x, y, s, { size, mono: true, anchor: 'start' });

// 1 データベース（橙）
const db = L.card({ x: 20, y: Y, w: 240, h: H, color: 'orange', title: '1番目　データベース' }) + `
  ${lab(36, 118, '起動のしかた', 'orange')}
  ${mono(36, 144, 'docker compose up -d')}
  ${ln(36, 166, 'ターミナルで実行する')}
  ${lab(36, 200, '起きること', 'orange')}
  ${ln(36, 224, 'PostgreSQL のコンテナが')}
  ${ln(36, 242, '起動する')}
  ${ln(36, 266, 'training という名前の')}
  ${ln(36, 284, 'データベースができる')}
  ${ln(36, 308, 'まだ、中にテーブルはない')}
  ${lab(36, 342, 'ポート番号', 'orange')}
  ${ln(36, 366, '5433 番')}
  ${lab(36, 400, 'このあと', 'orange')}
  ${ln(36, 422, 'バックエンドが起動すると')}
  ${ln(36, 440, 'ここへ接続しにくる')}`;

// 2 バックエンド（緑）
const steps = [
  ['1', 'initDatabase();', 'テーブルと見本の商品を用意する'],
  ['2', 'Javalin.create();', 'WEBサーバーを作る（まだ動かない）'],
  ['3', 'app.get("/api/products", ...);', 'URL と処理を対応づける'],
  ['4', 'app.start(8080);', '8080 番で待ち受けを始める'],
].map(([n, code, d], k) => {
  const y = 214 + k * 46;
  return `${L.badge({ cx: 342, cy: y - 5, n, color: 'green' })}
  ${mono(360, y, code)}
  ${ln(360, y + 18, d)}`;
}).join('\n  ');
const be = L.card({ x: 285, y: Y, w: 330, h: H, color: 'green', title: '2番目　バックエンド' }) + `
  ${lab(301, 118, '起動のしかた', 'green')}
  ${ln(301, 140, 'Eclipse で App.java を右クリック')}
  ${ln(301, 158, '→ 実行 → Java アプリケーション')}
  ${lab(301, 188, 'App の main が上から順に動く', 'green')}
  ${steps}
  ${lab(301, 408, '成功の目印', 'green')}
  ${mono(301, 428, 'Listening on http://localhost:8080/', SIZE.note)}
  ${ln(301, 448, 'と Eclipse のコンソールに出る')}`;

// 3 フロントエンド（青）
const fe = L.card({ x: 640, y: Y, w: 240, h: H, color: 'blue', title: '3番目　フロントエンド' }) + `
  ${lab(656, 118, '起動のしかた', 'blue')}
  ${ln(656, 140, 'ターミナルで frontend に移動して')}
  ${mono(656, 164, 'npm run dev')}
  ${ln(656, 184, '（npm install は最初の1回だけ）')}
  ${lab(656, 218, '起きること', 'blue')}
  ${ln(656, 242, 'Vite が起動する')}
  ${ln(656, 264, '5173 番で、ブラウザからの')}
  ${ln(656, 282, 'リクエストを待つ')}
  ${ln(656, 306, '/api で始まるリクエストは')}
  ${ln(656, 324, '8080 番のバックエンドへ')}
  ${ln(656, 342, '中継する')}
  ${lab(656, 408, '成功の目印', 'blue')}
  ${ln(656, 430, 'ブラウザで localhost:5173/products')}
  ${ln(656, 448, 'を開くと、商品一覧の表が出る')}`;

const body = `
  ${t(450, 32, '起動するものは3つ。この順番で起動する', { size: SIZE.title, bold: true })}
${db}
${be}
${fe}
  ${L.arrow({ x1: 264, y1: 255, x2: 281, y2: 255, color: 'gray', width: 4 })}
  ${L.arrow({ x1: 619, y1: 255, x2: 636, y2: 255, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="20" y="486" width="860" height="68" rx="12" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${L.icon({ name: 'alert-circle', x: 34, y: 496, size: 26, color: C.red.main })}
  ${t(72, 513, '順番が大事：データベースを先に起動しないと、バックエンドは接続できず、起動に失敗する', { bold: true, fill: C.red.dark, anchor: 'start' })}
  ${t(72, 538, 'backend/ と backend_spring/ は、どちらも 8080 番を使う。同時には動かせないので、片方を止めてから起動する', { size: SIZE.note, anchor: 'start' })}`;

L.write('5-4-startup', L.svg({
  y0: 570,
  title: 'データベース、バックエンド、フロントエンドの順に起動するときの、それぞれの操作・起きること・成功の目印',
  desc: '起動するものは3つ。1番目はデータベースで、docker compose up -d で起動し、5433 番を使う。2番目はバックエンドで、Eclipse で App.java を実行し、main が initDatabase、Javalin.create、app.get、app.start の順に動く。3番目はフロントエンドで、npm run dev で起動し、5173 番で待つ。データベースを先に起動しないとバックエンドは起動に失敗する。猫の先生が、順番を間違えないよう注意している。',
  body,
  footer: L.foot({ W: 900, y0: 570, pose: 'think', lines: ['起動は、データベース、バックエンド、', 'フロントエンドの順番なんだ。', '順番を間違えると失敗するから気をつけてね。'] }),
}));
