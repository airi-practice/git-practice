// 3-6-why-class: JSON の文字列を自分で組み立てる場合と、クラスにして ctx.json に任せる場合を並べて比べる
const L = require('../rich-lib');
const { C, t, SIZE, SUB, esc } = L;
const MONO = `font-family="Consolas,'Courier New',monospace"`;
// 文中の `...` で囲んだ部分だけを等幅にする（コードは等幅にそろえるため）
const mx = (x, y, str, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size ?? 15}"${o.bold ? ' font-weight="bold"' : ''} fill="${o.fill ?? L.TEXT}" text-anchor="${o.anchor ?? 'middle'}">${str.split('`').map((s, i) => i % 2 ? `<tspan ${MONO}>${esc(s)}</tspan>` : esc(s)).join('')}</text>`;
const white = (x, y, w, h, color) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>`;
const bad = (y, str) => `
  <rect x="40" y="${y}" width="380" height="34" rx="10" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="1.5"/>
  ${L.icon({ name: 'x', x: 52, y: y + 9, size: 16, color: C.red.main, width: 3 })}
  ${t(80, y + 22, str, { size: SIZE.note, anchor: 'start', fill: C.red.dark })}`;
const left = `
${L.card({ x: 20, y: 15, w: 420, h: 445, color: 'red', title: 'JSON の文字列を、自分で組み立てる' })}
  ${t(230, 84, '白紙に自由に書いて申し込むのと同じ。', { fill: SUB })}
  ${t(230, 105, '書く場所や内容が、ばらばらになる', { fill: SUB })}
  ${white(40, 122, 380, 52, 'red')}
  ${t(230, 153, '"{\\"id\\":" + id + ",\\"name\\":\\"" + name + ...', { size: SIZE.note, mono: true })}
  ${t(230, 194, '仕組みを説明するための例。このシステムにはない書き方', { size: SIZE.note, fill: SUB })}
${bad(212, '引用符 " を1つ書き忘れる')}
${bad(254, 'カンマを付け忘れる')}
${bad(296, '数値を引用符で囲むかどうかを、自分で気をつける')}
  ${L.arrow({ x1: 230, y1: 334, x2: 230, y2: 372, color: 'red', width: 4 })}
  <g filter="url(#shadow)"><rect x="40" y="378" width="380" height="62" rx="10" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${t(230, 404, '1か所でも間違えると、フロントエンドが', { bold: true, fill: C.red.dark })}
  ${t(230, 425, '読めない JSON になり、画面に値が出ない', { bold: true, fill: C.red.dark })}`;
const right = `
${L.card({ x: 460, y: 15, w: 420, h: 445, color: 'green', title: 'クラスにして、ctx.json(...) に任せる' })}
  ${t(670, 84, '欄が印刷された申込用紙と同じ。', { fill: SUB })}
  ${t(670, 105, '書く人も、受け取る人も、間違えにくい', { fill: SUB })}
  ${white(480, 122, 380, 98, 'green')}
  ${t(670, 150, 'ProductResponse', { size: SIZE.head, bold: true, mono: true, fill: C.green.dark })}
  ${mx(670, 176, '`id / name / price / stock`（フィールドと `getter`）', { size: SIZE.note, fill: L.TEXT })}
  ${mx(670, 202, '数値は `long` や `int` のまま持てる', { size: SIZE.note, fill: L.SUB })}
  ${L.arrow({ x1: 670, y1: 220, x2: 670, y2: 296, color: 'green', width: 4 })}
${L.pill({ cx: 670, y: 243, w: 330, label: 'ctx.json(...) が JSON に変換する', color: 'green' })}
  ${white(480, 300, 380, 50, 'green')}
  ${t(670, 331, '{"id":1,"name":"ボールペン",...}', { mono: true })}
  ${L.arrow({ x1: 670, y1: 350, x2: 670, y2: 372, color: 'green', width: 4 })}
  <g filter="url(#shadow)"><rect x="480" y="378" width="380" height="62" rx="10" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(670, 404, '引用符やカンマは、自動で正しく付く。', { bold: true, fill: C.green.dark })}
  ${t(670, 425, 'Java では、ふつうのフィールドと getter で扱える', { bold: true, fill: C.green.dark })}`;
const y0 = 476;
L.write('3-6-why-class', L.svg({
  y0,
  title: 'JSON の文字列を自分で組み立てる場合と、クラスにして ctx.json に任せる場合を並べて比べた図',
  desc: '左は JSON の文字列を自分で組み立てる場合。引用符やカンマの書き忘れ、数値を引用符で囲むかどうかの気配りが必要で、1か所でも間違えるとフロントエンドが読めない JSON になる。右はクラス（ProductResponse）にして ctx.json(...) に任せる場合。ctx.json が JSON に変換するので、引用符やカンマは自動で正しく付き、Java ではふつうのフィールドと getter で扱える。',
  body: left + right,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['JSON を自分で組み立てるより、', 'クラスにして任せるほうがラクなんだよ'] }),
}));
