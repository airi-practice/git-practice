// 3-3-to-3-7-flow: 3-3 から 3-7 の流れを、上から下へ1本につなぐ
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const row = (y, color, no, sub, title, desc) => `
  <g filter="url(#shadow)"><rect x="30" y="${y}" width="840" height="82" rx="14" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>
  <rect x="42" y="${y + 12}" width="96" height="58" rx="10" fill="url(#${C[color].head})"/>
  ${t(90, sub ? y + 38 : y + 49, no, { size: SIZE.title, bold: true, fill: '#ffffff' })}${sub ? '\n  ' + t(90, y + 58, sub, { size: SIZE.note, fill: '#ffffff' }) : ''}
  ${t(158, y + 36, title, { size: SIZE.head, bold: true, anchor: 'start', fill: C[color].dark })}
  ${t(158, y + 62, desc, { size: SIZE.note, anchor: 'start', fill: SUB })}`;
const down = (y1, y2, color) => `  ${L.arrow({ x1: 450, y1, x2: 450, y2, color, width: 5 })}`;
const body = `
  <g filter="url(#shadow)"><rect x="210" y="15" width="480" height="48" rx="14" fill="url(#headBlue)"/></g>
  ${t(450, 46, 'フロントエンド：GET /api/products を送る', { size: SIZE.head, bold: true, fill: '#ffffff' })}
${down(65, 106, 'blue')}
${row(110, 'green', '3-3', '', 'App.java：リクエストを受け付ける', '8080 番で待ち受け、app.get の対応づけに従って、ProductListApi の handle を呼ぶ')}
${down(192, 228, 'green')}
${row(232, 'green', '3-4', '', 'ProductListApi：handle(Context ctx) が呼ばれる', 'ctx には、リクエストとレスポンスの情報が入っている。handle の中で、処理を進める')}
${down(314, 350, 'green')}
${row(354, 'orange', '3-5', '', 'Database：データベースにつなぐ', 'Database.connect() が、JDBC を使って、PostgreSQL への接続を作る')}
${down(436, 472, 'orange')}
${row(476, 'orange', '3-7', '(と 3-6)', 'handle の続き：SELECT で、商品を取り出す', '1行ずつ ProductResponse（DTO）に詰めて、List に入れる。最後に接続を閉じる')}
${down(558, 594, 'green')}
${row(598, 'green', '3-6', '', 'ctx.json(products)：JSON にして、フロントエンドへ返す', 'ProductResponse の getter の名前から、JSON の項目名が決まる')}`;
const y0 = 696;
L.write('3-3-to-3-7-flow', L.svg({
  y0,
  title: '3-3 から 3-7 の流れ。リクエストを受け付け、handle が呼ばれ、データベースにつなぎ、SELECT で取り出し、JSON にして返す',
  desc: 'フロントエンドが GET /api/products を送る。3-3 App.java がリクエストを受け付けて ProductListApi の handle を呼び、3-4 handle(Context ctx) が呼ばれ、3-5 Database がデータベースにつなぎ、3-7（と 3-6）handle の続きで SELECT により商品を取り出して ProductResponse に詰め、3-6 ctx.json(products) で JSON にしてフロントエンドへ返す。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['リクエストを受けて、DB から取り出して、', 'JSON にして返す。この流れをつかもう！'] }),
}));
