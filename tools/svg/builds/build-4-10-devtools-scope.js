// 4-10-devtools-scope: 開発者ツールで見えるのは、ブラウザが送った通信まで。Vite の中継のあと（バックエンド側）は見えない。
// ブラウザ・Vite はフロントエンド側なので青、バックエンドは緑。「見える」は強調の黄、「見えない」は中立の灰。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const lines = (x, y, a, b, c) => t(x, y, a, { fill: c }) + '\n  ' + t(x, y + 22, b, { fill: c });
const body = `
  ${L.card({ x: 20, y: 14, w: 220, h: 190, color: 'blue', title: 'ブラウザ（画面）' })}
  ${lines(130, 82, '/api/products を', 'fetch で送る', C.blue.dark)}
  <g filter="url(#shadow)"><rect x="34" y="124" width="192" height="64" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(130, 150, '開発者ツール', { size: SIZE.head, bold: true, fill: C.yellow.dark })}
  ${t(130, 174, '（F12 キーで開く）', { size: SIZE.note, fill: C.yellow.dark })}
  ${L.card({ x: 340, y: 14, w: 220, h: 190, color: 'blue', title: 'Vite（5173 番）' })}
  ${lines(450, 82, '/api で始まる通信を', '8080 番へ中継する', C.blue.dark)}
  ${L.card({ x: 660, y: 14, w: 220, h: 190, color: 'green', title: 'バックエンド' })}
  ${lines(770, 82, '8080 番で待ち受け、', 'Java が処理して返す', C.green.dark)}
  ${L.biArrow({ x1: 240, y1: 120, x2: 340, y2: 120, colorGo: 'blue', colorBack: 'blue' })}
  ${L.biArrow({ x1: 560, y1: 120, x2: 660, y2: 120, colorGo: 'blue', colorBack: 'green' })}
  ${L.pill({ cx: 290, y: 66, w: 80, label: '見える', color: 'yellow' })}
  ${L.pill({ cx: 610, y: 66, w: 90, label: '見えない', color: 'gray' })}
  ${L.arrow({ x1: 290, y1: 232, x2: 290, y2: 146, color: 'yellow', width: 4 })}
  ${L.arrow({ x1: 610, y1: 232, x2: 610, y2: 146, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="20" y="236" width="450" height="68" rx="12" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/></g>
  ${t(245, 262, '見える：ブラウザが送った通信', { bold: true, fill: C.yellow.dark })}
  ${t(245, 284, 'Request URL は、5173 番になっている', { fill: C.yellow.dark })}
  <g filter="url(#shadow)"><rect x="490" y="236" width="390" height="68" rx="12" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(685, 262, '見えない：Vite が中継したあと', { bold: true, fill: C.gray.dark })}
  ${t(685, 284, 'バックエンドのエラーは Eclipse のコンソールで見る', { size: SIZE.note, fill: C.gray.dark })}`;
const y0 = 320;
L.write('4-10-devtools-scope', L.svg({
  y0,
  title: '開発者ツールで見えるのは、ブラウザが Vite に送った通信までで、Vite がバックエンドへ中継したあとは見えないことを示した図',
  desc: '左から、ブラウザ（画面）、Vite（5173 番）、バックエンド（8080 番）が並ぶ。ブラウザの中に開発者ツールがある。ブラウザと Vite の間の通信は、開発者ツールで見える。Request URL は 5173 番になっている。Vite がバックエンドへ中継したあとの通信は、開発者ツールでは見えない。バックエンドの中のエラーは、Eclipse のコンソールで見る。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['開発者ツールに見えるのは、', 'ブラウザが送った分までなんだ'] }),
}));
