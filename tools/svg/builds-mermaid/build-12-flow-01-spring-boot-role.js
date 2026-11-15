// 12-flow-01: Spring Boot が行うことと、自分で書くこと
const { L, C, t, node, grp, arr, out } = require('./_wrap-12');
const nm = '12-flow-01-spring-boot-role';

const sb = grp({ x: 20, y: 20, w: 520, h: 396, color: 'green', label: 'Spring Boot が行うこと' });
const my = grp({ x: 620, y: 20, w: 260, h: 396, color: 'yellow', label: '自分で書くこと' });
const X = 40, W = 480;
const a = node({ x: X, y: 64, w: W, h: 44, color: 'green', n: '1', lines: ['8080 番で待ち受ける'] });
const b = node({ x: X, y: 136, w: W, h: 44, color: 'green', n: '2', lines: ['URL と GET などの種類に合う Java のメソッドを探す'] });
const f = node({ x: X, y: 208, w: W, h: 44, color: 'green', n: '3', lines: ['クラスのインスタンスを作って渡す'] });
const d = node({ x: X, y: 280, w: W, h: 44, color: 'green', n: '4', lines: ['戻り値を JSON に変換して返す'] });
const e = node({ x: X, y: 352, w: W, h: 44, color: 'green', n: '5', lines: ['設定をもとにデータベースへ接続する'] });
const c = node({ x: 640, y: 64, w: 220, h: 332, color: 'yellow', lines: ['Controller・', 'Service・', 'Repository の中身'] });

const body = sb + my + a.s + b.s + f.s + d.s + e.s + c.s +
  arr({ x1: a.cx, y1: a.b + 2, x2: a.cx, y2: b.y - 4, color: 'green' }) +
  arr({ x1: b.r + 2, y1: b.cy, x2: c.x - 5, y2: b.cy, color: 'green' }) +
  arr({ x1: f.r + 2, y1: f.cy, x2: c.x - 5, y2: f.cy, color: 'green', dashed: true }) +
  arr({ x1: c.x - 2, y1: d.cy, x2: d.r + 5, y2: d.cy, color: 'yellow' }) +
  arr({ x1: c.x - 2, y1: e.cy, x2: e.r + 5, y2: e.cy, color: 'yellow', dashed: true });

out(nm, 416,
  'Spring Boot が行うことと、自分で書くこと',
  'Spring Boot が行うことは5つ。1番は8080番で待ち受ける、2番はURLとGETなどの種類に合うJavaのメソッドを探す、3番はクラスのインスタンスを作って渡す、4番は戻り値をJSONに変換して返す、5番は設定をもとにデータベースへ接続する。自分で書くことはController・Service・Repositoryの中身だけ。1から2、2から自分で書く部分、自分で書く部分から4へと実線でつながり、3から自分で書く部分、自分で書く部分から5へは点線でつながる。',
  body,
  ['Spring Boot が行うこと', '自分で書くこと', '8080 番で待ち受ける', 'URL と GET などの種類に合う Java のメソッドを探す', 'クラスのインスタンスを作って渡す', '戻り値を JSON に変換して返す', '設定をもとにデータベースへ接続する', 'Controller・Service・Repository の中身']);
