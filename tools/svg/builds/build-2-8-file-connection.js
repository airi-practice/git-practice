// 2-8-file-connection: index.html の root の中に main.tsx が App を表示し、App の Routes がパス /products のときに ProductListPage を表示する入れ子の図。
// 入れ子の各層は役割のない項目なので、灰・青・p1・p2・p3 で区別する。目的の画面（ProductListPage）だけ黄で強調する
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const layer = (x, y, w, h, color, name, desc, nameW) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/>
  ${t(x + 16, y + 28, name, { size: SIZE.head, bold: true, mono: true, anchor: 'start', fill: C[color].dark })}
  ${t(x + 16 + nameW + 12, y + 28, desc, { size: SIZE.note, anchor: 'start' })}`;
const link = (color, x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color].main}" stroke-width="2.5" stroke-linecap="round"/>`;
const role = (y, color, title, l1, l2) => `
${L.card({ x: 610, y, w: 270, h: 112, color, title })}
  ${t(745, y + 74, l1)}
  ${t(745, y + 97, l2)}`;
const body = `
  <g filter="url(#shadow)"><rect x="20" y="14" width="860" height="44" rx="12" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${t(36, 42, 'ブラウザのアドレス欄：', { anchor: 'start', fill: C.gray.dark })}
  ${t(200, 42, 'http://localhost:5173', { mono: true, anchor: 'start' })}
  <rect x="378" y="22" width="96" height="28" rx="8" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(426, 42, '/products', { mono: true, bold: true, fill: C.yellow.dark })}
  ${t(490, 42, '← このパスで、表示する画面が決まる', { anchor: 'start', fill: C.gray.dark })}
${role(120, 'blue', 'main.tsx の役割', 'ブラウザが最初に実行する。', '画面づくりの出発点になる')}
${role(262, 'p2', 'App.tsx の役割', 'パスと画面の対応表。', '画面が増えたら Route を足す')}
${role(404, 'yellow', 'ProductListPage.tsx の役割', '1つの画面の中身を作る。', 'データを取得して表示する')}
  <rect x="20" y="72" width="570" height="450" rx="16" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/>
  ${t(36, 100, 'index.html', { size: SIZE.head, bold: true, mono: true, anchor: 'start', fill: C.gray.dark })}
  ${t(160, 100, '中身が空の入れ物（div id="root"）だけがある', { size: SIZE.note, anchor: 'start' })}
${layer(40, 116, 530, 394, 'blue', 'main.tsx', 'root の中に、下の部品を表示する', 80)}
${layer(60, 158, 490, 340, 'p1', 'BrowserRouter', 'アドレス欄のパスを、中で読めるようにする', 129)}
${layer(80, 200, 450, 286, 'p2', 'App.tsx（App）', 'パスに合う画面を選ぶ', 140)}
${layer(100, 242, 410, 232, 'p3', 'Routes', '合う Route を1つだけ選ぶ', 60)}
  <g filter="url(#shadow)"><rect x="120" y="284" width="370" height="64" rx="10" fill="#ffffff" stroke="${C.p3.main}" stroke-width="1.5"/></g>
  ${t(305, 310, 'Route path="/products"', { mono: true, bold: true, fill: C.p3.dark })}
  ${t(305, 334, 'パスが /products のときは、下の画面を表示する', { size: SIZE.note })}
  ${L.arrow({ x1: 305, y1: 350, x2: 305, y2: 360, color: 'p3', width: 4 })}
${L.card({ x: 120, y: 362, w: 370, h: 100, color: 'yellow', title: 'ProductListPage.tsx' })}
  ${t(305, 436, '商品一覧の画面', { bold: true, fill: C.yellow.dark })}
  ${t(305, 454, '（ここに表が表示される）', { size: SIZE.note, fill: '#475569' })}
  ${link('blue', 570, 150, 610, 150)}
  ${link('p2', 530, 300, 610, 292)}
  ${link('yellow', 490, 412, 610, 434)}`;
const y0 = 538;
L.write('2-8-file-connection', L.svg({
  y0,
  title: 'index.html の root の中に main.tsx が App を表示し、App の Routes がパス /products のときに ProductListPage を表示する入れ子の図',
  desc: 'ブラウザのアドレス欄のパス /products で、表示する画面が決まる。index.html（中身が空の入れ物 div id="root" だけがある）の中に、main.tsx が下の部品を表示する。その中の BrowserRouter がアドレス欄のパスを中で読めるようにし、App.tsx（App）がパスに合う画面を選ぶ。Routes が合う Route を1つだけ選び、Route path="/products" のとき、商品一覧の画面 ProductListPage.tsx を表示する。右側に main.tsx・App.tsx・ProductListPage.tsx それぞれの役割を示している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['index.htmlから順にファイルがつながって、', 'ProductListPageが表示されるんだ。'] }),
}));
