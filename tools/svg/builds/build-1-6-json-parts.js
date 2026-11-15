// 1-6-json-parts: 4項目は「項目の区別」の色（役割の青・緑・橙は使わない）。紫・青緑・赤紫・青灰。
const L = require('../rich-lib');
const { t, SIZE, SUB, TEXT, LINE } = L;
const M = { size: 22, bold: true, mono: true };
const items = [
  { name: 'id', code: '"id":1,', x: 91, w: 120, cx: 120, main: '#6a1b9a', light: '#f3e5f5', dark: '#45115f', grad: ['#8e3bb5', '#5e1783'], val: '値：1', mean: '商品の識別番号' },
  { name: 'name', code: '"name":"ボールペン",', x: 217, w: 245, cx: 335, main: '#00796b', light: '#e0f2f1', dark: '#004d40', grad: ['#1a9585', '#00665a'], val: '値："ボールペン"', note: '（文字の値は " で囲む）', mean: '商品の名前' },
  { name: 'price', code: '"price":150,', x: 468, w: 175, cx: 550, main: '#ad1457', light: '#fce4ec', dark: '#880e4f', grad: ['#c93573', '#9a1250'], val: '値：150', mean: '値段（円）' },
  { name: 'stock', code: '"stock":200', x: 649, w: 160, cx: 765, main: '#455a64', light: '#eceff1', dark: '#263238', grad: ['#5f7783', '#3a4d56'], val: '値：200', mean: '在庫の数' },
];
const defs = `<defs>${items.map((i, k) => `<linearGradient id="it${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${i.grad[0]}"/><stop offset="1" stop-color="${i.grad[1]}"/></linearGradient>`).join('')}</defs>`;
const sym = (x, w, s) => `<g filter="url(#shadow)"><rect x="${x}" y="64" width="${w}" height="50" rx="10" fill="#eceff1" stroke="#555555" stroke-width="2"/></g>\n  ${t(x + w / 2, 97, s, { ...M, fill: TEXT })}`;
let body = `${defs}
  ${t(450, 38, '商品1件分の JSON を、項目ごとに分けて読む', { size: SIZE.title, bold: true })}
  ${sym(49, 36, '{')}
  ${sym(815, 36, '}')}`;
items.forEach((i, k) => {
  const cardX = 20 + k * 215;
  const jc = i.x + i.w / 2, cy = 150;
  body += `
  <g filter="url(#shadow)"><rect x="${i.x}" y="64" width="${i.w}" height="50" rx="10" fill="${i.light}" stroke="${i.main}" stroke-width="2"/></g>
  ${t(jc, 97, i.code, { ...M, fill: i.dark })}
  <line x1="${jc}" y1="114" x2="${i.cx}" y2="${cy}" stroke="${i.main}" stroke-width="3" stroke-linecap="round"/>
  <g filter="url(#shadow)"><rect x="${cardX}" y="${cy}" width="200" height="146" rx="14" fill="#ffffff" stroke="${i.main}" stroke-width="2"/></g>
  <path d="M${cardX} ${cy + 32} v-18 a14 14 0 0 1 14 -14 h172 a14 14 0 0 1 14 14 v18 z" fill="url(#it${k})"/>
  ${t(i.cx, cy + 22, '項目名', { size: SIZE.note, bold: true, fill: '#ffffff' })}
  ${t(i.cx, cy + 58, i.name, { ...M, fill: i.dark })}
  ${t(i.cx, cy + 86, i.val)}${i.note ? '\n  ' + t(i.cx, cy + 106, i.note, { size: SIZE.note, fill: SUB }) : ''}
  ${t(i.cx, cy + (i.note ? 130 : 118), i.mean, { bold: true, fill: i.dark })}`;
});
body += `
  <g filter="url(#shadow)"><rect x="20" y="318" width="860" height="124" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/></g>
  ${t(40, 350, '記号の意味', { size: SIZE.head, bold: true, anchor: 'start' })}`;
[[150, '{ }', '1件分のまとまりを囲む'], [450, '[ ]', '複数件のまとまりを、並べて囲む'], [750, '"', '項目名と、文字の値を囲む']].forEach(([x, g, d]) => {
  body += `
  ${t(x, 394, g, { ...M, fill: TEXT })}
  ${t(x, 424, d)}`;
});
const y0 = 458;
L.write('1-6-json-parts', L.svg({
  y0,
  title: '商品1件分の JSON を、記号と4つの項目に分けて読む図',
  desc: '商品1件分の JSON は { } で囲まれ、id（値 1、商品の識別番号）、name（値 "ボールペン"、商品の名前）、price（値 150、値段）、stock（値 200、在庫の数）の4つの項目が並ぶ。{ } は1件分のまとまり、[ ] は複数件のまとまり、" は項目名と文字の値を囲む記号。猫の先生が、JSON は項目名と値を組み合わせて1件分のデータを { } で囲んだ書き方だと説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['JSON は、項目名と値を組み合わせて、', '1件分のデータを { } で囲んだ書き方なんだ。'] }),
}));
