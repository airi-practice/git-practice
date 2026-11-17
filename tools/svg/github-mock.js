// GitHub の Web 画面の模擬図に共通する部品（ブラウザーの枠・上の帯・タブ・ボタン・アイコン・サイドバー）。
// 画面内の文字は、実際の GitHub の英語の表示にそろえる。ラベルのないボタンは置かない（アイコンは、実際の画面にある形だけを使う）。
// 使う側: tools/svg/builds-readme/build-github-screens.js, build-github-account.js
const S = require('./shot-lib');
const { t, svg, write } = S;

const G = { text: '#1f2328', sub: '#59636e', line: '#d0d7de', link: '#0969da', green: '#1f883d', open: '#1a7f37', merged: '#8250df', head: '#f6f8fa', tab: '#fd8c73', red: '#cf222e' };
const W = 900;
const tw = (s, size, mono) => [...s].reduce((a, c) => a + (c.charCodeAt(0) > 255 ? size : size * (mono ? 0.6 : 0.54)), 0);
const gt = (x, y, s, o = {}) => t(x, y, s, { size: 14, fill: G.text, ...o });
const cw = (s) => Math.round(tw(s, 13) * 0.95 + 20);          // 青い小さな札（ブランチ名）の幅
const bw = (s) => Math.round(tw(s, 14) * 1.12 + 42);          // 右に「v」が付くボタンの幅
const bar = (x, y, w, h, fill = '#fff', stroke = G.line, r = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const caret = (x, y, c = '#555') => `<path d="M${x},${y} l5,5 l5,-5" stroke="${c}" stroke-width="1.6" fill="none"/>`;
const line = (x1, y1, x2, y2, c = G.line) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}"/>`;

// ボタン。primary=緑、それ以外は灰。caret=true で右に「v」
const btn = (x, y, w, label, o = {}) => {
  const h = o.h ?? 32, prim = o.primary !== false;
  const fg = prim ? '#ffffff' : G.text;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${prim ? G.green : G.head}" stroke="${prim ? '#1b7f37' : G.line}"/>` +
    gt(x + (o.caret ? (w - 22) / 2 : w / 2), y + h / 2 + 5, label, { bold: true, fill: fg, anchor: 'middle', size: o.size ?? 14 }) +
    (o.caret ? caret(x + w - 20, y + h / 2 - 2, fg) : '');
};
const chip = (x, y, s) => `<rect x="${x}" y="${y}" width="${cw(s)}" height="26" rx="13" fill="#ddf4ff"/>${t(x + cw(s) / 2, y + 18, s, { size: 13, mono: 1, fill: G.link, anchor: 'middle' })}`;
const avatar = (cx, cy, r, label, fill = '#8250df') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>${t(cx, cy + 5, label, { size: 13, bold: true, fill: '#fff', anchor: 'middle' })}`;

// ---- アイコン（実際の画面にある形） ----
const icon = {
  hamburger: (x, y) => `<path d="M${x},${y} h18 M${x},${y + 6} h18 M${x},${y + 12} h18" stroke="#444" stroke-width="2" stroke-linecap="round"/>`,
  magnifier: (x, y) => `<circle cx="${x + 6}" cy="${y + 6}" r="5.5" fill="none" stroke="#666" stroke-width="1.8"/><path d="M${x + 10.5},${y + 10.5} l4.5,4.5" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
  plus: (x, y) => `<path d="M${x},${y + 7} h14 M${x + 7},${y} v14" stroke="#444" stroke-width="2" stroke-linecap="round"/>`,
  issue: (x, y) => `<circle cx="${x + 8}" cy="${y + 8}" r="7" fill="none" stroke="#444" stroke-width="1.8"/><circle cx="${x + 8}" cy="${y + 8}" r="1.8" fill="#444"/>`,
  pr: (x, y, c = '#444') => `<circle cx="${x + 3}" cy="${y + 3}" r="2.6" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="${x + 3}" cy="${y + 13}" r="2.6" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="${x + 13}" cy="${y + 13}" r="2.6" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M${x + 3},${y + 5.6} v4.8 M${x + 13},${y + 10.4} v-4 a3,3 0 0 0 -3,-3 h-3" fill="none" stroke="${c}" stroke-width="1.8"/>`,
  inbox: (x, y) => `<path d="M${x},${y + 9} l3,-7 h10 l3,7 v6 h-16 z M${x},${y + 9} h5 a3,3 0 0 0 6,0 h5" fill="none" stroke="#444" stroke-width="1.8" stroke-linejoin="round"/>`,
  star: (x, y, c = '#444') => `<path d="M${x + 7},${y} l2.1,4.6 l5,0.6 l-3.7,3.4 l1,5 l-4.4,-2.5 l-4.4,2.5 l1,-5 l-3.7,-3.4 l5,-0.6 z" fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>`,
  eye: (x, y) => `<path d="M${x},${y + 6} q7,-8 14,0 q-7,8 -14,0 z" fill="none" stroke="#444" stroke-width="1.6"/><circle cx="${x + 7}" cy="${y + 6}" r="2" fill="#444"/>`,
  fork: (x, y) => `<circle cx="${x + 3}" cy="${y + 2.6}" r="2.4" fill="none" stroke="#444" stroke-width="1.6"/><circle cx="${x + 11}" cy="${y + 2.6}" r="2.4" fill="none" stroke="#444" stroke-width="1.6"/><circle cx="${x + 7}" cy="${y + 13}" r="2.4" fill="none" stroke="#444" stroke-width="1.6"/><path d="M${x + 3},${y + 5} v1.5 a2,2 0 0 0 2,2 h4 a2,2 0 0 0 2,-2 v-1.5 M${x + 7},${y + 8.5} v2" fill="none" stroke="#444" stroke-width="1.6"/>`,
  branch: (x, y, c = '#444') => `<circle cx="${x + 3}" cy="${y + 3}" r="2.6" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="${x + 3}" cy="${y + 13}" r="2.6" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="${x + 12}" cy="${y + 5}" r="2.6" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M${x + 3},${y + 5.6} v4.8 M${x + 12},${y + 7.6} a4,4 0 0 1 -4,4 h-2.4" fill="none" stroke="${c}" stroke-width="1.8"/>`,
  code: (x, y, c = '#fff') => `<path d="M${x + 5},${y} l-5,5.5 l5,5.5 M${x + 11},${y} l5,5.5 l-5,5.5" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  repo: (x, y) => `<path d="M${x + 2},${y + 2} a2,2 0 0 1 2,-2 h9 v12 h-9 a2,2 0 0 0 -2,2 z M${x + 2},${y + 14} a2,2 0 0 0 2,2 h9" fill="none" stroke="#59636e" stroke-width="1.5"/>`,
  folder: (x, y) => `<path d="M${x},${y + 2} a2,2 0 0 1 2,-2 h4 l2,2.5 h6 a2,2 0 0 1 2,2 v8 a2,2 0 0 1 -2,2 h-12 a2,2 0 0 1 -2,-2 z" fill="#54aeff"/>`,
  file: (x, y) => `<path d="M${x + 2},${y} h7 l4,4 v11 a1,1 0 0 1 -1,1 h-10 a1,1 0 0 1 -1,-1 v-14 a1,1 0 0 1 1,-1 z M${x + 9},${y} v4 h4" fill="none" stroke="#59636e" stroke-width="1.5"/>`,
  gear: (x, y) => `<circle cx="${x + 7}" cy="${y + 7}" r="3" fill="none" stroke="#59636e" stroke-width="1.6"/><path d="M${x + 7},${y} v2.5 M${x + 7},${y + 11.5} v2.5 M${x},${y + 7} h2.5 M${x + 11.5},${y + 7} h2.5 M${x + 2},${y + 2} l1.8,1.8 M${x + 10.2},${y + 10.2} l1.8,1.8 M${x + 12},${y + 2} l-1.8,1.8 M${x + 3.8},${y + 10.2} l-1.8,1.8" stroke="#59636e" stroke-width="1.6" stroke-linecap="round"/>`,
};
// GitHub のロゴ（黒い丸に、猫の顔の白い形）
const logo = (cx, cy, r, bg = G.text, fg = '#ffffff') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${bg}"/><path d="M${cx - r * 0.55},${cy - r * 0.1} q0,-${r * 0.6} ${r * 0.55},-${r * 0.6} q${r * 0.55},0 ${r * 0.55},${r * 0.6} q0,${r * 0.55} -${r * 0.55},${r * 0.55} q-${r * 0.55},0 -${r * 0.55},-${r * 0.55} z M${cx - r * 0.55},${cy - r * 0.2} l${r * 0.1},-${r * 0.6} l${r * 0.4},${r * 0.3} z M${cx + r * 0.55},${cy - r * 0.2} l-${r * 0.1},-${r * 0.6} l-${r * 0.4},${r * 0.3} z" fill="${fg}"/>`;

// ---- ブラウザーの枠 ----
const frame = (H, url, bg = '#ffffff') => `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="${bg}" stroke="#999"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="44" fill="#dfe3e8" stroke="#999"/>
  <circle cx="20" cy="22" r="6" fill="#ef5350"/><circle cx="40" cy="22" r="6" fill="#ffb300"/><circle cx="60" cy="22" r="6" fill="#43a047"/>
  <rect x="86" y="7" width="${W - 110}" height="30" rx="15" fill="#ffffff" stroke="#c4c7cc"/>${t(106, 27, url, { size: 14, fill: '#333' })}`;

// サインイン後の、上の帯。crumb: 帯の左に出す文字（[所有者, リポジトリ名] か 文字列）
const appHeader = (crumb) => {
  let s = `<rect x="1" y="45" width="${W - 2}" height="56" fill="${G.head}"/>${line(1, 101, W - 1, 101)}`;
  s += `${bar(14, 57, 34, 32, '#fff')}${icon.hamburger(22, 67)}${logo(76, 73, 16)}`;
  if (Array.isArray(crumb)) s += `${gt(104, 79, crumb[0], { fill: G.link })}${gt(104 + tw(crumb[0], 14) + 8, 79, '/', { fill: G.sub })}${gt(104 + tw(crumb[0], 14) + 24, 79, crumb[1], { bold: true })}`;
  else if (crumb) s += gt(104, 79, crumb, { bold: true });
  s += `${bar(420, 58, 220, 30)}${icon.magnifier(430, 66)}${gt(456, 78, 'Type / to search', { size: 13, fill: G.sub })}`;
  s += `${bar(656, 58, 54, 30)}${icon.plus(664, 66)}${caret(688, 71)}${bar(718, 58, 34, 30)}${icon.issue(727, 65)}${bar(758, 58, 34, 30)}${icon.pr(767, 65)}${bar(798, 58, 34, 30)}${icon.inbox(806, 65)}${avatar(862, 73, 14, 'ks')}`;
  return s;
};

// ---- リポジトリのページの部品 ----
const repoTitle = (y) => {
  const bx = 40 + 24;
  let s = `${icon.repo(40, y - 16)}${gt(bx, y, 'your-org', { size: 20, fill: G.link })}${gt(bx + tw('your-org', 20) + 8, y, '/', { size: 20, fill: G.sub })}${gt(bx + tw('your-org', 20) + 26, y, 'git-practice-exercise', { size: 20, bold: true, fill: G.link })}`;
  const px = bx + tw('your-org', 20) + 26 + tw('git-practice-exercise', 20) + 14;
  s += `<rect x="${px}" y="${y - 19}" width="52" height="24" rx="12" fill="#fff" stroke="${G.line}"/>${gt(px + 26, y - 2, 'Public', { size: 13, fill: G.sub, anchor: 'middle' })}`;
  // 右の Watch / Fork / Star
  s += `${bar(588, y - 22, 92, 30, G.head)}${icon.eye(596, y - 14)}${gt(618, y - 2, 'Watch', { size: 13, bold: true })}${caret(660, y - 10)}`;
  s += `${bar(688, y - 22, 80, 30, G.head)}${icon.fork(696, y - 14)}${gt(716, y - 2, 'Fork', { size: 13, bold: true })}${caret(748, y - 10)}`;
  s += `${bar(776, y - 22, 84, 30, G.head)}${icon.star(784, y - 15)}${gt(806, y - 2, 'Star', { size: 13, bold: true })}${gt(844, y - 2, '0', { size: 13, fill: G.sub })}`;
  return s;
};
// タブの行。items: [ラベル, 左端x, 幅, 有効か]
const tabsRow = (y, items) => {
  let s = line(1, y + 12, W - 1, y + 12);
  items.forEach(([label, x, w, on]) => {
    s += gt(x, y, label, { bold: on });
    if (on) s += `<rect x="${x - 6}" y="${y + 9}" width="${w}" height="3" rx="1.5" fill="${G.tab}"/>`;
  });
  return s;
};
const repoTabs = (y, active) => tabsRow(y, [['Code', 40, 52, active === 'code'], ['Issues', 112, 60, false], ['Pull requests', 192, 112, active === 'pulls'], ['Actions', 324, 64, false], ['Projects', 408, 70, false], ['Wiki', 498, 44, false], ['Security', 562, 66, false], ['Insights', 648, 62, false], ['Settings', 730, 70, false]]);

// ---- PR のページの部品 ----
const prHead = (y, title, num, state, base, compare) => {
  const col = state === 'Merged' ? G.merged : G.open;
  let s = `${gt(40, y, title, { size: 24 })}${gt(40 + tw(title, 24) + 14, y, '#' + num, { size: 24, fill: G.sub })}`;
  const bwid = state === 'Merged' ? 84 : 70;
  s += `<rect x="40" y="${y + 18}" width="${bwid}" height="30" rx="15" fill="${col}"/>${gt(40 + bwid / 2, y + 38, state, { bold: true, fill: '#fff', anchor: 'middle' })}`;
  const x0 = 40 + bwid + 14;
  const sent = state === 'Merged' ? 'ks merged 1 commit into' : 'ks wants to merge 1 commit into';
  const bx = x0 + Math.round(tw(sent, 14)) + 8, cx0 = bx + cw(base) + 12 + 44;
  s += gt(x0, y + 38, sent) + chip(bx, y + 22, base) + gt(bx + cw(base) + 8, y + 38, 'from') + chip(cx0, y + 22, compare);
  return { svg: s, base: { x: bx, y: y + 22, w: cw(base), h: 26 }, compare: { x: cx0, y: y + 22, w: cw(compare), h: 26 }, badge: { x: 40, y: y + 18, w: bwid, h: 30 } };
};
const prTabs = (y, active, count = '1') => tabsRow(y, [['Conversation', 40, 100, active === 'conv'], ['Commits', 166, 70, false], ['Checks', 262, 60, false], ['Files changed', 348, 110, active === 'files']]) +
  `<rect x="470" y="${y - 15}" width="24" height="20" rx="10" fill="#d1d9e0"/>${gt(482, y, count, { size: 13, anchor: 'middle' })}`;
// 会話の1つ分の箱（アイコン付き）。lines は本文の行
const comment = (y, who, lines, o = {}) => {
  const h = 46 + lines.length * 24;
  let s = avatar(58, y + 20, 18, 'ks');
  s += `${bar(88, y, 532, h)}<path d="M89,${y + 36} v-26 a5,5 0 0 1 5,-5 h520 a5,5 0 0 1 5,5 v26 z" fill="${G.head}" stroke="none"/>${line(89, y + 36, 619, y + 36)}`;
  s += `${gt(102, y + 24, who, { fill: G.sub })}`;
  if (o.author !== false) s += `${bar(520, y + 8, 56, 22, '#fff', G.line, 11)}${gt(548, y + 24, 'Author', { size: 12, fill: G.sub, anchor: 'middle' })}`;
  lines.forEach((l, i) => { s += gt(102, y + 62 + i * 24, l); });
  return { svg: s, h };
};
// 右側のサイドバー
const sidebar = (x, y) => {
  let s = '';
  [['Reviewers', 'No reviews'], ['Assignees', 'No one—assign yourself'], ['Labels', 'None yet'], ['Projects', 'None yet'], ['Milestone', 'No milestone']].forEach(([a, b], i) => {
    const yy = y + i * 64;
    s += `${gt(x, yy + 14, a, { size: 13, bold: true, fill: G.sub })}${icon.gear(x + 190, yy + 2)}${gt(x, yy + 38, b, { size: 13, fill: G.sub })}${line(x, yy + 54, x + 210, yy + 54)}`;
  });
  return s;
};

// 本文の手順と同じ番号の赤い枠を重ね、画面の下に番号付きの説明を並べる
const outA = (name, H, title, desc, body, items) => {
  let b = body;
  items.forEach((it) => {
    b += `\n  ${S.hl(it)}<circle cx="${it.bx ?? it.x}" cy="${it.by ?? it.y}" r="11" fill="${S.RED}"/>${t(it.bx ?? it.x, (it.by ?? it.y) + 5, String(it.n), { size: 13, bold: true, fill: '#fff', anchor: 'middle' })}`;
  });
  const LH = items.length * 26 + 22;
  b += `\n  <rect x="0.5" y="${H}" width="${W - 1}" height="${LH}" fill="#fff5f5" stroke="#e5b5b5"/>`;
  items.forEach((it, i) => { b += `\n  ${S.note({ x: 14, y: H + 30 + i * 26, n: it.n, text: it.text })}`; });
  write(name, svg({ W, H: H + LH, title, desc, body: `  ${b}` }));
};

module.exports = { S, G, W, tw, gt, cw, bw, bar, caret, line, btn, chip, avatar, icon, logo, frame, appHeader, repoTitle, tabsRow, repoTabs, prHead, prTabs, comment, sidebar, outA };
