// 3-1-front-only-limit: ブラウザだけでは「できない」3つを、バックエンドが「できる」に変える図
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const item = (x, y, color, ico, title, note) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="370" height="80" rx="12" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>
  <circle cx="${x + 32}" cy="${y + 40}" r="17" fill="${C[color].main}"/>
  ${L.icon({ name: ico, x: x + 22, y: y + 30, size: 20, color: '#ffffff', width: 3 })}
  ${t(x + 62, y + 34, title, { bold: true, anchor: 'start', fill: C[color].dark })}
  ${t(x + 62, y + 58, note, { size: SIZE.note, anchor: 'start', fill: SUB })}`;
const items = (x, color, ico, rows) => rows.map((r, i) => item(x, 84 + i * 100, color, ico, ...r)).join('');
const body = `
${L.card({ x: 20, y: 20, w: 400, h: 356, color: 'blue', title: 'ブラウザの中（フロントエンド）だけでは…' })}
${items(35, 'red', 'x', [
  ['データベースに、直接つなげない', 'つなぐのは、サーバー側の Java の仕事だよ'],
  ['全員で共通のデータを、持てない', 'ブラウザの中の値は、自分のブラウザだけのもの'],
  ['大事な判断を、任せられない', '利用者がプログラムを書き換えられるから']])}
${L.card({ x: 480, y: 20, w: 400, h: 356, color: 'green', title: 'サーバー（バックエンド）なら…' })}
${items(495, 'green', 'check', [
  ['データベースにつなげる', '商品などのデータを取り出せる'],
  ['全員で共通のデータを管理できる', '誰が画面を開いても、同じデータを返せる'],
  ['信頼できる処理ができる', '利用者が書き換えられない場所で判断する']])}
  ${t(450, 192, '任せる', { bold: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 428, y1: 206, x2: 472, y2: 206, color: 'blue' })}`;
const y0 = 392;
L.write('3-1-front-only-limit', L.svg({
  y0,
  title: 'ブラウザの中だけではできない3つのことを、サーバー側のバックエンドが引き受ける図',
  desc: 'ブラウザの中（フロントエンド）だけでは、データベースに直接つなげない、全員で共通のデータを持てない、大事な判断を任せられない。これらを、サーバー（バックエンド）に任せると、データベースにつなげる、全員で共通のデータを管理できる、信頼できる処理ができる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['ブラウザの中だけだと、できないことがあるんだ。', 'そこをサーバー側のバックエンドが引き受けるよ'] }),
}));
