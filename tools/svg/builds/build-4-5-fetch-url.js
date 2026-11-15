// 4-5-fetch-url: fetch に書いた宛先が、ブラウザと Vite を通って 8080 番のバックエンドに届くまで。
// 手順1〜3は青（フロントエンド側）、手順4は緑（バックエンド）。URL の各部分は役割がないので p1〜p4。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const code = (x, y, w, c, str, bold) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${C[c].light}" stroke="${C[c].main}" stroke-width="${bold ? 3 : 2}"/></g>
  ${t(x + w / 2, y + 29, str, { size: SIZE.title, mono: true, bold, fill: C[c].dark })}`;
const note = (T, l1, l2) => `
  <rect x="610" y="${T + 20}" width="270" height="48" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/>
  ${t(745, T + 39, l1, { size: SIZE.note, fill: SUB })}
  ${t(745, T + 57, l2, { size: SIZE.note, fill: SUB })}`;
const step = (T, n, color, title) => L.badge({ cx: 38, cy: T, n, color }) + '\n  ' + t(60, T + 6, title, { size: SIZE.head, bold: true, anchor: 'start' });
const url = (T, port, bold) => code(60, T + 22, 108, 'p1', 'http://') + code(174, T + 22, 132, 'p2', 'localhost')
  + code(312, T + 22, 84, 'p3', port, true) + code(402, T + 22, 180, 'p4', '/api/products');
const T = [26, 126, 226, 326];
const body = `
  ${L.arrow({ x1: 38, y1: 40, x2: 38, y2: 330, color: 'gray', width: 3 })}
  ${step(T[0], '1', 'blue', 'コードに書いた宛先（パスだけ）')}
  ${code(60, T[0] + 22, 100, 'gray', "fetch('")}${code(166, T[0] + 22, 180, 'p4', '/api/products')}${code(352, T[0] + 22, 50, 'gray', "')")}
  ${note(T[0], 'http://localhost:8080 は書いていない。', 'パスだけを書いている')}
  ${step(T[1], '2', 'blue', 'ブラウザが、今開いているページの場所を前に付けて、宛先にする')}
  ${url(T[1], ':5173')}
  ${note(T[1], '届き先は、画面を配信している', 'Vite（5173 番）')}
  ${step(T[2], '3', 'blue', 'Vite が、/api で始まるので、バックエンドの場所に替えて中継する')}
  ${url(T[2], ':8080')}
  ${note(T[2], 'vite.config.ts の proxy で、', '5173 番が 8080 番に替わる')}
  ${step(T[3], '4', 'green', 'バックエンド（8080 番）が受け取る')}
  <g filter="url(#shadow)"><rect x="60" y="${T[3] + 22}" width="522" height="64" rx="12" fill="${C.green.light}" stroke="${C.green.main}" stroke-width="2"/></g>
  ${t(321, T[3] + 50, 'App.java の app.get の対応づけで、', { fill: C.green.dark })}
  ${t(321, T[3] + 72, 'ProductListApi の handle が呼ばれる', { fill: C.green.dark })}
  ${note(T[3] + 14, '画面の URL（/products）は', '中継されない（別物）')}`;
const y0 = 428;
L.write('4-5-fetch-url', L.svg({
  y0,
  title: 'fetch に書いた宛先 /api/products が、ブラウザと Vite を通って、8080 番のバックエンドに届くまでの変化を、上から順に示した図',
  desc: '1. コードには、http://localhost:8080 を書かず、パスだけの fetch(\'/api/products\') と書く。2. ブラウザが、今開いているページの場所を前に付けて http://localhost:5173/api/products にする。届き先は、画面を配信している Vite（5173 番）。3. Vite が、/api で始まるので、vite.config.ts の proxy で 5173 番を 8080 番に替えて中継する。4. バックエンド（8080 番）が受け取り、App.java の app.get の対応づけで ProductListApi の handle が呼ばれる。画面の URL（/products）は中継されない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['fetch に書いた宛先は、Vite が中継して', '8080 番のバックエンドに届くんだよ'] }),
}));
