// 01章: Git(文字で操作)と TortoiseGit(右クリックやボタンで操作)の対比図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const col = (x, color, title, lines) => {
  let s = L.card({ x, y: 62, w: 390, h: 250, color, title });
  lines.forEach((l, i) => { s += `\n  ${t(x + 195, 262 + i * 24, l, { fill: C[color].dark, bold: i === 0 })}`; });
  return s;
};

// 左: 文字を打ち込む画面のイメージ
const term = `
  <rect x="100" y="130" width="270" height="100" rx="8" fill="#1e293b" stroke="${C.gray.main}" stroke-width="2"/>
  ${t(118, 170, '> 文字を打ち込む', { anchor: 'start', size: SIZE.body, fill: '#ffffff', mono: true })}
  <rect x="118" y="186" width="10" height="20" fill="#ffffff"/>`;
// 右: 右クリックのメニューとボタンのイメージ
const menu = `
  <rect x="525" y="124" width="160" height="108" rx="8" fill="#ffffff" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(540, 152, '右クリックの', { anchor: 'start', size: SIZE.note, fill: C.yellow.dark })}
  ${t(540, 172, 'メニュー', { anchor: 'start', size: SIZE.body, bold: true, fill: C.yellow.dark })}
  <rect x="540" y="190" width="130" height="28" rx="6" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="1.5"/>
  ${t(605, 209, 'メニューの項目', { size: SIZE.note, fill: C.yellow.dark })}
  <rect x="705" y="156" width="110" height="40" rx="8" fill="url(#headYellow)"/>
  ${t(760, 182, 'ボタン', { size: SIZE.body, bold: true, fill: '#5c3d00' })}`;

const body = `\n  ${t(450, 38, 'Git は文字で操作、TortoiseGit は右クリックやボタンで操作', { size: SIZE.title, bold: true })}
${col(40, 'gray', 'Git そのもの', ['文字を打ち込んで操作する道具'])}
${term}
${col(470, 'yellow', 'TortoiseGit', ['右クリックのメニューやボタンで操作できる', 'Git を操作しやすくするための画面付きの道具'])}
${menu}
`;

const y0 = 328;
L.write('01-05-git-vs-tortoisegit', L.svg({
  y0,
  title: 'Git は文字を打ち込んで操作する道具、TortoiseGit は右クリックのメニューやボタンで操作できる道具という対比図',
  desc: '左は Git そのもの。文字を打ち込んで操作する道具。右は TortoiseGit。右クリックのメニューやボタンで操作できる、Git を操作しやすくするための画面付きの道具で、この教材ではこちらを使う。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['この教材では、右クリックで操作できる', 'TortoiseGit を使っていくよ。'] }),
}));
