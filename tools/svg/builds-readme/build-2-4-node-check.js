// 2-4 の手順3: node -v を実行して、v で始まる数字が出ればOK。
const S = require('../shot-lib');
const { t, darkWin, hl, arrow, note } = S;

S.write('2-4-node-check', S.svg({
  W: 760, H: 215,
  title: 'ターミナルで node -v を実行すると、v22.12.0 のように v で始まる数字が表示される',
  desc: 'node -v を実行して、v で始まる数字が出れば Node.js が入っている。数字はバージョンなので、入れた時期によって違う。',
  body: `
  ${S.terminal({ x: 10, y: 10, w: 740, h: 110, title: 'ターミナル', lines: [
    'C:\\work\\web-app-practice-main>node -v',
    'v22.12.0',
  ] })}
  ${hl({ x: 22, y: 76, w: 90, h: 24 })}
  ${arrow({ x1: 70, y1: 150, x2: 70, y2: 104 })}
  ${note({ x: 40, y: 172, n: '1', text: 'v で始まる数字が出ればOK' })}
  ${t(40, 198, '（v22.12.0 は例。数字は、入れた Node.js のバージョンによって変わる）', { fill: '#555' })}`,
}));
