// 10-1-curl-parts: curl の1行を、部分ごとに分けて、それぞれの意味と結びつける。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const rows = [
  ['gray', '1', 'curl', ['コマンドから、HTTP のリクエストを送る道具']],
  ['p1', '2', '-X POST', ['HTTP メソッドを POST にする']],
  ['p2', '3', 'http://localhost:8080/api/reverse', ['宛先。バックエンド（8080 番）に、直接送る']],
  ['p3', '4', '-H "Content-Type: application/json"', ['本文が JSON であることを伝えるヘッダー。', 'JSON を送るときは、付けるのが決まり']],
  ['p4', '5', `-d '{"text":"hello"}'`, ['リクエストの本文']],
];
const row = ([color, n, code, desc], i) => {
  const c = C[color], y = 56 + i * 66, h = 56;
  const fill = color === 'gray' ? 'headGray' : c.head;
  return `
  <g filter="url(#shadow)"><rect x="20" y="${y}" width="400" height="${h}" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  <circle cx="46" cy="${y + 28}" r="12" fill="${c.main}"/>
  ${t(46, y + 33, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}
  ${t(240, y + 34, code, { mono: true, bold: true, fill: c.dark })}
  ${L.arrow({ x1: 426, y1: y + 28, x2: 456, y2: y + 28, color: 'gray', width: 3 })}
  <g filter="url(#shadow)"><rect x="462" y="${y}" width="418" height="${h}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
${desc.length === 1 ? '  ' + t(671, y + 34, desc[0]) : '  ' + t(671, y + 24, desc[0]) + '\n  ' + t(671, y + 44, desc[1], { size: SIZE.note, fill: SUB })}`;
};
const body = `
  ${t(450, 32, '1行のコマンドを、部分ごとに読む（実際は、上から順に、1行で続けて書く）', { size: SIZE.title, bold: true })}
${rows.map(row).join('')}
  ${L.arrow({ x1: 450, y1: 384, x2: 450, y2: 414, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="20" y="418" width="860" height="64" rx="14" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(40, 456, '成功すると、次の JSON が返ってくる', { bold: true, anchor: 'start', fill: C.green.dark })}
  ${t(640, 458, '{"original":"hello","reversed":"olleh"}', { size: SIZE.head, bold: true, mono: true, fill: C.green.dark })}`;

const y0 = 498;
L.write('10-1-curl-parts', L.svg({
  y0,
  title: 'curl で API を呼ぶ1行のコマンドを、部分ごとに分けて、それぞれの意味と結びつけた図',
  desc: 'curl はコマンドから HTTP のリクエストを送る道具。-X POST はメソッドを POST にする。http://localhost:8080/api/reverse は宛先でバックエンド（8080 番）に直接送る。-H "Content-Type: application/json" は本文が JSON であることを伝えるヘッダー。-d は本文で、{"text":"hello"} を送る。成功すると {"original":"hello","reversed":"olleh"} が返ってくる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['curl の1行は、宛先・ヘッダー・本文に', '分けて読むと分かりやすいよ。', '成功すると JSON が返ってくるんだ。'] }),
}));
