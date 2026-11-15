// 09-flow-04-troubleshoot: 第9章 9-9 の flowchart TD（症状から確認する場所をたどる流れ）
const { C, t, lbl, nb, fin, arrow } = require('./_common-0809');

const cy = [70, 190, 310, 430, 550];
const targets = [
  ['App.tsx の import と Route の行、', 'path を確認する'],
  ['F12 の Console のエラーを読む'],
  ['input の onChange を確認する'],
  ['onClick に括弧を付けていないか', '確認する'],
  ['export と import のパスを確認する'],
];
const labels = [
  ['/message を開いても', '何も表示されない'],
  ['画面が真っ白'],
  ['入力欄に文字が打てない'],
  ['ボタンを押す前から', '表示される'],
  ['MessagePage が', '見つからない'],
];
const fan = cy.map((c) => `<line x1="264" y1="310" x2="556" y2="${c}" stroke="${C.gray.main}" stroke-width="4" stroke-linecap="round" marker-end="url(#arK)"/>`).join('\n  ');
const lb = cy.map((c, k) => lbl(460, 310 + 0.67 * (c - 310), labels[k], 'gray')).join('\n  ');
const tg = cy.map((c, k) => nb(560, c - 38, 320, 76, 'blue', targets[k])).join('\n  ');

const body = `
  ${nb(20, 50, 240, 60, 'red', ['うまく動かない'])}
  ${arrow({ x1: 140, y1: 114, x2: 140, y2: 266, color: 'red', width: 4 })}
  <g filter="url(#shadow)"><polygon points="20,310 140,270 260,310 140,350" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(140, 316, 'どんな症状か', { bold: true, fill: C.gray.dark })}
  ${fan}
  ${tg}
  ${lb}`;

fin('09-flow-04-troubleshoot', 604,
  '画面がうまく動かないとき、症状から確認する場所をたどる流れ',
  'うまく動かないときは、まずどんな症状かを見る。/message を開いても何も表示されないなら、App.tsx の import と Route の行と path を確認する。画面が真っ白なら、F12 の Console のエラーを読む。入力欄に文字が打てないなら、input の onChange を確認する。ボタンを押す前から表示されるなら、onClick に括弧を付けていないか確認する。MessagePage が見つからないなら、export と import のパスを確認する。',
  body);
