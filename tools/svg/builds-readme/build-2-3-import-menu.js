// 2-3 の手順4: Eclipse のメニュー「ファイル」→「インポート」を選ぶ。
const S = require('../shot-lib');
const { t, win, hl, arrow, note } = S;

S.write('2-3-import-menu', S.svg({
  W: 760, H: 300,
  title: 'Eclipse のメニューで「ファイル」を開き、「インポート」を選ぶ',
  desc: 'Eclipse の画面の上にあるメニューから「ファイル」を押し、出てきた一覧の「インポート」を選ぶ。',
  body: `
  ${win({ x: 10, y: 10, w: 740, h: 280 })}
  <rect x="10" y="10" width="740" height="40" rx="8" fill="#e2e8f0" stroke="#999" stroke-width="2"/>
  ${hl({ x: 24, y: 16, w: 80, h: 28, fill: '#bee3f8' })}
  ${t(64, 36, 'ファイル', { bold: true, anchor: 'middle', fill: '#1a365d' })}
  ${t(124, 36, '…', { fill: '#888' })}
  <rect x="24" y="50" width="260" height="130" rx="4" fill="#fff" stroke="#999" stroke-width="2"/>
  ${t(40, 78, '…', { fill: '#888' })}
  ${hl({ x: 28, y: 90, w: 252, h: 30, fill: '#bee3f8' })}
  ${t(40, 111, 'インポート', { bold: true, fill: '#1a365d' })}
  ${t(40, 150, '…', { fill: '#888' })}
  ${arrow({ x1: 440, y1: 30, x2: 112, y2: 30 })}
  ${note({ x: 450, y: 36, n: 1, text: '「ファイル」を押す' })}
  ${arrow({ x1: 440, y1: 105, x2: 292, y2: 105 })}
  ${note({ x: 450, y: 111, n: 2, text: '「インポート」を選ぶ' })}`,
}));
