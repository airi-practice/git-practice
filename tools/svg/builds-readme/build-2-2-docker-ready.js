// 2-2 の手順2: Docker Desktop を起動して、画面の左下が緑色になるまで待つ。
const S = require('../shot-lib');
const { t, win, hl, arrow, note } = S;
const GREEN = '#2da44e';
const OK = '#2e7d32';

const dock = (x, color) => `
  <rect x="${x}" y="48" width="330" height="142" rx="4" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="${x + 16}" y="64" width="180" height="12" rx="3" fill="#e2e8f0"/>
  <rect x="${x + 16}" y="84" width="240" height="12" rx="3" fill="#e2e8f0"/>
  <rect x="${x + 16}" y="108" width="140" height="12" rx="3" fill="#e2e8f0"/>
  <rect x="${x}" y="190" width="120" height="30" fill="${color}"/>
  <circle cx="${x + 16}" cy="205" r="6" fill="#ffffff"/>
  ${hl({ x: x - 2, y: 188, w: 124, h: 34 })}`;

S.write('2-2-docker-ready', S.svg({
  W: 760, H: 330,
  title: 'Docker Desktop を起動したら、画面の左下が緑色になるまで待つ',
  desc: '左は、Docker Desktop の画面の左下がまだ緑色になっていない状態で、まだ待つ。右は、画面の左下が緑色になった状態で、OK。',
  body: `
  ${win({ x: 10, y: 10, w: 350, h: 220, title: 'Docker Desktop' })}
${dock(20, '#a0aec0')}
  ${win({ x: 400, y: 10, w: 350, h: 220, title: 'Docker Desktop' })}
${dock(410, GREEN)}
  ${arrow({ x1: 366, y1: 120, x2: 396, y2: 120 })}
  ${t(20, 262, '緑になる前', { size: 15, bold: true, fill: '#555' })}
  ${t(20, 286, '左下が緑色ではない。まだ待つ', { size: 14 })}
  ${t(410, 262, '緑になった後', { size: 15, bold: true, fill: OK })}
  ${t(410, 286, '左下が緑色になった。OK', { size: 14, bold: true, fill: OK })}
  ${note({ x: 20, y: 318, text: '画面の左下が緑色になるまで待つ' })}`,
}));
