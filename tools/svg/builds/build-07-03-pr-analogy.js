// 07章: プルリクエストを「作文を先生に出して確認してもらう流れ」にたとえる図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const cols = [
  { x: 40, title: 'ノートに書く', l1: '自分用の写しに', l2: '作文を書く', git: ['ブランチで作業して', 'GitHub に送る'] },
  { x: 250, title: '先生に出す', l1: '「見てください」と', l2: '作文を出す', git: ['PR(プルリクエスト)', 'を作る'] },
  { x: 460, title: '先生が確認', l1: '直す所がないか', l2: '見てもらう', git: ['PR の画面で', '変更内容を確認する'] },
  { x: 670, title: '本物に貼る', l1: 'OK なら、本物の', l2: 'ノートに反映する', git: ['OK なら、マージして', 'main に取り込む'] },
];
const W = 185;
let body = `\n  ${t(450, 38, 'PR は、作文を先生に出して確認してもらう流れにそっくり', { size: SIZE.title, bold: true })}`;
cols.forEach((c, i) => {
  body += `\n${L.card({ x: c.x, y: 62, w: W, h: 130, color: 'yellow', title: c.title })}`;
  body += `\n${L.badge({ cx: c.x + 22, cy: 85, n: String(i + 1), color: 'gray' })}`;
  body += `\n  ${t(c.x + W / 2, 126, c.l1, { fill: C.yellow.dark })}\n  ${t(c.x + W / 2, 150, c.l2, { fill: C.yellow.dark })}`;
  body += `\n  ${L.arrow({ x1: c.x + W / 2, y1: 198, x2: c.x + W / 2, y2: 234, color: 'gray', width: 4 })}`;
  body += `\n  ${t(c.x + W / 2 + 10, 222, 'Git では', { size: SIZE.note, anchor: 'start', fill: C.gray.dark })}`;
  body += `\n  ${L.box({ x: c.x, y: 240, w: W, h: 70, color: 'gray' })}`;
  body += `\n  ${t(c.x + W / 2, 268, c.git[0], { bold: true, fill: C.gray.dark })}\n  ${t(c.x + W / 2, 291, c.git[1], { bold: true, fill: C.gray.dark })}`;
  if (i < cols.length - 1) body += `\n  ${L.arrow({ x1: c.x + W + 2, y1: 127, x2: c.x + W + 23, y2: 127, color: 'gray', width: 4 })}`;
});

const y0 = 326;
L.write('07-03-pr-analogy', L.svg({
  y0,
  title: 'プルリクエストは、作文を先生に出して確認してもらい、OK なら本物のノートに貼る流れにたとえられる図',
  desc: '作文のたとえは4つの順番で進む。1 自分用の写しに作文を書く（Git では、ブランチで作業して GitHub に送る）。2 先生に見てくださいと出す（PR を作る）。3 先生に直す所がないか見てもらう（PR の画面で変更内容を確認する）。4 OK なら本物のノートに反映する（マージして main に取り込む）。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['PR は、「この変更を取り込んでいい?」と', '人に確認してもらうための依頼なんだ。', '先生に作文を出す流れにそっくりだよ。'] }),
}));
