// 7-1-frontend-roles: フロントエンドの3つの動き。処理はすべてフロントエンドなので3枚とも青。話す相手（バックエンド）は緑、知らない相手（データベース）は橙の破線。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const b = C.blue;
const CW = 262, CH = 206, CY = 64, XS = [36, 324, 612];
const step = (k, title, codes, descs, note) => {
  const x = XS[k];
  return `${L.card({ x, y: CY, w: CW, h: CH, color: 'blue', title })}
  <circle cx="${x + 24}" cy="${CY + 23}" r="12" fill="#ffffff"/>
  ${t(x + 24, CY + 28, k + 1, { size: SIZE.note, bold: true, fill: b.dark })}
  <rect x="${x + 12}" y="${CY + 58}" width="${CW - 24}" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
  ${codes.map(([c, bold], i) => t(x + CW / 2, codes.length === 1 ? CY + 91 : CY + 80 + i * 22, c, { size: SIZE.note, mono: true, bold, fill: bold ? b.dark : '#1e293b' })).join('\n  ')}
  ${descs.map((d, i) => t(x + CW / 2, CY + 142 + i * 22, d)).join('\n  ')}
  ${t(x + CW / 2, CY + CH - 12, note, { size: SIZE.note, fill: SUB })}`;
};
const BY = CY + CH + 40;
const body = `
  <rect x="20" y="12" width="860" height="${BY + 52 + 14 - 12}" rx="16" fill="${b.light}" fill-opacity="0.45" stroke="${b.main}" stroke-width="2"/>
  ${t(40, 44, 'pages/ProductListPage.tsx と api/products.ts', { size: SIZE.head, bold: true, mono: true, anchor: 'start', fill: b.dark })}
  ${t(864, 44, '商品一覧を表示するときの、フロントエンドの動き', { anchor: 'end' })}
${step(0, '画面の部品が呼ぶ', [['useEffect(() => {'], ['fetchProducts()', 1]], ['画面が表示されたあとに、', 'api/ の関数を呼ぶ'], '通信の細かい書き方は、持たない')}
  ${L.arrow({ x1: 300, y1: 168, x2: 322, y2: 168, color: 'blue', width: 5 })}
${step(1, 'リクエストを送る', [['const response ='], ["await fetch('/api/products')", 1]], ['fetch で、バックエンドへ', 'GET を送り、返事を待つ'], '知っているのは、この URL だけ')}
  ${L.arrow({ x1: 588, y1: 168, x2: 610, y2: 168, color: 'blue', width: 5 })}
${step(2, '届いた結果を入れる', [['.then(setProducts)', 1]], ['商品の一覧を、状態 products に', '入れる。画面が描き直される'], '結果は、表になって表示される')}
  ${L.arrow({ x1: 380, y1: CY + CH + 4, x2: 380, y2: BY - 4, color: 'blue', width: 4 })}
  <g filter="url(#shadow)"><rect x="100" y="${BY}" width="330" height="52" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(265, BY + 22, 'バックエンド（8080 番）', { bold: true, fill: C.green.dark })}
  ${t(265, BY + 42, 'フロントエンドが話す相手は、ここだけ', { size: SIZE.note, fill: SUB })}
  <rect x="470" y="${BY}" width="330" height="52" rx="12" fill="${C.orange.light}" fill-opacity="0.6" stroke="${C.orange.main}" stroke-width="1.5" stroke-dasharray="6,4"/>
  ${t(635, BY + 22, 'データベース', { bold: true, fill: C.orange.dark })}
  ${t(635, BY + 42, 'フロントエンドは、存在を知らない', { size: SIZE.note, fill: SUB })}`;
const y0 = BY + 52 + 14 + 16;
L.write('7-1-frontend-roles', L.svg({
  y0,
  title: 'フロントエンドが商品一覧を表示するときの3つの動きを、コードの行と一緒に示した図。フロントエンドが知っているのは /api/products という URL だけで、データベースの存在は知らない',
  desc: 'フロントエンドは、1 useEffect の中で fetchProducts() を呼び、2 fetch で /api/products に GET を送って返事を待ち、3 届いた商品の一覧を .then(setProducts) で状態 products に入れて、表にして表示する。話す相手はバックエンド（8080 番）だけで、データベースの存在は知らない。猫の先生が、図で確かめようと話している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['フロントエンドは、3つの動きで商品一覧を', '表示するんだよ。話す相手はバックエンド', 'だけだと、図で確かめてみよう。'] }),
}));
