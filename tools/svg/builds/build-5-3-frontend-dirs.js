// 5-3-frontend-dirs: frontend/ の中のファイルとディレクトリを、入れ子で示す図
const L = require('../rich-lib');
const { C, t, SIZE } = L;
const cfg = [
  { x: 40, name: 'index.html', d: 'ブラウザが最初に読み込む HTML' },
  { x: 317, name: 'package.json', d: '使う部品の一覧と、コマンドの設定' },
  { x: 594, name: 'vite.config.ts', d: 'Vite の設定。/api の中継もここ' },
].map((f) => `
  <g filter="url(#shadow)"><rect x="${f.x}" y="58" width="266" height="56" rx="10" fill="${C.gray.light}" stroke="${C.gray.main}" stroke-width="1.5"/></g>
  ${t(f.x + 133, 81, f.name, { bold: true, mono: true, fill: C.gray.dark })}
  ${t(f.x + 133, 102, f.d, { size: SIZE.note })}`).join('');
const src = [
  { x: 55, name: 'main.tsx', d: ['ブラウザで最初に動く', 'プログラム'] },
  { x: 325, name: 'App.tsx', d: ['パスごとに表示する画面を決める、', '一番外側の部品'] },
  { x: 595, name: 'index.css', d: ['全体の見た目（CSS）'] },
].map((f) => `
  <g filter="url(#shadow)"><rect x="${f.x}" y="164" width="250" height="84" rx="10" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2"/></g>
  ${t(f.x + 125, 190, f.name, { bold: true, mono: true, fill: C.blue.dark })}
${f.d.map((l, k) => '  ' + t(f.x + 125, 216 + k * 20, l, { size: SIZE.note })).join('\n')}`).join('');
const Y = 268, CH = 158;
const dirs = [
  { x: 55, color: 'p1', name: 'pages/', head: '画面1枚分の部品', lines: ['見た目と、表示の', 'きっかけを書く'], file: 'ProductListPage.tsx' },
  { x: 255, color: 'p2', name: 'api/', head: 'バックエンドへの通信', lines: ['URL や fetch を、', '画面の部品から切り離す'], file: 'products.ts' },
  { x: 455, color: 'p3', name: 'types/', head: 'データの型', lines: ['バックエンドが返す', 'JSON の形に対応する'], file: 'product.ts' },
  { x: 655, color: 'gray', name: 'components/', head: '共通の部品の置き場所', lines: ['複数の画面で使う部品を', '置く'], file: '（お手本では、今は空）', dashed: true },
].map((d) => {
  const c = C[d.color], cx = d.x + 92.5;
  let s = L.card({ x: d.x, y: Y, w: 185, h: CH, color: d.color, title: '' });
  if (d.dashed) s += `\n  <rect x="${d.x + 1}" y="${Y + 1}" width="183" height="${CH - 2}" rx="15" fill="none" stroke="${c.main}" stroke-width="2" stroke-dasharray="6,4"/>`;
  s += `\n  ${t(cx, Y + 31, d.name, { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' })}`;
  s += `\n  ${t(cx, Y + 74, d.head, { bold: true, fill: c.dark })}`;
  d.lines.forEach((l, k) => { s += `\n  ${t(cx, Y + 98 + k * 20, l, { size: SIZE.note })}`; });
  s += `\n  ${t(cx, Y + 142, d.file, { size: SIZE.note, mono: !d.dashed, fill: d.dashed ? C.gray.dark : c.dark })}`;
  return s;
}).join('\n');

const body = `
  <g filter="url(#shadow)"><rect x="20" y="12" width="860" height="440" rx="16" fill="${C.blue.light}" stroke="${C.blue.main}" stroke-width="2.5"/></g>
  ${L.icon({ name: 'folder', x: 36, y: 20, size: 28, color: C.blue.main })}
  ${t(72, 42, 'frontend/', { size: SIZE.title, bold: true, mono: true, fill: C.blue.dark, anchor: 'start' })}
  ${t(190, 42, 'React と TypeScript のフロントエンド（主なものだけ）', { fill: C.blue.dark, anchor: 'start' })}
${cfg}
  <rect x="40" y="126" width="820" height="312" rx="12" fill="#ffffff" stroke="${C.blue.main}" stroke-width="2" stroke-dasharray="7,4"/>
  ${t(56, 150, 'src/', { bold: true, mono: true, fill: C.blue.dark, anchor: 'start' })}
  ${t(112, 150, '画面や通信を書く場所。上は「ファイル」、下は「役割ごとのディレクトリ」', { size: SIZE.note, anchor: 'start' })}
${src}
${dirs}`;

L.write('5-3-frontend-dirs', L.svg({
  y0: 468,
  title: 'frontend/ の中のファイルとディレクトリを、役割ごとに色分けして入れ子で示した図',
  desc: 'frontend/ の中に index.html、package.json、vite.config.ts がある。src/ の中には、main.tsx、App.tsx、index.css の3つのファイルと、pages/、api/、types/、components/ の4つのディレクトリがある。components/ は、お手本では今は空。猫の先生が、色と名前から何がどこにあるか見るよう促している。',
  body,
  footer: L.foot({ W: 900, y0: 468, pose: 'wave', lines: ['frontend/ の中も、役割ごとに', '置き場所が分かれているんだよ。', '色と名前から、どこに何があるか見てみよう。'] }),
}));
