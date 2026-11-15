// 1-6-request-response: レストラン（黄=たとえ話）とこのシステムの対比。リクエスト=青、レスポンス=緑。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const yellowDefs = `<defs><linearGradient id="headYellow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd54f"/><stop offset="1" stop-color="#f9a825"/></linearGradient></defs>`;
const yCard = (x, y, w, h, title, sub) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#ffffff" stroke="#f9a825" stroke-width="2"/></g>
  <path d="M${x} ${y + 46} v-30 a16 16 0 0 1 16 -16 h${w - 32} a16 16 0 0 1 16 16 v30 z" fill="url(#headYellow)"/>
  ${t(x + w / 2, y + 31, title, { size: SIZE.head, bold: true, fill: '#5c3b00' })}
  ${t(x + w / 2, y + 46 + (h - 46) / 2 + 5, sub, { fill: SUB })}`;
const bCard = (x, y, w, h, color, title, sub) => L.card({ x, y, w, h, color, title }) + '\n  ' + t(x + w / 2, y + 46 + (h - 46) / 2 + 5, sub, { fill: SUB });
const section = (top, panel, label, left, right, reqLabel, resLabel) => `
  <rect x="20" y="${top}" width="860" height="200" rx="16" fill="${panel.fill}" stroke="${panel.stroke}" stroke-width="2"/>
  ${t(40, top + 30, label, { size: SIZE.head, bold: true, anchor: 'start', fill: panel.dark })}
  ${left(top + 48)}
  ${right(top + 48)}
  ${L.arrow({ x1: 268, y1: top + 112, x2: 632, y2: top + 112, color: 'blue' })}
${L.pill({ cx: 450, y: top + 66, w: 330, label: reqLabel, n: '1', color: 'blue' })}
  ${L.arrow({ x1: 632, y1: top + 144, x2: 268, y2: top + 144, color: 'green' })}
${L.pill({ cx: 450, y: top + 154, w: 330, label: resLabel, n: '2', color: 'green' })}`;
const body = yellowDefs + section(14, { fill: '#fffde7', stroke: '#f9a825', dark: '#8a5a00' }, 'レストランでは',
  (y) => yCard(50, y, 200, 140, 'ホール', '注文を受ける'), (y) => yCard(650, y, 200, 140, 'キッチン', '料理を作る'), '注文票を渡す', '料理を出す')
  + `\n  ${t(450, 244, '▼ WEBアプリケーションでは、こうなる ▼', { bold: true, fill: SUB })}`
  + section(262, { fill: '#f5f9ff', stroke: C.blue.main, dark: C.blue.dark }, 'このシステムの商品一覧では',
  (y) => bCard(50, y, 200, 140, 'blue', 'フロントエンド', '画面を作る'), (y) => bCard(650, y, 200, 140, 'green', 'バックエンド', '処理する'), 'リクエスト「商品の一覧をください」', 'レスポンス「商品の一覧です」');
const y0 = 478;
L.write('1-6-request-response', L.svg({
  y0,
  title: 'レストランの注文票と料理が、WEBアプリケーションのリクエストとレスポンスにあたることを示す図。上がレストラン、下がこのシステムの商品一覧',
  desc: 'レストランでは、ホールが注文を受けてキッチンへ注文票を渡し（1）、キッチンが料理を作って出す（2）。WEBアプリケーションでは、画面を作るフロントエンドがリクエスト「商品の一覧をください」を送り（1）、処理するバックエンドがレスポンス「商品の一覧です」を返す（2）。猫の先生が、ホールが注文票を渡して料理を受け取るのと同じで、フロントエンドがリクエストを送ってレスポンスを受け取ると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['ホールが注文票を渡して、料理を受け取るのと同じだよ。', 'フロントエンドがリクエストを送って、レスポンスを受け取るんだ！'] }),
}));
