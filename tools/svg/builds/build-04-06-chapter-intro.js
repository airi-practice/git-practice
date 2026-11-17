// 04章: 導入。取り消す前に別の場所で試す考え方と、ブランチ(履歴の枝分かれ)、章の流れ。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const steps = [
  { x: 40, color: 'gray', title: '03章', l: ['記録した変更を', '取り消す方法'] },
  { x: 330, color: 'yellow', title: 'この章', l: ['取り消す前に、', '別の場所で試す'] },
  { x: 620, color: 'gray', title: '最後に', l: ['ブランチを作って切り替え、', 'memo.txt の中身の変化を確かめる'] },
];
let body = `\n  ${t(450, 38, 'ブランチで、作業を別々に進める', { size: SIZE.title, bold: true })}`;
steps.forEach((s, i) => {
  body += `\n${L.card({ x: s.x, y: 62, w: 240, h: 120, color: s.color, title: s.title })}`;
  s.l.forEach((l, k) => { body += `\n  ${t(s.x + 120, 140 + k * 22, l, { fill: C[s.color].dark, size: i === 2 ? SIZE.note : SIZE.body })}`; });
  if (i < 2) body += `\n  ${L.arrow({ x1: s.x + 244, y1: 117, x2: s.x + 286, y2: 117, color: 'gray', width: 4 })}`;
});
// 枝分かれの図
body += `
  ${L.box({ x: 40, y: 196, w: 820, h: 130, color: 'gray' })}
  ${t(60, 222, 'ブランチは、記録の流れ(履歴)を途中から枝分かれさせる仕組み', { size: SIZE.body, bold: true, anchor: 'start', fill: C.gray.dark })}
  <path d="M110 296 H330" stroke="${C.gray.main}" stroke-width="4" stroke-linecap="round"/>
  <path d="M330 296 C360 296 365 258 395 258 H610" stroke="${C.yellow.main}" stroke-width="4" stroke-linecap="round" fill="none"/>
  ${[130, 210, 290].map((x) => `<circle cx="${x}" cy="296" r="9" fill="${C.gray.main}"/>`).join('')}
  ${[440, 520].map((x) => `<circle cx="${x}" cy="258" r="9" fill="${C.yellow.main}"/>`).join('')}
  ${t(110, 322, 'main', { size: SIZE.note, bold: true, anchor: 'start', fill: C.gray.dark, mono: true })}
  ${t(440, 244, '別のブランチ', { size: SIZE.note, bold: true, anchor: 'start', fill: C.yellow.dark })}
  ${t(640, 278, '枝分かれすると、', { anchor: 'start', fill: C.gray.dark })}
  ${t(640, 302, '作業を別々に進められる', { anchor: 'start', fill: C.gray.dark })}`;

const y0 = 342;
L.write('04-06-chapter-intro', L.svg({
  y0,
  title: '04章の流れ。03章の取り消す方法の次に、取り消す前に別の場所で試す考え方を学び、最後にブランチを作って切り替える図',
  desc: '上の段は章の流れ。03章で記録した変更を取り消す方法を学び、この章では取り消す前に別の場所で試す考え方を学び、最後にブランチを作って切り替えて memo.txt の中身の変化を確かめる。下の段は、記録の流れ（履歴）が main の途中から別のブランチに枝分かれする様子で、枝分かれすると作業を別々に進められる。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['いまの内容は残したまま、', '別の場所で試せるのがブランチなんだ。'] }),
}));
