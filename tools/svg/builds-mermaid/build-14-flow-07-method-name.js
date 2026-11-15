// 14-flow-07-method-name: findAllByOrderByIdDesc のメソッド名を4つに分けて、SQL が作られるまで
const { L, C, nb, finish } = require('./_helper-14');
const parts = [
  { color: 'p1', lines: ['findAll：全件を取得する'] },
  { color: 'p2', lines: ['By：ここから条件を書く'] },
  { color: 'p3', lines: ['OrderById：id で並べ替える'] },
  { color: 'p4', lines: ['Desc：大きい順にする'] },
];
const MX = 330, MW = 290, H = 56, G = 22, TOP = 20;
const cy = (i) => TOP + H / 2 + i * (H + G);
const mid = (cy(0) + cy(3)) / 2;
let body = `
  ${nb({ x: 20, y: mid - 32, w: 250, h: 64, color: 'green', lines: ['findAllByOrderByIdDesc'], mono: true, bold: true })}
  ${nb({ x: 690, y: mid - 58, w: 190, h: 116, color: 'green', lines: ['id の大きい順に', '全件を取る SQL が', '作られる'] })}`;
parts.forEach((p, i) => {
  body += '\n  ' + nb({ x: MX, y: cy(i) - H / 2, w: MW, h: H, color: p.color, lines: p.lines });
  body += '\n  ' + L.arrow({ x1: 276, y1: mid, x2: MX - 6, y2: cy(i), color: 'green', width: 4 });
  body += '\n  ' + L.arrow({ x1: MX + MW + 4, y1: cy(i), x2: 684, y2: mid + (i - 1.5) * 26, color: 'gray', width: 4 });
});
finish('14-flow-07-method-name', cy(3) + H / 2,
  'メソッド名 findAllByOrderByIdDesc を、findAll・By・OrderById・Desc の4つに分けて読み、id の大きい順に全件を取る SQL が作られることを示した図',
  'findAllByOrderByIdDesc を4つに分ける。findAll：全件を取得する。By：ここから条件を書く。OrderById：id で並べ替える。Desc：大きい順にする。この4つから、id の大きい順に全件を取る SQL が作られる。',
  body);
