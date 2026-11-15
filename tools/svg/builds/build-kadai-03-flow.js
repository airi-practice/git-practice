// kadai-03-flow: 課題3の流れ。入力した文字を name にして送り、API が LIKE で絞り込む。name がないときは全件のまま（お手本の一覧を壊さない）。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const CW = 190, GAP = (860 - 4 * CW) / 3, Y = 14, H = 200;
const X = [0, 1, 2, 3].map((i) => 20 + i * (CW + GAP));
const mid = (i) => X[i] + CW / 2;
const code = (i, y, s, o = {}) => t(mid(i), y, s, { size: SIZE.note, mono: true, bold: o.bold, fill: C[o.color].dark });
const text = (i, y, s, color) => t(mid(i), y, s, { fill: C[color].dark });
const body = `
  ${L.card({ x: X[0], y: Y, w: CW, h: H, color: 'blue', title: '1. 入力して押す' })}
  <rect x="${X[0] + 16}" y="${Y + 62}" width="104" height="30" rx="4" fill="#ffffff" stroke="${L.LINE}"/>${t(X[0] + 28, Y + 82, 'ペン', { anchor: 'start' })}
  <rect x="${X[0] + 126}" y="${Y + 62}" width="48" height="30" rx="4" fill="${C.gray.light}" stroke="${C.gray.main}"/>${t(X[0] + 150, Y + 82, '検索', { size: SIZE.note })}
  ${text(0, Y + 124, '押したときに、', 'blue')}
  ${code(0, Y + 150, 'searchProducts("ペン")', { color: 'blue' })}
  ${text(0, Y + 176, 'を呼ぶ', 'blue')}
  ${L.card({ x: X[1], y: Y, w: CW, h: H, color: 'blue', title: '2. URL にする' })}
  ${text(1, Y + 80, '日本語は、変換して', 'blue')}
  ${text(1, Y + 102, 'から URL につなぐ', 'blue')}
  ${code(1, Y + 138, '/api/products?name=', { color: 'blue' })}
  ${code(1, Y + 160, '%E3%83%9A%E3%83%B3', { bold: true, color: 'blue' })}
  ${L.card({ x: X[2], y: Y, w: CW, h: H, color: 'green', title: '3. API で絞る' })}
  ${text(2, Y + 80, 'name を受け取り、', 'green')}
  ${code(2, Y + 108, 'keyword = "ペン"', { color: 'green' })}
  ${text(2, Y + 138, 'LIKE の ? に', 'green')}
  ${code(2, Y + 162, '%ペン%', { bold: true, color: 'green' })}
  ${text(2, Y + 186, 'を入れて探す', 'green')}
  ${L.card({ x: X[3], y: Y, w: CW, h: H, color: 'orange', title: '4. データベース' })}
  ${code(3, Y + 78, 'WHERE name LIKE ?', { bold: true, color: 'orange' })}
  ${text(3, Y + 110, '「ペン」を含む行だけ', 'orange')}
  ${text(3, Y + 132, '返す', 'orange')}
  ${text(3, Y + 168, '→ ボールペンの1件', 'orange')}
  ${[0, 1, 2].map((i) => L.arrow({ x1: X[i] + CW + 3, y1: 114, x2: X[i + 1] - 3, y2: 114, color: ['blue', 'blue', 'green'][i], width: 4 })).join('\n  ')}
  <g filter="url(#shadow)"><rect x="20" y="236" width="860" height="76" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(450, 262, 'name が付いていないとき（お手本の一覧画面）', { bold: true, fill: C.yellow.dark })}
  ${t(450, 284, 'keyword が空になり、LIKE の値は %% になる。% の間が空でも「含む」は成り立つので、全5件が返る', { size: SIZE.note, fill: C.yellow.dark })}
  ${t(450, 303, 'だから、条件を足したあとも、お手本の一覧画面は今までどおり動く', { size: SIZE.note, fill: C.yellow.dark })}`;
const y0 = 328;
L.write('kadai-03-flow', L.svg({
  y0,
  title: '課題3の流れ。入力した文字を name として送り、API が LIKE で商品名に含む商品だけに絞る。name がないときは全件のまま返ることを示した図',
  desc: '1. 画面で「ペン」と入力して検索を押すと、searchProducts("ペン") が呼ばれる。2. 日本語は変換してから、/api/products?name=%E3%83%9A%E3%83%B3 という URL にする。3. API は name を受け取り、keyword を「ペン」にして、LIKE の ? に %ペン% を入れて探す。4. データベースは WHERE name LIKE ? で、「ペン」を含む行だけを返し、ボールペンの1件になる。name が付いていないとき（お手本の一覧画面）は、keyword が空になり、LIKE の値は %% になって、全5件が返る。だから、条件を足したあとも、お手本の一覧画面は今までどおり動く。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['SQL に文字を直接つなげず、', '? で渡す理由は、第10章の', '例B にも書いてあるよ'] }),
}));
