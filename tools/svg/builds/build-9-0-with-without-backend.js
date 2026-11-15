// 9-0-with-without-backend: バックエンドが不要な画面と必要な画面を、左右に並べて比べる。
// 色: 画面・通信と型=青、バックエンド=緑、データベース=橙（元の図の紫を直した）、補足の欄=灰
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;

const panel = (x, w) => `<g filter="url(#shadow)"><rect x="${x}" y="12" width="${w}" height="450" rx="16" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/></g>`;
// 流れの中の箱。lines は等幅の行
const node = (x, w, color, title, lines) => {
  const c = C[color];
  return `<g filter="url(#shadow)"><rect x="${x}" y="78" width="${w}" height="104" rx="12" fill="${c.light}" stroke="${c.main}" stroke-width="2.5"/></g>
  ${t(x + w / 2, 108, title, { size: SIZE.head, bold: true, fill: c.dark })}
${lines.map((s, i) => '  ' + t(x + w / 2, 134 + i * 22, s, { mono: true, fill: c.dark })).join('\n')}`;
};
// 情報の欄。ラベル（注記の太字）と本文
const info = (x, y, w, h, color, label, lines, mono) => {
  const c = C[color];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c.light}" stroke="${c.main}" stroke-width="2"/>
  ${t(x + 14, y + 22, label, { size: SIZE.note, bold: true, anchor: 'start', fill: c.dark })}
${lines.map((s, i) => '  ' + t(x + 14, y + 44 + i * 21, s, { anchor: 'start', mono })).join('\n')}`;
};

const body = `
${panel(20, 300)}
  ${t(170, 42, 'バックエンドが不要な画面', { size: SIZE.head, bold: true, fill: C.blue.dark })}
  ${t(170, 64, 'この章の「メッセージ表示」', { fill: SUB })}
${node(60, 220, 'blue', '画面', ['pages/'])}
  ${t(170, 208, '画面の中で入力した値だけを使う', { fill: SUB })}
  ${info(36, 224, 268, 60, 'blue', '画面が使うデータ', ['画面の中で入力した値だけ'])}
  ${info(36, 296, 268, 82, 'gray', '追加するファイル', ['pages/ の画面のファイルだけ'])}
  ${info(36, 390, 268, 60, 'gray', '手順書', ['この章（第9章）'])}

${panel(340, 540)}
  ${t(610, 42, 'バックエンドが必要な画面', { size: SIZE.head, bold: true, fill: C.orange.dark })}
  ${t(610, 64, '商品一覧（お手本）', { fill: SUB })}
${node(356, 96, 'blue', '画面', ['pages/'])}
  ${L.arrow({ x1: 454, y1: 130, x2: 474, y2: 130, color: 'gray', width: 4 })}
${node(476, 112, 'blue', '通信と型', ['api/', 'types/'])}
  ${L.arrow({ x1: 590, y1: 130, x2: 610, y2: 130, color: 'gray', width: 4 })}
${node(612, 130, 'green', 'バックエンド', ['api/', 'dto/'])}
  ${L.arrow({ x1: 744, y1: 130, x2: 764, y2: 130, color: 'gray', width: 4 })}
  <g filter="url(#shadow)"><rect x="766" y="78" width="100" height="104" rx="12" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2.5"/></g>
  ${t(816, 120, 'データ', { size: SIZE.head, bold: true, fill: C.orange.dark })}
  ${t(816, 144, 'ベース', { size: SIZE.head, bold: true, fill: C.orange.dark })}
  ${t(610, 208, 'データベースに保存されている値を、バックエンド経由で受け取る', { fill: SUB })}
  ${info(356, 224, 510, 60, 'orange', '画面が使うデータ', ['データベースに保存されている値'])}
  ${info(356, 296, 510, 82, 'gray', '追加するファイル', ['pages/ に加えて、api/、types/、', 'backend/ の api/ と dto/ の Java ファイルなど'])}
  ${info(356, 390, 510, 60, 'gray', '手順書', ['第10章（API を追加して、画面から呼ぶ）'])}`;

const y0 = 478;
L.write('9-0-with-without-backend', L.svg({
  y0,
  title: 'バックエンドが不要な画面（この章のメッセージ表示）と、バックエンドが必要な画面（商品一覧）で、使うデータと、追加するファイルがどう違うかを並べて比べた図',
  desc: '左は、バックエンドが不要な画面。画面の中で入力した値だけを使い、pages/ の画面のファイルだけを追加する。手順書はこの章（第9章）。右は、バックエンドが必要な画面（商品一覧）。画面から、通信と型、バックエンド、データベースの順につながり、データベースに保存されている値をバックエンド経由で受け取る。追加するファイルは pages/ に加えて api/、types/、backend/ の api/ と dto/ の Java ファイルなど。手順書は第10章。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['バックエンドが要るかどうかで、', '使うデータも追加するファイルも変わるんだ。', 'この章は、要らない画面から作ってみよう。'] }),
}));
