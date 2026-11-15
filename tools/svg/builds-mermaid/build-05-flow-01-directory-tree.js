// 05-flow-01-directory-tree: ルートの下にあるディレクトリ・ファイルと役割の図（Mermaid の flowchart TD を置き換えたもの）
const M = require('./mm');
const { node, card, line } = M;

const root = node({ x: 300, y: 14, w: 300, h: 46, color: 'gray', lines: ['hm|web-app-practice/'] });

// 2段目（ルート直下の5つ）
const ws = [178, 190, 150, 100, 214]; // backend, backend_spring, frontend, docs, docker-compose
const Y2 = 104, H2 = 112;
let x = 14;
const pos = ws.map((w) => { const p = x; x += w + 10; return p; });
const bs = card({ x: pos[0], y: Y2, w: ws[0], h: H2, color: 'green', title: 'backend/', lines: ['Java（Spring Boot', 'を使わない版）', '第1章〜第10章で使う'] });
const be = card({ x: pos[1], y: Y2, w: ws[1], h: H2, color: 'green', title: 'backend_spring/', lines: ['Java と Spring Boot', '第11章〜第14章で使う'] });
const fe = card({ x: pos[2], y: Y2, w: ws[2], h: H2, color: 'blue', title: 'frontend/', lines: ['React と TypeScript'] });
const dk = card({ x: pos[4], y: Y2, w: ws[4], h: H2, color: 'gray', title: 'docker-compose.yml', lines: ['PostgreSQL の起動設定'] });
const dc = card({ x: pos[3], y: Y2, w: ws[3], h: H2, color: 'gray', title: 'docs/', lines: ['ドキュメント'] });

// 3段目（子）
const Y3 = 276;
const bs1 = node({ x: 14, y: Y3, w: 210, color: 'green', lines: ['m|src/main/java/.../', 'm|App.java Database.java', 'm|api/ dto/'] });
const be1 = node({ x: 238, y: Y3, w: 210, color: 'green', lines: ['m|src/main/java/.../', 'm|controller service', 'm|repository entity dto'] });
const fe1 = node({ x: 462, y: Y3, w: 200, h: bs1.h, color: 'blue', lines: ['m|src/', 'm|pages api types', 'm|components'] });
const fe2 = node({ x: 676, y: Y3, w: 210, h: bs1.h, color: 'blue', lines: ['m|index.html', 'm|vite.config.ts', 'm|package.json'] });

const e = [];
// ルート → 5つ
const midA = (root.b + Y2) / 2;
for (const [n, c] of [[bs, 'gray'], [be, 'gray'], [fe, 'gray'], [dc, 'gray'], [dk, 'gray']]) {
  e.push(line([[root.cx, root.b], [root.cx, midA], [n.cx, midA], [n.cx, n.y - 5]], c));
}
// 親 → 子
const midB = (bs.b + Y3) / 2;
e.push(line([[bs.cx, bs.b], [bs.cx, midB], [bs1.cx, midB], [bs1.cx, Y3 - 5]], 'green'));
e.push(line([[be.cx, be.b], [be.cx, midB], [be1.cx, midB], [be1.cx, Y3 - 5]], 'green'));
e.push(line([[fe.cx, fe.b], [fe.cx, midB], [fe1.cx, midB], [fe1.cx, Y3 - 5]], 'blue'));
e.push(line([[fe.cx, fe.b], [fe.cx, midB], [fe2.cx, midB], [fe2.cx, Y3 - 5]], 'blue'));

const body = [root, bs, be, fe, dk, dc, bs1, be1, fe1, fe2].map((n) => n.svg).join('\n') + '\n  ' + e.join('\n  ');
M.finish('05-flow-01-directory-tree', {
  title: 'ルートの下にあるディレクトリとファイルの役割',
  desc: 'web-app-practice/ の下に、backend/（Spring Boot を使わない Java、第1章〜第10章）、backend_spring/（Java と Spring Boot、第11章〜第14章）、frontend/（React と TypeScript）、docs/（ドキュメント）、docker-compose.yml（PostgreSQL の起動設定）がある。backend/・backend_spring/・frontend/ の下には、それぞれ主なファイルやディレクトリがある。',
  body,
  bottom: bs1.b,
});
