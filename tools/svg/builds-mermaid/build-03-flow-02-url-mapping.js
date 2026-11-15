// 03-flow-02-url-mapping: 3-3 の URL と処理が結びつく様子（対応づけがある場合とない場合）
const { node, right, done } = require('./_common-03');

const body = `
  ${node({ x: 40, y: 40, w: 340, color: 'blue', lines: ['GET /api/products が来た'] })}
  ${node({ x: 520, y: 40, w: 340, color: 'green', lines: ['ProductListApi の handle が呼ばれる'] })}
  ${right(61, 380, 520, 'blue')}
  ${node({ x: 40, y: 141, w: 340, color: 'blue', lines: ['対応づけにない URL が来た'] })}
  ${node({ x: 520, y: 130, w: 340, color: 'red', lines: ['どの処理も呼ばれず、', '見つからないというレスポンスが返る'], bold: 0 })}
  ${right(162, 380, 520, 'blue')}`;

done('03-flow-02-url-mapping', 194,
  'GET /api/products が来ると ProductListApi の handle が呼ばれ、対応づけにない URL が来ると、どの処理も呼ばれず見つからないというレスポンスが返ることを示した図',
  '上の流れ：GET /api/products が来ると、ProductListApi の handle が呼ばれる。下の流れ：対応づけにない URL が来ると、どの処理も呼ばれず、見つからないというレスポンスが返る。',
  body);
