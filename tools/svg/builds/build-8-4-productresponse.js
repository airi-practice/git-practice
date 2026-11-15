// 8-4-productresponse: ProductListApi が ProductResponse に値を入れ、getter の名前から JSON のキーが決まる流れ。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const G = C.green;
const NB = '\u00a0';
const code = (x, y, s, o = {}) => t(x, y, s, { mono: true, anchor: 'start', ...o });
const col = (x, w, title, mono) => `
${L.card({ x, y: 12, w, h: 390, color: 'green', title: '' })}
  ${t(x + w / 2, 43, title, { size: SIZE.head, bold: true, mono, fill: '#ffffff' })}`;
const label = (x, n, s) => L.badge({ cx: x + 22, cy: 82, n, color: 'green' }) + '\n  ' + t(x + 42, 88, s, { bold: true, anchor: 'start', fill: G.dark });
const codebox = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/>`;
const lines = (x, y, arr, o = {}) => arr.map((s, k) => code(x, y + k * 20, s, o)).join('\n  ');
const c1 = `${col(20, 240, 'api/ProductListApi.java', true)}
  ${label(34, '1', '値を入れて、作る')}
  ${codebox(34, 104, 212, 116)}
  ${lines(44, 128, ['new ProductResponse(', NB + NB + 'rs.getLong("id"),', NB + NB + 'rs.getString("name"),', NB + NB + 'rs.getInt("price"),', NB + NB + 'rs.getInt("stock"))'])}
  ${t(140, 252, '取り出した行の4つの値を、')}
  ${t(140, 274, 'コンストラクタに渡す')}
  ${t(140, 340, '冒頭の import で、', { size: SIZE.note, fill: SUB })}
  ${t(140, 360, 'ProductResponse を使えるようにする', { size: SIZE.note, fill: SUB })}`;
const c2 = `${col(286, 290, 'dto/ProductResponse.java', true)}
  ${label(300, '2', '値を持つだけのクラス')}
  ${codebox(300, 104, 262, 92)}
  ${lines(310, 128, ['private final long id;', 'private final String name;', 'private final int price;', 'private final int stock;'])}
  ${t(431, 222, '4つの項目を、フィールドに持つ')}
  ${t(431, 244, 'final は、あとから書き換えない印')}
  ${codebox(300, 266, 262, 72)}
  ${lines(310, 290, ['public long getId()', 'public String getName()', 'getPrice()、getStock()'])}
  ${t(431, 364, 'getter で、値を取り出せる')}
  ${t(431, 388, 'dto/ に置き、api/ と別のファイルにする', { size: SIZE.note, fill: SUB })}`;
const map = (y, g, k) => `${code(622, y, g)}${t(742, y, '→', { bold: true, fill: G.dark })}${code(764, y, k, { bold: true, fill: G.dark })}`;
const c3 = `${col(602, 278, 'ctx.json で JSON になる', false)}
  ${label(616, '3', 'getter の名前がキーになる')}
  ${codebox(616, 104, 250, 156)}
  ${map(136, 'getId()', '"id"')}
  ${map(172, 'getName()', '"name"')}
  ${map(208, 'getPrice()', '"price"')}
  ${map(244, 'getStock()', '"stock"')}
  ${t(741, 292, 'JSON に出したい項目には、')}
  ${t(741, 314, 'getter が必要になる')}
  ${codebox(616, 332, 250, 56)}
  ${code(626, 355, '{"id":1,"name":"ボールペン",')}
  ${code(626, 377, '"price":150,"stock":200}')}`;
const arrows = L.arrow({ x1: 264, y1: 140, x2: 282, y2: 140, color: 'green', width: 4 }) + L.arrow({ x1: 580, y1: 260, x2: 598, y2: 260, color: 'green', width: 4 });
const y0 = 418;
L.write('8-4-productresponse', L.svg({
  y0,
  title: 'ProductListApi が ProductResponse に値を入れ、ProductResponse は値を持つだけで、getter の名前から JSON のキーが決まることを示した図',
  desc: '1 ProductListApi が、取り出した行の4つの値（id、name、price、stock）をコンストラクタに渡して ProductResponse を作る。2 ProductResponse は4つのフィールドと getter を持つだけのクラスで、dto/ に置く。3 ctx.json で JSON にすると、getId() は "id"、getName() は "name"、getPrice() は "price"、getStock() は "stock" というキーになる。',
  body: c1 + c2 + c3 + arrows,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['ProductResponse は、値を持つだけなんだ。', 'getter の名前から、JSON のキーが決まるよ。'] }),
}));
