// 09-flow-02-state-change: 第9章 9-5 の flowchart LR（2つのデータ input と message がどう変わるか）
const { C, L, lbl, nb, cd, dash, fin, arrow } = require('./_common-0809');

const body = `
  ${nb(20, 50, 320, 64, 'blue', ['入力欄に文字を打つ'])}
  ${cd(20, 200, 320, 90, 'blue', 'データ input が変わる', ['表示領域は変わらない'])}
  ${nb(540, 213, 340, 64, 'blue', ['表示ボタンを押す'])}
  ${nb(540, 377, 340, 64, 'blue', ['setMessage に input を渡す'])}
  ${nb(540, 501, 340, 64, 'blue', ['データ message が変わる'])}
  ${nb(540, 625, 340, 64, 'blue', ['表示領域に入力した内容が出る'])}
  ${arrow({ x1: 180, y1: 118, x2: 180, y2: 196, color: 'blue', width: 4 })}
  ${dash(344, 245, 536, 245)}
  ${arrow({ x1: 710, y1: 281, x2: 710, y2: 373, color: 'blue', width: 4 })}
  ${arrow({ x1: 710, y1: 445, x2: 710, y2: 497, color: 'blue', width: 4 })}
  ${arrow({ x1: 710, y1: 569, x2: 710, y2: 621, color: 'blue', width: 4 })}
  ${L.pill({ cx: 180, y: 142, w: 120, label: 'onChange', color: 'blue' })}
  ${lbl(440, 245, ['ボタンが押される', 'まで待つ'], 'gray')}
  ${L.pill({ cx: 710, y: 312, w: 320, label: 'onClick で handleShow が動く', color: 'blue' })}`;

fin('09-flow-02-state-change', 705,
  '入力と表示で、データ input と message がどう変わるか',
  '入力欄に文字を打つと onChange が動き、データ input が変わるが、表示領域は変わらない。ボタンが押されるまで待つ。表示ボタンを押すと onClick で handleShow が動き、setMessage に input を渡す。データ message が変わり、表示領域に入力した内容が出る。',
  body);
