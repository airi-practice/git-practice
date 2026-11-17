// TortoiseGit の実際の画面（右クリックメニュー・各ダイアログ）を、クリーンな模擬図として書き出す。
// 元の画像: .claude/.log/TortoiseGit_*.png （赤い強調や番号は付けない。README に入れるときに必要なら足す）
// 作り直すには: node tools/svg/builds-readme/build-tortoise-screens.js （docs/images/tortoise-*.svg を書き出す）
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

// ---- 右クリックメニュー ----
// items: { s, ic(アイコン色), dis, sub, key } か '-'（区切り線）
const menu = (W, items, opts = {}) => {
  const RH = opts.rh ?? 24;
  let y = 6, s = '';
  const rows = [], pos = {};
  for (const it of items) {
    if (it === '-') { rows.push(`<path d="M12,${y + 4.5} H${W - 12}" stroke="#d8d8d8"/>`); y += 9; continue; }
    pos[it.s] = y;
    if (it.ic) rows.push(`<rect x="14" y="${y + 4}" width="15" height="15" rx="3" fill="${it.ic}"/>`);
    rows.push(tx(opts.tx ?? 42, y + 17, it.s, { size: 14, fill: it.dis ? '#aaa' : TXT, bold: it.bold }));
    if (it.sub) rows.push(`<path d="M${W - 20},${y + 8} l5,4 l-5,4" stroke="#444" stroke-width="1.4" fill="none"/>`);
    y += RH;
  }
  const H = y + 6;
  s = `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="8" fill="#f9f9f9" stroke="#b8b8b8"/>\n  ` + rows.join('\n  ');
  return { H, body: s, pos };
};
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
// marks: [{ s: 強調するメニュー項目の文字, text }]
const wrapMenu = (name, W, items, title, desc, opts = {}) => {
  const m = menu(W, items, opts);
  const marks = (opts.marks ?? []).map((k, i) => ({ n: i + 1, x: 4, y: m.pos[k.s], bx: W + 18, by: m.pos[k.s] + (opts.rh ?? 24) / 2, w: W - 8, h: opts.rh ?? 24, text: k.text }));
  outA(name, W, m.H, title, desc, m.body, marks);
};

wrapMenu('tortoise-01-menu-folder-background', 265, [
  { s: '表示(V)', sub: 1 }, { s: '並べ替え(O)', sub: 1 }, { s: '最新の情報に更新(E)' }, '-',
  { s: '貼り付け(P)', dis: 1 }, { s: 'ターミナルで開く(T)', ic: '#444' },
  { s: 'Open Git GUI here', ic: '#e8793a' },
  { s: 'Open Git Bash here', ic: '#e8793a' }, '-',
  { s: 'Git クローン(複製)...', ic: '#d9a21b' }, { s: 'Git ここにリポジトリを作成(Y)...', ic: '#e0a33a' }, { s: 'TortoiseGit', ic: '#6c8bb8', sub: 1 }, '-',
  { s: '新規作成(W)', sub: 1 }, '-', { s: 'ディスプレイ設定(D)', ic: '#3a8ad6' }, { s: '個人用設定(R)', ic: '#3a8ad6' },
], 'フォルダーの空白部分を右クリックしたメニュー',
 'エクスプローラーでフォルダーの何もない所を右クリックしたときのメニュー。「Git クローン(複製)...」「Git ここにリポジトリを作成(Y)...」「TortoiseGit」が並ぶ。',
 { marks: [
   { s: 'Git クローン(複製)...', text: '複製する(Clone)。06章で使う' },
   { s: 'Git ここにリポジトリを作成(Y)...', text: 'リポジトリを作る(Create repository here)' },
   { s: 'TortoiseGit', text: 'Push・Log などは、この中' },
 ] });

wrapMenu('tortoise-02-menu-folder', 300, [
  { s: '開く(O)', bold: 1 }, { s: '新しいタブで開く(B)' }, { s: '新しいウィンドウで開く(E)' }, { s: 'クイック アクセスにピン留めする(Q)' },
  
  { s: 'ターミナルで開く(T)', ic: '#444' }, 
  { s: 'Open Git GUI here', ic: '#e8793a' }, { s: 'Open Git Bash here', ic: '#e8793a' },
  
  { s: 'Microsoft Defender でスキャンする...', ic: '#2a6fc9' }, '-',
  { s: 'アクセスを許可する(G)', sub: 1 }, '-',
  { s: 'Git 同期(N)...', ic: '#d9a21b' }, { s: 'Git コミット(C) -> "main"...', ic: '#3a9a4a' }, { s: 'TortoiseGit', ic: '#6c8bb8', sub: 1 }, '-',
  { s: '以前のバージョンの復元(V)' }, { s: 'ライブラリに追加(I)', sub: 1 }, { s: 'スタート にピン留めする(P)' }, { s: 'パスのコピー(A)' }, '-',
  { s: '送る(N)', sub: 1 }, '-', { s: '切り取り(T)' }, { s: 'コピー(C)' }, '-', { s: 'ショートカットの作成(S)' }, { s: '削除(D)' }, { s: '名前の変更(M)' }, '-', { s: 'プロパティ(R)' },
], 'フォルダーを右クリックしたメニュー（Git のフォルダー）',
 'Git で管理しているフォルダーを右クリックしたときのメニュー。「Git コミット(C) -> "main"...」と「TortoiseGit」が出る。',
 { marks: [
   { s: 'Git コミット(C) -> "main"...', text: '記録する(Commit)。いまのブランチ名が出る' },
   { s: 'TortoiseGit', text: 'ログ・ブランチなどは、この中' },
 ] });

wrapMenu('tortoise-03-menu-tortoisegit', 250, [
  { s: 'プル(P)...', ic: '#2e9a3a' }, { s: 'フェッチ(E)...', ic: '#3aa04a' }, { s: 'プッシュ(H)...', ic: '#4aa83a' }, '-',
  { s: '差分(D)', ic: '#c9a22b' }, { s: '前のバージョンとの差分(D)', ic: '#c9a22b' }, '-',
  { s: 'ログを表示(L)', ic: '#333' }, { s: 'RefLogを表示(R)', ic: '#333' }, { s: 'refブラウザ', ic: '#c9a22b' }, { s: 'バックグラウンド稼働', ic: '#2a7ad6' },
  { s: 'リビジョングラフ(G)', ic: '#445' }, { s: 'リポジトリブラウザー(R)', ic: '#d9a21b' }, { s: '変更をチェック(F)', ic: '#8a6d3b' },
  { s: 'リベース(ブランチの付け替え)...', ic: '#e8793a' }, { s: 'スタッシュへ変更を隠す', ic: '#2a8ad6' }, '-',
  { s: '二分探索開始', ic: '#d33' }, '-',
  { s: '解決する(O)...', ic: '#5a9a2a' }, { s: '変更の取り消し(V)...', ic: '#3a5fc9' }, { s: 'クリーンアップ(C)...', ic: '#c9822b' }, '-',
  { s: '切り替え/チェックアウト(W)...', ic: '#3a9a4a' }, { s: 'マージ(M)...', ic: '#c9822b' }, { s: 'ブランチを作成(B)...', ic: '#e8793a' },
  { s: 'タグを作成(T)...', ic: '#f2c200' }, { s: 'エクスポート(X)...', ic: '#6a8a4a' }, '-',
  { s: '追加(A) ...', ic: '#2a6ad6' }, '-', { s: 'Worktrees', ic: '#e8793a' }, { s: 'サブモジュールの追加...', ic: '#2a6ad6' }, '-',
  { s: 'パッチを作成...', ic: '#6ac96a' }, { s: 'パッチを適用...', ic: '#8a9ad6' }, '-',
  { s: '設定(S)', ic: '#c9822b' }, { s: 'ヘルプ(H)', ic: '#555' }, { s: 'TortoiseGit について(B)', ic: '#2a6ad6' },
], 'TortoiseGit のサブメニュー',
 '右クリックメニューの「TortoiseGit」の中。プル、フェッチ、プッシュ、ログを表示、変更の取り消し、切り替え/チェックアウト、ブランチを作成などが並ぶ。', { tx: 38, marks: [
  { s: 'ログを表示(L)', text: 'ログを表示(Show log)' },
  { s: '変更の取り消し(V)...', text: '変更を捨てる(Revert...)' },
  { s: 'ブランチを作成(B)...', text: 'ブランチを作成(Create Branch...)' },
  { s: '切り替え/チェックアウト(W)...', text: 'ブランチを切り替え(Switch/Checkout...)' },
  { s: 'プッシュ(H)...', text: 'プッシュ(Push...)' },
  { s: 'プル(P)...', text: 'プル(Pull...)' },
] });

// ---- コミット画面 ----
{
  const W = 831, H = 789;
  let b = dlg(W, H, 'コミット - TortoiseGit', { max: true });
  b += `\n  ${tx(6, 52, 'コミット先:')}${tx(95, 52, 'main')}${chk(415, 53, '新しいブランチ')}`;
  b += `\n  ${group(8, 72, 814, 248, 'メッセージ(M):')}`;
  b += `\n  ${field(18, 90, 794, 137)}${tx(26, 112, 'memo.txt を作成', { size: 14 })}${tx(796, 240, '1/1', { anchor: 'end', size: 12 })}`;
  b += `\n  ${chk(20, 253, '最後のコミットをやり直し(L)')}${chk(20, 279, '著述日時を設定する(D)')}${chk(20, 305, '作者を設定(T)')}`;
  b += `\n  <rect x="212" y="289" width="420" height="24" fill="#f4f4f4" stroke="#ddd"/>${btn(663, 289, 150, 'Signed-off-by を追加 (S)')}`;
  b += `\n  ${group(8, 342, 814, 396, 'Changes made (F5: refresh, double-click on file for diff):')}`;
  b += `\n  ${tx(20, 365, 'チェック:', { size: 12 })}${tx(75, 365, 'すべて(A)', { bold: 1 })}${tx(134, 365, '無し(N)', { bold: 1 })}${tx(184, 365, 'バージョン管理外', { bold: 1 })}${tx(290, 365, 'バージョン管理下', { fill: '#aaa' })}${tx(396, 365, '追加', { fill: '#aaa' })}${tx(433, 365, '削除', { fill: '#aaa' })}${tx(470, 365, '変更', { fill: '#aaa' })}${tx(507, 365, 'ファイル', { bold: 1 })}${tx(556, 365, 'サブモジュール', { fill: '#aaa' })}`;
  b += `\n  <rect x="22" y="376" width="790" height="284" fill="#fff" stroke="#999"/>`;
  b += `\n  ${tx(28, 394, 'パス', { size: 14 })}<path d="M24,404 H810" stroke="#e5e5e5"/>`;
  b += `\n  ${tx(34, 420, 'バージョン管理下のファイルではありません', { size: 12, fill: BLUE })}<path d="M250,416 H800" stroke="#c9d6f0"/>`;
  b += `\n  <rect x="24" y="424" width="778" height="20" fill="#d9d9d9"/>${chk(26, 438, '', { on: 1 })}<rect x="43" y="426" width="14" height="16" fill="#fff" stroke="#888"/><path d="M46,432 h8 M46,436 h8" stroke="#c0c" stroke-width="1.5"/>${tx(60, 438, 'memo.txt')}`;
  b += `\n  <circle cx="740" cy="590" r="34" fill="#c9f0c9" opacity="0.7"/>`;
  b += `\n  <path d="M44,650 H606" stroke="#999" stroke-width="3"/>`;
  b += `\n  ${chk(20, 688, 'ステージングを使用（実験的)(O)')}${chk(20, 710, 'バージョン管理外のファイルを表示(U)', { on: 1 })}${chk(20, 730, 'サブモジュールを自動的に選択しない')}`;
  b += `\n  ${tx(630, 676, '選択ファイル数 1、全体ファイル数 1', { size: 12 })}${tx(715, 702, 'パッチを表示>>', { fill: BLUE, size: 12 })}`;
  b += `\n  ${chk(20, 758, 'プロジェクト全体を表示(W)', { dis: 1 })}${chk(20, 778, 'メッセージのみ (Y)')}`;
  b += `\n  ${btn(511, 758, 98, 'コミット(O)', { def: 1 })}<rect x="609" y="758" width="20" height="26" fill="#fdfdfd" stroke="#adadad"/><path d="M614,769 l5,5 l5,-5" stroke="#555" fill="none"/>${btn(644, 758, 84, 'キャンセル')}${btn(741, 758, 82, 'ヘルプ')}`;
  outA('tortoise-04-commit-dialog', W, H, 'TortoiseGit のコミット画面',
    'TortoiseGit の「コミット」ダイアログ。上のメッセージ欄にコミットメッセージを書き、下の一覧でコミットするファイルにチェックを付けて「コミット」を押す。', b, [
      { n: 1, x: 18, y: 90, w: 794, h: 137, text: 'メッセージ欄に、何を変えたかを書く' },
      { n: 2, x: 24, y: 424, w: 778, h: 20, text: '記録するファイル(memo.txt)にチェックを入れる' },
      { n: 3, x: 511, y: 758, w: 98, h: 26, text: 'コミットを押すと記録される' },
    ]);
}

// ---- プッシュ ----
{
  const W = 538, H = 545;
  let b = dlg(W, H, 'プッシュ - TortoiseGit');
  b += `\n  ${group(8, 46, 518, 130, 'Ref')}${chk(20, 76, 'すべてのブランチをプッシュ(P)')}`;
  b += `\n  ${tx(20, 108, 'ローカル(L):')}${combo(129, 91, 347, 'main')}${btn(487, 91, 26, '▸')}`;
  b += `\n  ${tx(20, 150, 'リモート(R):')}${combo(129, 133, 347, 'main')}${btn(487, 133, 26, '...')}`;
  b += `\n  ${group(8, 190, 518, 84, '宛先')}${radio(20, 222, 'リモート(M):', { on: 1 })}${combo(129, 205, 292, 'origin')}${btn(436, 203, 73, '管理(G)')}`;
  b += `\n  ${radio(20, 256, '任意のURL:')}${combo(129, 240, 380, '', { dis: 1 })}`;
  b += `\n  ${group(8, 296, 518, 190, 'オプション')}`;
  b += `\n  ${chk(20, 326, '占有ブランチに強制(W) (fo')}${chk(215, 326, '強制(F) (force)')}`;
  b += `\n  ${chk(20, 346, 'タグを含める(T)')}${chk(20, 367, 'Putty 鍵の自動ロード(A)', { dis: 1 })}${chk(20, 388, '上流/追跡対象のリモートブランチに設定(S)')}`;
  b += `\n  ${chk(20, 409, 'このローカルブランチでのpushを常に指定のリモートアーカイブへのプッシュとする')}${chk(20, 430, 'このローカルブランチでのpushを常に指定のリモートブランチへのプッシュとする')}`;
  b += `\n  ${tx(20, 449, 'サブモジュールを再帰的にチェック')}${combo(215, 436, 175, '無し')}`;
  b += `\n  ${tx(20, 484, 'プッシュオプション(o):')}${combo(215, 466, 295, '')}`;
  b += `\n  ${btn(237, 507, 88, 'OK', { def: 1 })}${btn(340, 507, 82, 'キャンセル')}${btn(437, 507, 82, 'ヘルプ')}`;
  outA('tortoise-05-push-dialog', W, H, 'TortoiseGit のプッシュ画面',
    'TortoiseGit の「プッシュ」ダイアログ。管理(Manage)で送り先 origin を登録し、ローカル(送るブランチ)が main、宛先のリモートが origin になっているのを確かめて OK を押す。', b, [
      { n: 1, x: 436, y: 203, w: 73, h: 26, text: '送り先の登録は「管理」(Manage)から' },
      { n: 2, x: 129, y: 205, w: 292, h: 26, text: '宛先のリモート(Remote)が origin' },
      { n: 3, x: 129, y: 91, w: 347, h: 26, text: '送るブランチ(ローカル)が main' },
      { n: 4, x: 237, y: 507, w: 88, h: 26, text: '確かめたら OK を押す' },
    ]);
}

// ---- プル ----
{
  const W = 560, H = 440;
  let b = dlg(W, H, 'プル - TortoiseGit');
  b += `\n  ${group(8, 46, 544, 148, 'リモート')}${radio(20, 83, 'リモート(R):', { on: 1 })}${combo(204, 66, 316, 'origin')}`;
  b += `\n  ${radio(20, 125, '任意のURL:')}${combo(204, 108, 316, '', { dis: 1 })}${tx(20, 168, 'リモートブランチ(B):')}${combo(204, 151, 316, 'main', { focus: 1 })}${btn(531, 152, 24, '...')}`;
  b += `\n  ${group(8, 212, 544, 160, 'オプション')}${chk(20, 244, '融合(S)')}${chk(228, 244, 'コミットしない(M)')}`;
  b += `\n  ${chk(20, 273, 'ファストフォワードしない(F)')}${chk(228, 273, 'ファストフォワードのみ(N)')}`;
  b += `\n  ${chk(20, 303, 'タグ', { mixed: 1 })}${tx(228, 303, 'デフォルト: 到達可能')}${chk(20, 332, 'リモートに無いブランチを削除', { mixed: 1 })}`;
  b += `\n  ${chk(20, 366, 'Putty 鍵の自動ロード(K)', { dis: 1 })}${tx(300, 362, 'リモートを管理', { fill: BLUE })}${chk(20, 392, 'フェッチ後にリベース(L)')}`;
  b += `\n  ${btn(277, 404, 88, 'OK', { def: 1 })}${btn(372, 404, 88, 'キャンセル')}${btn(468, 404, 82, 'ヘルプ')}`;
  outA('tortoise-06-pull-dialog', W, H, 'TortoiseGit のプル画面',
    'TortoiseGit の「プル」ダイアログ。取り込み元は、リモートが origin、リモートブランチが main。確かめて OK を押す。', b, [
      { n: 1, x: 204, y: 66, w: 316, h: 26, text: '取り込み元のリモート(Remote)が origin' },
      { n: 2, x: 204, y: 151, w: 316, h: 26, text: 'リモートブランチが main' },
      { n: 3, x: 277, y: 404, w: 88, h: 26, text: '確かめたら OK を押す' },
    ]);
}

// ---- ログ ----
{
  const W = 760, H = 400;
  let b = dlg(W, H, 'ログメッセージ - TortoiseGit', { max: true });
  b += `\n  ${tx(8, 57, 'main', { fill: '#c00' })}<path d="M8,60 h27" stroke="#c00"/>`;
  b += `\n  ${field(170, 41, 400, 26)}${tx(180, 59, '...み条件: 件名, メッセージ, パス, 作者, メール, SHA-1, Ref', { size: 12, fill: '#777' })}${combo(580, 41, 170, '作者メールアドレス')}`;
  b += `\n  <rect x="9" y="76" width="742" height="86" fill="#fff" stroke="#999"/>`;
  b += `\n  <path d="M78,78 V160 M168,78 V160 M600,78 V160" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(15, 94, 'グラフ')}${tx(85, 94, 'アクション')}${tx(175, 94, 'メッセージ')}${tx(607, 94, '作者')}`;
  b += `\n  <rect x="10" y="102" width="740" height="24" fill="#cce4f7" stroke="#3399ff" stroke-dasharray="2 2"/>`;
  b += `\n  <path d="M23,114 V138" stroke="#000" stroke-width="2"/><circle cx="23" cy="114" r="4" fill="#000"/><circle cx="23" cy="138" r="4" fill="#000"/>`;
  b += `<path d="M104,108 h9 v11 h-9 z M107,114 h5 M109.5,111.5 v5" fill="#fff" stroke="#2a4fc9" stroke-width="1.5"/><path d="M104,132 h9 v11 h-9 z M107,138 h5 M109.5,135.5 v5" fill="#fff" stroke="#2a4fc9" stroke-width="1.5"/>`;
  b += `\n  <rect x="171" y="104" width="40" height="18" rx="2" fill="#c00"/>${tx(176, 118, 'main', { fill: '#fff', bold: 1, size: 12 })}${tx(232, 118, '2行目を追加')}${tx(175, 142, 'memo.txt を作成')}`;
  b += `${tx(607, 118, 'your-name')}${tx(607, 142, 'your-name')}`;
  b += `\n  <rect x="9" y="172" width="742" height="22" fill="#fff" stroke="#999"/>${tx(12, 188, 'SHA-1:', { mono: 1, size: 12 })}`;
  b += `\n  <rect x="9" y="204" width="742" height="94" fill="#fff" stroke="#999"/><path d="M400,205 V297 M460,205 V297 M510,205 V297 M590,205 V297 M670,205 V297" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(15, 222, 'パス')}${tx(407, 222, '拡張子')}${tx(467, 222, '状態')}${tx(517, 222, '追加した行')}${tx(597, 222, '削除した行')}`;
  b += `\n  ${tx(15, 246, 'memo.txt', { fill: BLUE })}${tx(407, 246, '.txt', { fill: BLUE })}${tx(467, 246, '変更', { fill: BLUE })}${tx(580, 246, '1', { fill: BLUE, anchor: 'end' })}${tx(660, 246, '0', { fill: BLUE, anchor: 'end' })}`;
  b += `\n  ${tx(10, 316, '2 件のリビジョンを表示中', { size: 12 })}${tx(220, 316, '1 件のリビジョンを選択、0 件のファイルを選択しています。', { size: 12 })}`;
  b += `\n  ${chk(10, 342, 'すべてのブランチ(A)')}${btn(9, 360, 110, '更新')}${btn(665, 360, 86, 'OK')}`;
  outA('tortoise-07-log-dialog', W, H, 'TortoiseGit のコミットログ画面',
    'TortoiseGit の「ログメッセージ」ダイアログ。上側の一覧に「2行目を追加」と「memo.txt を作成」の2つの記録が新しい順に並び、先頭に main の札が付く。下側には、選んだ記録で変わったファイル memo.txt が出る。', b, [
      { n: 1, x: 10, y: 102, w: 740, h: 48, text: '上側が記録の一覧。新しい順に並ぶ' },
      { n: 2, x: 171, y: 104, bx: 211, w: 40, h: 18, text: '先頭の main の札 = いま切り替えているブランチ' },
      { n: 3, x: 9, y: 204, w: 742, h: 94, text: '下側は、選んだ記録で変わったファイル' },
    ]);
}

// ---- ブランチ作成 ----
{
  const W = 510, H = 420;
  let b = dlg(W, H, 'ブランチを作成 - TortoiseGit');
  b += `\n  ${group(8, 46, 494, 66, '名前(N)')}${tx(30, 77, 'ブランチ')}${field(143, 58, 300, 26, { focus: 1 })}${tx(151, 76, 'add-line', { size: 14 })}<path d="M213,63 v14" stroke="#000"/>`;
  b += `\n  ${group(8, 126, 494, 148, '基点')}${radio(20, 160, 'HEAD (main)', { on: 1 })}`;
  b += `\n  ${radio(20, 190, 'ブランチ(B)')}${combo(143, 174, 300, 'main', { dis: 1 })}${btn(460, 174, 30, '...')}`;
  b += `\n  ${radio(20, 220, 'タグ(T)')}${combo(143, 205, 300, '', { dis: 1 })}`;
  b += `\n  ${radio(20, 250, 'コミット(C)')}${combo(143, 235, 300, '', { dis: 1 })}${btn(460, 235, 30, '...')}`;
  b += `\n  ${group(8, 290, 494, 50, 'オプション')}${chk(20, 322, '追跡(K)', { mixed: 1, dis: 1 })}${chk(155, 322, '強制(F)')}${chk(275, 322, '新しいブランチに切り替える(S)', { on: 1 })}`;
  b += `
  ${group(8, 346, 494, 66, "説明")}<rect x="18" y="354" width="456" height="44" fill="#fff" stroke="#8a8a8a"/><rect x="474" y="354" width="18" height="44" fill="#f0f0f0" stroke="#ddd"/>`;
  b += `\n  ${btn(212, 378, 88, 'OK', { def: 1 })}${btn(314, 378, 88, 'キャンセル')}${btn(416, 378, 82, 'ヘルプ')}`;
  outA('tortoise-08-branch-create-dialog', W, H, 'TortoiseGit のブランチを作成する画面',
    'TortoiseGit の「ブランチを作成」ダイアログ。名前の欄(Branch)に add-line と入力し、「新しいブランチに切り替える」(Switch to new branch)にチェックを入れて OK を押す。', b, [
      { n: 1, x: 143, y: 58, w: 300, h: 26, text: '名前の欄(Branch)に add-line と入力' },
      { n: 2, x: 273, y: 306, w: 224, h: 22, text: '「新しいブランチに切り替える」にチェック' },
      { n: 3, x: 212, y: 378, w: 88, h: 26, text: 'OK を押す' },
    ]);
}

// ---- 切り替え/チェックアウト ----
{
  const W = 507, H = 369;
  let b = dlg(W, H, '切り替え/チェックアウト - TortoiseGit');
  b += `\n  ${group(8, 46, 490, 112, '切り替え先')}${radio(20, 83, 'ブランチ(B)', { on: 1 })}${combo(147, 63, 295, 'main')}${btn(459, 64, 30, '...')}`;
  b += `\n  ${radio(20, 111, 'タグ(T)')}${combo(147, 94, 295, '', { dis: 1 })}${radio(20, 141, 'コミット(C)')}${combo(147, 124, 295, '', { dis: 1 })}${btn(459, 124, 30, '...')}`;
  b += `\n  ${group(8, 176, 490, 142, 'オプション')}${chk(20, 211, '新しいブランチを作成(N)')}${field(190, 193, 255, 24, { })}${tx(198, 210, 'Branch_main', { fill: DIS, size: 12 })}`;
  b += `\n  ${chk(20, 241, '作業ツリーの変更を上書きする (force)')}${chk(342, 241, 'マージ(M)')}`;
  b += `\n  ${chk(20, 272, '追跡(R)', { dis: 1 })}${chk(20, 302, '既存のブランチがあれば上書きする(O)', { dis: 1 })}`;
  b += `\n  ${btn(214, 335, 88, 'OK', { def: 1 })}${btn(314, 335, 88, 'キャンセル')}${btn(414, 335, 82, 'ヘルプ')}`;
  outA('tortoise-09-switch-dialog', W, H, 'TortoiseGit のブランチ切り替え画面',
    'TortoiseGit の「切り替え/チェックアウト」ダイアログ。ブランチ(Branch)の欄で main を選んで OK を押す。', b, [
      { n: 1, x: 147, y: 63, w: 295, h: 26, text: 'ブランチ(Branch)の欄で main を選ぶ' },
      { n: 2, x: 214, y: 335, w: 88, h: 26, text: 'OK を押す' },
    ]);
}

// ---- 変更の取り消し ----
{
  const W = 478, H = 452;
  let b = dlg(W, H, '変更の取り消し - TortoiseGit', { max: true });
  b += `\n  <rect x="10" y="38" width="458" height="346" fill="#fff" stroke="#999"/><path d="M120,39 V383 M179,39 V383 M225,39 V383 M303,39 V383 M381,39 V383" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(16, 56, 'パス', { size: 14 })}${tx(127, 56, '拡張子')}${tx(186, 56, '状態')}${tx(236, 56, '追加した行')}${tx(314, 56, '削除した行')}`;
  b += `\n  <rect x="11" y="64" width="368" height="20" fill="#e5f3ff"/>${chk(14, 79, '', { on: 1 })}<rect x="33" y="65" width="14" height="17" fill="#fff" stroke="#888"/><path d="M36,71 h8 M36,75 h8" stroke="#c0c" stroke-width="1.5"/>`;
  b += `${tx(50, 79, 'memo.txt', { fill: BLUE })}${tx(127, 79, '.txt', { fill: BLUE })}${tx(186, 79, '変更', { fill: BLUE })}${tx(293, 79, '1', { fill: BLUE, anchor: 'end' })}${tx(375, 79, '0', { fill: BLUE, anchor: 'end' })}`;
  b += `\n  <path d="M376,285 q60,-30 70,10 q-10,30 -70,40 q-30,0 -10,-20 q30,5 50,-10 q-20,-20 -40,-5 z" fill="#c9c6e6" opacity="0.7"/>`;
  b += `\n  ${chk(12, 402, 'すべてを選択/解除(A)', { on: 1 })}`;
  b += `\n  ${btn(177, 421, 85, 'OK', { def: 1 })}${btn(282, 421, 85, 'キャンセル')}${btn(382, 421, 85, 'ヘルプ')}`;
  outA('tortoise-10-revert-dialog', W, H, 'TortoiseGit の変更の取り消し画面',
    'TortoiseGit の「変更の取り消し」ダイアログ。変更したファイルの一覧で memo.txt にチェックが付いているのを確かめて OK を押す。', b, [
      { n: 1, x: 11, y: 64, w: 368, h: 20, text: 'memo.txt にチェックが付いている' },
      { n: 2, x: 177, y: 421, w: 85, h: 26, text: '確かめたら OK を押す' },
    ]);
}

// ================= 08章（体験）で使う画面 =================

// ---- クローン ----
{
  const W = 560, H = 424;
  let b = dlg(W, H, 'クローン - TortoiseGit');
  b += `\n  ${group(8, 46, 544, 142, '複製元と複製先')}`;
  b += `\n  ${tx(20, 86, 'URL:')}${combo(120, 68, 366, 'https://github.com/…/git-practice-exercise.git')}${btn(498, 68, 44, '...')}`;
  b += `\n  ${tx(20, 142, 'ディレクトリ:')}${combo(120, 124, 366, 'C:\\Users\\…\\git-practice-exercise')}${btn(498, 124, 44, '...')}`;
  b += `\n  ${group(8, 204, 544, 118, 'オプション')}`;
  b += `\n  ${chk(20, 238, 'Putty 鍵のロード(K)', { dis: 1 })}${chk(290, 238, '再帰的(サブモジュール)(R)')}`;
  b += `\n  ${chk(20, 268, 'ベアリポジトリにクローン(B)')}${chk(290, 268, 'チェックアウトしない(N)')}`;
  b += `\n  ${chk(20, 298, 'ブランチ指定(R)')}${chk(290, 298, '深さ(D)')}`;
  b += `\n  ${btn(277, 380, 88, 'OK', { def: 1 })}${btn(372, 380, 88, 'キャンセル')}${btn(468, 380, 82, 'ヘルプ')}`;
  outA('tortoise-11-clone-dialog', W, H, 'TortoiseGit のクローン画面',
    'TortoiseGit の「クローン」ダイアログ。URL の欄に演習用リポジトリの URL を入れ、ディレクトリの欄に複製先のフォルダーの場所を入れて OK を押す。', b, [
      { n: 1, x: 120, y: 68, w: 366, h: 26, text: 'URL の欄に、演習用リポジトリの URL を入れる' },
      { n: 2, x: 120, y: 124, w: 366, h: 26, text: 'ディレクトリの欄に、複製先のフォルダーを入れる' },
      { n: 3, x: 277, y: 380, w: 88, h: 26, text: 'OK を押す' },
    ]);
}

// ---- ブランチ作成（果物の名前） ----
const branchBlock = (name, nameText, headText, title, desc, items) => {
  const W = 510, H = 420;
  let b = dlg(W, H, 'ブランチを作成 - TortoiseGit');
  b += `\n  ${group(8, 46, 494, 66, '名前(N)')}${tx(30, 77, 'ブランチ')}${field(143, 58, 300, 26, { focus: 1 })}${tx(151, 76, nameText, { size: 14 })}`;
  b += `\n  ${group(8, 126, 494, 148, '基点')}${radio(20, 160, headText, { on: 1 })}`;
  b += `\n  ${radio(20, 190, 'ブランチ(B)')}${combo(143, 174, 300, 'main', { dis: 1 })}${btn(460, 174, 30, '...')}`;
  b += `\n  ${radio(20, 220, 'タグ(T)')}${combo(143, 205, 300, '', { dis: 1 })}`;
  b += `\n  ${radio(20, 250, 'コミット(C)')}${combo(143, 235, 300, '', { dis: 1 })}${btn(460, 235, 30, '...')}`;
  b += `\n  ${group(8, 290, 494, 50, 'オプション')}${chk(20, 322, '追跡(K)', { mixed: 1, dis: 1 })}${chk(155, 322, '強制(F)')}${chk(275, 322, '新しいブランチに切り替える(S)', { on: 1 })}`;
  b += `\n  ${group(8, 346, 494, 66, '説明')}<rect x="18" y="354" width="456" height="44" fill="#fff" stroke="#8a8a8a"/><rect x="474" y="354" width="18" height="44" fill="#f0f0f0" stroke="#ddd"/>`;
  b += `\n  ${btn(212, 378, 88, 'OK', { def: 1 })}${btn(314, 378, 88, 'キャンセル')}${btn(416, 378, 82, 'ヘルプ')}`;
  outA(name, W, H, title, desc, b, items);
};
branchBlock('tortoise-12-branch-create-fruit', 'ks/banana', 'HEAD (main)', 'TortoiseGit のブランチを作成する画面（体験①）',
  'TortoiseGit の「ブランチを作成」ダイアログ。名前の欄に ks/banana と入力し、基点が HEAD (main) であることと、「新しいブランチに切り替える」にチェックが入っていることを確かめて OK を押す。', [
    { n: 1, x: 143, y: 58, w: 300, h: 26, text: '名前の欄に、自分のイニシャル/フルーツ名を入力' },
    { n: 2, x: 8, y: 146, w: 300, h: 26, text: '基点(元になる所)が HEAD (main) になっている' },
    { n: 3, x: 273, y: 306, w: 224, h: 22, text: '「新しいブランチに切り替える」にチェック' },
    { n: 4, x: 212, y: 378, w: 88, h: 26, text: 'OK を押す' },
  ]);
branchBlock('tortoise-13-branch-create-third', 'ks/banana-3', 'HEAD (ks/banana-2)', 'TortoiseGit のブランチを作成する画面（体験③）',
  'TortoiseGit の「ブランチを作成」ダイアログ。名前の欄に ks/banana-3 と入力し、基点が HEAD (ks/banana-2) であることと、「新しいブランチに切り替える」にチェックが入っていることを確かめて OK を押す。', [
    { n: 1, x: 143, y: 58, w: 300, h: 26, text: '名前の欄に、ks/banana-3 のように -3 を付けて入力' },
    { n: 2, x: 8, y: 146, w: 300, h: 26, text: '基点が HEAD (ks/banana-2)、つまり②のブランチ' },
    { n: 3, x: 273, y: 306, w: 224, h: 22, text: '「新しいブランチに切り替える」にチェック' },
    { n: 4, x: 212, y: 378, w: 88, h: 26, text: 'OK を押す' },
  ]);

// ---- コミット ----
const commitBlock = (name, branch, msg, filePath, title, desc, items, mod = false) => {
  const W = 831, H = 789;
  let b = dlg(W, H, 'コミット - TortoiseGit', { max: true });
  b += `\n  ${tx(6, 52, 'コミット先:')}${tx(95, 52, branch)}${chk(415, 53, '新しいブランチ')}`;
  b += `\n  ${group(8, 72, 814, 248, 'メッセージ(M):')}`;
  b += `\n  ${field(18, 90, 794, 137)}${tx(26, 112, msg, { size: 14 })}${tx(796, 240, '1/1', { anchor: 'end', size: 12 })}`;
  b += `\n  ${chk(20, 253, '最後のコミットをやり直し(L)')}${chk(20, 279, '著述日時を設定する(D)')}${chk(20, 305, '作者を設定(T)')}`;
  b += `\n  <rect x="212" y="289" width="420" height="24" fill="#f4f4f4" stroke="#ddd"/>${btn(663, 289, 150, 'Signed-off-by を追加 (S)')}`;
  b += `\n  ${group(8, 342, 814, 396, 'Changes made (F5: refresh, double-click on file for diff):')}`;
  b += `\n  ${tx(20, 365, 'チェック:', { size: 12 })}${tx(75, 365, 'すべて(A)', { bold: 1 })}${tx(134, 365, '無し(N)', { bold: 1 })}${tx(184, 365, 'バージョン管理外', { bold: 1 })}${tx(290, 365, 'バージョン管理下', { fill: '#aaa' })}${tx(396, 365, '追加', { fill: '#aaa' })}${tx(433, 365, '削除', { fill: '#aaa' })}${tx(470, 365, '変更', { fill: '#aaa' })}${tx(507, 365, 'ファイル', { bold: 1 })}${tx(556, 365, 'サブモジュール', { fill: '#aaa' })}`;
  b += `\n  <rect x="22" y="376" width="790" height="284" fill="#fff" stroke="#999"/>`;
  b += `\n  ${tx(28, 394, 'パス', { size: 14 })}<path d="M24,404 H810" stroke="#e5e5e5"/>`;
  if (!mod) b += `
  ${tx(34, 420, 'バージョン管理下のファイルではありません', { size: 12, fill: BLUE })}<path d="M250,416 H800" stroke="#c9d6f0"/>`;
  const ry = mod ? 410 : 424;
  b += `
  <rect x="24" y="${ry}" width="778" height="20" fill="#d9d9d9"/>${chk(26, ry + 14, '', { on: 1 })}<rect x="43" y="${ry + 2}" width="14" height="16" fill="#fff" stroke="#888"/><path d="M46,${ry + 8} h8 M46,${ry + 12} h8" stroke="#c0c" stroke-width="1.5"/>${tx(60, ry + 14, filePath)}${mod ? tx(560, ry + 14, '変更') : ''}`;
  b += `\n  <path d="M44,650 H606" stroke="#999" stroke-width="3"/>`;
  b += `\n  ${chk(20, 688, 'ステージングを使用（実験的)(O)')}${chk(20, 710, 'バージョン管理外のファイルを表示(U)', { on: 1 })}${chk(20, 730, 'サブモジュールを自動的に選択しない')}`;
  b += `\n  ${tx(630, 676, '選択ファイル数 1、全体ファイル数 1', { size: 12 })}`;
  b += `\n  ${chk(20, 758, 'プロジェクト全体を表示(W)', { dis: 1 })}${chk(20, 778, 'メッセージのみ (Y)')}`;
  b += `\n  ${btn(511, 758, 98, 'コミット(O)', { def: 1 })}<rect x="609" y="758" width="20" height="26" fill="#fdfdfd" stroke="#adadad"/><path d="M614,769 l5,5 l5,-5" stroke="#555" fill="none"/>${btn(644, 758, 84, 'キャンセル')}${btn(741, 758, 82, 'ヘルプ')}`;
  outA(name, W, H, title, desc, b, items);
};
commitBlock('tortoise-14-commit-new-file', 'ks/banana', 'ほしいものリストを追加', 'practice/wishlist-ks.txt', 'TortoiseGit のコミット画面（新しいファイルを記録する）',
  'TortoiseGit の「コミット」ダイアログ。コミット先が ks/banana になっている。メッセージ欄に「ほしいものリストを追加」と書き、バージョン管理外の欄に出た practice/wishlist-ks.txt にチェックが付いているのを確かめて、コミットを押す。', [
    { n: 1, x: 6, y: 38, w: 190, h: 22, text: 'コミット先が、自分のブランチ(ks/banana)になっている' },
    { n: 2, x: 18, y: 90, w: 794, h: 137, text: 'メッセージ欄に、何を変えたかを書く' },
    { n: 3, x: 24, y: 424, w: 778, h: 20, text: '作ったファイルが、「バージョン管理外」の欄に出ている。チェックを入れる' },
    { n: 4, x: 511, y: 758, w: 98, h: 26, text: 'コミットを押す' },
  ]);
commitBlock('tortoise-15-commit-edit-file', 'ks/banana-2', 'sample-menu.txt の2行目を書き換え', 'practice/sample-menu.txt', 'TortoiseGit のコミット画面（既存のファイルを記録する）',
  'TortoiseGit の「コミット」ダイアログ。コミット先が ks/banana-2 になっている。メッセージ欄に「sample-menu.txt の2行目を書き換え」と書き、変更のあった practice/sample-menu.txt にチェックが付いているのを確かめて、コミットを押す。', [
    { n: 1, x: 6, y: 38, w: 210, h: 22, text: 'コミット先が、自分のブランチ(ks/banana-2)になっている' },
    { n: 2, x: 18, y: 90, w: 794, h: 137, text: 'メッセージ欄に、何を変えたかを書く' },
    { n: 3, x: 24, y: 410, w: 778, h: 20, text: '書き換えたファイルにチェックが入っている' },
    { n: 4, x: 511, y: 758, w: 98, h: 26, text: 'コミットを押す' },
  ], true);

// ---- フォルダーのアイコンの変化 ----
{
  const W = 780, H = 220;
  const file = (x, y, mark) => {
    const s = `<path d="M${x},${y} h26 l12,12 v40 h-38 z" fill="#fff" stroke="#8a8a8a" stroke-width="1.5"/><path d="M${x + 26},${y} v12 h12" fill="#eee" stroke="#8a8a8a" stroke-width="1.5"/><path d="M${x + 8},${y + 26} h22 M${x + 8},${y + 34} h22 M${x + 8},${y + 42} h16" stroke="#aaa" stroke-width="2"/>`;
    return s + mark(x + 30, y + 52);
  };
  const folder = (x, y, mark) => `<path d="M${x},${y + 8} a4,4 0 0 1 4,-4 h18 l6,7 h30 a4,4 0 0 1 4,4 v32 a4,4 0 0 1 -4,4 h-54 a4,4 0 0 1 -4,-4 z" fill="#f5c64f" stroke="#c9a02a" stroke-width="1.5"/>` + mark(x + 52, y + 46);
  const ok = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="10" fill="#2fa84f" stroke="#fff" stroke-width="2"/><path d="M${cx - 5},${cy} l3.5,4 l6,-8" stroke="#fff" stroke-width="2.4" fill="none"/>`;
  const warn = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="10" fill="#d93025" stroke="#fff" stroke-width="2"/><path d="M${cx},${cy - 6} v7" stroke="#fff" stroke-width="2.6"/><circle cx="${cx}" cy="${cy + 5}" r="1.5" fill="#fff"/>`;
  const ques = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="10" fill="#1a73e8" stroke="#fff" stroke-width="2"/>${t(cx, cy + 5, '?', { size: 14, bold: true, fill: '#fff', anchor: 'middle' })}`;
  const panel = (x, label, folderMark, fileMark) =>
    `<rect x="${x}" y="10" width="360" height="130" rx="6" fill="#fff" stroke="#999" stroke-width="1.5"/>` +
    `<rect x="${x}" y="10" width="360" height="30" rx="6" fill="#eef1f5" stroke="#999" stroke-width="1.5"/>${t(x + 14, 30, label, { size: 15, bold: true, fill: '#222' })}` +
    folder(x + 40, 56, folderMark) + t(x + 70, 130, 'practice', { size: 14, fill: '#222', anchor: 'middle' }) +
    file(x + 230, 52, fileMark) + t(x + 250, 130, 'wishlist-ks.txt', { size: 14, fill: '#222', mono: 1, anchor: 'middle' });
  const b = panel(10, 'コミットする前', warn, ques) + panel(410, 'コミットした後', ok, ok);
  outA('tortoise-16-overlay-icons', W, H, 'TortoiseGit のアイコンの変化',
    'エクスプローラーの practice フォルダーと wishlist-ks.txt。コミットする前は、フォルダーに赤い「!」、新しいファイルに青い「?」が付く。コミットした後は、どちらにも緑のチェックが付く。', b, [
      { n: 1, x: 40, y: 60, w: 76, h: 56, text: 'フォルダー: 赤い「!」(記録していない変更がある)が、緑のチェックになる' },
      { n: 2, x: 230, y: 56, w: 50, h: 58, text: 'ファイル: 青い「?」(Git が知らない新しいファイル)が、緑のチェックになる' },
    ]);
}

// ---- ログ（新しいファイルを記録した後） ----
{
  const W = 760, H = 400;
  let b = dlg(W, H, 'ログメッセージ - TortoiseGit', { max: true });
  b += `\n  ${tx(8, 57, 'ks/banana', { fill: '#c00' })}<path d="M8,60 h60" stroke="#c00"/>`;
  b += `\n  ${field(170, 41, 400, 26)}${tx(180, 59, '...み条件: 件名, メッセージ, パス, 作者, メール, SHA-1, Ref', { size: 12, fill: '#777' })}${combo(580, 41, 170, '作者メールアドレス')}`;
  b += `\n  <rect x="9" y="76" width="742" height="86" fill="#fff" stroke="#999"/>`;
  b += `\n  <path d="M78,78 V160 M168,78 V160 M600,78 V160" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(15, 94, 'グラフ')}${tx(85, 94, 'アクション')}${tx(175, 94, 'メッセージ')}${tx(607, 94, '作者')}`;
  b += `\n  <rect x="10" y="102" width="740" height="24" fill="#cce4f7" stroke="#3399ff" stroke-dasharray="2 2"/>`;
  b += `\n  <path d="M23,114 V138" stroke="#000" stroke-width="2"/><circle cx="23" cy="114" r="4" fill="#000"/><circle cx="23" cy="138" r="4" fill="#000"/>`;
  b += `\n  <rect x="171" y="104" width="80" height="18" rx="2" fill="#c00"/>${tx(176, 118, 'ks/banana', { fill: '#fff', bold: 1, size: 12 })}${tx(262, 118, 'ほしいものリストを追加')}${tx(175, 142, '（これまでの記録）')}`;
  b += `${tx(607, 118, 'your-name')}${tx(607, 142, 'someone')}`;
  b += `\n  <rect x="9" y="172" width="742" height="22" fill="#fff" stroke="#999"/>${tx(12, 188, 'SHA-1:', { mono: 1, size: 12 })}`;
  b += `\n  <rect x="9" y="204" width="742" height="94" fill="#fff" stroke="#999"/><path d="M400,205 V297 M460,205 V297 M510,205 V297 M590,205 V297 M670,205 V297" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(15, 222, 'パス')}${tx(407, 222, '拡張子')}${tx(467, 222, '状態')}${tx(517, 222, '追加した行')}${tx(597, 222, '削除した行')}`;
  b += `\n  <rect x="10" y="231" width="740" height="22" fill="#cce4f7"/>${tx(15, 246, 'practice/wishlist-ks.txt', { fill: BLUE })}${tx(407, 246, '.txt', { fill: BLUE })}${tx(467, 246, '追加', { fill: BLUE })}${tx(580, 246, '5', { fill: BLUE, anchor: 'end' })}${tx(660, 246, '0', { fill: BLUE, anchor: 'end' })}`;
  b += `\n  ${tx(10, 316, '件のリビジョンを表示中', { size: 12 })}${tx(220, 316, '1 件のリビジョンを選択、1 件のファイルを選択しています。', { size: 12 })}`;
  b += `\n  ${chk(10, 342, 'すべてのブランチ(A)')}${btn(9, 360, 110, '更新')}${btn(665, 360, 86, 'OK')}`;
  outA('tortoise-17-log-new-file', W, H, 'TortoiseGit のログ画面（新しいファイルの記録）',
    'TortoiseGit の「ログメッセージ」ダイアログ。一番上の記録「ほしいものリストを追加」を選ぶと、下の一覧に practice/wishlist-ks.txt が状態「追加」、追加した行が5、削除した行が0で出る。ファイルをダブルクリックすると、差分の画面が開く。', b, [
      { n: 1, x: 10, y: 102, w: 740, h: 24, text: '一番上の記録を選ぶ(いまコミットした記録)' },
      { n: 2, x: 10, y: 231, w: 740, h: 22, text: '下の一覧に、作ったファイルが「追加」で出る。ダブルクリックで差分を開く' },
      { n: 3, x: 517, y: 233, w: 70, h: 20, bx: 600, by: 262, text: '追加した行が5(5つ書いた分)、削除した行は0' },
    ]);
}

// ---- 差分の画面（新しいファイル） ----
{
  const W = 760, H = 330;
  let b = dlg(W, H, 'practice/wishlist-ks.txt - TortoiseGitMerge', { max: true });
  b += `\n  <rect x="10" y="44" width="360" height="26" fill="#e8ecf2" stroke="#999"/>${tx(20, 62, '変更前(前の記録)', { size: 14, bold: 1 })}`;
  b += `\n  <rect x="380" y="44" width="370" height="26" fill="#e8ecf2" stroke="#999"/>${tx(390, 62, '変更後(いまコミットした記録)', { size: 14, bold: 1 })}`;
  b += `\n  <rect x="10" y="70" width="360" height="240" fill="#f2f2f2" stroke="#999"/>${tx(190, 190, '(何もない = 新しいファイル)', { size: 14, fill: '#777', anchor: 'middle' })}`;
  b += `\n  <rect x="380" y="70" width="370" height="240" fill="#fff" stroke="#999"/>`;
  ['ゲーミングPC', '世界一周の旅行', '大きなテレビ', 'おいしいお肉', '新しい自転車'].forEach((s, i) => {
    const y = 74 + i * 30;
    b += `\n  <rect x="381" y="${y}" width="368" height="28" fill="#c9f0c9"/>${tx(404, y + 19, String(i + 1), { size: 13, fill: '#555', anchor: 'end', mono: 1 })}${tx(420, y + 19, s, { size: 15 })}`;
  });
  outA('tortoise-18-diff-window', W, H, 'TortoiseGit の差分の画面（新しいファイル）',
    'TortoiseGitMerge の差分の画面。左の「変更前」には何もなく、右の「変更後」に書いた5行が緑色で並ぶ。新しいファイルなので、全部の行が追加された行として緑で示される。', b, [
      { n: 1, x: 10, y: 70, w: 360, h: 240, text: '左は変更前。新しいファイルなので、何もない' },
      { n: 2, x: 380, y: 70, w: 370, h: 150, text: '右は変更後。追加した行が、緑色で示される' },
    ]);
}

// ---- プッシュ（自分のブランチ） ----
{
  const W = 538, H = 545;
  let b = dlg(W, H, 'プッシュ - TortoiseGit');
  b += `\n  ${group(8, 46, 518, 130, 'Ref')}${chk(20, 76, 'すべてのブランチをプッシュ(P)')}`;
  b += `\n  ${tx(20, 108, 'ローカル(L):')}${combo(129, 91, 347, 'ks/banana')}${btn(487, 91, 26, '▸')}`;
  b += `\n  ${tx(20, 150, 'リモート(R):')}${combo(129, 133, 347, 'ks/banana')}${btn(487, 133, 26, '...')}`;
  b += `\n  ${group(8, 190, 518, 84, '宛先')}${radio(20, 222, 'リモート(M):', { on: 1 })}${combo(129, 205, 292, 'origin')}${btn(436, 203, 73, '管理(G)')}`;
  b += `\n  ${radio(20, 256, '任意のURL:')}${combo(129, 240, 380, '', { dis: 1 })}`;
  b += `\n  ${group(8, 296, 518, 190, 'オプション')}`;
  b += `\n  ${chk(20, 326, '占有ブランチに強制(W) (fo')}${chk(215, 326, '強制(F) (force)')}`;
  b += `\n  ${chk(20, 346, 'タグを含める(T)')}${chk(20, 367, 'Putty 鍵の自動ロード(A)', { dis: 1 })}${chk(20, 388, '上流/追跡対象のリモートブランチに設定(S)')}`;
  b += `\n  ${chk(20, 409, 'このローカルブランチでのpushを常に指定のリモートアーカイブへのプッシュとする')}${chk(20, 430, 'このローカルブランチでのpushを常に指定のリモートブランチへのプッシュとする')}`;
  b += `\n  ${tx(20, 449, 'サブモジュールを再帰的にチェック')}${combo(215, 436, 175, '無し')}`;
  b += `\n  ${tx(20, 484, 'プッシュオプション(o):')}${combo(215, 466, 295, '')}`;
  b += `\n  ${btn(237, 507, 88, 'OK', { def: 1 })}${btn(340, 507, 82, 'キャンセル')}${btn(437, 507, 82, 'ヘルプ')}`;
  outA('tortoise-19-push-own-branch', W, H, 'TortoiseGit のプッシュ画面（自分のブランチを送る）',
    'TortoiseGit の「プッシュ」ダイアログ。ローカル(送るブランチ)もリモート(送り先のブランチ名)も、自分のブランチ ks/banana になっている。宛先のリモートは origin。main になっていないことを確かめて OK を押す。', b, [
      { n: 1, x: 129, y: 91, w: 347, h: 26, text: 'ローカル(送るブランチ)が、自分のブランチ。main ではない' },
      { n: 2, x: 129, y: 133, w: 347, h: 26, text: 'リモート(送り先のブランチ名)も、自分のブランチ。main ではない' },
      { n: 3, x: 129, y: 205, w: 292, h: 26, text: '宛先のリモートが origin' },
      { n: 4, x: 237, y: 507, w: 88, h: 26, text: '1〜3 を確かめてから OK を押す' },
    ]);
}
