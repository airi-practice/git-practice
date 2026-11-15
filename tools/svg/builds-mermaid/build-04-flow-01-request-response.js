const { L, node, label, frame, finish } = require('./_common');
const req = ['メソッド：GET', 'URL：/api/products', 'ヘッダー：付け足しの情報', '本文：GET ではふつう使わない'];
const res = ['ステータスコード：200', 'ヘッダー：application/json など', '本文：商品の一覧の JSON'];
const body = `
  ${frame({ x: 20, y: 20, w: 360, h: 278, color: 'blue', label: 'リクエスト' })}
  ${req.map((s, i) => node({ x: 40, y: 70 + i * 56, w: 320, h: 44, color: 'blue', lines: [s] })).join('\n  ')}
  ${frame({ x: 520, y: 20, w: 360, h: 222, color: 'green', label: 'レスポンス' })}
  ${res.map((s, i) => node({ x: 540, y: 70 + i * 56, w: 320, h: 44, color: 'green', lines: [s] })).join('\n  ')}
  ${L.arrow({ x1: 386, y1: 190, x2: 514, y2: 190, color: 'blue' })}
  ${label({ cx: 450, cy: 120, w: 130, lines: ['バックエンドが', '受け取って', '処理する'], color: 'blue' })}`;
finish('04-flow-01-request-response', {
  bottom: 298, body,
  title: 'リクエストとレスポンスの中身を並べた図。リクエストは、メソッド GET、URL /api/products、ヘッダー、本文の4つで、バックエンドが受け取って処理し、レスポンスのステータスコード 200、ヘッダー、商品の一覧の JSON の本文を返す',
  desc: 'リクエストの枠には、メソッド：GET、URL：/api/products、ヘッダー：付け足しの情報、本文：GET ではふつう使わない、の4つがある。矢印でバックエンドが受け取って処理することを示し、レスポンスの枠には、ステータスコード：200、ヘッダー：application/json など、本文：商品の一覧の JSON の3つがある。',
});
