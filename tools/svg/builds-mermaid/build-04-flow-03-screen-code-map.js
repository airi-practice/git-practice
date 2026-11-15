const { L, C, t, node, finish, nodeH } = require('./_common');
const O = ['1 ページを開く', '2 操作を受け取る', '3 バックエンドへ送る', '4 バックエンドが受け取る', '5 Java で処理する', '6 結果を返す', '7 画面に表示する'];
const K = [
  ['pages/ProductListPage.tsx', 'ProductListPage が表示される'],
  ['pages/ProductListPage.tsx', 'useEffect が fetchProducts を呼ぶ'],
  ['api/products.ts', 'fetch で GET /api/products', 'vite.config.ts の proxy で 8080 へ中継'],
  ['App.java', 'app.get で new ProductListApi() に対応づけ'],
  ['api/ProductListApi.java の handle', 'Database.java の connect と SELECT'],
  ['ProductListApi の ctx.json が', 'ProductResponse の List を JSON にする'],
  ['pages/ProductListPage.tsx', 'setProducts で状態が変わり、表が作られる'],
];
const KC = ['blue', 'blue', 'blue', 'green', 'green', 'green', 'blue'];
// 各行の高さ・位置を先に決める（次の行の O の位置に、K から下ろす矢印を合わせるため）
let y = 20;
const rows = K.map((k) => { const h = nodeH(k.length); const r = { y, h, cy: y + h / 2 }; y += h + 40; return r; });
let b = '';
rows.forEach((r, i) => {
  b += `\n  ${node({ x: 20, y: r.cy - 22, w: 250, h: 44, color: 'gray', lines: [O[i]], boldAll: true })}`;
  b += `\n  ${node({ x: 330, y: r.y, w: 550, h: r.h, color: KC[i], lines: K[i], bold1: true })}`;
  b += `\n  ${L.arrow({ x1: 274, y1: r.cy, x2: 326, y2: r.cy, color: 'gray', width: 4 })}`;
  if (i < rows.length - 1) {
    const n = rows[i + 1], c = C[KC[i]];
    b += `\n  <path d="M360 ${r.y + r.h} V${r.y + r.h + 20} H145 V${n.cy - 24}" fill="none" stroke="${c.main}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${c.arrow})"/>`;
  }
});
finish('04-flow-03-screen-code-map', {
  bottom: y - 40 + 0, body: b,
  title: '画面の操作の7つの段階と、そのとき実行されるファイルとコードの対応を、上から順にたどる図。ページを開く、操作を受け取る、バックエンドへ送る、バックエンドが受け取る、Java で処理する、結果を返す、画面に表示する',
  desc: '1 ページを開く：pages/ProductListPage.tsx で ProductListPage が表示される。2 操作を受け取る：useEffect が fetchProducts を呼ぶ。3 バックエンドへ送る：api/products.ts で fetch により GET /api/products を送り、vite.config.ts の proxy で 8080 へ中継する。4 バックエンドが受け取る：App.java の app.get で new ProductListApi() に対応づける。5 Java で処理する：ProductListApi.java の handle と、Database.java の connect と SELECT。6 結果を返す：ctx.json が ProductResponse の List を JSON にする。7 画面に表示する：setProducts で状態が変わり、表が作られる。',
});
