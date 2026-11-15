const { L, C, t, node, label, finish } = require('./_common');
const lab = (cx) => label({ cx, cy: 274, w: 190, lines: ['どちらか一方だけが', '8080 番を使える'], color: 'blue' });
const dbC = C.orange;
const cyl = (x, y, w, h) => `<g filter="url(#shadow)"><path d="M${x} ${y + 14} a${w / 2} 14 0 0 1 ${w} 0 v${h - 28} a${w / 2} 14 0 0 1 ${-w} 0 z" fill="${dbC.light}" stroke="${dbC.main}" stroke-width="2"/></g>
  <path d="M${x} ${y + 14} a${w / 2} 14 0 0 0 ${w} 0" fill="none" stroke="${dbC.main}" stroke-width="2"/>`;
const body = `
  ${node({ x: 250, y: 20, w: 400, h: 66, color: 'blue', lines: ['画面（ブラウザ）', '/api/products にリクエストを送る'], bold1: true })}
  ${L.arrow({ x1: 450, y1: 88, x2: 450, y2: 128, color: 'blue' })}
  ${node({ x: 250, y: 130, w: 400, h: 88, color: 'blue', lines: ['Vite（5173 番）', '/api で始まるリクエストを', '8080 番へ中継する'], bold1: true })}
  ${L.arrow({ x1: 350, y1: 220, x2: 240, y2: 326, color: 'blue' })}
  ${L.arrow({ x1: 550, y1: 220, x2: 660, y2: 326, color: 'blue' })}
  ${lab(295)}
  ${lab(605)}
  ${node({ x: 20, y: 330, w: 410, h: 88, color: 'green', lines: ['backend/', '8080 番で待ち受ける', '（第1〜10章）'], bold1: true })}
  ${node({ x: 470, y: 330, w: 410, h: 88, color: 'green', lines: ['backend_spring/', '8080 番で待ち受ける', '（この章）'], bold1: true })}
  ${L.arrow({ x1: 225, y1: 420, x2: 330, y2: 486, color: 'green' })}
  ${L.arrow({ x1: 675, y1: 420, x2: 570, y2: 486, color: 'green' })}
  ${cyl(250, 490, 400, 110)}
  ${t(450, 541, 'データベース（PostgreSQL）', { bold: true, fill: dbC.dark })}
  ${t(450, 563, 'products テーブルに商品が入っている', { fill: dbC.dark })}`;
finish('11-flow-01-backend-switch', {
  bottom: 600, body,
  title: '画面（ブラウザ）が Vite（5173 番）に送ったリクエストを、8080 番へ中継する。8080 番は backend/ か backend_spring/ のどちらか一方だけが使え、どちらもデータベース（PostgreSQL）の products テーブルを使う図',
  desc: '画面（ブラウザ）が /api/products にリクエストを送る。Vite（5173 番）が /api で始まるリクエストを 8080 番へ中継する。中継先は、backend/（第1〜10章）か backend_spring/（この章）のどちらか一方だけが 8080 番を使える。どちらも、データベース（PostgreSQL）の products テーブルに入っている商品を使う。',
});
