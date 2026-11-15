// 12-3-yaml-nesting: application.yml の字下げ(入れ子)と、7つの設定の意味を番号で対応づける。
// 色: 1,2=データベース接続(橙)、3,4=JPA(p1)、5=灰、6=SQL初期化(p2)、7=サーバー(緑)。色だけでなく番号と設定名のラベルも付ける。
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const mono = (x, y, s, o = {}) => t(x, y, s, { mono: true, ...o });
const nb = (n) => ' '.repeat(n);

// 上段: 名前をドットでつなぐ図
const chips = [['spring', 'g'], ['.', 'd'], ['datasource', 'g'], ['.', 'd'], ['url', 'g'], ['＝', 'e'], ['spring.datasource.url', 'f']];
const wOf = (s, k) => (k === 'd' ? 22 : k === 'e' ? 34 : s.length * 9.3 + 26);
const total = chips.reduce((a, [s, k]) => a + wOf(s, k), 0);
let cx = (900 - total) / 2;
const top = chips.map(([s, k]) => {
  const w = wOf(s, k), x = cx; cx += w;
  if (k === 'd' || k === 'e') return t(x + w / 2, 66, s, { size: SIZE.head, bold: true, fill: C.gray.main });
  const c = k === 'f' ? C.orange : C.gray;
  return `<g filter="url(#shadow)"><rect x="${x + 2}" y="42" width="${w - 4}" height="32" rx="8" fill="${c.light}" stroke="${c.main}" stroke-width="2"/></g>\n  ${mono(x + w / 2, 63, s, { fill: c.dark, bold: k === 'f' })}`;
}).join('\n  ');

// 左の YAML の行。[字下げ, 文字, 番号(省略可), 色]
const yaml = [
  [0, 'spring:'], [2, 'datasource:'], [4, 'url: jdbc:postgresql://localhost:5433/training', 1, 'orange'],
  [4, 'username: training', 2, 'orange'], [4, 'password: training', 2, 'orange'],
  [2, 'jpa:'], [4, 'hibernate:'], [6, 'ddl-auto: update', 3, 'p1'],
  [4, 'defer-datasource-initialization: true', 4, 'p1'], [4, 'open-in-view: false', 5, 'gray'],
  [2, 'sql:'], [4, 'init:'], [6, 'mode: always', 6, 'p2'],
  [0, 'server:'], [2, 'port: 8080', 7, 'green'],
];
const Y0 = 150, P = 32;
const left = yaml.map(([ind, s, n, color], i) => {
  const y = Y0 + i * P;
  const hl = n ? `<rect x="28" y="${y - 20}" width="414" height="28" rx="6" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="1.5"/>\n  ${L.badge({ cx: 44, cy: y - 6, n: String(n), color })}\n  ` : '';
  return hl + mono(62, y, nb(ind) + s, { size: SIZE.note, anchor: 'start' });
}).join('\n  ');

// 右の説明。[番号, 色, 設定名, 説明の行]
const rows = [
  [1, 'orange', 'spring.datasource.url', ['5433 番の training データベースに接続する']],
  [2, 'orange', 'spring.datasource.username / password', ['ユーザー名とパスワード', '（docker-compose.yml と一致）']],
  [3, 'p1', 'spring.jpa.hibernate.ddl-auto', ['Entity から、', 'テーブルがなければ作る（12-8）']],
  [4, 'p1', 'spring.jpa.defer-datasource-initialization', ['テーブルを作ったあとに、', 'data.sql を実行する（12-8）']],
  [5, 'gray', 'spring.jpa.open-in-view', ['レスポンスを作り終えるまで、', '接続を持ち続けない']],
  [6, 'p2', 'spring.sql.init.mode', ['PostgreSQL でも、', '起動時に data.sql を実行する（12-8）']],
  [7, 'green', 'server.port', ['8080 番で待ち受ける', '（backend/ と同時には動かせない）']],
];
const right = rows.map(([n, color, name, desc], i) => {
  const y = 100 + i * 76, c = C[color];
  return `<g filter="url(#shadow)"><rect x="462" y="${y}" width="418" height="70" rx="12" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
  ${L.badge({ cx: 486, cy: y + 35, n: String(n), color })}
  ${mono(508, y + 22, name, { size: SIZE.note, bold: true, anchor: 'start', fill: c.dark })}
${desc.map((s, k) => '  ' + t(508, y + 44 + k * 20, s, { anchor: 'start' })).join('\n')}`;
}).join('\n');

const body = `
  ${t(450, 24, '字下げ（行頭の空白）で、項目が入れ子になる。上の名前を「.」でつなぐと、表に出てくる設定の名前になる')}
  ${top}
  <g filter="url(#shadow)"><rect x="20" y="100" width="430" height="526" rx="14" fill="#ffffff" stroke="${C.gray.main}" stroke-width="2"/></g>
  <path d="M20 134 v-20 a14 14 0 0 1 14 -14 h402 a14 14 0 0 1 14 14 v20 z" fill="url(#headGray)"/>
  ${mono(36, 123, 'backend_spring/src/main/resources/application.yml', { size: SIZE.note, bold: true, anchor: 'start', fill: '#ffffff' })}
  ${left}
${right}`;
const y0 = 642;
L.write('12-3-yaml-nesting', L.svg({
  y0,
  title: 'application.yml の字下げが入れ子を表し、上の名前をドットでつなぐと設定の名前になることと、7つの設定が何に効くかを、番号と色で対応づけた図',
  desc: '字下げ（行頭の空白）で項目が入れ子になり、spring、datasource、url を「.」でつなぐと spring.datasource.url という設定の名前になる。application.yml の7つの設定を番号で説明に対応づけている。1 はデータベースへの接続先、2 はユーザー名とパスワード、3 は Entity からテーブルを作る設定、4 はテーブルを作ったあとに data.sql を実行する設定、5 はレスポンスを作り終えるまで接続を持ち続けない設定、6 は PostgreSQL でも起動時に data.sql を実行する設定、7 は 8080 番で待ち受ける設定。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['字下げは入れ子を表すんだ。', '上の名前をドットでつなぐと、', '設定の名前になるよ。'] }),
}));
