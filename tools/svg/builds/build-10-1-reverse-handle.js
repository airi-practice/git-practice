// 10-1-reverse-handle: ReverseApi の handle の3つの動きを、コードの行と、そのたびに変わるデータの形と一緒に見せる。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const step = ({ x, n, title, codes, descs, result }) => {
  const y = 118, w = 256, h = 248;
  return `
${L.card({ x, y, w, h, color: 'green', title })}
  <circle cx="${x + 2}" cy="${y + 2}" r="13" fill="${C.green.main}" stroke="#ffffff" stroke-width="2"/>
  ${t(x + 2, y + 7, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}
  ${L.box({ x: x + 10, y: y + 58, w: w - 20, h: 72, color: 'gray' })}
${codes.map((s, k) => '  ' + t(x + w / 2, y + 80 + k * 20, s, { size: SIZE.note, mono: true, fill: C.gray.dark })).join('\n')}
${descs.map((s, k) => '  ' + t(x + w / 2, y + 160 + k * 22, s)).join('\n')}
  ${L.box({ x: x + 10, y: y + 192, w: w - 20, h: 38, color: 'green' })}
  ${t(x + w / 2, y + 216, result, { size: SIZE.note, mono: true, bold: true, fill: C.green.dark })}`;
};
const body = `
  <g filter="url(#shadow)"><rect x="40" y="8" width="262" height="58" rx="12" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2"/></g>
  ${t(171, 30, '届くリクエストの本文（JSON）', { fill: C.blue.dark })}
  ${t(171, 53, '{"text":"hello"}', { mono: true, bold: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 171, y1: 68, x2: 171, y2: 112, color: 'blue' })}
  <rect x="20" y="80" width="860" height="300" rx="16" fill="${C.green.light}" fill-opacity="0.45" stroke="${C.green.main}" stroke-width="2"/>
  ${t(864, 104, 'api/ReverseApi.java の handle（データベースは使わない）', { mono: true, bold: true, anchor: 'end', fill: C.green.dark })}
${step({ x: 36, n: '1', title: '本文を受け取る', codes: ['ctx.bodyAsClass(', 'ReverseRequest.class)'], descs: ['JSON を ReverseRequest に', 'して受け取る'], result: 'text が "hello" のオブジェクト' })}
${step({ x: 322, n: '2', title: '反転する', codes: ['new StringBuilder(', 'request.getText())', '.reverse().toString()'], descs: ['Java の標準の機能で、', '後ろから順に並べ直す'], result: 'reversed が "olleh"' })}
${step({ x: 608, n: '3', title: 'JSON にして返す', codes: ['ctx.json(new ReverseResponse(', 'request.getText(), reversed))'], descs: ['反転前と反転後を', 'ReverseResponse にして返す'], result: 'original と reversed を持つ' })}
  ${L.arrow({ x1: 294, y1: 242, x2: 320, y2: 242, color: 'gray', width: 4 })}
  ${L.arrow({ x1: 580, y1: 242, x2: 606, y2: 242, color: 'gray', width: 4 })}
  ${L.arrow({ x1: 736, y1: 368, x2: 736, y2: 408, color: 'green' })}
  <g filter="url(#shadow)"><rect x="480" y="412" width="400" height="64" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(680, 436, '返るレスポンスの本文（JSON）', { fill: C.green.dark })}
  ${t(680, 462, '{"original":"hello","reversed":"olleh"}', { mono: true, bold: true, fill: C.green.dark })}`;

const y0 = 492;
L.write('10-1-reverse-handle', L.svg({
  y0,
  title: 'ReverseApi の handle の3つの動きを、コードの行と、そのたびに変わるデータの形と一緒に示した図',
  desc: '届くリクエストの本文 {"text":"hello"} を、handle が3つの動きで処理する。1 本文を受け取る（text が "hello" のオブジェクトになる）、2 反転する（reversed が "olleh"）、3 JSON にして返す（original と reversed を持つ）。返るレスポンスの本文は {"original":"hello","reversed":"olleh"}。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['handle は3つの動きだよ。', 'リクエストを受け取って、文字を反転して、', 'JSON にして返すんだ。'] }),
}));
