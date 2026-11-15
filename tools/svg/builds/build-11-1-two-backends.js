// 11-1-two-backends: 画面(青)・8080番(灰)・backend/ と backend_spring/ (緑)・PostgreSQL(橙)。同時には動かせない=赤。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const mono = (x, y, s, o = {}) => t(x, y, s, { mono: true, ...o });
const body = `
${L.card({ x: 20, y: 146, w: 210, h: 160, color: 'blue', title: '画面（フロントエンド）' })}
  ${mono(125, 222, 'frontend/', { fill: C.blue.dark, bold: true })}
  ${mono(125, 246, 'localhost:5173')}
  ${t(125, 284, 'コードは1行も変えない', { bold: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 234, y1: 226, x2: 276, y2: 226, color: 'blue' })}
  <g filter="url(#shadow)"><rect x="280" y="170" width="130" height="112" rx="16" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(345, 206, '8080 番', { size: SIZE.head, bold: true, fill: C.gray.dark })}
  ${t(345, 234, '同時に1つの', { size: SIZE.note })}
  ${t(345, 252, 'プログラムだけが', { size: SIZE.note })}
  ${t(345, 270, '使える', { size: SIZE.note })}
  <line x1="414" y1="200" x2="466" y2="120" stroke="${C.blue.main}" stroke-width="5" stroke-linecap="round" marker-end="url(#arB)"/>
  <line x1="414" y1="252" x2="466" y2="332" stroke="${C.blue.main}" stroke-width="5" stroke-linecap="round" marker-end="url(#arB)"/>
${L.card({ x: 470, y: 20, w: 250, h: 176, color: 'green', title: 'backend/' })}
  ${t(595, 94, '第1〜10章で使ってきたバックエンド', { size: SIZE.note })}
  ${t(595, 118, '入口：')}
  ${mono(595, 142, 'App.java', { bold: true, fill: C.green.dark })}
  ${t(595, 174, '成功の目印：Listening on ...', { size: SIZE.note, fill: SUB })}
${L.card({ x: 470, y: 256, w: 250, h: 176, color: 'green', title: 'backend_spring/' })}
  ${t(595, 330, '同じ API を Spring Boot で作り直したもの', { size: SIZE.note })}
  ${t(595, 354, '入口：')}
  ${mono(595, 378, 'TrainingApplication.java', { bold: true, fill: C.green.dark, size: SIZE.note })}
  ${t(595, 410, '成功の目印：Started TrainingApplication', { size: SIZE.note, fill: SUB })}
  <g filter="url(#shadow)"><rect x="470" y="206" width="250" height="40" rx="20" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${t(595, 223, '同時には動かせない', { size: SIZE.note, bold: true, fill: C.red.dark })}
  ${t(595, 239, 'どちらも 8080 番を使うため', { size: SIZE.note, fill: C.red.dark })}
  <line x1="724" y1="108" x2="754" y2="176" stroke="${C.green.main}" stroke-width="5" stroke-linecap="round" marker-end="url(#arG)"/>
  <line x1="724" y1="344" x2="754" y2="276" stroke="${C.green.main}" stroke-width="5" stroke-linecap="round" marker-end="url(#arG)"/>
${L.card({ x: 758, y: 156, w: 126, h: 140, color: 'orange', title: 'PostgreSQL' })}
  ${mono(821, 228, 'products', { size: SIZE.note })}
  ${t(821, 248, 'テーブル', { size: SIZE.note })}
  ${t(821, 280, '同じものを読む', { size: SIZE.note, bold: true, fill: C.orange.dark })}`;
const y0 = 448;
L.write('11-1-two-backends', L.svg({
  y0,
  title: '画面と同じデータベースを共有する2つのバックエンド、backend/ と backend_spring/ のうち、8080 番を使えるのは同時に1つだけであることを示した図',
  desc: '画面（フロントエンド、frontend/、localhost:5173）は 8080 番にリクエストを送る。8080 番は同時に1つのプログラムだけが使える。backend/（第1〜10章で使ってきたバックエンド、入口は App.java）と backend_spring/（同じ API を Spring Boot で作り直したもの、入口は TrainingApplication.java）はどちらも 8080 番を使うため、同時には動かせない。どちらも同じ PostgreSQL の products テーブルを読む。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['backend/ と backend_spring/ は、どちらも', '8080 番を使うんだ。だから同時には動かせないよ。'] }),
}));
