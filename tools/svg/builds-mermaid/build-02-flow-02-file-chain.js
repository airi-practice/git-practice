// 02_画面の作り方.md の2つ目の flowchart（ファイルと部品のつながり）
const { L, cardN, lab, finish } = require('./mm-a-common');
const X = 100, W = 560, CX = 330;
const cards = [
  { head: 'index.html', lines: ['中身が空の入れ物 div id=root がある'] },
  { head: 'main.tsx', lines: ['root の中に、BrowserRouter で囲んだ App を表示する'] },
  { head: 'App.tsx', lines: ['パスに合う画面を Routes の中から選ぶ'] },
  { head: 'ProductListPage.tsx', lines: ['パスが /products のときに表示する、商品一覧の画面'] },
];
const labels = ['script で読み込む', 'render', 'パスが /products のとき'];
const H = 84, GAP = 70, Y0 = 24;
let body = '';
cards.forEach((c, i) => {
  const y = Y0 + i * (H + GAP);
  body += '\n' + cardN({ x: X, y, w: W, color: 'blue', ...c });
  if (i < 3) {
    body += '\n  ' + L.arrow({ x1: CX, y1: y + H + 3, x2: CX, y2: y + H + GAP - 3, color: 'blue' });
    const w = Math.ceil(require('./mm-a-common').pw(labels[i]));
    body += '\n  ' + L.pill({ cx: CX + 14 + w / 2, y: y + H + GAP / 2 - 15, w, label: labels[i], color: 'blue' });
  }
});
finish('02-flow-02-file-chain', Y0 + 4 * H + 3 * GAP,
  'フロントエンドのファイルのつながり。index.html を main.tsx が script で読み込み、main.tsx が App.tsx を render し、App.tsx がパスが /products のとき ProductListPage.tsx を表示する図',
  '上から順に、index.html（中身が空の入れ物 div id=root がある）、main.tsx（root の中に、BrowserRouter で囲んだ App を表示する）、App.tsx（パスに合う画面を Routes の中から選ぶ）、ProductListPage.tsx（パスが /products のときに表示する商品一覧の画面）が並ぶ。index.html から main.tsx へは script で読み込み、main.tsx から App.tsx へは render、App.tsx から ProductListPage.tsx へはパスが /products のときにつながる。',
  body);
