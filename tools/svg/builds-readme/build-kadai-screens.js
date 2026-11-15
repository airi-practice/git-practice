// 課題集①: 課題1〜3の完成画面の模擬図（ブラウザで開いたところ）。表の見た目は、お手本の商品一覧（3-browser-products）にそろえる。
// 赤い枠は「見てほしい場所」。3枚とも、同じブラウザの枠と表の部品を使う。
const S = require('../shot-lib');
const { t, hl, RED_TEXT } = S;
const GREEN = '#2e7d32';
const NBSP = '\u00a0';

// ブラウザの枠（上のバーと URL 欄）。x が左端、w が幅、h が高さ
const browser = ({ x, w, h, url, stroke = '#999' }) => `
  <rect x="${x}" y="10" width="${w}" height="${h}" rx="10" fill="#ffffff" stroke="${stroke}" stroke-width="3"/>
  <path d="M${x},20 a10,10 0 0 1 10,-10 h${w - 20} a10,10 0 0 1 10,10 v36 h-${w} z" fill="#e2e8f0" stroke="${stroke}" stroke-width="2"/>
  <circle cx="${x + 22}" cy="33" r="6" fill="#fc8181"/><circle cx="${x + 42}" cy="33" r="6" fill="#f6e05e"/><circle cx="${x + 62}" cy="33" r="6" fill="#68d391"/>
  <rect x="${x + 84}" y="21" width="${w - 108}" height="24" rx="12" fill="#ffffff" stroke="#999"/>
  ${t(x + 98, 38, url, { size: 13, mono: true })}`;

// 表。cols: [{ label, w, num }]、rows: 行ごとの文字の配列。left が表の左端、top が見出し行の上端
const table = ({ left, top, cols, rows }) => {
  const total = cols.reduce((a, c) => a + c.w, 0);
  const at = (i) => left + cols.slice(0, i).reduce((a, c) => a + c.w, 0);
  const cell = (i, y, s, bold) => (cols[i].num
    ? t(at(i) + cols[i].w - 10, y, s, { bold, anchor: 'end' })
    : t(at(i) + 10, y, s, { bold }));
  let s = `<rect x="${left}" y="${top}" width="${total}" height="30" fill="#edf2f7" stroke="#999"/>`;
  cols.forEach((c, i) => { s += cell(i, top + 20, c.label, true); });
  rows.forEach((r, k) => {
    const y = top + 30 + k * 28;
    s += `\n  <rect x="${left}" y="${y}" width="${total}" height="28" fill="#fff" stroke="#999"/>`;
    r.forEach((v, i) => { s += cell(i, y + 19, v); });
  });
  return s;
};

// 課題1: /low-stock
S.write('kadai-01-screen', S.svg({
  W: 660, H: 262,
  title: '課題1の完成画面。/low-stock を開くと、在庫が少ない商品の付箋とマーカーの2件だけが表に出る',
  desc: 'ブラウザで http://localhost:5173/low-stock を開いた画面。見出しは「在庫が少ない商品」。表の列は商品ID、商品名、在庫数の3つで、付箋（在庫80）とマーカー（在庫0）の2件だけが出る。在庫が多いボールペン、ノート、クリアファイルは出ない。',
  body: `${browser({ x: 10, w: 640, h: 200, url: 'http://localhost:5173/low-stock' })}
  ${hl({ x: 90, y: 20, w: 330, h: 26 })}
  ${t(40, 96, '在庫が少ない商品', { size: 18, bold: true, fill: '#222' })}
  ${table({ left: 40, top: 112, cols: [{ label: '商品ID', w: 110 }, { label: '商品名', w: 300 }, { label: '在庫数', w: 160, num: true }], rows: [['4', '付箋', '80'], ['5', 'マーカー', '0']] })}
  ${hl({ x: 38, y: 142, w: 574, h: 58 })}
  ${t(40, 236, '在庫が100以下の2件だけが出る（ボールペン・ノート・クリアファイルは出ない）', { size: 15, bold: true, fill: RED_TEXT })}`,
}));

// 課題2: /products/4 と /products/999
const detailRows = [['商品ID', '4'], ['商品名', '付箋'], ['価格（円）', '300'], ['在庫数', '80']];
const detail = (x) => {
  let s = `\n  ${t(x + 24, 96, '商品の詳細', { size: 18, bold: true, fill: '#222' })}`;
  detailRows.forEach(([k, v], i) => {
    const y = 112 + i * 30;
    s += `\n  <rect x="${x + 24}" y="${y}" width="120" height="30" fill="#edf2f7" stroke="#999"/>${t(x + 34, y + 20, k, { bold: true })}`
      + `\n  <rect x="${x + 144}" y="${y}" width="192" height="30" fill="#fff" stroke="#999"/>${t(x + 154, y + 20, v)}`;
  });
  return s;
};
S.write('kadai-02-screen', S.svg({
  W: 800, H: 306,
  title: '課題2の完成画面。/products/4 では付箋の詳細が出る。存在しない /products/999 では、取得に失敗しましたと HTTP 404 が出る',
  desc: '左は、ブラウザで http://localhost:5173/products/4 を開いた画面。見出しは「商品の詳細」で、商品IDは4、商品名は付箋、価格は300円、在庫数は80が縦に並ぶ。右は、http://localhost:5173/products/999 を開いた画面。商品がないので、赤い文字で「取得に失敗しました: HTTP 404」と出る。',
  body: `${browser({ x: 10, w: 380, h: 236, url: 'http://localhost:5173/products/4', stroke: GREEN })}
  ${hl({ x: 92, y: 20, w: 276, h: 26 })}
${detail(10)}
  ${browser({ x: 410, w: 380, h: 236, url: 'http://localhost:5173/products/999', stroke: S.RED })}
  ${hl({ x: 492, y: 20, w: 276, h: 26 })}
  ${t(434, 96, '商品の詳細', { size: 18, bold: true, fill: '#222' })}
  ${t(434, 132, '取得に失敗しました: HTTP 404', { size: 15, fill: '#c00' })}
  ${hl({ x: 428, y: 114, w: 250, h: 26 })}
  ${t(30, 280, '○ 商品がある：付箋の詳細が出る', { size: 15, bold: true, fill: GREEN })}
  ${t(430, 280, '× 商品がない：404 の失敗が出る', { size: 15, bold: true, fill: RED_TEXT })}`,
}));

// 課題3: /search
S.write('kadai-03-screen', S.svg({
  W: 660, H: 262,
  title: '課題3の完成画面。/search で「ペン」と入力して検索を押すと、ボールペンの1件だけが表に出る',
  desc: 'ブラウザで http://localhost:5173/search を開いた画面。見出しは「商品検索」。入力欄に「ペン」と入力して「検索」ボタンを押すと、表にボールペンの1件（商品ID 1、価格150円、在庫200）だけが出る。',
  body: `${browser({ x: 10, w: 640, h: 200, url: 'http://localhost:5173/search' })}
  ${t(40, 90, '商品検索', { size: 18, bold: true, fill: '#222' })}
  <rect x="40" y="102" width="200" height="30" rx="4" fill="#fff" stroke="#999"/>${t(52, 122, 'ペン')}
  ${S.btn({ x: 252, y: 102, w: 70, label: '検索', hot: true })}
  ${t(340, 122, '← 文字を入れて、このボタンを押す', { size: 15, bold: true, fill: RED_TEXT })}
  ${table({ left: 40, top: 142, cols: [{ label: '商品ID', w: 90 }, { label: '商品名', w: 240 }, { label: '価格（円）', w: 130, num: true }, { label: '在庫数', w: 110, num: true }], rows: [['1', 'ボールペン', '150', '200']] })}
  ${t(40, 236, '商品名に「ペン」を含む1件だけが出る', { size: 15, bold: true, fill: RED_TEXT })}`,
}));
