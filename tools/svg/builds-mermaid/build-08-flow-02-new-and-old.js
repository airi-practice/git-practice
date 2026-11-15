// 08-flow-02-new-and-old: 第8章 8-2 の flowchart LR（新しく足すものと、そのままのもの）
const { C, lbl, cd, frame, fin, arrow } = require('./_common-0809');

const body = `
  ${frame(20, 50, 380, 330, 'green', '新しく足すもの')}
  ${frame(560, 50, 320, 330, 'gray', 'そのままのもの')}
  ${cd(40, 100, 340, 90, 'green', 'App.java に1行足す', ['app.get で URL と対応づける'])}
  ${cd(40, 270, 340, 90, 'green', 'api/XxxApi.java を作る', ['処理を handle に書く'])}
  ${cd(580, 100, 280, 90, 'gray', 'ProductListApi', ['（変更しない）'])}
  ${cd(580, 285, 280, 60, 'gray', 'Database')}
  ${arrow({ x1: 210, y1: 194, x2: 210, y2: 266, color: 'green', width: 4 })}
  ${arrow({ x1: 384, y1: 315, x2: 576, y2: 315, color: 'green', width: 4 })}
  ${lbl(480, 315, ['接続が必要な', 'ときだけ呼ぶ'], 'green')}`;

fin('08-flow-02-new-and-old', 396,
  '新しく足すものと、そのままのもの',
  '新しく足すものは、App.java に1行足すことと、api/XxxApi.java を作ること。App.java の行は XxxApi と対応づける。XxxApi は、接続が必要なときだけ Database を呼ぶ。ProductListApi と Database は、そのままで変更しない。',
  body);
