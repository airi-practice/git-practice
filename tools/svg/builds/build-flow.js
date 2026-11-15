// flow: 環境構築の4つの手順。手順ごとに、取得=灰・DB=橙・バックエンド=緑・フロントエンド=青
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const st = (c) => `fill="none" stroke="${C[c].main}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"`;
// 手順ごとの小さな絵（図の意味を助けるもの）
const art = {
  gray: (cx, cy) => L.icon({ name: 'folder', x: cx - 16, y: cy - 16, size: 32, color: C.gray.main }),
  orange: (cx, cy) => `<g ${st('orange')}><ellipse cx="${cx}" cy="${cy - 10}" rx="14" ry="5"/><path d="M${cx - 14} ${cy - 10} v18 a14 5 0 0 0 28 0 v-18"/><path d="M${cx - 14} ${cy - 1} a14 5 0 0 0 28 0"/></g>`,
  green: (cx, cy) => `<g ${st('green')}><rect x="${cx - 15}" y="${cy - 15}" width="30" height="12" rx="3"/><rect x="${cx - 15}" y="${cy + 3}" width="30" height="12" rx="3"/><circle cx="${cx - 8}" cy="${cy - 9}" r="1.2"/><circle cx="${cx - 8}" cy="${cy + 9}" r="1.2"/></g>`,
  blue: (cx, cy) => `<g ${st('blue')}><rect x="${cx - 16}" y="${cy - 14}" width="32" height="22" rx="3"/><path d="M${cx - 6} ${cy + 15} h12 M${cx} ${cy + 8} v7"/></g>`,
};
const steps = [
  ['gray', ['リポジトリ', 'を取得']],
  ['orange', ['DB を用意']],
  ['green', ['バックエンド', 'を用意']],
  ['blue', ['フロントエンド', 'を用意']],
];
const W = 800, cw = 160, gap = 40, x0 = 20, y = 20, h = 150;
let body = '';
steps.forEach(([c, lines], i) => {
  const x = x0 + i * (cw + gap);
  body += L.card({ x, y, w: cw, h, color: c, title: `手順 ${i + 1}` }) + '\n  ' + art[c](x + cw / 2, y + 74) + '\n  '
    + lines.map((s, k) => t(x + cw / 2, y + 118 + k * 22 - (lines.length === 1 ? 11 : 0), s, { size: SIZE.head, bold: true, fill: C[c].dark })).join('\n  ') + '\n';
  if (i < 3) body += '  ' + L.arrow({ x1: x + cw + 6, y1: y + h / 2, x2: x + cw + gap - 4, y2: y + h / 2, color: c, width: 5 }) + '\n';
});
const y0 = y + h + 16;
L.write('flow', L.svg({
  W, y0,
  title: '環境構築の流れ',
  desc: '環境構築は、手順1のリポジトリの取得、手順2のDBの用意、手順3のバックエンドの用意、手順4のフロントエンドの用意の4つを、順番に進める。猫の先生が、ひとつずつ進めれば大丈夫だと伝えている。',
  body,
  footer: L.foot({ W, y0, pose: 'jump', lines: ['環境構築は、4つの手順を', '順番にやっていけば大丈夫だよ。', 'ひとつずつ進めてみよう。'] }),
}));
