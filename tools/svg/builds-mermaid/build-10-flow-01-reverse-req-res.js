// 10-flow-01-reverse-req-res: フロントエンドとバックエンドの、リクエストとレスポンス（元は Mermaid の flowchart LR）
const { L, C, t, SIZE, finish } = require('./_common-ch10');

const body = `
  ${L.card({ x: 20, y: 30, w: 170, h: 240, color: 'blue', title: 'フロントエンド', sub: 'postReverse' })}
  ${L.card({ x: 710, y: 30, w: 170, h: 240, color: 'green', title: 'バックエンド', sub: 'ReverseApi.handle' })}
  ${t(450, 62, 'POST /api/reverse', { size: SIZE.head, bold: true, mono: true, fill: C.blue.dark })}
  ${t(450, 86, '本文：text が hello の JSON', { fill: C.blue.dark })}
  ${L.arrow({ x1: 196, y1: 106, x2: 704, y2: 106, color: 'blue' })}
  ${L.arrow({ x1: 704, y1: 186, x2: 196, y2: 186, color: 'green' })}
  ${t(450, 218, '200', { size: SIZE.head, bold: true, mono: true, fill: C.green.dark })}
  ${t(450, 242, '本文：original が hello、', { fill: C.green.dark })}
  ${t(450, 264, 'reversed が olleh の JSON', { fill: C.green.dark })}`;

finish('10-flow-01-reverse-req-res', 280,
  'フロントエンドの postReverse が POST /api/reverse を送り、バックエンドの ReverseApi.handle が 200 で返す流れ',
  'フロントエンドの postReverse が、本文が text が hello の JSON の POST /api/reverse を、バックエンドの ReverseApi.handle に送る。ReverseApi.handle は、本文が original が hello、reversed が olleh の JSON の 200 を、フロントエンドに返す。',
  body);
