// 4-8-get-post: GET（本文なし）と POST（本文に JSON）の比較。リクエストはブラウザが送るので、どちらも青。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const half = (x, title, sub, req, bodyLabel, bodyBox, note1, note2) => `
${L.card({ x, y: 14, w: 420, h: 388, color: 'gray', title, sub })}
${L.card({ x: x + 20, y: 104, w: 380, h: 212, color: 'blue', title: 'リクエスト' })}
  ${t(x + 36, 168, 'メソッドと宛先', { size: SIZE.note, anchor: 'start', fill: SUB })}
${L.box({ x: x + 32, y: 176, w: 356, h: 40, color: 'blue' })}
  ${t(x + 210, 204, req, { size: SIZE.title, bold: true, mono: true, fill: C.blue.dark })}
  ${t(x + 36, 240, bodyLabel, { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${bodyBox}
  <g filter="url(#shadow)"><rect x="${x + 20}" y="332" width="380" height="58" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(x + 210, 357, note1, { fill: C.yellow.dark })}
  ${t(x + 210, 378, note2, { fill: C.yellow.dark })}`;
const body = half(20, 'GET：情報をもらう', 'このシステムの完成済みの API は、GET だけ', 'GET /api/products', '本文',
  `<rect x="52" y="248" width="356" height="56" rx="8" fill="#ffffff" stroke="${C.gray.main}" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${t(230, 282, 'なし（データを送らない）', { fill: SUB })}`,
  '情報を取得するだけだから、', '送るデータは要らない')
  + half(460, 'POST：データを送って、処理してもらう', '第10章で、実際に作る', 'POST /api/reverse', '本文（JSON）',
  `<rect x="492" y="248" width="356" height="56" rx="8" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2"/>
  ${t(670, 284, '{"text":"hello"}', { size: SIZE.title, bold: true, mono: true, fill: C.blue.dark })}`,
  '送りたいデータを、リクエストの本文に', 'JSON で入れて送る');
const y0 = 418;
L.write('4-8-get-post', L.svg({
  y0,
  title: 'GET は本文を送らず、POST は送りたいデータをリクエストの本文に JSON で入れて送ることを並べて比べた図',
  desc: '左は GET。情報をもらう。このシステムの完成済みの API は GET だけ。リクエストは GET /api/products で、本文はなし（データを送らない）。情報を取得するだけだから、送るデータは要らない。右は POST。データを送って、処理してもらう。第10章で実際に作る。リクエストは POST /api/reverse で、本文（JSON）は {"text":"hello"}。送りたいデータを、リクエストの本文に JSON で入れて送る。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['GET と POST の違いは、', 'データを本文に入れて送るかどうかなんだ'] }),
}));
