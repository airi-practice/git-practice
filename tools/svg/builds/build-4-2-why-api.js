// 4-2-why-api: API が必要な3つの理由。フロントエンド=青、API（窓口）=灰、バックエンド=緑。
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const lbox = ({ x, y, w, h, color, title, sub, dashed, mono }) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"${dashed ? ' stroke-dasharray="6,4"' : ''}/></g>
  ${t(x + w / 2, y + 26, title, { size: SIZE.head, bold: true, fill: C[color].dark })}
  ${t(x + w / 2, y + 49, sub, { fill: TEXT, mono })}`;
const panel = (top, h, n, title) => `
  <rect x="20" y="${top}" width="860" height="${h}" rx="16" fill="${C.gray.light}" fill-opacity="0.6" stroke="${C.gray.main}" stroke-width="2"/>
  ${L.badge({ cx: 52, cy: top + 27, n, color: 'gray' })}
  ${t(74, top + 33, title, { size: SIZE.head, bold: true, anchor: 'start' })}`;
const bi = (x1, x2, y) => L.biArrow({ x1, y1: y, x2, y2: y, colorGo: 'gray', width: 3, gap: 10 });
const row3 = (top, a, b, c, dashedA) => {
  const y = top + 52;
  return lbox({ x: 50, y, w: 260, h: 62, ...a, dashed: dashedA })
    + bi(314, 350, y + 31) + bi(550, 586, y + 31)
    + lbox({ x: 354, y, w: 192, h: 62, color: 'gray', ...b })
    + lbox({ x: 590, y, w: 260, h: 62, color: 'green', ...c });
};
const p3 = 294;
const body = panel(14, 130, '1', '言語も動く場所も違うプログラムが、話すための共通の約束事が要る')
  + row3(14, { color: 'blue', title: 'フロントエンド', sub: 'TypeScript（ブラウザの中）' }, { title: 'API（窓口）', sub: '共通の約束事で話す' }, { title: 'バックエンド', sub: 'Java（サーバー側）' })
  + panel(154, 130, '2', '約束事さえ守れば、別々に作ったり、作り直したりできる')
  + row3(154, { color: 'yellow', title: 'フロントエンド（作り直した）', sub: '窓口の約束は、前と同じ' }, { title: 'API（窓口）', sub: '約束事は変わらない' }, { title: 'バックエンド', sub: 'そのまま使える' }, true)
  + panel(p3, 140, '3', '窓口だけを公開すれば、内部を見せなくて済む')
  + `
  ${lbox({ x: 50, y: p3 + 53, w: 170, h: 62, color: 'blue', title: 'フロントエンド', sub: '見えるのは窓口だけ' })}
  ${bi(224, 260, p3 + 84)}
  ${lbox({ x: 264, y: p3 + 53, w: 170, h: 62, color: 'gray', title: 'API（窓口）', sub: 'GET /api/products', mono: true })}
  ${bi(438, 474, p3 + 84)}
  <rect x="478" y="${p3 + 44}" width="382" height="80" rx="12" fill="${C.green.light}" fill-opacity="0.5" stroke="${C.green.main}" stroke-width="2" stroke-dasharray="6,4"/>
  ${t(669, p3 + 64, 'バックエンドの中（フロントエンドからは見えない）', { size: SIZE.note, bold: true, fill: C.green.dark })}
  ${L.box({ x: 490, y: p3 + 76, w: 178, h: 36, color: 'orange' })}
  ${t(579, p3 + 100, 'データベースの中身', { fill: C.orange.dark })}
  ${L.box({ x: 672, y: p3 + 76, w: 178, h: 36, color: 'green' })}
  ${t(761, p3 + 100, 'Java のクラス構造', { fill: C.green.dark })}`;
const y0 = 450;
L.write('4-2-why-api', L.svg({
  y0,
  title: 'API が必要な3つの理由を、フロントエンド・API（窓口）・バックエンドの図で示した絵',
  desc: '理由1は、言語も動く場所も違うフロントエンド（TypeScript）とバックエンド（Java）が、API（窓口）の共通の約束事で話すこと。理由2は、約束事さえ守れば、フロントエンドを作り直しても、バックエンドをそのまま使えること。理由3は、窓口だけを公開すれば、データベースの中身や Java のクラス構造といったバックエンドの中を見せなくて済むこと。猫の先生が、API という窓口があると、中身を見せずに必要なデータだけをやり取りできると説明している。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['API という窓口があると、中身を見せずに', '必要なデータだけをやり取りできるんだよ'] }),
}));
