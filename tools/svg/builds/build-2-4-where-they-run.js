// 2-4-where-they-run: Java はサーバー側(緑)、JavaScript はブラウザの中(青)。真ん中の API は往復なので灰。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const side = (x, color, title, lang, dir, files, extra) => L.card({ x, y: 14, w: 360, h: 320, color, title })
  + `
  ${t(x + 180, 106, lang, { size: SIZE.hero, bold: true, fill: C[color].dark })}
  ${t(x + 180, 132, 'が動く', { fill: SUB })}
  ${L.box({ x: x + 30, y: 148, w: 300, h: 36, color })}
  ${L.icon({ name: 'folder', x: x + 122, y: 154, size: 24, color: C[color].main })}
  ${t(x + 195, 173, dir, { mono: true, bold: true, fill: C[color].dark })}
  ${t(x + 180, 214, 'たとえば、次のようなファイル', { size: SIZE.note, fill: SUB })}`
  + files.map((f, k) => '\n  ' + t(x + 180, 240 + 22 * k, f, { mono: true, fill: '#1e293b' })).join('')
  + (extra ? '\n  ' + t(x + 180, 320, extra, { size: SIZE.note, fill: SUB }) : '');
const body = side(20, 'green', 'サーバー側', 'Java', 'backend/', ['App.java', 'api/ProductListApi.java', 'Database.java'])
  + side(520, 'blue', 'ブラウザの中', 'JavaScript', 'frontend/', ['src/main.tsx', 'src/pages/ProductListPage.tsx', 'src/api/products.ts'], '.ts や .tsx は TypeScript。JavaScript とほぼ同じ言語')
  + `
  <g filter="url(#shadow)"><rect x="400" y="90" width="100" height="56" rx="12" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(450, 114, 'API', { size: SIZE.head, bold: true, fill: C.gray.dark })}
  ${t(450, 135, '（窓口）', { size: SIZE.note, fill: SUB })}
  ${L.biArrow({ x1: 388, y1: 170, x2: 512, y2: 170, colorGo: 'gray', colorBack: 'gray' })}
  ${t(450, 206, '第1章で見た、', { size: SIZE.note, fill: SUB })}
  ${t(450, 224, '窓口を通した', { size: SIZE.note, fill: SUB })}
  ${t(450, 242, 'やりとり', { size: SIZE.note, fill: SUB })}`;
const y0 = 350;
L.write('2-4-where-they-run', L.svg({
  y0,
  title: 'Java はサーバー側の backend/ で動き、JavaScript はブラウザの中の frontend/ で動くことを、実際のファイルと一緒に示した図。2つは、API という窓口を通してやりとりする',
  desc: 'サーバー側では Java が動き、backend/ に App.java・api/ProductListApi.java・Database.java などのファイルがある。ブラウザの中では JavaScript が動き、frontend/ に src/main.tsx・src/pages/ProductListPage.tsx・src/api/products.ts などのファイルがある。2つは API（窓口）を通してやりとりする。猫の先生が、Java はサーバー側、JavaScript はブラウザの中で動くと説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['Javaはサーバー側で、JavaScriptは', 'ブラウザの中で動くんだ。'] }),
}));
