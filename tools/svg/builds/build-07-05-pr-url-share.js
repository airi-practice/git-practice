// 07章: PR の URL を送ると、他の人がスマホなどから同じ PR の画面を見られることを示す図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const y0 = 331;
const body = `
  ${t(450, 38, 'PR を作ると、URL で他の人に見てもらえる', { size: SIZE.title, bold: true })}
${L.card({ x: 40, y: 62, w: 200, h: 180, color: 'blue', title: 'あなたのパソコン' })}
  <g filter="url(#shadow)"><rect x="60" y="122" width="160" height="100" rx="10" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="1.5"/></g>
  <path d="M60 138 v-6 a10 10 0 0 1 10 -10 h140 a10 10 0 0 1 10 10 v6 z" fill="#cfe3fb" stroke="${C.blue.main}" stroke-width="1.5"/>
  <circle cx="74" cy="130" r="3.5" fill="#ef5350"/><circle cx="86" cy="130" r="3.5" fill="#ffb300"/><circle cx="98" cy="130" r="3.5" fill="#43a047"/>
  ${t(140, 182, 'PR を作った', { bold: true, fill: C.blue.dark })}
${L.card({ x: 350, y: 62, w: 200, h: 180, color: 'green', title: 'GitHub' })}
  ${L.box({ x: 370, y: 122, w: 160, h: 100, color: 'green' })}
  ${t(450, 158, 'PR のページ', { bold: true, fill: C.green.dark })}
  ${t(450, 192, 'github.com/…/pull/1', { size: SIZE.note, mono: true, fill: C.green.dark })}
${L.card({ x: 660, y: 62, w: 200, h: 180, color: 'blue', title: '他の人のスマホ' })}
  <g filter="url(#shadow)"><rect x="718" y="116" width="84" height="118" rx="12" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="2"/></g>
  <rect x="726" y="128" width="68" height="84" rx="4" fill="#ffffff" stroke="${C.blue.main}" stroke-width="1"/>
  ${t(760, 164, 'PR の', { size: SIZE.note, fill: C.blue.dark })}${t(760, 184, 'ページ', { size: SIZE.note, fill: C.blue.dark })}
  <circle cx="760" cy="224" r="4" fill="${C.blue.main}"/>
  ${L.arrow({ x1: 244, y1: 142, x2: 346, y2: 142, color: 'blue' })}
${L.pill({ cx: 295, y: 160, w: 104, label: 'PR を作る', n: '1', color: 'blue' })}
  ${L.arrow({ x1: 656, y1: 142, x2: 554, y2: 142, color: 'blue' })}
${L.pill({ cx: 605, y: 160, w: 108, label: 'URL を開く', n: '3', color: 'blue' })}
  <path d="M140 244 V300 H760 V250" fill="none" stroke="${C.blue.main}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arB)"/>
${L.pill({ cx: 450, y: 285, w: 300, label: 'URL を送る(LINE・メールなど)', n: '2', color: 'blue' })}`;

L.write('07-05-pr-url-share', L.svg({
  y0,
  title: 'PR を作ると、PR のページの URL ができる。その URL を送れば、他の人がスマホなどで同じページを開いて変更内容を見られる図',
  desc: '1 あなたのパソコンで GitHub に PR を作る。2 PR の URL を LINE やメールなどで、他の人のスマホに送る。3 他の人がスマホで URL を開くと、GitHub の PR のページが見える。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['PR の URL を送れば、', '他の人も同じ変更内容を見られるんだ。', 'スマホからでも開けるよ。'] }),
}));
