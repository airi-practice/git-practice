// 3 の手順6: /products まで入れると商品一覧が出る。http://localhost:5173 だけだと空白のページ。
const S = require('../shot-lib');
const { t, hl, note } = S;
const GREEN = '#2e7d32';

// ブラウザの枠（上のバーと URL 欄）。x が左端
const browser = (x, url, stroke) => `
  <rect x="${x}" y="10" width="360" height="250" rx="10" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  <path d="M${x},20 a10,10 0 0 1 10,-10 h340 a10,10 0 0 1 10,10 v36 h-360 z" fill="#e2e8f0" stroke="${stroke}" stroke-width="2"/>
  <circle cx="${x + 22}" cy="33" r="6" fill="#fc8181"/><circle cx="${x + 42}" cy="33" r="6" fill="#f6e05e"/><circle cx="${x + 62}" cy="33" r="6" fill="#68d391"/>
  <rect x="${x + 84}" y="21" width="262" height="24" rx="12" fill="#ffffff" stroke="#999"/>
  ${t(x + 98, 38, url, { size: 13, mono: true })}`;

const rows = [['1', 'ボールペン', '150', '200'], ['2', 'ノート', '220', '120'], ['3', 'クリアファイル', '80', '500']];
const table = (x) => {
  let s = `
  ${t(x + 24, 96, '商品一覧', { size: 18, bold: true, fill: '#222' })}
  <rect x="${x + 24}" y="112" width="312" height="30" fill="#edf2f7" stroke="#999"/>
  ${t(x + 34, 132, '商品ID', { bold: true })}${t(x + 100, 132, '商品名', { bold: true })}${t(x + 210, 132, '価格（円）', { bold: true })}${t(x + 290, 132, '在庫', { bold: true })}`;
  rows.forEach((r, i) => {
    const y = 142 + i * 28;
    s += `\n  <rect x="${x + 24}" y="${y}" width="312" height="28" fill="#fff" stroke="#999"/>` +
      t(x + 44, y + 19, r[0]) + t(x + 100, y + 19, r[1]) + t(x + 240, y + 19, r[2], { anchor: 'end' }) + t(x + 310, y + 19, r[3], { anchor: 'end' });
  });
  return s;
};

S.write('3-browser-products', S.svg({
  W: 760, H: 330,
  title: 'ブラウザで http://localhost:5173 だけを開くと空白のページ。/products まで入れると商品一覧が表示される',
  desc: '左は NG。アドレス欄が http://localhost:5173 だけだと、何も表示されない。右は OK。http://localhost:5173/products を開くと、商品の一覧が表示される。',
  body: `${browser(10, 'http://localhost:5173', S.RED)}
  ${t(190, 160, '（空白）', { size: 15, bold: true, fill: '#999', anchor: 'middle' })}
  ${browser(390, 'http://localhost:5173/products', GREEN)}
  ${hl({ x: 470, y: 20, w: 266, h: 26 })}
${table(390)}
  ${t(30, 292, '× 何も表示されない（空白のページになる）', { size: 15, bold: true, fill: S.RED_TEXT })}
  ${t(410, 292, '○ 商品一覧が表示される', { size: 15, bold: true, fill: GREEN })}
  ${t(410, 316, '/products まで入れるのがポイント', { size: 15, bold: true, fill: S.RED_TEXT })}`,
}));
