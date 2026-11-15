// 3-2-web-server: これまでの Java（終了する）と、バックエンド（待ち続ける）と、pom.xml・Maven の関係
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
// 手順の箱。lines は本文（13）。code は等幅にする行の番号
const step = ({ x, y, w, h, color, n, title, lines, mono = [] }) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>${n ? '\n  ' + L.badge({ cx: x + 20, cy: y + 20, n, color }) : ''}
  ${t(x + w / 2 + (n ? 8 : 0), y + 28, title, { bold: true, fill: C[color].dark })}
${lines.map((s, k) => '  ' + t(x + w / 2, y + 52 + k * 19, s, { size: SIZE.note, fill: C[color].dark, mono: mono.includes(k) })).join('\n')}`;
const panel = (y, h, color, title) => `
  <rect x="20" y="${y}" width="860" height="${h}" rx="16" fill="${C[color].light}" fill-opacity="0.5" stroke="${C[color].main}" stroke-width="2"/>
  ${t(40, y + 28, title, { bold: true, anchor: 'start', fill: C[color].dark })}`;
const body = `
${panel(15, 140, 'gray', 'これまでの Java プログラム：処理が終わったら、終了する')}
${step({ x: 60, y: 50, w: 200, h: 84, color: 'gray', n: '1', title: 'main が動く', lines: ['起動すると始まる'] })}
${step({ x: 350, y: 50, w: 200, h: 84, color: 'gray', n: '2', title: '処理する', lines: ['書いたとおりに実行'] })}
${step({ x: 640, y: 50, w: 200, h: 84, color: 'gray', n: '3', title: '終了する', lines: ['プログラムが止まる'] })}
  ${L.arrow({ x1: 262, y1: 92, x2: 346, y2: 92, color: 'gray', width: 5 })}
  ${L.arrow({ x1: 552, y1: 92, x2: 636, y2: 92, color: 'gray', width: 5 })}
${panel(175, 235, 'green', 'バックエンドの Java プログラム（WEBサーバー）：終了せずに、リクエストを待ち続ける')}
${step({ x: 40, y: 208, w: 190, h: 100, color: 'green', n: '1', title: '起動する', lines: ['app.start(8080)', '8080 番で待ち始める'], mono: [0] })}
${step({ x: 320, y: 208, w: 210, h: 100, color: 'green', n: '2', title: '待ち続ける', lines: ['フロントエンドから', 'リクエストが来るまで待つ'] })}
${step({ x: 640, y: 208, w: 220, h: 100, color: 'green', n: '3', title: '処理して、返す', lines: ['来たリクエストの処理を', '実行して、レスポンスを返す'] })}
  ${L.arrow({ x1: 232, y1: 258, x2: 316, y2: 258, color: 'green', width: 5 })}
  ${L.arrow({ x1: 532, y1: 258, x2: 636, y2: 258, color: 'green', width: 5 })}
  ${t(583, 244, '来た', { size: SIZE.note, bold: true, fill: C.green.dark })}
  <path d="M750,310 L750,350 L425,350 L425,314" fill="none" stroke="${C.green.main}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arG)"/>
  ${L.icon({ name: 'refresh', x: 576, y: 326, size: 22, color: C.green.dark })}
  ${t(604, 343, '返したら、また待つ', { size: SIZE.note, bold: true, anchor: 'start', fill: C.green.dark })}
  ${t(450, 390, 'このくり返しが、止められるまで続くよ', { size: SIZE.note, fill: SUB })}
${panel(430, 160, 'gray', 'backend/pom.xml：必要な部品の一覧。Maven が、これを読んで部品を用意する')}
${step({ x: 40, y: 466, w: 200, h: 106, color: 'gray', title: 'pom.xml', lines: ['「必要な部品は、', 'これとこれ」という一覧'] })}
${step({ x: 320, y: 466, w: 230, h: 106, color: 'gray', title: 'Maven', lines: ['Java のプログラムを', '組み立てる道具'] })}
  <g filter="url(#shadow)"><rect x="630" y="466" width="230" height="48" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  <text x="745" y="496" font-size="13" text-anchor="middle" fill="${C.green.dark}"><tspan font-weight="bold" font-size="15">Javalin</tspan>：WEBサーバー役</text>
  <g filter="url(#shadow)"><rect x="630" y="524" width="230" height="48" rx="12" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/></g>
  <text x="745" y="554" font-size="13" text-anchor="middle" fill="${C.orange.dark}"><tspan font-weight="bold" font-size="15">postgresql</tspan>：DB につなぐ役</text>
  ${L.arrow({ x1: 242, y1: 519, x2: 316, y2: 519, color: 'gray', width: 5 })}
  ${t(279, 505, '読む', { size: SIZE.note, bold: true, fill: C.gray.dark })}
  ${L.arrow({ x1: 552, y1: 519, x2: 626, y2: 519, color: 'gray', width: 5 })}
  ${t(589, 505, '用意する', { size: SIZE.note, bold: true, fill: C.gray.dark })}`;
const y0 = 606;
L.write('3-2-web-server', L.svg({
  y0,
  title: 'これまでの Java プログラムは終了するが、バックエンドは動き続けてリクエストを待つ。必要な部品は pom.xml に書く',
  desc: 'これまでの Java プログラムは、main が動き、処理して、終了する。バックエンドの Java プログラム（WEBサーバー）は、app.start(8080) で起動し、リクエストが来るまで待ち続け、来たら処理してレスポンスを返し、また待つ。このくり返しが止められるまで続く。pom.xml は必要な部品の一覧で、Maven が読んで、Javalin（WEBサーバー役）と postgresql（DB につなぐ役）を用意する。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['バックエンドは終わらずに動き続けて、', 'リクエストが来るのを待っているんだよ'] }),
}));
