// 03-flow-04-db-connect: 3-5 のデータベースへの接続の流れ（6つの矢印）
const { L, node, cyl, down, right, poly, pl, nodeH, cylH, done } = require('./_common-03');

// 1行目の高さをそろえるため、中心の高さで置く
const r1 = 73, r2 = 303;
const H = { x: 20, w: 270, lines: ['ProductListApi.handle', '商品をデータベースから', '取り出したい'] };
const Cn = { x: 610, w: 270, lines: ['Database.connect()', '接続情報を使って接続を作る'] };
const J = { x: 610, w: 270, lines: ['JDBC の DriverManager', 'PostgreSQL 用の', 'ドライバで接続する'] };
const D = { x: 20, w: 270, lines: ['PostgreSQL', 'localhost:5433 の training'] };
const hy = r1 - nodeH(3) / 2, cy = r1 - nodeH(2) / 2, jy = r2 - nodeH(3) / 2, dy = r2 - cylH(2) / 2;

const body = `
  ${node({ ...H, y: hy, color: 'green' })}
  ${node({ ...Cn, y: cy, color: 'green' })}
  ${node({ ...J, y: jy, color: 'green' })}
  ${cyl({ ...D, y: dy, color: 'orange' })}
  ${right(r1, 290, 610, 'green')}
  ${pl({ cx: 450, y: r1 - 44, label: 'connect を呼ぶ', n: '1', color: 'green' })}
  ${down(745, cy + nodeH(2), jy, 'green')}
  ${pl({ cx: 738, y: 170, label: 'URL とユーザーとパスワードを渡す', n: '2', color: 'green' })}
  ${L.biArrow({ x1: 606, y1: r2, x2: 294, y2: r2, colorGo: 'green', colorBack: 'orange' })}
  ${pl({ cx: 450, y: r2 - 46, label: '接続する', n: '3', color: 'green' })}
  ${pl({ cx: 450, y: r2 + 16, label: '接続できた', n: '4', color: 'orange' })}
  ${L.arrow({ x1: 640, y1: jy - 4, x2: 272, y2: hy + nodeH(3) + 6, color: 'green' })}
  ${pl({ cx: 456, y: 170, label: 'Connection を返す', n: '5', color: 'green' })}
  ${down(155, hy + nodeH(3), dy, 'green')}
  ${pl({ cx: 155, y: 175, label: 'SELECT を送る', n: '6', color: 'green' })}`;

done('03-flow-04-db-connect', dy + cylH(2),
  'ProductListApi.handle が Database.connect() を呼び、JDBC の DriverManager を通して PostgreSQL に接続し、Connection を受け取って SELECT を送るまでの6段階の流れを示した図',
  '1 ProductListApi.handle が Database.connect() を呼ぶ。2 Database.connect() が URL とユーザーとパスワードを JDBC の DriverManager に渡す。3 DriverManager が PostgreSQL に接続する。4 PostgreSQL が接続できたと返す。5 DriverManager が Connection を ProductListApi.handle に返す。6 ProductListApi.handle が PostgreSQL に SELECT を送る。',
  body);
