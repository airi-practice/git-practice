// 07章: 06章の共有フォルダ(sample-shared)と、GitHub の対応を見せる図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const y0 = 288;
const body = `
  ${t(450, 38, '06章の共有フォルダを、インターネット上に置いたものが GitHub', { size: SIZE.title, bold: true })}
${L.card({ x: 40, y: 62, w: 300, h: 210, color: 'gray', title: '06章の共有の置き場所', sub: 'パソコンの中のフォルダ' })}
  <g filter="url(#shadow)"><path d="M140 176 a6 6 0 0 1 6 -6 h28 l8 9 h44 a6 6 0 0 1 6 6 v35 a6 6 0 0 1 -6 6 h-80 a6 6 0 0 1 -6 -6 z" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(190, 248, 'sample-shared', { bold: true, mono: true, fill: C.gray.dark })}
${L.card({ x: 560, y: 62, w: 300, h: 210, color: 'green', title: 'GitHub', sub: 'インターネット上の共有の置き場所' })}
  ${L.box({ x: 585, y: 156, w: 250, h: 50, color: 'green' })}
  ${t(710, 187, 'git-practice-exercise', { bold: true, mono: true, fill: C.green.dark })}
  ${t(710, 240, 'ほかの人も、どこからでも使える', { fill: C.green.dark })}
  ${L.arrow({ x1: 352, y1: 167, x2: 548, y2: 167, color: 'gray' })}
${L.pill({ cx: 450, y: 120, w: 170, label: 'ネット上へ移す', color: 'gray' })}`;

L.write('07-01-shelf-to-github', L.svg({
  y0,
  title: '06章でパソコンの中のフォルダ sample-shared で代わりにしていた共有の置き場所を、インターネット上に置いたものが GitHub である図',
  desc: '左は06章の共有の置き場所で、パソコンの中の sample-shared フォルダ。右は GitHub で、インターネット上の共有の置き場所。その中に、演習で使う git-practice-exercise という置き場所がある。GitHub は、ほかの人もどこからでも使える。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['06章の共有の置き場所が、パソコンの中から', 'インターネット上に移っただけなんだ。', '考え方は06章と同じだよ。'] }),
}));
