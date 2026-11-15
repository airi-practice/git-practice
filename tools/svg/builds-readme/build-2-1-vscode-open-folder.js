// 2-1 の手順5〜6: VSCode の「ファイル」→「フォルダーを開く」を選び、frontend と backend が見えるフォルダーを開く。
// 注意: パスの区切りの \ は、JS の文字列では \\ と書き、必ず等幅（mono）で書く。
const S = require('../shot-lib');
const { t, win, darkWin, hl, arrow, note, btn } = S;

const folder = (y, name) => `
  <rect x="424" y="${y}" width="302" height="26" rx="4" fill="#ffffff" stroke="#cbd5e0"/>
  ${t(436, y + 18, name, { mono: true })}`;

S.write('2-1-vscode-open-folder', S.svg({
  W: 760, H: 330,
  title: 'VSCode でフォルダーを開く手順。「ファイル」→「フォルダーを開く」を選び、frontend と backend が見えるフォルダーを選んで開く',
  desc: '左の画面は、VSCode のメニューの「ファイル」から「フォルダーを開く」を選ぶ様子。右の画面は、展開したフォルダーの中に frontend と backend が見えることを確かめて、そのフォルダーを開く様子。',
  body: `
  ${darkWin({ x: 10, y: 10, w: 350, h: 250 })}
  <rect x="10" y="10" width="350" height="30" rx="8" fill="#323233"/>
  <rect x="16" y="14" width="64" height="24" rx="4" fill="#094771"/>
  ${hl({ x: 16, y: 14, w: 64, h: 24 })}
  ${t(26, 31, 'ファイル', { size: 13, fill: '#fff' })}
  ${t(96, 31, '編集', { size: 13, fill: '#ccc' })}
  ${t(140, 31, '選択', { size: 13, fill: '#ccc' })}
  ${t(184, 31, '表示', { size: 13, fill: '#ccc' })}
  <rect x="16" y="44" width="200" height="66" rx="4" fill="#252526" stroke="#555"/>
  ${t(28, 64, 'ほかのメニュー項目', { size: 13, fill: '#aaa' })}
  <rect x="22" y="76" width="188" height="28" rx="4" fill="#094771"/>
  ${hl({ x: 22, y: 76, w: 188, h: 28 })}
  ${t(34, 95, 'フォルダーを開く', { size: 14, fill: '#fff' })}
  ${arrow({ x1: 110, y1: 150, x2: 110, y2: 112 })}
  ${note({ x: 24, y: 176, text: '「ファイル」を押して、', dark: true })}
  ${note({ x: 24, y: 198, text: 'この項目を選ぶ', dark: true })}

  ${win({ x: 400, y: 10, w: 350, h: 250, title: '開くフォルダーを選ぶ' })}
  <rect x="414" y="42" width="322" height="30" rx="4" fill="#ffffff" stroke="#999"/>
  ${hl({ x: 414, y: 42, w: 322, h: 30 })}
  ${t(424, 62, 'C:\\work\\web-app-practice-main', { mono: true, size: 14 })}
${folder(84, 'backend')}
${folder(114, 'backend_spring')}
${folder(144, 'docs')}
${folder(174, 'frontend')}
  ${btn({ x: 636, y: 216, w: 90, label: '開く', hot: true })}

  ${arrow({ x1: 366, y1: 140, x2: 396, y2: 140 })}
  ${note({ x: 20, y: 290, n: '1', text: '「ファイル」→「フォルダーを開く」を選ぶ' })}
  ${note({ x: 410, y: 290, n: '2', text: 'frontend と backend が見えるフォルダーを' })}
  ${note({ x: 426, y: 312, text: '選んで「開く」を押す' })}`,
}));
