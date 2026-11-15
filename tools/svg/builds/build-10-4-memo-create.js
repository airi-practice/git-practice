// 10-4-memo-create: MemoCreateApi の handle の4つの動きを、コードの行と、データベースとのやりとりと一緒に見せる。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const step = ({ x, n, color, title, codes, descs, result }) => {
  const y = 118, w = 196, h = 318, c = C[color];
  return `
${L.card({ x, y, w, h, color, title })}
  <circle cx="${x + 2}" cy="${y + 2}" r="13" fill="${c.main}" stroke="#ffffff" stroke-width="2"/>
  ${t(x + 2, y + 7, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}
  ${L.box({ x: x + 10, y: y + 58, w: w - 20, h: 90, color: 'gray' })}
${codes.map((s, k) => '  ' + t(x + w / 2, y + 80 + k * 20, s, { size: SIZE.note, mono: true, bold: s === 'RETURNING id', fill: s === 'RETURNING id' ? C.orange.dark : C.gray.dark })).join('\n')}
${descs.map((s, k) => '  ' + t(x + w / 2, y + 174 + k * 22, s)).join('\n')}
  ${L.box({ x: x + 10, y: y + 262, w: w - 20, h: 44, color })}
${result.map((s, k) => '  ' + t(x + w / 2, y + (result.length === 1 ? 289 : 280 + k * 18), s, { size: SIZE.note, mono: true, bold: true, fill: c.dark })).join('\n')}`;
};
const body = `
  <g filter="url(#shadow)"><rect x="25" y="8" width="196" height="58" rx="12" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2"/></g>
  ${t(123, 30, '届くリクエストの本文', { fill: C.blue.dark })}
  ${t(123, 53, '{"content":"..."}', { mono: true, bold: true, fill: C.blue.dark })}
  ${L.arrow({ x1: 123, y1: 68, x2: 123, y2: 112, color: 'blue' })}
  <rect x="10" y="80" width="880" height="372" rx="16" fill="${C.green.light}" fill-opacity="0.45" stroke="${C.green.main}" stroke-width="2"/>
  ${t(874, 104, 'api/MemoCreateApi.java の handle', { mono: true, bold: true, anchor: 'end', fill: C.green.dark })}
${step({ x: 25, n: '1', color: 'green', title: '本文を受け取る', codes: ['ctx.bodyAsClass(', 'MemoRequest.class)'], descs: ['JSON を MemoRequest に', 'して受け取る'], result: ['content を持つ', 'オブジェクト'] })}
${step({ x: 243, n: '2', color: 'orange', title: 'データベースに登録', codes: ['INSERT INTO memos', '(content, created_at)', 'VALUES (?, ...)', 'RETURNING id'], descs: ['? に content を', '入れて実行し、', '付いた id を', 'その場で受け取る'], result: ['id を取り出す'] })}
${step({ x: 461, n: '3', color: 'green', title: '返す値を作る', codes: ['new MemoResponse(', 'rs.getLong("id"), ...)'], descs: ['受け取った id と', 'content で', 'MemoResponse を作る'], result: ['id と content を持つ'] })}
${step({ x: 679, n: '4', color: 'green', title: 'JSON にして返す', codes: ['ctx.json(memo);'], descs: ['MemoResponse の getter が', 'JSON の項目名になる'], result: ['id と content の JSON'] })}
  ${L.arrow({ x1: 223, y1: 274, x2: 241, y2: 274, color: 'gray', width: 3 })}
  ${L.arrow({ x1: 441, y1: 274, x2: 459, y2: 274, color: 'gray', width: 3 })}
  ${L.arrow({ x1: 659, y1: 274, x2: 677, y2: 274, color: 'gray', width: 3 })}
  ${L.biArrow({ x1: 341, y1: 438, x2: 341, y2: 486, colorGo: 'green', colorBack: 'orange', width: 4, gap: 14 })}
  ${t(326, 470, '登録する', { size: SIZE.note, bold: true, anchor: 'end', fill: C.green.dark })}
  ${t(356, 470, 'id を返す', { size: SIZE.note, bold: true, anchor: 'start', fill: C.orange.dark })}
  <g filter="url(#shadow)"><rect x="243" y="490" width="196" height="50" rx="12" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/></g>
  ${t(341, 522, 'memos テーブル', { size: SIZE.head, bold: true, fill: C.orange.dark })}
  ${L.arrow({ x1: 777, y1: 438, x2: 777, y2: 486, color: 'green' })}
  <g filter="url(#shadow)"><rect x="650" y="490" width="240" height="64" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(770, 514, '返すレスポンスの本文', { fill: C.green.dark })}
  ${t(770, 540, '{"id":1,"content":"..."}', { mono: true, bold: true, fill: C.green.dark })}`;

const y0 = 570;
L.write('10-4-memo-create', L.svg({
  y0,
  title: 'MemoCreateApi の handle の4つの動きを、コードの行と、データベースとのやりとりと一緒に示した図',
  desc: '届くリクエストの本文 {"content":"..."} を、handle が4つの動きで処理する。1 本文を受け取る、2 データベースに登録（INSERT INTO memos ... RETURNING id で、付いた id をその場で受け取る。memos テーブルに登録し、id が返る）、3 返す値を作る（MemoResponse）、4 JSON にして返す。返すレスポンスの本文は {"id":1,"content":"..."}。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['MemoCreateApi の handle も、4つの動きだよ。', 'データベースに登録して、返ってきた id を', 'JSON にして返すんだ。'] }),
}));
