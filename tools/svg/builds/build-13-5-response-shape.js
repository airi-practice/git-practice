// 13-5-response-shape: テーブルの1行が JSON になるまで。上=backend/、下=backend_spring/
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const RED = C.red;
// 1枚のカード。コード名のタイトルは等幅にする
const cell = ({ x, y, w, color, title, mono, lines }) => L.card({ x, y, w, h: 112, color, title: '' })
  + '\n  ' + t(x + w / 2, y + 31, title, { size: SIZE.head, bold: true, fill: C[color].headText ?? '#ffffff', mono })
  + '\n  ' + lines.map((s, k) => t(x + w / 2, y + 74 + k * 24, s, { fill: C[color].dark, mono: s.startsWith('ctx.') })).join('\n  ');
const ws = [205, 200, 200, 170], gap = 30, sx = 17;
const row = (y, cards) => {
  let x = sx, out = '';
  cards.forEach((c, i) => {
    out += cell({ x, y, w: ws[i], ...c }) + '\n';
    if (i < 3) out += '  ' + L.arrow({ x1: x + ws[i] + 3, y1: y + 70, x2: x + ws[i] + gap - 3, y2: y + 70, color: 'gray', width: 4 }) + '\n';
    x += ws[i] + gap;
  });
  return out;
};
const panel = (top, label, lx, desc, cards, noteX, note) => `
  <g filter="url(#shadow)"><rect x="8" y="${top}" width="884" height="200" rx="16" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(24, top + 32, label, { size: SIZE.head, bold: true, anchor: 'start', mono: true, fill: C.gray.dark })}
  ${t(lx, top + 32, desc, { anchor: 'start' })}
${row(top + 48, cards)}  <rect x="${noteX - 190}" y="${top + 168}" width="380" height="26" rx="13" fill="${RED.light}" stroke="${RED.main}" stroke-width="1.5"/>
  ${t(noteX, top + 186, note, { size: SIZE.note, bold: true, fill: RED.dark })}`;
const tbl = { color: 'orange', title: 'products テーブルの1行', lines: ['id・name・price・stock', 'created_at'] };
const json = (lines) => ({ color: 'gray', title: 'JSON', lines });
const body = panel(12, 'backend/', 118, 'テーブルの1行を表すクラスはなく、取り出した値をそのまま ProductResponse に入れる', [
  tbl,
  { color: 'gray', title: 'ResultSet の1行', lines: ['SELECT で4列だけ選ぶ', 'id・name・price・stock'] },
  { color: 'green', title: 'ProductResponse', mono: true, lines: ['id・name・price・stock', 'long・int で持つ'] },
  json(['ctx.json(products)', 'で変換する']),
], 17 + 205 + 30 + 100, 'created_at は、SELECT で最初から取り出さない')
+ panel(224, 'backend_spring/', 192, 'テーブルの1行を表す Entity があり、Service が4項目だけ詰め替える', [
  tbl,
  { color: 'gray', title: 'Product（Entity）', mono: true, lines: ['Spring が詰める。', 'createdAt も持つ'] },
  { color: 'green', title: 'ProductResponse', mono: true, lines: ['ProductService が、', '4項目だけ詰め替える'] },
  json(['戻り値を、Spring が', '変換する']),
], 17 + 205 + 30 + 200 + 30 + 100, 'createdAt は、ここで外れて、画面に返らない');
const y0 = 440;
L.write('13-5-response-shape', L.svg({
  y0,
  title: 'products テーブルの1行が、backend/ では ResultSet から ProductResponse へ、backend_spring/ では Entity の Product を経て ProductResponse へ変わっていく様子と、created_at が画面に返らない場所を示した図',
  desc: 'backend/ では、テーブルの1行から SELECT で4列だけ選んだ ResultSet の1行になり、ProductResponse に入って ctx.json(products) で JSON に変換される。created_at は SELECT で最初から取り出さない。backend_spring/ では、テーブルの1行を Entity の Product に Spring が詰め、ProductService が4項目だけ ProductResponse に詰め替え、戻り値を Spring が JSON に変換する。createdAt はこの詰め替えで外れて、画面に返らない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['テーブルの1行から JSON まで、', '値が形を変えて進んでいくんだ。', '途中で外れる列にも注目してね。'] }),
}));
