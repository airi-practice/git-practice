// 3-8-three-trials: データベースに送る3つのコマンドと、そのあとの画面の表の変化を、3段で並べる
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT, LINE } = L;
const ROW = 22;
const base = [['1', 'ボールペン', '150', '200'], ['2', 'ノート', '220', '120'], ['3', 'クリアファイル', '80', '500'], ['4', '付箋', '300', '80'], ['5', 'マーカー', '180', '0']];
// 表。rows の各行は [id, 商品名, 価格, 在庫数]。hl は強調する行の番号（0 始まり）、hlBold は価格だけ太字にするか
const table = (x, y, rows, hl, hlBold, note) => {
  const h = ROW * (rows.length + 1);
  const cols = (yy, r, o = {}, onlyPrice) => { const q = onlyPrice ? {} : o; return t(x + 14, yy, r[0], { size: SIZE.note, anchor: 'start', ...q }) + t(x + 88, yy, r[1], { size: SIZE.note, anchor: 'start', ...q })
    + t(x + 298, yy, r[2], { size: SIZE.note, anchor: 'end', ...o }) + t(x + 388, yy, r[3], { size: SIZE.note, anchor: 'end', ...q }); };
  let s = `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="424" height="${h}" rx="8" fill="#ffffff" stroke="${C.blue.main}" stroke-width="1.5"/></g>
  <path d="M${x} ${y + ROW} v-${ROW - 8} a8 8 0 0 1 8 -8 h408 a8 8 0 0 1 8 8 v${ROW - 8} z" fill="${C.blue.light}"/>
  ${t(x + 14, y + 16, '商品ID', { size: SIZE.note, bold: true, anchor: 'start', fill: C.blue.dark })}${t(x + 88, y + 16, '商品名', { size: SIZE.note, bold: true, anchor: 'start', fill: C.blue.dark })}${t(x + 298, y + 16, '価格（円）', { size: SIZE.note, bold: true, anchor: 'end', fill: C.blue.dark })}${t(x + 388, y + 16, '在庫数', { size: SIZE.note, bold: true, anchor: 'end', fill: C.blue.dark })}`;
  rows.forEach((r, i) => {
    const yy = y + ROW * (i + 1);
    const on = i === hl;
    if (on) s += `\n  <rect x="${x + 1}" y="${yy + 1}" width="422" height="${ROW - 1}" fill="${C.yellow.light}"/>`;
    s += '\n  ' + cols(yy + 16, r, on ? { bold: true, fill: C.yellow.dark } : {}, hlBold);
    if (on && note) s += '\n  ' + t(x + note.dx, yy + 16, note.text, { size: SIZE.note, bold: true, anchor: 'start', fill: C.yellow.dark });
  });
  return s;
};
const lineY = (y, k) => y + 18 + k * 20;
const trial = ({ y, h, n, title, code, notes, rows, hl, hlBold, note }) => {
  const th = ROW * (rows.length + 1);
  return `
  <g filter="url(#shadow)"><rect x="20" y="${y}" width="860" height="${h}" rx="16" fill="#ffffff" stroke="${LINE}" stroke-width="2"/></g>
  ${L.badge({ cx: 46, cy: y + 26, n, color: 'gray' })}
  ${t(68, y + 32, title, { size: SIZE.head, bold: true, anchor: 'start', fill: C.gray.dark })}
  <rect x="34" y="${y + 46}" width="364" height="${th}" rx="10" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/>
${code.map((s, k) => '  ' + t(46, y + 46 + 24 + k * 19, s, { size: SIZE.note, anchor: 'start', mono: true, fill: C.orange.dark, bold: true })).join('\n')}
${notes.map((s, k) => '  ' + t(46, y + 46 + th - 16 - (notes.length - 1 - k) * 20, s, { size: SIZE.note, anchor: 'start', fill: SUB })).join('\n')}
  ${L.arrow({ x1: 404, y1: y + 46 + th / 2, x2: 438, y2: y + 46 + th / 2, color: 'gray', width: 4 })}
${table(442, y + 46, rows, hl, hlBold, note)}`;
};
const upd = base.map((r) => r.slice()); upd[1][2] = '250';
const ins = base.concat([['6', 'ボールペン', '150', '200']]);
const body = `
${trial({ y: 12, h: 200, n: '1', title: 'データベースの中身を見る', code: ['SELECT id, price, stock', 'FROM products ORDER BY id;'], notes: ['値を見るだけで、何も変えない', '画面の表と、同じ値が並ぶ'], rows: base, hl: -1 })}
${trial({ y: 224, h: 200, n: '2', title: '価格を変える', code: ['UPDATE products SET price = 250', 'WHERE id = 2;'], notes: ['id が 2 の行だけ、price を 250 にする'], rows: upd, hl: 1, hlBold: true, note: { dx: 150, text: '220 から変わる →' } })}
${trial({ y: 436, h: 222, n: '3', title: '商品を1件増やす', code: ['INSERT INTO products', '(name, price, stock, created_at)', 'SELECT name, price, stock, CURRENT_TIMESTAMP', 'FROM products WHERE id = 1;'], notes: ['商品ID 1 の行を取り出して、', '新しい行として足す'], rows: ins, hl: 5, note: { dx: 200, text: '新しい行 →' } })}`;
const y0 = 674;
L.write('3-8-three-trials', L.svg({
  y0,
  title: 'データベースに送る3つのコマンドと、それぞれのあとに、画面の表がどう変わるかを並べた図。見るだけでは変わらない、価格を変えると商品ID 2 の価格が変わる、商品を1件増やすと表が6行になる',
  desc: '1 データベースの中身を見る SELECT id, price, stock FROM products ORDER BY id; は、値を見るだけで何も変えず、画面の表と同じ5行が並ぶ。2 価格を変える UPDATE products SET price = 250 WHERE id = 2; は、id が 2 の行だけ price を 250 にし、ノートの価格が 220 から 250 に変わる。3 商品を1件増やす INSERT INTO products ... SELECT ... FROM products WHERE id = 1; は、商品ID 1 の行を取り出して新しい行として足し、表が6行になる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['見るだけなら表は変わらないけど、', '送るコマンドで表が変わるんだ'] }),
}));
