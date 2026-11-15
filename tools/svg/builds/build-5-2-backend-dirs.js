// 5-2-backend-dirs: backend/ の中のファイルとディレクトリを、入れ子で示す図
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const Y = 146, CH = 244;
// 4種類のJavaクラスは、役割を持たない並列の項目なので p1〜p4 で区別する（名前のラベルも付ける）
const items = [
  { x: 50, w: 190, color: 'p1', name: 'App.java', head: '起動の入口', lines: ['データベースの準備と、', 'URL の振り分けを決める'], file: null, open: ['URL を足す、', '起動時の準備を', '変えるとき'] },
  { x: 252, w: 190, color: 'p2', name: 'Database.java', head: 'データベースへの接続', lines: ['接続を作って返す。', '接続情報はここだけ'], file: null, open: ['データベースの接続先を', '変えるとき'] },
  { x: 454, w: 190, color: 'p3', name: 'api/', head: 'API ごとの処理', lines: ['1API につき1ファイル'], file: 'ProductListApi.java', open: ['商品一覧の処理を', '直すとき'] },
  { x: 656, w: 194, color: 'p4', name: 'dto/', head: 'データを運ぶクラス', lines: ['リクエスト用・', 'レスポンス用のクラス'], file: 'ProductResponse.java', open: ['レスポンスの形を', '変えるとき'] },
];
const cards = items.map((it) => {
  const c = C[it.color], cx = it.x + it.w / 2;
  let s = L.card({ x: it.x, y: Y, w: it.w, h: CH, color: it.color, title: '' });
  s += `\n  ${t(cx, Y + 31, it.name, { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' })}`;
  s += `\n  ${t(cx, Y + 76, it.head, { bold: true, fill: c.dark })}`;
  it.lines.forEach((l, k) => { s += `\n  ${t(cx, Y + 98 + k * 20, l, { size: SIZE.note })}`; });
  if (it.file) s += `\n  ${t(cx, Y + 98 + it.lines.length * 20 + 4, it.file, { size: SIZE.note, mono: true, fill: c.dark })}`;
  s += `\n  <line x1="${it.x + 12}" y1="${Y + 150}" x2="${it.x + it.w - 12}" y2="${Y + 150}" stroke="#cbd5e1" stroke-width="1.5"/>`;
  s += `\n  ${t(cx, Y + 174, 'こんなときに開く', { size: SIZE.note, bold: true, fill: c.dark })}`;
  it.open.forEach((l, k) => { s += `\n  ${t(cx, Y + 196 + k * 18, l, { size: SIZE.note })}`; });
  return s;
}).join('\n');

const body = `
  <g filter="url(#shadow)"><rect x="20" y="12" width="860" height="400" rx="16" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2.5"/></g>
  ${L.icon({ name: 'folder', x: 36, y: 20, size: 28, color: C.green.main })}
  ${t(72, 42, 'backend/', { size: SIZE.title, bold: true, mono: true, fill: C.green.dark, anchor: 'start' })}
  ${t(180, 42, 'Java のバックエンド（第1〜10章で使う）', { fill: C.green.dark, anchor: 'start' })}
  <g filter="url(#shadow)"><rect x="40" y="56" width="820" height="40" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/></g>
  ${t(60, 82, 'pom.xml', { bold: true, mono: true, fill: C.gray.dark, anchor: 'start' })}
  ${t(150, 82, '使う部品の一覧と、ビルドの設定（Maven）', { size: SIZE.note, anchor: 'start' })}
  <rect x="40" y="108" width="820" height="294" rx="12" fill="#ffffff" stroke="${C.green.main}" stroke-width="2" stroke-dasharray="7,4"/>
  ${t(56, 134, 'src/main/java/jp/co/copel/training/', { bold: true, mono: true, fill: C.green.dark, anchor: 'start' })}
  ${t(420, 134, 'Java のクラスは、この4種類', { size: SIZE.note, anchor: 'start' })}
${cards}`;

L.write('5-2-backend-dirs', L.svg({
  y0: 428,
  title: 'backend/ の中のファイルとディレクトリを、役割ごとに色分けして入れ子で示した図。直したいときにどれを開くかも添えている',
  desc: 'backend/ の中に pom.xml と、src/main/java/jp/co/copel/training/ がある。その中の Java のクラスは、起動の入口の App.java、データベースへの接続の Database.java、API ごとの処理の api/、データを運ぶクラスの dto/ の4種類。それぞれに、こんなときに開く、という目安を添えている。猫の先生が、色を見て役割のファイルを探すよう促している。',
  body,
  footer: L.foot({ W: 900, y0: 428, pose: 'wave', lines: ['直したいことによって、開くファイルが', '決まっているんだ。まずは色を見て、', 'どの役割のファイルか探してみよう。'] }),
}));
