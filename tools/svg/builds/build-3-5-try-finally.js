// 3-5-try-finally: close() を try の最後に書いた場合と、finally に書いた場合を並べて比べる
const L = require('../rich-lib');
const { C, t, SIZE, SUB, esc } = L;
const MONO = `font-family="Consolas,'Courier New',monospace"`;
// 文中の `...` で囲んだ部分だけを等幅にする（コードは等幅にそろえるため）
const mx = (x, y, str, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size ?? 15}"${o.bold ? ' font-weight="bold"' : ''} fill="${o.fill ?? L.TEXT}" text-anchor="${o.anchor ?? 'middle'}">${str.split('`').map((s, i) => i % 2 ? `<tspan ${MONO}>${esc(s)}</tspan>` : esc(s)).join('')}</text>`;
const flowBox = (cx, y, w, color, n, str) => `
  <g filter="url(#shadow)"><rect x="${cx - w / 2}" y="${y}" width="${w}" height="38" rx="10" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${L.badge({ cx: cx - w / 2 + 20, cy: y + 19, n, color })}
  ${mx(cx + 12, y + 25, str, { fill: C[color].dark })}`;
const small = (cx, y, w, h, color, l1, l2, fill = '#ffffff') => `
  <g filter="url(#shadow)"><rect x="${cx - w / 2}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${mx(cx, y + 26, l1, { size: SIZE.note, bold: true, fill: C[color].dark })}
  ${mx(cx, y + 47, l2, { size: SIZE.note, bold: true, fill: C[color].dark })}`;
const result = (cx, y, color, ico, str) => `
  <g filter="url(#shadow)"><rect x="${cx - 95}" y="${y}" width="190" height="48" rx="10" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${L.icon({ name: ico, x: cx - 83, y: y + 12, size: 24, color: C[color].main, width: 3 })}
  ${t(cx - 50, y + 30, str, { bold: true, anchor: 'start', fill: C[color].dark })}`;
const branch = (cx, ok, ng, label) => `
  ${L.arrow({ x1: cx - 65, y1: 208, x2: cx - 65, y2: 256, color: 'green', width: 4 })}
  ${t(cx - 75, 238, '成功した', { size: SIZE.note, bold: true, anchor: 'end', fill: C.green.dark })}
  ${L.arrow({ x1: cx + 65, y1: 208, x2: cx + 65, y2: 256, color: 'red', width: 4 })}
  ${t(cx + 75, 238, '例外が起きた', { size: SIZE.note, bold: true, anchor: 'start', fill: C.red.dark })}`;
const head = (cx) => `
  ${flowBox(cx, 108, 340, 'orange', '1', '接続を開く（`Database.connect()`）')}
  ${L.arrow({ x1: cx, y1: 146, x2: cx, y2: 170, color: 'orange', width: 4 })}
  ${flowBox(cx, 170, 340, 'orange', '2', '`try` の中で、SQL を送って結果を取り出す')}`;
const left = `
${L.card({ x: 20, y: 15, w: 420, h: 420, color: 'red', title: 'try の最後に close() を書いた場合', sub: '例外が起きると、閉じ忘れてしまう' })}
${head(230)}
${branch(230)}
${small(140, 256, 190, 62, 'green', '最後の行に書いた', 'close() が動く')}
${small(340, 256, 190, 62, 'red', 'close() の行まで進めず、', '途中で外へ飛び出す')}
  ${L.arrow({ x1: 140, y1: 320, x2: 140, y2: 344, color: 'green', width: 4 })}
  ${L.arrow({ x1: 340, y1: 320, x2: 340, y2: 344, color: 'red', width: 4 })}
${result(140, 346, 'green', 'check', '接続が閉じる')}
${result(340, 346, 'red', 'x', '接続が開いたまま')}
  ${t(340, 418, '積み重なると、つなげなくなる', { size: SIZE.note, fill: C.red.dark })}`;
const right = `
${L.card({ x: 460, y: 15, w: 420, h: 420, color: 'green', title: 'finally に close() を書いた場合', sub: '成功しても例外が起きても、必ず閉じる' })}
${head(670)}
${branch(670)}
  <g filter="url(#shadow)"><rect x="520" y="256" width="300" height="62" rx="10" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2.5"/></g>
  ${mx(670, 281, '`finally`：どちらの場合も、必ず通る', { bold: true, fill: C.yellow.dark })}
  ${mx(670, 304, '`connection.close()` が動く', { size: SIZE.note, bold: true, fill: C.yellow.dark })}
  ${L.arrow({ x1: 670, y1: 320, x2: 670, y2: 344, color: 'green', width: 4 })}
  <g filter="url(#shadow)"><rect x="550" y="346" width="240" height="48" rx="10" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${L.icon({ name: 'check', x: 562, y: 358, size: 24, color: C.green.main, width: 3 })}
  ${t(600, 376, 'どちらも接続が閉じる', { bold: true, anchor: 'start', fill: C.green.dark })}
  ${t(670, 418, '例外は、閉じたあとに外へ投げられる', { size: SIZE.note, fill: SUB })}`;
const y0 = 451;
L.write('3-5-try-finally', L.svg({
  y0,
  title: '接続を閉じる処理を try の最後に書いた場合は例外のときに閉じ忘れ、finally に書いた場合は必ず閉じることを並べて比べた図',
  desc: '左は close() を try の最後に書いた場合。接続を開き、try の中で SQL を送って結果を取り出す。成功すると close() が動いて接続が閉じるが、例外が起きると close() の行まで進めず、接続が開いたままになり、積み重なるとつなげなくなる。右は close() を finally に書いた場合。成功しても例外が起きても finally を必ず通り、connection.close() が動いて、どちらも接続が閉じる。例外は閉じたあとに外へ投げられる。',
  body: left + right,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['例外が起きても接続を閉じたいよね。', 'そんなときは finally に書くんだ'] }),
}));
