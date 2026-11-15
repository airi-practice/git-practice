// 9-6-wiring: MessagePage の入力欄・ボタン・表示領域が、状態 input・関数 handleShow・状態 message と、どうつながるかを示す。
// 色: 入力欄=p1・ボタン=p2・表示領域=p3（9-4 と同じ番号と色）。状態と関数は画面側（フロントエンド）なので青。矢印は送る側が決まらないので灰
const L = require('../rich-lib');
const { C, t, SIZE, SUB, TEXT } = L;

const code = (x, y, s) => t(x, y, s, { size: SIZE.note, mono: true, anchor: 'start' });
// コードの名前を見出しにするカード（card と同じ形で、見出しだけ等幅）
const mcard = ({ x, y, w, h, color, title }) => L.card({ x, y, w, h, color, title: '' }) + '\n  '
  + t(x + w / 2, y + 31, title, { size: SIZE.head, bold: true, mono: true, fill: '#ffffff' });
// 矢印に付ける、番号バッジ付きの説明。stacked なら、バッジを文字の上に置く
const lab = (cx, y, n, s, o = {}) => o.stacked
  ? `${L.badge({ cx, cy: y - 22, n, color: 'gray' })}\n  ${t(cx, y, s, { size: SIZE.note, bold: true, mono: o.mono, fill: C.gray.dark })}`
  : `${L.badge({ cx: cx - 130, cy: y - 5, n, color: 'gray' })}\n  ${t(cx - 110, y, s, { size: SIZE.note, bold: true, anchor: 'start', fill: C.gray.dark })}`;

const body = `
  ${t(190, 38, '画面の部品（JSX）', { size: SIZE.head, bold: true })}
  ${t(735, 38, '画面が覚えておくデータ（状態）', { size: SIZE.head, bold: true })}

${L.card({ x: 20, y: 56, w: 340, h: 108, color: 'p1', title: '入力欄' })}
  ${code(34, 126, 'value={input}')}
  ${code(34, 148, 'onChange={(e) => setInput(e.target.value)}')}
${mcard({ x: 650, y: 56, w: 230, h: 108, color: 'blue', title: 'input' })}
  ${t(765, 126, '入力欄に入力されている文字を')}
  ${t(765, 148, '覚えておく')}
  ${L.arrow({ x1: 364, y1: 98, x2: 646, y2: 98, color: 'gray', width: 4 })}
  ${lab(505, 88, '1', 'onChange：文字が変わるたびに入れる')}
  ${L.arrow({ x1: 646, y1: 138, x2: 364, y2: 138, color: 'gray', width: 4 })}
  ${lab(505, 160, '2', 'value：中身を入力欄に表示する')}

${L.card({ x: 20, y: 220, w: 340, h: 100, color: 'p2', title: 'ボタン' })}
  ${code(34, 292, 'onClick={handleShow}')}
  ${t(34, 312, '（() は付けない）', { anchor: 'start', fill: SUB })}
${mcard({ x: 432, y: 220, w: 138, h: 100, color: 'blue', title: 'handleShow' })}
  ${t(501, 292, '押されたときに')}
  ${t(501, 312, '動く関数')}
  ${L.arrow({ x1: 364, y1: 272, x2: 428, y2: 272, color: 'gray', width: 4 })}
  ${lab(396, 262, '3', 'onClick', { stacked: true, mono: true })}
${mcard({ x: 650, y: 220, w: 230, h: 100, color: 'blue', title: 'message' })}
  ${t(765, 292, '表示する文字を覚えておく。')}
  ${t(765, 312, '最初は null（何も表示しない）')}
  ${L.arrow({ x1: 574, y1: 272, x2: 646, y2: 272, color: 'gray', width: 4 })}
  ${lab(610, 262, '5', 'setMessage', { stacked: true, mono: true })}
  <path d="M720 164 V192 H501 V216" fill="none" stroke="${C.gray.main}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arK)"/>
  ${lab(610, 186, '4', 'input を読む')}

${L.card({ x: 20, y: 350, w: 340, h: 100, color: 'p3', title: '表示領域' })}
  ${code(34, 422, '{message !== null && <p>...{message}</p>}')}
  ${t(34, 442, 'null でないときだけ出す', { anchor: 'start', fill: SUB })}
  <path d="M765 324 V400 H364" fill="none" stroke="${C.gray.main}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arK)"/>
  ${lab(560, 390, '6', 'message に文字が入ると、表示領域が出る')}`;

const y0 = 466;
L.write('9-6-wiring', L.svg({
  y0,
  title: 'MessagePage の入力欄・ボタン・表示領域が、状態 input、関数 handleShow、状態 message と、value・onChange・onClick でどうつながるかを示した図',
  desc: '入力欄は、onChange で文字が変わるたびに状態 input に入れ（1）、value で input の中身を入力欄に表示する（2）。ボタンは onClick で関数 handleShow を呼ぶ（3）。handleShow は input を読み（4）、setMessage で状態 message に入れる（5）。message に文字が入ると、表示領域が出る（6）。message は最初は null で、何も表示しない。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'jump', lines: ['入力欄・ボタン・表示領域が、', '状態と関数でつながったよ。', '矢印をたどって、動きを確かめてみよう。'] }),
}));
