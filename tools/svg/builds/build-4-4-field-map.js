// 4-4-field-map: 4項目が Java・JSON・TypeScript で同じ名前でそろっていることを線で結ぶ。
// Java=緑、JSON=灰、TypeScript=青。項目（id/name/price/stock）は役割がないので p1〜p4。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const head = (x, w, grad, title, sub, subMono) => `
  <g filter="url(#shadow)"><rect x="${x}" y="12" width="${w}" height="56" rx="12" fill="url(#${grad})"/></g>
  ${t(x + w / 2, 36, title, { size: SIZE.head, bold: true, fill: '#ffffff' })}
  ${t(x + w / 2, 57, sub, { size: SIZE.note, fill: '#ffffff', mono: subMono })}`;
const cell = (x, y, w, c, main, sub) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="56" rx="12" fill="#ffffff" stroke="${C[c].main}" stroke-width="2"/></g>
  ${sub ? t(x + w / 2, y + 26, main, { size: SIZE.head, bold: true, mono: true, fill: C[c].dark }) + '\n  ' + t(x + w / 2, y + 46, sub, { size: SIZE.note, mono: true, fill: SUB })
        : t(x + w / 2, y + 35, main, { size: SIZE.head, bold: true, mono: true, fill: C[c].dark })}`;
const items = [
  ['p1', 'long id', 'getter：getId()', '"id" : 1', 'id: number'],
  ['p2', 'String name', 'getter：getName()', '"name" : "ボールペン"', 'name: string'],
  ['p3', 'int price', 'getter：getPrice()', '"price" : 150', 'price: number'],
  ['p4', 'int stock', 'getter：getStock()', '"stock" : 200', 'stock: number'],
];
const rows = items.map(([c, j, g, js, ts], i) => {
  const y = 82 + i * 66;
  return cell(20, y, 300, c, j, g) + '\n  ' + L.arrow({ x1: 324, y1: y + 28, x2: 356, y2: y + 28, color: 'gray', width: 4 })
    + '\n  ' + cell(360, y, 240, c, js) + '\n  ' + L.arrow({ x1: 604, y1: y + 28, x2: 636, y2: y + 28, color: 'gray', width: 4 })
    + '\n  ' + cell(640, y, 240, c, ts);
}).join('\n');
const body = head(20, 300, 'headGreen', 'Java', 'dto/ProductResponse.java', true)
  + head(360, 240, 'headGray', 'JSON', 'ネットワークを流れる文字')
  + head(640, 240, 'headBlue', 'TypeScript', 'types/product.ts', true)
  + rows + `
  <g filter="url(#shadow)"><rect x="20" y="350" width="860" height="62" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(450, 375, 'getter の名前から get を取って、先頭を小文字にした名前（getId なら id）が、JSON の項目名になる')}
  ${t(450, 398, '名前がそろっていないと、フロントエンドで値を取り出せない', { bold: true, fill: C.yellow.dark })}`;
const y0 = 428;
L.write('4-4-field-map', L.svg({
  y0,
  title: '商品1件分の4つの項目が、Java の ProductResponse、JSON、TypeScript の Product で、同じ名前でそろっていることを、線で結んで示した図',
  desc: '商品1件分の4つの項目 id・name・price・stock が、Java の dto/ProductResponse.java（long id、String name、int price、int stock と、それぞれの getter）、ネットワークを流れる JSON（"id" : 1 など）、TypeScript の types/product.ts（id: number など）で、同じ名前でそろっている。getter の名前から get を取って先頭を小文字にした名前が JSON の項目名になり、名前がそろっていないと、フロントエンドで値を取り出せない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['Java・JSON・TypeScript で名前がそろっているか、', '線をたどって確かめてみよう'] }),
}));
