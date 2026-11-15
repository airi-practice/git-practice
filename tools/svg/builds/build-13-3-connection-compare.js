// 13-3-connection-compare: データベースへの接続の開閉を、backend/（自分で書く）と backend_spring/（Spring が自動）で比べる。
// 接続情報と接続の操作はデータベースの話なので橙、自分で書くコードを入れる枠はサーバーなので緑、Spring が自動でやる部分は灰。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const T = 12; // パネルの上端
const panel = (x, title) => L.card({ x, y: T, w: 420, h: 412, color: 'green', title });
const cfg = (x, name, desc) => `
  <g filter="url(#shadow)"><rect x="${x + 20}" y="70" width="380" height="58" rx="12" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/></g>
  ${t(x + 210, 94, name, { bold: true, mono: true, fill: C.orange.dark })}
  ${t(x + 210, 116, desc)}
  ${L.arrow({ x1: x + 210, y1: 132, x2: x + 210, y2: 150, color: 'orange', width: 4 })}`;
const frame = (x, title) => `
  <rect x="${x + 20}" y="152" width="380" height="262" rx="12" fill="#ffffff" stroke="${C.green.main}" stroke-width="2"/>
  ${t(x + 210, 176, title, { bold: true, mono: true, fill: C.green.dark })}`;
const step = (x, y, n, label, code) => `
  ${L.box({ x: x + 35, y, w: 350, h: 62, color: 'orange' })}
  ${L.badge({ cx: x + 56, cy: y + 20, n, color: 'orange' })}
  ${t(x + 210, y + 26, label, { bold: true, fill: C.orange.dark })}
  ${t(x + 210, y + 50, code, { size: SIZE.note, mono: true })}`;
const sub = (x, n, label, note) => `
  <rect x="${x}" y="296" width="104" height="100" rx="10" fill="#ffffff" stroke="${C.gray.main}" stroke-width="1.5" stroke-dasharray="5,3"/>
  ${L.badge({ cx: x + 52, cy: 320, n, color: 'gray' })}
  ${t(x + 52, 354, label, { fill: C.gray.dark, bold: true })}${note ? '\n  ' + t(x + 52, 378, note, { size: SIZE.note, fill: C.gray.dark }) : ''}`;
const body = `
${panel(20, 'backend/：開く・閉じるを、自分で書く')}
${cfg(20, 'Database.java', '接続情報（URL・USER・PASSWORD）を、定数で持つ')}
${frame(20, 'ProductListApi.handle（自分で書いたコード）')}
${step(20, 190, '1', '接続を開く', 'connection = Database.connect();')}
${step(20, 262, '2', 'SQL を送る', 'executeQuery("SELECT id, name, ...")')}
${step(20, 334, '3', '接続を閉じる', 'finally { connection.close(); }')}
${panel(460, 'backend_spring/：Spring が、開閉する')}
${cfg(460, 'application.yml', '接続情報（url・username・password）を、設定で持つ')}
${frame(460, 'ProductService.findAll（自分で書いたコード）')}
  ${L.box({ x: 495, y: 190, w: 350, h: 62, color: 'green' })}
  ${t(670, 216, '書くのは、この1行だけ', { bold: true, fill: C.green.dark })}
  ${t(670, 240, 'productRepository.findAll();', { size: SIZE.note, mono: true })}
  <rect x="495" y="264" width="350" height="140" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${t(670, 286, 'Spring が自動でやる（コードには書かれていない）', { size: SIZE.note, bold: true, fill: C.gray.dark })}
${sub(502, '1', '接続を開く')}
${sub(618, '2', 'SQL を送る', '（SQL も自動）')}
${sub(734, '3', '接続を閉じる')}`;
const y0 = T + 412 + 16;
L.write('13-3-connection-compare', L.svg({
  y0,
  title: 'データベースへの接続を、backend/ では使う側が開いて閉じるのに対し、backend_spring/ では Spring が自動で開閉し、使う側のコードには書かれないことを並べて比べた図',
  desc: 'backend/ では、Database.java が接続情報を定数で持ち、ProductListApi.handle のコードで、接続を開く、SQL を送る、接続を閉じるの3つを自分で書く。backend_spring/ では、application.yml が接続情報を設定で持ち、ProductService.findAll に書くのは productRepository.findAll(); の1行だけで、接続を開く、SQL を送る（SQL も自動）、接続を閉じるの3つは Spring が自動でやる。猫の先生が、左は自分で書き、右は Spring が代わりにやると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['接続を開いて閉じる作業を、', '左は自分で書いているよね。', '右は Spring が代わりにやるんだ。'] }),
}));
