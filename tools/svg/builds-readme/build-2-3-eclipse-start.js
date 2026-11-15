// 2-3 の手順3: eclipse フォルダーの eclipse.exe を起動し、ワークスペースを聞かれたらそのまま「起動」を押す。
const S = require('../shot-lib');
const { t, win, hl, arrow, note, btn } = S;

S.write('2-3-eclipse-start', S.svg({
  W: 760, H: 300,
  title: '展開したフォルダーの eclipse フォルダーにある eclipse.exe を起動し、ワークスペースを聞かれたらそのまま「起動」を押す',
  desc: '左はエクスプローラーの画面で、eclipse フォルダーの中の eclipse.exe を起動する。右は最初に出るワークスペースを聞かれる画面で、設定は変えずにそのまま「起動」を押す。',
  body: `
  ${win({ x: 10, y: 10, w: 350, h: 280, title: 'eclipse フォルダーの中' })}
  ${hl({ x: 24, y: 48, w: 322, h: 34, fill: '#bee3f8' })}
  ${t(34, 70, 'eclipse.exe', { size: 15, bold: true, mono: true, fill: '#1a365d' })}
  ${t(34, 112, '（ほかのファイル）', { size: 13, fill: '#888' })}
  ${note({ x: 24, y: 220, n: 1, text: '展開したフォルダーの' })}
  ${note({ x: 24, y: 244, text: '   eclipse フォルダーにある' })}
  ${note({ x: 24, y: 268, text: '   eclipse.exe を起動する' })}

  ${arrow({ x1: 364, y1: 150, x2: 396, y2: 150 })}

  ${win({ x: 400, y: 10, w: 350, h: 280, title: 'ワークスペース' })}
  ${t(414, 70, 'ワークスペースを聞かれる画面', { size: 14 })}
  ${btn({ x: 640, y: 160, w: 98, label: '起動', hot: true })}
  ${note({ x: 414, y: 220, n: 2, text: '何も変えずに、' })}
  ${note({ x: 414, y: 244, text: '   そのまま「起動」を押す' })}`,
}));
