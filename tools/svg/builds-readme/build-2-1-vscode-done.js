// 2-1 の「できたかの確認」: VSCode の左側に backend・backend_spring・frontend・docker-compose.yml が見えればOK。
const S = require('../shot-lib');
const { t, darkWin, hl, arrow, note } = S;

const row = (y, name, isDir) =>
  t(44, y, (isDir ? '> ' : '  ') + name, { mono: true, fill: '#ddd' });

S.write('2-1-vscode-done', S.svg({
  W: 760, H: 290,
  title: 'VSCode の左側に backend、backend_spring、frontend、docker-compose.yml が見えればOK',
  desc: 'VSCode の左側のエクスプローラーに、backend、backend_spring、frontend の3つのフォルダーと docker-compose.yml のファイルが並んでいる。この4つが見えれば、フォルダーを正しく開けている。',
  body: `
  ${darkWin({ x: 10, y: 10, w: 740, h: 270 })}
  <rect x="10" y="10" width="740" height="30" rx="8" fill="#323233"/>
  ${t(24, 31, 'ファイル', { size: 13, fill: '#ccc' })}
  <rect x="10" y="40" width="260" height="240" fill="#252526"/>
  <line x1="270" y1="40" x2="270" y2="280" stroke="#555"/>
  ${t(26, 64, 'エクスプローラー', { size: 13, fill: '#ccc' })}
${row(100, 'backend', true)}
${row(130, 'backend_spring', true)}
${row(160, 'frontend', true)}
${row(190, 'docker-compose.yml', false)}
  ${hl({ x: 30, y: 80, w: 226, h: 126 })}
  ${arrow({ x1: 470, y1: 143, x2: 264, y2: 143 })}
  ${note({ x: 482, y: 134, text: 'この4つが見えればOK', dark: true })}`,
}));
