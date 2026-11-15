// 03-flow-09-db-change-effect: 3-8 の、データベースの値を変えると画面の表示が変わる流れ
const { node, cyl, down, done } = require('./_common-03');

const X = 210, W = 480;
const body = `
  ${cyl({ x: X, y: 30, w: W, color: 'orange', lines: ['データベース', 'products テーブルの値を、コマンドで変える'] })}
  ${node({ x: X, y: 168, w: W, color: 'green', lines: ['ProductListApi', 'リクエストのたびに、SELECT で最新の値を取り出す'] })}
  ${node({ x: X, y: 286, w: W, color: 'green', lines: ['JSON', '最新の値で作られて、画面へ返る'] })}
  ${node({ x: X, y: 404, w: W, color: 'blue', lines: ['画面の表', '再読み込みすると、変えた値が表示される'] })}
  ${down(450, 114, 168, 'orange')}
  ${down(450, 232, 286, 'green')}
  ${down(450, 350, 404, 'green')}`;

done('03-flow-09-db-change-effect', 468,
  'データベースの値をコマンドで変えると、ProductListApi が SELECT で最新の値を取り出し、JSON で画面へ返り、再読み込みで画面の表に変えた値が表示される流れを示した図',
  'データベースの products テーブルの値を、コマンドで変える。ProductListApi が、リクエストのたびに SELECT で最新の値を取り出す。JSON が最新の値で作られて、画面へ返る。画面の表は、再読み込みすると、変えた値が表示される。',
  body);
