// 10-flow-06-example-ab: 例Aと例Bの違い（元は Mermaid の flowchart LR、subgraph 2つ）
const { L, C, t, SIZE, finish, nodeBox, frame } = require('./_common-ch10');

const H = 72;
// 例A
let out = frame({ x: 20, y: 20, w: 860, h: 122, color: 'gray', label: '例A：データベースを使わない' });
out += '\n  ' + nodeBox({ x: 40, y: 62, w: 260, h: H, color: 'green', lines: ['ReverseApi', '文字列を反転する'] });

// 例B
const FY = 170, ry = 212;
out += '\n  ' + frame({ x: 20, y: FY, w: 860, h: ry + H + 16 - FY, color: 'gray', label: '例B：データベースを使う' });
out += '\n  ' + nodeBox({ x: 40, y: ry, w: 260, h: H, color: 'green', lines: ['MemoCreateApi /', 'MemoListApi'] });
out += '\n  ' + nodeBox({ x: 360, y: ry, w: 260, h: H, color: 'green', lines: ['Database.connect()', 'データベースに接続する'] });
out += '\n  ' + L.arrow({ x1: 303, y1: ry + H / 2, x2: 357, y2: ry + H / 2, color: 'green', width: 5 });
out += '\n  ' + L.arrow({ x1: 623, y1: ry + H / 2, x2: 677, y2: ry + H / 2, color: 'green', width: 5 });
// データベースの円柱（Mermaid の [( )] ）
const dx = 680, dw = 190, ey = 11;
out += `\n  <g filter="url(#shadow)"><path d="M${dx} ${ry + ey} v${H - 2 * ey} a${dw / 2} ${ey} 0 0 0 ${dw} 0 v${-(H - 2 * ey)} a${dw / 2} ${ey} 0 0 0 ${-dw} 0 z" fill="${C.orange.light}" stroke="${C.orange.main}" stroke-width="2"/></g>`;
out += `\n  <path d="M${dx} ${ry + ey} a${dw / 2} ${ey} 0 0 0 ${dw} 0" fill="none" stroke="${C.orange.main}" stroke-width="2"/>`;
out += '\n  ' + t(dx + dw / 2, ry + H / 2 + 9, 'memos テーブル', { size: SIZE.body, fill: C.orange.dark });

finish('10-flow-06-example-ab', ry + H + 16,
  '例Aは ReverseApi だけでデータベースを使わず、例Bは MemoCreateApi と MemoListApi が Database.connect() で接続して memos テーブルを使うことを比べた図',
  '例A：データベースを使わない。ReverseApi が文字列を反転する。例B：データベースを使う。MemoCreateApi と MemoListApi が、Database.connect() でデータベースに接続し、memos テーブルを使う。',
  out);
