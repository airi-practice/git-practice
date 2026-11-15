// 03-flow-06-request-json: 3-6 のリクエストの本文の JSON が Java のオブジェクトに変換される流れ
const { node, right, done } = require('./_common-03');

const body = `
  ${node({ x: 20, y: 41, w: 270, color: 'blue', lines: ['リクエストの本文', 'JSON：text が hello'] })}
  ${node({ x: 350, y: 52, w: 200, color: 'green', lines: ['Javalin が変換する'] })}
  ${node({ x: 610, y: 41, w: 270, color: 'green', lines: ['ReverseRequest のオブジェクト', 'text の値が hello'] })}
  ${right(73, 290, 350, 'blue')}
  ${right(73, 550, 610, 'green')}`;

done('03-flow-06-request-json', 105,
  'リクエストの本文の JSON を、Javalin が ReverseRequest のオブジェクトに変換する流れを示した図',
  'リクエストの本文（JSON：text が hello）を、Javalin が変換して、ReverseRequest のオブジェクト（text の値が hello）にする。',
  body);
