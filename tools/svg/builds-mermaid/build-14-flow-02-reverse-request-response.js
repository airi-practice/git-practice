// 14-flow-02-reverse-request-response: postReverse が POST を送り、ReverseController が 200 を返す往復
const { L, C, t, nb, finish } = require('./_helper-14');
const body = `
  ${nb({ x: 20, y: 20, w: 170, h: 190, color: 'blue', lines: ['フロントエンド', 'postReverse'] })}
  ${nb({ x: 710, y: 20, w: 170, h: 190, color: 'green', lines: ['バックエンド', 'ReverseController'] })}
  ${t(450, 38, 'POST /api/reverse', { fill: C.blue.dark, bold: true })}
  ${t(450, 60, '本文：text が hello の JSON', { fill: C.blue.dark })}
  ${L.arrow({ x1: 200, y1: 78, x2: 700, y2: 78, color: 'blue' })}
  ${L.arrow({ x1: 700, y1: 148, x2: 200, y2: 148, color: 'green' })}
  ${t(450, 178, '200', { fill: C.green.dark, bold: true })}
  ${t(450, 200, '本文：original が hello、reversed が olleh の JSON', { fill: C.green.dark })}`;
finish('14-flow-02-reverse-request-response', 210,
  'フロントエンドの postReverse が POST /api/reverse を送り、バックエンドの ReverseController が 200 とともに original と reversed を持つ JSON を返す往復を示した図',
  'フロントエンドの postReverse から、バックエンドの ReverseController へ、POST /api/reverse を送る。本文は text が hello の JSON。ReverseController から postReverse へ、200 を返す。本文は original が hello、reversed が olleh の JSON。',
  body);
