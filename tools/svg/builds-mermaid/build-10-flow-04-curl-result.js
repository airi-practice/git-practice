// 10-flow-04-curl-result: curl の結果の見分け方（元は Mermaid の flowchart TD）
const { L, C, t, SIZE, finish, nodeBox } = require('./_common-ch10');

// Q → 判断 A
let out = nodeBox({ x: 340, y: 20, w: 220, h: 48, color: 'gray', lines: ['curl の結果'], size: SIZE.head, bold: true });
out += '\n  ' + L.arrow({ x1: 450, y1: 71, x2: 450, y2: 103, color: 'gray' });
// 判断のひし形（Mermaid の { } ）
const cx = 450, cy = 160, dw = 130, dh = 56;
out += `\n  <g filter="url(#shadow)"><polygon points="${cx},${cy - dh} ${cx + dw},${cy} ${cx},${cy + dh} ${cx - dw},${cy}" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>`;
out += '\n  ' + t(cx, cy + 6, 'どうなった？', { size: SIZE.head, bold: true, fill: C.gray.dark });

// 4つの分岐。lines は、内容を変えずに箱の幅に合わせて改行
const BY = 330, BW = 200, BG = 20;
const leaves = [
  { pill: '200 と JSON', pc: 'green', color: 'green', h: 60, size: SIZE.head, bold: true, lines: ['成功'] },
  { pill: '404', pc: 'red', color: 'red', h: 150, lines: ['起動し直していない、', 'App.java の1行の', '足し忘れ、URLや', 'メソッドの間違い'] },
  { pill: '500', pc: 'red', color: 'red', h: 150, lines: ['本文の JSON が', '壊れている、または', '処理でエラーが', '起きている。', 'バックエンドの', 'ログを読む'] },
  { pill: '接続できない', pc: 'red', color: 'red', h: 150, lines: ['バックエンドが', '起動していない、', 'またはコンソールに', 'エラーが出ている'] },
];
let bottom = 0;
leaves.forEach((lf, i) => {
  const lx = 20 + i * (BW + BG), mx = lx + BW / 2;
  const sx = cx + (mx - cx) * 0.25, sy = cy + dh * (1 - 0.25 * 0 ) - 0; // 出発点：ひし形の下の頂点
  const x1 = cx, y1 = cy + dh + 3, x2 = mx, y2 = BY - 4;
  out += '\n  ' + L.arrow({ x1, y1, x2, y2, color: 'gray' });
  const t0 = 0.72;
  out += '\n  ' + L.pill({ cx: x1 + (x2 - x1) * t0, y: y1 + (y2 - y1) * t0 - 15, w: lf.pill.length > 4 ? 130 : 70, label: lf.pill, color: lf.pc });
  out += '\n  ' + nodeBox({ x: lx, y: BY, w: BW, h: lf.h, color: lf.color, lines: lf.lines, size: lf.size, bold: lf.bold });
  bottom = Math.max(bottom, BY + lf.h);
});

finish('10-flow-04-curl-result', bottom,
  'curl の結果が、200 と JSON なら成功、404・500・接続できないなら、それぞれ考えられる原因を示す分かれ道の図',
  'curl の結果で、どうなったかを見る。200 と JSON なら成功。404 なら、起動し直していない、App.java の1行の足し忘れ、URL やメソッドの間違い。500 なら、本文の JSON が壊れている、または処理でエラーが起きているので、バックエンドのログを読む。接続できないなら、バックエンドが起動していない、またはコンソールにエラーが出ている。',
  out);
