// 2-3 の「できたかの確認」: ブラウザで http://localhost:8080/api/products を開くと、商品のデータが JSON で出る。
// 商品は、App.java の initDatabase が登録する見本の5件（ボールペン・ノート・クリアファイル・付箋・マーカー）。
const S = require('../shot-lib');
const { t, win, hl, note } = S;

// 行頭の空白は SVG で詰められるため、改行しない空白（U+00A0）に置き換える
const line = (y, s) => t(40, y, s.replace(/^ +/, (m) => ' '.repeat(m.length)), { size: 14, mono: true, fill: '#222' });

S.write('2-3-browser-json', S.svg({
  W: 760, H: 380,
  title: 'ブラウザで http://localhost:8080/api/products を開くと、商品のデータが JSON で表示される',
  desc: 'ブラウザのアドレス欄に http://localhost:8080/api/products を入れて開くと、見本の商品5件が、id、name、price、stock の4つの項目を持つ JSON で表示される。これが表示されれば、バックエンドの用意はできている。',
  body: `
  ${win({ x: 10, y: 10, w: 740, h: 360, fill: '#ffffff' })}
  <rect x="10" y="10" width="740" height="52" rx="8" fill="#f1f5f9" stroke="#999" stroke-width="2"/>
  <rect x="30" y="20" width="520" height="32" rx="16" fill="#ffffff" stroke="#999"/>
  ${t(50, 42, 'http://localhost:8080/api/products', { size: 14, mono: true })}
  ${hl({ x: 24, y: 16, w: 534, h: 40 })}
  ${note({ x: 570, y: 42, n: 1, text: 'URL を開く' })}
  ${line(100, '[')}
  ${line(124, '  { "id": 1, "name": "ボールペン", "price": 150, "stock": 200 },')}
  ${line(148, '  { "id": 2, "name": "ノート", "price": 220, "stock": 120 },')}
  ${line(172, '  { "id": 3, "name": "クリアファイル", "price": 80, "stock": 500 },')}
  ${line(196, '  { "id": 4, "name": "付箋", "price": 300, "stock": 80 },')}
  ${line(220, '  { "id": 5, "name": "マーカー", "price": 180, "stock": 0 }')}
  ${line(244, ']')}
  ${hl({ x: 28, y: 82, w: 700, h: 180 })}
  ${note({ x: 30, y: 296, n: 2, text: '商品のデータが JSON（データを文字で表す書き方）で表示されればOK' })}
  ${t(30, 326, 'id・name・price・stock の4つの項目が、商品ごとに並ぶ（商品は全部で5件）', { size: 14 })}`,
}));
