// 14-4-files-order: 例Bで追加する5つのファイルと、作る順番。Entity・Repository=橙（DBに近い）、DTO=灰、Service・Controller=緑
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const items = [
  ['orange', 'Entity', ['entity/', 'Memo.java'], ['memos テーブルの', '1行を表す']],
  ['orange', 'Repository', ['repository/', 'MemoRepository.java'], ['memos テーブルの', '読み書きの窓口']],
  ['gray', 'DTO', ['dto/', 'MemoRequest.java', 'MemoResponse.java'], ['リクエストと', 'レスポンスの形']],
  ['green', 'Service', ['service/', 'MemoService.java'], ['登録と一覧取得の', '処理']],
  ['green', 'Controller', ['controller/', 'MemoController.java'], ['POST /api/memos と', 'GET /api/memos を', '受け付ける']],
];
const cw = 156, gap = 20, x0 = 20, y = 48, h = 206;
let body = `
  ${t(450, 30, 'すべて backend_spring/src/main/java/jp/co/copel/training/ の下に、新しく作る', { bold: true })}`;
items.forEach(([c, title, paths, desc], i) => {
  const x = x0 + i * (cw + gap);
  body += L.card({ x, y, w: cw, h, color: c, title: '' });
  body += `\n  <circle cx="${x + 24}" cy="${y + 23}" r="12" fill="#ffffff"/>\n  ${t(x + 24, y + 28, String(i + 1), { size: SIZE.note, bold: true, fill: C[c].dark })}`;
  body += '\n  ' + t(x + cw / 2 + 12, y + 31, title, { size: SIZE.head, bold: true, fill: '#ffffff' });
  body += `\n  <rect x="${x + 4}" y="${y + 56}" width="${cw - 8}" height="64" rx="8" fill="${C[c].light}" stroke="${C[c].main}" stroke-width="1.2"/>`;
  const top = y + 56 + (64 - paths.length * 18) / 2 + 14;
  paths.forEach((p, k) => { body += '\n  ' + t(x + cw / 2, top + k * 18, p, { size: SIZE.note, mono: true, bold: k > 0, fill: C[c].dark }); });
  desc.forEach((d, k) => { body += '\n  ' + t(x + cw / 2, y + 148 + k * 22, d); });
  if (i < 4) body += '\n  ' + L.arrow({ x1: x + cw + 2, y1: y + h / 2, x2: x + cw + gap - 2, y2: y + h / 2, color: c, width: 5 });
  body += '\n';
});
const ay = y + h + 30;
body += `  ${L.arrow({ x1: 24, y1: ay, x2: 876, y2: ay, color: 'gray', width: 5 })}
  ${t(24, ay + 30, 'データベースに近い', { anchor: 'start', bold: true, fill: C.orange.dark })}
  ${t(876, ay + 30, 'フロントエンドに近い', { anchor: 'end', bold: true, fill: C.blue.dark })}`;
const y0 = ay + 30 + 16;
L.write('14-4-files-order', L.svg({
  y0,
  title: '例Bで追加する5つのファイルと、データベースに近いほうから作る順番を示した図。Entity、Repository、DTO、Service、Controller の順に作る',
  desc: 'backend_spring/src/main/java/jp/co/copel/training/ の下に新しく作る5つのファイル。1 Entity（entity/Memo.java）は memos テーブルの1行を表す。2 Repository（repository/MemoRepository.java）は memos テーブルの読み書きの窓口。3 DTO（dto/MemoRequest.java と dto/MemoResponse.java）はリクエストとレスポンスの形。4 Service（service/MemoService.java）は登録と一覧取得の処理。5 Controller（controller/MemoController.java）は POST /api/memos と GET /api/memos を受け付ける。左のデータベースに近いほうから、右のフロントエンドに近いほうへ作る。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['データベースに近い部品から作ると、', '赤い波線が出にくいんだよ。', '番号の順に作ってみよう。'] }),
}));
