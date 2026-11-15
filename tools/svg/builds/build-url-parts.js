// url-parts: URL を4つの部分に分ける。各部分は役割がないので p1〜p4。下段の2つのプログラムは、フロントエンド=青、バックエンド=緑。
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const parts = [
  { c: 'p1', x: 25, w: 170, code: 'http://', title: '通信の約束事', l: ['HTTP という名前。', '第4章で説明する'] },
  { c: 'p2', x: 205, w: 210, code: 'localhost', title: 'ホスト名', l: ['通信する相手の', 'コンピューターの名前'] },
  { c: 'p3', x: 425, w: 150, code: ':5173', title: 'ポート番号', l: ['相手の中の、', 'どのプログラムか'] },
  { c: 'p4', x: 585, w: 290, code: '/api/products', title: 'パス', l: ['相手の中の、どの情報がほしいか。', '/ で区切って書く'] },
];
const body = parts.map((p) => {
  const cx = p.x + p.w / 2, c = C[p.c];
  return `
  <g filter="url(#shadow)"><rect x="${p.x}" y="20" width="${p.w}" height="60" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  ${t(cx, 60, p.code, { size: SIZE.hero, bold: true, mono: true, fill: c.dark })}
  <line x1="${cx}" y1="80" x2="${cx}" y2="104" stroke="${c.main}" stroke-width="3"/>
${L.card({ x: p.x, y: 104, w: p.w, h: 112, color: p.c, title: p.title })}
  ${t(cx, 176, p.l[0], { fill: TEXT })}
  ${t(cx, 198, p.l[1], { fill: TEXT })}`;
}).join('\n') + `
  <line x1="500" y1="216" x2="500" y2="250" stroke="${C.p3.main}" stroke-width="3" stroke-dasharray="6,5"/>
  <rect x="20" y="250" width="860" height="160" rx="16" fill="${C.gray.light}" fill-opacity="0.6" stroke="${C.gray.main}" stroke-width="2"/>
  ${t(450, 281, 'localhost（自分のパソコン）の中では、2つのプログラムが、ポート番号で区別されて動いている', { size: SIZE.body, bold: true })}
${L.card({ x: 50, y: 300, w: 380, h: 94, color: 'blue', title: '5173 番', sub: '画面を配信するプログラム（Vite）' })}
${L.card({ x: 470, y: 300, w: 380, h: 94, color: 'green', title: '8080 番', sub: 'バックエンド（Java）' })}`;
const y0 = 426;
L.write('url-parts', L.svg({
  y0,
  title: 'URL を4つの部分に分けた図と、ポート番号で区別される2つのプログラム',
  desc: 'URL http://localhost:5173/api/products は4つの部分に分けられる。http:// は通信の約束事（HTTP という名前。第4章で説明する）、localhost はホスト名（通信する相手のコンピューターの名前）、:5173 はポート番号（相手の中の、どのプログラムか）、/api/products はパス（相手の中の、どの情報がほしいか。/ で区切って書く）。localhost（自分のパソコン）の中では、5173 番の画面を配信するプログラム（Vite）と、8080 番のバックエンド（Java）の2つが、ポート番号で区別されて動いている。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['URL は4つに分けられるよ。', 'ポート番号で、どのプログラムか区別するんだ'] }),
}));
