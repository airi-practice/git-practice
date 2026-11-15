// 9-3-css-class: index.css の .message と、JSX の className="message" が、同じ名前で結びつくことを示す。
// 色: ファイルの帯=青（フロントエンド）、結びつく「message」の名前=黄（強調）、結果=灰
const L = require('../rich-lib');
const { C, t, SIZE, SUB, LINE } = L;

const code = (x, y, s, o = {}) => t(x, y, s, { size: SIZE.head, mono: true, anchor: 'start', bold: o.bold, fill: o.fill });
const sp = (n) => '\u00a0'.repeat(n);
const panel = (x, file, step) => `
  <g filter="url(#shadow)"><rect x="${x}" y="16" width="410" height="170" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/></g>
  <path d="M${x} 54 v-24 a14 14 0 0 1 14 -14 h382 a14 14 0 0 1 14 14 v24 z" fill="url(#${C.blue.head})"/>
  ${t(x + 16, 41, file, { size: SIZE.body, mono: true, bold: true, anchor: 'start', fill: '#ffffff' })}`;
const stepTag = (x, s) => t(x, 41, s, { size: SIZE.note, anchor: 'end', fill: '#ffffff' });
const nameBox = (x, s) => `<g filter="url(#shadow)"><rect x="${x}" y="216" width="330" height="44" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2.5"/></g>
  ${t(x + 165, 244, s, { bold: true, fill: C.yellow.dark })}`;

const body = `${panel(20, 'frontend/src/index.css')}
  ${stepTag(414, '手順3で足す')}
  <rect x="32" y="66" width="104" height="32" rx="6" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2.5"/>
  ${code(38, 90, '.message', { bold: true, fill: C.yellow.dark })}
  ${code(146, 90, '{')}
  ${code(36, 124, sp(2) + 'font-weight: bold;')}
  ${code(36, 158, '}')}
${panel(470, 'frontend/src/pages/MessagePage.tsx')}
  ${stepTag(864, '手順4で書く')}
  ${code(486, 90, '<p className=')}
  <rect x="618" y="66" width="108" height="32" rx="6" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2.5"/>
  ${code(623, 90, '"message"', { bold: true, fill: C.yellow.dark })}
  ${code(730, 90, '>')}
  ${code(486, 124, sp(2) + '入力した内容: （ここに表示する）')}
  ${code(486, 158, '</p>')}

  ${L.arrow({ x1: 225, y1: 190, x2: 225, y2: 212, color: 'yellow', width: 4 })}
  ${L.arrow({ x1: 675, y1: 190, x2: 675, y2: 212, color: 'yellow', width: 4 })}
${nameBox(60, '見た目の指定の名前：message')}
${nameBox(510, 'className に書く名前：message')}
  ${L.biArrow({ x1: 394, y1: 238, x2: 506, y2: 238, colorGo: 'yellow', colorBack: 'yellow', width: 4, gap: 12 })}
  ${t(450, 226, '同じ名前', { bold: true, fill: C.yellow.dark })}
  ${L.arrow({ x1: 450, y1: 266, x2: 450, y2: 296, color: 'gray', width: 5 })}
  <g filter="url(#shadow)"><rect x="250" y="300" width="400" height="88" rx="14" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(450, 326, '画面での見え方', { size: SIZE.note, bold: true, fill: SUB })}
  ${t(450, 366, '入力した内容: こんにちは', { size: SIZE.title, bold: true })}`;

const y0 = 404;
L.write('9-3-css-class', L.svg({
  y0,
  title: 'index.css に書く .message という名前の見た目の指定が、JSX の className="message" と同じ名前で結びつき、画面では文字が太字になることを示した図',
  desc: 'index.css には、手順3で .message { font-weight: bold; } と書く。MessagePage.tsx には、手順4で、className="message" を付けた p タグを書く。見た目の指定の名前と className に書く名前が、同じ message で結びつく。その結果、画面では「入力した内容: こんにちは」が太字で表示される。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['index.css の .message と、', 'JSX の className の名前を同じにするんだ。', '名前が同じだと、見た目が結びつくよ。'] }),
}));
