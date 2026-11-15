// 2-2 の手順4: VSCode のターミナルで docker compose up -d を実行し、training-db が起動したことを確かめる。
// 注意: パスの区切りの \ は、JS の文字列では \\ と書き、必ず等幅（mono）で書く。
const S = require('../shot-lib');
const { t, hl, arrow, note, terminal } = S;

S.write('2-2-compose-up', S.svg({
  W: 760, H: 210,
  title: 'VSCode のターミナルで docker compose up -d を実行すると、training-db のコンテナーが起動する',
  desc: 'ターミナルに docker compose up -d と入力して実行すると、training-db のコンテナーが起動したことを表す行が出る。表示は環境によって少し違う。',
  body: `
  ${terminal({ x: 10, y: 10, w: 740, h: 150, lines: [
    'C:\\work\\web-app-practice-main>docker compose up -d',
    '',
    ' Container training-db  Started',
    '',
    'C:\\work\\web-app-practice-main>',
  ] })}
  ${arrow({ x1: 452, y1: 44, x2: 408, y2: 44 })}
  ${note({ x: 462, y: 49, n: '1', text: 'コマンドを実行する', dark: true })}
  ${hl({ x: 20, y: 66, w: 290, h: 22 })}
  ${arrow({ x1: 452, y1: 82, x2: 316, y2: 82 })}
  ${note({ x: 462, y: 87, n: '2', text: 'training-db が起動した', dark: true })}
  ${t(20, 190, '（表示は環境によって少し違う）', { size: 14, fill: '#555' })}`,
}));
