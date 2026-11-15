// 4-1-api-window: 同じ Java プログラムの中の直接呼び出しと、別々のプログラムが API を通して話す様子
const L = require('../rich-lib');
const { C, t, SIZE, SUB, esc } = L;
const MONO = `font-family="Consolas,'Courier New',monospace"`;
const mx = (x, y, str, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size ?? 15}"${o.bold ? ' font-weight="bold"' : ''} fill="${o.fill ?? L.TEXT}" text-anchor="${o.anchor ?? 'middle'}">${str.split('`').map((s, i) => i % 2 ? `<tspan ${MONO}>${esc(s)}</tspan>` : esc(s)).join('')}</text>`;
const panel = (y, h, color, title) => `
  <rect x="20" y="${y}" width="860" height="${h}" rx="16" fill="${C[color].light}" fill-opacity="0.5" stroke="${C[color].main}" stroke-width="2"/>
  ${t(40, y + 28, title, { bold: true, anchor: 'start', fill: C[color].dark })}`;
const node = ({ x, y, w, h, color, title, lines, sw = 2 }) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#ffffff" stroke="${C[color].main}" stroke-width="${sw}"/></g>
  <path d="M${x} ${y + 40} v-24 a14 14 0 0 1 14 -14 h${w - 28} a14 14 0 0 1 14 14 v24 z" fill="url(#${C[color].head})"/>
  ${t(x + w / 2, y + 28, title, { size: SIZE.head, bold: true, fill: C[color].headText ?? '#ffffff' })}
${lines.map((s, k) => '  ' + mx(x + w / 2, y + 64 + k * 20, s, { size: SIZE.note, fill: C[color].dark })).join('\n')}`;
const body = `
${panel(15, 150, 'green', '同じ Java プログラムの中：メソッドを、そのまま呼び出せる')}
${node({ x: 60, y: 54, w: 250, h: 96, color: 'green', title: 'ProductListApi', lines: ['商品を取り出したい'] })}
${node({ x: 590, y: 54, w: 250, h: 96, color: 'green', title: 'Database', lines: ['`connect()` メソッドがある'] })}
  ${mx(450, 90, '`Database.connect()` と呼ぶだけ', { bold: true, fill: C.green.dark })}
  ${L.arrow({ x1: 314, y1: 104, x2: 586, y2: 104, color: 'green', width: 5 })}
${panel(185, 300, 'blue', '別々のプログラム：窓口（API）を通して、お願いして、結果を受け取る')}
${node({ x: 40, y: 225, w: 220, h: 120, color: 'blue', title: 'フロントエンド', lines: ['ブラウザの中の', '`TypeScript`'] })}
${node({ x: 320, y: 225, w: 260, h: 120, color: 'yellow', title: 'API（窓口）', lines: [], sw: 3 })}
  ${t(450, 290, 'GET /api/products', { size: SIZE.title, bold: true, mono: true, fill: C.yellow.dark })}
  ${t(450, 313, 'このURLに、この形で送ると、', { size: SIZE.note, fill: C.yellow.dark })}
  ${t(450, 331, 'この形で返す、という約束', { size: SIZE.note, fill: C.yellow.dark })}
${node({ x: 640, y: 225, w: 220, h: 120, color: 'green', title: 'バックエンド', lines: ['サーバーの Java', '`ProductListApi.handle()`'] })}
  ${L.biArrow({ x1: 262, y1: 290, x2: 318, y2: 290, colorGo: 'blue', colorBack: 'green', width: 4, gap: 16 })}
  ${L.biArrow({ x1: 582, y1: 290, x2: 638, y2: 290, colorGo: 'blue', colorBack: 'green', width: 4, gap: 16 })}
${L.pill({ cx: 150, y: 358, w: 200, label: 'リクエストを送る', n: '1', color: 'blue' })}
${L.pill({ cx: 750, y: 358, w: 180, label: '処理して、返す', n: '2', color: 'green' })}
${L.pill({ cx: 450, y: 358, w: 370, label: 'レスポンス（商品の一覧）が、窓口を通って戻る', n: '3', color: 'green' })}
  <path d="M150,396 L150,428 L750,428 L750,396" fill="none" stroke="${C.red.main}" stroke-width="3" stroke-dasharray="8,6" stroke-linecap="round"/>
  <circle cx="450" cy="428" r="16" fill="${C.red.main}"/>
  ${L.icon({ name: 'x', x: 440, y: 418, size: 20, color: '#ffffff', width: 3 })}
  ${mx(450, 464, '動く場所も違うので、`Database.connect()` のようには、直接呼び出せない', { bold: true, fill: C.red.dark })}`;
const y0 = 501;
L.write('4-1-api-window', L.svg({
  y0,
  title: '同じ Java プログラムの中ではメソッドを直接呼べるが、別々のプログラムであるフロントエンドとバックエンドは、API という窓口を通して話す図',
  desc: '同じ Java プログラムの中では、ProductListApi が Database.connect() と呼ぶだけでメソッドを呼び出せる。別々のプログラムであるフロントエンド（ブラウザの中の TypeScript）とバックエンド（サーバーの Java の ProductListApi.handle()）は、API（窓口）GET /api/products を通して話す。1 リクエストを送る、2 処理して返す、3 レスポンス（商品の一覧）が窓口を通って戻る。動く場所が違うので、Database.connect() のように直接呼び出すことはできない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['別々のプログラムだから、メソッドは直接呼べない。', 'だから API という窓口を通して話すんだ'] }),
}));
