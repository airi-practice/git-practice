// 2-2-css-compare: 同じ HTML に別の CSS を当てる。CSS A / B は役割がないので灰、画面の見本の色は「見た目の例」そのもの。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const mock = (x, dark) => `
  <rect x="${x}" y="96" width="330" height="130" rx="8" fill="${dark ? '#263238' : '#ffffff'}" stroke="${dark ? '#263238' : '#cbd5e1'}" stroke-width="1.5"/>
  ${t(x + 25, dark ? 148 : 146, '商品一覧', { size: dark ? SIZE.hero : SIZE.title, bold: true, anchor: 'start', fill: dark ? '#ffd54f' : '#222222' })}
  <rect x="${x + 25}" y="170" width="110" height="40" rx="${dark ? 0 : 20}" fill="${dark ? '#e53935' : '#1e88e5'}"/>
  ${t(x + 80, 196, '購入', { bold: true, fill: '#ffffff' })}`;
const body = L.card({ x: 150, y: 14, w: 600, h: 100, color: 'blue', title: '同じ HTML（どちらの画面も、この部品を使う）' })
  + `\n  ${t(450, 94, '<h2>商品一覧</h2> <button>購入</button>', { size: SIZE.head, mono: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 340, y1: 122, x2: 240, y2: 168, color: 'blue', width: 4 })}
  ${L.arrow({ x1: 560, y1: 122, x2: 660, y2: 168, color: 'blue', width: 4 })}`
  + '\n' + L.card({ x: 20, y: 174, w: 410, h: 252, color: 'gray', title: 'CSS A を当てる', sub: '白い背景、黒い文字、青くて丸いボタン' })
  + L.card({ x: 470, y: 174, w: 410, h: 252, color: 'gray', title: 'CSS B を当てる', sub: '黒い背景、黄色い大きな文字、赤い四角いボタン' })
  + `\n  <g transform="translate(0 170)">${mock(60, false)}\n  ${mock(510, true)}</g>`;
const y0 = 440;
L.write('2-2-css-compare', L.svg({
  y0,
  title: '同じ HTML に別の CSS を当てると、見た目だけが変わることを2つ並べて比べた図',
  desc: '同じ HTML（見出しの商品一覧とボタンの購入）に、CSS A を当てると白い背景・黒い文字・青くて丸いボタンになり、CSS B を当てると黒い背景・黄色い大きな文字・赤い四角いボタンになる。猫の先生が、HTML は同じでも CSS を替えると色・形・大きさが変わると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['HTMLは同じでも、CSSを替えると', '色・形・大きさが変わるんだよ。'] }),
}));
