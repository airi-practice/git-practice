// 08-flow-01-dependency: 第8章 8-2 の flowchart TD（App・api・Database・dto・PostgreSQL の依存の向き）
const { C, lbl, cd, dash, fin, arrow } = require('./_common-0809');

const body = `
  ${cd(20, 50, 320, 90, 'green', 'App', ['起動と、URL と処理の対応づけ'])}
  ${cd(560, 50, 320, 90, 'green', 'api/ の各クラス', ['ProductListApi'])}
  ${cd(20, 330, 320, 90, 'green', 'Database', ['接続を1か所にまとめる'])}
  ${cd(560, 330, 320, 90, 'green', 'dto/ の各クラス', ['ProductResponse（値を持つだけ）'])}
  ${cd(20, 510, 320, 90, 'orange', 'PostgreSQL', ['localhost:5433 の training'])}
  ${arrow({ x1: 344, y1: 95, x2: 556, y2: 95, color: 'green', width: 4 })}
  ${arrow({ x1: 110, y1: 144, x2: 110, y2: 326, color: 'green', width: 4 })}
  ${dash(290, 326, 290, 144)}
  ${arrow({ x1: 590, y1: 144, x2: 344, y2: 360, color: 'green', width: 4 })}
  ${arrow({ x1: 720, y1: 144, x2: 720, y2: 326, color: 'green', width: 4 })}
  ${arrow({ x1: 180, y1: 424, x2: 180, y2: 506, color: 'green', width: 4 })}
  ${lbl(450, 95, ['URL ごとに、処理を', '呼び出せるよう', '対応づける'], 'green')}
  ${lbl(110, 235, ['起動時に', 'Database.connect() を', '呼んで、テーブルを', '用意する'], 'green')}
  ${lbl(290, 235, ['App や api を', '知らない'], 'gray')}
  ${lbl(468, 255, ['Database.connect() を', '呼んで、', '接続を受け取る'], 'green')}
  ${lbl(720, 235, ['取り出した行から、', '値を持つオブジェクト', 'を作る'], 'green')}`;

fin('08-flow-01-dependency', 616,
  'App・api・Database・dto・PostgreSQL の依存の向き',
  'App は api/ の各クラスに URL ごとの処理を対応づけ、起動時に Database.connect() を呼んでテーブルを用意する。api/ の各クラスは Database.connect() で接続を受け取り、取り出した行から dto/ の ProductResponse を作る。Database は PostgreSQL（localhost:5433 の training）につながり、App や api を知らない。',
  body);
