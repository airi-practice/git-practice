// 8-4-api-template: 新しい API クラスの雛形と、作るときの5つの手順を、番号で結んで示す。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const G = C.green;
const CW = 8.25; // 等幅15の1文字の幅
const code = (x, y, s, o = {}) => t(x, y, s, { mono: true, anchor: 'start', ...o });
const NB = '\u00a0';
const hl = (y) => `<rect x="30" y="${y - 22}" width="500" height="30" rx="6" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="1"/>`;
const bs = (y, ns) => ns.map((n, k) => L.badge({ cx: 48 + k * 26, cy: y - 7, n, color: 'green' })).join('\n  ');
const X = 108;
const left = `
${L.card({ x: 20, y: 60, w: 520, h: 470, color: 'green', title: '' })}
  ${t(40, 91, 'backend/.../api/XxxApi.java', { size: SIZE.head, bold: true, mono: true, anchor: 'start', fill: '#ffffff' })}
  ${hl(140)}${bs(140, ['1'])}
  ${code(X, 140, 'package jp.co.copel.training.api;')}
  ${t(X + 33 * CW + 14, 140, '必ず api に置く', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${code(X, 174, 'import io.javalin.http.Context;')}
  ${code(X, 208, 'import io.javalin.http.Handler;')}
  ${hl(242)}${bs(242, ['1', '2'])}
  ${code(X, 242, 'public class ')}<rect x="${X + 13 * CW - 2}" y="226" width="${3 * CW + 4}" height="22" rx="3" fill="${C.yellow.main}" fill-opacity="0.45"/>
  ${code(X + 13 * CW, 242, 'Xxx', { bold: true })}
  ${code(X + 16 * CW, 242, 'Api implements Handler {')}
  ${hl(276)}${bs(276, ['2'])}
  ${code(X, 276, NB.repeat(4) + '@Override public void handle(Context ctx) {')}
  ${hl(310)}${bs(310, ['3'])}
  ${code(X, 310, NB.repeat(8) + 'ctx.json(...);')}
  ${t(X + 22 * CW + 14, 310, '返したい値を渡す', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${code(X, 344, NB.repeat(4) + '}')}
  ${code(X, 378, '}')}
  <rect x="30" y="400" width="500" height="120" rx="10" fill="#ffffff" stroke="${C.gray.main}" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${L.badge({ cx: 52, cy: 428, n: '4', color: 'orange' })}
  ${t(72, 433, 'データベースを使うときは、', { anchor: 'start' })}
  ${t(72, 455, 'handle の中で Database.connect() を呼ぶ', { anchor: 'start' })}
  ${L.badge({ cx: 52, cy: 494, n: '5', color: 'green' })}
  ${t(72, 499, 'App.java に、対応づけを1行足す（8-6 で説明する）', { anchor: 'start' })}`;
const stepCard = (y, color, n, lines) => `
  <g filter="url(#shadow)"><rect x="560" y="${y}" width="320" height="86" rx="12" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>
  ${L.badge({ cx: 586, cy: y + 43, n, color })}
${lines.map((s, k) => '  ' + t(610, y + (lines.length === 3 ? 30 : 41) + k * 22, s, { anchor: 'start', fill: C[color].dark })).join('\n')}`;
const right = [
  [60, 'green', '1', ['api/ の下に、', 'Xxx + Api という名前の', 'Java ファイルを作る']],
  [156, 'green', '2', ['クラスの宣言に', 'implements Handler を付け、', 'public void handle(Context ctx) を書く']],
  [252, 'green', '3', ['返したい値を、', 'ctx.json(...) に渡す']],
  [348, 'orange', '4', ['データベースを使うときは、', 'Database.connect() で', '接続を受け取る']],
  [444, 'green', '5', ['App.java に、', '対応づけを1行足す']],
].map((a) => stepCard(...a)).join('');
const body = `
  ${t(20, 38, 'このシステムにはまだない例。Xxx の部分を、機能の名前に置き換える', { size: SIZE.body, bold: true, anchor: 'start', fill: C.yellow.dark })}${left}${right}`;
const y0 = 546;
L.write('8-4-api-template', L.svg({
  y0,
  title: '新しい API クラスの書き方の雛形で、Xxx の部分を機能の名前に置き換えることと、作るときの5つの手順を、コードの行と結んで示した図。このシステムにはまだない例',
  desc: 'このシステムにはまだない例。XxxApi.java の雛形で、Xxx の部分を機能の名前に置き換える。手順は5つ。1 api/ の下に Xxx + Api という名前の Java ファイルを作る。2 クラスの宣言に implements Handler を付け、public void handle(Context ctx) を書く。3 返したい値を ctx.json(...) に渡す。4 データベースを使うときは Database.connect() で接続を受け取る。5 App.java に対応づけを1行足す。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['Xxx を機能の名前に置き換えれば、', '新しい API の雛形になるんだ。', '5つの手順で、順番に作ってみよう。'] }),
}));
