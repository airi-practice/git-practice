// 08章: 体験①②③で、どのブランチをどこに取り込む PR を作るかを見せる図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const rows = [
  { y: 62, n: '1', color: 'green', title: 'ks/banana', sub: '新しいファイルを作る', pill: 'PR だけ作る(マージしない)', pillColor: 'gray', tcolor: 'gray', ttitle: 'main', tsub: '変わらない' },
  { y: 170, n: '2', color: 'yellow', title: 'ks/banana-2', sub: '既存のファイルを書き換える', pill: 'PR だけ作る(マージしない)', pillColor: 'gray', tcolor: 'gray', ttitle: 'main', tsub: '変わらない' },
  { y: 278, n: '3', color: 'yellow', title: 'ks/banana-3', sub: '②から枝を伸ばして、1行追加', pill: 'PR を作って、マージする', pillColor: 'blue', tcolor: 'yellow', ttitle: 'ks/banana-2(②のブランチ)', tsub: '③の変更が取り込まれる' },
];
let body = `\n  ${t(450, 38, '体験①②③で作る PR と、取り込み先', { size: SIZE.title, bold: true })}`;
rows.forEach((r) => {
  body += `\n${L.card({ x: 40, y: r.y, w: 300, h: 90, color: r.color, title: r.title, sub: r.sub })}`;
  body += `\n${L.badge({ cx: 22, cy: r.y + 23, n: r.n, color: 'gray' })}`;
  body += `\n  ${L.arrow({ x1: 352, y1: r.y + 52, x2: 548, y2: r.y + 52, color: r.pillColor })}`;
  body += `\n${L.pill({ cx: 450, y: r.y + 6, w: 190, label: r.pill, color: r.pillColor })}`;
  body += `\n${L.card({ x: 560, y: r.y, w: 300, h: 90, color: r.tcolor, title: r.ttitle, sub: r.tsub })}`;
});
body += `\n  ${L.arrow({ x1: 190, y1: 262, x2: 190, y2: 276, color: 'gray', width: 4 })}`;

const y0 = 384;
L.write('08-01-three-experiences', L.svg({
  y0,
  title: '体験①②③で作る PR と取り込み先を示す図。①は ks/banana から main へ、②は ks/banana-2 から main へ、どちらも PR だけ作ってマージしない。③は ②のブランチから伸ばした ks/banana-3 から ks/banana-2 へ PR を作り、マージする',
  desc: '体験①は、新しいファイルを作った ks/banana のブランチで、main を取り込み先にした PR を作る。体験②は、既存のファイルを書き換えた ks/banana-2 のブランチで、main を取り込み先にした PR を作る。どちらもマージしない。体験③は、②のブランチから枝を伸ばした ks/banana-3 で、取り込み先を ks/banana-2 にした PR を作り、マージする。main にはどの体験でも取り込まない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['どの体験でも、main には取り込まないよ。', 'マージするのは、③で②のブランチに入れるときだけ。'] }),
}));
