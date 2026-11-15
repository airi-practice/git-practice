// 2-7-input-button: 入力欄に文字を打つと状態 input に入り、ボタンを押すと handleShow が input を読み取る流れ。
// 入力の流れ=p1（紫）、ボタンの流れ=p2（青緑）、覚えておく状態=黄（強調）。p の矢印は線と同じ色の矢じりが要るので、ここで矢じりを足す
const L = require('../rich-lib');
const { C, t, SIZE, SUB } = L;
const marks = ['p1', 'p2'].map((k) => `<marker id="m-${k}" markerWidth="3.2" markerHeight="3.2" viewBox="0 0 10 10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C[k].main}"/></marker>`).join('');
const ar = (x1, y1, x2, y2, k) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[k].main}" stroke-width="4" stroke-linecap="round" marker-end="url(#m-${k})"/>`;
const step = (x, y, w, k, n, head, sub, mono) => `
  <g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="64" rx="12" fill="${C[k].light}" stroke="${C[k].main}" stroke-width="2"/></g>
  ${L.badge({ cx: x + 4, cy: y + 4, n, color: k })}
  ${t(x + w / 2, y + 28, head, { bold: true, mono, fill: C[k].dark })}
  ${t(x + w / 2, y + 50, sub, { size: SIZE.note, fill: '#1e293b' })}`;
const body = `
  <defs>${marks}</defs>
  ${t(880, 90, '（このシステムにはまだない、考え方の例）', { size: SIZE.note, fill: SUB, anchor: 'end' })}
${L.card({ x: 20, y: 62, w: 260, h: 378, color: 'blue', title: '画面（利用者が操作する）' })}
  ${t(150, 134, '入力欄（input）', { size: SIZE.note, bold: true, fill: C.p1.dark })}
  <rect x="45" y="144" width="210" height="44" rx="8" fill="#ffffff" stroke="${C.p1.main}" stroke-width="2"/>
  ${t(60, 172, 'りんご', { anchor: 'start' })}
  ${t(150, 352, 'ボタン（button）', { size: SIZE.note, bold: true, fill: C.p2.dark })}
  <g filter="url(#shadow)"><rect x="85" y="368" width="130" height="44" rx="10" fill="url(#headBlue)"/></g>
  ${t(150, 396, '表示', { size: SIZE.head, bold: true, fill: '#ffffff' })}
  ${ar(262, 166, 330, 166, 'p1')}
${step(336, 134, 250, 'p1', '1', 'onChange', '文字が変わるたびに実行する', true)}
  ${ar(590, 166, 636, 166, 'p1')}
${step(640, 134, 240, 'p1', '2', 'setInput(e.target.value)', '打った文字を状態に入れる', true)}
  ${ar(760, 202, 760, 234, 'p1')}
  ${t(772, 222, '書き込む', { size: SIZE.note, bold: true, fill: C.p1.dark, anchor: 'start' })}
${L.card({ x: 460, y: 238, w: 300, h: 94, color: 'yellow', title: '状態 input（覚えておく入れ物）' })}
  ${t(610, 314, 'いまの中身：「りんご」')}
  ${ar(262, 390, 330, 390, 'p2')}
${step(336, 358, 250, 'p2', '3', 'onClick', 'ボタンが押されたときに実行する', true)}
  ${ar(590, 390, 636, 390, 'p2')}
${step(640, 358, 240, 'p2', '4', 'handleShow', 'input を読んで使う', true)}
  ${ar(700, 354, 700, 336, 'p2')}
  ${t(712, 350, '読み取る', { size: SIZE.note, bold: true, fill: C.p2.dark, anchor: 'start' })}`;
const y0 = 456;
L.write('2-7-input-button', L.svg({
  y0,
  title: '入力欄に文字を打つと状態 input に入り、ボタンを押すと handleShow が input を読み取る流れ',
  desc: '入力欄（input）に文字を打つと、onChange が文字が変わるたびに実行され、setInput(e.target.value) で打った文字を状態 input（覚えておく入れ物。いまの中身は「りんご」）に書き込む。ボタン（button）を押すと、onClick が実行され、handleShow が状態 input を読み取って使う。このシステムにはまだない、考え方の例。',
  body,
  footer: L.foot({ W: 900, y0, pose: 'wave', lines: ['入力欄の文字をいったん状態に入れておくと、', 'ボタンを押したときに取り出せるんだ。'] }),
}));
