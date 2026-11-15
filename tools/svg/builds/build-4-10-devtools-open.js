// 4-10-devtools-open: 開発者ツールを開いて、通信を記録する4つの手順。すべてブラウザでの操作なので青。
// 順番は番号つきの見出しで示す。手順4の注意（開く前の通信は記録されない）は、強調の黄の箱で示す。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const X = [20, 240, 460, 680];
const cap = (x, a, b) => t(x + 100, 190, a) + '\n  ' + t(x + 100, 212, b);
const key = (x, label) => `
  <g filter="url(#shadow)"><rect x="${x + 50}" y="82" width="100" height="64" rx="12" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(x + 100, 124, label, { size: SIZE.hero, bold: true, mono: true, fill: C.gray.dark })}`;
const chip = (x, w, label, hot) =>
  `<rect x="${x}" y="90" width="${w}" height="32" rx="8" fill="${hot ? C.yellow.light : '#ffffff'}" stroke="${hot ? C.yellow.main : C.gray.main}" stroke-width="${hot ? 3 : 1.5}"/>`
  + t(x + w / 2, 111, label, { size: SIZE.note, bold: hot, mono: true, fill: hot ? C.yellow.dark : C.gray.dark });
const body = `
  ${X.map((x, i) => L.card({ x, y: 14, w: 200, h: 214, color: 'blue', title: ['1. ページを開く', '2. F12 を押す', '3. Network を選ぶ', '4. F5 を押す'][i] })).join('')}
  ${[0, 1, 2].map((i) => L.arrow({ x1: X[i] + 202, y1: 120, x2: X[i + 1] - 2, y2: 120, color: 'gray', width: 4 })).join('\n  ')}
  <rect x="${X[0] + 12}" y="80" width="176" height="52" rx="12" fill="#ffffff" stroke="${C.blue.main}" stroke-width="2"/>
  ${t(X[0] + 100, 102, 'http://localhost:5173', { size: SIZE.note, mono: true, fill: C.blue.dark })}
  ${t(X[0] + 100, 122, '/products', { size: SIZE.note, mono: true, bold: true, fill: C.blue.dark })}
  ${cap(X[0], 'ブラウザで、', 'このページを開く')}
  ${key(X[1], 'F12')}
  ${cap(X[1], 'キーを押して、', '開発者ツールを開く')}
  <rect x="${X[2] + 12}" y="84" width="176" height="44" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/>
  ${chip(X[2] + 20, 72, 'Console', false)}${chip(X[2] + 100, 80, 'Network', true)}
  ${cap(X[2], 'タブの中から、', '「Network」を選ぶ')}
  ${key(X[3], 'F5')}
  ${cap(X[3], '画面を再読み込みして、', '通信を記録する')}
  <g filter="url(#shadow)"><rect x="20" y="246" width="860" height="52" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(450, 269, 'Network は、開いている間の通信だけを記録する。', { fill: C.yellow.dark, bold: true })}
  ${t(450, 289, 'だから、開いてから F5 で再読み込みして、通信をもう一度送る', { fill: C.yellow.dark })}`;
const y0 = 314;
L.write('4-10-devtools-open', L.svg({
  y0,
  title: '開発者ツールを開いて、通信を記録する4つの手順を、番号の順に並べた図',
  desc: '1. ブラウザで http://localhost:5173/products を開く。2. F12 キーを押して、開発者ツールを開く。3. タブの中から Network を選ぶ。4. F5 キーを押して、画面を再読み込みし、通信を記録する。Network は、開いている間の通信だけを記録するので、開いてから再読み込みして、通信をもう一度送る。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['タブはたくさんあるけれど、', 'この節で使うのは Network と Console だけだよ'] }),
}));
