// 10-0-example-ab: 例A（データベースを使わない API）と例B（データベースを使う API）を並べて比べる。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const LX = 20, LW = 370, MX = 400, MW = 100, RX = 510, RW = 370;
const head = (x, w, color, label) => `
  <path d="M${x} 46 v-26 a14 14 0 0 1 14 -14 h${w - 28} a14 14 0 0 1 14 14 v26 z" fill="url(#${C[color].head})" filter="url(#shadow)"/>
  ${t(x + w / 2, 33, label, { size: SIZE.head, bold: true, fill: '#ffffff' })}`;
const cell = (x, w, y, h, color) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/></g>`;
const mid = (y, h, lines, sub) => `
  <g filter="url(#shadow)"><rect x="${MX}" y="${y}" width="${MW}" height="${h}" rx="12" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
${lines.map((s, k) => '  ' + t(MX + MW / 2, y + h / 2 + 5 - (lines.length - 1) * 11 + k * 22 - (sub ? 8 : 0), s, { bold: true, fill: C.gray.dark })).join('\n')}${sub ? '\n  ' + t(MX + MW / 2, y + h / 2 + 5 + (lines.length - 1) * 11 + 18, sub, { size: SIZE.note, mono: true, fill: SUB }) : ''}`;
const node = (x, y, w, h, color, lines, o = {}) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"${o.dashed ? ' stroke-dasharray="6,4"' : ''}/>
${lines.map((s, k) => '  ' + t(x + w / 2, y + h / 2 + 5 - (lines.length - 1) * 9 + k * 18, s, { size: o.size ?? SIZE.note, mono: o.mono, bold: o.bold ?? true, fill: o.fill ?? C[color].dark })).join('\n')}`;
const R = (y, h, a, b) => a(y, h) + b(y, h);
const text2 = (cx, y, l1, l2, o = {}) => t(cx, y, l1, o) + (l2 ? '\n  ' + t(cx, y + 22, l2, { size: SIZE.note, fill: SUB }) : '');

const rowY = { flow: 58, url: 160, what: 228, file: 296, table: 372, doc: 432 };
const body = `
${head(LX, LW, 'p1', '例A：文字列を反転する API')}
  ${L.pill({ cx: MX + MW / 2, y: 16, w: 100, label: '違い', color: 'gray' })}
${head(RX, RW, 'p2', '例B：メモを登録して一覧を返す API')}

  ${cell(LX, LW, rowY.flow, 92, 'p1')}
  ${node(32, 74, 70, 60, 'blue', ['画面'])}
  ${L.arrow({ x1: 106, y1: 104, x2: 132, y2: 104, color: 'blue', width: 3 })}
  ${node(136, 74, 120, 60, 'green', ['ReverseApi'], { mono: true })}
  ${node(278, 74, 100, 60, 'gray', ['データ', 'ベース', '使わない'], { dashed: true })}
  ${mid(rowY.flow, 92, ['処理の流れ'])}
  ${cell(RX, RW, rowY.flow, 92, 'p2')}
  ${node(520, 74, 48, 60, 'blue', ['画面'])}
  ${L.arrow({ x1: 570, y1: 104, x2: 588, y2: 104, color: 'blue', width: 3 })}
  ${node(590, 74, 120, 60, 'green', ['MemoCreateApi', 'MemoListApi'], { mono: true })}
  ${L.arrow({ x1: 712, y1: 104, x2: 730, y2: 104, color: 'green', width: 3 })}
  ${node(732, 74, 56, 60, 'green', ['データ', 'ベース'])}
  ${L.arrow({ x1: 790, y1: 104, x2: 804, y2: 104, color: 'green', width: 3 })}
  ${node(806, 74, 64, 60, 'orange', ['memos', 'テーブル'])}

  ${cell(LX, LW, rowY.url, 56, 'p1')}
  ${t(LX + LW / 2, rowY.url + 35, 'POST /api/reverse', { mono: true, bold: true, fill: C.p1.dark })}
  ${mid(rowY.url, 56, ['URL'])}
  ${cell(RX, RW, rowY.url, 56, 'p2')}
  ${t(RX + RW / 2, rowY.url + 24, 'POST /api/memos', { mono: true, bold: true, fill: C.p2.dark })}
  ${t(RX + RW / 2, rowY.url + 46, 'GET /api/memos', { mono: true, bold: true, fill: C.p2.dark })}

  ${cell(LX, LW, rowY.what, 60, 'p1')}
  ${t(LX + LW / 2, rowY.what + 26, '送られた文字列を、')}
  ${t(LX + LW / 2, rowY.what + 48, '後ろから順に並べ直して返す')}
  ${mid(rowY.what, 60, ['内容'])}
  ${cell(RX, RW, rowY.what, 60, 'p2')}
  ${t(RX + RW / 2, rowY.what + 26, '送られたメモをデータベースに保存し、')}
  ${t(RX + RW / 2, rowY.what + 48, '保存済みのメモの一覧を返す')}

  ${cell(LX, LW, rowY.file, 68, 'p1')}
  ${t(LX + LW / 2, rowY.file + 30, 'ReverseApi.java の1つ', { mono: true, bold: true, fill: C.p1.dark })}
  ${t(LX + LW / 2, rowY.file + 54, '（ほかに dto/ の2つ）', { size: SIZE.note, fill: SUB })}
  ${mid(rowY.file, 68, ['作るファイル'], 'api/')}
  ${cell(RX, RW, rowY.file, 68, 'p2')}
  ${t(RX + RW / 2, rowY.file + 30, 'MemoCreateApi.java と MemoListApi.java の2つ', { size: SIZE.note, mono: true, bold: true, fill: C.p2.dark })}
  ${t(RX + RW / 2, rowY.file + 54, '（ほかに dto/ の2つ）', { size: SIZE.note, fill: SUB })}

  ${cell(LX, LW, rowY.table, 52, 'p1')}
  ${t(LX + LW / 2, rowY.table + 32, '作らない')}
  ${mid(rowY.table, 52, ['テーブル'])}
  ${cell(RX, RW, rowY.table, 52, 'p2')}
  ${t(RX + RW / 2, rowY.table + 32, 'memos を作る', { mono: true, fill: C.p2.dark })}

  ${cell(LX, LW, rowY.doc, 64, 'p1')}
  ${t(LX + LW / 2, rowY.doc + 28, '手順1〜11')}
  ${t(LX + LW / 2, rowY.doc + 50, '（画面から呼ぶところまで）', { size: SIZE.note, fill: SUB })}
  ${mid(rowY.doc, 64, ['手順書の', '範囲'])}
  ${cell(RX, RW, rowY.doc, 64, 'p2')}
  ${t(RX + RW / 2, rowY.doc + 28, '例Aとの違いを中心に説明')}
  ${t(RX + RW / 2, rowY.doc + 50, '（API の確認まで）', { size: SIZE.note, fill: SUB })}`;

const y0 = 512;
L.write('10-0-example-ab', L.svg({
  y0,
  title: '例A（データベースを使わない API）と、例B（データベースを使う API）を、処理の流れと、URL・作るファイル・テーブル・手順書の範囲で並べて比べた図',
  desc: '例Aは文字列を反転する API。画面から ReverseApi を呼び、データベースは使わない。URL は POST /api/reverse、作るファイルは api/ の ReverseApi.java の1つ（ほかに dto/ の2つ）、テーブルは作らず、手順書は手順1〜11。例Bはメモを登録して一覧を返す API。画面から MemoCreateApi と MemoListApi を呼び、データベースの memos テーブルを使う。URL は POST /api/memos と GET /api/memos、作るファイルは MemoCreateApi.java と MemoListApi.java の2つ（ほかに dto/ の2つ）、memos を作り、手順書は例Aとの違いを中心に API の確認まで説明する。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['まず例Aを最後までやってから、例Bを読もう。', 'データベースを使うかどうかの違いが、', 'よく分かるようになるんだ。'] }),
}));
