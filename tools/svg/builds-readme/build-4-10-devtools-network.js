// 4-10: 開発者ツールの Network タブで、/api/products の通信を見る画面の模擬図。
// 見る場所は4つ（Request URL・Request Method・Status Code・Response）。教科書 4-10 の表と同じ番号にそろえる。
const S = require('../shot-lib');
const { t, win, hl, RED, RED_TEXT } = S;

// 赤い丸の番号（見る場所の目印）
const num = (cx, cy, n) =>
  `<circle cx="${cx}" cy="${cy}" r="11" fill="${RED}"/>\n  ${t(cx, cy + 5, n, { size: 13, bold: true, fill: '#ffffff', anchor: 'middle' })}`;

// 名前の列・値の列を持つ1行
const field = (y, label, value, opt = {}) =>
  `${t(38, y, label, { size: 13, fill: '#555' })}\n  ${t(160, y, value, { size: 13, mono: true, bold: true, fill: opt.fill ?? '#222' })}`;

const jsonLine = (y, s) => t(500, y, s.replace(/^ +/, (m) => ' '.repeat(m.length)), { size: 13, mono: true, fill: '#222' });

S.write('4-10-devtools-network', S.svg({
  W: 760, H: 496,
  title: '開発者ツールの Network タブで、/api/products の通信を見る画面。見る場所は、Request URL、Request Method、Status Code、Response の4つ',
  desc: 'ブラウザで F12 キーを押して開発者ツールを開き、Network タブを選ぶ。Fetch/XHR で絞り込むと、products という名前の通信の行が2回出る。その行をクリックすると、詳しい中身が出る。Headers タブの Request URL は http://localhost:5173/api/products、Request Method は GET、Status Code は 200 OK。Response タブには、商品の一覧の JSON が出る。この4つを見れば、画面を開いたときに送られた通信が確かめられる。',
  body: `
  ${win({ x: 10, y: 10, w: 740, h: 476, fill: '#ffffff' })}
  <rect x="10" y="10" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#999" stroke-width="2"/>
  ${t(28, 34, 'Elements', { size: 14, fill: '#555' })}${t(106, 34, 'Console', { size: 14, fill: '#555' })}${t(178, 34, 'Network', { size: 14, bold: true, fill: '#1565c0' })}${t(256, 34, 'Sources', { size: 14, fill: '#555' })}
  <line x1="170" y1="44" x2="244" y2="44" stroke="#1565c0" stroke-width="3"/>
  ${hl({ x: 168, y: 14, w: 80, h: 28 })}
  ${t(330, 34, 'Network を選んで、F5 で再読み込み', { size: 15, bold: true, fill: RED_TEXT })}

  <rect x="24" y="54" width="34" height="22" rx="4" fill="#ffffff" stroke="#999"/>${t(41, 70, 'All', { size: 13, anchor: 'middle' })}
  <rect x="66" y="54" width="92" height="22" rx="4" fill="#dbeafe" stroke="#1565c0"/>${t(112, 70, 'Fetch/XHR', { size: 13, bold: true, anchor: 'middle' })}
  <rect x="166" y="54" width="34" height="22" rx="4" fill="#ffffff" stroke="#999"/>${t(183, 70, 'JS', { size: 13, anchor: 'middle' })}
  <rect x="208" y="54" width="40" height="22" rx="4" fill="#ffffff" stroke="#999"/>${t(228, 70, 'CSS', { size: 13, anchor: 'middle' })}
  ${hl({ x: 62, y: 51, w: 100, h: 28 })}
  ${t(300, 70, 'Fetch/XHR で絞り込む', { size: 15, bold: true, fill: RED_TEXT })}

  <rect x="11" y="82" width="738" height="22" fill="#edf2f7"/>
  ${t(24, 98, 'Name', { size: 13, bold: true })}${t(200, 98, 'Status', { size: 13, bold: true })}${t(290, 98, 'Type', { size: 13, bold: true })}
  <rect x="11" y="104" width="738" height="26" fill="#dbeafe"/>
  ${t(24, 122, 'products', { size: 14, mono: true })}${t(200, 122, '200', { size: 14, mono: true })}${t(290, 122, 'fetch', { size: 14, mono: true })}
  ${t(24, 148, 'products', { size: 14, mono: true })}${t(200, 148, '200', { size: 14, mono: true })}${t(290, 148, 'fetch', { size: 14, mono: true })}
  ${hl({ x: 14, y: 105, w: 350, h: 24 })}
  ${t(400, 122, 'この行をクリック', { size: 15, bold: true, fill: RED_TEXT })}
  ${t(400, 148, '同じ行が2回出る（4-5 の補足）', { size: 14, fill: '#555' })}

  <rect x="24" y="170" width="450" height="170" rx="6" fill="#f7fafc" stroke="#999"/>
  ${t(38, 192, 'Headers タブ', { size: 15, bold: true })}
  <line x1="24" y1="202" x2="474" y2="202" stroke="#ccc"/>
  ${field(228, 'Request URL:', 'http://localhost:5173/api/products')}
  ${field(258, 'Request Method:', 'GET')}
  ${field(288, 'Status Code:', '200 OK', { fill: '#2e7d32' })}
  ${t(38, 322, '（ほかの項目は、今回は読まなくてよい）', { size: 13, fill: '#555' })}
  ${hl({ x: 34, y: 211, w: 432, h: 26 })}${num(448, 224, '1')}
  ${hl({ x: 34, y: 241, w: 432, h: 26 })}${num(448, 254, '2')}
  ${hl({ x: 34, y: 271, w: 432, h: 26 })}${num(448, 284, '3')}

  <rect x="486" y="170" width="250" height="170" rx="6" fill="#f7fafc" stroke="#999"/>
  ${t(500, 192, 'Response タブ', { size: 15, bold: true })}
  <line x1="486" y1="202" x2="736" y2="202" stroke="#ccc"/>
  ${jsonLine(224, '[')}
  ${jsonLine(242, '  {"id":1,')}
  ${jsonLine(260, '   "name":"ボールペン",')}
  ${jsonLine(278, '   "price":150,')}
  ${jsonLine(296, '   "stock":200},')}
  ${jsonLine(314, '  ...')}
  ${jsonLine(332, ']')}
  ${hl({ x: 494, y: 206, w: 234, h: 131 })}${num(712, 224, '4')}

  ${num(34, 372, '1')}${t(54, 377, 'Request URL：宛先は 5173 番（ブラウザは、まず Vite に送る）', { size: 15, bold: true, fill: RED_TEXT })}
  ${num(34, 400, '2')}${t(54, 405, 'Request Method：GET（情報をもらうお願い）', { size: 15, bold: true, fill: RED_TEXT })}
  ${num(34, 428, '3')}${t(54, 433, 'Status Code：200 なら成功（4 や 5 で始まる番号は失敗）', { size: 15, bold: true, fill: RED_TEXT })}
  ${num(34, 456, '4')}${t(54, 461, 'Response：商品の一覧の JSON', { size: 15, bold: true, fill: RED_TEXT })}`,
}));
