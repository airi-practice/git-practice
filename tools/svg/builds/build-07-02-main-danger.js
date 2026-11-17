// 07章: main に直接送る場合と、自分のブランチに送る場合の違いを見せる図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const y0 = 368;
const body = `
  ${t(450, 38, '作りかけの変更を、どこに送るか', { size: SIZE.title, bold: true })}
${L.card({ x: 30, y: 62, w: 410, h: 290, color: 'red', title: 'main に直接送ると' })}
  ${L.box({ x: 150, y: 120, w: 170, h: 40, color: 'gray' })}
  ${t(235, 146, '作りかけの変更', { bold: true, fill: C.gray.dark })}
  ${L.arrow({ x1: 235, y1: 166, x2: 235, y2: 202, color: 'red' })}
  ${L.box({ x: 56, y: 208, w: 358, h: 62, color: 'red' })}
  ${t(235, 234, 'main(みんなが見る完成版)', { bold: true, fill: C.red.dark })}
  ${t(235, 258, '書き換わってしまう', { fill: C.red.dark })}
  ${t(235, 302, '作りかけの内容が、みんなに', { bold: true, fill: C.red.dark })}
  ${t(235, 326, 'そのまま見えてしまう', { bold: true, fill: C.red.dark })}
${L.card({ x: 460, y: 62, w: 410, h: 290, color: 'green', title: '自分のブランチに送ると' })}
  ${L.box({ x: 580, y: 120, w: 170, h: 40, color: 'gray' })}
  ${t(665, 146, '作りかけの変更', { bold: true, fill: C.gray.dark })}
  ${L.arrow({ x1: 665, y1: 166, x2: 665, y2: 198, color: 'green' })}
  ${L.box({ x: 486, y: 204, w: 358, h: 44, color: 'green' })}
  ${t(665, 232, 'ks/banana(あなた専用のブランチ)', { bold: true, fill: C.green.dark })}
  ${L.box({ x: 486, y: 262, w: 358, h: 62, color: 'gray' })}
  ${t(665, 288, 'main(みんなが見る完成版)', { bold: true, fill: C.gray.dark })}
  ${t(665, 312, '変わらない', { fill: C.gray.dark })}`;

L.write('07-02-main-danger', L.svg({
  y0,
  title: '作りかけの変更を main に直接送ると、みんなが見る完成版が書き換わる。自分のブランチに送れば、main は変わらない図',
  desc: '左は、作りかけの変更を main に直接送る場合で、みんなが見る完成版の main が書き換わり、作りかけの内容がみんなに見えてしまう。右は、自分専用のブランチ ks/banana に送る場合で、main は変わらない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['main は、みんなが見る完成版なんだ。', '作業は自分のブランチでやって、', 'main には直接送らないようにしよう。'] }),
}));
