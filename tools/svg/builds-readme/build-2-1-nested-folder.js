// 2-1 の手順6の補足: 展開すると同じ名前のフォルダーが二重になることがある。中のフォルダーを開く。
const S = require('../shot-lib');
const { t, arrow, note } = S;
const OK = '#2e7d32';

const item = (y, name) => `
  ${t(94, y, name, { mono: true })}`;

S.write('2-1-nested-folder', S.svg({
  W: 760, H: 350,
  title: '展開すると同じ名前のフォルダーが二重になることがある。外側のフォルダーは開かず、frontend と backend が直接見える内側のフォルダーを開く',
  desc: '外側の web-app-practice-main フォルダーの中に、同じ名前の内側のフォルダーがある。内側のフォルダーの中に frontend、backend、backend_spring、docker-compose.yml が見える。外側を開くと NG で、内側を開くと OK。',
  body: `
  <rect x="20" y="20" width="450" height="270" rx="10" fill="#fff5f5" stroke="${S.RED}" stroke-width="2"/>
  ${t(36, 48, 'web-app-practice-main（外側）', { size: 15, bold: true, mono: true, fill: S.RED_TEXT })}
  <rect x="50" y="66" width="390" height="204" rx="10" fill="#f0fff4" stroke="${OK}" stroke-width="3"/>
  ${t(66, 94, 'web-app-practice-main（内側）', { size: 15, bold: true, mono: true, fill: OK })}
${item(128, 'backend')}
${item(158, 'backend_spring')}
${item(188, 'frontend')}
${item(218, 'docker-compose.yml')}
  ${t(94, 248, '…', { mono: true, fill: '#888' })}

  ${arrow({ x1: 540, y1: 40, x2: 476, y2: 40 })}
  ${t(550, 46, '× 外側', { size: 15, bold: true, fill: S.RED_TEXT })}
  ${t(550, 70, 'frontend と backend が', {})}
  ${t(550, 90, '直接は見えない', {})}
  ${t(550, 110, 'ここは開かない', { bold: true })}

  ${arrow({ x1: 540, y1: 180, x2: 446, y2: 180 })}
  ${t(550, 186, '○ 内側', { size: 15, bold: true, fill: OK })}
  ${t(550, 210, 'frontend と backend が', {})}
  ${t(550, 230, '直接見える', {})}
  ${t(550, 250, 'ここを開く', { bold: true })}

  ${note({ x: 20, y: 324, text: '中のフォルダー（frontend と backend が直接見える方）を開く' })}`,
}));
