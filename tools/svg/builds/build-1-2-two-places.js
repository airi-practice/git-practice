const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const y0 = 290;
const body = `
  ${t(450, 38, 'WEBアプリケーションは、動く場所が2つに分かれている', { size: SIZE.title, bold: true })}
${L.card({ x: 40, y: 62, w: 340, h: 210, color: 'blue', title: '1. ブラウザの中で動く部分' })}
  ${t(210, 130, '画面を表示する')}
  ${t(210, 156, 'ボタンや入力欄を')}
  ${t(210, 180, '操作できるようにする')}
  <g filter="url(#shadow)"><rect x="110" y="205" width="200" height="44" rx="10" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="1.5"/></g>
  <g transform="translate(120 215) scale(1)" fill="none" stroke="${C.blue.main}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/></g>
  ${t(222, 232, '見て、操作する場所', { bold: true, fill: C.blue.dark })}
${L.card({ x: 520, y: 62, w: 340, h: 210, color: 'green', title: '2. サーバーの中で動く部分' })}
  ${t(690, 130, 'データを保存する')}
  ${t(690, 156, '計算する')}
  ${t(690, 182, '判断する')}
  <rect x="560" y="205" width="260" height="44" rx="10" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${t(690, 233, 'さらに2つに分かれる（あとで説明）', { size: SIZE.note, fill: C.green.dark })}
  ${L.arrow({ x1: 394, y1: 132, x2: 506, y2: 132, color: 'blue' })}
  ${L.arrow({ x1: 506, y1: 212, x2: 394, y2: 212, color: 'green' })}
${L.pill({ cx: 450, y: 157, w: 100, label: 'やり取り', color: 'blue' })}`;
L.write('1-2-two-places', L.svg({
  y0,
  title: 'WEBアプリケーションは、ブラウザの中で動く部分と、サーバーの中で動く部分の2か所に分かれて動く図',
  desc: 'ブラウザの中で動く部分は、画面を表示し、ボタンや入力欄を操作できるようにする。サーバーの中で動く部分は、データを保存し、計算し、判断する。2つの部分は互いにやり取りをする。猫の先生が、Java のこれまでのプログラムは1つのパソコンの中だけで動いたが、WEBアプリケーションは動く場所が分かれていると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['Java のこれまでのプログラムは、1つのパソコンの中だけで動いたよね。', 'WEBアプリケーションは、動く場所が分かれているんだ。'] }),
}));
