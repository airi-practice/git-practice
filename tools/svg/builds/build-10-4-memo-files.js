// 10-4-memo-files: 例Bで触る5つのファイル。新しく作る=緑（バックエンド）、既存を変更=黄（強調）。作る順番に番号バッジ。
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;
const mono = (x, y, s, o = {}) => t(x, y, s, { mono: true, ...o });
// 新しく作るファイルの小さなカード
const file = (x, y, w, h, name, l2, l3, jsonLine) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${mono(x + w / 2, y + 26, name, { bold: true, fill: C.green.dark })}
  ${mono(x + w / 2, y + 50, l2, { size: jsonLine ? SIZE.note : SIZE.body, fill: TEXT })}
  ${t(x + w / 2, y + 74, l3)}`;
const step = (x, w, n, color, title, sub, monoTitle) => `
  <g filter="url(#shadow)"><rect x="${x}" y="378" width="${w}" height="66" rx="12" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${L.badge({ cx: x + 22, cy: 411, n, color })}
  ${t(x + w / 2 + 10, sub ? 404 : 417, title, { bold: true, fill: C[color].dark, mono: monoTitle })}${sub ? '\n  ' + t(x + w / 2 + 10, 428, sub) : ''}`;
const body = `
  <rect x="20" y="10" width="16" height="16" rx="4" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/>
  ${t(44, 24, '新しく作る', { size: SIZE.note, anchor: 'start' })}
  <rect x="150" y="10" width="16" height="16" rx="4" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(174, 24, '既存のファイルを変更する', { size: SIZE.note, anchor: 'start' })}
  <g filter="url(#shadow)"><rect x="20" y="40" width="860" height="292" rx="16" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${mono(36, 66, 'backend/src/main/java/jp/co/copel/training/', { size: SIZE.note, bold: true, anchor: 'start', fill: C.gray.dark })}
${L.card({ x: 36, y: 80, w: 240, h: 236, color: 'yellow', title: 'App.java（変更）' })}
  ${t(156, 152, '足すもの', { bold: true, fill: C.yellow.dark })}
  ${t(52, 176, '・initDatabase() に、', { anchor: 'start' })}
  ${t(64, 196, 'memos テーブルの作成', { anchor: 'start' })}
  ${t(52, 218, '・import を2行', { anchor: 'start' })}
  ${mono(52, 240, '・app.post(...)', { anchor: 'start' })}
  ${mono(52, 262, '・app.get(...)', { anchor: 'start' })}
  ${t(156, 288, '（URL の振り分けと、', { size: SIZE.note, fill: C.yellow.dark })}
  ${t(156, 306, 'テーブルの用意）', { size: SIZE.note, fill: C.yellow.dark })}
  <rect x="292" y="80" width="290" height="236" rx="12" fill="${C.green.light}" fill-opacity="0.35" stroke="${C.green.main}" stroke-width="2" stroke-dasharray="7,4"/>
  ${mono(308, 104, 'api/', { bold: true, anchor: 'start', fill: C.green.dark })}
${file(308, 114, 258, 82, 'MemoCreateApi.java', 'POST /api/memos', 'メモを保存する')}
${file(308, 206, 258, 82, 'MemoListApi.java', 'GET /api/memos', 'メモの一覧を返す')}
  <rect x="598" y="80" width="266" height="236" rx="12" fill="${C.green.light}" fill-opacity="0.35" stroke="${C.green.main}" stroke-width="2" stroke-dasharray="7,4"/>
  ${mono(614, 104, 'dto/', { bold: true, anchor: 'start', fill: C.green.dark })}
${file(614, 114, 234, 82, 'MemoRequest.java', '{"content":"..."}', 'リクエスト用のクラス', true)}
${file(614, 206, 234, 82, 'MemoResponse.java', '{"id":...,"content":...}', 'レスポンス用。登録と一覧で使う', true)}
  ${t(20, 360, '作る順番（データベースに近いほうから進めると、動作を確認しやすい）', { size: SIZE.head, bold: true, anchor: 'start' })}
${step(20, 200, '1', 'orange', 'テーブル', 'initDatabase() に足す')}
  ${L.arrow({ x1: 224, y1: 411, x2: 246, y2: 411, color: 'gray', width: 4 })}
${step(250, 250, '2', 'green', 'MemoCreateApi', 'と、使う dto/ の2つ', true)}
  ${L.arrow({ x1: 504, y1: 411, x2: 526, y2: 411, color: 'gray', width: 4 })}
${step(530, 160, '3', 'green', 'MemoListApi', null, true)}
  ${L.arrow({ x1: 694, y1: 411, x2: 716, y2: 411, color: 'gray', width: 4 })}
${step(720, 160, '4', 'yellow', 'App.java', 'の振り分け', true)}`;
const y0 = 460;
L.write('10-4-memo-files', L.svg({
  y0,
  title: '例Bで追加・変更する5つのファイルを、新しく作るものと、既存のファイルへの変更に色分けして、作る順番と一緒に示した図',
  desc: 'App.java は変更（initDatabase() に memos テーブルの作成、import を2行、app.post と app.get を足す）。api/ に MemoCreateApi.java（POST /api/memos）と MemoListApi.java（GET /api/memos）、dto/ に MemoRequest.java と MemoResponse.java を新しく作る。作る順番は、1 テーブル、2 MemoCreateApi と dto/ の2つ、3 MemoListApi、4 App.java の振り分け。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['例Bで触るファイルは5つだよ。', '新しく作るものと、既存のファイルに足すものを', '分けて見てみよう。'] }),
}));
