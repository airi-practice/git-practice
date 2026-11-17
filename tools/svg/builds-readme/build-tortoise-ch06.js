// 06章（複数人での変更共有）の手順で使う TortoiseGit の画面を、模擬図として書き出す。本文のメニュー名・項目名（英語の表記）に合わせている。
// 画面の部品は build-tortoise-screens.js と同じ作り（そちらは変更しないので、必要な部品をここに写している）。
// 作り直すには: node tools/svg/builds-readme/build-tortoise-ch06.js （docs/images/tortoise-23〜24 を書き出す）
const S = require('../shot-lib');
const { t, svg, write } = S;

const BG = '#f0f0f0', LINE = '#a0a0a0', TXT = '#1a1a1a', DIS = '#8a8a8a', BLUE = '#0b57d0', ACC = '#0067c0';
const tx = (x, y, s, o = {}) => t(x, y, s, { size: 13, fill: TXT, ...o });

// ダイアログの枠（タイトルバー付き）。buttons は右下の閉じる・最大化を出すか
const dlg = (W, H, title, { max = false } = {}) => {
  let s = `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="${BG}" stroke="#707070"/>`;
  s += `\n  <rect x="1" y="1" width="${W - 2}" height="30" fill="#ffffff"/>`;
  s += `\n  <circle cx="14" cy="16" r="6" fill="#7a8ca5"/>`;
  s += `\n  ${tx(W / 2, 21, title, { anchor: 'middle' })}`;
  const cx = W - 22;
  s += `\n  <path d="M${cx - 5},11 L${cx + 5},21 M${cx + 5},11 L${cx - 5},21" stroke="#222" stroke-width="1.2"/>`;
  if (max) {
    s += `\n  <rect x="${cx - 42}" y="11" width="10" height="10" fill="none" stroke="#222" stroke-width="1.2"/>`;
    s += `\n  <path d="M${cx - 84},16 h10" stroke="#222" stroke-width="1.2"/>`;
  }
  return s;
};
const group = (x, y, w, h, label) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#d5d5d5"/>\n  <rect x="${x + 6}" y="${y - 8}" width="${label.length * 13 + 6}" height="16" fill="${BG}"/>\n  ${tx(x + 9, y + 5, label)}`;
const chk = (x, y, label, o = {}) => {
  const c = o.dis ? '#bbb' : '#444';
  let s = `<rect x="${x}" y="${y - 12}" width="14" height="14" rx="2" fill="${o.on || o.mixed ? ACC : '#fff'}" stroke="${o.on || o.mixed ? ACC : c}"/>`;
  if (o.on) s += `<path d="M${x + 3},${y - 5} l3,3 l5,-6" stroke="#fff" stroke-width="2" fill="none"/>`;
  if (o.mixed) s += `<path d="M${x + 3},${y - 5} h8" stroke="#fff" stroke-width="2"/>`;
  return s + (label ? tx(x + 22, y, label, { fill: o.dis ? DIS : TXT, bold: o.bold }) : '');
};
const radio = (x, y, label, o = {}) => {
  const c = o.dis ? '#bbb' : '#444';
  return `<circle cx="${x + 7}" cy="${y - 5}" r="7" fill="#fff" stroke="${o.on ? ACC : c}"/>` +
    (o.on ? `<circle cx="${x + 7}" cy="${y - 5}" r="4.5" fill="${ACC}"/>` : '') +
    tx(x + 22, y, label, { fill: o.dis ? DIS : TXT });
};
const combo = (x, y, w, text, o = {}) => {
  const h = 26;
  const c = o.dis ? '#d0d0d0' : '#8a8a8a';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${o.dis ? '#f4f4f4' : '#fff'}" stroke="${c}"/>` +
    (o.focus ? `<path d="M${x},${y + h} h${w}" stroke="${ACC}" stroke-width="2"/>` : '') +
    (text ? tx(x + 8, y + 18, text, { fill: o.dis ? DIS : TXT }) : '') +
    (o.arrow === false ? '' : `<path d="M${x + w - 18},${y + 10} l5,5 l5,-5" stroke="${o.dis ? '#bbb' : '#555'}" stroke-width="1.4" fill="none"/>`);
};
const btn = (x, y, w, label, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="26" rx="3" fill="${o.dis ? '#f4f4f4' : '#fdfdfd'}" stroke="${o.def ? ACC : o.dis ? '#d0d0d0' : '#adadad'}" stroke-width="${o.def ? 2 : 1}"/>` +
  tx(x + w / 2, y + 18, label, { anchor: 'middle', fill: o.dis ? DIS : TXT });
const field = (x, y, w, h = 26, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#8a8a8a"/>` + (o.focus ? `<path d="M${x},${y + h} h${w}" stroke="${ACC}" stroke-width="2"/>` : '');

const out = (name, W, H, title, desc, body) => write(name, svg({ W, H, title, desc, body: `  ${body}` }));
// 本文の手順と同じ番号の赤い枠を重ね、画面の下に番号付きの説明を並べる。items: { n, x, y, w, h, text }
const outA = (name, W, H, title, desc, body, items) => {
  const W2 = Math.max(W, 480);
  let b = body;
  items.forEach((it) => {
    b += `\n  ${S.hl(it)}<circle cx="${it.bx ?? it.x}" cy="${it.by ?? it.y}" r="11" fill="${S.RED}"/>${t(it.bx ?? it.x, (it.by ?? it.y) + 5, String(it.n), { size: 13, bold: true, fill: '#fff', anchor: 'middle' })}`;
  });
  const LH = items.length * 26 + 22;
  b += `\n  <rect x="0.5" y="${H}" width="${W2 - 1}" height="${LH}" fill="#fff5f5" stroke="#e5b5b5"/>`;
  items.forEach((it, i) => { b += `\n  ${S.note({ x: 14, y: H + 30 + i * 26, n: it.n, text: it.text })}`; });
  out(name, W2, H + LH, title, desc, b);
};

// ---- 手順1: 共有の置き場所を作る（Create repository here...） ----
{
  const W = 420, H = 190;
  let b = dlg(W, H, 'Create Repository - TortoiseGit');
  b += `\n  ${chk(24, 82, 'Make it Bare', { on: 1 })}${tx(150, 82, '(記録だけの置き場所にする)')}`;
  b += `\n  ${btn(138, 140, 88, 'OK', { def: 1 })}${btn(236, 140, 88, 'Cancel')}${btn(334, 140, 78, 'Help')}`;
  outA('tortoise-23-create-repo-bare', W, H, 'TortoiseGit のリポジトリ作成画面（共有の置き場所）',
    'TortoiseGit の「Create repository here...」で出る画面。Make it Bare（記録だけの置き場所にする）にチェックを入れて、OK を押す。', b, [
      { n: 1, x: 18, y: 64, w: 126, h: 24, text: 'Make it Bare(記録だけの置き場所にする)にチェックを入れる' },
      { n: 2, x: 138, y: 140, w: 88, h: 26, text: 'OK を押す' },
    ]);
}

// ---- 手順3: 共有の置き場所から複製を作る（Git Clone...） ----
{
  const W = 560, H = 424;
  let b = dlg(W, H, 'Clone - TortoiseGit');
  b += `\n  ${group(8, 46, 544, 142, 'Repository')}`;
  b += `\n  ${tx(20, 86, 'URL:')}${combo(120, 68, 366, 'C:\\...\\sample-shared')}${btn(498, 68, 44, '...')}`;
  b += `\n  ${tx(20, 142, 'Directory:')}${combo(120, 124, 366, 'C:\\...\\sample-project-friend')}${btn(498, 124, 44, '...')}`;
  b += `\n  ${group(8, 204, 544, 118, 'Options')}`;
  b += `\n  ${chk(20, 238, 'Load Putty Key', { dis: 1 })}${chk(290, 238, 'Recursive')}`;
  b += `\n  ${chk(20, 268, 'Clone into Bare Repo')}${chk(290, 268, 'No Checkout')}`;
  b += `\n  ${chk(20, 298, 'Branch')}${chk(290, 298, 'Depth')}`;
  b += `\n  ${btn(277, 380, 88, 'OK', { def: 1 })}${btn(372, 380, 88, 'Cancel')}${btn(468, 380, 82, 'Help')}`;
  outA('tortoise-24-clone-shared', W, H, 'TortoiseGit のクローン画面（共有の置き場所から複製する）',
    'TortoiseGit の「Git Clone...」で出る画面。URL（複製元の場所）に sample-shared フォルダの場所を入れ、Directory（複製先）に sample-project-friend の場所を入れて、OK を押す。', b, [
      { n: 1, x: 120, y: 68, w: 366, h: 26, text: 'URL(複製元)に、sample-shared フォルダの場所を入れる' },
      { n: 2, x: 120, y: 124, w: 366, h: 26, text: 'Directory(複製先)に、sample-project-friend を指定する' },
      { n: 3, x: 277, y: 380, w: 88, h: 26, text: 'OK を押す' },
    ]);
}
