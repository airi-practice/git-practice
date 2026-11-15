// html-css-javascript: HTML・CSS・JavaScript の役割の違い。
// 3つの枠は役割のない並列の項目なので p1・p2・p3 で区別し、番号と見出しも付ける。ボタンはブラウザの画面の部品なので青
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const X = [20, 325, 630], Y = 24, W = 250, H = 240;
const panel = (i, k, title, inner, lines) => {
  const x = X[i], cx = x + W / 2;
  return `
${L.card({ x, y: Y, w: W, h: H, color: k, title })}
  <circle cx="${x + 24}" cy="${Y + 23}" r="12" fill="#ffffff"/>
  ${t(x + 24, Y + 28, String(i + 1), { size: SIZE.note, bold: true, fill: C[k].main })}
  ${inner(cx)}
${lines.map(([s, yy, o]) => '  ' + t(cx, Y + yy, s, o)).join('\n')}`;
};
const arrow = (i) => L.arrow({ x1: X[i] + W + 6, y1: 140, x2: X[i + 1] - 6, y2: 140, color: 'gray', width: 5 });
const body = `
${panel(0, 'p1', 'HTML だけ', (cx) => `<rect x="${cx - 60}" y="${Y + 66}" width="120" height="44" fill="#e5e7eb" stroke="#6b7280" stroke-width="1.5"/>
  ${t(cx, Y + 94, '購入', { size: SIZE.head, fill: '#000000' })}`,
  [['ボタンがあるだけ', 156], ['見た目は素っ気なく、', 182], ['押しても何も起きない', 208]])}
  ${arrow(0)}
${panel(1, 'p2', 'CSS を足す', (cx) => `<g filter="url(#shadow)"><rect x="${cx - 65}" y="${Y + 66}" width="130" height="44" rx="22" fill="url(#headBlue)"/></g>
  ${t(cx, Y + 94, '購入', { size: SIZE.head, bold: true, fill: '#ffffff' })}`,
  [['色や形が整う', 156], ['見た目は良くなったが、', 182], ['押しても何も起きない', 208]])}
  ${arrow(1)}
${panel(2, 'p3', 'JavaScript を足す', (cx) => `<g filter="url(#shadow)"><rect x="${cx - 65}" y="${Y + 60}" width="130" height="44" rx="22" fill="url(#headBlue)"/></g>
  ${t(cx, Y + 88, '購入', { size: SIZE.head, bold: true, fill: '#ffffff' })}
  ${L.icon({ name: 'check-circle', x: cx - 70, y: Y + 112, size: 24, color: C.blue.main })}
  ${t(cx + 8, Y + 130, '購入しました', { bold: true, fill: C.blue.dark })}`,
  [['押したときの動きが付く', 182], ['画面の文字が変わる', 208]])}`;
const y0 = 280;
L.write('html-css-javascript', L.svg({
  y0,
  title: 'HTML・CSS・JavaScript の役割の違い',
  desc: '購入ボタンを例に、HTML だけでは、ボタンがあるだけで見た目は素っ気なく、押しても何も起きない。CSS を足すと、色や形が整って見た目は良くなるが、押しても何も起きない。JavaScript を足すと、押したときの動きが付き、画面の文字が「購入しました」に変わる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['HTMLは中身、CSSは見た目、', 'JavaScriptは動きを受け持つんだ。'] }),
}));
