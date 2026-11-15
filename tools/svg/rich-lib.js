// リッチな説明図を作るための共通部品。色・文字の大きさ・影を、すべての図でそろえるために1か所にまとめる。
// 使い方の見本は builds/build-1-1.js。ルールは .claude/rules/svg-rules.md。
// 図を作り直すには: node tools/svg/builds/build-<図の名前>.js （docs/images/<図の名前>.svg を書き出す）
const fs = require('fs');
const path = require('path');

const { catSVG } = require('./cat');

// 色は「何を表すか」で決める。
//   役割: ブラウザ=blue、サーバー=green、データベース=orange
//   意味: 灰=gray（補足・中立・番号を振るだけの並列）、黄=yellow（強調・たとえ話）、赤=red（注意）
//   区別: p1〜p4（紫・青緑・赤紫・青灰）。役割を持たない項目を、色で区別するときだけ使う
const C = {
  blue: { main: '#1565c0', light: '#e3f2fd', dark: '#0d3c75', head: 'headBlue', arrow: 'arB' },
  green: { main: '#2e7d32', light: '#e8f5e9', dark: '#1b4d1f', head: 'headGreen', arrow: 'arG' },
  orange: { main: '#e65100', light: '#fff3e0', dark: '#8a3000', head: 'headOrange', arrow: 'arO' },
  gray: { main: '#555555', light: '#f1f5f9', dark: '#334155', head: 'headGray', arrow: 'arK' },
  yellow: { main: '#f9a825', light: '#fff8e1', dark: '#8a5a00', head: 'headYellow', arrow: 'arY', headText: '#5c3d00' },
  red: { main: '#c62828', light: '#ffebee', dark: '#8e1b1b', head: 'headRed', arrow: 'arR' },
  p1: { main: '#6a1b9a', light: '#f3e5f5', dark: '#45115f', head: 'headP1', arrow: 'arK' },
  p2: { main: '#00796b', light: '#e0f2f1', dark: '#004d40', head: 'headP2', arrow: 'arK' },
  p3: { main: '#ad1457', light: '#fce4ec', dark: '#7a0f3d', head: 'headP3', arrow: 'arK' },
  p4: { main: '#455a64', light: '#eceff1', dark: '#263238', head: 'headP4', arrow: 'arK' },
};
const TEXT = '#1e293b', SUB = '#475569', LINE = '#94a3b8';
// 文字の大きさは6段階だけ: 主役のコード28 / 見出し22 / 小見出し18 / 本文15 / 注記13 / 台詞16
// hero(28)は、GET・200・/api/products のように、図の主役になる短いコードや数値にだけ使う
const SIZE = { hero: 28, title: 22, head: 18, body: 15, note: 13, speech: 16 };

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// 文字。opt: size(既定15) / bold / fill / anchor(既定 middle) / mono
const t = (x, y, str, opt = {}) =>
  `<text x="${x}" y="${y}" font-size="${opt.size ?? 15}"${opt.bold ? ' font-weight="bold"' : ''} fill="${opt.fill ?? TEXT}" text-anchor="${opt.anchor ?? 'middle'}"${opt.mono ? ` font-family="Consolas,'Courier New',monospace"` : ''}>${esc(str)}</text>`;

const defs = () => `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4ff"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
    <linearGradient id="headBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e7ad6"/><stop offset="1" stop-color="#1257a8"/></linearGradient>
    <linearGradient id="headGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43a047"/><stop offset="1" stop-color="#2a7330"/></linearGradient>
    <linearGradient id="headOrange" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ef6c00"/><stop offset="1" stop-color="#b83c00"/></linearGradient>
    <linearGradient id="headGray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b8794"/><stop offset="1" stop-color="#4b5563"/></linearGradient>
    <linearGradient id="headYellow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd54f"/><stop offset="1" stop-color="#f9a825"/></linearGradient>
    <linearGradient id="headRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e53935"/><stop offset="1" stop-color="#a61c1c"/></linearGradient>
    <linearGradient id="headP1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e24aa"/><stop offset="1" stop-color="#5a1480"/></linearGradient>
    <linearGradient id="headP2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12998a"/><stop offset="1" stop-color="#00625a"/></linearGradient>
    <linearGradient id="headP3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c2185b"/><stop offset="1" stop-color="#8e0f42"/></linearGradient>
    <linearGradient id="headP4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#607d8b"/><stop offset="1" stop-color="#37474f"/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbeafe"/></linearGradient>
    <linearGradient id="rack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6dbf73"/><stop offset="1" stop-color="#3f9a47"/></linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#0f172a" flood-opacity="0.16"/></filter>
    <marker id="arB" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.blue.main}"/></marker>
    <marker id="arG" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.green.main}"/></marker>
    <marker id="arO" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.orange.main}"/></marker>
    <marker id="arK" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#555555"/></marker>
    <marker id="arR" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.red.main}"/></marker>
    <marker id="arY" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.yellow.main}"/></marker>
  </defs>`;

// 色付きの見出し帯があるカード。本文の置き場は y+46 より下
const card = ({ x, y, w, h, color, title, sub }) => {
  const c = C[color];
  return `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#ffffff" stroke="${c.main}" stroke-width="2"/></g>
  <path d="M${x} ${y + 46} v-30 a16 16 0 0 1 16 -16 h${w - 32} a16 16 0 0 1 16 16 v30 z" fill="url(#${c.head})"/>
  ${t(x + w / 2, y + 31, title, { size: SIZE.head, bold: true, fill: c.headText ?? '#ffffff' })}${sub ? '\n  ' + t(x + w / 2, y + 74, sub, { fill: SUB }) : ''}`;
};

// カードの中などに置く、薄い色の小さな箱
const box = ({ x, y, w, h, color, dashed }) => {
  const c = C[color];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c.light}" stroke="${c.main}" stroke-width="1.5"${dashed ? ' stroke-dasharray="6,4"' : ''}/>`;
};

// 番号バッジ付きのラベル（矢印の説明に使う）。n を省くとバッジなし
const pill = ({ cx, y, w, label, n, color }) => {
  const c = C[color];
  const left = cx - w / 2;
  return `
  <rect x="${left}" y="${y}" width="${w}" height="30" rx="15" fill="#ffffff" stroke="${c.main}" stroke-width="2"/>${n ? `
  <circle cx="${left + 17}" cy="${y + 15}" r="11" fill="${c.main}"/>
  ${t(left + 17, y + 20, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}` : ''}
  ${t(cx + (n ? 10 : 0), y + 20, label, { bold: true, fill: c.dark })}`;
};

// 太い矢印。color は送る側の色（blue / green / orange）。送る側が決まらないときは gray
const arrow = ({ x1, y1, x2, y2, color, width = 6 }) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[color].main}" stroke-width="${width}" stroke-linecap="round" marker-end="url(#${C[color].arrow})"/>`;

// 往復の矢印（行きと帰りを2本で描く）。水平（y1===y2）か垂直（x1===x2）の線だけ。
// 行き=colorGo、帰り=colorBack。送る側の色にそろえる。gap は2本の間隔
const biArrow = ({ x1, y1, x2, y2, colorGo, colorBack, width = 4, gap = 12 }) => {
  const h = y1 === y2;
  const o = gap / 2;
  const go = h ? { x1, y1: y1 - o, x2, y2: y2 - o } : { x1: x1 - o, y1, x2: x2 - o, y2 };
  const back = h ? { x1: x2, y1: y2 + o, x2: x1, y2: y1 + o } : { x1: x2 + o, y1: y2, x2: x1 + o, y2: y1 };
  return arrow({ ...go, color: colorGo, width }) + '\n  ' + arrow({ ...back, color: colorBack ?? colorGo, width });
};

// 番号だけの小さな丸いバッジ（順番を示す）
const badge = ({ cx, cy, n, color }) =>
  `<circle cx="${cx}" cy="${cy}" r="11" fill="${C[color].main}"/>\n  ${t(cx, cy + 5, n, { size: SIZE.note, bold: true, fill: '#ffffff' })}`;

// svg-art スキルの generate_icon.py で作ったアイコン（24x24）を、位置と大きさを指定して埋め込む。
// name は py -3 generate_icon.py --list にある名前。color は線の色
const { execSync } = require('child_process');
const ICON_SCRIPT = path.join(require('os').homedir(), '.agents', 'skills', 'svg-art', 'scripts', 'generate_icon.py');
const icon = ({ name, x, y, size = 24, color = '#1e293b', width = 2 }) => {
  const out = execSync(`py -3 "${ICON_SCRIPT}" --icon ${name}`, { encoding: 'utf8' });
  const shapes = out.split('\n').filter((l) => /<(path|circle|line|polyline|rect|polygon|ellipse)\b/.test(l))
    .map((l) => l.trim().replace(/ (fill|stroke|stroke-width|stroke-linecap|stroke-linejoin)="[^"]*"/g, ''));
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${shapes.join('')}</g>`;
};

// 図の下に置く、猫と吹き出し。y0 は猫を置き始める高さ（図の本体が終わる位置+16 が目安）
const foot = ({ W, y0, pose, lines }) => {
  const bx = 176, bw = W - 40 - bx, cx = bx + bw / 2, bt = y0 + 6, n = lines.length;
  const ty0 = bt + (92 - 26 * n) / 2 + 19, tailY = bt + 46;
  return `
  <g transform="translate(11.2 ${y0 - 218}) scale(0.6)">${catSVG(pose)}</g>
  <g filter="url(#shadow)"><rect x="${bx}" y="${bt}" width="${bw}" height="92" rx="18" fill="#ffffff" stroke="${LINE}" stroke-width="2"/></g>
  <path d="M${bx + 2} ${tailY - 16} L128 ${tailY} L${bx + 2} ${tailY + 14} z" fill="#ffffff" stroke="${LINE}" stroke-width="2" stroke-linejoin="round"/>
  <rect x="${bx - 1}" y="${tailY - 13}" width="6" height="25" fill="#ffffff"/>
${lines.map((s, k) => '  ' + t(cx, ty0 + k * 26, s, { size: SIZE.speech })).join('\n')}`;
};

// 図全体。body は図の本体、foot は foot() の結果。H は y0+122
const svg = ({ W = 900, y0, title, desc, body, footer }) => {
  const H = y0 + 122;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Segoe UI','Yu Gothic UI','Meiryo',sans-serif">
  <title>${esc(title)}</title>
  <desc>${esc(desc)}</desc>
  ${defs()}
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
${body}
${footer}
</svg>
`;
};

// 出力: docs/images/<name>.svg に書く。H を返す（PNG にするときの高さ）
const IMG = path.join(__dirname, '..', '..', 'docs', 'images');
const write = (name, s) => {
  fs.writeFileSync(path.join(IMG, name + '.svg'), s);
  const h = s.match(/ height="(\d+)"/)[1];
  console.log(`${name} 900x${h}`);
};

module.exports = { C, TEXT, SUB, LINE, SIZE, t, esc, defs, card, box, pill, arrow, biArrow, badge, icon, foot, svg, write, catSVG };
