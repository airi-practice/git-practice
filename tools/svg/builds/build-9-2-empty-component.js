// 9-2-empty-component: MessagePage.tsx のファイル名の3つの部分と、部品の名前が同じになること、コードの中身を示す。
// 色: パス=青（フロントエンド）、部品の名前=黄（強調）、拡張子=灰、コード内の外枠・見出しは役割のない並列なので p1・p2
const L = require('../rich-lib');
const { C, t, SIZE, SUB, LINE } = L;

const chip = (x, w, color, s, bold) => `<g filter="url(#shadow)"><rect x="${x}" y="56" width="${w}" height="52" rx="12" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="${color === 'yellow' ? 3 : 2.5}"/></g>
  ${t(x + w / 2, 91, s, { size: SIZE.title, mono: true, bold, fill: C[color].dark })}`;
const expl = (x, w, color, label, s) => `<rect x="${x}" y="118" width="${w}" height="70" rx="10" fill="#ffffff" stroke="${C[color].main}" stroke-width="2"/>
  ${t(x + 14, 142, label, { size: SIZE.note, bold: true, anchor: 'start', fill: C[color].dark })}
  ${t(x + 14, 168, s, { anchor: 'start' })}`;
const code = (x, y, s, o = {}) => t(x, y, s, { size: SIZE.note, mono: true, anchor: 'start', bold: o.bold, fill: o.fill });
const sp = (n) => ' '.repeat(n);
const hl = (y, color) => `<rect x="28" y="${y}" width="524" height="30" rx="8" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="2"/>`;
const note = (y, s, color) => t(300, y, s, { size: SIZE.note, anchor: 'start', fill: color ? C[color].dark : SUB });

const body = `
  ${t(450, 38, '新しく作るファイルの名前を、3つの部分に分けて読む', { size: SIZE.title, bold: true })}
  ${chip(20, 400, 'blue', 'frontend/src/pages/')}
  ${chip(430, 270, 'yellow', 'MessagePage', true)}
  ${chip(710, 170, 'gray', '.tsx')}
  ${expl(20, 400, 'blue', '置き場所', '画面1枚分の部品は、pages/ に置く')}
  ${expl(430, 270, 'yellow', 'ファイル名', '部品の名前と同じ')}
  ${expl(710, 170, 'gray', '種類', 'TSX')}

  <g filter="url(#shadow)"><rect x="20" y="238" width="540" height="250" rx="14" fill="#ffffff" stroke="${LINE}" stroke-width="2"/></g>
  <path d="M20 268 v-16 a14 14 0 0 1 14 -14 h512 a14 14 0 0 1 14 14 v16 z" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2"/>
  ${code(36, 259, 'MessagePage.tsx', { bold: true, fill: C.blue.dark })}
  ${hl(280, 'yellow')}
  ${code(40, 300, 'export function')}
  <rect x="150" y="284" width="90" height="22" rx="5" fill="#ffffff" stroke="${C.yellow.main}" stroke-width="2.5"/>
  ${code(155, 300, 'MessagePage', { bold: true, fill: C.yellow.dark })}
  ${code(245, 300, '() {')}
  ${note(300, '部品（関数）を作る。大文字で始める', 'yellow')}
  ${code(40, 332, sp(2) + 'return (')}
  ${note(332, 'この部品が表示する内容を返す')}
  ${hl(342, 'p1')}
  ${code(40, 362, sp(4) + '<main>')}
  ${note(362, '画面全体の外枠（お手本と同じ）', 'p1')}
  ${hl(374, 'p2')}
  ${code(40, 394, sp(6) + '<h2>メッセージ表示</h2>')}
  ${note(394, '画面のタイトル', 'p2')}
  ${code(40, 426, sp(4) + '</main>')}
  ${code(40, 448, sp(2) + ')')}
  ${code(40, 470, '}')}

  <g filter="url(#shadow)"><rect x="580" y="238" width="300" height="250" rx="14" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="2"/></g>
  <path d="M580 268 v-16 a14 14 0 0 1 14 -14 h272 a14 14 0 0 1 14 14 v16 z" fill="#cfe3fb" stroke="${C.blue.main}" stroke-width="2"/>
  <circle cx="598" cy="253" r="4" fill="#ef5350"/><circle cx="611" cy="253" r="4" fill="#ffb300"/><circle cx="624" cy="253" r="4" fill="#43a047"/>
  ${t(740, 259, '画面（ブラウザ）', { size: SIZE.note, bold: true, fill: C.blue.dark })}
  ${t(600, 312, 'メッセージ表示', { size: SIZE.title, bold: true, anchor: 'start', fill: LINE })}
  <rect x="596" y="340" width="268" height="72" rx="10" fill="${C.yellow.light}" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(730, 368, 'まだ、画面には表示されない', { bold: true, fill: C.yellow.dark })}
  ${t(730, 394, '手順7で、パスに割り当てて表示する', { fill: C.yellow.dark })}
  <path d="M565 188 V208 H200 V274" fill="none" stroke="${C.yellow.main}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arY)"/>
  <rect x="300" y="190" width="200" height="30" rx="15" fill="#ffffff" stroke="${C.yellow.main}" stroke-width="2"/>
  ${t(400, 210, '同じ名前で、そろえる', { bold: true, fill: C.yellow.dark })}
  ${t(730, 456, '（上の部品は、これから表示する画面の中身）', { size: SIZE.note, fill: SUB })}`;

const y0 = 504;
L.write('9-2-empty-component', L.svg({
  y0,
  title: 'MessagePage.tsx のファイルの置き場所と名前、部品の名前が同じ MessagePage になること、return の中の画面の外枠と見出しを、実際のコードと一緒に示した図。まだ画面には表示されず、手順7で表示する',
  desc: '新しく作るファイル frontend/src/pages/MessagePage.tsx を、置き場所（pages/）、ファイル名（部品の名前と同じ MessagePage）、種類（TSX）の3つの部分に分けて読む。コードは export function MessagePage() の中で return し、main で画面全体の外枠を作り、h2 でタイトルを書く。まだ画面には表示されず、手順7で、パスに割り当てて表示する。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['まずは、中身が見出しだけの部品を作るんだ。', 'まだ画面には出ないけど、これが土台になるよ。'] }),
}));
