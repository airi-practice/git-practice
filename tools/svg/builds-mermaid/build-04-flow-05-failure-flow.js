const { L, node, finish, nodeH } = require('./_common');
const N = [
  ['response.ok が false'],
  ['throw new Error で', 'HTTP 500 などのエラーを発生させる'],
  ['catch の中で', 'setError が動く'],
  ['状態 error が変わる'],
  ['画面に赤い文字で', '取得に失敗しました: HTTP 500'],
];
let y = 20, b = '';
const pos = N.map((l) => { const h = nodeH(l.length); const p = { y, h }; y += h + 40; return p; });
N.forEach((l, i) => {
  b += `\n  ${node({ x: 240, y: pos[i].y, w: 420, h: pos[i].h, color: 'blue', lines: l })}`;
  if (i < N.length - 1) b += `\n  ${L.arrow({ x1: 450, y1: pos[i].y + pos[i].h + 2, x2: 450, y2: pos[i + 1].y - 2, color: 'blue' })}`;
});
finish('04-flow-05-failure-flow', {
  bottom: y - 40, body: b,
  title: 'リクエストが失敗したとき、response.ok が false になり、throw new Error でエラーが発生し、catch の中で setError が動き、状態 error が変わって、画面に赤い文字でエラーが表示される流れの図',
  desc: '上から順に、response.ok が false、throw new Error で HTTP 500 などのエラーを発生させる、catch の中で setError が動く、状態 error が変わる、画面に赤い文字で「取得に失敗しました: HTTP 500」と表示される。',
});
