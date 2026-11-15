// 10-1-app-two-places: App.java に足す2か所を、既存の行と並べて示し、app.post の1行を部分ごとに読む。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const code = (x, y, s, o = {}) => t(x, y, s, { mono: true, anchor: 'start', fill: o.fill ?? SUB, bold: o.bold });
const hl = (y, h) => `<rect x="34" y="${y}" width="446" height="${h}" rx="8" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>`;
const noteLines = (y, a, b) => t(504, y, a, { anchor: 'start', fill: C.yellow.dark, bold: true }) + '\n  ' + t(504, y + 22, b, { anchor: 'start', fill: C.yellow.dark, bold: true });

const parts = [
  ['p1', 40, 180, 'app.post(', ['POST の', 'リクエストを受け付ける']],
  ['p2', 230, 200, '"/api/reverse",', ['届く URL', '（手順3で決めたもの）']],
  ['p3', 440, 250, 'new ReverseApi()', ['その URL に届いたとき', '動く API', '（handle が呼ばれる）']],
  ['gray', 700, 60, ');', []],
];
const part = ([color, x, w, s, desc]) => {
  const c = C[color];
  return `
  <g filter="url(#shadow)"><rect x="${x}" y="344" width="${w}" height="52" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>
  ${t(x + w / 2, 377, s, { size: SIZE.head, mono: true, bold: true, fill: c.dark })}${desc.length ? `
  <line x1="${x + w / 2}" y1="396" x2="${x + w / 2}" y2="412" stroke="${c.main}" stroke-width="3"/>
  <g filter="url(#shadow)"><rect x="${x}" y="412" width="${w}" height="88" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
${desc.map((d, k) => '  ' + t(x + w / 2, 438 + k * 22, d)).join('\n')}` : ''}`;
};
const body = `
  <g filter="url(#shadow)"><rect x="20" y="12" width="860" height="296" rx="16" fill="#ffffff" stroke="${C.green.main}" stroke-width="2"/></g>
  <path d="M20 54 v-26 a16 16 0 0 1 16 -16 h828 a16 16 0 0 1 16 16 v26 z" fill="url(#${C.green.head})"/>
  ${L.icon({ name: 'file', x: 36, y: 20, size: 24, color: '#ffffff' })}
  ${t(70, 40, 'backend/src/main/java/jp/co/copel/training/App.java（抜粋）', { mono: true, bold: true, anchor: 'start', fill: '#ffffff' })}

  ${code(50, 84, 'import jp.co.copel.training.api.ProductListApi;')}
  ${hl(98, 48)}
  ${code(50, 128, 'import jp.co.copel.training.api.ReverseApi;', { fill: C.yellow.dark, bold: true })}
  ${noteLines(118, '追加1：別のパッケージのクラスなので、', 'import がないと名前が使えない')}
  ${code(50, 172, '...')}
  ${code(50, 200, 'app.get("/api/products", new ProductListApi());')}
  ${hl(214, 48)}
  ${code(50, 244, 'app.post("/api/reverse", new ReverseApi());', { fill: C.yellow.dark, bold: true })}
  ${noteLines(234, '追加2：URL と、その URL で動く API を', '結びつける')}
  ${code(50, 290, 'app.start(8080);')}
  ${t(40, 336, '追加2 の1行を、部分ごとに読む', { size: SIZE.head, bold: true, anchor: 'start' })}
${parts.map(part).join('')}
  <g filter="url(#shadow)"><rect x="20" y="520" width="860" height="84" rx="14" fill="${C.red.light}" stroke="${C.red.main}" stroke-width="2"/></g>
  ${L.icon({ name: 'alert-circle', x: 36, y: 536, size: 28, color: C.red.main })}
  ${t(76, 556, 'この1行がないと', { size: SIZE.head, bold: true, anchor: 'start', fill: C.red.dark })}
  ${t(76, 584, 'ReverseApi.java を作っても、誰にも呼ばれない', { anchor: 'start' })}
  ${t(860, 584, '（URL と API を結びつけるのは、App.java の役目）', { size: SIZE.note, anchor: 'end', fill: SUB })}`;

const y0 = 620;
L.write('10-1-app-two-places', L.svg({
  y0,
  title: 'App.java に足す2か所、import と app.post の1行を、既存の行と並べて示し、app.post の1行を部分ごとに読み解いた図',
  desc: 'App.java の抜粋で、追加1は import jp.co.copel.training.api.ReverseApi;、追加2は app.post("/api/reverse", new ReverseApi()); の1行。追加2は、app.post( が POST のリクエストを受け付け、"/api/reverse", が届く URL、new ReverseApi() がその URL に届いたとき動く API で、handle が呼ばれる。この1行がないと、ReverseApi.java を作っても誰にも呼ばれない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['App.java に足すのは、import と app.post の', '2か所だよ。app.post の1行で、URL と API を', '結びつけているんだ。'] }),
}));
