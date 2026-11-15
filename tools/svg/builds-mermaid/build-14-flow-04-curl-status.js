// 14-flow-04-curl-status: curl の結果のステータスコードごとに、原因の見当を分ける
const { L, C, t, nb, hex, finish } = require('./_helper-14');
const leaves = [
  { code: '200', color: 'green', lines: ['成功'] },
  { code: '404', color: 'red', lines: ['起動し直していない、', '配置場所や URL の間違い'] },
  { code: '405', color: 'red', lines: ['POST ではなく GET で呼んでいる'] },
  { code: '415', color: 'red', lines: ['Content-Type のヘッダーがない'] },
  { code: '400', color: 'red', lines: ['本文の JSON が壊れている、または本文がない'] },
  { code: '500', color: 'red', lines: ['バックエンドのログを読む'] },
];
const LX = 500, LW = 380, LH = 56, LG = 14, TOP = 20;
const cy = (i) => TOP + LH / 2 + i * (LH + LG);
const ay = (cy(0) + cy(5)) / 2; // 分岐の中心の高さ
const AX2 = 274; // 分岐の右端
let body = `
  ${nb({ x: 30, y: ay - 150, w: 240, h: 56, color: 'gray', lines: ['curl の結果'] })}
  ${L.arrow({ x1: 150, y1: ay - 90, x2: 150, y2: ay - 66, color: 'gray' })}
  ${hex({ x: 30, y: ay - 60, w: 240, h: 120, color: 'gray', lines: ['ステータスコード'] })}`;
leaves.forEach((lf, i) => {
  const ey = cy(i);
  body += '\n  ' + nb({ x: LX, y: ey - LH / 2, w: LW, h: LH, color: lf.color, lines: lf.lines });
  body += '\n  ' + L.arrow({ x1: AX2 + 4, y1: ay, x2: LX - 6, y2: ey, color: 'gray', width: 5 });
  const px = 455, py = ay + (ey - ay) * ((px - AX2) / (LX - AX2));
  body += '\n  ' + L.pill({ cx: px, y: py - 15, w: 64, label: lf.code, color: lf.color });
});
finish('14-flow-04-curl-status', cy(5) + LH / 2,
  'curl の結果のステータスコードが 200 なら成功で、404・405・415・400・500 なら、それぞれ起動し直していない、GET で呼んでいる、Content-Type がない、JSON が壊れている、ログを読む、という原因の見当に分かれることを示した図',
  'curl の結果のステータスコードで分かれる。200 は成功。404 は起動し直していない、配置場所や URL の間違い。405 は POST ではなく GET で呼んでいる。415 は Content-Type のヘッダーがない。400 は本文の JSON が壊れている、または本文がない。500 はバックエンドのログを読む。',
  body);
