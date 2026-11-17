// 05章 §3: 作文のたとえで、同じ段落を別々に書き換えると競合になることを見せる図。
// 見た目は 05-01-essay-copies.svg（黄の枠＋灰の矢印）にそろえる。コピーA = main、コピーB = feature-b。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

let body = `\n  ${t(40, 40, '同じ段落を別々に書き換えると、どちらを残すか決められない', { size: SIZE.title, bold: true, fill: C.gray.dark, anchor: 'start' })}`;

// 元の作文
body += `\n${L.card({ x: 40, y: 134, w: 190, h: 100, color: 'yellow', title: '元の作文' })}`;
body += `\n  ${t(135, 200, '分ける前の記録', { fill: C.yellow.dark })}`;

// コピーA・コピーB
const copies = [
  { y: 70, title: 'コピーA = main', l1: '同じ段落を、', l2: 'ある文に書き換える' },
  { y: 200, title: 'コピーB = feature-b', l1: '同じ段落を、', l2: '別の文に書き換える' },
];
copies.forEach((c) => {
  body += `\n${L.card({ x: 330, y: c.y, w: 240, h: 110, color: 'yellow', title: c.title })}`;
  body += `\n  ${t(450, c.y + 76, c.l1, { fill: C.yellow.dark })}\n  ${t(450, c.y + 98, c.l2, { fill: C.yellow.dark })}`;
});

// 元 → コピーA・B
body += `\n  ${L.arrow({ x1: 236, y1: 168, x2: 322, y2: 130, color: 'gray', width: 4 })}`;
body += `\n  ${L.arrow({ x1: 236, y1: 200, x2: 322, y2: 240, color: 'gray', width: 4 })}`;

// コピーA・B → 競合
body += `\n  ${L.arrow({ x1: 576, y1: 130, x2: 664, y2: 166, color: 'gray', width: 4 })}`;
body += `\n  ${L.arrow({ x1: 576, y1: 240, x2: 664, y2: 204, color: 'gray', width: 4 })}`;
body += `\n  ${t(620, 192, 'まとめる', { size: SIZE.note, fill: C.gray.dark })}`;

// 競合
body += `\n${L.card({ x: 670, y: 130, w: 190, h: 110, color: 'red', title: '競合' })}`;
body += `\n  ${t(765, 200, 'どちらの文を残すか', { fill: C.red.dark })}\n  ${t(765, 222, '決められない', { fill: C.red.dark, bold: true })}`;

const y0 = 330;
L.write('05-06-conflict-essay', L.svg({
  y0,
  title: '作文のコピーAとコピーBで同じ段落を違う文に書き換えると、まとめるときに競合になる図',
  desc: '元の作文(分ける前の記録)を、コピーAとコピーBの2枚に分ける。コピーAはmain、コピーBはfeature-bに当たる。コピーAでは同じ段落をある文に、コピーBでは同じ段落を別の文に書き換える。2枚を1枚にまとめるとき、どちらの文を残すか決められない。この状態が競合である。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['同じ段落を2人が違う文にしたら、', 'どちらを残すかは、', '作文を書いた人が決めるしかないよね'] }),
}));
