// 03-flow-08-list-handle: 3-7 の handle の処理の流れ（分岐と繰り返しがある）
const { L, node, diamond, down, poly, pl, done } = require('./_common-03');

const X = 130, W = 340, CX = 300;
const body = `
  ${node({ x: X, y: 30, w: W, color: 'green', lines: ['handle が呼ばれる'] })}
  ${node({ x: X, y: 118, w: W, color: 'green', lines: ['空の List を作る'] })}
  ${node({ x: X, y: 206, w: W, color: 'green', lines: ['Database.connect() で接続を開く'] })}
  ${node({ x: X, y: 294, w: W, color: 'green', lines: ['SELECT を送って ResultSet を受け取る'] })}
  ${down(CX, 72, 118, 'green')}
  ${down(CX, 160, 206, 'green')}
  ${down(CX, 248, 294, 'green')}
  ${down(CX, 336, 382, 'green')}
  ${diamond({ x: 160, y: 382, w: 280, h: 116, color: 'green', lines: ['rs.next() で', '次の行がある？'] })}
  ${node({ x: 580, y: 397, w: 300, color: 'green', lines: ['列の値を取り出して', 'ProductResponse を作り、', 'List に追加する'], bold: 0 })}
  ${L.biArrow({ x1: 412, y1: 440, x2: 574, y2: 440, colorGo: 'green', colorBack: 'green', gap: 28 })}
  ${pl({ cx: 493, y: 384, label: 'ある', color: 'green' })}
  ${down(CX, 498, 568, 'green')}
  ${pl({ cx: 345, y: 518, label: 'ない', color: 'green' })}
  ${node({ x: X, y: 568, w: W, color: 'green', lines: ['finally で接続を閉じる'] })}
  ${down(CX, 610, 656, 'green')}
  ${node({ x: X, y: 656, w: W, color: 'green', lines: ['ctx.json(products) で', 'JSON の配列にして返す'], bold: 0 })}`;

done('03-flow-08-list-handle', 720,
  'handle が呼ばれてから、接続を開き、SELECT を送り、rs.next() で次の行がある間は ProductResponse を作って List に追加し、行がなくなったら接続を閉じて JSON の配列で返す流れを示した図',
  'handle が呼ばれる、空の List を作る、Database.connect() で接続を開く、SELECT を送って ResultSet を受け取る、rs.next() で次の行があるかを調べる。ある場合は、列の値を取り出して ProductResponse を作り、List に追加して、もう一度 rs.next() に戻る。ない場合は、finally で接続を閉じて、ctx.json(products) で JSON の配列にして返す。',
  body);
