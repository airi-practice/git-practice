// 10-flow-05-files-map: 例Aで追加・変更するファイルの関係（元は Mermaid の flowchart LR、subgraph 2つ）
const { L, C, t, SIZE, finish, nodeBox, frame, dashArrow } = require('./_common-ch10');

const W = 230, H = 64;
const FEX = [40, 335, 630];
// フロントエンド（青）
let out = frame({ x: 20, y: 20, w: 860, h: 224, color: 'blue', label: 'frontend/src（画面）', right: true });
out += '\n  ' + nodeBox({ x: 335, y: 66, w: W, h: H, color: 'blue', lines: ['types/reverse.ts', '（新規）'] });
const rowY = 164;
out += '\n  ' + nodeBox({ x: FEX[0], y: rowY, w: W, h: H, color: 'blue', lines: ['App.tsx', '（Route を1行追加）'] });
out += '\n  ' + nodeBox({ x: FEX[1], y: rowY, w: W, h: H, color: 'blue', lines: ['pages/ReversePage.tsx', '（新規）'] });
out += '\n  ' + nodeBox({ x: FEX[2], y: rowY, w: W, h: H, color: 'blue', lines: ['api/reverse.ts', '（新規）'] });
out += '\n  ' + L.arrow({ x1: FEX[0] + W + 3, y1: rowY + H / 2, x2: FEX[1] - 3, y2: rowY + H / 2, color: 'blue', width: 5 });
out += '\n  ' + L.arrow({ x1: FEX[1] + W + 3, y1: rowY + H / 2, x2: FEX[2] - 3, y2: rowY + H / 2, color: 'blue', width: 5 });
out += '\n  ' + dashArrow({ x1: FEX[1] + W / 2, y1: rowY - 3, x2: FEX[1] + W / 2, y2: 66 + H + 4, color: 'blue' });

// バックエンド（緑）
const BY = 330, bRow = 378, bH = 112;
out += '\n  ' + frame({ x: 20, y: BY, w: 860, h: bRow + bH + 16 - BY, color: 'green', label: 'backend/src/main/java/jp/co/copel/training（バックエンド）', right: true });
out += '\n  ' + nodeBox({ x: FEX[0], y: bRow, w: W, h: bH, color: 'green', lines: ['App.java', '（1行と import を追加）'] });
out += '\n  ' + nodeBox({ x: FEX[1], y: bRow, w: W, h: bH, color: 'green', lines: ['api/ReverseApi.java', '（新規）', '処理を書く'] });
out += '\n  ' + nodeBox({ x: FEX[2], y: bRow, w: W, h: bH, color: 'green', lines: ['dto/ReverseRequest・', 'ReverseResponse（新規）', 'リクエスト用・', 'レスポンス用のクラス'] });
out += '\n  ' + L.arrow({ x1: FEX[0] + W + 3, y1: bRow + bH / 2, x2: FEX[1] - 3, y2: bRow + bH / 2, color: 'green', width: 5 });
out += '\n  ' + L.arrow({ x1: FEX[1] + W + 3, y1: bRow + bH / 2, x2: FEX[2] - 3, y2: bRow + bH / 2, color: 'green', width: 5 });

// api/reverse.ts → App.java（POST /api/reverse）。曲がる線
const ax = FEX[2] + W / 2, mx = FEX[0] + W / 2;
out += `\n  <path d="M${ax} ${rowY + H + 3} V 287 H ${mx} V ${bRow - 4}" fill="none" stroke="${C.blue.main}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arB)"/>`;
out += '\n  ' + L.pill({ cx: 450, y: 272, w: 190, label: 'POST /api/reverse', color: 'blue' });

finish('10-flow-05-files-map', bRow + bH + 16,
  '例Aで追加・変更するファイルを、フロントエンドとバックエンドに分けて、呼び出しの向きと一緒に示した図',
  'frontend/src（画面）では、App.tsx（Route を1行追加）が pages/ReversePage.tsx（新規）につながり、ReversePage.tsx は api/reverse.ts（新規）と、点線で types/reverse.ts（新規）につながる。api/reverse.ts から POST /api/reverse で、バックエンドの App.java（1行と import を追加）につながる。バックエンドでは、App.java が api/ReverseApi.java（新規、処理を書く）を呼び、ReverseApi.java が dto/ReverseRequest・ReverseResponse（新規、リクエスト用・レスポンス用のクラス）につながる。',
  out);
