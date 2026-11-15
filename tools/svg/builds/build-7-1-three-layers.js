// 7-1-three-layers: 3つの層の役割・場所・主なもの。色は フロントエンド=青、バックエンド=緑、データベース=橙（元の図は青と緑が逆だったので直した）。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const Y = 54, H = 474, W = 240, XS = [20, 330, 640];
const lab = (x, y, s, c) => `${t(x + 16, y, s, { bold: true, fill: C[c].dark, anchor: 'start' })}
  <line x1="${x + 16}" y1="${y + 6}" x2="${x + W - 16}" y2="${y + 6}" stroke="${C[c].main}" stroke-opacity="0.35"/>`;
const ln = (x, y, s) => t(x + 16, y, s, { size: SIZE.note, anchor: 'start', fill: '#1e293b' });
// 関数名などは等幅にして、説明を続ける
const code = (x, y, name, rest) => `<text x="${x + 16}" y="${y}" font-size="13" fill="#1e293b"><tspan font-family="Consolas,'Courier New',monospace">${name}</tspan>${rest}</text>`;
const col = (k, color, title, sub, blocks) => {
  const x = XS[k];
  return `${L.card({ x, y: Y, w: W, h: H, color, title, sub })}
  ${blocks.map(([label, y, lines]) => lab(x, Y + y, label, color) + '\n  ' + lines.map(([kind, a, b], i) => (kind === 'c' ? code(x, Y + y + 22 + i * 20, a, b) : ln(x, Y + y + 22 + i * 20, a))).join('\n  ')).join('\n  ')}`;
};
const T = (s) => ['t', s];
const body = `
  ${t(450, 34, '3つの層は、それぞれ別の仕事を担当している', { size: SIZE.title, bold: true })}
${col(0, 'blue', 'フロントエンド', '利用者が見て、操作する画面', [
  ['どこにあるか', 120, [['c', 'frontend/', ''], T('（ブラウザの中で動く）')]],
  ['担当していること', 192, [T('画面の表示'), T('バックエンドへのリクエストの送信'), T('届いたデータの表示'), T('読み込み中やエラーの表示')]],
  ['主な関数・型', 312, [['c', 'ProductListPage', '：画面の部品'], ['c', 'fetchProducts', '：リクエスト送信'], ['c', 'Product', '：データの型']]],
  ['知っていること', 400, [['c', '/api/products', ' という'], T('URL だけ。'), T('データベースは知らない')]],
])}
${col(1, 'green', 'バックエンド', '受け取って、処理して、返す', [
  ['どこにあるか', 120, [['c', 'backend/', '（Java のプログラム）']]],
  ['担当していること', 192, [T('リクエストの受付'), T('処理の実行'), T('データベースの読み書き'), T('レスポンス（JSON）の作成')]],
  ['主なクラス・メソッド', 312, [['c', 'App.main', '：URL の振り分け'], ['c', 'ProductListApi.handle', ''], T('　：商品一覧の処理'), ['c', 'Database.connect', '：接続']]],
])}
  ${t(XS[1] + 16, Y + 430, 'データベースにつなぐのは、', { size: SIZE.note, bold: true, anchor: 'start', fill: C.green.dark })}
  ${t(XS[1] + 16, Y + 450, 'この層だけ', { size: SIZE.note, bold: true, anchor: 'start', fill: C.green.dark })}
${col(2, 'orange', 'データベース', '情報を保存しておく', [
  ['どこにあるか', 120, [['c', 'PostgreSQL 17', ''], T('（Docker のコンテナ）')]],
  ['担当していること', 192, [T('商品の情報の保存'), T('商品の情報の取り出し')]],
  ['主なもの', 272, [['c', 'products', ' テーブル'], T('（商品名、価格、在庫数など）')]],
  ['注意', 352, [T('データベースそのものは'), T('プログラムではない。'), T('読み書きするのは、'), T('バックエンドの Java のコード')]],
])}
  ${t(295, 266, 'リクエスト', { size: SIZE.note, bold: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 264, y1: 276, x2: 326, y2: 276, color: 'blue', width: 4 })}
  ${L.arrow({ x1: 326, y1: 322, x2: 264, y2: 322, color: 'green', width: 4 })}
  ${t(295, 346, 'レスポンス', { size: SIZE.note, bold: true, fill: C.green.dark })}
  ${t(605, 266, 'SQL', { size: SIZE.note, bold: true, fill: C.green.dark })}
  ${L.arrow({ x1: 574, y1: 276, x2: 636, y2: 276, color: 'green', width: 4 })}
  ${L.arrow({ x1: 636, y1: 322, x2: 574, y2: 322, color: 'orange', width: 4 })}
  ${t(605, 346, '行のデータ', { size: SIZE.note, bold: true, fill: C.orange.dark })}
  <g filter="url(#shadow)"><rect x="20" y="${Y + H + 20}" width="860" height="74" rx="14" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(450, Y + H + 50, 'フロントエンドは、データベースを知らない。', { size: SIZE.head, bold: true, fill: C.yellow.dark })}
  ${t(450, Y + H + 78, 'つなぐのはバックエンドだけ。だから、パスワードを秘密にしたまま、全員が同じデータを使える')}`;
const y0 = Y + H + 20 + 74 + 16;
L.write('7-1-three-layers', L.svg({
  y0,
  title: 'フロントエンド、バックエンド、データベースの3つの層それぞれの役割、場所、主なファイルやクラスと、層の間で運ばれるもの',
  desc: 'フロントエンドは frontend/ にあり、画面の表示とリクエストの送信を担当する。バックエンドは backend/ にあり、リクエストの受付、処理、データベースの読み書き、JSON の作成を担当する。データベースは PostgreSQL 17 で、商品の情報を保存する。層の間では、フロントエンドとバックエンドの間をリクエストとレスポンスが、バックエンドとデータベースの間を SQL と行のデータが運ばれる。フロントエンドはデータベースを知らず、つなぐのはバックエンドだけ。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['3つの層は、それぞれ役割が違うんだ。', 'つなぐのはバックエンドだけだと、', '覚えておこうね。'] }),
}));
