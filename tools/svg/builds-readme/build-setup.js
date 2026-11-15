// README 5「環境構築手順」（Git・TortoiseGit・日本語化）の画面の模擬図を、まとめて書き出す。
// 作り直すには: node tools/svg/builds-readme/build-setup.js （docs/images/setup-*.svg を書き出す）
// 図の代替テキストは、README.md の ![代替テキスト](docs/images/setup-*.svg) から読み取る。
const fs = require('fs');
const path = require('path');
const S = require('../shot-lib');
const { t, hl, arrow, note, btn, esc } = S;

const README = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'README.md'), 'utf8');
const alts = {};
for (const m of README.matchAll(/!\[([^\]]*)\]\(docs\/images\/(setup-[^)]+)\.svg\)/g)) alts[m[2]] = m[1];

const W = 900, WX = 10, WY = 10, WW = 880, TB = 40, X0 = 40, NX = 640, ROWMAX = 240;
const GRAY = '#555';
const tw = (s, size, mono) => [...s].reduce((a, c) => a + (c.codePointAt(0) > 0x2e80 ? size : size * (mono ? 0.6 : 0.56)), 0);
const warnings = [];

function render(name, kind, title, items, footer, memo) {
  const dark = kind === 'terminal';
  const body = [];
  const marks = []; // { type: 'row' | 'left' | 'below' | 'foot', ... } 画面の上から順に番号を振る
  const chk = (s, size, x, mono, limit = WX + WW - 20) => { if (x + tw(s, size, mono) > limit) warnings.push(`${name}: はみ出し「${s}」`); };
  let cy = WY + TB + 22;

  for (const it of items) {
    const on = it.hl;
    if (it.t === 'h') { body.push(t(X0, cy + 20, it.s, { size: 20, bold: true, fill: '#222' })); chk(it.s, 20, X0, false, NX); cy += 42; }
    else if (it.t === 'p') {
      body.push(t(X0, cy + 17, it.s, { size: 15, fill: '#222' })); chk(it.s, 15, X0, false, NX - 40);
      if (on) { const w = tw(it.s, 15) + 12; body.push(hl({ x: X0 - 6, y: cy - 2, w, h: 26 })); marks.push({ type: 'row', y: cy + 11, xEnd: X0 - 6 + w, text: on }); }
      cy += 32;
    }
    else if (it.t === 'n') { body.push(t(X0, cy + 14, it.s, { size: 13, fill: GRAY })); chk(it.s, 13, X0, false, NX); cy += 24; }
    else if (it.t === 'radio' || it.t === 'check') {
      const bx = X0 + 2, by = cy + 4;
      if (it.t === 'radio') {
        body.push(`<circle cx="${bx + 8}" cy="${by + 8}" r="8" fill="#fff" stroke="#666" stroke-width="2"/>`);
        if (it.on) body.push(`<circle cx="${bx + 8}" cy="${by + 8}" r="4.5" fill="#333"/>`);
      } else {
        body.push(`<rect x="${bx}" y="${by}" width="16" height="16" rx="2" fill="#fff" stroke="#666" stroke-width="2"/>`);
        if (it.on) body.push(`<path d="M${bx + 3} ${by + 8}l4 4l7-8" fill="none" stroke="#333" stroke-width="2.5"/>`);
      }
      body.push(t(X0 + 28, cy + 18, it.s, { size: 15, fill: '#222' })); chk(it.s, 15, X0 + 28, false, NX - 40);
      if (on) { const w = 32 + tw(it.s, 15) + 8; body.push(hl({ x: X0 - 4, y: cy - 1, w, h: 28 })); marks.push({ type: 'row', y: cy + 13, xEnd: X0 - 4 + w, text: on }); }
      cy += 34;
    }
    else if (it.t === 'field' || it.t === 'sel') {
      const lw = it.label ? 150 : 0, bw = 380;
      if (it.label) body.push(t(X0, cy + 20, it.label, { size: 15, fill: '#222' }));
      body.push(`<rect x="${X0 + lw}" y="${cy}" width="${bw}" height="30" rx="3" fill="#fff" stroke="#999" stroke-width="1.5"/>`);
      body.push(t(X0 + lw + 10, cy + 20, it.s, { size: 15, mono: true, fill: '#222' })); chk(it.s, 15, X0 + lw + 10, true, X0 + lw + bw - 30);
      if (it.t === 'sel') body.push(`<path d="M${X0 + lw + bw - 26} ${cy + 12}h12l-6 8z" fill="#666"/>`);
      if (on) { body.push(hl({ x: X0 + lw - 4, y: cy - 4, w: bw + 8, h: 38 })); marks.push({ type: 'row', y: cy + 15, xEnd: X0 + lw + bw + 4, text: on }); }
      cy += 48;
    }
    else if (it.t === 'btn') {
      const bw = tw(it.s, 18) + 48;
      body.push(btn({ x: X0, y: cy, w: bw, h: 40, label: it.s, hot: false }));
      if (on) { body.push(hl({ x: X0 - 4, y: cy - 4, w: bw + 8, h: 48 })); marks.push({ type: 'row', y: cy + 20, xEnd: X0 + bw + 4, text: on }); }
      cy += 58;
    }
    else if (it.t === 'file') {
      body.push(`<path d="M${X0} ${cy}h16l8 8v22h-24z" fill="#fff" stroke="#666" stroke-width="2"/>`);
      body.push(t(X0 + 36, cy + 21, it.s, { size: 15, bold: true, mono: true, fill: '#222' })); chk(it.s, 15, X0 + 36, true, NX - 30);
      const w = 40 + tw(it.s, 15, true) + 8;
      if (on) { body.push(hl({ x: X0 - 6, y: cy - 4, w, h: 38 })); marks.push({ type: 'row', y: cy + 15, xEnd: X0 - 6 + w, text: on }); }
      cy += 46;
    }
    else if (it.t === 'cl') {
      body.push(t(X0, cy + 17, it.s, { size: 15, mono: true, fill: on ? '#ffffff' : '#e6e6e6', bold: !!on })); chk(it.s, 15, X0, true, NX - 40);
      if (on) { const w = tw(it.s, 15, true) + 14; body.push(hl({ x: X0 - 8, y: cy - 3, w, h: 28 })); marks.push({ type: 'row', y: cy + 11, xEnd: X0 - 8 + w, text: on }); }
      cy += 32;
    }
    else if (it.t === 'menu') {
      const mx = 300, mw = 220, ih = 34, sw = 280, top = cy;
      body.push(`<rect x="${mx}" y="${top}" width="${mw}" height="${ih * it.items.length}" fill="#fff" stroke="#999" stroke-width="2"/>`);
      let extra = 0;
      it.items.forEach((m, i) => {
        const y = top + i * ih;
        if (m.hl) body.push(`<rect x="${mx + 2}" y="${y + 2}" width="${mw - 4}" height="${ih - 4}" fill="#bee3f8"/>`);
        body.push(t(mx + 14, y + 23, m.s, { size: 15, bold: !!m.hl, fill: m.hl ? '#1a365d' : '#222' }));
        if (m.sub) body.push(`<path d="M${mx + mw - 22} ${y + 11}l8 6l-8 6z" fill="#666"/>`);
        if (m.hl) { body.push(hl({ x: mx, y: y, w: mw, h: ih })); marks.push({ type: 'left', y: y + ih / 2, xStart: mx, text: m.hl }); }
        if (m.sub) {
          const sx = mx + mw + 6, sh = ih * m.sub.length;
          body.push(`<rect x="${sx}" y="${y}" width="${sw}" height="${sh}" fill="#fff" stroke="#999" stroke-width="2"/>`);
          m.sub.forEach((q, j) => {
            const qy = y + j * ih;
            if (q.hl) body.push(`<rect x="${sx + 2}" y="${qy + 2}" width="${sw - 4}" height="${ih - 4}" fill="#bee3f8"/>`);
            body.push(t(sx + 14, qy + 23, q.s, { size: 15, bold: !!q.hl, fill: q.hl ? '#1a365d' : '#222' }));
            if (q.hl) {
              if (j !== m.sub.length - 1) warnings.push(`${name}: 子メニューの最後以外の強調は未対応`);
              body.push(hl({ x: sx, y: qy, w: sw, h: ih }));
              marks.push({ type: 'below', x: sx + 40, y: qy + ih, text: q.hl }); extra = 60;
            }
          });
        }
      });
      cy += ih * it.items.length + 12 + extra;
    }
  }
  if (memo) { body.push(note({ x: X0, y: cy + 14, text: memo, dark })); cy += 34; }

  const WH = Math.max(250, cy - WY + (footer ? 108 : 20));
  const bottom = WY + WH;

  if (footer) {
    const fy = bottom - 52;
    body.push(`<line x1="${WX + 1}" y1="${fy - 14}" x2="${WX + WW - 1}" y2="${fy - 14}" stroke="#999" stroke-opacity="0.5"/>`);
    let x = WX + WW - 24;
    for (const b of [...footer].reverse()) {
      const bw = Math.max(96, tw(b.s, 14) + 36);
      x -= bw;
      body.push(b.off ? `<g opacity="0.45">${btn({ x, y: fy, w: bw, h: 34, label: b.s })}</g>` : btn({ x, y: fy, w: bw, h: 34, label: b.s, hot: !!b.hl }));
      if (b.hl) { body.push(hl({ x: x - 3, y: fy - 3, w: bw + 6, h: 40 })); marks.push({ type: 'foot', cx: x + bw / 2, y: fy, text: b.hl }); }
      x -= 12;
    }
  }

  // 番号つきの説明と矢印を、画面の上から順に付ける
  const rank = { row: 0, left: 0, below: 0, foot: 1 };
  marks.sort((a, b) => rank[a.type] - rank[b.type] || (a.y ?? 0) - (b.y ?? 0));
  const notes = [];
  marks.forEach((m, i) => {
    const n = String(i + 1), label = `${n}. ${m.text}`, w = tw(label, 15) + 6;
    if (m.type === 'row') {
      if (w > ROWMAX) warnings.push(`${name}: 説明が長い「${m.text}」`);
      if (m.xEnd + 40 > NX - 10) warnings.push(`${name}: 矢印が短い「${m.text}」`);
      notes.push(arrow({ x1: NX - 10, y1: m.y, x2: m.xEnd + 8, y2: m.y }), note({ x: NX, y: m.y + 6, n, text: m.text, dark }));
    } else if (m.type === 'left') {
      if (26 + w > 270) warnings.push(`${name}: 説明が長い「${m.text}」`);
      notes.push(arrow({ x1: 26 + w + 8, y1: m.y, x2: m.xStart - 6, y2: m.y }), note({ x: 26, y: m.y + 6, n, text: m.text, dark }));
    } else if (m.type === 'below') {
      notes.push(arrow({ x1: m.x, y1: m.y + 34, x2: m.x, y2: m.y + 8 }), note({ x: m.x - 30, y: m.y + 54, n, text: m.text, dark }));
    } else {
      const atEdge = m.cx + w / 2 > WX + WW - 12; // 右端のボタンは、説明の右端をボタンの右端にそろえる
      notes.push(arrow({ x1: m.cx, y1: m.y - 26, x2: m.cx, y2: m.y - 8 }), note({ x: atEdge ? m.cx + 40 : m.cx, y: m.y - 32, n, text: m.text, dark, anchor: atEdge ? 'end' : 'middle' }));
    }
  });

  const frame = [];
  frame.push(dark ? S.darkWin({ x: WX, y: WY, w: WW, h: WH }) : S.win({ x: WX, y: WY, w: WW, h: WH }));
  frame.push(`<path d="M${WX} ${WY + 8}a8 8 0 0 1 8-8h${WW - 16}a8 8 0 0 1 8 8v${TB - 8}h-${WW}z" fill="${dark ? '#333' : '#e2e8f0'}" stroke="${dark ? '#555' : '#999'}" stroke-width="2"/>`);
  if (kind === 'browser') {
    frame.push(`<rect x="${WX + 90}" y="${WY + 8}" width="${WW - 180}" height="24" rx="12" fill="#fff" stroke="#999" stroke-width="1.5"/>`);
    frame.push(t(WX + 108, WY + 25, title, { size: 13, mono: true, fill: '#333' }));
  } else {
    frame.push(t(WX + 14, WY + 26, title, { size: 15, bold: true, fill: dark ? '#e6e6e6' : '#222' }));
  }
  frame.push(t(WX + WW - 20, WY + 27, '×', { size: 18, fill: dark ? '#ccc' : '#666' }));

  const alt = alts[name];
  if (!alt) warnings.push(`${name}: README に代替テキストがない`);
  return S.svg({
    W, H: WY + WH + 14,
    title: alt || title,
    desc: `${alt || title}。実際の画面を再現した図で、赤い枠と番号の説明が、この手順で操作する場所を示す。`,
    body: `  ${frame.join('\n  ')}\n  ${body.join('\n  ')}\n  ${notes.join('\n  ')}`,
  });
}

const h = (s) => ({ t: 'h', s }), p = (s, hl) => ({ t: 'p', s, hl }), n = (s) => ({ t: 'n', s });
const radio = (s, on, hl) => ({ t: 'radio', s, on, hl }), check = (s, on, hl) => ({ t: 'check', s, on, hl });
const field = (label, s, hl) => ({ t: 'field', label, s, hl }), sel = (label, s, hl) => ({ t: 'sel', label, s, hl });
const button = (s, hl) => ({ t: 'btn', s, hl }), file = (s, hl) => ({ t: 'file', s, hl }), cl = (s, hl) => ({ t: 'cl', s, hl });
const menu = (items) => ({ t: 'menu', items });
const NEXT = (text = '「Next」を押す') => [{ s: '< Back', off: 1 }, { s: 'Next >', hl: text }, { s: 'Cancel' }];
const INSTALL = [{ s: '< Back', off: 1 }, { s: 'Install', hl: '「Install」を押す' }, { s: 'Cancel' }];
const FINISH = [{ s: 'Finish', hl: '「Finish」を押す' }];
const KEEP = '何も変えずに「Next」を押す';
const GIT = 'Git Setup', TG = 'TortoiseGit Setup', LP = 'TortoiseGit Language Pack Setup';
const PC = 'USER01@PC MINGW64 ~';
const DL = (nm, hl) => [file(nm, hl), n('ダウンロードフォルダーの中身')];
const TGURL = 'https://tortoisegit.org/download/';
const GFW = 'https://gitforwindows.org/';

const S_ = [];
const add = (name, kind, title, items, footer, memo) => S_.push([name, kind, title, items, footer, memo]);

// 5-1 Git
add('setup-git-01-open-site', 'browser', GFW, [h('Git for Windows'), p('Windows で Git を使うための公式サイト'), button('Download')], null, '公式サイトを開く');
add('setup-git-02-download', 'browser', GFW, [h('Git for Windows'), p('Windows で Git を使うための公式サイト'), button('Download', '「Download」を押す')], null);
add('setup-git-03-launch', 'explorer', 'ダウンロード', DL('Git-(バージョン)-64-bit.exe', 'ダブルクリックする'), null);
add('setup-git-04-license', 'installer', GIT, [h('Information'), p('GNU General Public License'), n('使用許諾の文章が表示されている')], NEXT());
add('setup-git-05-destination', 'installer', GIT, [h('Select Destination Location'), p('Where should Git be installed?'), field('インストール先', 'C:\\Program Files\\Git')], NEXT(KEEP));
add('setup-git-06-components', 'installer', GIT, [h('Select Components'), check('Windows Explorer integration', true), check('Git LFS (Large File Support)', true), check('Associate .git* configuration files', true)], NEXT(KEEP));
add('setup-git-07-start-menu', 'installer', GIT, [h('Select Start Menu Folder'), p('Where should Setup place the shortcuts?'), field('フォルダー', 'Git')], NEXT(KEEP));
add('setup-git-08-editor', 'installer', GIT, [h('Choosing the default editor used by Git'), p('Select the editor.'), sel('エディター', "Use Notepad as Git's default editor", '「Notepad」を選ぶ')], NEXT());
add('setup-git-09-branch-name', 'installer', GIT, [h('Adjusting the name of the initial branch'), radio('Let Git decide', false), radio('Override the default branch name for new repositories', true, '「Override…」を選ぶ'), field('', 'main', 'main と入力する')], NEXT());
add('setup-git-10-path', 'installer', GIT, [h('Adjusting your PATH environment'), radio('Use Git from Git Bash only', false), radio('Git from the command line and also from 3rd-party software', true), radio('Use Git and optional Unix tools from the Command Prompt', false)], NEXT(KEEP));
add('setup-git-11-defaults', 'installer', GIT, [h('Configuring the line ending conversions'), radio('Checkout Windows-style, commit Unix-style line endings', true), radio('Checkout as-is, commit Unix-style line endings', false), radio('Checkout as-is, commit as-is', false), n('残りの画面も、何も変えずに「Next」を押して進める')], NEXT(KEEP));
add('setup-git-12-install', 'installer', GIT, [h('Ready to Install'), p('Setup is now ready to begin installing Git.'), n('これまでの選択内容が一覧で表示されている')], INSTALL);
add('setup-git-13-finish', 'installer', GIT, [h('Completing the Git Setup Wizard'), check('View Release Notes', false), n('インストールが終わった')], FINISH);
add('setup-git-14-open-bash', 'explorer', 'スタートメニュー', [menu([{ s: 'Git Bash', hl: '「Git Bash」を開く' }, { s: 'Git CMD' }, { s: 'Git GUI' }])], null);
add('setup-git-15-version', 'terminal', 'Git Bash', [cl(PC), cl('$ git --version', 'Enter キーを押す'), cl('git version (バージョン番号)')], null);
add('setup-git-16-set-name', 'terminal', 'Git Bash', [cl(PC), cl('$ git config --global user.name "あなたの名前"', 'Enter キーを押す')], null);
add('setup-git-17-set-email', 'terminal', 'Git Bash', [cl(PC), cl('$ git config --global user.email "you@example.com"', 'Enter キーを押す')], null);

// 5-2 TortoiseGit
add('setup-tortoise-01-open-site', 'browser', TGURL, [h('Download TortoiseGit'), p('Windows 用の Git 操作ソフト'), n('下の方に 32bit / 64bit のリンクがある')], null, '公式サイトを開く');
add('setup-tortoise-02-download', 'browser', TGURL, [h('Download TortoiseGit'), p('Windows 用の Git 操作ソフト'), p('TortoiseGit-(バージョン)-64bit.msi', '64bit 版を押す')], null);
add('setup-tortoise-03-launch', 'explorer', 'ダウンロード', DL('TortoiseGit-(バージョン)-64bit.msi', 'ダブルクリックする'), null);
add('setup-tortoise-04-welcome', 'installer', TG, [h('Welcome to the TortoiseGit Setup Wizard'), n('インストーラーの最初の画面')], NEXT());
add('setup-tortoise-05-license', 'installer', TG, [h('End-User License Agreement'), p('GNU General Public License'), n('使用許諾の文章が表示されている')], NEXT('内容を確かめて「Next」'));
add('setup-tortoise-06-ssh', 'installer', TG, [h('Custom Setup'), sel('SSH クライアント', 'TortoisePlink (default)'), n('SSH は、Git の相手と安全につなぐ方法')], NEXT(KEEP));
add('setup-tortoise-07-destination', 'installer', TG, [h('Destination Folder'), p('Install TortoiseGit to:'), field('', 'C:\\Program Files\\TortoiseGit\\')], NEXT(KEEP));
add('setup-tortoise-08-install', 'installer', TG, [h('Ready to install TortoiseGit'), n('これまでの選択内容でインストールする')], INSTALL);
add('setup-tortoise-09-finish', 'installer', TG, [h('Completed the TortoiseGit Setup Wizard'), n('インストールが終わった')], FINISH);
add('setup-tortoise-10-restart', 'installer', TG, [h('Restart required'), p('You must restart your computer to complete the setup.'), button('Restart now', '再起動する')], null);
const WIZ = 'TortoiseGit First Start Wizard';
const WIZNEXT = (text) => [{ s: 'Next >', hl: text }, { s: 'Cancel' }];
add('setup-tortoise-11-wizard-language', 'installer', WIZ, [h('Language'), sel('Language', 'English', '「English」のまま')], WIZNEXT('「Next」を押す'));
add('setup-tortoise-12-wizard-git-path', 'installer', WIZ, [h('Configure git.exe path'), field('Git の場所', 'C:\\Program Files\\Git\\cmd', '入っているか確かめる')], WIZNEXT('「Next」を押す'));
add('setup-tortoise-13-wizard-user', 'installer', WIZ, [h('Configure user information'), field('Name', 'あなたの名前', '5-1 の名前か確かめる'), field('Email', 'you@example.com', '5-1 のアドレスか確かめる')], WIZNEXT('「Next」を押す'));
add('setup-tortoise-14-wizard-finish', 'installer', WIZ, [h('Authentication and Credential Configuration'), n('何も変えない')], [{ s: 'Finish', hl: '「Finish」を押す' }, { s: 'Cancel' }]);
add('setup-tortoise-15-context-menu', 'explorer', 'フォルダー', [menu([{ s: 'New' }, { s: 'TortoiseGit', hl: '「TortoiseGit」が出る', sub: [{ s: 'Git Clone...' }, { s: 'Git Create repository here...' }, { s: 'Settings' }] }])], null);

// 5-3 日本語化
add('setup-lang-01-open-list', 'browser', TGURL, [h('Language Packs'), p('言語ごとのパックの一覧'), n('ダウンロードページの下の方にある')], null, '「Language Packs」の欄まで進む');
add('setup-lang-02-download', 'browser', TGURL, [h('Language Packs'), p('Chinese   Czech   Dutch   French   German'), p('Japanese   (64bit)', '64bit を押す')], null);
add('setup-lang-03-launch', 'explorer', 'ダウンロード', DL('TortoiseGit-LanguagePack-(バージョン)-64bit-ja.msi', 'ダブルクリックする'), null);
add('setup-lang-04-welcome', 'installer', LP, [h('Welcome to the Language Pack Setup Wizard'), n('インストーラーの最初の画面')], NEXT());
add('setup-lang-05-install', 'installer', LP, [h('Ready to install'), n('日本語の言語パックを入れる')], INSTALL);
add('setup-lang-06-finish', 'installer', LP, [h('Completed the Language Pack Setup Wizard'), n('インストールが終わった')], FINISH);
add('setup-lang-07-open-settings', 'explorer', 'フォルダー', [menu([{ s: 'New' }, { s: 'TortoiseGit', hl: '「TortoiseGit」を選ぶ', sub: [{ s: 'Git Clone...' }, { s: 'Git Create repository here...' }, { s: 'Settings', hl: '「Settings」を選ぶ' }] }])], null);
add('setup-lang-08-select-language', 'installer', 'Settings - TortoiseGit', [n('左の一覧で「General」を選んだ状態'), h('General'), sel('Language', '日本語', '日本語にする')], [{ s: 'OK', hl: '「OK」を押す' }, { s: 'Cancel' }]);
add('setup-lang-09-confirm', 'explorer', 'フォルダー', [menu([{ s: '新規' }, { s: 'TortoiseGit', hl: '日本語になった', sub: [{ s: 'クローン...' }, { s: 'ここにリポジトリを作成...' }, { s: '設定' }] }])], null);

for (const [name, kind, title, items, footer, memo] of S_) S.write(name, render(name, kind, title, items, footer, memo));
const missing = Object.keys(alts).filter((k) => !S_.some((s) => s[0] === k));
if (missing.length) warnings.push('図が未作成: ' + missing.join(', '));
console.log(`${S_.length} 枚を書き出した`);
if (warnings.length) console.log('警告:\n' + warnings.join('\n'));
