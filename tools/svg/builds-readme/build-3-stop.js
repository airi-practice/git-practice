// 3 の「止めるとき」: 画面 → バックエンド → DB の順に止める。
const S = require('../shot-lib');
const { t, hl, arrow, note, btn } = S;

// 左の赤い説明（1〜3行）。mono 行は、コマンドを等幅で書くため
const left = (y, n, lines) => lines.map((l, i) => {
  const o = typeof l === 'string' ? { text: l } : l;
  const txt = i === 0 ? `${n}. ${o.text}` : o.text;
  return t(30, y + i * 24, txt, { size: 15, bold: true, fill: S.RED_TEXT, mono: o.mono });
}).join('\n  ');

S.write('3-stop', S.svg({
  W: 760, H: 490,
  title: '止めるときの3つの手順。1 画面は Ctrl + C、2 バックエンドは Eclipse の赤い四角のボタン、3 DB は docker compose down',
  desc: '画面、バックエンド、DB の順に止める。DB は止めるとデータが消えるが、消えても問題なく、次に起動したときは最初の状態から始まる。',
  body: `
  ${left(52, '1', ['画面を止める', '動かしているターミナルで', 'Ctrl + C を押す'])}
  ${arrow({ x1: 262, y1: 66, x2: 286, y2: 66 })}
  ${S.terminal({ x: 290, y: 10, w: 450, h: 112, title: 'npm run dev を動かしているターミナル', lines: [
    'Local: http://localhost:5173/',
  ] })}
  ${btn({ x: 304, y: 80, w: 90, label: 'Ctrl + C', hot: true })}

  ${left(190, '2', ['バックエンドを止める', 'Eclipse のコンソールの', '赤い四角のボタンを押す'])}
  ${arrow({ x1: 262, y1: 204, x2: 286, y2: 204 })}
  <rect x="290" y="150" width="450" height="100" rx="6" fill="#0c0c0c" stroke="#555" stroke-width="1.5"/>
  ${t(304, 174, 'コンソール', { size: 13, fill: '#ccc' })}
  <rect x="690" y="156" width="40" height="26" rx="4" fill="#2d2d2d" stroke="${S.RED}" stroke-width="2"/>
  <rect x="702" y="162" width="16" height="14" fill="#e53e3e"/>
  <line x1="290" y1="190" x2="740" y2="190" stroke="#555"/>
  ${t(304, 216, 'Listening on http://localhost:8080/', { mono: true, fill: '#cccccc' })}

  ${left(312, '3', ['DB を止める', { text: 'docker compose down', mono: true }, 'を実行する'])}
  ${arrow({ x1: 262, y1: 326, x2: 286, y2: 326 })}
  ${S.terminal({ x: 290, y: 290, w: 450, h: 76, title: 'ターミナル', lines: [
    'C:\\work\\web-app-practice-main>docker compose down',
  ] })}

  <rect x="10" y="392" width="740" height="88" rx="8" fill="#fff8e1" stroke="#f9a825" stroke-width="2"/>
  ${t(30, 420, 'DB は、止めると中身のデータが消えるよ。だけど、消えても問題ないから安心して。', { size: 15, bold: true, fill: '#5c3d00' })}
  ${t(30, 448, '次に起動したときは、最初の状態から始まるよ。', { fill: '#5c3d00' })}`,
}));
