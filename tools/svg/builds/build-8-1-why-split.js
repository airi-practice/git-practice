// 8-1-why-split: main メソッド1つに全部書く場合と、役割ごとにクラスを分けた場合を並べて比べる。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const mono = { bold: true, mono: true };
const want = (x, cy, label) => L.box({ x, y: cy - 22, w: 176, h: 44, color: 'gray' }) + '\n  ' + t(x + 88, cy + 5, label, { fill: C.gray.dark });
const wants = [[134, 'パスワードを変えたい'], [206, 'SQL を直したい'], [278, 'URL を足したい']];
const inner = (cy, lines) => L.box({ x: 262, y: cy - 26, w: 146, h: 52, color: 'red' }).replace('fill="#ffebee"', 'fill="#ffffff"')
  + '\n  ' + lines.map((s, k) => t(335, cy + (lines.length === 1 ? 5 : -2 + k * 20), s, { fill: C.red.dark })).join('\n  ');
const left = `
${L.card({ x: 20, y: 15, w: 420, h: 415, color: 'red', title: 'main メソッド1つに、すべて書いた場合', sub: '3つのことが、1つのクラスに混ざる' })}
  ${wants.map(([cy, s]) => want(36, cy, s)).join('\n  ')}
  ${wants.map(([cy]) => L.arrow({ x1: 214, y1: cy, x2: 246, y2: cy, color: 'red', width: 4 })).join('\n  ')}
  <g filter="url(#shadow)"><rect x="252" y="106" width="172" height="212" rx="12" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${t(338, 128, 'main メソッド 1つ', { bold: true, fill: C.red.dark })}
  ${inner(166, ['データベースの', 'つなぎ方'])}
  ${inner(224, ['商品を取り出す', 'SQL'])}
  ${inner(282, ['URL と処理の', '対応づけ'])}
  <g filter="url(#shadow)"><rect x="36" y="338" width="388" height="76" rx="12" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${L.icon({ name: 'alert-circle', x: 46, y: 364, size: 24, color: C.red.main })}
  ${t(240, 370, 'どれをするときも、', { size: SIZE.head, bold: true, fill: C.red.dark })}
  ${t(240, 396, '同じ長いファイルを読み直すことになる', { size: SIZE.head, bold: true, fill: C.red.dark })}`;
const file = (cy, color, name, sub) => `
  <g filter="url(#shadow)"><rect x="680" y="${cy - 30}" width="190" height="60" rx="10" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${t(775, cy - 4, name, { ...mono, fill: C[color].dark })}
  ${t(775, cy + 20, sub, { size: SIZE.note, fill: C[color].dark })}`;
const right = `
${L.card({ x: 460, y: 15, w: 420, h: 415, color: 'green', title: '役割ごとにクラスを分けた場合', sub: '直したいことごとに、開くファイルが決まる' })}
  ${wants.map(([cy, s]) => want(476, cy, s)).join('\n  ')}
  ${wants.map(([cy]) => L.arrow({ x1: 656, y1: cy, x2: 676, y2: cy, color: 'gray', width: 4 })).join('\n  ')}
  ${file(134, 'orange', 'Database.java', '接続先やパスワード')}
  ${file(206, 'green', 'ProductListApi.java', 'その API の処理')}
  ${file(278, 'green', 'App.java', 'URL と起動時の準備')}
  <g filter="url(#shadow)"><rect x="476" y="338" width="388" height="76" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${L.icon({ name: 'check-circle', x: 502, y: 364, size: 24, color: C.green.main })}
  ${t(690, 383, '直す場所が、すぐ決まる', { size: SIZE.head, bold: true, fill: C.green.dark })}`;
const y0 = 446;
L.write('8-1-why-split', L.svg({
  y0,
  title: 'すべてを main メソッド1つに書いた場合は、どれを直すときも同じ長いファイルを読み直す。役割ごとにクラスを分けた場合は、直す場所が決まる、ことを並べて比べた図',
  desc: '左は main メソッド1つにすべて書いた場合。パスワードを変えたい、SQL を直したい、URL を足したいのどれも同じ main メソッドを直すことになり、同じ長いファイルを読み直す。右は役割ごとにクラスを分けた場合。パスワードは Database.java、SQL は ProductListApi.java、URL は App.java と、直す場所がすぐ決まる。',
  body: left + right,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['全部を1つに書くと、どこを直すにも', '長いファイルを読み直すことになるんだ。', '役割ごとに分けると、直す場所がすぐ決まるよ。'] }),
}));
