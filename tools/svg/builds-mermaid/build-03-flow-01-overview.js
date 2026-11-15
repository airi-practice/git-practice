// 03-flow-01-overview: 3-2 の全体の流れ（フロントエンド → App → ProductListApi → Database / PostgreSQL → フロントエンド）
const { L, node, cyl, down, right, poly, pl, done } = require('./_common-03');

const F = { x: 20, y: 30, w: 180 }, A = { x: 20, y: 250, w: 180 }, P = { x: 375, y: 250, w: 180 }, D = { x: 730, y: 250, w: 150 }, DB = { x: 375, y: 430, w: 180 };
const body = `
  ${node({ ...F, color: 'blue', lines: ['フロントエンド', 'GET /api/products', 'を送る'] })}
  ${node({ ...A, color: 'green', lines: ['App.java', '8080 番で待ち受けて、', 'URL に合う処理を探す'] })}
  ${node({ ...P, color: 'green', lines: ['api/', 'ProductListApi.java', '処理を実行する'], bold: 2 })}
  ${node({ ...D, color: 'green', lines: ['Database.java', 'データベースへの', '接続を作る'] })}
  ${cyl({ ...DB, color: 'orange', lines: ['PostgreSQL', 'products テーブル'] })}
  ${down(110, 116, 250, 'blue')}
  ${pl({ cx: 191, y: 168, label: 'リクエスト', n: '1', color: 'blue' })}
  ${right(293, 200, 375, 'green')}
  ${pl({ cx: 287, y: 255, label: 'handle を呼ぶ', n: '2', color: 'green' })}
  ${L.biArrow({ x1: 559, y1: 293, x2: 727, y2: 293, colorGo: 'green', colorBack: 'green' })}
  ${pl({ cx: 643, y: 251, label: 'connect を呼ぶ', n: '3', color: 'green' })}
  ${pl({ cx: 643, y: 305, label: '接続を返す', n: '4', color: 'green' })}
  ${L.biArrow({ x1: 465, y1: 340, x2: 465, y2: 426, colorGo: 'green', colorBack: 'orange' })}
  ${pl({ cx: 379, y: 368, label: 'SQL を送る', n: '5', color: 'green' })}
  ${pl({ cx: 550, y: 368, label: '行のデータ', n: '6', color: 'orange' })}
  ${poly({ pts: [[465, 244], [465, 73], [206, 73]], color: 'green' })}
  ${pl({ cx: 335, y: 58, label: 'JSON にして返す', n: '7', color: 'green' })}`;

done('03-flow-01-overview', 514,
  'フロントエンドが GET /api/products を送り、App、ProductListApi、Database、PostgreSQL を通って、JSON が返るまでの7段階の流れを示した図',
  '1 フロントエンドが GET /api/products をリクエストとして App.java に送る。2 App.java が handle を呼んで ProductListApi.java に処理を任せる。3 ProductListApi が connect を呼んで Database.java に接続を頼む。4 Database が接続を返す。5 ProductListApi が PostgreSQL の products テーブルへ SQL を送る。6 PostgreSQL が行のデータを返す。7 ProductListApi が JSON にしてフロントエンドへ返す。',
  body);
