// 8-6-add-api: 新しい API を足すとき、新しく作る・1行足す・変更しないファイルを色分けして見せる。
// 色: 新しく作る=緑（バックエンド）、1行足す=黄（強調）、変更しない=灰、Database との関係=橙
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;

const tag = (x, y, label, color) => {
  const c = C[color];
  return `<rect x="${x}" y="${y}" width="112" height="26" rx="13" fill="url(#${c.head})"/>
  ${t(x + 56, y + 18, label, { size: SIZE.note, bold: true, fill: c.headText ?? '#ffffff' })}`;
};
// ファイルの行。名前は等幅
const row = (x, y, w, name, label, color) => {
  const c = C[color];
  return `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${c.light}" stroke="${c.main}" stroke-width="${color === 'gray' ? 1.5 : 2.5}"/></g>
  ${L.icon({ name: 'file', x: x + 12, y: y + 11, size: 22, color: c.main })}
  ${t(x + 44, y + 28, name, { mono: true, anchor: 'start', fill: c.dark })}
  ${tag(x + w - 124, y + 9, label, color)}`;
};

const body = `
  ${t(450, 38, '新しい API を足すとき、最低限触るファイルは2つだけ', { size: SIZE.title, bold: true })}
  <g filter="url(#shadow)"><rect x="20" y="56" width="480" height="492" rx="16" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/></g>
  ${L.icon({ name: 'folder', x: 36, y: 72, size: 22, color: C.gray.dark })}
  ${t(66, 90, 'jp/co/copel/training/', { mono: true, anchor: 'start', fill: C.gray.dark })}
  ${row(36, 108, 448, 'App.java', '1行足す', 'yellow')}
  ${row(36, 170, 448, 'Database.java', '変更しない', 'gray')}
  ${L.icon({ name: 'folder', x: 36, y: 228, size: 22, color: C.gray.dark })}
  ${t(66, 246, 'api/', { mono: true, anchor: 'start', fill: C.gray.dark })}
  ${row(60, 258, 424, 'ProductListApi.java', '変更しない', 'gray')}
  ${row(60, 320, 424, 'XxxApi.java', '新しく作る', 'green')}
  ${L.icon({ name: 'folder', x: 36, y: 380, size: 22, color: C.gray.dark })}
  ${t(66, 398, 'dto/', { mono: true, anchor: 'start', fill: C.gray.dark })}
  ${row(60, 410, 424, 'ProductResponse.java', '変更しない', 'gray')}
  <rect x="60" y="472" width="424" height="62" rx="10" fill="#ffffff" stroke="${C.green.main}" stroke-width="2" stroke-dasharray="6,4"/>
  ${t(76, 498, 'リクエストやレスポンスにクラスを使うなら、', { anchor: 'start', fill: C.green.dark })}
  ${t(76, 520, 'ここに新しく作る（必要なときだけ）', { anchor: 'start', fill: C.green.dark })}

${L.card({ x: 520, y: 56, w: 360, h: 210, color: 'green', title: '最低限やることは、2つ' })}
  ${L.badge({ cx: 548, cy: 120, n: '1', color: 'green' })}
  ${t(570, 126, 'api/ に XxxApi.java を作る', { anchor: 'start', bold: true })}
  ${t(570, 148, '処理は handle に書く', { size: SIZE.note, anchor: 'start', fill: SUB })}
  <circle cx="548" cy="180" r="11" fill="${C.yellow.main}"/>
  ${t(548, 185, '2', { size: SIZE.note, bold: true, fill: '#5c3d00' })}
  ${t(570, 186, 'App.java に、対応づけを1行足す', { anchor: 'start', bold: true })}
  <rect x="536" y="204" width="328" height="44" rx="10" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(550, 231, 'app.get("/api/xxx", new XxxApi());', { size: SIZE.note, mono: true, anchor: 'start', fill: '#1e293b' })}

${L.card({ x: 520, y: 282, w: 360, h: 130, color: 'gray', title: 'なぜ安全に足せるのか' })}
  ${t(536, 350, 'ProductListApi や Database は変更しない。', { anchor: 'start' })}
  ${t(536, 371, 'だから、すでに動いている API が', { anchor: 'start' })}
  ${t(536, 392, '壊れる心配が小さい', { anchor: 'start' })}

${L.card({ x: 520, y: 428, w: 360, h: 120, color: 'orange', title: 'Database との関係' })}
  ${t(536, 496, 'XxxApi は、データベースが必要なときだけ', { anchor: 'start' })}
  ${t(536, 517, 'Database.connect() を呼ぶ。', { anchor: 'start' })}
  ${t(536, 538, 'Database 側は何も変えなくてよい', { anchor: 'start' })}`;

const y0 = 564;
L.write('8-6-add-api', L.svg({
  y0,
  title: '新しい API を足すとき、ファイルの一覧のうち新しく作るもの、1行だけ足すもの、変更しないものを色分けした図',
  desc: 'App.java には対応づけを1行足し、api/ に XxxApi.java を新しく作る。Database.java、ProductListApi.java、ProductResponse.java は変更しない。変更しないので、すでに動いている API が壊れる心配が小さい。XxxApi は、データベースが必要なときだけ Database.connect() を呼ぶ。猫の先生が、新しく作るものと1行だけ足すものを見分けるよう説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['新しい API を足すときは、新しく作るものと', '1行だけ足すものを見分けるんだ。', '変えなくていいファイルもあるよ。'] }),
}));
