// 見本: 1-1-weather-example。共通部品（rich-lib.js）の使い方の手本。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;

const y0 = 280;
const body = `
  ${t(450, 38, '天気予報のページを開くと、こうなる', { size: SIZE.title, bold: true })}
${L.card({ x: 40, y: 62, w: 290, h: 200, color: 'blue', title: 'ブラウザ（クライアント）', sub: 'お願いを出す側' })}
  <g filter="url(#shadow)"><rect x="64" y="154" width="242" height="94" rx="10" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="1.5"/></g>
  <path d="M64 170 v-6 a10 10 0 0 1 10 -10 h222 a10 10 0 0 1 10 10 v6 z" fill="#cfe3fb" stroke="${C.blue.main}" stroke-width="1.5"/>
  <circle cx="78" cy="162" r="3.5" fill="#ef5350"/><circle cx="90" cy="162" r="3.5" fill="#ffb300"/><circle cx="102" cy="162" r="3.5" fill="#43a047"/>
  ${t(185, 194, '天気予報のページ', { bold: true, fill: C.blue.dark })}
  <circle cx="102" cy="224" r="16" fill="#fff3cd"/>
  <g transform="translate(88 210) scale(1.17)" fill="#ffb300" stroke="#e65100" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" fill="none"/></g>
  ${t(196, 229, '受け取った天気を表示', { size: SIZE.note, fill: C.orange.dark })}
${L.card({ x: 570, y: 62, w: 290, h: 200, color: 'green', title: 'サーバー', sub: 'お願いを受けて、情報を返す側' })}
  <g filter="url(#shadow)">
    <rect x="596" y="152" width="112" height="28" rx="7" fill="url(#rack)" stroke="${C.green.main}" stroke-width="1.5"/>
    <rect x="596" y="186" width="112" height="28" rx="7" fill="url(#rack)" stroke="${C.green.main}" stroke-width="1.5"/>
    <rect x="596" y="220" width="112" height="28" rx="7" fill="url(#rack)" stroke="${C.green.main}" stroke-width="1.5"/>
  </g>
  <g fill="#ffffff"><circle cx="612" cy="166" r="4"/><circle cx="612" cy="200" r="4"/><circle cx="612" cy="234" r="4"/></g>
  <g fill="#ffffff" opacity="0.5"><rect x="626" y="162" width="64" height="8" rx="4"/><rect x="626" y="196" width="64" height="8" rx="4"/><rect x="626" y="230" width="64" height="8" rx="4"/></g>
  ${t(786, 196, '天気の情報を', { bold: true, fill: C.green.dark })}
  ${t(786, 218, '持っている', { bold: true, fill: C.green.dark })}
  ${L.arrow({ x1: 344, y1: 148, x2: 552, y2: 148, color: 'blue' })}
${L.pill({ cx: 448, y: 102, w: 214, label: '今日の天気をください', n: '1', color: 'blue' })}
  ${L.arrow({ x1: 556, y1: 200, x2: 348, y2: 200, color: 'green' })}
${L.pill({ cx: 448, y: 214, w: 214, label: '天気の情報を返す', n: '2', color: 'green' })}`;

L.write('1-1-weather-example', L.svg({
  y0,
  title: '天気予報のページを開くとき、ブラウザがサーバーに天気の情報をお願いして、返ってきた情報を画面に表示する図',
  desc: 'ブラウザが「今日の天気をください」とサーバーにお願いし（1）、サーバーが天気の情報を返す（2）。猫の先生が、ブラウザは天気の情報を持っておらず、サーバーに聞いて画面に出しているだけだと説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['ブラウザは天気の情報を持っていないんだ。', 'サーバーに聞いて、返ってきた情報を画面に出しているだけだよ。'] }),
}));
