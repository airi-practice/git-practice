// 12-4-restaurant-roles: レストランのたとえ(上段)と、実際のクラス(中段)・担当(下段)。
// 色: お客さん/フロントエンド=青、Controller・Service・Repository=サーバー側なので緑、倉庫/データベース=橙。クラスの区別はラベルで行う。
const L = require('../rich-lib');
const { C, t, SIZE, TEXT } = L;
const mono = (x, y, s, o = {}) => t(x, y, s, { mono: true, ...o });
const X = [20, 200, 380, 560, 740], W = 140;
const cols = [
  { color: 'blue', analogy: 'お客さん', title: 'フロントエンド', code: 'frontend/', desc: 'リクエストを出す' },
  { color: 'green', analogy: '注文を受ける係', title: 'Controller', code: 'ProductController', desc: 'リクエストの受付', role: ['URL と HTTP の', 'メソッドを、Java の', 'メソッドに結びつける'] },
  { color: 'green', analogy: '料理を作る人', title: 'Service', code: 'ProductService', desc: '処理や判断', role: ['注文の中身に応じて、', '処理や判断をする'] },
  { color: 'green', analogy: '倉庫の係', title: 'Repository', code: 'ProductRepository', desc: 'データの出し入れ', role: ['倉庫（データベース）', 'から材料を', '出し入れする'] },
  { color: 'orange', analogy: '倉庫', title: 'データベース', code: 'PostgreSQL', desc: 'products テーブル' },
];
const parts = cols.map((c, i) => {
  const x = X[i], cx = x + W / 2, k = C[c.color];
  let s = L.pill({ cx, y: 44, w: W, label: c.analogy, color: c.color });
  s += `\n${L.card({ x, y: 90, w: W, h: 112, color: c.color, title: c.title })}
  ${mono(cx, 160, c.code, { size: SIZE.note, bold: true, fill: k.dark })}
  ${t(cx, 184, c.desc)}`;
  if (c.role) {
    s += `
  <line x1="${cx}" y1="204" x2="${cx}" y2="232" stroke="${k.main}" stroke-width="3" stroke-linecap="round"/>
  <g filter="url(#shadow)"><rect x="${cx - 84}" y="232" width="168" height="106" rx="12" fill="#ffffff" stroke="${k.main}" stroke-width="2"/></g>
  ${t(cx, 258, '担当', { bold: true, fill: k.dark })}
${c.role.map((r, j) => '  ' + t(cx, 282 + j * 20, r)).join('\n')}`;
  }
  return s;
}).join('\n');
const arrows = [0, 1, 2, 3].map((i) => L.biArrow({ x1: X[i] + W + 4, y1: 152, x2: X[i + 1] - 4, y2: 152, colorGo: 'gray', width: 3, gap: 10 })).join('\n  ');
const body = `
  ${t(450, 26, '上の段が「たとえ」、下の段がこのシステムの実際のクラス（覚えやすくするためのたとえ）')}
${parts}
  ${arrows}`;
const y0 = 354;
L.write('12-4-restaurant-roles', L.svg({
  y0,
  title: 'レストランのたとえと、Controller・Service・Repository の対応を示した図。お客さんがフロントエンド、注文を受ける係が Controller、料理を作る人が Service、倉庫の係が Repository、倉庫がデータベースにあたる',
  desc: '上の段がレストランのたとえ、下の段がこのシステムの実際のクラス。お客さんはフロントエンド（frontend/、リクエストを出す）。注文を受ける係は Controller（ProductController、リクエストの受付。URL と HTTP のメソッドを Java のメソッドに結びつける）。料理を作る人は Service（ProductService、処理や判断）。倉庫の係は Repository（ProductRepository、データの出し入れ。倉庫から材料を出し入れする）。倉庫はデータベース（PostgreSQL の products テーブル）。それぞれ隣どうしで行き来する。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['レストランに例えると分かりやすいよ。', 'Controller・Service・Repository の担当を', 'お店の人に置き換えてみよう。'] }),
}));
