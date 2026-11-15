// README の手順に付ける「画面の模擬図」を作るための共通部品。
// 既存の docs/images/eclipse-import.svg・vscode-terminal.svg・zip-download.svg と同じ見た目（枠付きの画面＋赤い強調）にそろえるため、
// 画面の枠・赤い強調の枠・矢印・番号付きの説明・ターミナルを1か所にまとめる。
// 図を作り直すには: node tools/svg/builds-readme/build-<図の名前>.js （docs/images/<図の名前>.svg を書き出す）
const fs = require('fs');
const path = require('path');

const IMG = path.join(__dirname, '..', '..', 'docs', 'images');
const RED = '#e53e3e';        // 強調の枠・矢印
const RED_TEXT = '#c53030';   // 明るい背景の上の赤い文字
const RED_TEXT_DK = '#fc8181'; // 暗い背景（ターミナルなど）の上の赤い文字
const FONT = "Meiryo, 'Yu Gothic', sans-serif";
const MONO = "Consolas, 'Courier New', monospace";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// 文字。opt: size(既定14。13未満にしない) / bold / fill / anchor / mono
const t = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-size="${o.size ?? 14}"${o.bold ? ' font-weight="bold"' : ''} fill="${o.fill ?? '#333'}"${o.anchor ? ` text-anchor="${o.anchor}"` : ''}${o.mono ? ` font-family="${MONO}"` : ''}>${esc(s)}</text>`;

// 明るい画面の枠。title があれば上に見出しを書く
const win = ({ x, y, w, h, title, fill = '#f7fafc', stroke = '#999' }) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
  (title ? `\n  ${t(x + 14, y + 28, title, { size: 15, bold: true, fill: '#222' })}` : '');

// 暗い画面（VSCode・ターミナル）の枠
const darkWin = ({ x, y, w, h }) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#1e1e1e" stroke="#555" stroke-width="2"/>`;

// 赤い強調の枠（押す場所・見る場所）
const hl = ({ x, y, w, h, fill = 'none' }) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="${RED}" stroke-width="2"/>`;

// 赤い矢印。(x1,y1) から (x2,y2) へ
const arrow = ({ x1, y1, x2, y2 }) =>
  `<path d="M${x1},${y1} L${x2},${y2}" stroke="${RED}" stroke-width="3" fill="none" marker-end="url(#r)"/>`;

// 番号付きの赤い説明。n は "1" など。dark=true で暗い背景用の明るい赤
const note = ({ x, y, n, text, dark = false, anchor }) =>
  t(x, y, n ? `${n}. ${text}` : text, { size: 15, bold: true, fill: dark ? RED_TEXT_DK : RED_TEXT, anchor });

// ボタン。hot=true で赤い強調の枠
const btn = ({ x, y, w, h = 30, label, hot = false, primary = false }) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${primary ? '#2da44e' : '#e2e8f0'}" stroke="${hot ? RED : '#999'}" stroke-width="${hot ? 2 : 1}"/>` +
  t(x + w / 2, y + h / 2 + 5, label, { fill: primary ? '#fff' : '#333', bold: primary, anchor: 'middle' });

// ターミナル（暗い箱の中に等幅の行を並べる）。lines: 文字列か { text, fill }
const terminal = ({ x, y, w, h, lines, title }) => {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#1e1e1e" stroke="#555" stroke-width="1.5"/>`;
  if (title) s += `\n  ${t(x + 14, y + 24, title, { size: 13, fill: '#ccc' })}\n  <line x1="${x}" y1="${y + 34}" x2="${x + w}" y2="${y + 34}" stroke="#555"/>`;
  const top = y + (title ? 58 : 28);
  lines.forEach((l, i) => {
    const o = typeof l === 'string' ? { text: l } : l;
    s += `\n  ${t(x + 14, top + i * 22, o.text, { size: 14, mono: true, fill: o.fill ?? '#e6e6e6' })}`;
  });
  return s;
};

// 図全体。マーカー（赤い矢じり）は、ここで必ず定義する
const svg = ({ W, H, title, desc, body }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">
  <title>${esc(title)}</title>
  <desc>${esc(desc)}</desc>
  <defs>
    <marker id="r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${RED}"/></marker>
  </defs>
  <rect width="${W}" height="${H}" fill="#ffffff"/>
${body}
</svg>
`;

const write = (name, s) => {
  fs.writeFileSync(path.join(IMG, name + '.svg'), s);
  console.log(`${name} ${s.match(/ width="(\d+)" height="(\d+)"/).slice(1).join('x')}`);
};

module.exports = { RED, RED_TEXT, RED_TEXT_DK, FONT, MONO, esc, t, win, darkWin, hl, arrow, note, btn, terminal, svg, write };
