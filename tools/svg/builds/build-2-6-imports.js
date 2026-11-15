// 2-6-imports: ProductListPage.tsx の先頭の3つの import が、どこにあるものを読み込むかを色分けして結ぶ。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const CW = 8.25; // 等幅15pxの1文字の幅
const chip = (x, y, text, color) => {
  const w = Math.round(text.length * CW + 22);
  return { w, svg: `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="52" rx="10" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${t(x + w / 2, y + 32, text, { mono: true, bold: true, fill: C[color].dark })}` };
};
const row = (y, n, color, parts, path, desc) => {
  let x = 46, out = L.badge({ cx: 26, cy: y + 26, n, color: 'gray' });
  parts.forEach(([text, kw]) => {
    const c = chip(x, y, text, kw ? 'gray' : color);
    out += '\n  ' + c.svg; x += c.w + 8;
  });
  out += '\n  ' + L.arrow({ x1: x - 2, y1: y + 26, x2: 576, y2: y + 26, color, width: 4 });
  out += `\n  <g filter="url(#shadow)"><rect x="582" y="${y - 6}" width="298" height="64" rx="12" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>
  ${path.mono ? t(731, y + 20, path.text, { size: SIZE.note, bold: true, mono: true, fill: C[color].dark }) : t(731, y + 20, path.text, { bold: true, fill: C[color].dark })}
  ${desc.mono ? t(731, y + 44, desc.text, { size: SIZE.note, mono: true, fill: TEXTC }) : t(731, y + 44, desc.text, { size: SIZE.note, fill: TEXTC })}`;
  return out;
};
const TEXTC = '#1e293b';
const body = `
  ${t(20, 36, 'frontend/src/pages/ProductListPage.tsx', { size: SIZE.head, bold: true, mono: true, anchor: 'start' })}
  ${t(404, 36, 'の1〜3行目', { size: SIZE.head, bold: true, anchor: 'start' })}
  ${t(731, 36, '読み込むもの（置き場所）', { size: SIZE.head, bold: true })}
  ${row(62, '1', 'p1', [['import', 1], ['{ useEffect, useState }'], ['from', 1], ["'react'"]], { text: 'React が用意しているもの' }, { text: 'useEffect と useState', mono: false })}
  ${row(148, '2', 'p2', [['import', 1], ['{ fetchProducts }'], ['from', 1], ["'../api/products'"]], { text: 'frontend/src/api/products.ts', mono: true }, { text: 'fetchProducts 関数（リクエストを送る）' })}
  ${row(234, '3', 'p3', [['import type', 1], ['{ Product }'], ['from', 1], ["'../types/product'"]], { text: 'frontend/src/types/product.ts', mono: true }, { text: 'Product 型（商品1件分の形）' })}
  <g filter="url(#shadow)"><rect x="20" y="318" width="860" height="68" rx="14" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(450, 346, "'../' は、1つ上のフォルダ（frontend/src/）を指す。", { fill: C.yellow.dark, bold: true })}
  ${t(450, 371, 'pages/ の1つ上から、api/ や types/ をたどっている', { fill: C.yellow.dark, bold: true })}`;
const y0 = 402;
L.write('2-6-imports', L.svg({
  y0,
  title: 'ProductListPage.tsx の先頭の3つの import が、どこにあるものを読み込むかを、色分けして結んだ図',
  desc: '1行目は { useEffect, useState } を \'react\' から読み込む（React が用意しているもの）。2行目は { fetchProducts } を \'../api/products\' から読み込む（frontend/src/api/products.ts の fetchProducts 関数）。3行目は import type で { Product } を \'../types/product\' から読み込む（frontend/src/types/product.ts の Product 型）。\'../\' は1つ上のフォルダ（frontend/src/）を指す。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['importは、ほかのファイルにあるものを', '使うための書き方だよ。'] }),
}));
