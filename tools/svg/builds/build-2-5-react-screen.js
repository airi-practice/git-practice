// 2-5-react-screen: 部品を React が組み合わせて画面にする。部品3つは役割のない並列なので p1〜p3 で区別し、名前のラベルも付ける。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const names = [['p1', '見出しの部品', '見出し'], ['p2', '表の部品', '表'], ['p3', 'ボタンの部品', 'ボタン']];
const item = (x, k, color, label) => {
  const y = 112 + 65 * k, c = C[color];
  return `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="200" height="50" rx="10" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  ${t(x + 100, y + 31, label, { size: SIZE.head, bold: true, fill: c.dark })}`;
};
let body = `${t(450, 30, '※ 仕組みを説明するための例で、このシステムの画面ではない', { fill: SUB })}
${L.card({ x: 20, y: 50, w: 250, h: 258, color: 'blue', title: '部品（コンポーネント）' })}
${L.card({ x: 630, y: 50, w: 250, h: 258, color: 'blue', title: '画面' })}
${L.card({ x: 350, y: 140, w: 200, h: 110, color: 'blue', title: 'React' })}
  ${t(450, 214, '部品を組み合わせて', { fill: C.blue.dark })}
  ${t(450, 234, '画面を作る', { fill: C.blue.dark })}`;
names.forEach(([c, a, b], k) => { body += item(45, k, c, a) + item(655, k, c, b); });
body += `
  ${L.arrow({ x1: 280, y1: 195, x2: 340, y2: 195, color: 'blue' })}
  ${L.arrow({ x1: 560, y1: 195, x2: 620, y2: 195, color: 'blue' })}
  <path d="M755 314 V352 H450 V258" fill="none" stroke="${C.blue.main}" stroke-width="4" stroke-dasharray="10,7" stroke-linecap="round" marker-end="url(#arB)"/>
  ${L.icon({ name: 'refresh', x: 470, y: 358, size: 24, color: C.blue.main })}
  ${t(504, 377, 'データが変わると、React が画面を作り直す', { bold: true, anchor: 'start', fill: C.blue.dark })}`;
const y0 = 396;
L.write('2-5-react-screen', L.svg({
  y0,
  title: 'React が、いくつかの部品を組み合わせて画面を作る様子を示した図。データが変わると画面は作り直される',
  desc: '見出しの部品・表の部品・ボタンの部品を React が組み合わせて、見出し・表・ボタンでできた画面を作る。データが変わると、React が画面を作り直す。仕組みを説明するための例で、このシステムの画面ではない。猫の先生が、画面は部品を組み合わせてできていると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['画面は、いくつかの部品を組み合わせて', 'できているんだ。'] }),
}));
