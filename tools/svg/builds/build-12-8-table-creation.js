// 12-8-table-creation: テーブルを作る方法を、backend/（自分で書く SQL）と backend_spring/（Entity から自動作成）で並べる。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const NB = '  ';
const side = ({ x, title, sub, fileName, codeLines, hl, label, arrowNote, tableSub, regTitle, regLines }) => {
  const cx = x + 210, ax = x + 100, g = C.green;
  const bx = x + 15, by = 96, bw = 390, bh = 176;
  let s = L.card({ x, y: 12, w: 420, h: 530, color: 'green', title });
  s += `\n  ${t(cx, 80, sub, { size: SIZE.note, fill: SUB })}`;
  // コードの箱
  s += `
  <g filter="url(#shadow)"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="#ffffff" stroke="${g.main}" stroke-width="2"/></g>
  <path d="M${bx} ${by + 32} v-22 a10 10 0 0 1 10 -10 h${bw - 20} a10 10 0 0 1 10 10 v22 z" fill="${g.light}" stroke="${g.main}" stroke-width="2"/>
  ${t(bx + 14, by + 22, fileName, { size: SIZE.note, bold: true, mono: true, anchor: 'start', fill: g.dark })}
  <rect x="${bx + 7}" y="${by + hl.top}" width="${bw - 14}" height="${hl.h}" rx="5" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>
  ${codeLines.map((l, i) => t(bx + 14, by + 58 + i * 22, l, { size: SIZE.note, mono: true, anchor: 'start' })).join('\n  ')}
  ${t(bx + bw - 14, by + hl.labelY, label, { size: SIZE.note, bold: true, anchor: 'end', fill: C.yellow.dark })}`;
  // 矢印とメモ
  s += `
  ${L.arrow({ x1: ax, y1: by + bh + 4, x2: ax, y2: by + bh + 70, color: 'green' })}
  ${arrowNote.map((l, i) => t(ax + 18, by + bh + 28 + i * 18, l, { size: SIZE.note, anchor: 'start' })).join('\n  ')}`;
  // テーブル
  const ty = by + bh + 76;
  s += `
  <g filter="url(#shadow)"><rect x="${cx - 150}" y="${ty}" width="300" height="66" rx="12" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/></g>
  ${t(cx, ty + 27, 'products テーブル', { size: SIZE.head, bold: true, fill: C.orange.dark })}
  ${t(cx, ty + 51, tableSub, { size: SIZE.note })}
  ${L.arrow({ x1: ax, y1: ty + 70, x2: ax, y2: ty + 100, color: 'orange' })}`;
  // 登録
  const ry = ty + 104;
  s += `
  <g filter="url(#shadow)"><rect x="${bx}" y="${ry}" width="${bw}" height="88" rx="12" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(cx, ry + 25, regTitle, { size: SIZE.body, bold: true, fill: C.gray.dark })}
  ${regLines.map((l, i) => t(cx, ry + 48 + i * 22, l)).join('\n  ')}`;
  return s;
};
const body = side({
  x: 20, title: 'backend/：SQL を、自分で書く', sub: 'テーブルの作り方を、SQL の文字列として Java のコードに書く',
  fileName: 'App.java の initDatabase()',
  codeLines: ['CREATE TABLE IF NOT EXISTS products (', NB + 'id BIGSERIAL PRIMARY KEY,', NB + 'name VARCHAR(100) NOT NULL,', NB + 'price INTEGER NOT NULL, ...', ')'],
  hl: { top: 86, h: 24, labelY: 102 }, label: 'name 列',
  arrowNote: ['起動のたびに、自分で書いた', 'SQL が実行される'],
  tableSub: 'id・name・price・stock・created_at',
  regTitle: '見本の商品5件の登録', regLines: ['initDatabase() の INSERT。', 'テーブルが空のときだけ登録する'],
}) + side({
  x: 460, title: 'backend_spring/：Entity から自動で作られる', sub: 'CREATE TABLE の SQL は、どこにも書かれていない',
  fileName: 'entity/Product.java（Entity）',
  codeLines: ['@Table(name = "products")', 'public class Product {', NB + '@Column(nullable = false, length = 100)', NB + 'private String name;', NB + '...'],
  hl: { top: 86, h: 46, labelY: 124 }, label: 'name 列',
  arrowNote: ['起動したとき、Spring Boot が', 'Entity を見て作る', '（ddl-auto: update）'],
  tableSub: 'なければ作る。あれば不足の列だけ足す',
  regTitle: '見本の商品5件の登録', regLines: ['data.sql の INSERT。', 'テーブルが空のときだけ登録する'],
});
const y0 = 12 + 530 + 16;
L.write('12-8-table-creation', L.svg({
  y0,
  title: 'テーブルを作る方法を、backend/ の自分で書く SQL と、backend_spring/ の Entity からの自動作成で並べて比べた図。name 列の書き方が、両方で対応している',
  desc: 'backend/ では App.java の initDatabase() に CREATE TABLE の SQL を自分で書き、起動のたびに実行して products テーブルを作り、見本の商品5件を INSERT で登録する。backend_spring/ では Entity（Product.java）の @Table と @Column から、起動時に Spring Boot が products テーブルを自動で作り、data.sql の INSERT で見本の商品5件を登録する。name 列の書き方が両方で対応している。猫の先生が、テーブルは起動のたびに SQL で作ると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['テーブルは、起動のたびに', '自分で書いた SQL で作るんだ。', '見本の商品も同じ仕組みだよ。'] }),
}));
