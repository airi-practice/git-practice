// 03-flow-07-json-frontend: 3-6 の、バックエンドで JSON にして、フロントエンドで TypeScript のオブジェクトにする流れ（2つのグループ）
const { node, frame, down, right, lab2, done } = require('./_common-03');

const body = `
  ${frame({ x: 20, y: 30, w: 350, h: 232, color: 'green', label: 'バックエンド' })}
  ${node({ x: 35, y: 76, w: 320, color: 'green', lines: ['ProductResponse の List', 'Java のオブジェクト'] })}
  ${node({ x: 35, y: 200, w: 320, color: 'green', lines: ['ctx.json(...) が変換する'] })}
  ${down(195, 140, 200, 'green')}
  ${frame({ x: 530, y: 140, w: 350, h: 234, color: 'blue', label: 'フロントエンド' })}
  ${node({ x: 545, y: 200, w: 320, color: 'blue', lines: ['response.json() が変換する'] })}
  ${node({ x: 545, y: 290, w: 320, color: 'blue', lines: ['Product の配列', 'TypeScript のオブジェクト'] })}
  ${down(705, 242, 290, 'blue')}
  ${right(221, 355, 545, 'green')}
  ${lab2({ cx: 450, y: 152, lines: ['レスポンスの本文', 'JSON'], color: 'green' })}`;

done('03-flow-07-json-frontend', 374,
  'バックエンドで ProductResponse の List を ctx.json で JSON にして、レスポンスの本文として送り、フロントエンドで response.json() が Product の配列に変換する流れを示した図',
  'バックエンド：ProductResponse の List（Java のオブジェクト）を、ctx.json(...) が変換する。変換した JSON は、レスポンスの本文としてフロントエンドへ届く。フロントエンド：response.json() が変換して、Product の配列（TypeScript のオブジェクト）になる。',
  body);
