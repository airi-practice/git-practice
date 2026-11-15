// 6-5-file-correspondence: 画面の役割ごとに、フロントエンド（青）とバックエンド（緑）のファイルが対応する表。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const FX = 190, FW = 330, BX = 560, BW = 320, RH = 92, TOP = 66, STEP = 104;
const head = (x, w, color, label) => `
  <g filter="url(#shadow)"><rect x="${x}" y="14" width="${w}" height="40" rx="12" fill="url(#${C[color].head})"/></g>
  ${t(x + w / 2, 41, label, { size: SIZE.head, bold: true, fill: '#ffffff' })}`;
const role = (y, lines) => `
  <g filter="url(#shadow)"><rect x="20" y="${y}" width="150" height="${RH}" rx="12" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="2"/></g>
  ${lines.map((s, i) => t(95, y + RH / 2 + 6 + (i - (lines.length - 1) / 2) * 22, s, { size: SIZE.head, bold: true, fill: C.gray.dark })).join('\n  ')}`;
// files: [[ファイル名, 説明], ...]
const cell = (x, y, w, color, files) => {
  const c = C[color];
  const n = files.length;
  return `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${RH}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>` + files.map(([f, d], i) => {
    const base = n === 1 ? y + 40 : y + 24 + i * 44;
    return '\n  ' + t(x + w / 2, base, f, { size: SIZE.body, bold: true, mono: true, fill: c.dark }) + '\n  ' + t(x + w / 2, base + 20, d, { size: SIZE.note, fill: SUB });
  }).join('');
};
const none = (x, y, w, msg) => `
  <rect x="${x}" y="${y}" width="${w}" height="${RH}" rx="12" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${t(x + w / 2, y + RH / 2 + 5, msg, { size: SIZE.body, fill: SUB })}`;
const row = (i) => TOP + i * STEP;
const link = (y) => L.biArrow({ x1: 524, y1: y, x2: 556, y2: y, colorGo: 'blue', colorBack: 'green', width: 4, gap: 14 });
const body = `${head(20, 150, 'gray', '役割')}${head(FX, FW, 'blue', 'フロントエンド（frontend/src/）')}${head(BX, BW, 'green', 'バックエンド（backend/）')}
${role(row(0), ['画面'])}${cell(FX, row(0), FW, 'blue', [['pages/ProductListPage.tsx', '画面の見た目と、表示のきっかけ']])}${none(BX, row(0), BW, '対応するファイルはない')}
${role(row(1), ['通信'])}${cell(FX, row(1), FW, 'blue', [['api/products.ts', 'バックエンドへのリクエストを送る']])}
  ${link(row(1) + RH / 2)}${cell(BX, row(1), BW, 'green', [['App.java', 'URL と処理を対応づける'], ['api/ProductListApi.java', '受け付けて返す']])}
${role(row(2), ['データの形'])}${cell(FX, row(2), FW, 'blue', [['types/product.ts', 'Product 型。JSON の形に対応する']])}
  ${link(row(2) + RH / 2)}${cell(BX, row(2), BW, 'green', [['dto/ProductResponse.java', 'ProductResponse クラス']])}
${role(row(3), ['データベースの', '読み書き'])}${none(FX, row(3), FW, 'フロントエンドは、データベースを知らない')}${cell(BX, row(3), BW, 'green', [['api/ProductListApi.java', 'の中の SQL'], ['Database.java', 'データベースへの接続']])}`;
const y0 = row(3) + RH + 18;
L.write('6-5-file-correspondence', L.svg({
  y0,
  title: '商品一覧の画面で、役割ごとに、フロントエンドのファイルとバックエンドのファイルが対応している様子を示した図',
  desc: '役割は、画面・通信・データの形・データベースの読み書きの4つ。画面は ProductListPage.tsx だけ、通信は api/products.ts と App.java・ProductListApi.java、データの形は types/product.ts と dto/ProductResponse.java が対応する。データベースの読み書きは、バックエンドの ProductListApi.java の SQL と Database.java だけで、フロントエンドはデータベースを知らない。猫の先生が、線でたどってつながりを確認しようと話している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['画面の役割ごとに、フロントエンドと', 'バックエンドのファイルが対応しているよ。', '線でたどって、つながりを確認してみよう。'] }),
}));
