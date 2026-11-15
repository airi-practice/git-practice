// 2-6-usestate: ふつうの変数を書き換えても画面は変わらず、useState の set 関数で書き換えると画面が作り直される対比。
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const y = 20;
const panel = (x, color, title, code, codeNote, mid, midOk, screen, bold, note) => {
  const c = C[color], cx = x + 210;
  return `
${L.card({ x, y, w: 420, h: 456, color, title })}
  ${L.badge({ cx: x + 30, cy: y + 96, n: '1', color })}
  <rect x="${x + 50}" y="${y + 64}" width="340" height="62" rx="10" fill="${c.light}" stroke="${c.main}" stroke-width="1.5"/>
  ${t(cx + 10, y + 91, code, { mono: true, bold: true, fill: c.dark })}
  ${t(cx + 10, y + 114, codeNote, { size: SIZE.note, fill: C.gray.dark })}
  ${L.arrow({ x1: cx + 10, y1: y + 130, x2: cx + 10, y2: y + 160, color: 'gray', width: 4 })}
  ${L.badge({ cx: x + 30, cy: y + 184, n: '2', color })}
  <rect x="${x + 50}" y="${y + 162}" width="340" height="44" rx="10" fill="${midOk ? c.light : '#f1f5f9'}" stroke="${midOk ? c.main : LINE}" stroke-width="1.5"${midOk ? '' : ' stroke-dasharray="6,4"'}/>
  ${t(cx + 10, y + 190, mid, { fill: midOk ? c.dark : C.gray.dark, bold: midOk })}
  ${L.arrow({ x1: cx + 10, y1: y + 210, x2: cx + 10, y2: y + 240, color: 'gray', width: 4 })}
  ${L.badge({ cx: x + 30, cy: y + 290, n: '3', color })}
${screen(x + 70, y + 244)}
  ${t(cx, y + 406, bold, { bold: true, fill: c.dark })}
  ${t(cx, y + 430, note, { size: SIZE.note, fill: SUB })}`;
};
const LINE = '#94a3b8';
const win = (x, y, h, inner) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="280" height="${h}" rx="10" fill="url(#screen)" stroke="${C.blue.main}" stroke-width="1.5"/></g>
  ${inner}`;
const left = (x, y) => win(x, y, 108, `${t(x + 16, y + 30, '商品一覧', { bold: true, anchor: 'start' })}
  ${t(x + 16, y + 62, '読み込み中...', { anchor: 'start' })}
  ${t(x + 16, y + 92, '（画面の表示）', { size: SIZE.note, fill: SUB, anchor: 'start' })}`);
const right = (x, y) => win(x, y, 136, `${t(x + 16, y + 26, '商品一覧', { bold: true, anchor: 'start' })}
  <rect x="${x + 15}" y="${y + 36}" width="250" height="24" fill="#cbd5e1"/>
  ${t(x + 22, y + 53, '商品ID　商品名　価格　在庫数', { size: SIZE.note, anchor: 'start' })}
  <rect x="${x + 15}" y="${y + 60}" width="250" height="24" fill="#ffffff" stroke="#e2e8f0"/>
  ${t(x + 22, y + 77, '1　　　商品の行　…', { size: SIZE.note, anchor: 'start' })}
  <rect x="${x + 15}" y="${y + 84}" width="250" height="24" fill="#ffffff" stroke="#e2e8f0"/>
  ${t(x + 22, y + 101, '2　　　商品の行　…', { size: SIZE.note, anchor: 'start' })}
  ${t(x + 16, y + 126, '（画面の表示）', { size: SIZE.note, fill: SUB, anchor: 'start' })}`);
const body = panel(20, 'red', 'ふつうの変数を書き換えた場合', 'products = 商品の一覧', '変数の値を書き換える', 'React には知らされないので、何も起きない', false, left,
  '値は変わったのに、画面は「読み込み中...」のまま', '画面は、作り直されないと変わらないんだ')
  + panel(460, 'blue', 'useState の set 関数で書き換えた場合', 'setProducts(商品の一覧)', 'set 関数で、状態を書き換える', 'React が気づいて、部品をもう一度実行する', true, right,
  '画面が作り直されて、表が表示される', 'だから、画面に出す値は useState で持つんだ');
const y0 = 492;
L.write('2-6-usestate', L.svg({
  y0,
  title: 'ふつうの変数を書き換えても画面は変わらず、useState の set 関数で書き換えると画面が作り直される対比',
  desc: '左は、ふつうの変数 products を書き換えても React には知らされないので何も起きず、画面は「読み込み中...」のままになる。右は、useState の set 関数 setProducts で状態を書き換えると、React が気づいて部品をもう一度実行し、画面が作り直されて商品一覧の表が表示される。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'think', lines: ['画面に出す値は、useStateで持つんだ。', '変わると画面が作り直されるよ。'] }),
}));
