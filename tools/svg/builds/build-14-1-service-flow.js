// 14-1-service-flow: Service の3つの動き。カードの組み立ては controller-flow と同じ部品を使う
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const { step, frame } = require('./build-14-1-controller-flow');
const y = 138, h = 214;
const steps = [
  { title: 'null を避ける', code: [['String target ='], ['(text == null) ? "" : text;']],
    desc: ['text が null なら、', '空の文字列にする'], result: ['target が "hello"'], resultMono: true },
  { title: '反転する', code: [['new StringBuilder(target)'], ['.reverse().toString()']],
    desc: ['Java の標準の機能で、', '文字列を反転する'], result: ['reversed が "olleh"'], resultMono: true },
  { title: 'DTO に入れて返す', code: [['return new ReverseResponse('], ['target, reversed);']],
    desc: ['反転前と反転後を、', 'DTO に入れて返す'], result: ['original と reversed を持つ'] },
];
const ny = y + h + 36;
const body = `
  <g filter="url(#shadow)"><rect x="31" y="14" width="300" height="64" rx="12" fill="#ffffff" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(181, 38, 'Controller から渡される文字列 text', { fill: C.green.dark })}
  ${t(181, 64, '"hello"', { size: SIZE.head, bold: true, mono: true, fill: C.green.dark })}
${frame('service/ReverseService.java の reverse', y, y + h)}
  ${L.arrow({ x1: 162, y1: 80, x2: 162, y2: 132, color: 'green' })}
${steps.map((s, i) => step(i, y, h, s)).join('\n')}
  <g filter="url(#shadow)"><rect x="31" y="${ny}" width="838" height="76" rx="14" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(50, ny + 31, 'ProductService', { anchor: 'start', bold: true, mono: true, fill: C.yellow.dark })}
  ${t(172, ny + 31, '：ProductRepository を受け取るコンストラクタがある（データベースを使うため）', { anchor: 'start' })}
  ${t(50, ny + 59, 'ReverseService', { anchor: 'start', bold: true, mono: true, fill: C.yellow.dark })}
  ${t(172, ny + 59, '：何にも頼らず、自分だけで処理を終えるので、コンストラクタは要らない', { anchor: 'start' })}`;
const y0 = ny + 76 + 16;
L.write('14-1-service-flow', L.svg({
  y0,
  title: 'ReverseService の reverse メソッドの3つの動きを、コードの行と一緒に示した図。Repository を受け取らないので、コンストラクタがないことも添えている',
  desc: 'Controller から渡される文字列 "hello" を、ReverseService の reverse が3つの動きで処理する。1 null を避ける：text が null なら空の文字列にする。2 反転する：Java の標準の機能で文字列を反転し、reversed が "olleh" になる。3 DTO に入れて返す：反転前と反転後を ReverseResponse に入れて返す。ProductService は ProductRepository を受け取るコンストラクタがあるが、ReverseService は何にも頼らないのでコンストラクタは要らない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['Service は、受け取った文字列を', '処理して結果を返す役割なんだ。', '1つずつ手順を見ていこう。'] }),
}));
