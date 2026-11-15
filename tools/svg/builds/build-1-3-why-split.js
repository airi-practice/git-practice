const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const RED = '#c62828';
const y0 = 392;
const gcard = (x, title) => `
  <g filter="url(#shadow)"><rect x="${x}" y="62" width="270" height="300" rx="16" fill="#ffffff" stroke="#64748b" stroke-width="2"/></g>
  <path d="M${x} 108 v-30 a16 16 0 0 1 16 -16 h238 a16 16 0 0 1 16 16 v30 z" fill="url(#headGray)"/>
  ${t(x + 135, 93, title, { size: SIZE.head, bold: true, fill: '#ffffff' })}`;
const ic = (x, y, color, paths) => `<g transform="translate(${x} ${y})" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`;
const eye = (x, y, c) => ic(x, y, c, '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>');
const lock = (x, y, c) => ic(x, y, c, '<path d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4"/>');
const body = `
  <defs><linearGradient id="headGray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b8a9e"/><stop offset="1" stop-color="#586579"/></linearGradient></defs>
  ${t(450, 38, '分けるのには、理由が3つある（天気予報のページの例）', { size: SIZE.title, bold: true })}
${gcard(20, '1. 秘密を守るため')}
${L.box({ x: 34, y: 122, w: 112, h: 96, color: 'blue' })}
  ${eye(78, 128, RED)}
  ${t(90, 177, 'ブラウザ', { fill: C.blue.dark })}
  ${t(90, 202, 'パスワード', { bold: true, fill: RED })}
${L.box({ x: 164, y: 122, w: 112, h: 96, color: 'green' })}
  ${lock(208, 128, C.green.main)}
  ${t(220, 177, 'サーバー', { fill: C.green.dark })}
  ${t(220, 202, 'パスワード', { bold: true, fill: C.green.dark })}
  ${t(90, 242, '利用者に見られる', { size: SIZE.note, bold: true, fill: RED })}
  ${t(220, 242, '見られない', { size: SIZE.note, bold: true, fill: C.green.dark })}
  ${t(155, 290, '天気の情報をしまった')}
  ${t(155, 316, '場所に入るパスワードは、')}
  ${t(155, 342, 'ブラウザに入れてはいけない')}
${gcard(315, '2. 全員で同じ情報を使うため')}
  ${[0, 1, 2].map((i) => L.box({ x: 333, y: 126 + i * 46, w: 92, h: 36, color: 'blue' }) + '\n  ' + t(379, 150 + i * 46, 'ブラウザ', { fill: C.blue.dark })).join('\n  ')}
  ${L.arrow({ x1: 430, y1: 144, x2: 462, y2: 176, color: 'blue', width: 4 })}
  ${L.arrow({ x1: 430, y1: 190, x2: 460, y2: 190, color: 'blue', width: 4 })}
  ${L.arrow({ x1: 430, y1: 236, x2: 462, y2: 204, color: 'blue', width: 4 })}
${L.box({ x: 470, y: 142, w: 102, h: 96, color: 'green' })}
  ${t(521, 177, 'サーバー', { fill: C.green.dark })}
  ${t(521, 202, '今日の天気', { bold: true, fill: C.green.dark })}
  ${t(450, 290, '全員が同じ今日の天気を見る。')}
  ${t(450, 316, '1人1人のブラウザに持たせると、')}
  ${t(450, 342, '人によって天気が違ってしまう')}
${gcard(610, '3. 直しやすくするため')}
${L.box({ x: 624, y: 122, w: 114, h: 110, color: 'blue' })}
  ${t(681, 152, '画面の', { fill: C.blue.dark })}
  ${t(681, 174, '見た目', { fill: C.blue.dark })}
  ${t(681, 214, '← 直す', { bold: true, fill: RED })}
${L.box({ x: 752, y: 122, w: 114, h: 110, color: 'green' })}
  ${t(809, 152, '天気を集めて', { fill: C.green.dark })}
  ${t(809, 174, '返す処理', { fill: C.green.dark })}
  ${t(809, 214, 'そのまま', { bold: true, fill: C.green.dark })}
  ${t(745, 290, '見た目を変えたいとき、')}
  ${t(745, 316, '天気を集める処理まで')}
  ${t(745, 342, '読み直さなくて済む')}`;
L.write('1-3-why-split', L.svg({
  y0,
  title: '画面を表示する側と裏側で処理する側に分ける3つの理由。パスワードを隠すため、全員が同じ天気を見るため、役割ごとに直せるようにするため',
  desc: '1つ目は秘密を守るため。パスワードをブラウザに置くと利用者に見られるが、サーバーに置けば見られない。2つ目は全員で同じ情報を使うため。複数のブラウザが1つのサーバーの今日の天気を見る。3つ目は直しやすくするため。画面の見た目を直しても、天気を集めて返す処理はそのままでよい。猫の先生が、分ける理由は3つあると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['分ける理由は3つあるよ。', 'パスワードを隠すため、全員が同じ天気を見るため、', '見た目と処理を別々に直しやすくするためなんだ。'] }),
}));
