// kadai-02-flow: 課題2の流れ。画面（URL から id を取り出す）→ API を呼ぶ → バックエンド → データベース。結果は、商品があれば 200、なければ 404。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const CW = 190, GAP = (860 - 4 * CW) / 3, Y = 14, H = 200;
const X = [0, 1, 2, 3].map((i) => 20 + i * (CW + GAP));
const mid = (i) => X[i] + CW / 2;
const code = (i, y, s, o = {}) => t(mid(i), y, s, { size: SIZE.note, mono: true, bold: o.bold, fill: C[o.color].dark });
const text = (i, y, s, color, bold) => t(mid(i), y, s, { bold, fill: C[color].dark });
const body = `
  ${L.card({ x: X[0], y: Y, w: CW, h: H, color: 'blue', title: '1. URL から id' })}
  ${code(0, Y + 78, '/products/4', { bold: true, color: 'blue' })}
  ${code(0, Y + 104, 'path="/products/:id"', { color: 'blue' })}
  ${text(0, Y + 140, 'useParams() で', 'blue')}
  ${text(0, Y + 162, 'id = "4" を取り出す', 'blue')}
  ${L.card({ x: X[1], y: Y, w: CW, h: H, color: 'blue', title: '2. API を呼ぶ' })}
  ${code(1, Y + 78, 'fetchProduct("4")', { color: 'blue' })}
  ${text(1, Y + 110, 'が、次の URL へ', 'blue')}
  ${code(1, Y + 140, 'GET /api/products/4', { bold: true, color: 'blue' })}
  ${text(1, Y + 168, 'を送る', 'blue')}
  ${L.card({ x: X[2], y: Y, w: CW, h: H, color: 'green', title: '3. バックエンド' })}
  ${text(2, Y + 84, 'URL の {id} を', 'green')}
  ${text(2, Y + 106, '受け取り、', 'green')}
  ${text(2, Y + 140, 'その商品を', 'green')}
  ${text(2, Y + 162, '1件だけ探す', 'green')}
  ${L.card({ x: X[3], y: Y, w: CW, h: H, color: 'orange', title: '4. データベース' })}
  ${code(3, Y + 78, 'SELECT ... FROM', { color: 'orange' })}
  ${code(3, Y + 98, 'products', { color: 'orange' })}
  ${code(3, Y + 124, 'WHERE id = ?', { bold: true, color: 'orange' })}
  ${text(3, Y + 156, '? に 4 が入る', 'orange')}
  ${text(3, Y + 178, '合う行がなければ 0 行', 'orange')}
  ${[0, 1, 2].map((i) => L.arrow({ x1: X[i] + CW + 3, y1: 114, x2: X[i + 1] - 3, y2: 114, color: ['blue', 'blue', 'green'][i], width: 4 })).join('\n  ')}
  <g filter="url(#shadow)"><rect x="20" y="236" width="424" height="76" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(232, 262, '商品がある', { bold: true, fill: C.green.dark })}
  ${t(232, 284, '200 と、商品1件の JSON が届く', { fill: C.green.dark })}
  ${t(232, 303, '→ 画面に、詳細の表が出る', { size: SIZE.note, fill: C.green.dark })}
  <g filter="url(#shadow)"><rect x="456" y="236" width="424" height="76" rx="12" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${t(668, 262, '商品がない', { bold: true, fill: C.red.dark })}
  ${t(668, 284, '404 が届く', { fill: C.red.dark })}
  ${t(668, 303, '→ 画面に、取得に失敗しましたと出る', { size: SIZE.note, fill: C.red.dark })}`;
const y0 = 328;
L.write('kadai-02-flow', L.svg({
  y0,
  title: '課題2の流れ。URL の商品IDを取り出して API を呼び、データベースで1件探し、見つかれば200、なければ404が届くことを示した図',
  desc: '1. 画面は、URL の /products/4 を、path が /products/:id の Route に当てはめ、useParams で id が 4 であることを取り出す。2. fetchProduct("4") が、GET /api/products/4 を送る。3. バックエンドは、URL の {id} を受け取り、その商品を1件だけ探す。4. データベースでは、SELECT 文の WHERE id が ? に4を入れて探す。合う行がなければ0行になる。商品があれば、200 と商品1件の JSON が届き、画面に詳細の表が出る。商品がなければ404が届き、画面に「取得に失敗しました」と出る。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['画面より先に、API だけを', 'ブラウザで開いて確かめると、', '悪いところを見つけやすいよ'] }),
}));
