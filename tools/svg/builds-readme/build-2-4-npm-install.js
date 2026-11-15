// 2-4 の手順5: npm install を実行する（初回だけ。時間がかかる）。
const S = require('../shot-lib');
const { t, hl, arrow, note } = S;

S.write('2-4-npm-install', S.svg({
  W: 760, H: 228,
  title: 'ターミナルで npm install を実行して、終わった画面。初回だけで、時間がかかる',
  desc: 'frontend フォルダーで npm install を実行する。必要なパッケージのダウンロードが終わると、次の入力を待つ表示に戻る。表示は環境によって少し違う。',
  body: `
  ${S.terminal({ x: 10, y: 10, w: 740, h: 110, lines: [
    'C:\\work\\web-app-practice-main\\frontend>npm install',
    { text: '（ダウンロードの表示が流れる）', fill: '#aaaaaa' },
    'C:\\work\\web-app-practice-main\\frontend>',
  ] })}
  ${hl({ x: 323, y: 20, w: 96, h: 24 })}
  ${hl({ x: 22, y: 66, w: 320, h: 26 })}
  ${arrow({ x1: 420, y1: 150, x2: 346, y2: 96 })}
  ${note({ x: 40, y: 150, n: '1', text: '初回だけ実行する。時間がかかる' })}
  ${note({ x: 430, y: 172, n: '2', text: '次の入力を待つ表示に戻れば終わり' })}
  ${t(40, 206, '（表示は環境によって少し違う）', { fill: '#555' })}`,
}));
