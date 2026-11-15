// 7-1-backend-handle: handle メソッドの3つの動き。処理はすべてバックエンドなので3枚とも緑、つながる相手だけ役割の色にする。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const g = C.green;
const CW = 262, CH = 204, CY = 64, XS = [36, 324, 612];
const step = (k, title, codes, descs, note) => {
  const x = XS[k], bh = codes.length === 2 ? 56 : 34;
  return `${L.card({ x, y: CY, w: CW, h: CH, color: 'green', title })}
  <circle cx="${x + 24}" cy="${CY + 23}" r="12" fill="#ffffff"/>
  ${t(x + 24, CY + 28, k + 1, { size: SIZE.note, bold: true, fill: g.dark })}
  <rect x="${x + 12}" y="${CY + 58}" width="${CW - 24}" height="${bh}" rx="8" fill="#f1f5f9" stroke="#cbd5e1"/>
  ${codes.map((c, i) => t(x + CW / 2, CY + 80 + i * 22 - (codes.length === 1 ? 0 : 0), c, { size: SIZE.note, mono: true, fill: '#1e293b' })).join('\n  ')}
  ${descs.map((d, i) => t(x + CW / 2, CY + 58 + bh + 26 + i * 22, d)).join('\n  ')}${note ? '\n  ' + t(x + CW / 2, CY + CH - 14, note, { size: SIZE.note, fill: SUB }) : ''}`;
};
const target = (x, color, label) => `${L.arrow({ x1: x + 100, y1: CY + CH + 4, x2: x + 100, y2: CY + CH + 38, color: 'green', width: 4 })}
  <g filter="url(#shadow)"><rect x="${x}" y="${CY + CH + 42}" width="200" height="40" rx="12" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/></g>
  ${t(x + 100, CY + CH + 68, label, { bold: true, fill: C[color].dark })}`;
const bot = CY + CH + 42 + 40 + 14;
const body = `
  <rect x="20" y="12" width="860" height="${bot - 12}" rx="16" fill="${g.light}" fill-opacity="0.45" stroke="${g.main}" stroke-width="2"/>
  ${t(40, 44, 'api/ProductListApi.java の handle', { size: SIZE.head, bold: true, mono: true, anchor: 'start', fill: g.dark })}
  ${t(860, 44, '商品一覧の処理は、この3つの動きでできている', { anchor: 'end' })}
${step(0, 'データベースにつなぐ', ['connection = Database.connect();'], ['Database.java が作る、', 'データベースへの接続を受け取る'], '（接続は、使い終わったら閉じる）')}
  ${L.arrow({ x1: 300, y1: 166, x2: 322, y2: 166, color: 'green', width: 5 })}
${step(1, '取り出して、詰める', ['executeQuery("SELECT ...")', 'new ProductResponse(...)'], ['SQL で取り出した行を、', '1件ずつ ProductResponse', 'に詰める'])}
  ${L.arrow({ x1: 588, y1: 166, x2: 610, y2: 166, color: 'green', width: 5 })}
${step(2, 'JSON にして返す', ['ctx.json(products);'], ['ProductResponse の List を、', 'JSON の配列に変換して、', 'レスポンスとして返す'])}
  ${target(XS[0] + 31, 'orange', 'データベース（PostgreSQL）')}
  ${target(XS[1] + 31, 'orange', 'products テーブル')}
  ${target(XS[2] + 31, 'blue', 'フロントエンド')}`;
const y0 = bot + 16;
L.write('7-1-backend-handle', L.svg({
  y0,
  title: 'ProductListApi の handle メソッドの3つの動きを、実際のコードの行と、つながる相手と一緒に示した図',
  desc: 'handle メソッドは、1 Database.connect() でデータベースにつなぎ、2 executeQuery で SQL を実行して行を取り出して ProductResponse に詰め、3 ctx.json(products) で JSON にして返す。つながる相手は、1 がデータベース（PostgreSQL）、2 が products テーブル、3 がフロントエンド。猫の先生が、コードの行とつながる相手を見てみようと話している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['handle メソッドは、3つの動きで', 'リクエストにこたえているんだ。', 'コードの行と、つながる相手を見てみよう。'] }),
}));
