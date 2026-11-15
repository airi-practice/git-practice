// 2-4 の手順4: cd frontend を実行すると、プロンプトの最後が frontend になる。
const S = require('../shot-lib');
const { t, hl, arrow, note } = S;

S.write('2-4-cd-frontend', S.svg({
  W: 760, H: 300,
  title: 'cd frontend を実行する前と後。実行すると、ターミナルの表示の最後が frontend になる',
  desc: '実行前は展開したフォルダー（web-app-practice-main）の表示。cd frontend を実行すると、その下の frontend フォルダーに移動した表示になる。',
  body: `
  ${S.terminal({ x: 10, y: 10, w: 740, h: 84, title: 'cd frontend を実行する前', lines: [
    'C:\\work\\web-app-practice-main>cd frontend',
  ] })}
  ${arrow({ x1: 380, y1: 104, x2: 380, y2: 158 })}
  ${note({ x: 400, y: 136, n: '1', text: 'cd frontend を実行する' })}
  ${S.terminal({ x: 10, y: 168, w: 740, h: 84, title: 'cd frontend を実行した後', lines: [
    'C:\\work\\web-app-practice-main\\frontend>',
  ] })}
  ${hl({ x: 237, y: 208, w: 96, h: 24 })}
  ${note({ x: 40, y: 282, n: '2', text: '表示の最後が frontend になれば、移動できている' })}`,
}));
