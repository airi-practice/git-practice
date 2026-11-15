// 01_WEBアプリケーションとは.md の1つ目の flowchart（レストランのたとえと3つの部分の対応）
const { L, cardN, lab, finish } = require('./mm-a-common');
const X = 250, W = 400, CX = X + W / 2;
const nodes = [
  { color: 'gray', head: 'お客さん', lines: ['（利用者）'] },
  { color: 'blue', head: 'ホール', lines: ['＝ フロントエンド', '見た目と接客を担当する'] },
  { color: 'green', head: 'キッチン', lines: ['＝ バックエンド', '注文を受けて調理する'] },
  { color: 'orange', head: '倉庫', lines: ['＝ データベース', '食材をしまっておく'] },
];
const arrows = [
  { go: 'gray', back: 'blue', label: '注文と料理' },
  { go: 'blue', back: 'green', label: '注文と料理' },
  { go: 'green', back: 'orange', label: '食材の出し入れ' },
];
const GAP = 90;
let y = 24, body = '';
nodes.forEach((n, i) => {
  body += '\n' + cardN({ x: X, y, w: W, ...n });
  const h = 84 + (n.lines.length - 1) * 22;
  if (i < 3) {
    const a = arrows[i];
    body += '\n  ' + L.biArrow({ x1: CX, y1: y + h + 3, x2: CX, y2: y + h + GAP - 3, colorGo: a.go, colorBack: a.back });
    body += '\n  ' + lab(CX + 24 + 60, y + h + GAP / 2 - 15, a.label, 'gray').replace(/^\s+/, '');
  }
  y += h + GAP;
});
const bottom = y - GAP;
finish('01-flow-01-restaurant-parts', bottom,
  'レストランのたとえと、3つの部分の対応を表した図。お客さん、ホール（フロントエンド）、キッチン（バックエンド）、倉庫（データベース）が、往復の矢印でつながっている',
  '上から順に、お客さん（利用者）、ホール＝フロントエンド（見た目と接客を担当する）、キッチン＝バックエンド（注文を受けて調理する）、倉庫＝データベース（食材をしまっておく）が並ぶ。お客さんとホールの間、ホールとキッチンの間は「注文と料理」が往復し、キッチンと倉庫の間は「食材の出し入れ」が往復する。',
  body);
