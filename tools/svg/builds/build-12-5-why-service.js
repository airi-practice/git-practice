// 12-5-why-service: Controller に全部書いた場合(赤=注意) と、Controller と Service に分けた場合(緑=良い)の比較。
// Controller・Service はどちらもサーバー側なので緑。クラス名のラベルで区別する。
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const red = C.red, green = C.green;
const cardBox = (x, y, w, h, color, fill) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill ?? C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>`;
const bar = (x, y, w, h, color, text, o = {}) => `${cardBox(x, y, w, h, color)}\n  ${t(x + w / 2, y + h / 2 + 5, text, { fill: C[color].dark, ...o })}`;
const body = `
  <rect x="20" y="14" width="420" height="392" rx="16" fill="${red.light}" fill-opacity="0.45" stroke="${red.main}" stroke-width="2"/>
  ${t(230, 46, 'Controller にすべてを書いた場合', { size: SIZE.head, bold: true, fill: red.dark })}
  ${t(230, 70, '受付の部分と、処理の部分が混ざる')}
  ${cardBox(40, 86, 380, 108, 'red', '#ffffff')}
  ${t(230, 110, 'Controller（1つのクラス）', { bold: true, fill: red.dark })}
  <rect x="54" y="122" width="170" height="56" rx="8" fill="${red.light}" stroke="${red.main}" stroke-width="1.5"/>
  ${t(139, 145, 'URL とメソッドの')}
  ${t(139, 165, '対応づけ')}
  <rect x="236" y="122" width="170" height="56" rx="8" fill="${red.light}" stroke="${red.main}" stroke-width="1.5"/>
  ${t(321, 155, '処理や判断')}
${bar(40, 208, 380, 36, 'red', 'どこを直せばいいのか、分からなくなる')}
${bar(40, 252, 380, 36, 'red', '同じ処理を別の API でも使うと、コピーが増える')}
${bar(40, 296, 380, 36, 'red', '処理を直すとき、URL やメソッドまで読み直す')}
  <g filter="url(#shadow)"><rect x="40" y="346" width="380" height="46" rx="10" fill="url(#headRed)"/></g>
  ${t(230, 375, '直す場所が、はっきりしない', { size: SIZE.head, bold: true, fill: '#ffffff' })}
  <rect x="460" y="14" width="420" height="392" rx="16" fill="${green.light}" fill-opacity="0.45" stroke="${green.main}" stroke-width="2"/>
  ${t(670, 46, 'Controller と Service に分けた場合', { size: SIZE.head, bold: true, fill: green.dark })}
  ${t(670, 70, '直したいことごとに、直す場所が決まる')}
  ${cardBox(476, 86, 150, 42, 'gray', '#ffffff')}
  ${t(551, 112, 'URL を変えたい', { fill: C.gray.dark })}
  ${L.arrow({ x1: 630, y1: 107, x2: 668, y2: 107, color: 'gray', width: 4 })}
${bar(672, 86, 194, 42, 'green', 'Controller だけ', { bold: true })}
  ${cardBox(476, 140, 150, 42, 'gray', '#ffffff')}
  ${t(551, 166, '処理を直したい', { fill: C.gray.dark })}
  ${L.arrow({ x1: 630, y1: 161, x2: 668, y2: 161, color: 'gray', width: 4 })}
${bar(672, 140, 194, 42, 'green', 'Service だけ', { bold: true })}
  ${t(670, 214, '同じ処理を、ほかの API でも使い回せる', { bold: true })}
${bar(476, 228, 180, 34, 'green', '商品の Controller')}
${bar(476, 274, 180, 34, 'green', 'ほかの API の Controller')}
  ${L.arrow({ x1: 660, y1: 245, x2: 708, y2: 262, color: 'green', width: 4 })}
  ${L.arrow({ x1: 660, y1: 291, x2: 708, y2: 276, color: 'green', width: 4 })}
${L.card({ x: 712, y: 226, w: 154, h: 96, color: 'green', title: 'Service' })}
  ${t(789, 304, '処理は1か所だけ', { size: SIZE.note, fill: green.dark })}
  <g filter="url(#shadow)"><rect x="480" y="346" width="380" height="46" rx="10" fill="url(#headGreen)"/></g>
  ${t(670, 375, '直す場所が、はっきりする', { size: SIZE.head, bold: true, fill: '#ffffff' })}`;
const y0 = 422;
L.write('12-5-why-service', L.svg({
  y0,
  title: 'Controller にすべての処理を書いた場合と、Controller と Service に分けた場合を並べて比べた図',
  desc: '左は Controller（1つのクラス）に URL とメソッドの対応づけと処理や判断が混ざる場合で、どこを直せばいいのか分からなくなり、同じ処理を別の API でも使うとコピーが増え、処理を直すとき URL やメソッドまで読み直すことになり、直す場所がはっきりしない。右は Controller と Service に分けた場合で、URL を変えたいときは Controller だけ、処理を直したいときは Service だけを直せばよい。商品の Controller もほかの API の Controller も同じ Service を使い、処理は1か所だけになるので、直す場所がはっきりする。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['処理を Service に分けると、', '同じ処理を使い回せて、', '直す場所もはっきりするんだ。'] }),
}));
