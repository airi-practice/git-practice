// folder-and-path: フォルダの階層と、パス・cd コマンドの対応。
// たどる道すじ（frontend/src/App.tsx）は青（フロントエンド）、backend 系は緑、その他は灰
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const row = (x, y, w, color, name, ico, bold) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="36" rx="9" fill="${C[color].light}" stroke="${C[color].main}" stroke-width="${bold ? 2.5 : 1.5}"/></g>
  ${L.icon({ name: ico, x: x + 10, y: y + 8, size: 20, color: C[color].main })}
  ${t(x + 38, y + 24, name, { mono: true, bold, anchor: 'start', fill: C[color].dark })}`;
const body = `
  <g fill="none" stroke="#94a3b8" stroke-width="2">
    <path d="M44,60 V318"/><path d="M44,88 H66"/><path d="M44,226 H66"/><path d="M44,272 H66"/><path d="M44,318 H66"/>
    <path d="M80,106 V134 H102"/><path d="M116,152 V180 H138"/>
  </g>
${row(30, 24, 210, 'gray', 'web-app-practice/', 'folder', false)}
  ${t(252, 48, '← リポジトリ', { anchor: 'start', fill: '#475569' })}
${row(66, 70, 210, 'blue', 'frontend/', 'folder', true)}
${row(102, 116, 210, 'blue', 'src/', 'folder', true)}
${row(138, 162, 210, 'blue', 'App.tsx', 'file', true)}
${row(66, 208, 210, 'green', 'backend/', 'folder', false)}
${row(66, 254, 210, 'green', 'backend_spring/', 'folder', false)}
${row(66, 300, 210, 'gray', 'docs/', 'folder', false)}
  <line x1="276" y1="88" x2="400" y2="88" stroke="${C.blue.main}" stroke-width="2.5" stroke-linecap="round"/>
${L.card({ x: 400, y: 24, w: 480, h: 112, color: 'blue', title: '' })}
  ${t(640, 55, 'cd frontend', { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' })}
  ${t(640, 96, 'ターミナルで、操作するフォルダを frontend フォルダに移すコマンド。')}
  ${t(640, 120, '移ったあとは、frontend の中のファイルを、短い名前で指定できる。')}
  <line x1="348" y1="180" x2="400" y2="210" stroke="${C.blue.main}" stroke-width="2.5" stroke-linecap="round"/>
${L.card({ x: 400, y: 160, w: 480, h: 198, color: 'blue', title: 'パス' })}
  ${t(640, 250, 'frontend/src/App.tsx', { size: SIZE.hero, bold: true, mono: true, fill: C.blue.dark })}
  ${t(640, 284, 'リポジトリのいちばん上のフォルダから、')}
  ${t(640, 308, 'ファイルまでの道すじを、')}
  ${t(640, 332, 'フォルダの名前を / で区切って書いたもの。')}`;
const y0 = 374;
L.write('folder-and-path', L.svg({
  y0,
  title: 'フォルダの階層と、パス・cd コマンドの対応',
  desc: 'リポジトリ web-app-practice の下に、frontend・backend・backend_spring・docs のフォルダがあり、frontend の下に src、その下に App.tsx がある。cd frontend は、ターミナルで操作するフォルダを frontend フォルダに移すコマンド。パス frontend/src/App.tsx は、リポジトリのいちばん上のフォルダからファイルまでの道すじを、フォルダの名前を / で区切って書いたもの。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['パスは、ファイルまでの道すじを', 'フォルダ名と / で書いたものだよ。'] }),
}));
