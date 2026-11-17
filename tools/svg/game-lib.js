// 03章: ゲームのセーブのたとえ図を作るための共通部品。ゲームの小さな画面（ステージ・コイン・プレイヤー）と、
// 「ゲーム3コマ + Git の対応」を並べる配置をまとめる。使い方の見本は builds/build-03-05-game-load-discard.js。
const L = require('./rich-lib');
const { C, t, SIZE } = L;

// ゲームの小さな画面。stage=ステージ番号 / coins=コイン数 / pos=プレイヤーの位置(0〜1) / state: normal・fail(失敗)・dim(使えなくなる)
const gameScreen = ({ x, y, w = 190, h = 96, stage, coins, pos, state = 'normal', dashed = false }) => {
  const c = state === 'fail' ? C.red : C.yellow;
  const ground = y + h - 20;
  const px = x + 14 + pos * (w - 70);
  let s = `<g${state === 'dim' ? ' opacity="0.6"' : ''}>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fffdf2" stroke="${c.main}" stroke-width="2"${dashed ? ' stroke-dasharray="6,4"' : ''}/>`;
  s += `\n  ${t(x + 10, y + 22, `ステージ${stage}`, { size: SIZE.note, bold: true, fill: C.yellow.dark, anchor: 'start' })}`;
  s += `<circle cx="${x + w - 44}" cy="${y + 17}" r="7" fill="${C.yellow.main}" stroke="${C.yellow.dark}" stroke-width="1.5"/>`;
  s += t(x + w - 32, y + 22, `×${coins}`, { size: SIZE.note, bold: true, fill: C.yellow.dark, anchor: 'start' });
  s += `<rect x="${x + 8}" y="${ground}" width="${w - 16}" height="6" rx="3" fill="${C.yellow.main}"/>`;
  s += `<path d="M${x + w - 22} ${ground} V${ground - 30}" stroke="${C.yellow.dark}" stroke-width="2.5" stroke-linecap="round"/><path d="M${x + w - 22} ${ground - 30} l14 6 l-14 6 z" fill="${C.yellow.dark}"/>`;
  s += `<rect x="${px}" y="${ground - 22}" width="22" height="22" rx="6" fill="${C.yellow.main}" stroke="${C.yellow.dark}" stroke-width="2"/><circle cx="${px + 7}" cy="${ground - 13}" r="2.4" fill="#1e293b"/><circle cx="${px + 15}" cy="${ground - 13}" r="2.4" fill="#1e293b"/>`;
  if (state === 'fail') s += `\n  ${t(x + w / 2, y + 48, '失敗!', { size: SIZE.body, bold: true, fill: C.red.dark })}`;
  if (state === 'dim') s += `<path d="M${x + 62} ${y + 32} L${x + w - 62} ${y + h - 28} M${x + w - 62} ${y + 32} L${x + 62} ${y + h - 28}" stroke="${C.red.main}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>`;
  return s + '</g>';
};

// ゲームの3コマと、Git の3つの対応を、縦に並べて見せる。
// cols[i]: { title, color(カードの色), screen(gameScreen の引数), l1, l2(ゲーム側の説明), git:[1行目,2行目], gitColor }
// links[i]: 1コマ目→2コマ目などの矢印の上に書く言葉
const threeCols = ({ title, cols, links }) => {
  const X = [40, 340, 640], W = 220, Y = 62;
  let body = `\n  ${t(450, 38, title, { size: SIZE.title, bold: true })}`;
  cols.forEach((c, i) => {
    const x = X[i], col = C[c.color];
    body += `\n${L.card({ x, y: Y, w: W, h: 214, color: c.color, title: c.title })}`;
    body += `\n  <circle cx="${x + 22}" cy="${Y + 23}" r="11" fill="#ffffff" stroke="${col.main}" stroke-width="2"/>\n  ${t(x + 22, Y + 28, String(i + 1), { size: SIZE.note, bold: true, fill: col.dark })}`;
    body += `\n  ${gameScreen({ x: x + 15, y: Y + 56, ...c.screen })}`;
    body += `\n  ${t(x + W / 2, Y + 182, c.l1, { fill: col.dark })}\n  ${t(x + W / 2, Y + 204, c.l2, { fill: col.dark })}`;
    body += `\n  ${L.arrow({ x1: x + W / 2, y1: 282, x2: x + W / 2, y2: 318, color: 'gray', width: 4 })}`;
    body += `\n  ${t(x + W / 2 + 10, 306, 'Git では', { size: SIZE.note, anchor: 'start', fill: C.gray.dark })}`;
    const g = C[c.gitColor ?? 'gray'];
    body += `\n  ${L.box({ x, y: 324, w: W, h: 70, color: c.gitColor ?? 'gray' })}`;
    body += `\n  ${t(x + W / 2, 351, c.git[0], { bold: true, fill: g.dark })}\n  ${t(x + W / 2, 374, c.git[1], { bold: true, fill: g.dark })}`;
    if (i < cols.length - 1) {
      body += `\n  ${L.arrow({ x1: x + W + 4, y1: 170, x2: X[i + 1] - 4, y2: 170, color: 'gray', width: 4 })}`;
      body += `\n  ${t(x + W + 40, 154, links[i], { size: SIZE.note, bold: true, fill: C.gray.dark })}`;
    }
  });
  return body;
};

const Y0 = 410;
const make = ({ name, title, desc, body, pose, lines }) =>
  L.write(name, L.svg({ y0: Y0, title, desc, body, footer: L.foot({ W: 900, y0: Y0, pose, lines }) }));

module.exports = { gameScreen, threeCols, make };
