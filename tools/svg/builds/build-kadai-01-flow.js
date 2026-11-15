// kadai-01-flow: 課題1の考え方。お手本の API が全5件を返し、画面の側で在庫100以下の2件に絞る。API=緑、画面=青、強調=黄。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const CW = 230, X = [20, 335, 650], Y = 14, H = 214;
const data = [['ボールペン', 200], ['ノート', 120], ['クリアファイル', 500], ['付箋', 80], ['マーカー', 0]];
// 商品の行を並べる。hot の行は、黄で強調する
const list = (x, rows, color) => rows.map(([n, s], i) => {
  const y = Y + 62 + i * 28;
  const hot = s <= 100;
  return `<rect x="${x + 14}" y="${y}" width="${CW - 28}" height="24" rx="6" fill="${hot ? C.yellow.light : '#ffffff'}" stroke="${hot ? C.yellow.main : C[color].main}" stroke-width="${hot ? 2 : 1}"/>
  ${t(x + 24, y + 17, n, { size: SIZE.note, anchor: 'start', fill: C[color].dark })}${t(x + CW - 24, y + 17, '在庫 ' + s, { size: SIZE.note, anchor: 'end', bold: hot, fill: C[color].dark })}`;
}).join('\n  ');
const body = `
  ${L.card({ x: X[0], y: Y, w: CW, h: H, color: 'green', title: 'お手本の API' })}
  ${t(X[0] + CW / 2, Y + 76, 'GET /api/products', { size: SIZE.note, mono: true, bold: true, fill: C.green.dark })}
  ${t(X[0] + CW / 2, Y + 112, '全商品を、いつもどおり', { fill: C.green.dark })}
  ${t(X[0] + CW / 2, Y + 134, '返してくれる', { fill: C.green.dark })}
  ${t(X[0] + CW / 2, Y + 184, '変更しない', { bold: true, fill: C.gray.dark })}
  ${L.card({ x: X[1], y: Y, w: CW, h: H, color: 'blue', title: '画面が受け取る分' })}
  ${list(X[1], data, 'blue')}
  ${L.card({ x: X[2], y: Y, w: CW, h: H, color: 'blue', title: '表に出す分' })}
  ${list(X[2], data.filter(([, s]) => s <= 100), 'blue')}
  ${t(X[2] + CW / 2, Y + 160, '在庫が100以下の', { fill: C.blue.dark })}
  ${t(X[2] + CW / 2, Y + 182, '2件だけが残る', { fill: C.blue.dark })}
  ${L.arrow({ x1: X[0] + CW + 4, y1: 120, x2: X[1] - 4, y2: 120, color: 'green', width: 5 })}
  ${L.arrow({ x1: X[1] + CW + 4, y1: 120, x2: X[2] - 4, y2: 120, color: 'blue', width: 5 })}
  ${L.badge({ cx: (X[0] + CW + X[1]) / 2, cy: 94, n: 1, color: 'green' })}
  ${L.badge({ cx: (X[1] + CW + X[2]) / 2, cy: 94, n: 2, color: 'blue' })}
  ${t((X[0] + CW + X[1]) / 2, 150, '全5件が', { size: SIZE.note })}${t((X[0] + CW + X[1]) / 2, 168, '届く', { size: SIZE.note })}
  ${t((X[1] + CW + X[2]) / 2, 150, 'for と if で', { size: SIZE.note })}${t((X[1] + CW + X[2]) / 2, 168, '絞り込む', { size: SIZE.note })}
  <g filter="url(#shadow)"><rect x="20" y="248" width="860" height="52" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(450, 271, '絞り込むのは、画面の側。API は、新しく作らなくてよい', { bold: true, fill: C.yellow.dark })}
  ${t(450, 291, '全商品を1件ずつ見て、条件に合うものだけを、別の配列に足す', { fill: C.yellow.dark })}`;
const y0 = 316;
L.write('kadai-01-flow', L.svg({
  y0,
  title: '課題1の考え方。お手本の API が返した全5件を、画面の側で、在庫が100以下の2件だけに絞り込む流れを示した図',
  desc: '左から、お手本の API、画面が受け取る分、表に出す分の3つが並ぶ。1. お手本の GET /api/products は、変更せずに、全5件の商品を返す。2. 画面は、届いた配列を for 文で1件ずつ見て、if 文で条件に合うものだけを、別の配列に足して絞り込む。在庫が100以下の付箋（80）とマーカー（0）の2件だけが残り、表に出る。絞り込むのは画面の側で、API は新しく作らなくてよい。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['1件ずつ見て、条件に合うものだけを', '別の入れ物に入れるには、', 'for と if をどう組み合わせるかな？'] }),
}));
