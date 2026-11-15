// 9-4-jsx-to-screen: return に足した3行が、画面のどの部分になるかを、番号と色で対応づける。
// 色: コードの帯・画面=青（フロントエンド）、入力欄・ボタン・表示領域は役割のない並列なので p1〜p3 と番号で区別
const L = require('../rich-lib');
const { C, t, SIZE, SUB, LINE } = L;

const code = (x, y, s, o = {}) => t(x, y, s, { size: SIZE.note, mono: true, anchor: 'start', fill: o.fill });
const sp = (n) => '\u00a0'.repeat(n);
const hl = (y, n, color, s) => `<rect x="28" y="${y}" width="524" height="34" rx="8" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2.5"/>
  ${L.badge({ cx: 50, cy: y + 17, n, color })}
  ${code(70, y + 22, s)}`;
const wbadge = (cx, cy, n, color) => `<circle cx="${cx}" cy="${cy}" r="11" fill="#ffffff"/>
  ${t(cx, cy + 5, n, { size: SIZE.note, bold: true, fill: C[color].main })}`;
const card = (x, n, color, title, l1, l2) => `${L.card({ x, y: 292, w: 280, h: 112, color, title })}
  ${wbadge(x + 24, 315, n, color)}
  ${t(x + 140, 366, l1)}
  ${t(x + 140, 388, l2)}`;

const body = `
  <g filter="url(#shadow)"><rect x="20" y="16" width="540" height="258" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/></g>
  <path d="M20 52 v-22 a14 14 0 0 1 14 -14 h512 a14 14 0 0 1 14 14 v22 z" fill="url(#${C.blue.head})"/>
  ${t(36, 40, 'MessagePage.tsx の return の中', { size: SIZE.body, mono: true, bold: true, anchor: 'start', fill: '#ffffff' })}
  ${code(50, 80, '<main>')}
  ${code(50, 106, sp(2) + '<h2>メッセージ表示</h2>', { fill: SUB })}
  ${t(330, 106, '（手順2で書いた見出し）', { size: SIZE.note, anchor: 'start', fill: SUB })}
  ${hl(120, '1', 'p1', sp(2) + '<input type="text" />')}
  ${hl(162, '2', 'p2', sp(2) + '<button type="button">表示</button>')}
  ${hl(204, '3', 'p3', sp(2) + '<p className="message">入力した内容: （ここに表示する）</p>')}
  ${code(50, 262, '</main>')}

  <g filter="url(#shadow)"><rect x="580" y="16" width="300" height="258" rx="14" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="2"/></g>
  <path d="M580 52 v-22 a14 14 0 0 1 14 -14 h272 a14 14 0 0 1 14 14 v22 z" fill="#cfe3fb" stroke="${C.blue.main}" stroke-width="2"/>
  <circle cx="598" cy="34" r="4" fill="#ef5350"/><circle cx="611" cy="34" r="4" fill="#ffb300"/><circle cx="624" cy="34" r="4" fill="#43a047"/>
  ${t(750, 40, '画面（ブラウザ）', { size: SIZE.note, bold: true, fill: C.blue.dark })}
  ${t(600, 94, 'メッセージ表示', { size: SIZE.title, bold: true, anchor: 'start', fill: SUB })}
  <rect x="600" y="122" width="150" height="36" rx="8" fill="#ffffff" stroke="${C.p1.main}" stroke-width="3"/>
  ${L.badge({ cx: 600, cy: 122, n: '1', color: 'p1' })}
  <rect x="764" y="122" width="76" height="36" rx="8" fill="#e2e8f0" stroke="${C.p2.main}" stroke-width="3"/>
  ${t(802, 146, '表示', { bold: true })}
  ${L.badge({ cx: 764, cy: 122, n: '2', color: 'p2' })}
  <rect x="600" y="188" width="260" height="40" rx="8" fill="#ffffff" stroke="${C.p3.main}" stroke-width="3"/>
  ${L.badge({ cx: 600, cy: 188, n: '3', color: 'p3' })}
  ${t(614, 213, '入力した内容: （ここに表示する）', { size: SIZE.note, bold: true, anchor: 'start' })}

${card(20, '1', 'p1', '入力欄', '文字を入力する欄。', '最後に / を付けて、タグを閉じる')}
${card(310, '2', 'p2', 'ボタン', '「表示」と書かれたボタン。', 'type="button" は、ふつうのボタン')}
${card(600, '3', 'p3', '表示領域', '手順3の .message を付けて、', '太字にする。className と書く')}`;

const y0 = 420;
L.write('9-4-jsx-to-screen', L.svg({
  y0,
  title: 'return の中に足した、入力欄・ボタン・表示領域の3行が、画面のどの部分になるかを、番号と色で対応づけた図',
  desc: 'MessagePage.tsx の return の中に足した3行が、画面のどの部分になるかを、番号と色で対応づける。1は入力欄（input タグ。最後に / を付けてタグを閉じる）、2はボタン（「表示」と書かれたボタン。type="button" はふつうのボタン）、3は表示領域（手順3の .message を付けて太字にする。className と書く）。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['return に足した3行が、画面のどの部分に', 'なるのか、番号と色で見比べてみよう。'] }),
}));
