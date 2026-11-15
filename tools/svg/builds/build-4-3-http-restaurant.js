// 4-3-http-restaurant: レストランにたとえた HTTP 通信。客=フロントエンド（青）、厨房=バックエンド（緑）。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const side = (x, color, name, role, l1, l2) => L.card({ x, y: 20, w: 170, h: 398, color, title: name })
  + '\n  ' + t(x + 85, 94, role, { bold: true, fill: C[color].dark })
  + '\n  ' + t(x + 85, 150, l1, { fill: SUB }) + '\n  ' + t(x + 85, 174, l2, { fill: SUB });
const rows = (x, y, color, list) => list.map(([k, v, mono], i) =>
  t(x + 16, y + i * 28, k, { bold: true, anchor: 'start', fill: C[color].dark }) + '\n  ' + t(x + 146, y + i * 28, v, { anchor: 'start', mono })).join('\n  ');
const cd = (x, color, title, l1, l2) => L.card({ x, y: 516, w: 260, h: 110, color, title })
  + '\n  ' + t(x + 130, 588, l1, { fill: TEXT }) + (l2 ? '\n  ' + t(x + 130, 610, l2, { size: SIZE.note, fill: SUB }) : '');
const body = `
${side(20, 'blue', '客', 'フロントエンド', '注文を出すのは、', 'いつも客から')}
${side(710, 'green', '厨房', 'バックエンド', '注文を受けて、', '料理を作って返す')}
${L.card({ x: 260, y: 20, w: 380, h: 192, color: 'blue', title: 'リクエスト（注文票）' })}
  ${rows(260, 94, 'blue', [['メソッド', 'GET（情報をください）'], ['宛先（URL）', '/api/products', true], ['ヘッダー', '付け足しの情報'], ['本文', 'GET では、ふつう使わない']])}
  ${L.arrow({ x1: 196, y1: 118, x2: 254, y2: 118, color: 'blue', width: 4 })}
  ${L.arrow({ x1: 646, y1: 118, x2: 704, y2: 118, color: 'blue', width: 4 })}
${L.pill({ cx: 450, y: 224, w: 300, label: 'まず、客が注文票を出す', n: '1', color: 'blue' })}
${L.card({ x: 260, y: 272, w: 380, h: 148, color: 'green', title: 'レスポンス（出来上がった料理）' })}
  ${rows(260, 346, 'green', [['ステータスコード', '200（成功）'], ['ヘッダー', 'application/json など'], ['本文', '商品の一覧の JSON']])}
  ${L.arrow({ x1: 704, y1: 346, x2: 646, y2: 346, color: 'green', width: 4 })}
  ${L.arrow({ x1: 254, y1: 346, x2: 196, y2: 346, color: 'green', width: 4 })}
${L.pill({ cx: 450, y: 430, w: 340, label: '注文を受けた厨房が、料理を返す', n: '2', color: 'green' })}
  <rect x="20" y="474" width="860" height="168" rx="16" fill="${C.gray.light}" fill-opacity="0.6" stroke="${C.gray.main}" stroke-width="2"/>
  ${t(450, 502, 'ステータスコードの、最初の数字で結果が分かる', { size: SIZE.head, bold: true })}
${cd(40, 'green', '2 で始まる', '成功（200 など）')}
${cd(320, 'red', '4 で始まる', 'お願いの仕方に問題がある', '（404：宛先が見つからない）')}
${cd(600, 'red', '5 で始まる', 'バックエンド側の問題', '（500：中でエラー）')}`;
const y0 = 658;
L.write('4-3-http-restaurant', L.svg({
  y0,
  title: 'レストランにたとえた HTTP 通信。客のフロントエンドが注文票のリクエストを先に送り、厨房のバックエンドが料理のレスポンスを返す',
  desc: '客（フロントエンド）が、メソッド GET、宛先 /api/products、ヘッダー、本文からなる注文票（リクエスト）を先に出す（1）。注文を受けた厨房（バックエンド）が、ステータスコード 200、ヘッダー、本文（商品の一覧の JSON）からなる料理（レスポンス）を返す（2）。ステータスコードは、2 で始まれば成功、4 で始まればお願いの仕方に問題があり（404 は宛先が見つからない）、5 で始まればバックエンド側の問題（500 は中でエラー）。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['HTTP 通信は、レストランの注文と同じ。', '注文票を送ると、料理が返ってくるんだ'] }),
}));
