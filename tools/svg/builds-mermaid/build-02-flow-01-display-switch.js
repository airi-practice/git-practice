// 02_画面の作り方.md の1つ目の flowchart（表示の切り替え）
const { L, diamond, boxN, lab, finish } = require('./mm-a-common');
const SX = 250;           // 中央の列の中心
const RX = 490, RW = 330; // 右の列
let body = '';
body += '\n' + boxN({ x: SX - 120, y: 30, w: 240, h: 48, color: 'blue', lines: ['画面が表示される'] });
body += '\n  ' + L.arrow({ x1: SX, y1: 81, x2: SX, y2: 131, color: 'blue' });
// E
body += '\n' + diamond({ cx: SX, cy: 184, w: 280, h: 100, color: 'blue', lines: ['error に', 'メッセージがあるか'] });
body += '\n  ' + L.arrow({ x1: SX + 143, y1: 184, x2: RX - 3, y2: 184, color: 'blue' });
body += '\n  ' + lab(SX + 143 + 52, 144, 'ある', 'blue').replace(/^\s+/, '');
body += '\n' + boxN({ x: RX, y: 156, w: RW, h: 56, color: 'red', lines: ['取得に失敗しました: ... を表示する'] });
body += '\n  ' + L.arrow({ x1: SX, y1: 237, x2: SX, y2: 287, color: 'blue' });
body += '\n  ' + lab(SX + 14 + 32, 250, 'ない', 'blue').replace(/^\s+/, '');
// P
body += '\n' + diamond({ cx: SX, cy: 340, w: 280, h: 100, color: 'blue', lines: ['products は', 'null か'] });
body += '\n  ' + L.arrow({ x1: SX + 143, y1: 340, x2: RX - 3, y2: 340, color: 'blue' });
body += '\n  ' + lab(SX + 143 + 52, 300, 'null', 'blue').replace(/^\s+/, '');
body += '\n' + boxN({ x: RX, y: 312, w: RW, h: 56, color: 'blue', lines: ['読み込み中... を表示する'] });
body += '\n  ' + L.arrow({ x1: SX, y1: 393, x2: SX, y2: 443, color: 'blue' });
body += '\n  ' + lab(SX + 14 + 32, 406, '配列', 'blue').replace(/^\s+/, '');
// L
body += '\n' + diamond({ cx: SX, cy: 496, w: 280, h: 100, color: 'blue', lines: ['products の件数'] });
body += '\n  ' + L.arrow({ x1: SX + 143, y1: 496, x2: RX - 3, y2: 496, color: 'blue' });
body += '\n  ' + lab(SX + 143 + 52, 456, '0件', 'blue').replace(/^\s+/, '');
body += '\n' + boxN({ x: RX, y: 468, w: RW, h: 56, color: 'blue', lines: ['商品が登録されていません。を表示する'] });
body += '\n  ' + L.arrow({ x1: SX, y1: 549, x2: SX, y2: 599, color: 'blue' });
body += '\n  ' + lab(SX + 14 + 48, 562, '1件以上', 'blue').replace(/^\s+/, '');
body += '\n' + boxN({ x: SX - 120, y: 602, w: 240, h: 48, color: 'blue', lines: ['商品の表を表示する'] });
finish('02-flow-01-display-switch', 650,
  '商品一覧の画面の表示の切り替え。error にメッセージがあれば失敗の文、なければ products が null か配列かを見て、読み込み中、商品が0件の文、商品の表のどれかを表示する図',
  '画面が表示されたら、まず error にメッセージがあるかを見る。あれば「取得に失敗しました: ... を表示する」。なければ、products が null かを見る。null なら「読み込み中... を表示する」。配列なら、products の件数を見る。0件なら「商品が登録されていません。を表示する」。1件以上なら「商品の表を表示する」。',
  body);
