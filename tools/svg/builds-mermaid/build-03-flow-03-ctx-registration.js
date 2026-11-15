// 03-flow-03-ctx-registration: 3-4 の、登録から ctx が handle に渡るまでの流れ（2つのグループ）
const { node, frame, down, poly, pl, done } = require('./_common-03');

const body = `
  ${frame({ x: 20, y: 216, w: 260, h: 190, color: 'gray', label: '起動するとき' })}
  ${node({ x: 35, y: 262, w: 230, color: 'green', lines: ['App.java で', 'app.get に', 'new ProductListApi() を', '渡して登録する'], bold: 0 })}
  ${frame({ x: 580, y: 30, w: 300, h: 466, color: 'gray', label: 'リクエストが来たとき' })}
  ${node({ x: 595, y: 76, w: 270, color: 'blue', lines: ['GET /api/products が来る'] })}
  ${node({ x: 595, y: 158, w: 270, color: 'green', lines: ['WEBサーバーが ctx を作る', 'リクエストとレスポンスの情報を', '持つ Context'], bold: 0 })}
  ${node({ x: 595, y: 284, w: 270, color: 'green', lines: ['登録された ProductListApi の', 'handle(ctx) を呼ぶ'], bold: 0 })}
  ${node({ x: 595, y: 388, w: 270, color: 'green', lines: ['handle の中で ctx を使って', 'リクエストを読み、', 'レスポンスを返す'], bold: 0 })}
  ${down(730, 118, 158, 'blue')}
  ${down(730, 244, 284, 'green')}
  ${down(730, 348, 388, 'green')}
  ${poly({ pts: [[270, 316], [589, 316]], color: 'green', dashed: true })}
  ${pl({ cx: 430, y: 276, label: 'この登録があるから呼ばれる', color: 'green' })}`;

done('03-flow-03-ctx-registration', 496,
  '起動するときに App.java が ProductListApi を登録しておき、リクエストが来たときに WEBサーバーが ctx を作って、登録された handle(ctx) を呼ぶ流れを示した図',
  '起動するとき：App.java で app.get に new ProductListApi() を渡して登録する。リクエストが来たとき：GET /api/products が来る、WEBサーバーが ctx を作る、登録された ProductListApi の handle(ctx) を呼ぶ、handle の中で ctx を使ってリクエストを読みレスポンスを返す、の順に進む。点線の矢印は、起動するときの登録があるから handle が呼ばれることを表す。',
  body);
