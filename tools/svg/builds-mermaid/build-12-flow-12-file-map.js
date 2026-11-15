// 12-flow-12: フロントエンド・バックエンド・データベースのファイルの関係
const { node, grp, arr, pill, out } = require('./_wrap-12');
const nm = '12-flow-12-file-map';

const P = (s) => ({ s, mono: true, bold: true });
const LX = 40, LW = 360, RX = 460, RW = 400, H = 68;

// フロントエンド（青）
const FE = grp({ x: 20, y: 20, w: 860, h: 240, color: 'blue', label: 'フロントエンド：frontend/（ブラウザの中で動く）' });
const F4 = node({ x: LX, y: 64, w: LW, h: H, color: 'blue', lines: [P('src/types/product.ts'), 'Product：届くデータの型'] });
const F2 = node({ x: RX, y: 64, w: RW, h: H, color: 'blue', lines: [P('src/pages/ProductListPage.tsx'), 'ProductListPage：商品の表を表示する'] });
const F5 = node({ x: LX, y: 172, w: LW, h: H, color: 'blue', lines: [P('vite.config.ts'), '/api をバックエンドへ中継する'] });
const F3 = node({ x: RX, y: 172, w: RW, h: H, color: 'blue', lines: [P('src/api/products.ts'), 'fetchProducts：リクエストを送る'] });

// バックエンド（緑）。ラベルが長いので3行に分ける。矢印はラベルの右側（x=620 と 850）を通す
const BY = 330, r1 = 422, r2 = 526, r3 = 630, r4 = 734;
const BE = grp({ x: 20, y: BY, w: 860, h: r4 + H + 20 - BY, color: 'green', label: ['バックエンド：', 'backend_spring/src/main/java/jp/co/copel/training/', '（Java・Spring Boot）'] });
const B1 = node({ x: RX, y: r1, w: RW, h: H, color: 'green', lines: [P('controller/ProductController.java'), 'list：リクエストを受け付ける'] });
const B2 = node({ x: RX, y: r2, w: RW, h: H, color: 'green', lines: [P('service/ProductService.java'), 'findAll：処理して詰め替える'] });
const B3 = node({ x: RX, y: r3, w: RW, h: H, color: 'green', lines: [P('repository/ProductRepository.java'), 'findAll：データベースの窓口'] });
const B5 = node({ x: LX, y: r2, w: LW, h: H, color: 'green', lines: [P('dto/ProductResponse.java'), '返すデータの形'] });
const B4 = node({ x: LX, y: r3, w: LW, h: H, color: 'green', lines: [P('entity/Product.java'), 'テーブルの1行に対応する'] });
const B6 = node({ x: LX, y: r4, w: LW, h: H, color: 'green', lines: [P('resources/application.yml'), '接続設定'] });

// データベース（橙）
const DY = r4 + H + 20 + 70;
const DB = grp({ x: 20, y: DY, w: 860, h: 68 + H + 20, color: 'orange', label: ['データベース：PostgreSQL 17', '（Docker のコンテナ。docker-compose.yml で起動）'] });
const T = node({ x: RX, y: DY + 68, w: RW, h: H, color: 'orange', lines: ['products テーブル', 'id / name / price / stock / created_at'] });

const AX1 = 620, AX2 = 850;
const body = FE + BE + DB +
  F4.s + F2.s + F5.s + F3.s + B1.s + B2.s + B3.s + B5.s + B4.s + B6.s + T.s +
  arr({ x1: F2.x - 2, y1: F2.cy, x2: F4.r + 5, y2: F4.cy, color: 'blue', dashed: true }) +
  arr({ x1: F2.cx, y1: F2.b + 2, x2: F2.cx, y2: F3.y - 5, color: 'blue' }) +
  arr({ x1: AX1, y1: F3.b + 2, x2: AX1, y2: B1.y - 5, color: 'blue' }) +
  arr({ x1: AX2, y1: B1.y - 2, x2: AX2, y2: F3.b + 5, color: 'green' }) +
  pill({ cx: 410, y: 275, label: 'HTTP リクエスト GET /api/products', n: '1', color: 'blue' }) +
  pill({ cx: 735, y: 275, label: 'JSON のレスポンス', n: '6', color: 'green' }) +
  arr({ x1: B1.cx, y1: B1.b + 2, x2: B1.cx, y2: B2.y - 5, color: 'green' }) +
  arr({ x1: B2.cx, y1: B2.b + 2, x2: B2.cx, y2: B3.y - 5, color: 'green' }) +
  arr({ x1: B3.x - 2, y1: B3.cy, x2: B4.r + 5, y2: B4.cy, color: 'green' }) +
  arr({ x1: B2.x - 2, y1: B2.cy, x2: B5.r + 5, y2: B5.cy, color: 'green' }) +
  arr({ x1: B6.r + 2, y1: B6.cy - 4, x2: B3.x + 24, y2: B3.b + 5, color: 'green', dashed: true }) +
  arr({ x1: AX1, y1: B3.b + 2, x2: AX1, y2: T.y - 5, color: 'green' }) +
  arr({ x1: AX2, y1: T.y - 2, x2: AX2, y2: B3.b + 5, color: 'orange' }) +
  pill({ cx: 470, y: 837, label: 'SQL（products の全件取得）', n: '3', color: 'green' }) +
  pill({ cx: 735, y: 837, label: '行のデータ', n: '4', color: 'orange' }) +
  pill({ cx: 537, y: 750, label: '接続先を伝える', color: 'green' });

out(nm, DY + 68 + H + 20,
  'フロントエンド・バックエンド・データベースのファイルの関係',
  'フロントエンドの frontend/ には、ProductListPage.tsx、products.ts（fetchProducts）、product.ts（Product の型）、vite.config.ts がある。ProductListPage は fetchProducts を使い、Product の型を参照する。バックエンドの backend_spring には、ProductController、ProductService、ProductRepository、Product、ProductResponse、application.yml がある。1 fetchProducts が GET /api/products のリクエストを ProductController へ送り、ProductController が ProductService を呼び、ProductService が ProductRepository を呼ぶ。ProductRepository は Product を使い、ProductService は ProductResponse を使う。3 ProductRepository が products テーブルへ SQL を送り、4 行のデータが返り、6 JSON のレスポンスが fetchProducts へ返る。application.yml が ProductRepository に接続先を伝える。データベースは Docker のコンテナで動く PostgreSQL 17 で、products テーブルがある。',
  body,
  ['フロントエンド：frontend/（ブラウザの中で動く）', 'src/pages/ProductListPage.tsx', 'ProductListPage：商品の表を表示する', 'src/api/products.ts', 'fetchProducts：リクエストを送る', 'src/types/product.ts', 'Product：届くデータの型', 'vite.config.ts', '/api をバックエンドへ中継する',
    'バックエンド：backend_spring/src/main/java/jp/co/copel/training/（Java・Spring Boot）', 'controller/ProductController.java', 'list：リクエストを受け付ける', 'service/ProductService.java', 'findAll：処理して詰め替える', 'repository/ProductRepository.java', 'findAll：データベースの窓口', 'entity/Product.java', 'テーブルの1行に対応する', 'dto/ProductResponse.java', '返すデータの形', 'resources/application.yml', '接続設定',
    'データベース：PostgreSQL 17（Docker のコンテナ。docker-compose.yml で起動）', 'products テーブル', 'id / name / price / stock / created_at',
    'HTTP リクエスト GET /api/products', 'JSON のレスポンス', 'SQL（products の全件取得）', '行のデータ', '接続先を伝える']);
