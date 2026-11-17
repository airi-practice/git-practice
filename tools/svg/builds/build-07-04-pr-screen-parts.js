// 07章: GitHub の PR 画面(会話タブと、変更されたファイルタブ)で見られるものを見せる図。
const L = require('../rich-lib');
const { C, t, SIZE } = L;

const GH = { line: '#d0d7de', text: '#1f2328', sub: '#59636e', link: '#0969da', green: '#1a7f37', head: '#f6f8fa', tab: '#fd8c73' };
const g = (x, y, s, o = {}) => t(x, y, s, { size: SIZE.note, fill: GH.text, ...o });
const mono = (x, y, s, o = {}) => g(x, y, s, { mono: true, ...o });
const pill = (x, y, w, s) => `<rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="#ddf4ff"/>${mono(x + w / 2, y + 16, s, { fill: GH.link })}`;
const frame = (x, y, w, h) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#ffffff" stroke="${GH.line}" stroke-width="1.5"/></g>`;
const tabs = (x, y, items) => {
  let s = `<line x1="${x + 8}" y1="${y + 30}" x2="${x + 392}" y2="${y + 30}" stroke="${GH.line}"/>`;
  let cx = x + 16;
  items.forEach(([label, on, w]) => {
    s += g(cx, y + 20, label, { anchor: 'start', bold: on });
    if (on) s += `<rect x="${cx - 4}" y="${y + 28}" width="${w}" height="3" rx="1.5" fill="${GH.tab}"/>`;
    cx += w + 14;
  });
  return s;
};

// 左: Conversation タブ
const LX = 30, TOP = 62;
const left = `
  ${t(LX + 210, 78, 'Conversation(会話)タブ', { size: SIZE.body, bold: true })}
  ${frame(LX, TOP + 28, 420, 270)}
  ${L.badge({ cx: LX + 22, cy: TOP + 66, n: '1', color: 'p1' })}
  ${t(LX + 44, TOP + 72, 'Add my wishlist', { size: SIZE.head, bold: true, anchor: 'start', fill: GH.text })}
  ${t(LX + 206, TOP + 72, '#1', { size: SIZE.head, anchor: 'start', fill: GH.sub })}
  <rect x="${LX + 44}" y="${TOP + 88}" width="56" height="24" rx="12" fill="${GH.green}"/>${g(LX + 72, TOP + 105, 'Open', { fill: '#ffffff', bold: true })}
  ${L.badge({ cx: LX + 22, cy: TOP + 138, n: '2', color: 'p1' })}
  ${g(LX + 44, TOP + 143, 'ks wants to merge 1 commit into', { anchor: 'start' })}${pill(LX + 246, TOP + 126, 48, 'main')}
  ${g(LX + 44, TOP + 171, 'from', { anchor: 'start' })}${pill(LX + 80, TOP + 154, 88, 'ks/banana')}
  ${tabs(LX, TOP + 182, [['Conversation', true, 92], ['Commits', false, 56], ['Files changed', false, 92]])}
  <rect x="${LX + 16}" y="${TOP + 228}" width="388" height="58" rx="6" fill="#ffffff" stroke="${GH.line}"/>
  <path d="M${LX + 16} ${TOP + 252} v-18 a6 6 0 0 1 6 -6 h376 a6 6 0 0 1 6 6 v18 z" fill="${GH.head}" stroke="${GH.line}"/>
  ${g(LX + 28, TOP + 246, 'ks commented now', { anchor: 'start', fill: GH.sub })}
  ${L.badge({ cx: LX + 388, cy: TOP + 240, n: '1', color: 'p1' })}
  ${g(LX + 28, TOP + 274, 'ほしいものリストを追加しました', { anchor: 'start' })}`;

// 右: Files changed タブ
const RX = 470;
const row = (y, bg, n1, n2, text) =>
  `<rect x="${RX + 16}" y="${y}" width="368" height="26" fill="${bg}"/>${mono(RX + 40, y + 18, n1, { anchor: 'end', fill: GH.sub })}${mono(RX + 76, y + 18, n2, { anchor: 'end', fill: GH.sub })}${mono(RX + 92, y + 18, text, { anchor: 'start' })}`;
const right = `
  ${t(RX + 200, 78, 'Files changed(変更されたファイル)タブ', { size: SIZE.body, bold: true })}
  ${frame(RX, TOP + 28, 400, 270)}
  ${tabs(RX, TOP + 36, [['Conversation', false, 92], ['Commits', false, 56], ['Files changed', true, 92]])}
  <rect x="${RX + 16}" y="${TOP + 106}" width="368" height="170" rx="6" fill="#ffffff" stroke="${GH.line}"/>
  <path d="M${RX + 16} ${TOP + 136} v-24 a6 6 0 0 1 6 -6 h356 a6 6 0 0 1 6 6 v24 z" fill="${GH.head}" stroke="${GH.line}"/>
  ${L.badge({ cx: RX + 40, cy: TOP + 122, n: '3', color: 'p1' })}
  ${mono(RX + 60, TOP + 127, 'memo.txt', { anchor: 'start', bold: true })}
  ${row(TOP + 146, '#ffffff', '1', '1', '  りんご')}
  ${row(TOP + 172, '#ffebe9', '2', '', '- みかん')}
  ${row(TOP + 198, '#dafbe1', '', '2', '+ ぶどう')}
  ${row(TOP + 224, '#ffffff', '3', '3', '  バナナ')}`;

const legend = [
  ['1', 'タイトルと説明: 何のための変更なのかが分かる'],
  ['2', '向き: 取り込み先(main)と、取り込みたい内容のブランチ(ks/banana)'],
  ['3', '変更内容: 緑の行が増えた行、赤の行が消えた行'],
];
let leg = '';
legend.forEach(([n, s], i) => {
  const y = 400 + i * 34;
  leg += `\n  ${L.badge({ cx: 50, cy: y, n, color: 'p1' })}\n  ${t(72, y + 5, s, { anchor: 'start' })}`;
});

const y0 = 480;
const body = `
  ${t(450, 38, 'PR の画面で見られるもの', { size: SIZE.title, bold: true })}${left}${right}${leg}`;

L.write('07-04-pr-screen-parts', L.svg({
  y0,
  title: 'GitHub の PR の画面で見られる、タイトルと説明、取り込み先と取り込む内容の向き、変更内容の3つを示す模擬図',
  desc: '左は Conversation タブで、1 PR のタイトルと説明、2 ks/banana のブランチを main に取り込みたいという向きが見える。右は Files changed タブで、3 memo.txt の変更内容が見え、消えた行は赤、増えた行は緑で示される。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['PR の画面を見れば、何をどう変えたのかが', '確認できるんだ。変更内容は、赤が消えた行、', '緑が増えた行だよ。'] }),
}));
