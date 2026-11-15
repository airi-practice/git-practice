// 8-5-one-place: 接続情報を API ごとにばらばらに書いた場合と、Database.java の1か所にまとめた場合を並べて比べる。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const G = C.green, R = C.red;
const shadowBox = (x, y, w, h, color, fill) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill ?? C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>`;
const row = (y, name, sub, st, bad, mono) => `
  ${shadowBox(36, y, 250, 62, 'green')}
  ${t(161, y + 26, name, { bold: true, mono, fill: G.dark })}
  ${t(161, y + 48, sub, { size: SIZE.note, fill: G.dark })}
  <rect x="302" y="${y + 13}" width="114" height="36" rx="18" fill="${bad ? R.light : '#ffffff'}" stroke="${bad ? R.main : C.gray.main}" stroke-width="2"/>
  ${t(359, y + 37, st, { bold: true, fill: bad ? R.dark : C.gray.dark })}`;
const left = `
${L.card({ x: 20, y: 15, w: 420, h: 415, color: 'red', title: '接続情報を、API ごとにばらばらに書いた場合', sub: 'パスワードを変えるとき、すべてのファイルを探して直す' })}
${row(110, 'ProductListApi.java', '接続先とパスワードを書いている', '直した', false, true)}
${row(180, 'ほかの API のファイル', '接続先とパスワードを書いている', '直した', false, false)}
${row(250, 'ほかの API のファイル', '接続先とパスワードを書いている', '直し忘れ', true, false)}
  ${L.arrow({ x1: 230, y1: 318, x2: 230, y2: 350, color: 'red', width: 5 })}
  ${shadowBox(36, 356, 388, 68, 'red')}
  ${L.icon({ name: 'alert-circle', x: 48, y: 378, size: 24, color: R.main })}
  ${t(250, 383, '1か所でも直し忘れると、', { size: SIZE.head, bold: true, fill: R.dark })}
  ${t(250, 409, 'その API だけ動かなくなる', { size: SIZE.head, bold: true, fill: R.dark })}`;
const api = (x, name, mono) => `
  ${shadowBox(x, 258, 130, 78, 'green')}
  ${t(x + 65, 282, name, { bold: true, mono, fill: G.dark })}
  ${t(x + 65, 304, 'connect() を', { fill: G.dark })}
  ${t(x + 65, 324, '呼ぶだけ', { fill: G.dark })}`;
const right = `
${L.card({ x: 460, y: 15, w: 420, h: 415, color: 'green', title: '接続情報を、Database.java にまとめた場合', sub: 'パスワードを変えるとき、直すのは1か所だけ' })}
${L.card({ x: 500, y: 106, w: 340, h: 112, color: 'orange', title: '' })}
  ${t(670, 137, 'Database.java', { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' })}
  ${L.icon({ name: 'lock', x: 524, y: 118, size: 24, color: '#ffffff' })}
  ${t(670, 178, 'URL / USER / PASSWORD', { mono: true, bold: true, fill: C.orange.dark })}
  ${t(670, 202, '接続情報は、ここだけに書く', { fill: C.orange.dark })}
  ${L.arrow({ x1: 535, y1: 254, x2: 565, y2: 222, color: 'green', width: 4 })}
  ${L.arrow({ x1: 670, y1: 254, x2: 670, y2: 222, color: 'green', width: 4 })}
  ${L.arrow({ x1: 805, y1: 254, x2: 775, y2: 222, color: 'green', width: 4 })}
${api(470, 'ProductListApi', true)}${api(605, 'ほかの API', false)}${api(740, 'ほかの API', false)}
  ${shadowBox(476, 356, 388, 68, 'green')}
  ${L.icon({ name: 'check-circle', x: 488, y: 369, size: 24, color: G.main })}
  ${t(690, 383, '直すのは、', { size: SIZE.head, bold: true, fill: G.dark })}
  ${t(690, 409, 'Database.java の1か所だけ', { size: SIZE.head, bold: true, fill: G.dark })}`;
const y0 = 446;
L.write('8-5-one-place', L.svg({
  y0,
  title: '接続情報を API のファイルごとにばらばらに書いた場合は直し漏れが出るが、Database.java の1か所にまとめた場合は直すのが1か所で済むことを並べて比べた図',
  desc: '左は接続情報を API ごとにばらばらに書いた場合。ProductListApi.java とほかの API のファイルがそれぞれ接続先とパスワードを書いていて、パスワードを変えるときはすべてを直す。1か所でも直し忘れると、その API だけ動かなくなる。右は Database.java にまとめた場合。URL、USER、PASSWORD は Database.java だけに書き、各 API は connect() を呼ぶだけなので、直すのは Database.java の1か所だけ。',
  body: left + right,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['接続情報がばらばらだと、直し漏れが出るよ。', 'Database.java の1か所にまとめれば、', '直すのも1か所で済むんだ。'] }),
}));
