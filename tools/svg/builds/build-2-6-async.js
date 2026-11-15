// 2-6-async: 見出し(青)は最初から、表の部分は読み込み中(灰・点線)から、届いたデータ(緑)で表示に変わる。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const head = (x) => `
  ${L.box({ x: x + 15, y: 80, w: 290, h: 50, color: 'blue' })}
  ${t(x + 160, 112, '商品一覧', { size: SIZE.head, bold: true, fill: C.blue.dark })}`;
const rowR = (x, y, hdr) => `<rect x="${x + 27}" y="${y}" width="266" height="26" fill="${hdr ? '#d9eedb' : '#ffffff'}" stroke="#b7d9ba"/>`;
const body = L.card({ x: 30, y: 20, w: 320, h: 292, color: 'blue', title: '① 画面を開いた直後' }) + head(30)
  + `
  ${L.box({ x: 45, y: 142, w: 290, h: 156, color: 'gray', dashed: true })}
  ${L.icon({ name: 'loader', x: 176, y: 172, size: 28, color: C.gray.main })}
  ${t(190, 232, '読み込み中...', { size: SIZE.head, bold: true, fill: C.gray.dark })}
  ${t(190, 262, '（products は null のまま）', { size: SIZE.note, mono: true, fill: SUB })}`
  + '\n' + L.card({ x: 550, y: 20, w: 320, h: 292, color: 'blue', title: '② データが届いたあと' }) + head(550)
  + `
  ${L.box({ x: 565, y: 142, w: 290, h: 156, color: 'green' })}
  ${rowR(550, 152, true)}${rowR(550, 178)}${rowR(550, 204)}${rowR(550, 230)}
  ${t(710, 170, '商品ID　商品名　価格（円）　在庫数', { size: SIZE.note, fill: C.green.dark })}
  ${t(710, 196, '商品の1件目の行', { size: SIZE.note })}
  ${t(710, 222, '商品の2件目の行', { size: SIZE.note })}
  ${t(710, 248, '商品の3件目の行 …', { size: SIZE.note })}
  ${t(710, 282, '（products に商品の配列が入った）', { size: SIZE.note, fill: C.green.dark })}
  ${L.icon({ name: 'clock', x: 438, y: 112, size: 24, color: C.gray.main })}
  ${t(450, 158, '時間がたつ', { bold: true, fill: C.gray.dark })}
  ${L.arrow({ x1: 362, y1: 180, x2: 538, y2: 180, color: 'gray' })}
  ${t(450, 212, 'この間、画面は', { size: SIZE.note, fill: SUB })}
  ${t(450, 230, '固まらない', { size: SIZE.note, fill: SUB })}`
  + '\n' + L.card({ x: 30, y: 336, w: 840, h: 176, color: 'gray', title: '裏側では、バックエンドに商品の一覧をもらいに行っている（非同期）' })
  + '\n' + L.card({ x: 50, y: 396, w: 250, h: 96, color: 'blue', title: '画面（ProductListPage）', sub: 'fetchProducts() で依頼する' })
  + '\n' + L.card({ x: 600, y: 396, w: 250, h: 96, color: 'green', title: 'バックエンド', sub: '商品の一覧を返す' })
  + `
  ${t(450, 424, '商品の一覧をください（①のとき）', { bold: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 310, y1: 436, x2: 590, y2: 436, color: 'blue', width: 4 })}
  ${L.arrow({ x1: 590, y1: 460, x2: 310, y2: 460, color: 'green', width: 4 })}
  ${t(450, 482, '届いたら then の setProducts が', { bold: true, fill: C.green.dark })}
  ${t(450, 502, '動いて、②になる', { bold: true, fill: C.green.dark })}`;
const y0 = 528;
L.write('2-6-async', L.svg({
  y0,
  title: '商品一覧の画面で、見出しは最初から表示され、表の部分だけが読み込み中から、あとで届いたデータで表示に変わる様子',
  desc: '① 画面を開いた直後は、見出しの商品一覧が表示され、表の部分は読み込み中で、products は null のまま。時間がたつと、画面は固まらないまま、② データが届いたあとに、表の部分が商品の行が並ぶ表に変わる。裏側では、画面（ProductListPage）が fetchProducts() でバックエンドに商品の一覧をもらいに行き（非同期）、届いたら then の setProducts が動いて②になる。猫の先生が、見出しは先に出て、表は商品のデータが届いてから表示されると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['見出しは先に出て、表は商品のデータが', '届いてから表示されるんだ。'] }),
}));
