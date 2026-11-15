// 1-6-request-response-parts: リクエスト（青）とレスポンス（緑）を、それぞれ2つの部分に分けて見せる。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const part = (x, y, color, title, value, note) => L.card({ x, y, w: 400, h: 120, color, title })
  + '\n  ' + t(x + 200, y + 80, value, { size: value.length <= 14 ? SIZE.hero : SIZE.title, bold: true, mono: true, fill: C[color].dark })
  + '\n  ' + t(x + 200, y + 108, note, { fill: SUB });
const panel = (top, color, n, label, desc, a, b) => `
  <rect x="20" y="${top}" width="860" height="196" rx="16" fill="${C[color].light}" fill-opacity="0.45" stroke="${C[color].main}" stroke-width="2"/>
  <circle cx="52" cy="${top + 25}" r="12" fill="${C[color].main}"/>
  ${t(52, top + 30, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}
  ${t(74, top + 31, label, { size: SIZE.head, bold: true, anchor: 'start', fill: C[color].dark })}
  ${t(74 + 16 * label.length + 14, top + 31, desc, { anchor: 'start', fill: TEXT })}
${part(40, top + 52, color, ...a)}
${part(460, top + 52, color, ...b)}`;
const body = panel(14, 'blue', '1', 'リクエスト', 'フロントエンドからバックエンドへ。「商品の一覧をください」というお願い',
  ['お願いの種類（メソッド）', 'GET', '情報をください、という種類'], ['宛先（パス）', '/api/products', '商品の一覧がほしい、という宛先'])
  + `
  ${L.arrow({ x1: 450, y1: 212, x2: 450, y2: 254, color: 'gray', width: 4 })}
${L.pill({ cx: 668, y: 220, w: 400, label: 'バックエンドが、リクエストを受け取って処理する', n: '2', color: 'green' })}`
  + panel(260, 'green', '3', 'レスポンス', 'バックエンドからフロントエンドへ。「結果はこうでした」と伝える内容',
  ['結果を表す番号（ステータスコード）', '200', '成功した、という番号'], ['本文', '[ {"id":1, ...}, ... ]', '商品の一覧。返したいデータそのもの（JSON）']);
const y0 = 472;
L.write('1-6-request-response-parts', L.svg({
  y0,
  title: '商品一覧の画面を開くときの、リクエストとレスポンスを、それぞれ2つの部分に分けて見せた図',
  desc: 'リクエストは、お願いの種類（メソッド）GET と、宛先（パス）/api/products の2つの部分でできている。バックエンドがリクエストを受け取って処理したあと、レスポンスは、結果を表す番号（ステータスコード）200 と、本文（商品の一覧の JSON）の2つの部分でできている。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['リクエストは「種類」と「宛先」、', 'レスポンスは「結果の番号」と「本文」の、', 'それぞれ2つの部分でできているんだ。'] }),
}));
