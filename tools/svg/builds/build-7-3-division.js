// 7-3-division: 「商品の一覧を画面に表示する」を3つの層で分担する。変更ごとに直す層を右に示す。
// 色: フロントエンド=青、バックエンド=緑、データベース=橙（元の図は青と緑が逆だったので直した）
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const SEP = 560, RXT = 580;
const MONO = `font-family="Consolas,'Courier New',monospace"`;
const row = (y, h, color, name, sub, mid, right) => {
  const c = C[color];
  return `
  <g filter="url(#shadow)"><rect x="20" y="${y}" width="860" height="${h}" rx="16" fill="${c.light}" fill-opacity="0.55" stroke="${c.main}" stroke-width="2"/></g>
  <path d="M20 ${y + h - 16} v-${h - 32} a16 16 0 0 1 16 -16 h144 v${h} h-144 a16 16 0 0 1 -16 -16 z" fill="url(#${c.head})"/>
  ${t(100, y + h / 2 + 6, name, { size: SIZE.head, bold: true, fill: '#ffffff' })}
  ${t(100, y + h / 2 + 30, sub, { fill: '#ffffff' })}
  ${mid}
  <line x1="${SEP}" y1="${y + 12}" x2="${SEP}" y2="${y + h - 12}" stroke="${c.main}" stroke-opacity="0.5" stroke-dasharray="4,3"/>
  ${right}`;
};
const raw = (x, y, inner, fill, extra = '') => `<text x="${x}" y="${y}" font-size="15" ${MONO} fill="${fill}"${extra}>${inner}</text>`;
const link = (y, colorGo, colorBack, label) => `
  ${L.biArrow({ x1: 100, y1: y, x2: 100, y2: y + 36, colorGo, colorBack, width: 4, gap: 14 })}
  ${t(124, y + 24, label, { anchor: 'start' })}`;
const body = `
  ${t(450, 34, '「商品の一覧を画面に表示する」を、3つの層で分担する', { size: SIZE.title, bold: true })}
  ${t(200, 66, 'この機能での担当', { bold: true, anchor: 'start', fill: SUB })}
  ${t(RXT, 66, 'こんな変更なら、この層を直す', { bold: true, anchor: 'start', fill: SUB })}
${row(78, 124, 'blue', 'フロントエンド', '画面',
  `${t(200, 112, '商品の一覧を、表として見せる', { size: SIZE.head, bold: true, anchor: 'start', fill: C.blue.dark })}
  ${t(200, 142, 'ProductListPage.tsx の', { anchor: 'start' })}
  ${raw(200, 168, 'products.map(...)', '#1e293b', ' font-weight="bold"')}`,
  `${t(RXT, 112, '商品名が長いとき、画面で', { anchor: 'start' })}
  ${t(RXT, 134, '表を折り返して見せる', { anchor: 'start' })}
  ${t(RXT, 168, '→ index.css など', { bold: true, anchor: 'start', fill: C.blue.dark })}`)}
${link(206, 'blue', 'green', 'リクエスト（GET /api/products）と、JSON のレスポンス')}
${row(246, 124, 'green', 'バックエンド', 'Java',
  `${t(200, 280, '一覧を取得して、結果を詰めて返す', { size: SIZE.head, bold: true, anchor: 'start', fill: C.green.dark })}
  ${t(200, 306, 'SQL を送って、結果を ProductResponse に', { anchor: 'start' })}
  ${t(200, 328, '詰めて、ctx.json(...) で返す', { anchor: 'start' })}
  ${raw(200, 356, 'ProductListApi.handle()', '#1e293b', ' font-weight="bold"')}`,
  `${t(RXT, 280, '商品名の長さを検査して、', { anchor: 'start' })}
  ${t(RXT, 302, '長ければエラーにする', { anchor: 'start' })}
  ${t(RXT, 336, '→ api/ の中のクラスなど', { bold: true, anchor: 'start', fill: C.green.dark })}`)}
${link(374, 'green', 'orange', 'SELECT の SQL と、行のデータ')}
${row(414, 134, 'orange', 'データベース', 'PostgreSQL',
  `${t(200, 456, '商品の情報を保存している', { size: SIZE.head, bold: true, anchor: 'start', fill: C.orange.dark })}
  ${raw(200, 494, 'products テーブル', '#1e293b', ' font-weight="bold"')}`,
  `${t(RXT, 446, '商品名を保存できる長さの上限を変える', { anchor: 'start' })}
  ${t(RXT, 478, '→ App.initDatabase() の', { bold: true, anchor: 'start', fill: C.orange.dark })}
  ${raw(RXT, 500, '&#160;&#160;name VARCHAR(100)', C.orange.dark, ' font-weight="bold"')}
  ${t(RXT, 522, '\u00a0\u00a0と、テーブル', { bold: true, anchor: 'start', fill: C.orange.dark })}`)}`;
const y0 = 548 + 18;
L.write('7-3-division', L.svg({
  y0,
  title: '商品の一覧を画面に表示する機能を3つの層が分担するようすと、商品名についての変更ごとに直す層を示した図',
  desc: 'フロントエンドは ProductListPage.tsx の products.map(...) で商品の一覧を表として見せ、バックエンドは ProductListApi.handle() で一覧を取得して結果を詰めて返し、データベースは products テーブルに商品の情報を保存している。層の間では、リクエストと JSON のレスポンス、SELECT の SQL と行のデータが運ばれる。商品名が長いときの折り返しはフロントエンド（index.css など）、商品名の長さの検査はバックエンド（api/ の中のクラスなど）、商品名の長さの上限はデータベース（App.initDatabase() の name VARCHAR(100) とテーブル）を直す。猫の先生が、商品名の変更ならどの層を直すか考えてみようと話している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['変更したいことによって、直す層が', '変わるんだよ。商品名の変更なら、', 'どの層を直すか、考えてみよう。'] }),
}));
