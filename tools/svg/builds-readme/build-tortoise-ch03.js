// 03章（変更の取り消し）§3「コミットした変更を打ち消す」の手順で使う TortoiseGit の画面を、模擬図として書き出す。
// 本文のメニュー名・項目名（英語の表記）に合わせている。画面の部品は build-tortoise-screens.js と同じ作り
// （そちらは変更しないので、必要な部品をここに写している）。
// 作り直すには: node tools/svg/builds-readme/build-tortoise-ch03.js （docs/images/tortoise-20〜22 を書き出す）
const S = require('../shot-lib');
const { t, svg, write } = S;

const BG = '#f0f0f0', TXT = '#1a1a1a', BLUE = '#0b57d0', ACC = '#0067c0';
const tx = (x, y, s, o = {}) => t(x, y, s, { size: 13, fill: TXT, ...o });

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
const chk = (x, y, label, o = {}) => {
  const c = o.dis ? '#bbb' : '#444';
  let s = `<rect x="${x}" y="${y - 12}" width="14" height="14" rx="2" fill="${o.on ? ACC : '#fff'}" stroke="${o.on ? ACC : c}"/>`;
  if (o.on) s += `<path d="M${x + 3},${y - 5} l3,3 l5,-6" stroke="#fff" stroke-width="2" fill="none"/>`;
  return s + (label ? tx(x + 22, y, label, { fill: o.dis ? '#8a8a8a' : TXT }) : '');
};
const combo = (x, y, w, text) =>
  `<rect x="${x}" y="${y}" width="${w}" height="26" rx="3" fill="#fff" stroke="#8a8a8a"/>${text ? tx(x + 8, y + 18, text) : ''}<path d="M${x + w - 18},${y + 10} l5,5 l5,-5" stroke="#555" stroke-width="1.4" fill="none"/>`;
const btn = (x, y, w, label) =>
  `<rect x="${x}" y="${y}" width="${w}" height="26" rx="3" fill="#fdfdfd" stroke="#adadad"/>${tx(x + w / 2, y + 18, label, { anchor: 'middle' })}`;
const field = (x, y, w, h = 26) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#8a8a8a"/>`;

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

// 右クリックメニュー（ログの一覧で出るもの）。items: { s, bold } か '-'。位置 pos[s] は、メニューの上端からの y
const menu = (W, items) => {
  const RH = 24;
  let y = 6;
  const rows = [], pos = {};
  for (const it of items) {
    if (it === '-') { rows.push(`<path d="M12,${y + 4.5} H${W - 12}" stroke="#d8d8d8"/>`); y += 9; continue; }
    pos[it] = y;
    rows.push(tx(16, y + 17, it, { size: 14 }));
    y += RH;
  }
  const H = y + 6;
  return { H, pos, body: `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="8" fill="#f9f9f9" stroke="#b8b8b8"/>\n  ${rows.join('\n  ')}` };
};

// ログの画面。rows: 新しい順の記録の件名。先頭に main の札を付け、先頭の記録を選んでいる状態にする。
// 返す: { b: 画面の部品, H, dy(一覧が増えた分), row(先頭行の枠) }
const logDlg = (rows, file) => {
  const W = 760, n = rows.length, listH = 26 + n * 24 + 4, dy = listH - 86;
  const H = 400 + dy;
  let b = dlg(W, H, 'ログメッセージ - TortoiseGit', { max: true });
  b += `\n  ${tx(8, 57, 'main', { fill: '#c00' })}<path d="M8,60 h27" stroke="#c00"/>`;
  b += `\n  ${field(170, 41, 400)}${tx(180, 59, '...み条件: 件名, メッセージ, パス, 作者, メール, SHA-1, Ref', { size: 12, fill: '#777' })}${combo(580, 41, 170, '作者メールアドレス')}`;
  b += `\n  <rect x="9" y="76" width="742" height="${listH}" fill="#fff" stroke="#999"/>`;
  b += `\n  <path d="M78,78 V${74 + listH} M168,78 V${74 + listH} M600,78 V${74 + listH}" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(15, 94, 'グラフ')}${tx(85, 94, 'アクション')}${tx(175, 94, 'メッセージ')}${tx(607, 94, '作者')}`;
  b += `\n  <rect x="10" y="102" width="740" height="24" fill="#cce4f7" stroke="#3399ff" stroke-dasharray="2 2"/>`;
  b += `\n  <path d="M23,114 V${114 + (n - 1) * 24}" stroke="#000" stroke-width="2"/>`;
  rows.forEach((r, i) => {
    const cy = 114 + i * 24;
    b += `<circle cx="23" cy="${cy}" r="4" fill="#000"/><path d="M104,${cy - 6} h9 v11 h-9 z M107,${cy} h5 M109.5,${cy - 2.5} v5" fill="#fff" stroke="#2a4fc9" stroke-width="1.5"/>`;
    if (i === 0) b += `<rect x="171" y="104" width="40" height="18" rx="2" fill="#c00"/>${tx(176, 118, 'main', { fill: '#fff', bold: 1, size: 12 })}${tx(220, cy + 4, r)}`;
    else b += tx(175, cy + 4, r);
    b += tx(607, cy + 4, 'your-name');
  });
  b += `\n  <rect x="9" y="${172 + dy}" width="742" height="22" fill="#fff" stroke="#999"/>${tx(12, 188 + dy, 'SHA-1:', { mono: 1, size: 12 })}`;
  b += `\n  <rect x="9" y="${204 + dy}" width="742" height="94" fill="#fff" stroke="#999"/><path d="M400,${205 + dy} V${297 + dy} M460,${205 + dy} V${297 + dy} M510,${205 + dy} V${297 + dy} M590,${205 + dy} V${297 + dy} M670,${205 + dy} V${297 + dy}" stroke="#e8f0f8"/>`;
  b += `\n  ${tx(15, 222 + dy, 'パス')}${tx(407, 222 + dy, '拡張子')}${tx(467, 222 + dy, '状態')}${tx(517, 222 + dy, '追加した行')}${tx(597, 222 + dy, '削除した行')}`;
  b += `\n  ${tx(15, 246 + dy, 'memo.txt', { fill: BLUE })}${tx(407, 246 + dy, '.txt', { fill: BLUE })}${tx(467, 246 + dy, '変更', { fill: BLUE })}${tx(580, 246 + dy, String(file.add), { fill: BLUE, anchor: 'end' })}${tx(660, 246 + dy, String(file.del), { fill: BLUE, anchor: 'end' })}`;
  b += `\n  ${tx(10, 316 + dy, `${n} 件のリビジョンを表示中`, { size: 12 })}${tx(220, 316 + dy, '1 件のリビジョンを選択、0 件のファイルを選択しています。', { size: 12 })}`;
  b += `\n  ${chk(10, 342 + dy, 'すべてのブランチ(A)')}${btn(9, 360 + dy, 110, '更新')}${btn(665, 360 + dy, 86, 'OK')}`;
  return { b, W, H, dy };
};

const FAIL = [ '失敗した変更', '2行目を追加', 'memo.txt を作成' ];
const FILE_ADD = { add: 1, del: 0 };

// ---- 手順3: ログを表示した画面 ----
{
  const L = logDlg(FAIL, FILE_ADD);
  outA('tortoise-20-log-failed-commit', L.W, L.H, 'TortoiseGit のログ画面（失敗した変更をコミットした後）',
    'TortoiseGit の「ログメッセージ」ダイアログ。上側の一覧に「失敗した変更」「2行目を追加」「memo.txt を作成」の3つの記録が新しい順に並び、一番上の「失敗した変更」を選んでいる。下側には、その記録で変わったファイル memo.txt が出る。', L.b, [
      { n: 1, x: 10, y: 102, w: 740, h: 24, text: '一番上に、いま記録した「失敗した変更」がある(次の手順で右クリックする)' },
      { n: 2, x: 9, y: 76, w: 742, h: 26 + FAIL.length * 24 + 4, text: '上側が記録の一覧。新しい順に並ぶ' },
    ]);
}

// ---- 手順4: 記録を右クリックして出るメニュー ----
{
  const L = logDlg(FAIL, FILE_ADD);
  const MW = 290;
  const m = menu(MW, ['Compare with previous revision', 'Browse repository', 'Create Branch at this version...', 'Switch/Checkout to this...', '-', 'Revert change by this commit']);
  const mx = 300, my = 118;
  const body = L.b + `\n  <g transform="translate(${mx} ${my})">${m.body}</g>`;
  const ry = my + m.pos['Revert change by this commit'];
  outA('tortoise-21-log-revert-menu', L.W, L.H, 'TortoiseGit のログ画面で記録を右クリックしたメニュー',
    'TortoiseGit のログ画面で、一番上の「失敗した変更」の記録を右クリックしたときに出るメニュー。メニューの中の「Revert change by this commit」(この記録の変更を打ち消す)を選ぶ。', body, [
      { n: 1, x: 10, y: 102, w: 740, h: 24, text: '一番上の「失敗した変更」の記録を右クリックする' },
      { n: 2, x: mx + 4, y: ry, w: MW - 8, h: 24, text: 'メニューの「Revert change by this commit」(この記録の変更を打ち消す)を選ぶ' },
    ]);
}

// ---- 手順9: 打ち消したあとのログ ----
{
  const L = logDlg(['失敗した変更を取り消す', '失敗した変更', '2行目を追加', 'memo.txt を作成'], { add: 0, del: 1 });
  outA('tortoise-22-log-after-revert', L.W, L.H, 'TortoiseGit のログ画面（打ち消しの記録が増えた後）',
    'TortoiseGit の「ログメッセージ」ダイアログ。一番上に「失敗した変更を取り消す」の記録が増え、その下に「失敗した変更」の記録が消えずに残っている。', L.b, [
      { n: 1, x: 10, y: 102, w: 740, h: 24, text: '一番上に、打ち消しの記録「失敗した変更を取り消す」が増えている' },
      { n: 2, x: 10, y: 126, w: 740, h: 24, text: '「失敗した変更」の記録は、消えずに残っている' },
    ]);
}
