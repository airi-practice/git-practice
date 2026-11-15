// 09-flow-01-file-roles: 第9章 冒頭の flowchart LR（App.tsx・MessagePage.tsx・index.css がブラウザの画面になるまで）
const { C, L, lbl, nb, cd, frame, dash, fin, arrow } = require('./_common-0809');

const body = `
  ${frame(20, 150, 860, 440, 'blue', 'frontend/src（画面）', { x: 864, anchor: 'end' })}
  ${nb(40, 40, 300, 52, 'blue', ['ブラウザで /message を開く'])}
  ${cd(40, 236, 270, 120, 'blue', 'App.tsx（既存を変更）', ['パスと画面を結びつける', 'import 1行と Route 1行を足す'])}
  ${cd(540, 236, 320, 120, 'blue', 'pages/MessagePage.tsx（新規）', ['画面の中身を書く', '入力欄・ボタン・表示領域'])}
  ${cd(40, 450, 280, 120, 'blue', 'index.css（既存を変更）', ['見た目を決める', '.message のスタイルを足す'])}
  ${nb(550, 640, 300, 52, 'blue', ['ブラウザに表示される'])}
  ${arrow({ x1: 190, y1: 96, x2: 190, y2: 232, color: 'blue', width: 4 })}
  ${arrow({ x1: 314, y1: 296, x2: 536, y2: 296, color: 'blue', width: 4 })}
  ${dash(324, 505, 660, 360)}
  ${arrow({ x1: 700, y1: 360, x2: 700, y2: 636, color: 'blue', width: 4 })}
  ${L.pill({ cx: 190, y: 106, w: 120, label: 'パスを渡す', color: 'blue' })}
  ${lbl(425, 296, ['/message に合う Route が', 'MessagePage を選ぶ'], 'blue')}
  ${lbl(490, 432, ['className が message の', '表示領域に適用される'], 'gray')}
  ${lbl(700, 498, ['できあがった画面'], 'blue')}`;

fin('09-flow-01-file-roles', 708,
  'App.tsx・MessagePage.tsx・index.css が、ブラウザの画面になるまでの流れ',
  'ブラウザで /message を開くと、パスが App.tsx に渡される。App.tsx は import 1行と Route 1行を足した既存のファイルで、/message に合う Route が pages/MessagePage.tsx（新規）を選ぶ。index.css（既存を変更）の .message のスタイルは、className が message の表示領域に適用される。できあがった画面が、ブラウザに表示される。',
  body);
