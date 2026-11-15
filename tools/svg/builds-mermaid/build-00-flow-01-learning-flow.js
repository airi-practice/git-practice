// 00_はじめに.md の flowchart（学習の全体の流れ）
const { L, cardN, lab, finish } = require('./mm-a-common');
const X = 170, W = 560, CX = X + W / 2;
const cards = [
  { head: '第1章〜第8章', lines: ['仕組みを読んで理解する', '(WEBアプリの構成、画面、裏側、連携)'] },
  { head: '第9章・第10章', lines: ['画面とAPIを実際に1つずつ追加する', '(画面開発を体感する)'] },
  { head: '第11章〜第13章', lines: ['Spring Boot 版のバックエンドを学ぶ', '(起動、中身、backend との対応)'] },
  { head: '第14章', lines: ['Spring Boot 版にAPIを1つ追加する', '(実践手順書)'] },
];
const labels = ['仕組みが分かったら', '第10章まで終えたら', '中身が分かったら'];
const H = 106, GAP = 64, Y0 = 24;
let body = '';
cards.forEach((c, i) => {
  const y = Y0 + i * (H + GAP);
  body += '\n' + cardN({ x: X, y, w: W, color: 'gray', ...c });
  if (i < 3) {
    const y1 = y + H + 3, y2 = y + H + GAP - 3;
    body += '\n  ' + L.arrow({ x1: CX, y1, x2: CX, y2, color: 'gray' });
    body += '\n  ' + lab(CX + 14 + 90, y + H + 17, labels[i], 'gray').replace(/^\s+/, '');
  }
});
const bottom = Y0 + 4 * H + 3 * GAP;
finish('00-flow-01-learning-flow', bottom,
  '学習の全体の流れ。第1章〜第8章で仕組みを理解し、第9章・第10章で画面とAPIを追加し、第11章〜第13章でSpring Boot版を学び、第14章でSpring Boot版にAPIを追加する図',
  '上から下へ4つのステップが並ぶ。第1章〜第8章で仕組みを読んで理解する。仕組みが分かったら、第9章・第10章で画面とAPIを実際に1つずつ追加する。第10章まで終えたら、第11章〜第13章でSpring Boot版のバックエンドを学ぶ。中身が分かったら、第14章でSpring Boot版にAPIを1つ追加する。',
  body);
