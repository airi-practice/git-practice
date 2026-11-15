// 3 の手順4: VSCode のターミナルをもう1つ開いて、2つ目で frontend に移動し npm run dev を動かす。
const S = require('../shot-lib');
const { t, darkWin, hl, arrow, note } = S;

S.write('3-two-terminals', S.svg({
  W: 760, H: 240,
  title: 'VSCode のターミナルを2つ開いた様子。1つ目で docker compose up -d を実行し、2つ目で frontend に移動して npm run dev を動かす',
  desc: 'ターミナルのタブが2つ並んでいる。1つ目は docker compose up -d を実行したもの。2つ目は frontend フォルダーに移動して npm run dev を動かす。',
  body: `
  ${darkWin({ x: 10, y: 10, w: 740, h: 220 })}
  ${t(24, 33, 'ターミナル', { size: 13, fill: '#ccc' })}
  <rect x="120" y="16" width="90" height="24" rx="4" fill="#2d2d2d" stroke="#777" stroke-width="1"/>
  ${t(165, 33, 'cmd', { size: 13, fill: '#fff', anchor: 'middle' })}
  <rect x="216" y="16" width="90" height="24" rx="4" fill="#094771" stroke="${S.RED}" stroke-width="2"/>
  ${t(261, 33, 'cmd', { size: 13, fill: '#fff', anchor: 'middle' })}
  <line x1="10" y1="48" x2="750" y2="48" stroke="#555"/>
  ${arrow({ x1: 400, y1: 28, x2: 312, y2: 28 })}
  ${note({ x: 410, y: 33, n: '2', text: '2つ目：npm run dev', dark: true })}
  ${arrow({ x1: 184, y1: 84, x2: 168, y2: 46 })}
  ${note({ x: 192, y: 94, n: '1', text: '1つ目：docker compose up -d を実行した', dark: true })}
  ${t(24, 150, 'C:\\work\\web-app-practice-main>cd frontend', { mono: true, fill: '#e6e6e6' })}
  ${t(24, 172, 'C:\\work\\web-app-practice-main\\frontend>npm run dev', { mono: true, fill: '#e6e6e6' })}
  ${hl({ x: 20, y: 156, w: 460, h: 24 })}
  ${t(24, 206, '2つ目のタブ（今開いているタブ）の中身。npm run dev は動かし続ける', { fill: '#aaa' })}`,
}));
