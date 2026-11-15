// 06_画面開発で行うこと.md の1つ目の flowchart（やりたいことから、変更するファイルまでの道筋）
const { L, diamond, boxN, lab, trunk, finish } = require('./mm-a-common');
const SX = 140;
let body = '';
body += '\n' + boxN({ x: SX - 100, y: 24, w: 200, h: 48, color: 'gray', lines: ['やりたいこと'] });
body += '\n  ' + L.arrow({ x1: SX, y1: 75, x2: SX, y2: 107, color: 'gray' });
body += '\n' + diamond({ cx: SX, cy: 155, w: 220, h: 90, color: 'gray', lines: ['画面の中だけで', '済むか'] });
// 済む
body += '\n  ' + L.arrow({ x1: SX, y1: 203, x2: SX, y2: 272, color: 'gray' });
body += '\n  ' + lab(SX + 14 + 32, 222, '済む', 'gray').replace(/^\s+/, '');
body += '\n' + diamond({ cx: SX, cy: 320, w: 220, h: 90, color: 'gray', lines: ['何を変えるか'] });
body += '\n  ' + trunk(SX, 368, SX, 662, 'gray');
const rows = [
  ['色や余白', ['index.css']],
  ['文章や部品の並び', ['pages/ の return の中']],
  ['ボタンや入力欄', ['pages/ に useState、関数、タグを追加']],
  ['画面を増やす', ['pages/ に新しいファイル + App.tsx に Route を1行']],
];
rows.forEach(([label, lines], i) => {
  const cy = 440 + i * 74;
  body += '\n  ' + L.arrow({ x1: SX, y1: cy, x2: 327, y2: cy, color: 'gray' });
  body += '\n  ' + lab(233, cy - 15, label, 'gray').replace(/^\s+/, '');
  body += '\n' + boxN({ x: 330, y: cy - 24, w: 550, h: 48, color: 'blue', lines });
});
// バックエンドが必要
body += '\n  ' + L.arrow({ x1: SX + 112, y1: 155, x2: 437, y2: 155, color: 'gray' });
body += '\n  ' + lab(343, 140, 'バックエンドが必要', 'gray').replace(/^\s+/, '');
body += '\n' + boxN({ x: 440, y: 131, w: 440, h: 48, color: 'blue', lines: ['フロントエンド：types/ api/ pages/'] });
body += '\n  ' + L.arrow({ x1: 660, y1: 182, x2: 660, y2: 232, color: 'blue' });
body += '\n' + boxN({ x: 440, y: 235, w: 440, h: 114, color: 'green', lines: [
  'バックエンド：api/ に XxxApi.java を作り、',
  'App.java に1行足す',
  '値を持つクラスが要るなら dto/ にも作る',
  'データベースを使うなら、XxxApi.java の中で SQL を送る',
] });
finish('06-flow-01-change-path', 686,
  'やりたいことから、変更するファイルまでの道筋。画面の中だけで済むなら、変えるものに応じて index.css や pages/ を変え、バックエンドが必要なら、フロントエンドとバックエンドの両方にファイルを作る図',
  'やりたいことから始まり、画面の中だけで済むかを判断する。済むなら、何を変えるかで分かれる。色や余白は index.css、文章や部品の並びは pages/ の return の中、ボタンや入力欄は pages/ に useState、関数、タグを追加、画面を増やすなら pages/ に新しいファイルと App.tsx に Route を1行。バックエンドが必要なら、フロントエンドは types/ api/ pages/、バックエンドは api/ に XxxApi.java を作り App.java に1行足す。値を持つクラスが要るなら dto/ にも作り、データベースを使うなら XxxApi.java の中で SQL を送る。',
  body);
