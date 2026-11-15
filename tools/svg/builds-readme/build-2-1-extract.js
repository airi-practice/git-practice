// 2-1 の手順2: ダウンロードした ZIP を右クリックして「すべて展開」を選び、展開先を指定して「展開」を押す。
// 注意: パスの区切りの \ は、JS の文字列では \\ と書き、必ず等幅（mono）で書く。
const S = require('../shot-lib');
const { t, win, hl, arrow, note, btn } = S;

S.write('2-1-extract', S.svg({
  W: 760, H: 300,
  title: 'ZIP を展開する手順。ZIP を右クリックして「すべて展開」を選び、展開先のフォルダーを指定して「展開」を押す',
  desc: '左の画面は、エクスプローラーでダウンロードした ZIP を右クリックし、メニューの「すべて展開」を選ぶ様子。右の画面は、展開先のフォルダーに C:\\work を指定して「展開」ボタンを押す様子。',
  body: `
  ${win({ x: 10, y: 10, w: 350, h: 220, title: 'エクスプローラー' })}
  <rect x="24" y="48" width="322" height="30" rx="4" fill="#e2e8f0"/>
  ${t(36, 69, 'web-app-practice-main.zip', { mono: true })}
  <rect x="100" y="86" width="230" height="84" rx="6" fill="#ffffff" stroke="#999" stroke-width="2"/>
  ${t(114, 112, 'ほかのメニュー項目', { size: 13, fill: '#888' })}
  <rect x="106" y="126" width="218" height="32" rx="4" fill="#fff5f5"/>
  ${hl({ x: 106, y: 126, w: 218, h: 32 })}
  ${t(120, 148, 'すべて展開', { bold: true, fill: S.RED_TEXT })}

  ${win({ x: 400, y: 10, w: 350, h: 220, title: '展開先を指定する' })}
  ${t(418, 70, '展開先のフォルダー', { size: 14 })}
  <rect x="418" y="82" width="314" height="34" rx="4" fill="#ffffff" stroke="#999" stroke-width="1"/>
  ${hl({ x: 418, y: 82, w: 314, h: 34 })}
  ${t(430, 105, 'C:\\work', { mono: true })}
  ${btn({ x: 620, y: 176, w: 100, label: '展開', hot: true })}

  ${arrow({ x1: 366, y1: 140, x2: 396, y2: 140 })}
  ${note({ x: 20, y: 262, n: '1', text: 'ZIP を右クリックして「すべて展開」を選ぶ' })}
  ${note({ x: 410, y: 262, n: '2', text: '展開先を指定して「展開」を押す' })}`,
}));
