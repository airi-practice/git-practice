// 5-6-roles-layers: 11個の部品を、フロントエンド・バックエンド・データベースの3層に分けて示す図
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const IY = 78, IH = 92, GAP = 10;
// 部品1つ分のカード。左の太い帯で層の色を示す
const item = (x, y, w, color, name, lines, gray) => {
  const c = C[color];
  return `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${IH}" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="1.8"/></g>
  <path d="M${x} ${y + 12} a12 12 0 0 1 12 -12 h4 v${IH} h-4 a12 12 0 0 1 -12 -12 z" fill="url(#${c.head})"/>
  ${t(x + 22, y + 26, name, { bold: true, mono: true, fill: c.dark, anchor: 'start' })}
${lines.map((l, k) => '  ' + t(x + 22, y + 48 + k * 18, l, { size: SIZE.note, anchor: 'start', fill: gray && k === lines.length - 1 && gray === true ? '#555555' : undefined })).join('\n')}`;
};
const head = (x, w, color, label) => `
  <g filter="url(#shadow)"><rect x="${x}" y="18" width="${w}" height="44" rx="12" fill="url(#${C[color].head})"/></g>
  ${t(x + w / 2, 47, label, { size: SIZE.head, bold: true, fill: '#ffffff' })}`;
const col = (x, w, color, list) => list.map((it, k) => item(x, IY + k * (IH + GAP), w, color, it[0], it[1], it[2])).join('');

const FX = 20, FW = 306, BX = 364, BW = 306, DX = 708, DW = 172;
const front = col(FX, FW, 'blue', [
  ['main.tsx', ['最初に動く。BrowserRouter で包んだ', 'App を、index.html の入れ物に表示する']],
  ['App.tsx の App', ['Route でパスと画面を対応づける。', '/products のとき ProductListPage を表示する']],
  ['pages/ProductListPage.tsx', ['ProductListPage：', '商品一覧の画面の部品']],
  ['api/products.ts', ['fetchProducts：商品一覧のリクエストを、', 'バックエンドに送る']],
  ['types/product.ts', ['Product：商品1件分のデータの型']],
]);
const back = col(BX, BW, 'green', [
  ['App の main', ['起動の入口。URL と処理の対応づけをして、', '8080 番で待ち受ける']],
  ['App の initDatabase', ['products テーブルを作り、', '見本の商品を登録する', '（学習用の動作確認のための処理）'], true],
  ['Database の connect', ['データベースへの接続を作る']],
  ['ProductListApi の handle', ['GET /api/products を受け付けて、', '商品を全件取り出して返す']],
  ['dto/ProductResponse.java', ['ProductResponse：レスポンスとして返す、', '商品1件分のデータの形']],
]);
const dbItem = item(DX, IY, DW, 'orange', 'products テーブル', ['商品の情報の保存先']);
const dbNote = `
  <rect x="${DX}" y="188" width="${DW}" height="${IY + 5 * IH + 4 * GAP - 188}" rx="12" fill="${C.gray.light}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,4"/>
  ${t(DX + DW / 2, 270, 'フロントエンドは、', { size: SIZE.note, fill: C.gray.dark })}
  ${t(DX + DW / 2, 292, 'データベースを知らない。', { size: SIZE.note, fill: C.gray.dark })}
  ${t(DX + DW / 2, 314, 'つなぐのは、', { size: SIZE.note, fill: C.gray.dark })}
  ${t(DX + DW / 2, 336, 'バックエンドだけ', { size: SIZE.note, bold: true, fill: C.gray.dark })}`;

const AY = 300;
const body = `${head(FX, FW, 'blue', 'フロントエンド（frontend/）')}${head(BX, BW, 'green', 'バックエンド（backend/）')}${head(DX, DW, 'orange', 'データベース')}
${front}
${back}
${dbItem}
${dbNote}
  ${L.biArrow({ x1: FX + FW + 4, y1: AY, x2: BX - 4, y2: AY, colorGo: 'blue', colorBack: 'green', width: 4, gap: 14 })}
  ${t((FX + FW + BX) / 2, AY + 34, 'API', { size: SIZE.note, bold: true, fill: C.gray.dark })}
  ${L.biArrow({ x1: BX + BW + 4, y1: AY, x2: DX - 4, y2: AY, colorGo: 'green', colorBack: 'orange', width: 4, gap: 14 })}`;
const y0 = IY + 5 * IH + 4 * GAP + 16;

L.write('5-6-roles-layers', L.svg({
  y0,
  title: '覚えておきたい11個のクラスや部品を、フロントエンド、バックエンド、データベースの3つの層に分けて、役割と一緒に配置した図',
  desc: 'フロントエンドの5つの部品（main.tsx、App、ProductListPage、fetchProducts、Product）、バックエンドの5つの部品（App の main、initDatabase、Database の connect、ProductListApi の handle、ProductResponse）、データベースの products テーブルを並べている。フロントエンドとバックエンドは API でつながり、バックエンドとデータベースがつながる。フロントエンドはデータベースを知らず、つなぐのはバックエンドだけ。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['11個の部品は、3つの層のどれかに', '入っているんだよ。', 'どの層の部品か、考えながら覚えよう。'] }),
}));
