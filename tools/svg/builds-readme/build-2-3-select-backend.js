// 2-3 の手順6: 「参照」を押して出るフォルダー選択の画面で、backend だけを選ぶ。
const S = require('../shot-lib');
const { t, win, hl, arrow, note, btn } = S;

const row = (y, name, ok, why) => `
  <rect x="64" y="${y}" width="${ok ? 330 : 330}" height="32" rx="4" fill="${ok ? '#bee3f8' : '#ffffff'}" stroke="${ok ? S.RED : '#bbb'}" stroke-width="${ok ? 2 : 1}"/>
  ${t(76, y + 22, '▸ ' + name, { size: 15, bold: ok, mono: true, fill: ok ? '#1a365d' : '#333' })}
  ${t(412, y + 22, (ok ? '○ ' : '× ') + why, { size: 15, bold: true, fill: ok ? '#2e7d32' : S.RED_TEXT })}`;

S.write('2-3-select-backend', S.svg({
  W: 760, H: 390,
  title: '「参照」を押して出るフォルダー選択の画面で、frontend や backend_spring ではなく backend を選ぶ',
  desc: 'ルート・ディレクトリーの「参照」を押すと、フォルダーを選ぶ画面が出る。「1. リポジトリを取得する」で開いたフォルダーの中に backend、backend_spring、frontend が並んでいるので、backend だけを選ぶ。',
  body: `
  ${win({ x: 10, y: 10, w: 740, h: 370 })}
  ${t(30, 44, 'ルート・ディレクトリー:', { size: 14 })}
  <rect x="200" y="26" width="350" height="28" rx="4" fill="#fff" stroke="#999"/>
  ${btn({ x: 560, y: 25, w: 86, h: 30, label: '参照', hot: true })}
  ${note({ x: 646, y: 78, n: 1, text: '「参照」を押す', anchor: 'end' })}

  <rect x="30" y="96" width="700" height="270" rx="6" fill="#ffffff" stroke="#999" stroke-width="2"/>
  ${t(46, 124, 'フォルダーを選ぶ画面', { size: 15, bold: true, fill: '#222' })}
  ${t(46, 156, '▾ 「1. リポジトリを取得する」で開いたフォルダー', { size: 14 })}
${row(170, 'backend', true, 'これを選ぶ')}
${row(208, 'backend_spring', false, '選ばない')}
${row(246, 'frontend', false, '選ばない')}
  ${note({ x: 46, y: 320, n: 2, text: '開いたフォルダーの中の backend だけを選ぶ' })}
  ${t(46, 346, '（名前が似ている backend_spring や、frontend は選ばない）', { size: 14 })}`,
}));
