// 13-4-handle-vs-layers: handle に1つに書いた5つの仕事が、3つのクラスと Spring の自動に、色で分かれて対応する図。
// 色は「どのクラスの仕事か」で決める。Controller=紫(p1)、Service=青緑(p2)、Repository=データベースの操作なので橙、Spring が自動でやること=灰。
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const cardMono = (o) => L.card({ ...o, title: '' }) + '\n  ' + t(o.x + o.w / 2, o.y + 31, o.title, { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' });
// code が null なら見出しだけ。plain=true なら、コードではなく説明文なので等幅にしない
const job = (x, y, w, h, col, title, code, opt = {}) => {
  const c = C[col];
  return `
  ${L.box({ x, y, w, h, color: col, dashed: opt.dashed })}
  ${t(x + w / 2, y + 23, title, { bold: true, fill: c.dark })}
  ${t(x + w / 2, y + 45, code, { size: SIZE.note, mono: !opt.plain })}`;
};
const frame = (x, y, w, h, col, title) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${C[col].main}" stroke-width="2"/>
  ${t(x + w / 2, y + 25, title, { bold: true, mono: true, fill: C[col].dark })}`;
const left = [
  ['orange', '接続を開く', 'connection = Database.connect();'],
  ['orange', 'SQL を書いて送る', 'executeQuery("SELECT id, name, ...")'],
  ['p2', '1行ずつ、ProductResponse に詰め替える', 'new ProductResponse(rs.getLong("id"), ...)'],
  ['gray', '接続を閉じる', 'finally { connection.close(); }'],
  ['p1', 'JSON にして返す', 'ctx.json(products);'],
];
const body = `
${cardMono({ x: 20, y: 12, w: 410, h: 534, color: 'green', title: 'backend/' })}
  ${t(225, 76, '1つのメソッドに、全部書く', { bold: true, fill: C.green.dark })}
  ${L.box({ x: 35, y: 88, w: 380, h: 58, color: 'p1' })}
  ${t(225, 110, 'URL と処理の対応づけ（App.java）', { bold: true, fill: C.p1.dark })}
  ${t(225, 134, 'app.get("/api/products", new ProductListApi());', { size: SIZE.note, mono: true })}
  ${frame(35, 158, 380, 376, 'gray', 'ProductListApi.handle')}
${left.map(([c, ti, co], i) => job(48, 192 + i * 67, 354, 56, c, ti, co) + '\n  ' + L.badge({ cx: 48, cy: 192 + i * 67, n: i + 1, color: c })).join('')}
${cardMono({ x: 470, y: 12, w: 410, h: 534, color: 'green', title: 'backend_spring/' })}
  ${t(675, 76, '3つのクラスに分けて書く', { bold: true, fill: C.green.dark })}
  ${frame(485, 88, 380, 158, 'p1', 'ProductController')}
${job(497, 122, 356, 56, 'p1', 'URL と処理の対応づけ', '@RequestMapping と @GetMapping')}
${job(497, 184, 356, 56, 'p1', 'list() の戻り値を、Spring が JSON にする', '（ctx.json は呼ばない）', { plain: true })}
  ${frame(485, 258, 380, 98, 'p2', 'ProductService.findAll()')}
${job(497, 292, 356, 56, 'p2', '1件ずつ、ProductResponse に詰め替える', 'new ProductResponse(product.getId(), ...)')}
  ${frame(485, 368, 380, 166, 'orange', 'ProductRepository.findAll()')}
${job(497, 402, 356, 56, 'orange', 'データを取り出す', 'SQL は、Spring が作る（自分では書かない）', { plain: true })}
${job(497, 466, 356, 56, 'gray', '接続の開閉は、Spring が自動でやる', '（コードには書かれていない）', { plain: true, dashed: true })}`;
const y0 = 546 + 16;
L.write('13-4-handle-vs-layers', L.svg({
  y0,
  title: 'backend/ の handle に1つに書いた5つの仕事が、backend_spring/ では Controller・Service・Repository と、Spring が自動でやることに、色で分かれて対応する様子を示した図',
  desc: 'backend/ では、App.java の URL と処理の対応づけのあと、ProductListApi.handle の中に、接続を開く、SQL を書いて送る、ProductResponse に詰め替える、接続を閉じる、JSON にして返す、の5つを全部書く。backend_spring/ では、ProductController が URL の対応づけと、戻り値を Spring が JSON にする部分、ProductService.findAll() が ProductResponse への詰め替え、ProductRepository.findAll() がデータの取り出しを受け持ち、SQL を作ることと接続の開閉は Spring が自動でやる。猫の先生が、左は1つのメソッドに全部書き、右は役割ごとにクラスを分けると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['左は1つのメソッドに全部書くけど、', '右は役割ごとにクラスを分けるんだ。', 'どこが違うか比べてみよう。'] }),
}));
