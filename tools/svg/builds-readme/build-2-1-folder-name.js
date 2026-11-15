// 2-1 の手順3: 展開するフォルダーの名前は、日本語や空白を入れない。README 用の模擬図の見本。
// 注意: パスの区切りの \ は、JS の文字列では \\ と書く。
const S = require('../shot-lib');
const { t, win, note } = S;

const row = (y, ok, path, why) => `
  <rect x="40" y="${y}" width="330" height="40" rx="6" fill="#ffffff" stroke="${ok ? '#2e7d32' : S.RED}" stroke-width="2"/>
  ${t(56, y + 26, path, { size: 16, mono: true, fill: '#222' })}
  ${t(390, y + 26, (ok ? '○ ' : '× ') + why, { size: 15, bold: true, fill: ok ? '#2e7d32' : S.RED_TEXT })}`;

S.write('2-1-folder-name', S.svg({
  W: 760, H: 270,
  title: 'ZIP を展開するフォルダーの名前の例。C:\\work は使えるが、日本語や空白が入る名前は使えない',
  desc: 'フォルダーの名前に日本語や空白が入ると、あとの手順でうまく動かないことがある。C:\\work のように、英数字だけの名前にする。',
  body: `
  ${win({ x: 10, y: 10, w: 740, h: 250 })}
  ${t(40, 46, '展開するフォルダーの名前は、英数字だけにする', { size: 16, bold: true, fill: '#222' })}
${row(66, true, 'C:\\work', '英数字だけ。これを使う')}
${row(118, false, 'C:\\作業', '日本語が入っている')}
${row(170, false, 'C:\\my work', '空白が入っている')}
  ${note({ x: 40, y: 238, text: '迷ったら、英数字だけの名前のフォルダーを作って、そこに展開する' })}`,
}));
