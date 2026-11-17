// GitHub の Web 画面（リポジトリのページ・PR の作成・PR のページ・マージ）を、模擬図として書き出す。
// 実際の画面の英語の表示に近づけた上で、押す場所を赤い枠と番号で示す（08章の手順と対応）。
// 部品は tools/svg/github-mock.js。作り直すには: node tools/svg/builds-readme/build-github-screens.js （docs/images/github-*.svg を書き出す）
const M = require('../github-mock');
const { G, W, gt, cw, bw, bar, caret, line, btn, avatar, icon, frame, appHeader, repoTitle, repoTabs, prHead, prTabs, comment, sidebar, outA } = M;
const { t } = M.S;

const URL = 'https://github.com/your-org/git-practice-exercise';
const CRUMB = ['your-org', 'git-practice-exercise'];

// ---- 1. プッシュ後のリポジトリのページ（Compare & pull request のバナー） ----
{
  const H = 520;
  let b = frame(H, URL) + appHeader(CRUMB);
  b += `\n  ${repoTitle(138)}${repoTabs(180, 'code')}`;
  b += `\n  <rect x="40" y="212" width="820" height="62" rx="6" fill="#fff8c5" stroke="#d4a72c"/>${icon.branch(58, 234, '#7d5600')}`;
  b += `${gt(84, 248, 'ks/banana', { bold: true })}${gt(168, 248, 'had recent pushes less than a minute ago')}${btn(646, 228, 200, 'Compare & pull request')}`;
  // ブランチの行
  b += `\n  ${bar(40, 292, 110, 32, G.head)}${icon.branch(50, 300)}${gt(72, 313, 'main', { size: 13, bold: true })}${caret(130, 304)}`;
  b += `${icon.branch(172, 300)}${gt(194, 313, '1 Branch', { size: 13, bold: true })}${gt(268, 313, '0 Tags', { size: 13, fill: G.sub })}`;
  b += `${bar(470, 292, 140, 32)}${icon.magnifier(480, 300)}${gt(504, 313, 'Go to file', { size: 13, fill: G.sub })}${btn(620, 292, 92, 'Add file', { primary: false, caret: true, size: 13 })}`;
  b += `${btn(720, 292, 140, 'Code', { caret: true, size: 13 })}${icon.code(738, 301)}`;
  // ファイルの一覧
  b += `\n  ${bar(40, 340, 820, 168)}<path d="M41,380 v-34 a5,5 0 0 1 5,-5 h808 a5,5 0 0 1 5,5 v34 z" fill="${G.head}"/>${line(41, 380, 859, 380)}`;
  b += `${avatar(62, 360, 11, 'yn')}${gt(82, 365, 'your-name', { size: 13, bold: true })}${gt(172, 365, 'Initial commit', { size: 13, fill: G.sub })}${gt(850, 365, '2 days ago', { size: 13, fill: G.sub, anchor: 'end' })}`;
  b += `${icon.folder(54, 392)}${gt(84, 406, 'practice', { size: 14 })}${gt(300, 406, 'Add practice folder', { size: 13, fill: G.sub })}${gt(850, 406, '2 days ago', { size: 13, fill: G.sub, anchor: 'end' })}${line(41, 422, 859, 422)}`;
  b += `${icon.file(54, 434)}${gt(84, 448, 'README.md', { size: 14 })}${gt(300, 448, 'Initial commit', { size: 13, fill: G.sub })}${gt(850, 448, '2 days ago', { size: 13, fill: G.sub, anchor: 'end' })}`;
  outA('github-01-compare-banner', H, 'GitHub のリポジトリのページ（プッシュ後）',
    'GitHub の演習用リポジトリのページ。コードのタブの上に、黄色い帯で「ks/banana had recent pushes less than a minute ago」と出て、右に緑の「Compare & pull request」ボタンがある。', b, [
      { n: 1, x: 646, y: 228, w: 200, h: 32, text: '黄色い帯の「Compare & pull request」ボタンを押す' },
    ]);
}

// ---- 2. PR の作成フォーム ----
const form = (name, title, desc, o) => {
  const H = 650;
  let b = frame(H, `${URL}/compare/${o.compareUrl}`) + appHeader(CRUMB);
  b += `\n  ${gt(40, 142, 'Open a pull request', { size: 24 })}${gt(40, 168, 'Create a new pull request by comparing changes across two branches.', { size: 13, fill: G.sub })}`;
  const bwBase = bw('base: ' + o.base), cx = 40 + bwBase + 50, bwCmp = bw('compare: ' + o.compare);
  b += `\n  ${bar(40, 186, bwBase, 34, G.head)}${gt(52, 208, 'base: ' + o.base, { bold: true })}${caret(40 + bwBase - 16, 200)}`;
  b += `<path d="M${cx - 16},203 H${cx - 38} M${cx - 32},197 l-6,6 l6,6" stroke="${G.sub}" stroke-width="2" fill="none"/>`;
  b += `${bar(cx, 186, bwCmp, 34, G.head)}${gt(cx + 12, 208, 'compare: ' + o.compare, { bold: true })}${caret(cx + bwCmp - 16, 200)}`;
  b += `${gt(40, 244, '✔ Able to merge.', { size: 13, bold: true, fill: G.open })}${gt(160, 244, 'These branches can be automatically merged.', { size: 13, fill: G.sub })}`;
  b += `\n  ${avatar(58, 288, 18, 'ks')}${bar(88, 266, 532, 40)}${gt(102, 292, o.title)}`;
  b += `\n  ${bar(88, 320, 532, 250)}<path d="M89,356 v-30 a5,5 0 0 1 5,-5 h520 a5,5 0 0 1 5,5 v30 z" fill="${G.head}"/>${line(89, 356, 619, 356)}${gt(104, 344, 'Write', { bold: true })}${gt(160, 344, 'Preview', { fill: G.sub })}`;
  b += `${gt(104, 386, 'H', { bold: true, fill: G.sub })}${gt(134, 386, 'B', { bold: true, fill: G.sub })}${gt(162, 386, 'I', { fill: G.sub })}${gt(190, 386, '“', { bold: true, fill: G.sub })}${gt(214, 386, '<>', { mono: 1, fill: G.sub })}${gt(246, 386, 'link', { size: 13, fill: G.sub })}${gt(290, 386, '• list', { size: 13, fill: G.sub })}${line(89, 398, 619, 398)}`;
  o.body.forEach((l, i) => { b += gt(104, 416 + i * 19, l, { size: 13 }); });
  b += `${line(89, 544, 619, 544)}${gt(104, 562, 'Markdown is supported', { size: 12, fill: G.sub })}${gt(610, 562, 'Paste, drop, or click to add files', { size: 12, fill: G.sub, anchor: 'end' })}`;
  b += `\n  ${btn(436, 586, 150, 'Create pull request')}${bar(586, 586, 34, 32, G.green, '#1b7f37')}${caret(597, 600, '#fff')}`;
  b += `\n  ${sidebar(650, 262)}`;
  outA(name, H, title, desc, b, o.items(cx, bwBase, bwCmp));
};
form('github-02-pr-form', 'GitHub の PR を作る画面（体験①）',
  'GitHub の「Open a pull request」の画面。base が main、compare が ks/banana になっている。タイトルの欄と説明の欄に決められた文章を貼り、緑の「Create pull request」ボタンを押す。', {
    base: 'main', compare: 'ks/banana', compareUrl: 'main...ks/banana', title: '演習①: wishlist-ks.txt を追加',
    body: ['演習①のPRです。', 'practice/wishlist-ks.txt を新規作成しました。', '', '---', '【講師向け】確認後の後片付け', '1. PRのページ下部の「Close pull request」を押す', '2. 「Delete branch」を押して、ブランチを削除する'],
    items: (cx, bwBase, bwCmp) => [
      { n: 1, x: 40, y: 186, w: bwBase, h: 34, text: 'base が main(取り込み先)になっている' },
      { n: 2, x: cx, y: 186, w: bwCmp, h: 34, text: 'compare が自分のブランチ(取り込みたい内容)になっている' },
      { n: 3, x: 88, y: 266, w: 532, h: 40, text: 'タイトルの欄に、決められたタイトルを入れる' },
      { n: 4, x: 88, y: 320, w: 532, h: 250, text: '説明の欄に、決められた説明を貼る' },
      { n: 5, x: 436, y: 586, w: 150, h: 32, text: '「Create pull request」を押す' },
    ],
  });

// ---- 3. 作った PR のページ ----
{
  const H = 640;
  let b = frame(H, `${URL}/pull/12`) + appHeader(CRUMB);
  const h = prHead(146, '演習①: wishlist-ks.txt を追加', '12', 'Open', 'main', 'ks/banana');
  const c = comment(262, 'ks commented now', ['演習①のPRです。', 'practice/wishlist-ks.txt を新規作成しました。', '', '---', '【講師向け】確認後の後片付け', '1. PRのページ下部の「Close pull request」を押す', '2. 「Delete branch」を押して、ブランチを削除する']);
  b += `\n  ${h.svg}${prTabs(236, 'conv')}${c.svg}`;
  const y2 = 262 + c.h + 24;
  b += `\n  ${avatar(58, y2 + 20, 18, 'ks')}${bar(88, y2, 532, 140)}<path d="M89,${y2 + 36} v-26 a5,5 0 0 1 5,-5 h520 a5,5 0 0 1 5,5 v26 z" fill="${G.head}"/>${line(89, y2 + 36, 619, y2 + 36)}${gt(104, y2 + 24, 'Add a comment', { bold: true })}`;
  b += `${bar(102, y2 + 48, 504, 50)}${gt(114, y2 + 70, 'Add your comment here...', { size: 13, fill: G.sub })}${btn(372, y2 + 106, 150, 'Close pull request', { primary: false, size: 13, h: 28 })}${btn(530, y2 + 106, 76, 'Comment', { size: 13, h: 28 })}`;
  b += `\n  ${sidebar(650, 262)}`;
  outA('github-03-pr-created', H, 'GitHub の作った PR のページ（体験①）',
    'PR を作った後のページ。上のアドレス欄に PR の URL(…/pull/12)が出て、タイトルの下に緑の「Open」と「ks wants to merge 1 commit into main from ks/banana」が出る。', b, [
      { n: 1, x: 86, y: 7, w: W - 110, h: 30, text: 'アドレス欄の URL が、この PR の URL。ここをコピーする' },
      { n: 2, ...h.badge, text: '「Open」と出ている(まだ main に取り込まれていない)' },
    ]);
}

// ---- 4. 変更されたファイル（差分） ----
{
  const H = 520;
  let b = frame(H, `${URL}/pull/13/files`) + appHeader(CRUMB);
  const h = prHead(146, '演習②: sample-menu.txt の2行目を書き換え', '13', 'Open', 'main', 'ks/banana-2');
  b += `\n  ${h.svg}${prTabs(236, 'files')}`;
  b += `\n  ${gt(40, 286, 'Showing 1 changed file with 1 addition and 1 deletion.', { size: 13, fill: G.sub })}${btn(700, 268, 160, 'Review changes', { caret: true, size: 13, h: 30 })}`;
  b += `\n  ${bar(40, 304, 820, 190)}<path d="M41,342 v-32 a5,5 0 0 1 5,-5 h808 a5,5 0 0 1 5,5 v32 z" fill="${G.head}"/>${line(41, 342, 859, 342)}`;
  b += `${gt(56, 329, 'practice/sample-menu.txt', { bold: true })}${gt(700, 329, '+1', { size: 13, bold: true, fill: G.open, anchor: 'end' })}${gt(726, 329, '−1', { size: 13, bold: true, fill: G.red, anchor: 'end' })}${bar(760, 314, 84, 24)}${gt(802, 331, 'Viewed', { size: 12, fill: G.sub, anchor: 'middle' })}`;
  const row = (y, bg, n1, n2, s) => `<rect x="41" y="${y}" width="818" height="30" fill="${bg}"/>${t(88, y + 21, n1, { size: 13, mono: 1, fill: G.sub, anchor: 'end' })}${t(128, y + 21, n2, { size: 13, mono: 1, fill: G.sub, anchor: 'end' })}${t(150, y + 21, s, { size: 14, fill: G.text })}`;
  b += row(344, '#ffffff', '1', '1', '  ランチのメニュー') + row(374, '#ffebe9', '2', '', '- カレーライス') + row(404, '#dafbe1', '', '2', '+ ラーメン') + row(434, '#ffffff', '3', '3', '  うどん');
  outA('github-04-files-changed', H, 'GitHub の PR の変更内容の画面（体験②）',
    'PR の「Files changed」タブ。practice/sample-menu.txt の2行目が、赤い行(消えた行)の「カレーライス」から、緑の行(増えた行)の「ラーメン」に変わったことが分かる。', b, [
      { n: 1, x: 342, y: 220, w: 124, h: 22, text: '「Files changed」のタブを開く' },
      { n: 2, x: 41, y: 374, w: 818, h: 30, text: '赤い行が、消えた行(書き換える前)' },
      { n: 3, x: 41, y: 404, w: 818, h: 30, text: '緑の行が、増えた行(書き換えた後)' },
    ]);
}

// ---- 5. ③: 取り込み先(base)を切り替える ----
{
  const H = 500;
  let b = frame(H, `${URL}/compare/main...ks/banana-3`) + appHeader(CRUMB);
  b += `\n  ${gt(40, 142, 'Open a pull request', { size: 24 })}${gt(40, 168, 'Create a new pull request by comparing changes across two branches.', { size: 13, fill: G.sub })}`;
  const bwBase = bw('base: main'), cx = 40 + bwBase + 50, bwCmp = bw('compare: ks/banana-3');
  b += `\n  ${bar(40, 186, bwBase, 34, G.head)}${gt(52, 208, 'base: main', { bold: true })}${caret(40 + bwBase - 16, 200)}`;
  b += `<path d="M${cx - 16},203 H${cx - 38} M${cx - 32},197 l-6,6 l6,6" stroke="${G.sub}" stroke-width="2" fill="none"/>${bar(cx, 186, bwCmp, 34, G.head)}${gt(cx + 12, 208, 'compare: ks/banana-3', { bold: true })}${caret(cx + bwCmp - 16, 200)}`;
  b += `\n  ${bar(40, 226, 320, 250, '#ffffff', G.line, 8)}${gt(56, 252, 'Choose a base branch', { bold: true })}${bar(54, 264, 292, 30)}${icon.magnifier(62, 271)}${gt(86, 284, 'Filter branches', { size: 13, fill: G.sub })}`;
  b += `${gt(66, 322, 'Branches', { size: 13, bold: true })}<rect x="60" y="328" width="62" height="3" rx="1.5" fill="${G.tab}"/>${gt(150, 322, 'Tags', { size: 13, fill: G.sub })}${line(41, 332, 359, 332)}`;
  b += `${gt(62, 360, '✔', { size: 14 })}${gt(86, 360, 'main', { size: 14 })}${gt(86, 392, 'ks/banana', { size: 14 })}<rect x="42" y="404" width="316" height="32" fill="#ddf4ff"/>${gt(86, 426, 'ks/banana-2', { size: 14, bold: true })}${gt(86, 458, 'ks/banana-3', { size: 14, fill: G.sub })}`;
  outA('github-05a-change-base', H, 'GitHub の PR を作る画面（体験③: 取り込み先を切り替える）',
    'PR を作る画面で、base: main のボタンを押すと、ブランチの一覧が開く。この中から ks/banana-2(②のブランチ)を選ぶ。', b, [
      { n: 1, x: 40, y: 186, w: bwBase, h: 34, text: '「base: main」のボタンを押して、一覧を開く' },
      { n: 2, x: 42, y: 404, w: 316, h: 32, text: '一覧から、②のブランチ(ks/banana-2)を選ぶ' },
    ]);
}
form('github-05b-pr-form-third', 'GitHub の PR を作る画面（体験③）',
  'base が ks/banana-2、compare が ks/banana-3 になっている PR の作成画面。base が main のままでないことを確かめてから、緑の「Create pull request」ボタンを押す。', {
    base: 'ks/banana-2', compare: 'ks/banana-3', compareUrl: 'ks/banana-2...ks/banana-3', title: '演習③: sample-menu.txt に4行目を追加',
    body: ['演習③のPRです。', 'practice/sample-menu.txt に4行目を追加しました。', '取り込み先は、②のブランチ(ks/banana-2)です。', '', '---', '【講師向け】確認後の後片付け', '1. 「Delete branch」を押して、ブランチを削除する'],
    items: (cx, bwBase, bwCmp) => [
      { n: 1, x: 40, y: 186, w: bwBase, h: 34, text: 'base が ks/banana-2(②のブランチ)。main ではない' },
      { n: 2, x: cx, y: 186, w: bwCmp, h: 34, text: 'compare が ks/banana-3(③のブランチ)' },
      { n: 3, x: 88, y: 266, w: 532, h: 40, text: 'タイトルの欄に、決められたタイトルを入れる' },
      { n: 4, x: 88, y: 320, w: 532, h: 250, text: '説明の欄に、決められた説明を貼る' },
      { n: 5, x: 436, y: 586, w: 150, h: 32, text: '1 と 2 を確かめてから、「Create pull request」を押す' },
    ],
  });

// ---- 6〜8. ③: マージ ----
const thirdPr = (state) => {
  const h = prHead(146, '演習③: sample-menu.txt に4行目を追加', '14', state, 'ks/banana-2', 'ks/banana-3');
  const c = comment(262, state === 'Merged' ? 'ks commented 1 minute ago' : 'ks commented now', ['演習③のPRです。', 'practice/sample-menu.txt に4行目を追加しました。', '取り込み先は、②のブランチ(ks/banana-2)です。']);
  return { h, c, top: `${h.svg}${prTabs(236, 'conv')}${c.svg}${sidebar(650, 262)}`, y2: 262 + c.h + 24 };
};
{
  const H = 600, p = thirdPr('Open');
  let b = frame(H, `${URL}/pull/14`) + appHeader(CRUMB) + `\n  ${p.top}`;
  const y2 = p.y2;
  b += `\n  ${bar(40, y2, 580, 124)}<circle cx="72" cy="${y2 + 32}" r="14" fill="${G.green}"/><path d="M65,${y2 + 32} l5,5 l9,-10" stroke="#fff" stroke-width="2.5" fill="none"/>${gt(100, y2 + 30, 'This branch has no conflicts with the base branch', { bold: true })}${gt(100, y2 + 52, 'Merging can be performed automatically.', { size: 13, fill: G.sub })}`;
  b += `${btn(56, y2 + 66, 188, 'Merge pull request', { caret: true })}${gt(56, y2 + 112, 'You can also merge this with the command line.', { size: 12, fill: G.sub })}${gt(340, y2 + 112, 'View command line instructions.', { size: 12, fill: G.link })}`;
  outA('github-06-merge-button', H, 'GitHub の PR のページ（体験③: マージする）',
    '体験③の PR のページ。「ks wants to merge 1 commit into ks/banana-2 from ks/banana-3」と出て、下に緑の「Merge pull request」ボタンがある。', b, [
      { n: 1, x: p.h.base.x - 4, y: p.h.base.y - 2, w: p.h.base.w + 8, h: p.h.base.h + 4, text: '取り込み先が ks/banana-2(②のブランチ)になっている' },
      { n: 2, x: 56, y: y2 + 66, w: 188, h: 32, text: '緑の「Merge pull request」ボタンを押す' },
    ]);
}
{
  const H = 620, p = thirdPr('Open');
  let b = frame(H, `${URL}/pull/14`) + appHeader(CRUMB) + `\n  ${p.top}`;
  const y2 = p.y2;
  b += `\n  ${bar(40, y2, 580, 186)}${bar(56, y2 + 14, 548, 32)}${gt(68, y2 + 35, 'Merge pull request #14 from your-org/ks/banana-3', { size: 13 })}`;
  b += `${bar(56, y2 + 56, 548, 56)}${gt(68, y2 + 78, 'Add an optional extended description…', { size: 13, fill: G.sub })}`;
  b += `${btn(56, y2 + 126, 140, 'Confirm merge')}${btn(206, y2 + 126, 90, 'Cancel', { primary: false })}`;
  outA('github-07-confirm-merge', H, 'GitHub のマージの確認の画面（体験③）',
    '「Merge pull request」を押すと、マージのメッセージを入れる欄と、「Confirm merge」「Cancel」のボタンが出る。緑の「Confirm merge」ボタンを押すと、マージが実行される。', b, [
      { n: 1, x: 56, y: y2 + 126, w: 140, h: 32, text: '緑の「Confirm merge」ボタンを押す(メッセージはそのままでいい)' },
    ]);
}
{
  const H = 580, p = thirdPr('Merged');
  let b = frame(H, `${URL}/pull/14`) + appHeader(CRUMB) + `\n  ${p.top}`;
  const y2 = p.y2;
  b += `\n  ${bar(40, y2, 580, 100, '#fbefff', '#c297ff')}<circle cx="72" cy="${y2 + 32}" r="14" fill="${G.merged}"/><path d="M66,${y2 + 38} v-12 M66,${y2 + 32} q10,0 12,-8" stroke="#fff" stroke-width="2.2" fill="none"/>`;
  b += `${gt(100, y2 + 30, 'Pull request successfully merged and closed', { bold: true })}${gt(100, y2 + 52, 'You’re all set — the ks/banana-3 branch can be safely deleted.', { size: 13, fill: G.sub })}${btn(100, y2 + 62, 120, 'Delete branch', { primary: false, size: 13, h: 28 })}`;
  outA('github-08-merged', H, 'GitHub のマージが終わった PR のページ（体験③）',
    'マージが終わった PR のページ。タイトルの下の表示が、紫の「Merged」に変わり、「ks merged 1 commit into ks/banana-2 from ks/banana-3」と出る。「Pull request successfully merged and closed」と表示される。', b, [
      { n: 1, ...p.h.badge, text: '紫の「Merged」に変わっている。③の変更が、②のブランチに取り込まれた' },
    ]);
}
