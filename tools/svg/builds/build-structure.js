// structure: 画面（青）・API（緑）・データベース（橙）の関係。幅は800。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const W = 800;
const part = (x, color, title, sub, dir) => L.card({ x, y: 20, w: 200, h: 148, color, title, sub })
  + '\n' + L.box({ x: x + 20, y: 108, w: 160, h: 38, color })
  + '\n  ' + t(x + 100, 133, dir, { bold: true, mono: true, fill: C[color].dark });
const link = (x1, x2, color, n, label) => {
  const cx = (x1 + x2) / 2;
  return L.arrow({ x1, y1: 100, x2, y2: 100, color, width: 6 })
    + '\n  ' + t(cx, 78, label, { size: SIZE.note, bold: true, fill: C[color].dark })
    + '\n  ' + L.badge({ cx, cy: 100, n, color });
};
const body = `
${part(12, 'blue', '画面', 'ブラウザに表示される部分', 'frontend/')}
${part(300, 'green', 'API', '問い合わせに答える部分', 'backend/')}
${part(588, 'orange', 'データベース', '商品のデータを入れる部分', 'docker-compose.yml')}
  ${link(216, 296, 'blue', '1', '問い合わせ')}
  ${link(504, 584, 'green', '2', 'データを取得')}`;
const y0 = 184;
L.write('structure', L.svg({
  W, y0,
  title: '画面・API・データベースの関係',
  desc: '画面（ブラウザに表示される部分。frontend/）が API に問い合わせ（1）、API（問い合わせに答える部分。backend/）がデータベースからデータを取得する（2）。データベース（商品のデータを入れる部分）は docker-compose.yml で用意する。猫の先生が、画面が問い合わせて、APIが答えて、データベースにはデータが入っていると説明している。',
  body,
  footer: L.foot({ W, y0, pose: 'wave', lines: ['画面が問い合わせて、APIが答えて、', 'データベースにはデータが入っているんだ。'] }),
}));
