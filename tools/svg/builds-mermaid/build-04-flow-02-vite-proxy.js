const { L, node, label, finish } = require('./_common');
const Y = 85, H = 110;
const body = `
  ${node({ x: 20, y: Y, w: 160, h: H, color: 'blue', lines: ['ブラウザ', 'fetch で', '/api/products を', '呼ぶ'], bold1: true })}
  ${node({ x: 370, y: Y, w: 160, h: H, color: 'blue', lines: ['Vite', '（localhost:5173）'], bold1: true })}
  ${node({ x: 720, y: Y, w: 160, h: H, color: 'green', lines: ['バックエンド', '（localhost:8080）'], bold1: true })}
  ${L.arrow({ x1: 184, y1: 105, x2: 366, y2: 105, color: 'blue' })}
  ${L.arrow({ x1: 534, y1: 105, x2: 716, y2: 105, color: 'blue' })}
  ${L.arrow({ x1: 716, y1: 175, x2: 534, y2: 175, color: 'green' })}
  ${L.arrow({ x1: 366, y1: 175, x2: 184, y2: 175, color: 'blue' })}
  ${label({ cx: 275, cy: 57, w: 180, lines: ['今ページを', '配信している', 'Vite へ送る'], color: 'blue', n: '1' })}
  ${label({ cx: 625, cy: 57, w: 180, lines: ['/api で始まるので', '中継する'], color: 'blue', n: '2' })}
  ${label({ cx: 625, cy: 226, w: 180, lines: ['レスポンスを返す'], color: 'green', n: '3' })}
  ${label({ cx: 275, cy: 226, w: 180, lines: ['そのままブラウザへ', '返す'], color: 'blue', n: '4' })}`;
finish('04-flow-02-vite-proxy', {
  bottom: 262, body,
  title: 'ブラウザが fetch で /api/products を呼ぶと、1 今ページを配信している Vite（localhost:5173）へ送られ、2 /api で始まるので、バックエンド（localhost:8080）へ中継され、3 レスポンスが Vite に返り、4 そのままブラウザへ返る図',
  desc: '4つの矢印を、番号の順にたどる。1 ブラウザから Vite へ、今ページを配信している Vite へ送る。2 Vite からバックエンドへ、/api で始まるので中継する。3 バックエンドから Vite へ、レスポンスを返す。4 Vite からブラウザへ、そのまま返す。',
});
