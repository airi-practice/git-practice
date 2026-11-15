// 03-flow-05-response-json: 3-6 の ProductResponse のオブジェクトが JSON に変換される流れ
const { node, down, done } = require('./_common-03');

const X = 190, W = 520;
const body = `
  ${node({ x: X, y: 30, w: W, color: 'green', lines: ['ProductResponse のオブジェクト', 'getId は 1、getName は ボールペン、', 'getPrice は 150、getStock は 200'] })}
  ${node({ x: X, y: 172, w: W, color: 'green', lines: ['ctx.json が getter の名前を見て', 'JSON に変換する'], bold: 0 })}
  ${node({ x: X, y: 292, w: W, color: 'green', lines: ['JSON', 'id が 1、name が ボールペン、', 'price が 150、stock が 200'] })}
  ${down(450, 116, 172, 'green')}
  ${down(450, 236, 292, 'green')}`;

done('03-flow-05-response-json', 378,
  'ProductResponse のオブジェクトを、ctx.json が getter の名前を見て JSON に変換する流れを示した図',
  'ProductResponse のオブジェクト（getId は 1、getName は ボールペン、getPrice は 150、getStock は 200）を、ctx.json が getter の名前を見て JSON に変換する。変換後の JSON は、id が 1、name が ボールペン、price が 150、stock が 200 になる。',
  body);
