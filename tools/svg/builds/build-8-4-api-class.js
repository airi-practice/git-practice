// 8-4-api-class: api/ の各クラスが Handler の約束を守って handle メソッドを持つ書き方、Context の操作、1API1ファイルの決まり。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const G = C.green;
const code = (x, y, s, o = {}) => t(x, y, s, { mono: true, anchor: 'start', ...o });
const NB = '\u00a0';
// ---- Handler
const handler = `
${L.card({ x: 20, y: 20, w: 220, h: 316, color: 'green', title: 'Handler', sub: '' })}
  ${t(130, 82, 'Javalin が決めている「約束」', { size: SIZE.note, fill: SUB })}
  ${t(130, 118, 'この約束を守るクラスは、')}
  ${t(130, 144, 'handle(Context ctx)', { mono: true, bold: true, fill: G.dark })}
  ${t(130, 168, 'というメソッドを持つ。')}
  ${['だから Javalin は、', 'どの API クラスでも、', '必ず handle を呼べる。'].map((s, k) => t(130, 206 + k * 24, s)).join('\n  ')}
  <rect x="34" y="278" width="192" height="40" rx="10" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(130, 304, '→ app.get に渡せる理由', { bold: true, fill: C.yellow.dark })}
  ${t(290, 112, 'implements', { size: SIZE.note, mono: true, bold: true, fill: G.dark })}
  ${L.arrow({ x1: 338, y1: 124, x2: 246, y2: 124, color: 'green', width: 5 })}`;
// ---- API クラスの形
const items = [
  { y: 96, n: '1', c: 'public class XxxApi implements Handler {', d: '約束を守る、と宣言する（Javalin に呼んでもらえる）' },
  { y: 144, n: '2', c: NB.repeat(4) + '@Override', d: 'Handler の handle を書いている、という目印' },
  { y: 192, n: '3', c: NB.repeat(4) + 'public void handle(Context ctx) {', d: '名前は、どの API でも handle にそろえる' },
  { y: 240, n: '4', c: NB.repeat(8) + 'ctx.json(...);', d: '返す値を JSON にしてレスポンスとして返す' },
];
const cls = `
${L.card({ x: 340, y: 20, w: 540, h: 316, color: 'green', title: 'どの API クラスも、この形（Xxx は機能の名前）' })}
  <rect x="352" y="74" width="516" height="250" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1"/>
  ${items.map((o) => L.badge({ cx: 374, cy: o.y - 5, n: o.n, color: 'green' }) + '\n  ' + code(394, o.y, o.c, { size: SIZE.body, bold: true }) + '\n  ' + t(394, o.y + 22, o.d, { size: SIZE.note, anchor: 'start', fill: SUB })).join('\n  ')}
  ${code(394, 286, NB.repeat(4) + '}', { size: SIZE.body, bold: true })}
  ${code(394, 312, '}', { size: SIZE.body, bold: true })}`;
// ---- Context
const ctxCard = `
${L.card({ x: 20, y: 356, w: 430, h: 246, color: 'blue', title: 'Context ctx：リクエストとレスポンスの情報' })}
  ${code(36, 430, 'ctx.json(値)', { size: SIZE.body, bold: true, fill: C.blue.dark })}
  ${t(36, 452, '値を JSON に変換して、レスポンスとして返す', { anchor: 'start' })}
  ${t(36, 474, '（ProductListApi で使用）', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${code(36, 514, 'ctx.bodyAsClass(クラス)', { size: SIZE.body, bold: true, fill: C.blue.dark })}
  ${t(36, 536, 'リクエストの本文（JSON）を、', { anchor: 'start' })}
  ${t(36, 558, 'クラスのオブジェクトに変換する', { anchor: 'start' })}
  ${t(36, 578, 'まだ使っていない。第10章で初めて使う', { size: SIZE.note, anchor: 'start', fill: SUB })}`;
// ---- 1API1ファイル
const pair = (y, a, b, dashed) => `
  <rect x="486" y="${y}" width="160" height="34" rx="8" fill="${dashed ? '#ffffff' : C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"${dashed ? ' stroke-dasharray="6,4"' : ''}/>
  ${t(566, y + 23, a, { mono: true, fill: dashed ? SUB : TEXT })}
  ${L.arrow({ x1: 650, y1: y + 17, x2: 680, y2: y + 17, color: 'gray', width: 4 })}
  <rect x="684" y="${y}" width="190" height="34" rx="8" fill="${dashed ? '#ffffff' : G.light}" stroke="${G.main}" stroke-width="1.5"${dashed ? ' stroke-dasharray="6,4"' : ''}/>
  ${t(779, y + 23, b, { mono: true, bold: !dashed, fill: dashed ? SUB : G.dark })}`;
const one = `
${L.card({ x: 470, y: 356, w: 410, h: 246, color: 'green', title: '決まりは「1API1ファイル」' })}
${pair(436, 'GET /api/products', 'ProductListApi.java', false)}
${pair(494, '次の API', 'XxxApi.java', true)}
  ${t(675, 574, 'ファイル名を見るだけで、何の API か分かる', { bold: true, fill: G.dark })}`;
// ---- 書いてよいこと
const rule = (x, color, icon, title, lines) => `
${L.card({ x, y: 622, w: 425, h: 126, color, title })}
  ${L.icon({ name: icon, x: x + 14, y: 634, size: 24, color: '#ffffff' })}
  ${lines.map((s, k) => t(x + 16, 702 + k * 26, s, { anchor: 'start' })).join('\n  ')}`;
const rules = rule(20, 'green', 'check', 'api/ に書いてよいこと', ['その API の処理（SQL を送る、結果を詰める）、', 'ctx.json(...) で返す'])
  + rule(455, 'red', 'x', 'api/ に書くべきでないこと', ['接続先やパスワード、URL の対応づけ、', '他の API の処理、値を持つクラスの定義']);
const y0 = 764;
L.write('8-4-api-class', L.svg({
  y0,
  title: 'api/ の各クラスが Handler の約束を守って handle メソッドを持つ書き方と、Context で使える操作、1API1ファイルの決まりを示した図',
  desc: 'Handler は Javalin が決めている約束で、守るクラスは handle(Context ctx) を持つため、Javalin はどの API クラスでも handle を呼べる。API クラスは implements Handler と宣言し、@Override を付けて handle メソッドを書き、ctx.json で値を JSON にして返す。Context には ctx.json と ctx.bodyAsClass がある。決まりは1API1ファイルで、GET /api/products は ProductListApi.java、次の API は XxxApi.java。api/ には API の処理を書き、接続先やパスワードなどは書かない。',
  body: handler + cls + ctxCard + one + rules,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['API のクラスは、Handler の約束どおりに', 'handle メソッドを書くんだ。', '1つの API につき、1つのファイルだよ。'] }),
}));
